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
    <section className="min-h-screen bg-gradient-to-br from-spark-gray to-white py-20 px-6 lg:px-12 flex items-center">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-montserrat font-bold text-spark-dark mb-6 leading-tight px-4">
            ¿Te faltan equipos de <span className="text-spark-yellow">proyectos</span>?
          </h2>
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-montserrat font-semibold text-spark-coral mb-8 px-4">
            ¿Quisieras aprender nuevos conceptos de forma práctica?
          </h3>
          <div className="w-24 h-1 bg-spark-coral mx-auto mb-8"></div>
          
          <div className="max-w-4xl mx-auto px-4">
            <p className="text-lg sm:text-xl font-inter text-spark-blue leading-relaxed mb-8">
              En <strong className="text-spark-dark">Iniciativa SPARK</strong> proponemos la creación de grupos de estudio en donde estudiantes
              puedan <span className="text-spark-coral font-semibold">impulsar su creatividad e innovación</span> a través del desarrollo 
              de proyectos colaborativos sin fines de lucro.
            </p>
            
            <p className="text-base sm:text-lg font-inter text-spark-blue leading-relaxed mb-12">
              Aquí es válido <strong className="text-spark-dark">equivocarse, experimentar y aprender</strong> en el proceso. Te ayudamos a perder el miedo 
              a explorar nuevas tecnologías mientras construyes un portafolio que realmente demuestre tus habilidades.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 px-4">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div key={index} className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 group text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-spark-yellow/10 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:bg-spark-yellow/20 transition-colors duration-300">
                  <Icon className="text-spark-coral group-hover:scale-110 transition-transform duration-300" size={24} />
                </div>
                <h4 className="text-lg sm:text-xl font-montserrat font-semibold text-spark-dark mb-3 sm:mb-4">
                  {benefit.title}
                </h4>
                <p className="text-sm sm:text-base font-inter text-spark-blue leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <button
            onClick={() => {
              navigate('/about');
              window.scrollTo({ top: 0, behavior: 'instant' }); // reset scroll
            }
            }
            className="bg-spark-yellow hover:bg-spark-coral text-spark-dark font-inter font-semibold px-8 sm:px-10 py-4 sm:py-5 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-3 mx-auto text-base sm:text-lg"
            >
            Conoce más de nosotros
            <ArrowRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default PresentationSection;