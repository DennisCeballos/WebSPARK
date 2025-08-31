import React from 'react';
import { useState, useEffect } from 'react';
import { ArrowLeft, ExternalLink, Calendar, Users, Code, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { projectService } from '../services/projectService';
import { Project } from '../types/Project';
import ProjectDetailModal from '../components/ProjectDetailModal';
import EmojiRender from '../components/EmojiRender';

const ENABLE_DEBUG_TOOL = false;

const ProjectsPage: React.FC = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [useFirebase, setUseFirebase] = useState(true); // Toggle for debugging
  const [cacheInfo, setCacheInfo] = useState<any>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    let unsubscribe: (() => void) | null = null;

    if (useFirebase) {
      setLoading(true);

      // Subscribe to project updates
      unsubscribe = projectService.subscribe((projects) => {
        setProjects(projects);
        setLoading(false);
      });

      // Get projects (will use cache if available)
      projectService.getProjects().then((projects) => {
        setProjects(projects);
        setLoading(false);
      });

      // Update cache info for debugging
      setCacheInfo(projectService.getCacheInfo());
    } else {
      setProjects(projectService.getHardcodedProjects());
      setLoading(false);
      setCacheInfo(null);
    }

    // Cleanup subscription
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [useFirebase]);

  // Force refresh projects
  const handleRefresh = async () => {
    setLoading(true);
    try {
      const projects = await projectService.getProjects(true); // Force refresh
      setProjects(projects);
      setCacheInfo(projectService.getCacheInfo());
    } catch (error) {
      console.error('Failed to refresh projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    console.log(project)
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  // Helper function to get display values (handles both Firebase and hardcoded data)
  const getProjectTitle = (project: Project) => project.nombre || project.title || '';
  const getProjectDescription = (project: Project) => project.tituloClickbait || project.description || '';
  const getProjectTechnologies = (project: Project) => project.tecnologias || project.technologies || [];
  const getProjectLink = (project: Project) => project.enlaceInscripcion || '#';

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'recruiting': return 'bg-spark-yellow text-spark-dark';
      case 'active': return 'bg-spark-coral text-white';
      case 'completed': return 'bg-spark-blue text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getStatusText = (status: Project['status']) => {
    switch (status) {
      case 'recruiting': return 'Reclutando';
      case 'active': return 'En desarrollo';
      case 'completed': return 'Completado';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-spark-gray">
      {/* Header with back button */}
      <div className="bg-white py-6 px-6 lg:px-12 shadow-sm">
        <div className="container mx-auto max-w-6xl">
          <button
            onClick={() => {
              navigate('/')
            }}
            className="flex items-center gap-3 text-spark-blue hover:text-spark-dark transition-colors duration-300 group"
          >
            <ArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" size={20} />
            <span className="font-inter font-medium">Volver al inicio</span>
          </button>
        </div>
      </div>

      <section className="py-20 px-6 lg:px-12">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-montserrat font-bold text-spark-dark mb-6 px-4">
              Nuestros <span className="text-spark-coral">Proyectos</span>
            </h1>
            <p className="text-lg sm:text-xl font-inter text-spark-blue max-w-3xl mx-auto px-4">
              Explora todos nuestros proyectos actuales y únete a equipos apasionados por crear soluciones innovadoras
            </p>
            <div className="w-24 h-1 bg-spark-yellow mx-auto mt-6"></div>

            {/* Debug toggle */}
            {ENABLE_DEBUG_TOOL && (

              <div className="mt-8 flex flex-col items-center gap-4">
                <div className="flex gap-4">
                  <button
                    onClick={() => setUseFirebase(true)}
                    className={`px-4 py-2 rounded-lg font-inter text-sm transition-colors ${useFirebase
                      ? 'bg-spark-blue text-white'
                      : 'bg-gray-200 text-spark-blue hover:bg-gray-300'
                      }`}
                  >
                    Firebase Data
                  </button>
                  <button
                    onClick={() => setUseFirebase(false)}
                    className={`px-4 py-2 rounded-lg font-inter text-sm transition-colors ${!useFirebase
                      ? 'bg-spark-blue text-white'
                      : 'bg-gray-200 text-spark-blue hover:bg-gray-300'
                      }`}
                  >
                    Hardcoded Data
                  </button>
                </div>

                {/* Cache info and controls */}
                {useFirebase && cacheInfo && (
                  <div className="text-center">
                    <div className="text-xs text-spark-blue mb-2">
                      Cache: {cacheInfo.projectCount} projects |
                      Updated: {cacheInfo.lastUpdated} |
                      Valid: {cacheInfo.isValid ? 'Yes' : 'No'}
                    </div>
                    <div className="flex gap-2">
                      <button onClick={handleRefresh} className="px-3 py-1 bg-spark-coral text-white rounded text-xs">
                        Force Refresh
                      </button>
                      <button onClick={() => { projectService.clearCache(); setCacheInfo(projectService.getCacheInfo()); }} className="px-3 py-1 bg-gray-500 text-white rounded text-xs">
                        Clear Cache
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-spark-blue"></div>
              <p className="mt-4 text-spark-blue font-inter">Cargando proyectos...</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-4">
              {projects.map((project) => (
                <div key={project.id} className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2">
                  {/* Project Header */}
                  <div className="p-4 sm:p-6 border-b border-spark-gray">
                    <div className='h-[5vh] aspect-square flex justify-center items-center mx-auto'>
                      <EmojiRender text={project.emoji} size={35} />
                    </div>
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg sm:text-xl font-montserrat font-semibold text-spark-dark leading-tight">
                        {getProjectTitle(project)}
                      </h3>
                      {project.status && (
                        <span className={`px-3 py-1 rounded-full text-xs font-inter font-medium ${getStatusColor(project.status)}`}>
                          {getStatusText(project.status)}
                        </span>
                      )}
                    </div>
                    <p className="text-sm sm:text-base font-inter text-spark-blue leading-relaxed">
                      {getProjectDescription(project)}
                    </p>
                  </div>

                  {/* Project Details */}
                  <div className="p-4 sm:p-6">
                    <div className="space-y-4 mb-6">
                      {project.teamSize && (
                        <div className="flex items-center gap-3">
                          <Users className="text-spark-coral" size={16} />
                          <span className="font-inter text-sm text-spark-blue">
                            Equipo de {project.teamSize} personas
                          </span>
                        </div>
                      )}
                      {project.duration && (
                        <div className="flex items-center gap-3">
                          <Calendar className="text-spark-coral" size={16} />
                          <span className="font-inter text-sm text-spark-blue">
                            Duración: {project.duration}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center gap-3">
                        <Code className="text-spark-coral" size={16} />
                        <div className="flex flex-wrap gap-2 mt-2">
                          {getProjectTechnologies(project).map((tech, index) => (
                            index === 0 ? (
                              // estilo unico para el primer item
                              <span
                                key={index}
                                className="inline-flex items-center justify-center px-3 py-1 text-sm font-bold leading-ti rounded-lg bg-purple-200 outline outline-2 outline-purple-500">
                                {tech}
                              </span>
                            ) : (
                              // estilo default para el resto
                              <span
                                key={index}
                                className="bg-spark-yellow/20 text-spark-dark px-1 py-1 rounded text-s font-inter font-medium">
                                {tech}
                              </span>
                            )
                          ))}
                        </div>
                      </div>
                    </div>

                    <a
                      href={getProjectLink(project)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-spark-blue hover:bg-spark-yellow text-white hover:text-spark-dark font-inter font-semibold py-2 sm:py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-md text-sm sm:text-base mb-3"
                    >
                      Inscribirse al proyecto
                      <ExternalLink size={16} />
                    </a>

                    <button
                      onClick={() => handleProjectClick(project)}
                      className="w-full bg-spark-gray hover:bg-spark-coral/20 text-spark-blue hover:text-spark-dark font-inter font-medium py-2 sm:py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base border border-spark-blue/20 hover:border-spark-coral"
                    >
                      Ver detalles completos
                      <Eye size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-16">
            <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto shadow-lg">
              <h3 className="text-xl sm:text-2xl font-montserrat font-bold text-spark-dark mb-4">
                ¿No encuentras lo que buscas?
              </h3>
              <p className="text-sm sm:text-base font-inter text-spark-blue mb-6">
                ¡Propón tu propia idea de proyecto! Estamos siempre abiertos a nuevas iniciativas
              </p>
              <button
              onClick={() => window.location.href = "https://forms.office.com/Pages/ResponsePage.aspx?id=C7UJMpu33EOfxI1CxAbdYXviU2CVXtNKpQgpf6kSlDJUREhMR1EyRk5GS0Q0U0NXV0tCUThMOUYzOC4u"}
              className="bg-spark-yellow hover:bg-spark-coral text-spark-dark font-inter font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base">
                Proponer un Proyecto
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default ProjectsPage;