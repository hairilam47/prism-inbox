import { Brain, MessageSquare, CheckSquare, Settings } from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  isActive?: boolean;
  badge?: number;
}

const navItems: NavItem[] = [
  {
    id: "priority",
    label: "Priority",
    icon: Brain,
    isActive: true
  },
  {
    id: "all-chats", 
    label: "All Chats",
    icon: MessageSquare,
    badge: 30
  },
  {
    id: "tasks",
    label: "Tasks", 
    icon: CheckSquare,
    badge: 5
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings
  }
];

interface BottomNavigationProps {
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
}

export const BottomNavigation = ({ activeTab = "priority", onTabChange }: BottomNavigationProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 pb-safe-bottom z-40">
      <div className="glass-card rounded-t-xl border-b-0 px-container-padding py-4">
        <div className="flex justify-around items-center">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onTabChange?.(item.id)}
                className={`
                  relative flex flex-col items-center space-y-1 py-2 px-3 rounded-lg
                  transition-all duration-200 ease-smooth touch-manipulation
                  ${isActive 
                    ? 'bg-ai-primary/10 text-ai-primary scale-105' 
                    : 'text-text-muted hover:text-text-primary hover:bg-surface-muted'
                  }
                `}
              >
                <div className="relative">
                  <IconComponent className={`
                    h-5 w-5 transition-all duration-200
                    ${isActive ? 'scale-110' : ''}
                  `} />
                  
                  {/* Badge */}
                  {item.badge && (
                    <div className="absolute -top-2 -right-2 min-w-[16px] h-4 bg-priority-urgent rounded-full flex items-center justify-center">
                      <span className="text-[10px] font-medium text-white px-1">
                        {item.badge > 99 ? '99+' : item.badge}
                      </span>
                    </div>
                  )}
                </div>
                
                <span className={`
                  text-[10px] font-medium transition-all duration-200
                  ${isActive ? 'opacity-100' : 'opacity-70'}
                `}>
                  {item.label}
                </span>
                
                {/* Active Indicator */}
                {isActive && (
                  <div className="absolute -bottom-1 w-1 h-1 bg-ai-primary rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};