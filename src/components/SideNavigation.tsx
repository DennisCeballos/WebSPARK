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
  const [pendingSection, setPendingSection] = React.useState<string | null>(null);

  const navItems = [
    { id: 'hero', label: 'Inicio', icon: Home, route: '/' },
    { id: 'presentation', label: 'Quiénes Somos', icon: Users, route: '/#presentation' },
    { id: 'invitation', label: 'Proyectos', icon: FolderOpen, route: '/#invitation' },
    { id: 'process', label: 'Cómo Iniciar', icon: Play, route: '/#process' },
    { id: 'contact', label: 'Contacto', icon: MessageCircle, route: '/#contact' },
  ];

  const handleNavigation = (item: typeof navItems[0]) => {
    if (location.pathname === '/') {
      onSectionChange(item.id);
      const element = document.getElementById(item.id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    } else {
      setPendingSection(item.id); // remember what section to scroll to
      navigate('/');
    }
  };

  React.useEffect(() => {
    if (location.pathname === '/' && pendingSection) {
      const element = document.getElementById(pendingSection);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        onSectionChange(pendingSection);
      }
      setPendingSection(null); // clear after scrolling
    }
  }, [location, pendingSection, onSectionChange]);


  return (
    <nav className="fixed left-0 top-1/3 sm:top-1/2 lg:top-1/2 transform -translate-y-1/2 z-50">
      <div className="group relative">
        {/* Semicircle background container */}
        <div
          className="
        bg-white/95 backdrop-blur-sm shadow-2xl rounded-r-full border-r-2 sm:border-r-3 lg:border-r-4 border-spark-yellow
        pl-3 sm:pl-4
        transition-all duration-500 ease-out
        h-56 sm:h-72 lg:h-96
        w-14 sm:w-20 lg:w-24              /* collapsed width (tab mode) */
        group-hover:w-40 sm:group-hover:w-52 lg:group-hover:w-64 /* expanded width (semicircle mode) */
        py-3 sm:py-4 lg:py-6 xl:py-8
        flex flex-col justify-center
      "
        >
          <div className="flex flex-col items-start space-y-3 sm:space-y-4 lg:space-y-6">
            {navItems.map((item) => {
              const { id, label, icon: Icon } = item;
              const isActive = activeSection === id;

              return (
                <button
                  key={id}
                  onClick={() => handleNavigation(item)}
                  className={`relative flex items-center transition-all duration-300 group/item ${isActive
                    ? 'text-spark-dark'
                    : 'text-spark-blue hover:text-spark-dark'
                    }`}
                >
                  {/* Icon container */}
                  <div
                    className={`flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 rounded-full transition-all duration-300 ${isActive
                      ? 'bg-spark-yellow shadow-lg scale-110'
                      : 'bg-spark-gray group-hover/item:bg-spark-yellow/20 group-hover/item:scale-105'
                      }`}
                  >
                    <Icon
                      size={12}
                      className="sm:size-[14px] lg:size-[16px] xl:size-[18px] transition-transform duration-300 group-hover/item:scale-110"
                    />
                  </div>

                  {/* Text label - appears on hover */}
                  <span
                    className={`
                  ml-2 sm:ml-3 xl:ml-4 font-inter font-medium text-xs sm:text-sm xl:text-base whitespace-nowrap
                  transition-all duration-500 ease-out
                  opacity-0 transform translate-x-4
                  group-hover:opacity-100 group-hover:translate-x-0
                  ${isActive ? 'font-semibold' : ''}
                `}
                  >
                    {label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>

  );
};

export default SideNavigation;