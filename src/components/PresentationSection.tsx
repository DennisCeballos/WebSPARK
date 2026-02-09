import React from 'react';
import { Users, Lightbulb, Code, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PresentationSection: React.FC = () => {
  const navigate = useNavigate();
  const benefits = [
    {
      icon: Users,
      title: "Encuentra equipos colaborativos",
      description: "Conecta con estudiantes que comparten tus intereses y forma equipos de confianza"
    },
    {
      icon: Code,
      title: "Aprende nuevas tecnologías",
      description: "Explora herramientas nuevas sin la presión de la perfección académica"
    },
    {
      icon: Lightbulb,
      title: "Haz crecer tu portafolio",
      description: "Desarrolla experiencia práctica en proyectos que te permita enriquecer tu portafolio profesional"
    }
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-spark-gray to-white px-6 lg:px-12 flex items-center">
      <div className="w-full py-10">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl pt-10 lg:text-5xl font-montserrat font-bold text-spark-dark mb-6 leading-tight px-4">
              ¿Te faltan equipos de <span className="text-spark-yellow">proyectos</span>?
            </h2>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-montserrat font-semibold text-spark-coral mb-4 px-4">
              ¿Quisieras aprender nuevos conceptos de forma práctica?
            </h3>
            <div className="w-24 h-1 bg-spark-coral mx-auto mb-4"></div>


            <p className="text-lg sm:text-xl font-inter text-spark-blue leading-relaxed mb-6">
              En <strong className="text-spark-dark">Iniciativa SPARK</strong> proponemos la creación de grupos de estudio en donde estudiantes
              puedan <span className="text-spark-coral font-semibold">impulsar su creatividad e innovación</span> a través del desarrollo
              de proyectos colaborativos sin fines de lucro.
            </p>

            <p className="text-base sm:text-lg font-inter text-spark-blue leading-relaxed mb-4">
              Aquí es válido <strong className="text-spark-dark">equivocarse, experimentar y aprender</strong> en el proceso. Te ayudamos a perder el miedo
              a explorar nuevas tecnologías mientras construyes un portafolio que realmente demuestre tus habilidades.
            </p>
          </div>

          <div className="flex gap-6 mb-4 px-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-6 pt-2 justify-start md:justify-center">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-spark-gray shadow-[8px_8px_16px_rgba(0,0,0,0.05),_-4px_-4px_12px_rgba(255,255,255,0.8)] hover:shadow-[10px_10px_18px_rgba(0,0,0,0.08),_-6px_-6px_14px_rgba(255,255,255,0.9)] transition-all duration-300 min-w-[280px] max-w-[320px] snap-start flex flex-col"
                >
                  {/* Icono en esquina con “resplandor” */}
                  <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/4">
                    <Icon className="text-spark-coral opacity-40 blur-[0.5px]" size={80} />
                  </div>

                  <div className="relative z-10 flex-1">
                    <h4 className="text-lg sm:text-xl font-montserrat font-semibold text-spark-dark mb-3">
                      {benefit.title}
                    </h4>
                    <p className="text-sm sm:text-base font-inter text-spark-blue leading-relaxed flex-1">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <button
              onClick={() => {
                navigate('/about');
              }
              }
              className="bg-spark-yellow hover:bg-spark-coral text-spark-dark font-inter font-semibold px-8 sm:px-10 py-4 sm:py-5 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-3 mx-auto text-base sm:text-lg"
            >
              Conoce más de nosotros
              <ArrowRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PresentationSection;