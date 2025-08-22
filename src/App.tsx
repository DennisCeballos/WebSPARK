import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { initializeFirestore } from './config/firebase';
import { projectService } from './services/projectService';
import SideNavigation from './components/SideNavigation';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';

function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isFirebaseInitialized, setIsFirebaseInitialized] = useState(false);
  const location = useLocation();

  // Initialize Firebase and start fetching projects
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Initialize Firebase persistence
        await initializeFirestore();
        setIsFirebaseInitialized(true);
        
        // Start fetching projects in parallel (non-blocking)
        projectService.getProjects().catch(error => {
          console.error('Failed to fetch initial projects:', error);
        });
        
        // Optionally initialize real-time listener for live updates
        // projectService.initializeRealtimeListener();
        
      } catch (error) {
        console.error('Failed to initialize Firebase:', error);
        setIsFirebaseInitialized(true); // Continue without persistence
      }
    };

    initializeApp();

    // Cleanup on unmount
    return () => {
      projectService.stopRealtimeListener();
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      // If we're not on home page, navigate to home first
      window.location.href = `/#${sectionId}`;
      return;
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname !== '/') return;
      
      const sections = ['hero', 'presentation', 'invitation', 'process', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Update active section based on current route
  useEffect(() => {
    if (location.pathname === '/about') {
      setActiveSection('about');
    } else if (location.pathname === '/projects') {
      setActiveSection('projects');
    } else if (location.pathname === '/') {
      setActiveSection('hero');
    }
  }, [location.pathname]);

  return (
    <div className="font-inter">
      <SideNavigation 
      activeSection={activeSection} 
      onSectionChange={scrollToSection} 
      />
      
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
