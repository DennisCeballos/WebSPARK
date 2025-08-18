import React from 'react';
import { Target, Eye, Users, Code, Lightbulb } from 'lucide-react';

const AboutSection: React.FC = () => {
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
    <section className="min-h-screen bg-white py-20 px-6 lg:px-12">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-montserrat font-bold text-spark-dark mb-6">
            Quiénes <span className="text-spark-yellow">Somos</span>
          </h2>
          <div className="w-24 h-1 bg-spark-coral mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          {/* Misión */}
          <div className="bg-spark-gray rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-spark-yellow/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <Target className="text-spark-yellow" size={32} />
                <h3 className="text-2xl font-montserrat font-bold text-spark-dark">Nuestra Misión</h3>
              </div>
              <p className="font-inter text-spark-blue leading-relaxed text-lg">
                Impulsar la creatividad, innovación y confianza de los estudiantes de Ingeniería de Software 
                a través del desarrollo de proyectos colaborativos sin fines de lucro, creando un ambiente 
                donde es válido equivocarse y aprender en el proceso.
              </p>
            </div>
          </div>

          {/* Visión */}
          <div className="bg-spark-blue/5 rounded-3xl p-8 relative overflow-hidden border border-spark-blue/10">
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-spark-coral/10 rounded-full translate-y-16 -translate-x-16"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <Eye className="text-spark-coral" size={32} />
                <h3 className="text-2xl font-montserrat font-bold text-spark-dark">Nuestra Visión</h3>
              </div>
              <p className="font-inter text-spark-blue leading-relaxed text-lg">
                Ser la comunidad estudiantil de referencia que forme profesionales seguros, creativos e 
                innovadores, capaces de liderar proyectos tecnológicos que generen impacto positivo en 
                la sociedad.
              </p>
            </div>
          </div>
        </div>

        {/* Objetivos */}
        <div>
          <h3 className="text-3xl font-montserrat font-bold text-spark-dark text-center mb-12">
            Nuestros <span className="text-spark-coral">Objetivos</span>
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {objectives.map((objective, index) => {
              const Icon = objective.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="w-20 h-20 bg-spark-yellow/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-spark-yellow/20 transition-colors duration-300">
                    <Icon className="text-spark-blue group-hover:text-spark-dark transition-colors duration-300" size={32} />
                  </div>
                  <h4 className="text-xl font-montserrat font-semibold text-spark-dark mb-4">
                    {objective.title}
                  </h4>
                  <p className="font-inter text-spark-blue leading-relaxed">
                    {objective.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;