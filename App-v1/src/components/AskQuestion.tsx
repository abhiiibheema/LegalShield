import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Search, Send, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown'; // Import react-markdown

interface ChatMessage {
  role: 'user' | 'assistant';
  message: string;
}

interface ChatSession {
  _id: string;
  title: string;
  conversation: ChatMessage[];
}

interface AskQuestionProps {
  session: ChatSession | null;
  onCreateSession: (newSession: ChatSession) => void;
  onUpdateSession: (updatedSession: ChatSession) => void;
}

const AskQuestion: React.FC<AskQuestionProps> = ({ session, onCreateSession, onUpdateSession }) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const conversationRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!session) {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/chat-sessions/ask`,
          { question: query },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const newSession = response.data;
        onCreateSession(newSession);
      } else {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/chat-sessions/${session._id}/ask`,
          { question: query },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const updatedSession = response.data;
        onUpdateSession(updatedSession);
      }
      setQuery('');
    } catch (error) {
      console.error('Error submitting question:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (conversationRef.current) {
      conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
    }
  }, [session?.conversation]);

  return (
    <div className="flex flex-col h-full p-8">
      <div className="flex-1 overflow-y-auto mb-4" ref={conversationRef}>
        {session ? (
          session.conversation.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className={`mb-4 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}
            >
              <span
                className={`inline-block p-3 rounded-lg ${
                  msg.role === 'user' ? 'bg-indian-maroon text-white' : 'bg-gray-100 text-gray-800'
                }`}
              >
                {msg.role === 'assistant' ? (
                  <ReactMarkdown>{msg.message}</ReactMarkdown>
                ) : (
                  msg.message
                )}
              </span>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-500">Start a new conversation</p>
        )}
        {isLoading && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-indian-maroon border-t-transparent mx-auto"></div>
          </div>
        )}
      </div>
      <div className="bg-white rounded-2xl shadow-2xl border border-indian-gold/20 overflow-hidden">
        <div className="bg-gradient-to-r from-indian-maroon to-indian-navy p-6 text-white">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="h-8 w-8 mr-3 text-indian-gold" />
            <h2 className="text-2xl font-serif font-bold">Ask Your Legal Question</h2>
          </div>
          <p className="text-center text-indian-cream">
            Get instant guidance on Indian laws and legal procedures
          </p>
        </div>
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-6 w-6 text-indian-maroon/60" />
              </div>
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
                placeholder="Describe your legal question or situation in detail..."
                className="w-full pl-12 pr-16 py-4 border-2 border-indian-maroon/20 rounded-xl focus:ring-2 focus:ring-indian-gold focus:border-indian-gold transition-all duration-300 resize-none h-32 text-gray-700 placeholder-gray-500"
                rows={4}
              />
              <button
                type="submit"
                disabled={!query.trim() || isLoading}
                className="absolute bottom-4 right-4 bg-indian-maroon hover:bg-indian-navy text-white p-2 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                ) : (
                  <Send className="h-6 w-6" />
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AskQuestion;