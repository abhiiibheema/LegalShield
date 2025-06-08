import React, { useState } from 'react';
import { 
  FileText, 
  Calendar, 
  Clock, 
  User, 
  Upload, 
  MessageCircle, 
  Bell, 
  DollarSign,
  Search,
  Filter,
  Plus,
  Eye,
  Download,
  AlertCircle,
  CheckCircle,
  XCircle,
  Scale,
  Gavel
} from 'lucide-react';

interface Case {
  id: string;
  title: string;
  caseNumber: string;
  status: 'active' | 'pending' | 'closed' | 'appeal';
  nextHearing: string;
  lawyer: string;
  court: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  documents: number;
  lastUpdate: string;
  estimatedCost: number;
  actualCost: number;
}

const CourtCases: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'documents' | 'communication' | 'research' | 'costs'>('overview');
  const [selectedCase, setSelectedCase] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Mock data for demonstration
  const cases: Case[] = [
    {
      id: '1',
      title: 'Property Dispute - Sector 15, Noida',
      caseNumber: 'CWP-2024-1234',
      status: 'active',
      nextHearing: '2024-02-15',
      lawyer: 'Adv. Priya Sharma',
      court: 'Delhi High Court',
      category: 'Property Law',
      priority: 'high',
      documents: 12,
      lastUpdate: '2024-01-28',
      estimatedCost: 150000,
      actualCost: 85000
    },
    {
      id: '2',
      title: 'Consumer Complaint - Defective Product',
      caseNumber: 'CC-2024-5678',
      status: 'pending',
      nextHearing: '2024-02-20',
      lawyer: 'Adv. Rajesh Kumar',
      court: 'District Consumer Forum',
      category: 'Consumer Law',
      priority: 'medium',
      documents: 8,
      lastUpdate: '2024-01-25',
      estimatedCost: 50000,
      actualCost: 25000
    },
    {
      id: '3',
      title: 'Employment Termination Dispute',
      caseNumber: 'LT-2023-9012',
      status: 'closed',
      nextHearing: '',
      lawyer: 'Adv. Meera Patel',
      court: 'Labour Tribunal',
      category: 'Labour Law',
      priority: 'low',
      documents: 15,
      lastUpdate: '2024-01-10',
      estimatedCost: 75000,
      actualCost: 72000
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'closed': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'appeal': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const filteredCases = cases.filter(case_ => {
    const matchesSearch = case_.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         case_.caseNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || case_.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-serif font-bold text-indian-maroon mb-2">
              My Court Cases
            </h1>
            <p className="text-gray-600">
              Track and manage all your legal cases in one place
            </p>
          </div>
          <button className="bg-indian-maroon hover:bg-indian-navy text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center">
            <Plus className="h-5 w-5 mr-2" />
            Add New Case
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-lg border border-indian-gold/20 p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search cases by title or case number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indian-gold focus:border-indian-gold"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indian-gold focus:border-indian-gold appearance-none bg-white"
            >
              <option value="all">All Cases</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="closed">Closed</option>
              <option value="appeal">Appeal</option>
            </select>
          </div>
        </div>
      </div>

      {/* Cases Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        {filteredCases.map((case_) => (
          <div
            key={case_.id}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-indian-gold/20 overflow-hidden cursor-pointer transform hover:-translate-y-1"
            onClick={() => setSelectedCase(case_.id)}
          >
            {/* Case Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-serif font-semibold text-indian-maroon mb-1 line-clamp-2">
                    {case_.title}
                  </h3>
                  <p className="text-sm text-gray-600 font-mono">
                    {case_.caseNumber}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(case_.status)}`}>
                  {case_.status.charAt(0).toUpperCase() + case_.status.slice(1)}
                </span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <Scale className="h-4 w-4 mr-2" />
                {case_.court}
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <User className="h-4 w-4 mr-2" />
                {case_.lawyer}
              </div>
            </div>

            {/* Case Details */}
            <div className="p-6">
              <div className="space-y-3">
                {case_.nextHearing && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Next Hearing:</span>
                    <span className="text-sm font-medium text-indian-maroon">
                      {new Date(case_.nextHearing).toLocaleDateString()}
                    </span>
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Priority:</span>
                  <span className={`text-sm font-medium ${getPriorityColor(case_.priority)}`}>
                    {case_.priority.charAt(0).toUpperCase() + case_.priority.slice(1)}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Documents:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {case_.documents} files
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Cost Progress:</span>
                  <span className="text-sm font-medium text-gray-900">
                    ₹{case_.actualCost.toLocaleString()} / ₹{case_.estimatedCost.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-indian-maroon h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min((case_.actualCost / case_.estimatedCost) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 mt-4">
                <button className="flex-1 bg-indian-cream hover:bg-indian-gold/20 text-indian-maroon py-2 px-3 rounded-lg text-sm font-medium transition-colors">
                  View Details
                </button>
                <button className="p-2 bg-indian-cream hover:bg-indian-gold/20 text-indian-maroon rounded-lg transition-colors">
                  <MessageCircle className="h-4 w-4" />
                </button>
                <button className="p-2 bg-indian-cream hover:bg-indian-gold/20 text-indian-maroon rounded-lg transition-colors">
                  <FileText className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <QuickActionCard
          icon={Calendar}
          title="Upcoming Hearings"
          description="View all scheduled court dates"
          count={3}
          color="bg-blue-500"
        />
        <QuickActionCard
          icon={FileText}
          title="Documents"
          description="Manage case documents"
          count={35}
          color="bg-green-500"
        />
        <QuickActionCard
          icon={Bell}
          title="Notifications"
          description="Important case updates"
          count={7}
          color="bg-yellow-500"
        />
        <QuickActionCard
          icon={DollarSign}
          title="Cost Tracking"
          description="Monitor legal expenses"
          count={0}
          color="bg-purple-500"
          showCurrency
        />
      </div>

      {/* Case Detail Modal would go here */}
      {selectedCase && (
        <CaseDetailModal
          caseId={selectedCase}
          onClose={() => setSelectedCase(null)}
          case_={cases.find(c => c.id === selectedCase)!}
        />
      )}
    </div>
  );
};

interface QuickActionCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  count: number;
  color: string;
  showCurrency?: boolean;
}

const QuickActionCard: React.FC<QuickActionCardProps> = ({ 
  icon: Icon, 
  title, 
  description, 
  count, 
  color,
  showCurrency = false 
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-indian-gold/20 p-6 cursor-pointer transform hover:-translate-y-1">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <span className="text-2xl font-bold text-gray-900">
          {showCurrency ? '₹' : ''}{count.toLocaleString()}
        </span>
      </div>
      <h3 className="text-lg font-serif font-semibold text-indian-maroon mb-1">
        {title}
      </h3>
      <p className="text-sm text-gray-600">
        {description}
      </p>
    </div>
  );
};

interface CaseDetailModalProps {
  caseId: string;
  onClose: () => void;
  case_: Case;
}

const CaseDetailModal: React.FC<CaseDetailModalProps> = ({ onClose, case_ }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'documents' | 'timeline' | 'communication'>('overview');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-indian-maroon to-indian-navy p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-serif font-bold mb-1">{case_.title}</h2>
              <p className="text-indian-cream">{case_.caseNumber}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <XCircle className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Modal Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Overview', icon: Eye },
              { id: 'documents', label: 'Documents', icon: FileText },
              { id: 'timeline', label: 'Timeline', icon: Clock },
              { id: 'communication', label: 'Communication', icon: MessageCircle }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-indian-maroon text-indian-maroon'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="h-4 w-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Modal Content */}
        <div className="p-6 max-h-96 overflow-y-auto">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-indian-maroon mb-3">Case Information</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className={`px-2 py-1 rounded text-xs ${getStatusColor(case_.status)}`}>
                        {case_.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Court:</span>
                      <span className="font-medium">{case_.court}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Category:</span>
                      <span className="font-medium">{case_.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Priority:</span>
                      <span className={`font-medium ${getPriorityColor(case_.priority)}`}>
                        {case_.priority}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-indian-maroon mb-3">Financial Overview</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Estimated Cost:</span>
                      <span className="font-medium">₹{case_.estimatedCost.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Actual Cost:</span>
                      <span className="font-medium">₹{case_.actualCost.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Remaining:</span>
                      <span className="font-medium">₹{(case_.estimatedCost - case_.actualCost).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-indian-maroon">Case Documents</h3>
                <button className="bg-indian-maroon text-white px-4 py-2 rounded-lg text-sm flex items-center">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Document
                </button>
              </div>
              <div className="space-y-3">
                {[
                  { name: 'Petition.pdf', size: '2.4 MB', date: '2024-01-15' },
                  { name: 'Evidence_Photos.zip', size: '15.2 MB', date: '2024-01-20' },
                  { name: 'Witness_Statement.pdf', size: '1.1 MB', date: '2024-01-25' }
                ].map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-indian-maroon mr-3" />
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-sm text-gray-600">{doc.size} • {doc.date}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-2 text-indian-maroon hover:bg-indian-cream rounded">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-indian-maroon hover:bg-indian-cream rounded">
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'timeline' && (
            <div>
              <h3 className="text-lg font-semibold text-indian-maroon mb-4">Case Timeline</h3>
              <div className="space-y-4">
                {[
                  { date: '2024-01-28', event: 'Case filed', status: 'completed' },
                  { date: '2024-02-05', event: 'First hearing scheduled', status: 'completed' },
                  { date: '2024-02-15', event: 'Next hearing', status: 'upcoming' },
                  { date: '2024-03-01', event: 'Evidence submission deadline', status: 'pending' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-4 ${
                      item.status === 'completed' ? 'bg-green-500' :
                      item.status === 'upcoming' ? 'bg-blue-500' : 'bg-gray-300'
                    }`}></div>
                    <div className="flex-1">
                      <p className="font-medium">{item.event}</p>
                      <p className="text-sm text-gray-600">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'communication' && (
            <div>
              <h3 className="text-lg font-semibold text-indian-maroon mb-4">Communication Log</h3>
              <div className="space-y-4">
                {[
                  { date: '2024-01-28', from: 'Adv. Priya Sharma', message: 'Case has been filed successfully. Next hearing on Feb 15th.' },
                  { date: '2024-01-25', from: 'You', message: 'Please update me on the case status.' },
                  { date: '2024-01-20', from: 'Adv. Priya Sharma', message: 'Documents received. Will file the case this week.' }
                ].map((msg, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-indian-maroon">{msg.from}</span>
                      <span className="text-sm text-gray-600">{msg.date}</span>
                    </div>
                    <p className="text-gray-700">{msg.message}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indian-gold"
                  />
                  <button className="bg-indian-maroon text-white px-4 py-2 rounded-lg">
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourtCases;