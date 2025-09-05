import { useState } from "react";
import { MessageCircle, Send, Camera, Mail, Hash, Zap, Clock, CheckCircle, MoreHorizontal, ChevronDown, ChevronUp } from "lucide-react";

export interface PriorityCardData {
  id: string;
  contact: string;
  platform: string;
  summary: string;
  fullMessage?: string;
  timestamp: string;
  priority: 'urgent' | 'soon' | 'later';
  unread: boolean;
  platformIcon: React.ComponentType<any>;
  platformColor: string;
}

const platformIcons = {
  whatsapp: MessageCircle,
  telegram: Send,
  instagram: Camera,
  gmail: Mail,
  slack: Hash
};

const priorityConfig = {
  urgent: {
    icon: Zap,
    color: 'priority-urgent',
    glowColor: 'priority-urgent-glow',
    label: 'Urgent'
  },
  soon: {
    icon: Clock,
    color: 'priority-soon', 
    glowColor: 'priority-soon-glow',
    label: 'Soon'
  },
  later: {
    icon: CheckCircle,
    color: 'priority-later',
    glowColor: 'priority-later-glow', 
    label: 'Later'
  }
};

interface PriorityCardProps {
  data: PriorityCardData;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}

export const PriorityCard = ({ data, onSwipeLeft, onSwipeRight }: PriorityCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [swipeOffset, setSwipeOffset] = useState(0);
  
  const PlatformIcon = data.platformIcon;
  const PriorityIcon = priorityConfig[data.priority].icon;

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const startX = touch.clientX;
    
    const handleTouchMove = (e: TouchEvent) => {
      const currentTouch = e.touches[0];
      const diff = currentTouch.clientX - startX;
      setSwipeOffset(Math.max(-100, Math.min(100, diff * 0.5)));
    };
    
    const handleTouchEnd = () => {
      if (swipeOffset > 50) {
        onSwipeRight?.();
      } else if (swipeOffset < -50) {
        onSwipeLeft?.();
      }
      setSwipeOffset(0);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
    
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
  };

  return (
    <div className="mx-container-padding mb-3">
      <div 
        className={`
          glass-card rounded-xl overflow-hidden
          animate-card-hover
          transition-all duration-200
          ${data.unread ? 'ring-1 ring-ai-glow/30' : ''}
        `}
        style={{ transform: `translateX(${swipeOffset}px)` }}
        onTouchStart={handleTouchStart}
      >
        {/* Card Header */}
        <div className="p-4 pb-3">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              {/* Platform Icon */}
              <div className={`w-8 h-8 rounded-lg bg-surface-muted flex items-center justify-center platform-glow-${data.platform}`}>
                <PlatformIcon className={`h-4 w-4 text-${data.platformColor}`} />
              </div>
              
              {/* Contact Info */}
              <div className="flex-1 min-w-0">
                <p className="text-body font-medium text-text-primary truncate">
                  {data.contact}
                </p>
                <p className="text-caption text-text-muted">
                  {data.timestamp}
                </p>
              </div>
            </div>
            
            {/* Priority Indicator */}
            <div className={`flex items-center space-x-1 px-2 py-1 rounded-full bg-${priorityConfig[data.priority].color}/10`}>
              <PriorityIcon className={`h-3 w-3 text-${priorityConfig[data.priority].color}`} />
              <span className={`text-micro font-medium text-${priorityConfig[data.priority].color}`}>
                {priorityConfig[data.priority].label}
              </span>
            </div>
          </div>
          
          {/* Message Summary */}
          <p className="text-body text-text-secondary leading-relaxed mb-3">
            {data.summary}
          </p>
          
          {/* Expand Button */}
          {data.fullMessage && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center space-x-1 text-ai-primary hover:text-ai-glow transition-smooth"
            >
              <span className="text-caption">
                {isExpanded ? 'Show less' : 'Show more'}
              </span>
              {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            </button>
          )}
        </div>
        
        {/* Expanded Content */}
        {isExpanded && data.fullMessage && (
          <div className="px-4 pb-3 animate-slide-down">
            <div className="bg-surface-muted rounded-lg p-3">
              <p className="text-caption text-text-secondary leading-relaxed">
                {data.fullMessage}
              </p>
            </div>
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="px-4 pb-4">
          <div className="flex space-x-2">
            <button className="flex-1 bg-ai-primary text-white py-2 px-3 rounded-lg text-caption font-medium hover:bg-ai-glow transition-smooth touch-manipulation">
              Reply
            </button>
            <button className="bg-surface border border-glass-border py-2 px-3 rounded-lg text-caption font-medium text-text-primary hover:bg-surface-muted transition-smooth touch-manipulation">
              Translate
            </button>
            <button className="bg-surface border border-glass-border py-2 px-3 rounded-lg text-caption font-medium text-text-primary hover:bg-surface-muted transition-smooth touch-manipulation">
              Summarize
            </button>
            <button className="bg-surface border border-glass-border py-2 px-3 rounded-lg text-caption font-medium text-text-primary hover:bg-surface-muted transition-smooth touch-manipulation">
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};