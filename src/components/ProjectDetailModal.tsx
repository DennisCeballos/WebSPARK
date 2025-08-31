import React, { useEffect, useState } from 'react';
import { X, ExternalLink, Calendar, Users, Code, Target, Lightbulb, BookOpen } from 'lucide-react';
import { Project } from '../types/Project';
import ReactMarkdown from "react-markdown";
import EmojiRender from './EmojiRender';

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, isOpen, onClose }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen || !project) return null;

  const getProjectTitle = (project: Project) => project.nombre || project.title || '';
  const getProjectDescription = (project: Project) => project.tituloClickbait || project.description || '';
  const getProjectTechnologies = (project: Project) => project.tecnologias || project.technologies || [];
  const getProjectLink = (project: Project) => project.enlaceInscripcion || '#';

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-all duration-300 ${isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
      onClick={handleBackdropClick}
    >

      <div
        className={`relative w-full max-w-6xl h-[80dvh] bg-white shadow-2xl transition-all duration-300 transform ${isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}
      >

        {/* Emoji en la esquina izquierda */}
        <div className="absolute -left-[50px] -bottom-[50px] z-50 drop-shadow-2xl">
          <EmojiRender text={project.emoji} size={100} />
        </div>

        <div className='relative w-full h-full bg-white rounded-2x1 shadow-2xl overflow-hidden'>

          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
          >
            <X size={20} className="text-spark-dark" />
          </button>

          <div className="flex h-full">
            {/* Left side - Images */}
            <div className="w-2/5 bg-spark-gray relative overflow-hidden">
              {project.imagenes && project.imagenes.length > 0 ? (
                <div className="h-full">
                  <img
                    src={project.imagenes[0]}
                    alt={getProjectTitle(project)}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                  {project.imagenes.length > 1 && (
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex gap-2 overflow-x-auto">
                        {project.imagenes.slice(1, 4).map((img, index) => (
                          <img
                            key={index}
                            src={img}
                            alt={`${getProjectTitle(project)} ${index + 2}`}
                            className="w-16 h-16 rounded-lg object-cover flex-shrink-0 border-2 border-white shadow-md"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center bg-gradient-to-br from-spark-yellow/20 to-spark-coral/20">
                  <div className="text-center">
                    <Code size={64} className="text-spark-blue/40 mx-auto mb-4" />
                    <p className="text-spark-blue/60 font-inter">No hay imágenes disponibles</p>
                  </div>
                </div>
              )}
            </div>

            {/* Right side - Content */}
            <div className="w-3/5 flex flex-col">
              {/* Header */}
              <div className="p-6 border-b border-spark-gray bg-white">
                <h1 className="text-2xl lg:text-3xl font-montserrat font-bold text-spark-dark mb-2">
                  {getProjectTitle(project)}
                </h1>
                <p className="text-lg font-inter text-spark-coral mb-4">
                  {getProjectDescription(project)}
                </p>

                {/* Quick stats */}
                <div className="flex flex-wrap gap-4 text-sm">
                  {project.teamSize && (
                    <div className="flex items-center gap-2">
                      <Users className="text-spark-coral" size={16} />
                      <span className="text-spark-blue">{project.teamSize} personas</span>
                    </div>
                  )}
                  {project.duration && (
                    <div className="flex items-center gap-2">
                      <Calendar className="text-spark-coral" size={16} />
                      <span className="text-spark-blue">{project.duration}</span>
                    </div>
                  )}
                  {project.origen && (
                    <div className="flex items-center gap-2">
                      <Target className="text-spark-coral" size={16} />
                      <span className="text-spark-blue">Origen: {project.origen}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Scrollable content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Technologies */}
                <div>
                  <h3 className="text-lg font-montserrat font-semibold text-spark-dark mb-3 flex items-center gap-2">
                    <Code className="text-spark-yellow" size={20} />
                    Tecnologías
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {getProjectTechnologies(project).map((tech, index) => (
                      <span
                        key={index}
                        className="bg-spark-yellow/20 text-spark-dark px-3 py-1 rounded-full text-sm font-inter font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Description */}
                {project.descripcion && (
                  <div>
                    <h3 className="text-lg font-montserrat font-semibold text-spark-dark mb-3">
                      Descripción del Proyecto
                    </h3>
                    <p className="text-spark-blue font-inter leading-relaxed">
                      <ReactMarkdown>{project.descripcion}</ReactMarkdown>
                    </p>
                  </div>
                )}

                {/* Motivation */}
                {project.motivacion && (
                  <div>
                    <h3 className="text-lg font-montserrat font-semibold text-spark-dark mb-3 flex items-center gap-2">
                      <Lightbulb className="text-spark-coral" size={20} />
                      Motivación
                    </h3>
                    <p className="text-spark-blue font-inter leading-relaxed">
                      <ReactMarkdown>{project.motivacion}</ReactMarkdown>
                    </p>
                  </div>
                )}

                {/* Objectives */}
                {project.objetivos && project.objetivos.length > 0 && (
                  <div>
                    <h3 className="text-lg font-montserrat font-semibold text-spark-dark mb-3 flex items-center gap-2">
                      <Target className="text-spark-blue" size={20} />
                      Objetivos
                    </h3>
                    <ul className="space-y-2">
                      {project.objetivos.map((objetivo, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-spark-coral rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-spark-blue font-inter"><ReactMarkdown>{objetivo}</ReactMarkdown></span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Learning concepts */}
                {project.conceptosAprender && project.conceptosAprender.length > 0 && (
                  <div>
                    <h3 className="text-lg font-montserrat font-semibold text-spark-dark mb-3 flex items-center gap-2">
                      <BookOpen className="text-spark-yellow" size={20} />
                      Conceptos a Aprender
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {project.conceptosAprender.map((concepto, index) => (
                        <div key={index} className="bg-spark-blue/10 rounded-lg p-3">
                          <span className="text-spark-dark font-inter font-medium">{concepto}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Last update */}
                {project.ultimaActualizacion && (
                  <div className="text-sm text-spark-blue/60 font-inter">
                    Última actualización: {new Date(project.ultimaActualizacion).toLocaleDateString('es-ES')}
                  </div>
                )}
              </div>

              {/* Footer with action button */}
              <div className="p-6 border-t border-spark-gray bg-spark-gray/30">
                <a
                  href={getProjectLink(project)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-spark-blue hover:bg-spark-yellow text-white hover:text-spark-dark font-inter font-semibold py-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Inscribirse al Proyecto
                  <ExternalLink size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailModal;