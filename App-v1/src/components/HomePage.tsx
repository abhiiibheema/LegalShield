import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';
import SearchInterface from './SearchInterface';
import AskQuestion from './AskQuestion';
import Header from './Header';
import ChatHistory from './ChatHistory';

interface ChatSession {
  _id: string;
  title: string;
  conversation: { role: 'user' | 'assistant'; message: string }[];
  createdAt: string;
}

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

const HomePage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedSession, setSelectedSession] = useState<ChatSession | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatSession[]>([]);
  const [isCreatingSession, setIsCreatingSession] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/verify-token`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        return axios.get(`${import.meta.env.VITE_API_URL}/api/chat-sessions`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      })
      .then(response => {
        console.log('Fetched chat history:', response.data);
        const sortedHistory = response.data.sort(
          (a: ChatSession, b: ChatSession) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setChatHistory(sortedHistory);
      })
      .catch(error => {
        console.error('Error fetching chat history:', error);
        localStorage.removeItem('token');
        navigate('/');
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleNavigation = (page: string) => {
    setCurrentPage(page);
  };

  const canCreateNewSession = chatHistory.length === 0 || chatHistory[0].conversation.length > 0;

  const handleNewChat = async () => {
    if (!canCreateNewSession) {
      console.log("Cannot create new session: latest session is empty.");
      return;
    }
    if (isCreatingSession) return;
    setIsCreatingSession(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/chat-sessions`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const newSession = response.data;
      console.log('New session created:', newSession);
      setChatHistory(prev => [newSession, ...prev].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ));
      setSelectedSession(newSession);
      setCurrentPage('ask');
    } catch (error) {
      console.error('Error creating new chat session:', error);
    } finally {
      setTimeout(() => setIsCreatingSession(false), 2000);
    }
  };

  const handleSelectSession = (session: ChatSession) => {
    setSelectedSession(session);
    setCurrentPage('ask');
  };

  const handleDeleteSession = async (sessionId: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/chat-sessions/${sessionId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setChatHistory(prev => prev.filter(session => session._id !== sessionId));
      if (selectedSession?._id === sessionId) {
        setSelectedSession(null);
        setCurrentPage('dashboard');
      }
    } catch (error) {
      console.error('Error deleting chat session:', error);
    }
  };

  const handleRenameSession = async (sessionId: string, newTitle: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/chat-sessions/${sessionId}/rename`,
        { newTitle },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const updatedSession = response.data;
      setChatHistory(prev =>
        prev.map(session =>
          session._id === sessionId ? updatedSession : session
        ).sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      );
      if (selectedSession?._id === sessionId) {
        setSelectedSession(updatedSession);
      }
    } catch (error) {
      console.error('Error renaming chat session:', error);
    }
  };

  const handleSubmitQuestion = async (query: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        '${import.meta.env.VITE_API_URL}/api/chat-sessions/ask',
        { question: query },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const newSession = response.data;
      setChatHistory(prev => [newSession, ...prev].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ));
      setSelectedSession(newSession);
      setCurrentPage('ask');
    } catch (error) {
      console.error('Error submitting question:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indian-cream via-white to-indian-cream relative">
      <div className="absolute inset-0 bg-indian-pattern opacity-5"></div>
      <div className="relative z-10 flex h-screen">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onLogout={handleLogout}
          onNavigate={handleNavigation}
          currentPage={currentPage}
        />
        <div className="flex flex-1 h-screen">
          <ChatHistory
            chatHistory={chatHistory}
            onSelectSession={handleSelectSession}
            onNewChat={handleNewChat}
            onDeleteSession={handleDeleteSession}
            onRenameSession={handleRenameSession}
            isCreatingSession={isCreatingSession}
            canCreateNewSession={canCreateNewSession}
            activeSessionId={selectedSession?._id || null}
          />
          <div className="flex-1 flex flex-col">
            <Header
              onMenuToggle={() => setSidebarOpen(true)}
              onLogout={handleLogout}
            />
            <main className="flex-1 overflow-y-auto">
              {currentPage === 'dashboard' ? (
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                  <div className="text-center mb-12">
                    <h1 className="text-4xl sm:text-5xl font-serif font-bold text-indian-maroon mb-4">
                      Welcome to Nyaaya Sahayak
                    </h1>
                    <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                      Your trusted companion for navigating the Indian legal system. 
                      Ask questions, get guidance, and access legal resources with confidence.
                    </p>
                  </div>
                  <SearchInterface onSubmitQuestion={handleSubmitQuestion} />
                  <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <QuickAccessCard
                      title="Constitutional Rights"
                      description="Learn about your fundamental rights as an Indian citizen"
                      icon="⚖️"
                      color="bg-indian-maroon"
                      onClick={() => handleSubmitQuestion("Explain constitutional rights in India.")}
                    />
                    <QuickAccessCard
                      title="My Court Cases (Coming soon)"
                      description="Track and manage all your ongoing legal cases"
                      icon="📋"
                      color="bg-indian-navy"
                      // onClick={() => handleSubmitQuestion("How can I track my court cases?")}
                    />
                    <QuickAccessCard
                      title="Family Law"
                      description="Marriage, divorce, custody, and inheritance guidance"
                      icon="👨‍👩‍👧‍👦"
                      color="bg-indian-emerald"
                      onClick={() => handleSubmitQuestion("What are the key aspects of family law in India?")}
                    />
                    <QuickAccessCard
                      title="Property Law"
                      description="Real estate, land rights, and property disputes"
                      icon="🏠"
                      color="bg-indian-maroon"
                      onClick={() => handleSubmitQuestion("Tell me about property laws in India.")}
                    />
                    <QuickAccessCard
                      title="Consumer Rights"
                      description="Protection against unfair trade practices"
                      icon="🛡️"
                      color="bg-indian-navy"
                      onClick={() => handleSubmitQuestion("What are my consumer rights in India?")}
                    />
                    <QuickAccessCard
                      title="Find Lawyers (Coming soon)"
                      description="Connect with qualified legal professionals"
                      icon="👨‍💼"
                      color="bg-indian-emerald"
                      onClick={() => handleSubmitQuestion("How can I find a lawyer for my case?")}
                    />
                  </div>
                </div>
              ) : (
                <AskQuestion
                  session={selectedSession}
                  onCreateSession={(newSession) => {
                    setChatHistory(prev => [newSession, ...prev].sort(
                      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                    ));
                    setSelectedSession(newSession);
                  }}
                  onUpdateSession={(updatedSession) => {
                    setChatHistory(prev =>
                      prev.map(s =>
                        s._id === updatedSession._id ? updatedSession : s
                      ).sort(
                        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                      )
                    );
                    if (selectedSession?._id === updatedSession._id) {
                      setSelectedSession(updatedSession);
                    }
                  }}
                />
              )}
            </main>
            <footer className="bg-gray-200 p-2 text-center text-sm text-gray-600">
              © 2025 Legal Chat App. All rights reserved.
            </footer>
          </div>
        </div>
      </div>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default HomePage;