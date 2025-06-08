import React, { useState } from 'react';
import { 
  Search, 
  BookOpen, 
  Scale, 
  FileText, 
  HelpCircle,
  Sparkles,
  ArrowRight,
  Clock,
  Star,
  TrendingUp
} from 'lucide-react';

interface SearchResult {
  id: string;
  title: string;
  content: string;
  section: string;
  relevance: number;
  category: string;
}

const PublicSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Mock popular searches and IPC sections
  const popularSearches = [
    "What is IPC 378 (Theft)?",
    "How to file an FIR?",
    "Rights during police custody",
    "Property inheritance laws",
    "Consumer protection rights",
    "Domestic violence laws",
    "Right to Information Act",
    "Bail procedures in India"
  ];

  const featuredSections = [
    {
      section: "IPC 302",
      title: "Murder",
      description: "Punishment for murder under Indian Penal Code",
      category: "Criminal Law"
    },
    {
      section: "IPC 378",
      title: "Theft",
      description: "Definition and punishment for theft",
      category: "Criminal Law"
    },
    {
      section: "IPC 420",
      title: "Cheating",
      description: "Cheating and dishonestly inducing delivery of property",
      category: "Criminal Law"
    },
    {
      section: "Article 21",
      title: "Right to Life",
      description: "Protection of life and personal liberty",
      category: "Constitutional Law"
    }
  ];

  const handleSearch = async (searchQuery: string = query) => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    setHasSearched(true);
    
    // Simulate API call with RAG system
    setTimeout(() => {
      const mockResults: SearchResult[] = [
        {
          id: '1',
          title: 'IPC Section 378 - Theft',
          content: 'Whoever, intending to take dishonestly any movable property out of the possession of any person without that person\'s consent, moves that property in order to such taking, is said to commit theft.',
          section: 'IPC 378',
          relevance: 95,
          category: 'Criminal Law'
        },
        {
          id: '2',
          title: 'Punishment for Theft',
          content: 'Whoever commits theft shall be punished with imprisonment of either description for a term which may extend to three years, or with fine, or with both.',
          section: 'IPC 379',
          relevance: 88,
          category: 'Criminal Law'
        },
        {
          id: '3',
          title: 'Essential Elements of Theft',
          content: 'The essential elements of theft include: 1) Dishonest intention, 2) Movable property, 3) Taking out of possession, 4) Without consent, 5) Moving the property.',
          section: 'Legal Analysis',
          relevance: 82,
          category: 'Legal Commentary'
        }
      ];
      
      setResults(mockResults);
      setIsLoading(false);
    }, 1500);
  };

  const handleQuickSearch = (searchTerm: string) => {
    setQuery(searchTerm);
    handleSearch(searchTerm);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indian-cream via-white to-indian-cream">
      {/* Header */}
      <div className="bg-gradient-to-r from-indian-maroon to-indian-navy text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indian-gold rounded-full mb-6">
            <Scale className="h-8 w-8 text-indian-maroon" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold mb-4">
            Nyaaya Sahayak
          </h1>
          <p className="text-xl text-indian-cream mb-8">
            Free Legal Information for Everyone
          </p>
          <p className="text-indian-cream/80 max-w-2xl mx-auto">
            Search Indian laws, IPC sections, and legal rights without any registration. 
            Get instant answers to your legal questions.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        {/* Search Box */}
        <div className="bg-white rounded-2xl shadow-2xl border border-indian-gold/20 overflow-hidden mb-12">
          <div className="p-8">
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="h-6 w-6 text-indian-gold mr-3" />
              <h2 className="text-2xl font-serif font-bold text-indian-maroon">
                Ask Your Legal Question
              </h2>
            </div>
            
            <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }} className="space-y-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search IPC sections, legal rights, or ask any legal question..."
                  className="w-full pl-12 pr-16 py-4 text-lg border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indian-gold focus:border-indian-gold transition-all"
                />
                <button
                  type="submit"
                  disabled={!query.trim() || isLoading}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-indian-maroon hover:bg-indian-navy text-white px-6 py-2 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  ) : (
                    'Search'
                  )}
                </button>
              </div>
            </form>

            {/* Popular Searches */}
            <div className="mt-6">
              <p className="text-sm text-gray-600 mb-3">Popular searches:</p>
              <div className="flex flex-wrap gap-2">
                {popularSearches.slice(0, 4).map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickSearch(search)}
                    className="text-sm bg-indian-cream hover:bg-indian-gold/20 text-indian-maroon px-3 py-1 rounded-full transition-colors"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Search Results */}
        {isLoading && (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center mb-8">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-indian-maroon border-t-transparent mx-auto mb-4"></div>
            <p className="text-indian-maroon font-medium">
              Searching through Indian legal database...
            </p>
          </div>
        )}

        {results.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-serif font-bold text-indian-maroon mb-6">
              Search Results ({results.length})
            </h3>
            <div className="space-y-6">
              {results.map((result) => (
                <div
                  key={result.id}
                  className="bg-white rounded-xl shadow-lg border border-indian-gold/20 p-6 hover:shadow-xl transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className="bg-indian-maroon text-white text-xs px-2 py-1 rounded mr-3">
                          {result.section}
                        </span>
                        <span className="text-sm text-gray-600">{result.category}</span>
                      </div>
                      <h4 className="text-xl font-serif font-semibold text-indian-maroon mb-2">
                        {result.title}
                      </h4>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Star className="h-4 w-4 mr-1 text-indian-gold" />
                      {result.relevance}% match
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {result.content}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <button className="text-indian-maroon hover:text-indian-navy font-medium text-sm flex items-center">
                      Read more
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Featured Sections */}
        {!hasSearched && (
          <div className="mb-12">
            <h3 className="text-2xl font-serif font-bold text-indian-maroon mb-6 text-center">
              Featured Legal Sections
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredSections.map((section, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg border border-indian-gold/20 p-6 hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-1"
                  onClick={() => handleQuickSearch(section.title)}
                >
                  <div className="text-center">
                    <div className="w-12 h-12 bg-indian-maroon rounded-full flex items-center justify-center mx-auto mb-4">
                      <Scale className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="text-lg font-serif font-semibold text-indian-maroon mb-2">
                      {section.section}
                    </h4>
                    <h5 className="text-md font-medium text-gray-900 mb-2">
                      {section.title}
                    </h5>
                    <p className="text-sm text-gray-600 mb-3">
                      {section.description}
                    </p>
                    <span className="text-xs bg-indian-cream text-indian-maroon px-2 py-1 rounded">
                      {section.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Access Categories */}
        {!hasSearched && (
          <div className="mb-12">
            <h3 className="text-2xl font-serif font-bold text-indian-maroon mb-6 text-center">
              Browse by Category
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <CategoryCard
                icon={Scale}
                title="Criminal Law"
                description="IPC sections, criminal procedures, and rights"
                count="500+ sections"
                color="bg-red-500"
              />
              <CategoryCard
                icon={FileText}
                title="Civil Law"
                description="Property, contracts, and civil procedures"
                count="300+ sections"
                color="bg-blue-500"
              />
              <CategoryCard
                icon={BookOpen}
                title="Constitutional Law"
                description="Fundamental rights and constitutional provisions"
                count="100+ articles"
                color="bg-green-500"
              />
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="bg-white rounded-xl shadow-lg border border-indian-gold/20 p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-indian-maroon mb-2">10,000+</div>
              <div className="text-gray-600">Legal Sections</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-indian-maroon mb-2">50,000+</div>
              <div className="text-gray-600">Searches Performed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-indian-maroon mb-2">24/7</div>
              <div className="text-gray-600">Available</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-indian-maroon text-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-indian-cream mb-2">
            Nyaaya Sahayak - Making Legal Information Accessible to All
          </p>
          <p className="text-indian-cream/60 text-sm">
            This platform provides general legal information and should not be considered as legal advice.
          </p>
        </div>
      </footer>
    </div>
  );
};

interface CategoryCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  count: string;
  color: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ 
  icon: Icon, 
  title, 
  description, 
  count, 
  color 
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-indian-gold/20 p-6 hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-1">
      <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center mb-4`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <h4 className="text-lg font-serif font-semibold text-indian-maroon mb-2">
        {title}
      </h4>
      <p className="text-gray-600 text-sm mb-3">
        {description}
      </p>
      <div className="flex items-center justify-between">
        <span className="text-xs bg-indian-cream text-indian-maroon px-2 py-1 rounded">
          {count}
        </span>
        <ArrowRight className="h-4 w-4 text-indian-maroon" />
      </div>
    </div>
  );
};

export default PublicSearch;