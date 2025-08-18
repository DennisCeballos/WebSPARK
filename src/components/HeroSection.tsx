import React from 'react';
import { ArrowRight, Zap } from 'lucide-react';
import Particles from './Particles';

const HeroSection: React.FC = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative pt-20 overflow-hidden">

      <div className="absolute w-screen h-screen bg-black overflow-hidden">
        {/* Particulas de fondo girando */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <Particles
              particleColors={['#ffffff']} //'#f6e05e'
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

        {/* Background blurred glow */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[600px] h-[600px] rounded-full bg-blue-500 blur-[250px] opacity-40"></div>
        </div>

        {/* PARTE DE LA FIGURA DEL MUNDO */}
        {/* Solid vibrant blue horizon 
        */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-3/4">
          <div className="w-[80vw] aspect-[1/1] bg-blue-600 rounded-full"></div>
        </div>

        {/* White horizon 
        */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-3/4">
          <div className="w-[calc(80vw-20px)] aspect-[1/1] bg-white rounded-full"></div>
        </div>

        {/* Black horizon 
        */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-3/4">
          <div className="w-[calc(80vw-60px)] aspect-[1/1] bg-black rounded-full"></div>
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
          {/* Logo with floating animation */}
          <div className="mb-8 flex justify-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-blue-900 rounded-full flex items-center justify-center shadow-2xl animate-float">
              {/* Current logo - Zap icon (easily replaceable) */}
              <Zap size={32} className="sm:size-[40px] text-spark-yellow" />
              {/* 
                To replace with custom logo, replace the Zap component above with:
                <img src="/path-to-your-logo.png" alt="SPARK Logo" className="w-8 h-8 sm:w-10 sm:h-10" />
              */}
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-montserrat font-bold text-white mb-6 leading-tight">
            Iniciativa
            <span className="text-spark-yellow ml-2 sm:ml-4 drop-shadow-lg">SPARK</span>
          </h1>

          <p className="text-lg sm:text-xl lg:text-2xl font-inter text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed px-4">
            Impulsa tu creatividad, innovación y confianza a través del desarrollo de proyectos colaborativos en Ingeniería de Software
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
            <button className="w-full sm:w-auto bg-spark-yellow hover:bg-spark-coral text-spark-dark font-inter font-semibold px-6 sm:px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center justify-center gap-2">
              Inscribirse en un Proyecto
              <ArrowRight size={20} />
            </button>
            <button className="w-full sm:w-auto border-2 border-white/30 text-white hover:bg-white hover:text-spark-dark font-inter font-semibold px-6 sm:px-8 py-4 rounded-full transition-all duration-300 backdrop-blur-sm">
              Conocer Más
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;