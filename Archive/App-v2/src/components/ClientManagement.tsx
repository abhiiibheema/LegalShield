import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  FileText, 
  Calendar,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Upload,
  Download,
  MessageCircle,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  Scale,
  Building
} from 'lucide-react';

interface Client {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  idProof: {
    type: string;
    number: string;
  };
  cases: Case[];
  createdAt: string;
}

interface Case {
  id: string;
  caseNumber: string;
  courtName: string;
  courtLocation: string;
  caseType: string;
  status: 'filed' | 'pending' | 'adjourned' | 'closed';
  filingDate: string;
  nextHearing: string;
  description: string;
  legalSections: string[];
  strategyNotes: string;
  documents: Document[];
  keyDates: {
    filing: string;
    nextHearing: string;
    deadlines: string[];
  };
}

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  category: string;
}

const ClientManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'clients' | 'cases'>('clients');
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [selectedCase, setSelectedCase] = useState<string | null>(null);
  const [showAddClient, setShowAddClient] = useState(false);
  const [showAddCase, setShowAddCase] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data
  const clients: Client[] = [
    {
      id: '1',
      fullName: 'Rajesh Kumar',
      email: 'rajesh.kumar@email.com',
      phone: '+91 9876543210',
      address: '123 MG Road, New Delhi - 110001',
      idProof: { type: 'Aadhaar', number: '1234-5678-9012' },
      cases: [],
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      fullName: 'Priya Sharma',
      email: 'priya.sharma@email.com',
      phone: '+91 9876543211',
      address: '456 Park Street, Mumbai - 400001',
      idProof: { type: 'PAN', number: 'ABCDE1234F' },
      cases: [],
      createdAt: '2024-01-20'
    }
  ];

  const cases: Case[] = [
    {
      id: '1',
      caseNumber: 'CWP-2024-1234',
      courtName: 'Delhi High Court',
      courtLocation: 'New Delhi',
      caseType: 'Property Law',
      status: 'pending',
      filingDate: '2024-01-15',
      nextHearing: '2024-02-15',
      description: 'Property dispute regarding inheritance of ancestral property in Sector 15, Noida.',
      legalSections: ['IPC 378', 'Transfer of Property Act 1882'],
      strategyNotes: 'Focus on establishing clear title through revenue records.',
      documents: [
        {
          id: '1',
          name: 'Property_Documents.pdf',
          type: 'PDF',
          size: '2.4 MB',
          uploadDate: '2024-01-15',
          category: 'Evidence'
        }
      ],
      keyDates: {
        filing: '2024-01-15',
        nextHearing: '2024-02-15',
        deadlines: ['2024-02-10']
      }
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'filed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'adjourned': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'closed': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-serif font-bold text-indian-maroon mb-2">
              Client & Case Management
            </h1>
            <p className="text-gray-600">
              Manage your clients and their cases efficiently
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => setShowAddClient(true)}
              className="bg-indian-maroon hover:bg-indian-navy text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Client
            </button>
            <button
              onClick={() => setShowAddCase(true)}
              className="bg-indian-emerald hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Case
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('clients')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'clients'
                  ? 'border-indian-maroon text-indian-maroon'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <User className="h-4 w-4 inline mr-2" />
              Clients ({clients.length})
            </button>
            <button
              onClick={() => setActiveTab('cases')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'cases'
                  ? 'border-indian-maroon text-indian-maroon'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Scale className="h-4 w-4 inline mr-2" />
              Cases ({cases.length})
            </button>
          </nav>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-lg border border-indian-gold/20 p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indian-gold focus:border-indian-gold"
            />
          </div>
          {activeTab === 'cases' && (
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indian-gold focus:border-indian-gold appearance-none bg-white"
              >
                <option value="all">All Status</option>
                <option value="filed">Filed</option>
                <option value="pending">Pending</option>
                <option value="adjourned">Adjourned</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      {activeTab === 'clients' ? (
        <ClientsView clients={clients} onSelectClient={setSelectedClient} />
      ) : (
        <CasesView cases={cases} onSelectCase={setSelectedCase} getStatusColor={getStatusColor} />
      )}

      {/* Modals */}
      {showAddClient && (
        <AddClientModal onClose={() => setShowAddClient(false)} />
      )}
      
      {showAddCase && (
        <AddCaseModal onClose={() => setShowAddCase(false)} clients={clients} />
      )}

      {selectedClient && (
        <ClientDetailModal
          clientId={selectedClient}
          onClose={() => setSelectedClient(null)}
          client={clients.find(c => c.id === selectedClient)!}
        />
      )}

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

// Clients View Component
const ClientsView: React.FC<{ clients: Client[]; onSelectClient: (id: string) => void }> = ({ 
  clients, 
  onSelectClient 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {clients.map((client) => (
        <div
          key={client.id}
          className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-indian-gold/20 overflow-hidden cursor-pointer transform hover:-translate-y-1"
          onClick={() => onSelectClient(client.id)}
        >
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-indian-maroon rounded-full flex items-center justify-center mr-4">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-serif font-semibold text-indian-maroon">
                  {client.fullName}
                </h3>
                <p className="text-sm text-gray-600">
                  Client since {new Date(client.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center text-gray-600">
                <Mail className="h-4 w-4 mr-2" />
                {client.email}
              </div>
              <div className="flex items-center text-gray-600">
                <Phone className="h-4 w-4 mr-2" />
                {client.phone}
              </div>
              <div className="flex items-center text-gray-600">
                <FileText className="h-4 w-4 mr-2" />
                {client.idProof.type}: {client.idProof.number}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Active Cases:</span>
                <span className="text-sm font-medium text-indian-maroon">
                  {client.cases.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Cases View Component
const CasesView: React.FC<{ 
  cases: Case[]; 
  onSelectCase: (id: string) => void;
  getStatusColor: (status: string) => string;
}> = ({ cases, onSelectCase, getStatusColor }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {cases.map((case_) => (
        <div
          key={case_.id}
          className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-indian-gold/20 overflow-hidden cursor-pointer transform hover:-translate-y-1"
          onClick={() => onSelectCase(case_.id)}
        >
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-lg font-serif font-semibold text-indian-maroon mb-1">
                  {case_.caseNumber}
                </h3>
                <p className="text-sm text-gray-600">
                  {case_.caseType}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(case_.status)}`}>
                {case_.status.charAt(0).toUpperCase() + case_.status.slice(1)}
              </span>
            </div>
            
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <Building className="h-4 w-4 mr-2" />
              {case_.courtName}, {case_.courtLocation}
            </div>
          </div>

          <div className="p-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Filing Date:</span>
                <span className="text-sm font-medium text-gray-900">
                  {new Date(case_.filingDate).toLocaleDateString()}
                </span>
              </div>
              
              {case_.nextHearing && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Next Hearing:</span>
                  <span className="text-sm font-medium text-indian-maroon">
                    {new Date(case_.nextHearing).toLocaleDateString()}
                  </span>
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Documents:</span>
                <span className="text-sm font-medium text-gray-900">
                  {case_.documents.length} files
                </span>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-sm text-gray-700 line-clamp-2">
                {case_.description}
              </p>
            </div>

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
  );
};

// Add Client Modal
const AddClientModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [clientData, setClientData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    idProofType: '',
    idProofNumber: ''
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="bg-gradient-to-r from-indian-maroon to-indian-navy p-6 text-white">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-serif font-bold">Add New Client</h2>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
              <XCircle className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="p-6 max-h-96 overflow-y-auto">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={clientData.fullName}
                  onChange={(e) => setClientData({...clientData, fullName: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indian-gold focus:border-indian-gold"
                  placeholder="Enter client's full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={clientData.email}
                  onChange={(e) => setClientData({...clientData, email: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indian-gold focus:border-indian-gold"
                  placeholder="Enter email address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={clientData.phone}
                  onChange={(e) => setClientData({...clientData, phone: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indian-gold focus:border-indian-gold"
                  placeholder="Enter phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ID Proof Type *
                </label>
                <select
                  value={clientData.idProofType}
                  onChange={(e) => setClientData({...clientData, idProofType: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indian-gold focus:border-indian-gold"
                >
                  <option value="">Select ID Proof</option>
                  <option value="Aadhaar">Aadhaar Card</option>
                  <option value="PAN">PAN Card</option>
                  <option value="Passport">Passport</option>
                  <option value="Driving License">Driving License</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ID Proof Number *
              </label>
              <input
                type="text"
                value={clientData.idProofNumber}
                onChange={(e) => setClientData({...clientData, idProofNumber: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indian-gold focus:border-indian-gold"
                placeholder="Enter ID proof number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address *
              </label>
              <textarea
                value={clientData.address}
                onChange={(e) => setClientData({...clientData, address: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indian-gold focus:border-indian-gold"
                placeholder="Enter complete address"
                rows={3}
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button className="bg-indian-maroon hover:bg-indian-navy text-white px-6 py-2 rounded-lg transition-colors">
            Add Client
          </button>
        </div>
      </div>
    </div>
  );
};

// Add Case Modal
const AddCaseModal: React.FC<{ onClose: () => void; clients: Client[] }> = ({ onClose, clients }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="bg-gradient-to-r from-indian-emerald to-green-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-serif font-bold">Add New Case</h2>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
              <XCircle className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <p className="text-center text-gray-600 py-8">
            Case creation form would be implemented here with all the fields mentioned in the requirements.
          </p>
        </div>
      </div>
    </div>
  );
};

// Client Detail Modal
const ClientDetailModal: React.FC<{ 
  clientId: string; 
  onClose: () => void; 
  client: Client 
}> = ({ onClose, client }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="bg-gradient-to-r from-indian-maroon to-indian-navy p-6 text-white">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-serif font-bold">{client.fullName}</h2>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
              <XCircle className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-indian-maroon mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-400 mr-3" />
                  <span>{client.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gray-400 mr-3" />
                  <span>{client.phone}</span>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-400 mr-3 mt-1" />
                  <span>{client.address}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-indian-maroon mb-4">ID Proof</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-600">Type:</span>
                  <span className="ml-2 font-medium">{client.idProof.type}</span>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Number:</span>
                  <span className="ml-2 font-medium">{client.idProof.number}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Case Detail Modal
const CaseDetailModal: React.FC<{ 
  caseId: string; 
  onClose: () => void; 
  case_: Case 
}> = ({ onClose, case_ }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="bg-gradient-to-r from-indian-emerald to-green-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-serif font-bold">{case_.caseNumber}</h2>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
              <XCircle className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-indian-maroon mb-3">Case Description</h3>
              <p className="text-gray-700">{case_.description}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-indian-maroon mb-3">Case Details</h3>
                <div className="space-y-2">
                  <div><strong>Court:</strong> {case_.courtName}</div>
                  <div><strong>Location:</strong> {case_.courtLocation}</div>
                  <div><strong>Type:</strong> {case_.caseType}</div>
                  <div><strong>Status:</strong> {case_.status}</div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-indian-maroon mb-3">Legal Sections</h3>
                <div className="flex flex-wrap gap-2">
                  {case_.legalSections.map((section, index) => (
                    <span key={index} className="bg-indian-cream text-indian-maroon px-2 py-1 rounded text-sm">
                      {section}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-indian-maroon mb-3">Strategy Notes</h3>
              <p className="text-gray-700">{case_.strategyNotes}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientManagement;