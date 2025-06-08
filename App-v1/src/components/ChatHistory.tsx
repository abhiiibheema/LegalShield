import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Trash2, Edit2, Check, X, Plus } from 'lucide-react';

interface ChatSession {
  _id: string;
  title: string;
  conversation: { role: 'user' | 'assistant'; message: string }[];
  createdAt: string;
}

interface ChatHistoryProps {
  chatHistory: ChatSession[];
  onSelectSession: (session: ChatSession) => void;
  onDeleteSession: (sessionId: string) => void;
  onRenameSession: (sessionId: string, newTitle: string) => void;
  onNewChat: () => void;
  isCreatingSession: boolean;
  canCreateNewSession: boolean;
  activeSessionId: string | null;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ chatHistory, onSelectSession, onDeleteSession, onRenameSession, onNewChat, isCreatingSession, canCreateNewSession, activeSessionId }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState('');

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const handleRenameClick = (session: ChatSession) => {
    setEditingSessionId(session._id);
    setNewTitle(session.title);
  };

  const handleSaveRename = (sessionId: string) => {
    onRenameSession(sessionId, newTitle);
    setEditingSessionId(null);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' });
  };

  return (
    <div className={`bg-white shadow-2xl transition-all duration-300 ease-in-out ${isExpanded ? 'w-80' : 'w-16'} h-screen overflow-hidden flex flex-col`}>
      <div className="flex items-center justify-between p-4 bg-indian-cream border-b border-indian-gold/20">
        {isExpanded && <h3 className="text-lg font-serif font-semibold text-indian-maroon">Chat History</h3>}
        <button onClick={toggleExpand} className="p-1">
          {isExpanded ? <ChevronLeft className="h-5 w-5 text-indian-maroon" /> : <ChevronRight className="h-5 w-5 text-indian-maroon" />}
        </button>
      </div>
      {isExpanded && (
        <div className="flex-1 flex flex-col p-4">
          <div className="flex-1 overflow-y-auto">
            {chatHistory.map((session) => (
              <div key={session._id} className="mb-4">
                {editingSessionId === session._id ? (
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="flex-1 text-sm font-medium text-indian-maroon border border-indian-gold/20 rounded p-1"
                    />
                    <button onClick={() => handleSaveRename(session._id)} className="p-1 hover:bg-indian-gold/20 rounded">
                      <Check className="h-4 w-4 text-indian-maroon" />
                    </button>
                    <button onClick={() => setEditingSessionId(null)} className="p-1 hover:bg-indian-gold/20 rounded">
                      <X className="h-4 w-4 text-indian-maroon" />
                    </button>
                  </div>
                ) : (
                  <button
                    className={`w-full flex justify-between items-center p-3 rounded-lg shadow-md hover:shadow-lg border transition-all duration-300 ${
                      activeSessionId === session._id
                        ? 'bg-indian-maroon text-white border-indian-gold ring-2 ring-indian-gold/50'
                        : 'bg-indian-cream text-indian-maroon border-indian-gold/20 hover:bg-indian-gold/10'
                    }`}
                    onClick={() => onSelectSession(session)}
                  >
                    <div className="text-left">
                      <p className="text-sm font-medium">{session.title}</p>
                      <p className="text-xs opacity-75">{formatDate(session.createdAt)}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button onClick={(e) => { e.stopPropagation(); handleRenameClick(session); }} className="p-1 hover:bg-indian-gold/20 rounded">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (window.confirm('Are you sure you want to delete this session?')) {
                            onDeleteSession(session._id);
                          }
                        }}
                        className="p-1 hover:bg-indian-gold/20 rounded"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            onClick={onNewChat}
            disabled={isCreatingSession || !canCreateNewSession}
            className={`flex items-center justify-center w-full p-3 mt-4 bg-indian-maroon text-white rounded-lg hover:bg-indian-navy transition-all duration-300 ${
              isCreatingSession || !canCreateNewSession ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isCreatingSession ? (
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
            ) : (
              <>
                <Plus className="h-5 w-5 mr-2" />
                New Chat
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatHistory;