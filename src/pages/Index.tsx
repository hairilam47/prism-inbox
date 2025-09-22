import { useState, useEffect } from "react";
import { MessageCircle, Send, Camera, Mail, Hash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CollapsibleSearch } from "@/components/CollapsibleSearch";
import { PlatformNavigation } from "@/components/PlatformNavigation";
import { AIDigestBox } from "@/components/AIDigestBox";
import { PriorityCard, PriorityCardData } from "@/components/PriorityCard";
import { BottomNavigation } from "@/components/BottomNavigation";
import { TasksTab } from "@/components/TasksTab";
import { SettingsTab } from "@/components/SettingsTab";
import { ThemeProvider } from "@/contexts/ThemeContext";

// Mock data for priority cards
const mockPriorityData: PriorityCardData[] = [
  {
    id: "1",
    contact: "Sarah Johnson",
    platform: "whatsapp",
    platformIcon: MessageCircle,
    platformColor: "platform-whatsapp",
    summary: "Can we reschedule tomorrow's meeting to 3 PM? Something urgent came up with the client presentation.",
    fullMessage: "Hey! I hope you're doing well. I know we had our project review meeting scheduled for 10 AM tomorrow, but something urgent came up with the client presentation that I need to prepare for. Would it be possible to move our meeting to 3 PM instead? I should have everything ready by then. Let me know if that works for you!",
    timestamp: "2 minutes ago",
    priority: "urgent",
    unread: true
  },
  {
    id: "2",
    contact: "Design Team",
    platform: "slack",
    platformIcon: Hash,
    platformColor: "platform-slack",
    summary: "New mockups for the mobile app are ready for review. Please check the updated user flow.",
    fullMessage: "The new mockups for the mobile app are ready for review. We've made significant improvements to the user flow based on the feedback from last week. The main changes include simplified navigation, better accessibility features, and improved visual hierarchy. Please take a look when you have a chance and let us know your thoughts.",
    timestamp: "1 hour ago",
    priority: "soon",
    unread: true
  },
  {
    id: "3",
    contact: "alex@company.com",
    platform: "gmail",
    platformIcon: Mail,
    platformColor: "platform-gmail",
    summary: "Invoice #2024-001 payment confirmation received. Next payment due in 30 days.",
    timestamp: "3 hours ago",
    priority: "later",
    unread: false
  },
  {
    id: "4",
    contact: "Mike Chen",
    platform: "telegram",
    platformIcon: Send,
    platformColor: "platform-telegram",
    summary: "Weekend plans confirmed! Movie starts at 7 PM, should we meet at 6:30?",
    fullMessage: "Hey! Just confirmed our weekend plans. The movie starts at 7 PM at the cinema downtown. Should we meet at 6:30 to grab some snacks first? Also, do you want to get dinner afterwards? There's a great new restaurant that opened nearby.",
    timestamp: "5 hours ago",
    priority: "later",
    unread: true
  },
  {
    id: "5",
    contact: "Marketing Team",
    platform: "slack",
    platformIcon: Hash,
    platformColor: "platform-slack",
    summary: "Q4 campaign performance review scheduled for Friday. Please prepare your metrics.",
    timestamp: "1 day ago",
    priority: "soon",
    unread: false
  }
];

const Index = () => {
  const [activeTab, setActiveTab] = useState("priority");
  const [priorityCards, setPriorityCards] = useState(mockPriorityData);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user has completed onboarding
    const hasCompletedOnboarding = localStorage.getItem('onboarding_completed');
    if (!hasCompletedOnboarding) {
      navigate('/onboarding');
    }
  }, [navigate]);

  const handleCardSwipeLeft = (cardId: string) => {
    // Snooze action
    console.log("Snoozing card:", cardId);
  };

  const handleCardSwipeRight = (cardId: string) => {
    // Mark as done/archive
    setPriorityCards(prev => prev.filter(card => card.id !== cardId));
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <CollapsibleSearch />
        
        {activeTab === "priority" && (
          <>
            <PlatformNavigation />
            <AIDigestBox />
            <div className="pb-bottom-nav">
              {priorityCards.map((card) => (
                <PriorityCard
                  key={card.id}
                  data={card}
                  onSwipeLeft={() => handleCardSwipeLeft(card.id)}
                  onSwipeRight={() => handleCardSwipeRight(card.id)}
                />
              ))}
              
              {priorityCards.length === 0 && (
                <div className="px-container-padding py-12 text-center">
                  <div className="w-16 h-16 bg-ai-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="h-8 w-8 text-ai-primary" />
                  </div>
                  <h3 className="text-subheading text-text-primary mb-2">
                    Inbox Zero Achieved! 🎉
                  </h3>
                  <p className="text-caption text-text-muted">
                    All your messages have been processed. Great job staying on top of everything!
                  </p>
                </div>
              )}
            </div>
          </>
        )}
        
        {activeTab === "tasks" && <TasksTab />}
        
        {activeTab === "all-chats" && (
          <div className="px-4 pb-24 pt-6">
            <div className="text-center py-12">
              <p className="text-text-muted">All Chats view coming soon...</p>
            </div>
          </div>
        )}
        
        {activeTab === "settings" && <SettingsTab />}
        
        <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </ThemeProvider>
  );
};

export default Index;
