import React from 'react';
import { Search, UserPlus, Users, Rocket, Trophy } from 'lucide-react';

interface ProcessStep {
  id: number;
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}

const ProcessSection: React.FC = () => {
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
      description: 'Selecciona el proyecto que más te interese y completa tu inscripción con tus datos y experiencia.',
      color: 'text-spark-coral'
    },
    {
      id: 3,
      icon: Users,
      title: 'Formación de Equipos',
      description: 'Recopilamos las inscripciones y formamos equipos balanceados para que trabajen juntos de manera efectiva.',
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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-montserrat font-bold text-spark-dark mb-6 px-4">
            Cómo <span className="text-spark-yellow">Iniciar</span>
          </h2>
          <p className="text-lg sm:text-xl font-inter text-spark-blue max-w-3xl mx-auto px-4">
            Nuestro proceso está diseñado para ser simple, inclusivo y orientado al aprendizaje colaborativo
          </p>
          <div className="w-24 h-1 bg-spark-coral mx-auto mt-6"></div>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-spark-yellow via-spark-coral to-spark-blue opacity-30"></div>
          {/* Mobile Timeline line - left side */}
          <div className="lg:hidden absolute left-8 w-1 h-full bg-gradient-to-b from-spark-yellow via-spark-coral to-spark-blue opacity-30"></div>

          <div className="space-y-12 lg:space-y-16 px-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0; // Only used for desktop layout
              
              return (
                <div key={step.id} className={`flex items-center ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} flex-row lg:gap-16 gap-6`}>
                  {/* Content */}
                  <div className={`flex-1 ${isEven ? 'lg:text-right' : 'lg:text-left'} text-left`}>
                    <div className="bg-spark-gray rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 group">
                      <div className={`hidden lg:flex items-center justify-center lg:${isEven ? 'justify-end' : 'justify-start'} mb-6`}>
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                          <Icon className={`${step.color} group-hover:scale-110 transition-transform duration-300`} size={24} />
                        </div>
                      </div>
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-montserrat font-bold text-spark-dark mb-3 sm:mb-4">
                        {step.title}
                      </h3>
                      <p className="text-sm sm:text-base lg:text-lg font-inter text-spark-blue leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Step number */}
                  <div className="relative z-10 flex-shrink-0 order-first lg:order-none">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white border-3 sm:border-4 border-spark-yellow rounded-full flex flex-col items-center justify-center shadow-xl relative group">
                      {/* Icon - visible on mobile, hidden on desktop */}
                      <Icon className={`${step.color} lg:hidden`} size={14} />
                      {/* Number - visible on mobile below icon, centered on desktop */}
                      <span className="font-montserrat font-bold text-spark-dark text-xs sm:text-sm lg:text-base lg:text-lg">
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

        <div className="text-center mt-16">
          <div className="bg-spark-yellow/10 rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-montserrat font-bold text-spark-dark mb-4">
              ¿Listo para empezar?
            </h3>
            <p className="text-sm sm:text-base font-inter text-spark-blue mb-6">
              Únete a nuestra comunidad y comienza tu viaje de aprendizaje colaborativo
            </p>
            <button className="bg-spark-yellow hover:bg-spark-coral text-spark-dark font-inter font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base">
              Explorar Proyectos Disponibles
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;