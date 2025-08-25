import React from 'react';
import { useState, useEffect } from 'react';
import { ArrowRight, Code, Users, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { projectService } from '../services/projectService';
import { Project } from '../types/Project';
import EmojiRender from './EmojiRender';

const InvitationSection: React.FC = () => {
  const navigate = useNavigate();
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);

  useEffect(() => {
    // Subscribe to project updates and get first 2 projects for preview
    const unsubscribe = projectService.subscribe((projects) => {
      setFeaturedProjects(projects.slice(0, 2));
    });

    // Get projects immediately if available in cache
    projectService.getProjects().then((projects) => {
      setFeaturedProjects(projects.slice(0, 2));
    });

    return unsubscribe;
  }, []);

  const getStatusColor = (status: Project['status']) => {
    return status === 'recruiting' ? 'bg-spark-yellow text-spark-dark' : 'bg-spark-coral text-white';
  };

  const getStatusText = (status: Project['status']) => {
    return status === 'recruiting' ? 'Reclutando' : 'En desarrollo';
  };

  return (
    <section className="min-h-screen bg-white py-20 px-6 lg:px-12 flex items-center">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-montserrat font-bold text-spark-dark mb-6 px-4">
            Tu próximo <span className="text-spark-coral">proyecto</span> te espera
          </h2>
          <p className="text-lg sm:text-xl font-inter text-spark-blue max-w-2xl mx-auto px-4">
            Tú elige el tema que quieras aprender, nosotros nos encargaremos de encontrar tu grupo
          </p>
        </div>

        {/* Main Banner */}
        <div className="relative bg-gradient-to-r from-spark-blue via-spark-blue/90 to-spark-blue rounded-3xl overflow-hidden shadow-2xl">
          {/* Radial gradient overlay */}
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-spark-blue/20"></div>

          {/* Background decorative elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-spark-yellow blur-2xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full bg-spark-coral blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-white/5 blur-3xl"></div>
          </div>

          <div className="relative z-10 grid lg:grid-cols-12 gap-8 p-8 lg:p-12 items-center min-h-[400px]">
            {/* Left Project Card */}
            <div className="lg:col-span-3 order-2 lg:order-1 hidden sm:block">
              {featuredProjects[0] && (
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-base sm:text-lg font-montserrat font-semibold text-white leading-tight">
                      {featuredProjects[0].emoji}
                      {featuredProjects[0].nombre || featuredProjects[0].title}
                    </h4>
                    {featuredProjects[0].status && (
                      <span className={`px-2 py-1 rounded-full text-xs font-inter font-medium ${getStatusColor(featuredProjects[0].status)}`}>
                        {getStatusText(featuredProjects[0].status)}
                      </span>
                    )}
                  </div>
                  <div className="space-y-3">
                    {featuredProjects[0].teamSize && (
                      <div className="flex items-center gap-2">
                        <Users className="text-spark-yellow" size={14} />
                        <span className="font-inter text-sm text-white/80">
                          {featuredProjects[0].teamSize} personas
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Code className="text-spark-yellow" size={14} />
                      <div className="flex flex-wrap gap-1">
                        {(featuredProjects[0].tecnologias || featuredProjects[0].technologies || []).slice(0, 2).map((tech, index) => (
                          <span key={index} className="bg-white/20 text-white px-2 py-1 rounded text-xs font-inter">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Center Content */}
            <div className="lg:col-span-6 text-center order-1 lg:order-2">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-montserrat font-bold text-white mb-4 sm:mb-6">
                Explora todos nuestros proyectos
              </h3>
              <p className="text-base sm:text-lg font-inter text-white/90 mb-6 sm:mb-8 max-w-md mx-auto px-4">
                Descubre oportunidades para crecer, aprender y crear junto a otros estudiantes igual de apasionados
              </p>
              <button
                onClick={() => {
                  navigate('/projects')
                  window.scrollTo({ top: 0, behavior: 'instant' }); // reset scroll
                }}
                className="bg-spark-yellow hover:bg-white text-spark-dark font-inter font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-3 mx-auto text-base sm:text-lg"
              >
                Revisa los proyectos
                <ArrowRight size={20} />
              </button>
            </div>

            {/* Right Project Card */}
            <div className="lg:col-span-3 order-3 hidden sm:block">
              {featuredProjects[1] && (
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-base sm:text-lg font-montserrat font-semibold text-white leading-tight">
                      {featuredProjects[1].emoji} {featuredProjects[1].nombre || featuredProjects[1].title}
                    </h4>
                    {featuredProjects[1].status && (
                      <span className={`px-2 py-1 rounded-full text-xs font-inter font-medium ${getStatusColor(featuredProjects[1].status)}`}>
                        {getStatusText(featuredProjects[1].status)}
                      </span>
                    )}
                  </div>
                  <div className="space-y-3">
                    {featuredProjects[1].teamSize && (
                      <div className="flex items-center gap-2">
                        <Users className="text-spark-coral" size={14} />
                        <span className="font-inter text-sm text-white/80">
                          {featuredProjects[1].teamSize} personas
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Code className="text-spark-coral" size={14} />
                      <div className="flex flex-wrap gap-1">
                        {(featuredProjects[1].tecnologias || featuredProjects[1].technologies || []).slice(0, 2).map((tech, index) => (
                          <span key={index} className="bg-white/20 text-white px-2 py-1 rounded text-xs font-inter">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom stats */}
        {/*
          <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-3xl mx-auto px-4">
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-montserrat font-bold text-spark-yellow mb-2">15+</div>
            <div className="text-sm sm:text-base text-spark-blue font-inter">Proyectos Disponibles</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-montserrat font-bold text-spark-coral mb-2">50+</div>
            <div className="text-sm sm:text-base text-spark-blue font-inter">Estudiantes Activos</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-montserrat font-bold text-spark-blue mb-2">3</div>
            <div className="text-sm sm:text-base text-spark-blue font-inter">Años de Experiencia</div>
          </div>
        </div>
        */}
      </div>
    </section>
  );
};

export default InvitationSection;