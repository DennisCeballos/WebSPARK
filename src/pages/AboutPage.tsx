import React from 'react';
import { ArrowLeft, Target, Eye, Users, Code, Lightbulb } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  const objectives = [
    {
      icon: Code,
      title: "Superar barreras de aprendizaje",
      description: "Ayudamos a los estudiantes a perder el miedo a explorar nuevas herramientas y tecnologías"
    },
    {
      icon: Users,
      title: "Fomentar el portafolio personal",
      description: "Incentivamos la creación de proyectos que sumen experiencia real y evidencien habilidades"
    },
    {
      icon: Lightbulb,
      title: "Generar comunidad",
      description: "Creamos un espacio donde estudiantes con intereses similares se conecten y trabajen juntos"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header with back button */}
      <div className="bg-spark-gray py-6 px-6 lg:px-12">
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
              Quiénes <span className="text-spark-yellow">Somos</span>
            </h1>
            <div className="w-24 h-1 bg-spark-coral mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 mb-16 lg:mb-20 px-4">
            {/* Misión */}
            <div className="bg-spark-gray rounded-3xl p-6 sm:p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-spark-yellow/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <Target className="text-spark-yellow" size={24} />
                  <h2 className="text-xl sm:text-2xl font-montserrat font-bold text-spark-dark">Nuestra Misión</h2>
                </div>
                <p className="text-base sm:text-lg font-inter text-spark-blue leading-relaxed">
                  Impulsar la creatividad, innovación y confianza de los estudiantes de Ingeniería de Software 
                  a través del desarrollo de proyectos colaborativos sin fines de lucro, creando un ambiente 
                  donde es válido equivocarse y aprender en el proceso.
                </p>
              </div>
            </div>

            {/* Visión */}
            <div className="bg-spark-blue/5 rounded-3xl p-6 sm:p-8 relative overflow-hidden border border-spark-blue/10">
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-spark-coral/10 rounded-full translate-y-16 -translate-x-16"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <Eye className="text-spark-coral" size={24} />
                  <h2 className="text-xl sm:text-2xl font-montserrat font-bold text-spark-dark">Nuestra Visión</h2>
                </div>
                <p className="text-base sm:text-lg font-inter text-spark-blue leading-relaxed">
                  Ser la comunidad estudiantil de referencia que forme profesionales seguros, creativos e 
                  innovadores, capaces de liderar proyectos tecnológicos que generen impacto positivo en 
                  la sociedad.
                </p>
              </div>
            </div>
          </div>

          {/* Objetivos */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-montserrat font-bold text-spark-dark text-center mb-8 sm:mb-12 px-4">
              Nuestros <span className="text-spark-coral">Objetivos</span>
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-4">
              {objectives.map((objective, index) => {
                const Icon = objective.icon;
                return (
                  <div key={index} className="text-center group">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-spark-yellow/10 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:bg-spark-yellow/20 transition-colors duration-300">
                      <Icon className="text-spark-blue group-hover:text-spark-dark transition-colors duration-300" size={24} />
                    </div>
                    <h3 className="text-lg sm:text-xl font-montserrat font-semibold text-spark-dark mb-3 sm:mb-4">
                      {objective.title}
                    </h3>
                    <p className="text-sm sm:text-base font-inter text-spark-blue leading-relaxed">
                      {objective.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;