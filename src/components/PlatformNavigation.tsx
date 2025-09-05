import { MessageCircle, Send, Camera, Mail, Hash } from "lucide-react";

interface Platform {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  color: string;
  glowClass: string;
  unreadCount: number;
}

const platforms: Platform[] = [
  {
    id: "whatsapp",
    name: "WhatsApp", 
    icon: MessageCircle,
    color: "platform-whatsapp",
    glowClass: "platform-glow-whatsapp",
    unreadCount: 5
  },
  {
    id: "telegram",
    name: "Telegram",
    icon: Send,
    color: "platform-telegram", 
    glowClass: "platform-glow-telegram",
    unreadCount: 2
  },
  {
    id: "instagram",
    name: "Instagram",
    icon: Camera,
    color: "platform-instagram",
    glowClass: "platform-glow-instagram", 
    unreadCount: 8
  },
  {
    id: "gmail",
    name: "Gmail",
    icon: Mail,
    color: "platform-gmail",
    glowClass: "platform-glow-gmail",
    unreadCount: 12
  },
  {
    id: "slack", 
    name: "Slack",
    icon: Hash,
    color: "platform-slack",
    glowClass: "platform-glow-slack",
    unreadCount: 3
  }
];

export const PlatformNavigation = () => {
  return (
    <div className="px-container-padding py-4">
      <div className="flex justify-between items-center space-x-3">
        {platforms.map((platform) => {
          const IconComponent = platform.icon;
          
          return (
            <div
              key={platform.id}
              className="relative flex-1 max-w-[72px]"
            >
              <button className={`
                w-full aspect-square rounded-xl 
                glass-surface 
                flex items-center justify-center
                ${platform.glowClass}
                hover:scale-105 active:scale-95
                transition-all duration-200 ease-smooth
                touch-manipulation
                group
              `}>
                <IconComponent className={`
                  h-6 w-6 text-${platform.color}
                  group-hover:scale-110 
                  transition-transform duration-200
                `} />
                
                {/* Unread Indicator */}
                {platform.unreadCount > 0 && (
                  <div className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-priority-urgent rounded-full flex items-center justify-center animate-glow-pulse">
                    <span className="text-[10px] font-medium text-white px-1">
                      {platform.unreadCount > 9 ? '9+' : platform.unreadCount}
                    </span>
                  </div>
                )}
              </button>
              
              {/* Platform Label */}
              <p className="text-micro text-text-muted text-center mt-1 truncate">
                {platform.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};