import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Particles from './Particles';
import logo from '../assets/Logo_Mini.svg'

const HeroSection: React.FC = () => {
  const [randomText, setRandomText] = useState('');

  // Posibles footers
  const opcionesFooters = [
    "Idea. Experimenta. Falla. Aprende. Repite.",
    "¿Tu portafolio está vacio? Toca hacer algo.",
    "¿Tienes ideas pero no equipo? Nosotros te conseguimos uno.",
    "¿Nuevo lenguaje? ¿Nuevas herramientas? Aquí se prueba todo.",
    "Haz ruido con tus ideas. Aprende haciendo.",
    "No hace falta tener todo claro. Solo hace falta empezar.",
    "¿Sin tiempo? ¿Sin ganas? Tal vez solo te falta un buen proyecto."
  ];

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * opcionesFooters.length);
    setRandomText(opcionesFooters[randomIndex]);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden"> {/*hidden*/}

      <div className="absolute w-screen h-screen bg-black overflow-hidden"> {/*hidden*/}
        {/* Background blurred glow */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[600px] h-[600px] rounded-full bg-blue-500 blur-[200px] opacity-90 transform translate-y-3/4"></div>
        </div>

        {/* Particulas de fondo girando */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <Particles
              particleColors={['#ffffff', '#f6e05e']}
              particleCount={200}
              particleSpread={10}
              speed={0.1}
              particleBaseSize={150}
              moveParticlesOnHover={false}
              alphaParticles={false}
              disableRotation={false}
            />
          </div>
        </div>


        {/* PARTE DE LA FIGURA DEL MUNDO */}
        {/* Solid vibrant blue horizon 
        */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-3/4">
          <div className="w-[100vw] aspect-video bg-blue-600 rounded-t-full"></div>
        </div>

        {/* White horizon 
        */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-3/4">
          <div className="w-[calc(100vw-25px)] aspect-video bg-white rounded-t-full"></div>
        </div>

        {/* Black horizon 
        */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-3/4">
          <div className="w-[calc(100vw-85px)] aspect-video bg-black rounded-t-full"></div>
        </div>

        {
          /*
          PARTE DEL MUNDO V2
          */
        }
        {/* Main world semicircle
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          <div className="w-[850px] h-[530px] bg-blue-600 rounded-t-full"></div>
        </div>
        */}

        {/* Outer glow ring
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          <div className="w-[820px] h-[520px] bg-white to-transparent rounded-t-full"></div>
        </div>
        */}

        {/* Inner black core
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          <div className="w-[800px] h-[500px] bg-black to-transparent rounded-t-full"></div>
        </div>
        */}


      </div>

      <div className="container mx-auto px-6 lg:px-12 text-center relative z-10 pt-8 sm:pt-12 lg:pt-16">
        <div className="max-w-4xl mx-auto">
          {/* Container para todo lo del logo */}
          <div className="h-[20dvh] aspect-square flex justify-center items-center mx-auto">

            {/* Logo flotando*/}
            <div className="relative flex justify-center items-center w-full h-full animate-float">
              {/* Sombra del logo */}
              <div className="absolute w-full h-full flex justify-center items-center">
                <div className="w-[70%] aspect-square bg-spark-gray rounded-full blur-2xl opacity-25">
                  {/* Zap icon (easily replaceable)
                <Zap size={32} className="sm:size-[40px] text-spark-yellow" />
                */}
                </div>
              </div>
              {/* Logo */}
              <img src={logo} alt="SPARK Logo" className="w-[80%] h-[80%] object-contain relative z-10" />
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-montserrat font-bold text-white mb-6 leading-tight">
            Iniciativa
            <span className="text-spark-yellow ml-2 sm:ml-4 drop-shadow-lg">SPARK</span>
          </h1>

          <p className="text-shadow-white sm:text-xl lg:text-2xl font-inter text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed px-4">
            Impulsa tu creatividad, innovación y <span className='font-bold'>confianza</span> a través del desarrollo de proyectos colaborativos de Software
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
            <button
              onClick={() => {
                document.getElementById('invitation')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto bg-spark-yellow hover:bg-spark-coral text-spark-dark font-inter font-semibold px-6 sm:px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center justify-center gap-2">
              Inscribirse en un Proyecto
              <ArrowRight size={20} />
            </button>
            <button
            onClick={() => {
                document.getElementById('presentation')?.scrollIntoView({ behavior: 'smooth' });
              }}
            className="w-full sm:w-auto border-2 border-white/30 text-white hover:bg-white hover:text-spark-dark font-inter font-semibold px-6 sm:px-8 py-4 rounded-full transition-all duration-300 backdrop-blur-sm">
              Conocer Más
            </button>
          </div>
        </div>
      </div>

      {/* Small glowing text at the bottom */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-lg text-white text-center">
        <p className="text-white drop-shadow-[0_0_2px_blue] hover:drop-shadow-[0px_2px_2px_blue] animate-fade-in duration-700">
          {randomText}
        </p>
      </div>

    </section>
  );
};

export default HeroSection;