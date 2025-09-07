import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Check } from "lucide-react";
import { MessageCircle, Send, Camera, Mail, Hash, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeProvider } from "@/contexts/ThemeContext";

interface Platform {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  color: string;
  description: string;
  connected: boolean;
}

const availablePlatforms: Platform[] = [
  {
    id: "whatsapp",
    name: "WhatsApp",
    icon: MessageCircle,
    color: "platform-whatsapp",
    description: "Connect your account",
    connected: false,
  },
  {
    id: "telegram",
    name: "Telegram",
    icon: Send,
    color: "platform-telegram", 
    description: "Connect your account",
    connected: false,
  },
  {
    id: "slack",
    name: "Slack",
    icon: Hash,
    color: "platform-slack",
    description: "Connect your account", 
    connected: false,
  },
  {
    id: "gmail",
    name: "Gmail",
    icon: Mail,
    color: "platform-gmail",
    description: "Connect your account",
    connected: false,
  },
  {
    id: "yahoo",
    name: "Yahoo Mail",
    icon: Mail,
    color: "platform-yahoo",
    description: "Connect your account",
    connected: false,
  },
  {
    id: "instagram",
    name: "Instagram", 
    icon: Camera,
    color: "platform-instagram",
    description: "Connect your account",
    connected: false,
  },
  {
    id: "messenger",
    name: "Facebook Messenger",
    icon: MessageSquare,
    color: "platform-messenger",
    description: "Connect your account",
    connected: false,
  },
  {
    id: "line",
    name: "LINE",
    icon: MessageCircle,
    color: "platform-line",
    description: "Connect your account",
    connected: false,
  },
  {
    id: "wechat",
    name: "WeChat",
    icon: MessageSquare,
    color: "platform-wechat", 
    description: "Connect your account",
    connected: false,
  },
  {
    id: "kakaotalk",
    name: "KakaoTalk",
    icon: MessageCircle,
    color: "platform-kakaotalk",
    description: "Connect your account",
    connected: false,
  },
];

const AddPlatform = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [platforms, setPlatforms] = useState(availablePlatforms);
  const [connectingPlatform, setConnectingPlatform] = useState<string | null>(null);

  const filteredPlatforms = platforms.filter(platform =>
    platform.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleConnectPlatform = (platformId: string) => {
    setConnectingPlatform(platformId);
    
    // Simulate connection process
    setTimeout(() => {
      setPlatforms(prev => 
        prev.map(p => 
          p.id === platformId ? { ...p, connected: true } : p
        )
      );
      setConnectingPlatform(null);
      
      // Show success message and navigate back after a moment
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }, 2000);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border/20 bg-background/95 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
              className="h-10 w-10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            
            <div>
              <h1 className="text-xl font-semibold text-text-primary">Add Platform</h1>
              <p className="text-sm text-text-muted">Connect your messaging accounts</p>
            </div>
          </div>
        </div>

        {/* Platforms Grid */}
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4 mb-6">
            {filteredPlatforms.map((platform) => {
              const IconComponent = platform.icon;
              const isConnecting = connectingPlatform === platform.id;
              
              return (
                <button
                  key={platform.id}
                  onClick={() => !platform.connected && !isConnecting && handleConnectPlatform(platform.id)}
                  disabled={platform.connected || isConnecting}
                  className={`
                    p-4 rounded-2xl border border-border/20 bg-surface/50 backdrop-blur-sm
                    transition-all duration-200 ease-smooth
                    ${platform.connected 
                      ? 'opacity-75 cursor-default' 
                      : isConnecting 
                        ? 'opacity-75 cursor-wait' 
                        : 'hover:scale-[1.02] hover:shadow-md hover:border-border/40 active:scale-[0.98]'
                    }
                    touch-manipulation
                  `}
                >
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className={`
                      w-12 h-12 rounded-xl flex items-center justify-center
                      ${platform.connected 
                        ? `bg-${platform.color} shadow-lg` 
                        : `bg-${platform.color}/10 group-hover:bg-${platform.color}/20`
                      }
                      transition-all duration-200
                    `}>
                      {platform.connected ? (
                        <Check className="h-6 w-6 text-white" />
                      ) : (
                        <IconComponent className={`
                          h-6 w-6 
                          ${isConnecting ? 'animate-pulse' : ''}
                          text-${platform.color}
                        `} />
                      )}
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-text-primary text-sm mb-1">
                        {platform.name}
                      </h3>
                      <p className="text-xs text-text-muted">
                        {platform.connected 
                          ? "Connected" 
                          : isConnecting 
                            ? "Connecting..." 
                            : platform.description
                        }
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-muted" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for more platforms..."
              className="pl-10 rounded-full border-border/40 bg-surface/50 backdrop-blur-sm"
            />
          </div>

          {/* No Results */}
          {filteredPlatforms.length === 0 && searchQuery && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-surface/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-text-muted" />
              </div>
              <h3 className="text-subheading text-text-primary mb-2">
                No platforms found
              </h3>
              <p className="text-caption text-text-muted">
                Try searching with a different term
              </p>
            </div>
          )}

          {/* Coming Soon Note */}
          <div className="mt-8 p-4 rounded-xl bg-surface/30 border border-border/20">
            <p className="text-sm text-text-muted text-center">
              More platforms coming soon! We're working on adding support for additional messaging services.
            </p>
          </div>
        </div>

        {/* Connection Overlay */}
        {connectingPlatform && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-surface border border-border/20 rounded-2xl p-6 mx-4 max-w-sm w-full text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                Connecting...
              </h3>
              <p className="text-sm text-text-muted">
                Authenticating with {platforms.find(p => p.id === connectingPlatform)?.name}
              </p>
            </div>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
};

export default AddPlatform;