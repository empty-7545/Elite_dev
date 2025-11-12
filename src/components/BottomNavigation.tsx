import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, 
  User, 
  Code, 
  FolderOpen, 
  GraduationCap, 
  MessageSquare, 
  Mail 
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
}

const BottomNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems: NavItem[] = [
    {
      id: 'home',
      label: 'Home',
      icon: <Home className="w-5 h-5 sm:w-6 sm:h-6" />,
      path: '/'
    },
    {
      id: 'about',
      label: 'About',
      icon: <User className="w-5 h-5 sm:w-6 sm:h-6" />,
      path: '/about'
    },
    {
      id: 'skills',
      label: 'Skills',
      icon: <Code className="w-5 h-5 sm:w-6 sm:h-6" />,
      path: '/skills'
    },
    {
      id: 'projects',
      label: 'Projects',
      icon: <FolderOpen className="w-5 h-5 sm:w-6 sm:h-6" />,
      path: '/projects'
    },
    {
      id: 'education',
      label: 'Education',
      icon: <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />,
      path: '/education'
    },
    {
      id: 'testimonials',
      label: 'Reviews',
      icon: <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />,
      path: '/testimonials'
    },
    {
      id: 'contact',
      label: 'Contact',
      icon: <Mail className="w-5 h-5 sm:w-6 sm:h-6" />,
      path: '/contact'
    }
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-gray-900/95 via-black/95 to-gray-900/95 backdrop-blur-lg border-t border-green-500/30">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-green-500/5 to-transparent pointer-events-none"></div>
      
      <div className="relative max-w-screen-xl mx-auto px-2 sm:px-4">
        <div className="flex items-center justify-between py-2 sm:py-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.path)}
              className={`
                group flex flex-col items-center justify-center min-w-0 flex-1 px-1 sm:px-2 py-2 sm:py-3 
                rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95
                ${isActive(item.path) 
                  ? 'text-green-400 bg-green-500/10 shadow-lg shadow-green-500/20' 
                  : 'text-gray-400 hover:text-green-300 hover:bg-green-500/5'
                }
              `}
            >
              {/* Icon */}
              <div className={`
                flex items-center justify-center mb-1 sm:mb-2 transition-all duration-300
                ${isActive(item.path) 
                  ? 'text-green-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]' 
                  : 'group-hover:text-green-300'
                }
              `}>
                {item.icon}
              </div>
              
              {/* Label - Hidden on mobile, visible on desktop */}
              <span className={`
                hidden sm:block text-xs font-medium transition-all duration-300 text-center leading-tight
                ${isActive(item.path) 
                  ? 'text-green-400 font-semibold' 
                  : 'text-gray-400 group-hover:text-green-300'
                }
              `}>
                {item.label}
              </span>
              
              {/* Active indicator dot for mobile */}
              <div className={`
                sm:hidden w-1 h-1 rounded-full transition-all duration-300 mt-1
                ${isActive(item.path) 
                  ? 'bg-green-400 shadow-[0_0_6px_rgba(34,197,94,0.8)]' 
                  : 'bg-transparent'
                }
              `}></div>
            </button>
          ))}
        </div>
      </div>
      
      {/* Bottom safe area for iOS devices */}
      <div className="h-safe-area-inset-bottom bg-gradient-to-t from-black/50 to-transparent"></div>
    </nav>
  );
};

export default BottomNavigation;
