import React from 'react';
import { 
  Home, 
  MessageCircle, 
  BookOpen, 
  Settings, 
  LogOut, 
  Scale,
  FileText,
  Users,
  HelpCircle,
  X,
  Briefcase
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  onNavigate?: (page: string) => void;
  currentPage?: string; // Add currentPage prop to track active page
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onLogout, onNavigate, currentPage = 'dashboard' }) => {
  const menuItems = [
    { icon: Home, label: 'Dashboard', page: 'dashboard', active: currentPage === 'dashboard', comingSoon: false },
    { icon: MessageCircle, label: 'Ask a Question', page: 'ask', active: currentPage === 'ask', comingSoon: false },
    { icon: Briefcase, label: 'My Cases', page: 'cases', active: currentPage === 'cases', comingSoon: true },
    { icon: FileText, label: 'Documents', page: 'documents', active: currentPage === 'documents', comingSoon: true },
    { icon: Users, label: 'Find Lawyers', page: 'lawyers', active: currentPage === 'lawyers', comingSoon: true },
    { icon: Scale, label: 'Court Procedures', page: 'procedures', active: currentPage === 'procedures', comingSoon: true },
    { icon: HelpCircle, label: 'Help & Support', page: 'help', active: currentPage === 'help', comingSoon: true },
    { icon: Settings, label: 'Settings', page: 'settings', active: currentPage === 'settings', comingSoon: true },
  ];

  const handleItemClick = (page: string, comingSoon: boolean) => {
    if (comingSoon) {
      alert('This feature is coming soon!');
      return;
    }
    if (onNavigate) {
      onNavigate(page);
    }
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    }`}>
      <div className="flex items-center justify-between p-4 border-b border-indian-gold/20">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-indian-maroon rounded-full flex items-center justify-center mr-3">
            <Scale className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-serif font-bold text-indian-maroon">
              न्याय सहायक
            </h2>
            <p className="text-xs text-gray-600">Legal Assistant</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="lg:hidden p-2 rounded-md hover:bg-indian-cream transition-colors"
        >
          <X className="h-5 w-5 text-indian-maroon" />
        </button>
      </div>

      <nav className="mt-6 px-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <button
                onClick={() => handleItemClick(item.page, item.comingSoon)}
                className={`flex items-center w-full px-4 py-3 rounded-lg transition-all duration-200 group ${
                  item.active 
                    ? item.page === 'ask' 
                      ? 'bg-red-600 text-white shadow-lg' 
                      : 'bg-indian-maroon text-white shadow-lg' 
                    : 'text-gray-700 hover:bg-indian-cream hover:text-indian-maroon'
                } ${item.comingSoon ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                <item.icon className={`h-5 w-5 mr-3 ${
                  item.active ? 'text-white' : 'text-indian-maroon group-hover:text-indian-maroon'
                }`} />
                <span className="font-medium">{item.label}</span>
                {item.comingSoon && (
                  <span className="ml-2 bg-gray-200 text-gray-700 text-xs font-semibold px-2 py-1 rounded-full">
                    Coming Soon
                  </span>
                )}
                {item.active && (
                  <div className="ml-auto w-2 h-2 bg-indian-gold rounded-full"></div>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-indian-gold/20">
        <button
          onClick={onLogout}
          className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all duration-200 group"
        >
          <LogOut className="h-5 w-5 mr-3 text-red-500 group-hover:text-red-600" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;