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
      className={`fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/50 backdrop-blur-sm transition-all duration-300 ${isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
      onClick={handleBackdropClick}
    >
      <div
        className={`relative w-full max-w-6xl h-[95dvh] sm:h-[80dvh] bg-white shadow-2xl transition-all duration-300 transform rounded-lg sm:rounded-2xl ${isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}
      >
        {/* Emoji - hidden on mobile, shown on desktop */}
        <div className="absolute -left-[50px] -bottom-[50px] z-50 drop-shadow-2xl hidden lg:block">
          <EmojiRender text={project.emoji} size={100} />
        </div>

        <div className="relative w-full h-full bg-white rounded-lg sm:rounded-2xl shadow-2xl overflow-hidden">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
          >
            <X size={16} className="sm:w-5 sm:h-5 text-gray-800" />
          </button>

          {/* Mobile: Single column layout, Desktop: Two column layout */}
          <div className="flex flex-col lg:flex-row h-full">
            {/* Left side - Images (hidden on mobile, shown on desktop) */}
            <div className="hidden lg:block lg:w-2/5 bg-gray-100 relative overflow-hidden">
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
                <div className="h-full flex items-center justify-center bg-gradient-to-br from-yellow-200/20 to-orange-200/20">
                  <div className="text-center">
                    <Code size={64} className="text-blue-400/40 mx-auto mb-4" />
                    <p className="text-spark-blue/60 font-sans">No hay imágenes disponibles</p>
                  </div>
                </div>
              )}
            </div>

            {/* Right side - Content (full width on mobile, 3/5 width on desktop) */}
            <div className="flex flex-col flex-1 lg:w-3/5 overflow-y-auto break-words">
              {/* Header */}
              <div className="p-3 sm:p-4 lg:p-6 border-b border-gray-200 bg-white">
                <div className="flex items-start gap-2 mb-2 lg:mb-0 lg:hidden">
                  <EmojiRender text={project.emoji} size={24} />
                  <div className="flex-1 min-w-0">
                    <h1 className="text-lg sm:text-xl font-bold text-gray-800 mb-1 leading-tight">
                      {getProjectTitle(project)}
                    </h1>
                    <p className="text-sm sm:text-base text-spark-coral mb-2 leading-tight">
                      {getProjectDescription(project)}
                    </p>
                  </div>
                </div>

                <div className="hidden lg:block">
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
                    {getProjectTitle(project)}
                  </h1>
                  <p className="text-lg text-spark-coral mb-4">
                    {getProjectDescription(project)}
                  </p>
                </div>

                {/* Quick stats - Compact on mobile */}
                <div className="flex flex-wrap gap-2 sm:gap-3 lg:gap-4 text-xs sm:text-sm">
                  {project.teamSize && (
                    <div className="flex items-center gap-1">
                      <Users className="text-spark-coral flex-shrink-0" size={12} />
                      <span className="text-spark-blue truncate">{project.teamSize} personas</span>
                    </div>
                  )}
                  {project.duration && (
                    <div className="flex items-center gap-1">
                      <Calendar className="text-spark-coral flex-shrink-0" size={12} />
                      <span className="text-spark-blue truncate">{project.duration}</span>
                    </div>
                  )}
                  {project.origen && (
                    <div className="flex items-center gap-1">
                      <Target className="text-spark-coral flex-shrink-0" size={12} />
                      <span className="text-spark-blue truncate">Origen: {project.origen}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Scrollable content */}
              <div className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-5 lg:space-y-6">
                {/* Technologies */}
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3 flex items-center gap-2">
                    <Code className="text-yellow-500" size={16} />
                    Tecnologías
                  </h3>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {getProjectTechnologies(project).map((tech, index) => (
                      <span
                        key={index}
                        className="bg-yellow-100 text-gray-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Description */}
                {project.descripcion && (
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3">
                      Descripción del Proyecto
                    </h3>
                    <div className="text-spark-blue text-sm sm:text-base leading-relaxed">
                      <ReactMarkdown>{project.descripcion}</ReactMarkdown>
                    </div>
                  </div>
                )}

                {/* Motivation */}
                {project.motivacion && (
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3 flex items-center gap-2">
                      <Lightbulb className="text-spark-coral" size={16} />
                      Motivación
                    </h3>
                    <div className="text-spark-blue text-sm sm:text-base leading-relaxed">
                      <ReactMarkdown>{project.motivacion}</ReactMarkdown>
                    </div>
                  </div>
                )}

                {/* Objectives */}
                {project.objetivos && project.objetivos.length > 0 && (
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3 flex items-center gap-2">
                      <Target className="text-spark-blue" size={16} />
                      Objetivos
                    </h3>
                    <ul className="space-y-2">
                      {project.objetivos.map((objetivo, index) => (
                        <li key={index} className="flex items-start gap-2 sm:gap-3">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                          <div className="text-spark-blue text-sm sm:text-base">
                            <ReactMarkdown>{objetivo}</ReactMarkdown>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Learning concepts */}
                {project.conceptosAprender && project.conceptosAprender.length > 0 && (
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3 flex items-center gap-2">
                      <BookOpen className="text-yellow-500" size={16} />
                      Conceptos a Aprender
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {project.conceptosAprender.map((concepto, index) => (
                        <div key={index} className="bg-blue-50 rounded-lg p-2 sm:p-3">
                          <span className="text-gray-800 text-sm sm:text-base font-medium">{concepto}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/*
                  Last update
                  {project.ultimaActualizacion && (
                    <div className="text-xs sm:text-sm text-blue-400 pt-2">
                      Última actualización: {new Date(project.ultimaActualizacion).toLocaleDateString('es-ES')}
                    </div>
                  )}
                */}
              </div>

              {/* Footer with action button */}
              <div className="p-4 sm:p-6 border-t border-spark-gray bg-spark-gray/30">
                <a
                  href={getProjectLink(project)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-spark-blue hover:bg-spark-yellow text-white hover:text-spark-dark font-inter font-semibold py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 shadow-md sm:shadow-lg hover:scale-105 text-sm sm:text-base"
                >
                  Inscribirse al Proyecto
                  <ExternalLink size={18} className="sm:w-5 sm:h-5" />
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