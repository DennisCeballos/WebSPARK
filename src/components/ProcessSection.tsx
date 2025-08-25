import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, UserPlus, Users, Rocket, Trophy } from 'lucide-react';

interface ProcessStep {
  id: number;
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}

const ProcessSection: React.FC = () => {
  const navigate = useNavigate();
  const steps: ProcessStep[] = [
    {
      id: 1,
      icon: Search,
      title: 'Explora Proyectos',
      description: 'Navega por nuestra lista de proyectos disponibles, revisa las descripciones, objetivos y tecnologías que se utilizarán.',
      color: 'text-spark-yellow'
    },
    {
      id: 2,
      icon: UserPlus,
      title: 'Inscríbete',
      description: 'Selecciona el proyecto que más te interese y completa tu inscripción con tus datos.',
      color: 'text-spark-coral'
    },
    {
      id: 3,
      icon: Users,
      title: 'Formación de Equipos',
      description: 'Recopilamremos las inscripciones y formaremos equipos que trabajen juntos de manera efectiva.',
      color: 'text-spark-blue'
    },
    {
      id: 4,
      icon: Rocket,
      title: 'Desarrollo y Apoyo',
      description: 'Te acompañamos durante la planeación y desarrollo del proyecto, brindando orientación y recursos necesarios.',
      color: 'text-spark-yellow'
    },
    {
      id: 5,
      icon: Trophy,
      title: 'Producto Final',
      description: 'Culminamos con la presentación del producto final, celebrando los logros y compartiendo la experiencia con la comunidad.',
      color: 'text-spark-coral'
    }
  ];

  return (
    <section className="min-h-screen bg-white py-20 px-6 lg:px-12">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-montserrat font-bold text-spark-dark mb-4 px-4">
            Cómo <span className="text-spark-yellow">Iniciar</span>
          </h2>
          <p className="text-base sm:text-lg font-inter text-spark-blue max-w-3xl mx-auto px-4">
            Nuestro proceso está diseñado para ser simple, inclusivo y orientado al aprendizaje colaborativo
          </p>
          <div className="w-20 h-1 bg-spark-coral mx-auto mt-4"></div>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-spark-yellow via-spark-coral to-spark-blue opacity-30"></div>
          {/* Mobile Timeline line - left side */}
          <div className="lg:hidden absolute left-8 w-1 h-full bg-gradient-to-b from-spark-yellow via-spark-coral to-spark-blue opacity-30"></div>

          <div className="space-y-6 lg:space-y-10 px-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0; // Only used for desktop layout

              return (
                <div key={step.id} className={`flex items-center ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} flex-row lg:gap-12 gap-4`}>
                  {/* Content */}
                  <div className={`flex-1 ${isEven ? 'lg:text-right' : 'lg:text-left'} text-left`}>
                    <div className="bg-spark-gray rounded-xl p-4 sm:p-5 shadow-md hover:shadow-lg transition-all duration-300 group relative overflow-hidden">
                      {/* Background Icon */}
                      <div className="absolute bottom-0 left-0 transform translate-y-1/2 -translate-x-1/4">
                        <Icon className={`${step.color} opacity-50`} size={80} />
                      </div>

                      {/* Content with relative positioning to stay above background icon */}
                      <div className="relative z-10">
                        <h3 className="text-base sm:text-lg lg:text-xl font-montserrat font-bold text-spark-dark mb-2 sm:mb-3">
                          {step.title}
                        </h3>
                        <p className="text-sm sm:text-base font-inter text-spark-blue leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Step number */}
                  <div className="relative z-10 flex-shrink-0 order-first lg:order-none">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white border-2 sm:border-3 border-spark-yellow rounded-full flex flex-col items-center justify-center shadow-lg relative group">
                      {/* Icon - visible on mobile, hidden on desktop */}
                      <Icon className={`${step.color} lg:hidden`} size={12} />
                      {/* Number - visible on mobile below icon, centered on desktop */}
                      <span className="font-montserrat font-bold text-spark-dark text-xs lg:text-sm">
                        {step.id}
                      </span>
                    </div>
                  </div>

                  {/* Spacer for the other side */}
                  <div className="flex-1 hidden lg:block"></div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center mt-10">
          <div className="bg-spark-yellow/10 rounded-xl p-4 sm:p-6 max-w-xl mx-auto">
            <h3 className="text-lg sm:text-xl font-montserrat font-bold text-spark-dark mb-3">
              ¿Listo para empezar?
            </h3>
            <p className="text-sm font-inter text-spark-blue mb-4">
              Elige el proyecto que más te llame la atención y preparate para el trabajo en groupp
            </p>
            <button
              onClick={() => {
                navigate('/projects')
                window.scrollTo({ top: 0, behavior: 'instant' }); // reset scroll
              }}
              className="bg-spark-yellow hover:bg-spark-coral text-spark-dark font-inter font-semibold px-5 sm:px-6 py-2 sm:py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg text-sm">
              Explorar Proyectos Disponibles
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;