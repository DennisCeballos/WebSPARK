import React from 'react';
import HeroSection from '../components/HeroSection';
import PresentationSection from '../components/PresentationSection';
import InvitationSection from '../components/InvitationSection';
import ProcessSection from '../components/ProcessSection';
import ContactSection from '../components/ContactSection';

const HomePage: React.FC = () => {
  return (
    <>
      <div id="hero">
        <HeroSection />
      </div>
      <div id="presentation">
        <PresentationSection />
      </div>
      <div id="invitation">
        <InvitationSection />
      </div>
      <div id="process">
        <ProcessSection />
      </div>
      <div id="contact">
        <ContactSection />
      </div>
    </>
  );
};

export default HomePage;