import React from 'react';
import { ExternalLink, Calendar, Users, Code } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  teamSize: number;
  duration: string;
  status: 'active' | 'recruiting' | 'completed';
  image?: string;
}

const ProjectsSection: React.FC = () => {
  // Proyectos de ejemplo - este array será fácil de modificar
  const projects: Project[] = [
    {
      id: '1',
      title: 'Sistema de Gestión Académica',
      description: 'Plataforma web para gestionar calificaciones, horarios y comunicación entre estudiantes y profesores.',
      technologies: ['React', 'Node.js', 'MongoDB', 'TypeScript'],
      teamSize: 5,
      duration: '4 meses',
      status: 'recruiting'
    },
    {
      id: '2',
      title: 'App de Sostenibilidad Campus',
      description: 'Aplicación móvil para promover prácticas sostenibles y tracking de impacto ambiental en el campus.',
      technologies: ['React Native', 'Firebase', 'Python'],
      teamSize: 4,
      duration: '3 meses',
      status: 'active'
    },
    {
      id: '3',
      title: 'Portal de Empleo Universitario',
      description: 'Conexión directa entre estudiantes y empresas para prácticas profesionales y ofertas laborales.',
      technologies: ['Vue.js', 'Django', 'PostgreSQL'],
      teamSize: 6,
      duration: '5 meses',
      status: 'completed'
    }
  ];

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
    <section className="min-h-screen bg-spark-gray py-20 px-6 lg:px-12">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-montserrat font-bold text-spark-dark mb-6">
            Nuestros <span className="text-spark-coral">Proyectos</span>
          </h2>
          <p className="text-xl font-inter text-spark-blue max-w-3xl mx-auto">
            Explora los proyectos actuales y únete a equipos apasionados por crear soluciones innovadoras
          </p>
          <div className="w-24 h-1 bg-spark-yellow mx-auto mt-6"></div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              {/* Project Header */}
              <div className="p-6 border-b border-spark-gray">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-montserrat font-semibold text-spark-dark leading-tight">
                    {project.title}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-inter font-medium ${getStatusColor(project.status)}`}>
                    {getStatusText(project.status)}
                  </span>
                </div>
                <p className="font-inter text-spark-blue leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Project Details */}
              <div className="p-6">
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <Users className="text-spark-coral" size={16} />
                    <span className="font-inter text-sm text-spark-blue">
                      Equipo de {project.teamSize} personas
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="text-spark-coral" size={16} />
                    <span className="font-inter text-sm text-spark-blue">
                      Duración: {project.duration}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Code className="text-spark-coral" size={16} />
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech, index) => (
                        <span key={index} className="bg-spark-yellow/20 text-spark-dark px-2 py-1 rounded text-xs font-inter font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <button className="w-full bg-spark-blue hover:bg-spark-yellow text-white hover:text-spark-dark font-inter font-semibold py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-md">
                  Ver más detalles
                  <ExternalLink size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-spark-yellow hover:bg-spark-coral text-spark-dark font-inter font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
            Ver todos los proyectos
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;