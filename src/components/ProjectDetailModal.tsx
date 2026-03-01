import React, { useEffect, useState, useRef } from 'react';
import { Code, Target, Lightbulb, BookOpen, ArrowLeft } from 'lucide-react';
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

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = 'hidden'; // bloquea fondo
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
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      handleClose();
    }
  };

  if (!isOpen || !project) return null;

  const getProjectTitle = (project: Project) => project.nombre || '';
  const getProjectDescription = (project: Project) => project.tituloClickbait || '';
  const getProjectTechnologies = (project: Project) => project.tecnologias || [];
  const getProjectLink = (project: Project) => project.enlaceInscripcion || '#';

  const heroImage = project.imagenes?.[0];
  const image2 = project.imagenes?.[1];
  const image3 = project.imagenes?.[2];

  return (
    <div
      className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300 overflow-y-auto ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
      onClick={handleBackdropClick}
    >
      <div className="min-h-full flex justify-center items-start py-10">
        <div
          ref={modalRef}
          className={`relative w-full max-w-6xl bg-white rounded-2xl shadow-2xl transform transition-all duration-300 ${isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}
        >
          {/* Botón volver */}
          <button
            onClick={handleClose}
            className="fixed top-4 left-4 z-50 flex items-center gap-2 bg-white/90 hover:bg-white px-4 py-2 rounded-full shadow-md transition"
          >
            <ArrowLeft size={18} />
            <span className="text-sm font-medium">Volver</span>
          </button>

          {/* HERO */}
          <div className="w-full h-[300px] sm:h-[400px] relative">
            {heroImage ? (
              <img
                src={heroImage}
                alt={getProjectTitle(project)}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-sky-400 via-blue-500 to-cyan-400" />
            )}
          </div>

          {/* EMOJI SUPERPUESTO */}
          <div className="relative flex justify-center">
            <div className="-mt-16 z-20 bg-white rounded-full p-4 shadow-xl">
              <EmojiRender text={project.emoji} size={64} />
            </div>
          </div>

          {/* HEADER */}
          <div className="text-center px-6 mt-6 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
              {getProjectTitle(project)}
            </h1>
            <p className="text-lg text-spark-coral opacity-80">
              {getProjectDescription(project)}
            </p>
          </div>

          {/* CONTENIDO */}
          <div className="mt-12 space-y-12 px-8 md:px-12 pb-12 max-w-5xl mx-auto">

            {/* DESCRIPCIÓN */}
            <div className="pt-8 border-t border-gray-200 relative overflow-visible">
              {/* IMAGEN */}
              {image2 && (
                <div className="hidden md:block absolute right-[-20%] top-1/2 -translate-y-1/2 w-[45%] h-[70%]">
                  <img
                    src={image2}
                    alt="descripcion"
                    className="w-full h-full object-cover rounded-xl shadow-lg"
                  />
                </div>
              )}

              {/* TEXTO */}
              <div className={image2 ? "md:mr-[35%]" : ""}>
                <h3 className="text-xl font-semibold mb-4">Descripción del Proyecto</h3>
                <div className="text-spark-blue leading-relaxed text-justify">
                  <ReactMarkdown>{project.descripcion || ''}</ReactMarkdown>
                </div>
              </div>
            </div>

            {/* MOTIVACIÓN + OBJETIVOS (SEPARADOS + IMAGEN COMPARTIDA) */}
            <div className="relative pt-8 border-t border-gray-200 overflow-visible">

              {/* IMAGEN CENTRAL */}
              {image3 && (
                <div className="hidden md:block absolute left-[-20%] top-1/2 -translate-y-1/2 w-[45%] h-[70%]">
                  <img
                    src={image3}
                    alt="motivacion"
                    className="w-full h-full object-cover rounded-xl shadow-lg"
                  />
                </div>
              )}

              <div className="space-y-12">

                {/* MOTIVACIÓN */}
                <div className={image3 ? "md:ml-[35%]" : ""}>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Lightbulb size={18} /> Motivación
                  </h3>
                  <div className="text-spark-blue text-justify">
                    <ReactMarkdown>{project.motivacion || ''}</ReactMarkdown>
                  </div>
                </div>

                {/* OBJETIVOS */}
                <div className={`pt-8 border-t border-gray-200 ${image3 ? "md:ml-[35%]" : ""}`}>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Target size={18} /> Objetivos
                  </h3>
                  <ul className="space-y-2">
                    {(project.objetivos || []).map((obj, i) => (
                      <li key={i} className="flex gap-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2" />
                        <div className="text-spark-blue text-justify">
                          <ReactMarkdown>{obj}</ReactMarkdown>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* TECNOLOGÍAS */}
            <div className="pt-8 border-t border-gray-200">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Code size={18} /> Tecnologías
              </h3>
              <div className="flex flex-wrap gap-2">
                {getProjectTechnologies(project).map((tech, i) => (
                  <span key={i} className="bg-yellow-100 px-3 py-1 rounded-full text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* CONCEPTOS */}
            <div className="pt-8 border-t border-gray-200">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <BookOpen size={18} /> Conceptos a Aprender
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {(project.conceptosAprender || []).map((c, i) => (
                  <div key={i} className="bg-blue-50 p-3 rounded-lg">
                    {c}
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="pb-16">
              <a
                href={getProjectLink(project)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-auto md:px-10 block mx-auto text-center bg-spark-blue hover:bg-spark-yellow text-white hover:text-spark-dark font-semibold py-4 rounded-lg transition"
              >
                Inscribirse al Proyecto
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailModal;