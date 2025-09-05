import { useState } from "react";
import { Search, ArrowDown, ArrowUp } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchResult {
  id: string;
  contact: string;
  platform: string;
  snippet: string;
  timestamp: string;
}

const mockResults: SearchResult[] = [
  {
    id: "1",
    contact: "Sarah Johnson",
    platform: "whatsapp",
    snippet: "Can we reschedule tomorrow's meeting?",
    timestamp: "2 minutes ago"
  },
  {
    id: "2", 
    contact: "Design Team",
    platform: "slack",
    snippet: "New mockups are ready for review",
    timestamp: "1 hour ago"
  },
  {
    id: "3",
    contact: "alex@company.com",
    platform: "gmail", 
    snippet: "Invoice #2024-001 payment confirmation",
    timestamp: "3 hours ago"
  }
];

const platformColors = {
  whatsapp: "platform-glow-whatsapp",
  telegram: "platform-glow-telegram", 
  instagram: "platform-glow-instagram",
  gmail: "platform-glow-gmail",
  slack: "platform-glow-slack"
};

export const CollapsibleSearch = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    // Simulate search with mock data
    if (value.length > 0) {
      setResults(mockResults.filter(result => 
        result.contact.toLowerCase().includes(value.toLowerCase()) ||
        result.snippet.toLowerCase().includes(value.toLowerCase())
      ));
    } else {
      setResults([]);
    }
  };

  const toggleSearch = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      setSearchQuery("");
      setResults([]);
    }
  };

  return (
    <div className="relative z-50">
      {/* Search Toggle Area */}
      <div 
        className="h-6 w-full flex justify-center items-center cursor-pointer touch-manipulation"
        onTouchStart={toggleSearch}
        onClick={toggleSearch}
      >
        <div className="w-8 h-1 bg-text-muted rounded-full transition-smooth" />
      </div>

      {/* Expandable Search Container */}
      <div className={`
        absolute top-6 left-0 right-0 mx-container-padding
        transition-all duration-300 ease-smooth
        ${isExpanded ? 'animate-slide-down' : 'opacity-0 pointer-events-none -translate-y-4'}
      `}>
        {/* Search Bar */}
        <div className="glass-card rounded-xl p-4 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-muted" />
            <Input
              placeholder="Search across everything..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10 pr-10 bg-surface border-glass-border text-body placeholder:text-text-muted focus:ring-2 focus:ring-ai-glow/50 focus:border-ai-primary transition-smooth"
            />
            <button
              onClick={toggleSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted hover:text-text-primary transition-smooth"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Search Results */}
        {results.length > 0 && (
          <div className="glass-card rounded-xl p-2 max-h-80 overflow-y-auto scroll-smooth">
            {results.map((result) => (
              <div
                key={result.id}
                className="flex items-center p-3 rounded-lg hover:bg-surface-muted transition-smooth cursor-pointer touch-manipulation"
              >
                <div className={`w-3 h-3 rounded-full mr-3 ${platformColors[result.platform as keyof typeof platformColors]}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-body font-medium text-text-primary truncate">
                      {result.contact}
                    </p>
                    <span className="text-micro text-text-muted ml-2">
                      {result.timestamp}
                    </span>
                  </div>
                  <p className="text-caption text-text-secondary truncate">
                    {result.snippet}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Backdrop */}
      {isExpanded && (
        <div 
          className="fixed inset-0 bg-blur-overlay backdrop-blur-sm -z-10"
          onClick={toggleSearch}
        />
      )}
    </div>
  );
};