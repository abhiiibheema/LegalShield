import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import SearchInterface from './SearchInterface';
import CourtCases from './CourtCases';
import Header from './Header';

const HomePage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  const handleNavigation = (page: string) => {
    setCurrentPage(page);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'cases':
        return <CourtCases />;
      case 'dashboard':
      default:
        return (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Welcome Section */}
            <div className="text-center mb-12 animate-fade-in">
              <h1 className="text-4xl sm:text-5xl font-serif font-bold text-indian-maroon mb-4">
                Welcome to Nyaaya Sahayak
              </h1>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                Your trusted companion for navigating the Indian legal system. 
                Ask questions, get guidance, and access legal resources with confidence.
              </p>
            </div>

            {/* Search Interface */}
            <SearchInterface />

            {/* Quick Access Cards */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up">
              <QuickAccessCard
                title="Constitutional Rights"
                description="Learn about your fundamental rights as an Indian citizen"
                icon="⚖️"
                color="bg-indian-maroon"
                onClick={() => setCurrentPage('resources')}
              />
              <QuickAccessCard
                title="My Court Cases"
                description="Track and manage all your ongoing legal cases"
                icon="📋"
                color="bg-indian-navy"
                onClick={() => setCurrentPage('cases')}
              />
              <QuickAccessCard
                title="Family Law"
                description="Marriage, divorce, custody, and inheritance guidance"
                icon="👨‍👩‍👧‍👦"
                color="bg-indian-emerald"
                onClick={() => setCurrentPage('resources')}
              />
              <QuickAccessCard
                title="Property Law"
                description="Real estate, land rights, and property disputes"
                icon="🏠"
                color="bg-indian-maroon"
                onClick={() => setCurrentPage('resources')}
              />
              <QuickAccessCard
                title="Consumer Rights"
                description="Protection against unfair trade practices"
                icon="🛡️"
                color="bg-indian-navy"
                onClick={() => setCurrentPage('resources')}
              />
              <QuickAccessCard
                title="Find Lawyers"
                description="Connect with qualified legal professionals"
                icon="👨‍💼"
                color="bg-indian-emerald"
                onClick={() => setCurrentPage('lawyers')}
              />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indian-cream via-white to-indian-cream relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-indian-pattern opacity-5"></div>
      
      <div className="relative z-10 flex h-screen">
        {/* Sidebar */}
        <Sidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)}
          onLogout={handleLogout}
          onNavigate={handleNavigation}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col lg:ml-64">
          {/* Header */}
          <Header 
            onMenuToggle={() => setSidebarOpen(true)}
            onLogout={handleLogout}
          />

          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto">
            {renderCurrentPage()}
          </main>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

interface QuickAccessCardProps {
  title: string;
  description: string;
  icon: string;
  color: string;
  onClick?: () => void;
}

const QuickAccessCard: React.FC<QuickAccessCardProps> = ({ title, description, icon, color, onClick }) => {
  return (
    <div 
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-indian-gold/20 overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      <div className={`${color} h-2`}></div>
      <div className="p-6">
        <div className="text-3xl mb-3">{icon}</div>
        <h3 className="text-xl font-serif font-semibold text-indian-maroon mb-2">
          {title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          {description}
        </p>
        <button className="mt-4 text-indian-maroon hover:text-indian-gold transition-colors font-medium text-sm">
          Learn More →
        </button>
      </div>
    </div>
  );
};

export default HomePage;