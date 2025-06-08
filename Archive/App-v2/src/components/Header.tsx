import React from 'react';
import { Menu, Bell, User, LogOut, Shield } from 'lucide-react';

interface HeaderProps {
  onMenuToggle: () => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle, onLogout }) => {
  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-indian-gold/20 shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Side - Menu Toggle & Logo */}
          <div className="flex items-center">
            <button
              onClick={onMenuToggle}
              className="lg:hidden p-2 rounded-md hover:bg-indian-cream transition-colors"
            >
              <Menu className="h-6 w-6 text-indian-maroon" />
            </button>
            
            <div className="flex items-center ml-4 lg:ml-0">
              <Shield className="h-8 w-8 text-indian-maroon mr-2" />
              <span className="text-xl font-serif font-bold text-indian-maroon">
                Nyaaya Sahayak
              </span>
            </div>
          </div>

          {/* Right Side - Notifications & User Menu */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="p-2 rounded-full hover:bg-indian-cream transition-colors relative">
              <Bell className="h-6 w-6 text-indian-maroon" />
              <span className="absolute top-1 right-1 h-3 w-3 bg-red-500 rounded-full"></span>
            </button>

            {/* User Menu */}
            <div className="relative group">
              <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-indian-cream transition-colors">
                <div className="w-8 h-8 bg-indian-maroon rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <span className="hidden sm:block text-sm font-medium text-indian-maroon">
                  Legal Seeker
                </span>
              </button>

              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-indian-gold/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  <a
                    href="#"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-indian-cream transition-colors"
                  >
                    <User className="h-4 w-4 mr-3" />
                    Profile
                  </a>
                  <button
                    onClick={onLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-indian-cream transition-colors"
                  >
                    <LogOut className="h-4 w-4 mr-3" />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;