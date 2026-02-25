import React from 'react';
import { useState, useEffect } from 'react';
import { ArrowLeft, ExternalLink, Code, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { projectService } from '../services/projectService';
import { Project } from '../types/Project';
import ProjectDetailModal from '../components/ProjectDetailModal';
import EmojiRender from '../components/EmojiRender';
import { motion, AnimatePresence } from 'framer-motion';

const ENABLE_DEBUG_TOOL = false;

const ProjectsPage: React.FC = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [useFirebase, setUseFirebase] = useState(true); // Toggle for debugging
  const [cacheInfo, setCacheInfo] = useState<any>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const techCountMap: Record<string, number> = {};

  const filteredProjects = selectedTechs.length === 0
    ? projects
    : projects.filter(project =>
      selectedTechs.every(tech =>
        (project.tecnologias || []).includes(tech)
      )
    );

  filteredProjects.forEach(project => {
    (project.tecnologias || []).forEach(tech => {
      techCountMap[tech] = (techCountMap[tech] || 0) + 1;
    });
  });

  // convertir a array ordenado por frecuencia
  let availableTechs = Object.entries(techCountMap)
    .sort((a, b) => b[1] - a[1])
    .map(([tech]) => tech);

  // mover seleccionados al inicio
  availableTechs = [
    ...selectedTechs,
    ...availableTechs.filter(t => !selectedTechs.includes(t))
  ];

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

  // Helper function to get display values
  const getProjectTitle = (project: Project) => project.nombre || '';
  const getProjectDescription = (project: Project) => project.tituloClickbait || '';
  const getProjectTechnologies = (project: Project) => project.tecnologias || [];
  const getProjectLink = (project: Project) => project.enlaceInscripcion || '#';

  const handleTechClick = (tech: string) => {
    setSelectedTechs(prev =>
      prev.includes(tech)
        ? prev.filter(t => t !== tech)
        : [...prev, tech]
    );
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
          {availableTechs.length > 0 && (
            <div className="mb-10">

              {/* Contenedor scroll mobile */}
              <div className="flex gap-3 overflow-x-auto md:flex-wrap md:overflow-visible pb-2">

                <AnimatePresence>
                  {availableTechs.map((tech) => {
                    const isSelected = selectedTechs.includes(tech);

                    return (
                      <motion.button
                        key={tech}
                        onClick={() => handleTechClick(tech)}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.5 }}
                        layout
                        className={`
                          whitespace-nowrap px-4 py-2 rounded-full text-sm font-inter font-medium transition-colors duration-300 border
                          ${isSelected
                            ? 'bg-spark-blue text-white border-spark-blue shadow-md'
                            : 'bg-white text-spark-blue border-spark-blue/30 hover:bg-spark-blue/10'}
                            `}
                            >
                        {tech}
                      </motion.button>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>
          )}

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-spark-blue"></div>
              <p className="mt-4 text-spark-blue font-inter">Cargando proyectos...</p>
            </div>
          ) : (
            <AnimatePresence mode='popLayout'>
            <div className="flex flex-col gap-8 px-4">
              {filteredProjects.map((project, index) => {
                const isEven = index % 2 === 1;
                const hasImages = project.imagenes && project.imagenes.length > 0;
                const imageUrl = hasImages ? project.imagenes![0] : null;
                
                return (
                  <motion.div
                  key={`${project.nombre}-${index}`}
                  
                  layout

                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 40 }}

                  transition={{ duration: 0.5, delay: index *0.03 }}
                  
                  className="bg-white rounded-2xl shadow-lg overflow-hidden group transition-all duration-300 hover:ring-2 hover:ring-spark-coral/70 hover:ring-offset-white sm:hover:-translate-y-2 flex flex-col md:flex-row h-[250px]"
                  >
                    {/* IMAGE (desktop only) */}
                    <div
                      className={`
                        hidden md:block md:w-1/3 h-full overflow-hidden
                        ${isEven ? 'md:order-2' : 'md:order-1'}
                      `}
                    >
                      {imageUrl ? (
                        <div className="w-full h-full overflow-hidden flex items-center justify-center">
                        <img
                          src={imageUrl}
                          alt={project.nombre}
                          className="h-full w-auto object-cover"
                        />
                      </div>
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-sky-400 via-blue-500 to-cyan-400" />
                      )}
                    </div>

                    {/* CONTENT */}
                    <div
                      className={`
                        flex flex-col justify-between p-5 sm:p-6 flex-1
                        ${isEven ? 'md:order-1' : 'md:order-2'}
                        `}
                        >
                      <div className="flex flex-col h-full">

                        {/* TOP */}
                        <div>
                          {/* Title + Emoji */}
                          <div className="flex items-center gap-3 mb-3">
                            <EmojiRender text={project.emoji} size={28} />
                            <h3 className="text-lg sm:text-xl font-montserrat font-bold text-spark-dark leading-tight">
                              {getProjectTitle(project)}
                            </h3>
                          </div>

                          {/* Clickbait */}
                          <p className="text-sm sm:text-base font-inter text-spark-blue leading-relaxed">
                            {getProjectDescription(project)}
                          </p>
                        </div>

                        {/* SPACER */}
                        <div className="flex-grow" />

                        {/* TECHNOLOGIES */}
                        <div className="flex items-start gap-3 mb-3">
                          <Code className="text-spark-coral mt-1" size={16} />
                          <div className="flex flex-wrap gap-2">
                            {getProjectTechnologies(project).map((tech, index) =>
                              index === 0 ? (
                                <span
                                key={index}
                                className="inline-flex items-center justify-center px-3 py-1 text-sm font-bold rounded-lg bg-purple-200 outline outline-2 outline-purple-500"
                                >
                                  {tech}
                                </span>
                              ) : (
                                <span
                                key={index}
                                className="bg-spark-yellow/20 text-spark-dark px-2 py-1 rounded text-xs sm:text-sm font-inter font-medium"
                                >
                                  {tech}
                                </span>
                              )
                            )}
                          </div>
                        </div>

                        {/* BUTTONS */}
                        <div className="flex flex-col sm:flex-row gap-3 mt-4">
                          <a
                            href={getProjectLink(project)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 bg-spark-blue hover:bg-spark-yellow text-white hover:text-spark-dark font-inter font-semibold py-2 sm:py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
                          >
                            Inscribirse
                            <ExternalLink size={16} />
                          </a>

                          <button
                            onClick={() => handleProjectClick(project)}
                            className="flex-1 bg-spark-gray hover:bg-spark-coral/20 text-spark-blue hover:text-spark-dark font-inter font-medium py-2 sm:py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base border border-spark-blue/20 hover:border-spark-coral"
                          >
                            Ver detalles
                            <Eye size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            </AnimatePresence>
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