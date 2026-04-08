import React from 'react';
import {Helmet} from "react-helmet";
import HeroSection from '../components/HeroSection';
import PresentationSection from '../components/PresentationSection';
import InvitationSection from '../components/InvitationSection';
import ProcessSection from '../components/ProcessSection';
import ContactSection from '../components/ContactSection';

const HomePage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Iniciativa SPARK - Proyectos Tecnologicos para Aprender</title>
        <meta
          name="description"
          content="Aprende en la práctica desarrollando proyectos tecnológicos creativos e innovadores. Somos un Club de Universidad San Ignacio de Loyola - USIL orientada a ampliar las habilidades técnicas y poner en práctica las habilidades blandas dentro de proyectos de software. Inscríbete en los proyectos de la Iniciativa SPARK Usil y nosotros encontraremos integrantes con tus mismas aficiones."
        />
      </Helmet>
      <div id="hero">
        <HeroSection />
      </div>
      <div id="presentation">
        <PresentationSection />
      </div>
      <div id="invitation">
        <InvitationSection />
      </div>
      <div id="process">
        <ProcessSection />
      </div>
      <div id="contact">
        <ContactSection />
      </div>
    </>
  );
};

export default HomePage;