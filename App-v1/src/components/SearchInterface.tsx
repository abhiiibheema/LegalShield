import React, { useState } from 'react';
import axios from 'axios';
import { Search, Send, Sparkles, BookOpen, Users, FileText } from 'lucide-react';
import ReactMarkdown from 'react-markdown'; // Import react-markdown

interface SearchInterfaceProps {
  onSubmitQuestion: (query: string, response: string) => void;
}

const SearchInterface: React.FC<SearchInterfaceProps> = ({ onSubmitQuestion }) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(''); // State to store the response

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:3000/api/chat-sessions/ask',
        { question: query },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const responseText = res.data.response || 'No response from backend';
      console.log(responseText)
      setResponse("responseText"); // Store the response
      onSubmitQuestion(query, responseText); // Pass to parent
      setQuery('');
    } catch (error) {
      console.error('Error sending question:', error);
      const errorMsg = 'Error: Could not get a response from the server.';
      setResponse(errorMsg); // Store error message
      onSubmitQuestion(query, errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestionQuestions = [
    "What are my rights as a tenant in Delhi?",
    "How to file an FIR online?",
    "What is the procedure for getting a divorce?",
    "How to register a property in Maharashtra?",
    "What are consumer protection laws in India?",
    "How to file a complaint against police?"
  ];

  return (
    <div className="max-w-4xl mx-auto animate-slide-up">
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
            <div className="flex flex-wrap gap-3 justify-center">
              {/* <ActionButton icon={FileText} label="Upload Document" /> */}
              {/* <ActionButton icon={Users} label="Find Lawyer" /> */}
              {/* <ActionButton icon={BookOpen} label="Legal Resources" /> */}
            </div>
          </form>
        </div>
      </div>
      {/* Display the response with ReactMarkdown */}
      {response && (
        <div className="mt-6 p-4 bg-white rounded-xl shadow-md border border-indian-gold/20">
          <h3 className="text-lg font-serif font-semibold text-indian-maroon mb-2">Response:</h3>
          <ReactMarkdown className="text-gray-700 prose max-w-none">{response}</ReactMarkdown>
        </div>
      )}
      <div className="mt-8">
        <h3 className="text-xl font-serif font-semibold text-indian-maroon mb-4 text-center">
          Popular Legal Questions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {suggestionQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => setQuery(question)}
              className="text-left p-4 bg-white rounded-lg shadow-md hover:shadow-lg border border-indian-gold/20 hover:border-indian-gold/40 transition-all duration-300 transform hover:-translate-y-1"
            >
              <p className="text-gray-700 text-sm leading-relaxed">{question}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

interface ActionButtonProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ icon: Icon, label }) => {
  return (
    <button className="flex items-center space-x-2 px-4 py-2 bg-indian-cream hover:bg-indian-gold/20 text-indian-maroon rounded-lg transition-all duration-300 transform hover:scale-105 border border-indian-gold/30">
      <Icon className="h-4 w-4" />
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
};

export default SearchInterface;