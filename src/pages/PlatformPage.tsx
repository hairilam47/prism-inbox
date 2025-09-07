import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Send, MoreVertical } from "lucide-react";
import { MessageCircle, Mail, Hash, Camera } from "lucide-react";
import { Send as TelegramIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeProvider } from "@/contexts/ThemeContext";

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
  avatar?: string;
}

interface Platform {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  color: string;
}

const platforms: Record<string, Platform> = {
  whatsapp: {
    id: "whatsapp",
    name: "WhatsApp",
    icon: MessageCircle,
    color: "platform-whatsapp",
  },
  telegram: {
    id: "telegram", 
    name: "Telegram",
    icon: TelegramIcon,
    color: "platform-telegram",
  },
  gmail: {
    id: "gmail",
    name: "Gmail",
    icon: Mail,
    color: "platform-gmail",
  },
  slack: {
    id: "slack",
    name: "Slack", 
    icon: Hash,
    color: "platform-slack",
  },
  instagram: {
    id: "instagram",
    name: "Instagram",
    icon: Camera,
    color: "platform-instagram",
  },
};

// Mock message data for each platform
const mockMessages: Record<string, Message[]> = {
  whatsapp: [
    {
      id: "1",
      sender: "Sarah Johnson",
      content: "Hey! Hope you're doing well. I know we had our project review meeting scheduled for 10 AM tomorrow, but something urgent came up with the client presentation that I need to prepare for.",
      timestamp: "10:30 AM",
      isOwn: false,
    },
    {
      id: "2", 
      sender: "Sarah Johnson",
      content: "Would it be possible to move our meeting to 3 PM instead? I should have everything ready by then.",
      timestamp: "10:31 AM",
      isOwn: false,
    },
    {
      id: "3",
      sender: "You",
      content: "Sure, no problem! 3 PM works for me. Take your time with the client presentation.",
      timestamp: "10:35 AM", 
      isOwn: true,
    },
    {
      id: "4",
      sender: "Sarah Johnson",
      content: "Thank you so much! Really appreciate your flexibility. I'll send over the updated agenda later today.",
      timestamp: "10:36 AM",
      isOwn: false,
    },
  ],
  telegram: [
    {
      id: "1",
      sender: "Mike Chen",
      content: "Weekend plans confirmed! Movie starts at 7 PM at the cinema downtown.",
      timestamp: "2:15 PM",
      isOwn: false,
    },
    {
      id: "2",
      sender: "Mike Chen", 
      content: "Should we meet at 6:30 to grab some snacks first?",
      timestamp: "2:15 PM",
      isOwn: false,
    },
    {
      id: "3",
      sender: "You",
      content: "Sounds perfect! I'll be there at 6:30. What movie are we watching again?",
      timestamp: "2:20 PM",
      isOwn: true,
    },
  ],
  gmail: [
    {
      id: "1",
      sender: "alex@company.com",
      content: "Invoice #2024-001 payment confirmation received. Next payment due in 30 days. Thank you for your business!",
      timestamp: "9:15 AM",
      isOwn: false,
    },
  ],
  slack: [
    {
      id: "1",
      sender: "Design Team",
      content: "New mockups for the mobile app are ready for review. We've made significant improvements to the user flow based on feedback.",
      timestamp: "11:30 AM",
      isOwn: false,
    },
    {
      id: "2",
      sender: "Design Team",
      content: "Main changes include simplified navigation, better accessibility features, and improved visual hierarchy.",
      timestamp: "11:31 AM", 
      isOwn: false,
    },
    {
      id: "3",
      sender: "You",
      content: "Looks great! I'll review them this afternoon and get back to you with feedback.",
      timestamp: "11:45 AM",
      isOwn: true,
    },
  ],
  instagram: [
    {
      id: "1",
      sender: "Emma Wilson",
      content: "Love the new photos from your trip! The sunset shots are amazing 📸",
      timestamp: "4:20 PM",
      isOwn: false,
    },
  ],
};

const PlatformPage = () => {
  const { platformId } = useParams<{ platformId: string }>();
  const navigate = useNavigate();
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const platform = platformId ? platforms[platformId] : null;

  useEffect(() => {
    if (platformId && mockMessages[platformId]) {
      setMessages(mockMessages[platformId]);
    }
  }, [platformId]);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !platformId) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: "You",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: true,
    };

    setMessages(prev => [...prev, message]);
    setNewMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!platform) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl text-text-primary mb-2">Platform not found</h2>
            <Button onClick={() => navigate("/")} variant="outline">
              Go back to inbox
            </Button>
          </div>
        </div>
      </ThemeProvider>
    );
  }

  const IconComponent = platform.icon;

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background flex flex-col">
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
            
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-full bg-${platform.color}/10 flex items-center justify-center`}>
                <IconComponent className={`h-5 w-5 text-${platform.color}`} />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-text-primary">{platform.name}</h1>
                <p className="text-sm text-text-muted">
                  {messages.filter(m => !m.isOwn).length} messages
                </p>
              </div>
            </div>
          </div>
          
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>

        {/* Messages */}
        <ScrollArea ref={scrollAreaRef} className="flex-1 px-4">
          <div className="py-4 space-y-4">
            {messages.length === 0 ? (
              <div className="text-center py-12">
                <div className={`w-16 h-16 bg-${platform.color}/10 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <IconComponent className={`h-8 w-8 text-${platform.color}`} />
                </div>
                <h3 className="text-subheading text-text-primary mb-2">
                  No messages yet
                </h3>
                <p className="text-caption text-text-muted">
                  Start a conversation on {platform.name}
                </p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] ${message.isOwn ? 'order-2' : 'order-1'}`}>
                    {!message.isOwn && (
                      <p className="text-xs text-text-muted mb-1 ml-3">
                        {message.sender}
                      </p>
                    )}
                    <div
                      className={`
                        rounded-2xl px-4 py-3 
                        ${message.isOwn 
                          ? `bg-${platform.color} text-white` 
                          : 'bg-surface border border-border/20'
                        }
                        shadow-sm
                      `}
                    >
                      <p className={`text-sm ${message.isOwn ? 'text-white' : 'text-text-primary'}`}>
                        {message.content}
                      </p>
                    </div>
                    <p className={`text-xs text-text-muted mt-1 ${message.isOwn ? 'text-right mr-3' : 'ml-3'}`}>
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="p-4 border-t border-border/20 bg-background/95 backdrop-blur-sm">
          <div className="flex items-center space-x-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={`Message ${platform.name}...`}
              className="flex-1 rounded-full border-border/40 bg-surface/50"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              size="icon"
              className={`h-10 w-10 rounded-full bg-${platform.color} hover:bg-${platform.color}/90`}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default PlatformPage;