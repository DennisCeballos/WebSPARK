import React from 'react';
import { ArrowLeft, ExternalLink, Calendar, Users, Code } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  teamSize: number;
  duration: string;
  status: 'active' | 'recruiting' | 'completed';
}

const ProjectsPage: React.FC = () => {
  const navigate = useNavigate();

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
    },
    {
      id: '4',
      title: 'Sistema de Biblioteca Digital',
      description: 'Plataforma para gestión y préstamo de recursos digitales con sistema de recomendaciones.',
      technologies: ['Angular', 'Spring Boot', 'MySQL'],
      teamSize: 4,
      duration: '3 meses',
      status: 'recruiting'
    },
    {
      id: '5',
      title: 'App de Carpooling Estudiantil',
      description: 'Aplicación para conectar estudiantes que comparten rutas de transporte al campus.',
      technologies: ['Flutter', 'Node.js', 'MongoDB'],
      teamSize: 5,
      duration: '4 meses',
      status: 'active'
    },
    {
      id: '6',
      title: 'Plataforma de Tutorías',
      description: 'Sistema para conectar estudiantes que necesitan ayuda con tutores disponibles.',
      technologies: ['React', 'Express', 'PostgreSQL'],
      teamSize: 3,
      duration: '2 meses',
      status: 'recruiting'
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
    <div className="min-h-screen bg-spark-gray">
      {/* Header with back button */}
      <div className="bg-white py-6 px-6 lg:px-12 shadow-sm">
        <div className="container mx-auto max-w-6xl">
          <button
            onClick={() => navigate('/')}
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
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-4">
            {projects.map((project) => (
              <div key={project.id} className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2">
                {/* Project Header */}
                <div className="p-4 sm:p-6 border-b border-spark-gray">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg sm:text-xl font-montserrat font-semibold text-spark-dark leading-tight">
                      {project.title}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-inter font-medium ${getStatusColor(project.status)}`}>
                      {getStatusText(project.status)}
                    </span>
                  </div>
                  <p className="text-sm sm:text-base font-inter text-spark-blue leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Project Details */}
                <div className="p-4 sm:p-6">
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

                  <button className="w-full bg-spark-blue hover:bg-spark-yellow text-white hover:text-spark-dark font-inter font-semibold py-2 sm:py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-md text-sm sm:text-base">
                    Inscribirse al proyecto
                    <ExternalLink size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto shadow-lg">
              <h3 className="text-xl sm:text-2xl font-montserrat font-bold text-spark-dark mb-4">
                ¿No encuentras lo que buscas?
              </h3>
              <p className="text-sm sm:text-base font-inter text-spark-blue mb-6">
                ¡Propón tu propia idea de proyecto! Estamos siempre abiertos a nuevas iniciativas
              </p>
              <button className="bg-spark-yellow hover:bg-spark-coral text-spark-dark font-inter font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base">
                Proponer un Proyecto
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectsPage;