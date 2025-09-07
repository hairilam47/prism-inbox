import { MessageCircle, Send, Camera, Mail, Hash, Plus } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const handlePlatformClick = (platformId: string) => {
    navigate(`/platform/${platformId}`);
  };

  return (
    <div className="py-4">
      <Carousel
        opts={{
          align: "start",
          dragFree: true,
          skipSnaps: false,
        }}
        className="w-full"
      >
        <CarouselContent className="ml-container-padding">
          {platforms.map((platform) => {
            const IconComponent = platform.icon;
            
            return (
              <CarouselItem key={platform.id} className="basis-auto pl-3">
                <div className="relative">
                  <button 
                    onClick={() => handlePlatformClick(platform.id)}
                    className={`
                      w-14 h-14 rounded-2xl 
                      bg-background/40 backdrop-blur-sm border border-border/20
                      flex items-center justify-center
                      shadow-sm hover:shadow-md
                      hover:scale-105 active:scale-95
                      transition-all duration-200 ease-smooth
                      touch-manipulation
                      group
                    `}>
                    <IconComponent className={`
                      h-5 w-5 text-${platform.color}/70
                      group-hover:text-${platform.color}
                      group-hover:scale-110 
                      transition-all duration-200
                    `} />
                    
                    {/* Unread Dot Indicator */}
                    {platform.unreadCount > 0 && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-priority-urgent rounded-full animate-glow-pulse shadow-sm" />
                    )}
                  </button>
                  
                  {/* Platform Label */}
                  <p className="text-xs text-text-muted text-center mt-1.5 truncate w-14">
                    {platform.name}
                  </p>
                </div>
              </CarouselItem>
            );
          })}
          
          {/* Add Platform Button */}
          <CarouselItem className="basis-auto pl-3 pr-container-padding">
            <div className="relative">
              <button className="
                w-14 h-14 rounded-2xl 
                bg-background/20 backdrop-blur-sm border-2 border-dashed border-border/40
                flex items-center justify-center
                hover:border-primary/40 hover:bg-background/30
                hover:scale-105 active:scale-95
                transition-all duration-200 ease-smooth
                touch-manipulation
                group
              ">
                <Plus className="
                  h-5 w-5 text-text-muted 
                  group-hover:text-primary
                  group-hover:scale-110 
                  transition-all duration-200
                " />
              </button>
              
              <p className="text-xs text-text-muted text-center mt-1.5 truncate w-14">
                Add
              </p>
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  );
};