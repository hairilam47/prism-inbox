import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, Mail, MessageSquare, Send, Inbox } from 'lucide-react';

interface PlatformData {
  name: string;
  icon: React.ReactNode;
  description: string;
  permissions: Array<{
    icon: React.ReactNode;
    text: string;
  }>;
  color: string;
}

const platformData: Record<string, PlatformData> = {
  gmail: {
    name: 'Gmail',
    icon: <Mail className="w-6 h-6" />,
    description: 'Securely link your Gmail to manage emails in one place. We use encrypted tokens only — your password is never shared.',
    permissions: [
      { icon: <Inbox className="w-4 h-4" />, text: 'Read your emails' },
      { icon: <Send className="w-4 h-4" />, text: 'Send emails' },
    ],
    color: 'bg-red-500'
  },
  slack: {
    name: 'Slack',
    icon: <MessageSquare className="w-6 h-6" />,
    description: 'Connect Slack to bring your workspace messages into one inbox. We never store your password — just secure tokens.',
    permissions: [
      { icon: <MessageSquare className="w-4 h-4" />, text: 'Read workspace messages' },
      { icon: <Send className="w-4 h-4" />, text: 'Send messages on your behalf (when you reply)' },
    ],
    color: 'bg-purple-500'
  },
  telegram: {
    name: 'Telegram',
    icon: <Send className="w-6 h-6" />,
    description: 'Link your Telegram to chat seamlessly from within the app. We only use encrypted tokens — never your password.',
    permissions: [
      { icon: <MessageSquare className="w-4 h-4" />, text: 'Read chat messages' },
      { icon: <Send className="w-4 h-4" />, text: 'Send messages' },
    ],
    color: 'bg-blue-500'
  }
};

interface ConnectPlatformModalProps {
  isOpen: boolean;
  onClose: () => void;
  platform: keyof typeof platformData;
  onConnect: (platform: string) => void;
}

export const ConnectPlatformModal: React.FC<ConnectPlatformModalProps> = ({
  isOpen,
  onClose,
  platform,
  onConnect,
}) => {
  const data = platformData[platform];

  if (!data) return null;

  const handleConnect = () => {
    onConnect(platform);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-card max-w-md p-0 overflow-hidden border-0 shadow-elegant">
        {/* Close button */}
        <DialogClose className="absolute right-4 top-4 z-10 rounded-full p-2 bg-background/10 backdrop-blur-sm hover:bg-background/20 transition-all duration-200">
          <X className="h-4 w-4 text-foreground" />
          <span className="sr-only">Close</span>
        </DialogClose>

        <div className="p-6 space-y-6">
          {/* Header with platform icon and title */}
          <DialogHeader className="space-y-4">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-xl ${data.color} text-white shadow-lg`}>
                {data.icon}
              </div>
              <DialogTitle className="text-xl font-bold text-foreground">
                Connect {data.name}
              </DialogTitle>
            </div>
          </DialogHeader>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed">
            {data.description}
          </p>

          {/* Permissions section */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">
              What we need access to
            </h4>
            <div className="space-y-2">
              {data.permissions.map((permission, index) => (
                <div key={index} className="flex items-center gap-3 p-2 rounded-lg bg-muted/30">
                  <div className="text-primary">
                    {permission.icon}
                  </div>
                  <span className="text-sm text-foreground">
                    {permission.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Connect button */}
          <div className="flex justify-end pt-2">
            <Button
              onClick={handleConnect}
              className="px-6 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl font-medium shadow-lg hover:shadow-glow transition-all duration-200"
            >
              Connect Now
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};