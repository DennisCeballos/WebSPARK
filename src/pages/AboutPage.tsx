import React from 'react';
import { ArrowLeft, Target, Eye, Users, Code, Briefcase, MessageSquare, Gem } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  const objectives = [
    {
      icon: Code,
      title: "Fomentamos el aprendizaje",
      description: "Motivamos a los estudiantes a perder el miedo a explorar nuevas herramientas y tecnologías"
    },
    {
      icon: Users,
      title: "Conexión con personas",
      description: "Creamos espacios de estudio donde estudiantes con intereses similares se conecten y trabajen juntos"
    },
    {
      icon: Gem,
      title: "Impulsa tus ideas",
      description: "Si tienes una idea o concepto pero no sabes cómo iniciarla, te brindamos orientación y las herramientas necesarias para dar los primeros pasos."
    },
    {
      icon: Briefcase,
      title: "Fomentar el portafolio personal",
      description: "Incentivamos la creación de proyectos que sumen experiencia real y evidencien habilidades"
    },

  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header with back button */}
      <div className="bg-spark-gray py-6 px-6 lg:px-12">
        <div className="container mx-auto max-w-6xl">
          <button
            onClick={() => {
              navigate('/')
            }}
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
          <div className="text-wrap mb-16">
            <div className="max-w-4xl mx-auto px-4">
              <p className="text-lg sm:text-xl font-inter text-spark-blue leading-relaxed mb-8">
                Somos un grupo de estudiantes comprometidos con
                <strong className="text-spark-dark">fomentar la confianza y la iniciativa en el desarrollo de proyectos y actividades grupales</strong>.
                Creemos en la importancia de aprender haciendo, pero sabemos que dar los primeros
                pasos puede ser desafiante. Por ello, queremos brindarte el apoyo necesario para que
                <span className="text-spark-coral font-semibold">inicies tu camino sin miedo a equivocarte</span>.
              </p>

              <p className="text-base sm:text-lg font-inter text-spark-blue leading-relaxed mb-12">
                Nuestro objetivo es <strong className="text-spark-dark">crear un ambiente colaborativo y seguro</strong>
                en el que puedas comenzar a construir tu portafolio, conectar con otros apasionados por la programación y experimentar el
                <span className="text-spark-coral font-semibold">trabajo en equipo</span> sin presiones.
              </p>
            </div>
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
                  Fomentar la creatividad y el desarrollo de proyectos innovadores, donde cada integrante se sienta libre de explorar
                  su potencial y superar sus miedos
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
                  Ser una asociación interdisciplinaria reconocida por su capacidad de motivar proyectos innovadores y audaces,
                  donde el trabajo en equipo y la superación personal sean los pilares para alcanzar metas extraordinarias
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
        <div className="text-center pt-24">
          <button
            onClick={() => window.location.href = "https://chat.whatsapp.com/H5p9xM7Due7BQ73cpXg9Om"}
            className="bg-green-500 hover:bg-green-700 text-white font-inter font-semibold px-8 sm:px-10 py-4 sm:py-5 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-3 mx-auto text-base sm:text-lg"
          >
            <MessageSquare size={24} />
            Únete a nuestra comunidad
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;