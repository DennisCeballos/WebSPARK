import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Users, FolderOpen, Play, MessageCircle } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const SideNavigation: React.FC<NavigationProps> = ({ activeSection, onSectionChange }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: 'hero', label: 'Inicio', icon: Home },
    { id: 'presentation', label: 'Quiénes Somos', icon: Users},
    { id: 'invitation', label: 'Proyectos', icon: FolderOpen},
    { id: 'process', label: 'Cómo Iniciar', icon: Play },
    { id: 'contact', label: 'Contacto', icon: MessageCircle },
  ];

  const handleNavigation = (item: typeof navItems[0]) => {
    /*
    if (item.route) {
      navigate(item.route);
    } else {
      onSectionChange(item.id);
    }
    */
    onSectionChange(item.id);
  };

  return (
    <nav className="fixed left-0 top-1/3 sm:top-1/2 lg:top-1/2 transform -translate-y-1/2 z-50">
        <div className="group relative">
          {/* Semicircle background container */}
          <div className="bg-white/95 backdrop-blur-sm shadow-2xl rounded-r-full border-r-2 sm:border-r-3 lg:border-r-4 border-spark-yellow transition-all duration-500 ease-out group-hover:pr-4 sm:group-hover:pr-6 lg:group-hover:pr-8 pr-2 sm:pr-3 lg:pr-4 py-3 sm:py-4 lg:py-6 xl:py-8 pl-2 sm:pl-3 lg:pl-4 xl:pl-6">
            <div className="flex flex-col space-y-3 sm:space-y-4 lg:space-y-6">
              {navItems.map((item) => {
                const { id, label, icon: Icon } = item;
                const isActive = activeSection === id;
                
                return (
                  <button
                    key={id}
                    onClick={() => handleNavigation(item)}
                    className={`relative flex items-center transition-all duration-300 group/item ${
                      isActive
                        ? 'text-spark-dark'
                        : 'text-spark-blue hover:text-spark-dark'
                    }`}
                  >
                    {/* Icon container */}
                    <div className={`flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 xl:w-10 xl:h-10 rounded-full transition-all duration-300 ${
                      isActive
                        ? 'bg-spark-yellow shadow-lg scale-110'
                        : 'bg-spark-gray group-hover/item:bg-spark-yellow/20 group-hover/item:scale-105'
                    }`}>
                      <Icon size={12} className="sm:size-[14px] lg:size-[16px] xl:size-[18px] transition-transform duration-300 group-hover/item:scale-110" />
                    </div>
                    
                    {/* Text label - appears on hover */}
                    <span className={`ml-2 sm:ml-3 xl:ml-4 font-inter font-medium text-xs sm:text-sm xl:text-base whitespace-nowrap transition-all duration-500 ease-out ${
                      'opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0'
                    } ${isActive ? 'font-semibold' : ''}`}>
                      {label}
                    </span>
                    
                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute -right-1 sm:-right-2 w-0.5 sm:w-1 h-6 sm:h-7 lg:h-8 bg-spark-coral rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
          
          {/* Decorative elements 
          <div className="absolute top-1 sm:top-2 right-0 w-1 sm:w-1.5 lg:w-2 h-1 sm:h-1.5 lg:h-2 bg-spark-coral rounded-full opacity-60"></div>
          <div className="absolute bottom-1 sm:bottom-2 right-0 w-0.5 sm:w-1 h-0.5 sm:h-1 bg-spark-yellow rounded-full opacity-80"></div>
          */}
        </div>
    </nav>
  );
};

export default SideNavigation;