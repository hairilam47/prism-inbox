import { Moon, Sun, Bell, Shield, Smartphone, Globe } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { ThemeSelector } from './ThemeSelector';

export function SettingsTab() {
  const { isDark, toggleDark } = useTheme();

  const settingsSections = [
    {
      title: 'Appearance',
      items: [
        {
          icon: isDark ? Sun : Moon,
          label: isDark ? 'Light Mode' : 'Dark Mode',
          description: 'Switch between light and dark themes',
          action: toggleDark,
          isToggle: true,
          isActive: isDark
        }
      ]
    },
    {
      title: 'Notifications',
      items: [
        {
          icon: Bell,
          label: 'Push Notifications',
          description: 'Receive notifications for new messages',
          isToggle: true,
          isActive: true
        },
        {
          icon: Smartphone,
          label: 'Haptic Feedback',
          description: 'Vibration feedback for interactions',
          isToggle: true,
          isActive: true
        }
      ]
    },
    {
      title: 'Privacy & Security',
      items: [
        {
          icon: Shield,
          label: 'End-to-End Encryption',
          description: 'Your messages are secured',
          isToggle: true,
          isActive: true,
          disabled: true
        },
        {
          icon: Globe,
          label: 'Data Sync',
          description: 'Sync across all your devices',
          isToggle: true,
          isActive: true
        }
      ]
    }
  ];

  return (
    <div className="p-4 space-y-6 pb-24">
      <div className="text-center">
        <h1 className="text-heading font-light text-text-primary mb-2">Settings</h1>
        <p className="text-caption text-text-muted">Customize your messaging experience</p>
      </div>

      <ThemeSelector />

      {settingsSections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="glass-card rounded-xl p-6 space-y-4">
          <h3 className="text-subheading font-medium text-text-primary">{section.title}</h3>
          
          <div className="space-y-3">
            {section.items.map((item, itemIndex) => (
              <div
                key={itemIndex}
                className={`flex items-center justify-between p-3 rounded-lg transition-smooth ${
                  item.action && !item.disabled 
                    ? 'hover:bg-surface-muted cursor-pointer' 
                    : item.disabled 
                    ? 'opacity-50 cursor-not-allowed' 
                    : ''
                }`}
                onClick={item.action && !item.disabled ? item.action : undefined}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-ai-primary/10 flex items-center justify-center">
                    <item.icon className="w-4 h-4 text-ai-primary" />
                  </div>
                  <div>
                    <p className="text-body font-medium text-text-primary">{item.label}</p>
                    <p className="text-caption text-text-muted">{item.description}</p>
                  </div>
                </div>
                
                {item.isToggle && (
                  <div className={`w-11 h-6 rounded-full transition-smooth ${
                    item.isActive ? 'bg-ai-primary' : 'bg-glass-border'
                  }`}>
                    <div className={`w-5 h-5 rounded-full bg-white transition-smooth transform ${
                      item.isActive ? 'translate-x-5' : 'translate-x-0.5'
                    } mt-0.5`} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="glass-card rounded-xl p-6 text-center">
        <p className="text-caption text-text-muted mb-2">AI Messaging Hub</p>
        <p className="text-micro text-text-muted">Version 1.0.0</p>
      </div>
    </div>
  );
}