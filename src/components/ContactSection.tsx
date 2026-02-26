import React from 'react';
import { FaWhatsapp, FaLinkedin } from 'react-icons/fa';

interface ContactItem {
  id: string;
  icon: React.ElementType;
  label: string;
  value: string;
  link?: string;
  color: string;
}

const ContactSection: React.FC = () => {
  // Información de contacto - fácil de modificar
  const contactInfo: ContactItem[] = [
    {
      id: 'whatsapp',
      icon: FaWhatsapp,
      label: 'WhatsApp',
      value: 'Comunidad de WhatsApp',
      link: 'https://chat.whatsapp.com/H5p9xM7Due7BQ73cpXg9Om',
      color: 'text-green-500'
    },
    {
      id: 'linkedin',
      icon: FaLinkedin,
      label: 'LinkedIn',
      value: 'Iniciativa SPARK',
      link: 'https://www.linkedin.com/company/iniciativa-spark',
      color: 'text-blue-600'
    }
    /*
    {
      id: 'email',
      icon: Mail,
      label: 'Email',
      value: 'spark@universidad.edu.co',
      link: 'mailto:spark@universidad.edu.co',
      color: 'text-spark-coral'
    },
    {
      id: 'instagram',
      icon: Instagram,
      label: 'Instagram',
      value: '@iniciativa_spark',
      link: 'https://instagram.com/iniciativa_spark',
      color: 'text-pink-500'
    },
    */
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-spark-blue to-spark-blue/80 py-20 px-6 lg:px-12 text-white flex items-center">
      <div className="container mx-auto max-w-4xl h-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-montserrat font-bold mb-6 px-4">
            Conecta con <span className="text-spark-yellow">Nosotros</span>
          </h2>
          <p className="text-lg sm:text-xl font-inter opacity-90 max-w-2xl mx-auto px-4">
            ¿Tienes preguntas, ideas o quieres formar parte de nuestra comunidad?
            Estamos aquí para apoyarte en tu viaje de aprendizaje
          </p>
          <div className="w-24 h-1 bg-spark-yellow mx-auto mt-6"></div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16 px-4">
          {contactInfo.map((contact) => {
            const Icon = contact.icon;
            return (
              <a
                key={contact.id}
                href={contact.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 group"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300`}>
                    <Icon className={`${contact.color} group-hover:scale-110 transition-transform duration-300`} size={36} />
                  </div>
                  <div>
                    <h3 className="font-montserrat font-semibold text-base sm:text-lg mb-1">
                      {contact.label}
                    </h3>
                    <p className="text-sm sm:text-base font-inter text-white/80 group-hover:text-white transition-colors duration-300">
                      {contact.value}
                    </p>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        {/* Campus Info
        <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 mx-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <MapPin className="text-spark-yellow" size={20} />
            <h3 className="text-lg sm:text-xl font-montserrat font-semibold">Nos encontramos en</h3>
          </div>
          <p className="text-base sm:text-lg font-inter text-white/90 mb-2">
            Facultad de Ingeniería de Software
          </p>
          <p className="text-sm sm:text-base font-inter text-white/80">
            Universidad [Nombre de tu Universidad]
          </p>
        </div>
        */}
      </div>
    </section>
  );
};

export default ContactSection;