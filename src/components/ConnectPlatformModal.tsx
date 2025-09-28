import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, Mail, MessageSquare, Send, Inbox, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

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

type ConnectionState = 'intro' | 'connecting' | 'success' | 'error';

interface ConnectPlatformModalProps {
  isOpen: boolean;
  onClose: () => void;
  platform: keyof typeof platformData;
  onConnect: (platform: string) => void;
  onAddAnother?: () => void;
  onGoToInbox?: () => void;
}

export const ConnectPlatformModal: React.FC<ConnectPlatformModalProps> = ({
  isOpen,
  onClose,
  platform,
  onConnect,
  onAddAnother,
  onGoToInbox,
}) => {
  const [connectionState, setConnectionState] = useState<ConnectionState>('intro');
  const data = platformData[platform];

  if (!data) return null;

  const handleConnect = async () => {
    setConnectionState('connecting');
    
    // Simulate connection process
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate random success/failure for demo
      const success = Math.random() > 0.3;
      
      if (success) {
        setConnectionState('success');
        onConnect(platform);
      } else {
        setConnectionState('error');
      }
    } catch (error) {
      setConnectionState('error');
    }
  };

  const handleClose = () => {
    setConnectionState('intro');
    onClose();
  };

  const handleTryAgain = () => {
    setConnectionState('intro');
  };

  const handleAddAnother = () => {
    setConnectionState('intro');
    onClose();
    onAddAnother?.();
  };

  const handleGoToInbox = () => {
    setConnectionState('intro');
    onClose();
    onGoToInbox?.();
  };

  const renderContent = () => {
    switch (connectionState) {
      case 'intro':
        return (
          <div className="animate-fade-in">
            {/* Header */}
            <DialogHeader className="space-y-4 text-center">
              <div className="flex justify-center">
                <div className={`p-4 rounded-2xl ${data.color} text-white shadow-lg`}>
                  {data.icon}
                </div>
              </div>
              <DialogTitle className="text-2xl font-bold text-foreground">
                Connect {data.name} to your inbox
              </DialogTitle>
            </DialogHeader>

            {/* Description */}
            <div className="space-y-4 text-center">
              <p className="text-muted-foreground leading-relaxed">
                We'll securely link your {data.name} so you can manage all your messages in one place.
              </p>
              
              <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
                <p className="text-sm text-foreground font-medium">
                  By connecting, you'll be able to read and send messages directly from this app.
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleClose}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleConnect}
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-glow"
              >
                Connect
              </Button>
            </div>
          </div>
        );

      case 'connecting':
        return (
          <div className="animate-fade-in text-center space-y-6">
            {/* Loading animation */}
            <div className="flex items-center justify-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10 text-primary">
                <Mail className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-0.5 bg-primary/30 rounded-full overflow-hidden">
                  <div className="w-full h-full bg-primary animate-pulse"></div>
                </div>
                <Loader2 className="w-4 h-4 animate-spin text-primary" />
                <div className="w-8 h-0.5 bg-primary/30 rounded-full overflow-hidden">
                  <div className="w-full h-full bg-primary animate-pulse"></div>
                </div>
              </div>
              <div className={`p-3 rounded-xl ${data.color} text-white`}>
                {data.icon}
              </div>
            </div>

            <div className="space-y-2">
              <DialogTitle className="text-xl font-bold text-foreground">
                Connecting {data.name}...
              </DialogTitle>
              <p className="text-muted-foreground">
                This may take a few seconds.
              </p>
            </div>
          </div>
        );

      case 'success':
        return (
          <div className="animate-scale-in text-center space-y-6">
            {/* Success icon */}
            <div className="flex justify-center">
              <div className="p-4 rounded-full bg-green-500/10 text-green-500 animate-scale-in">
                <CheckCircle className="w-12 h-12" />
              </div>
            </div>

            <div className="space-y-2">
              <DialogTitle className="text-2xl font-bold text-foreground">
                {data.name} Connected!
              </DialogTitle>
              <p className="text-muted-foreground">
                Your messages will now sync into your inbox.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleAddAnother}
                variant="outline"
                className="flex-1"
              >
                Add another platform
              </Button>
              <Button
                onClick={handleGoToInbox}
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Go to Inbox
              </Button>
            </div>
          </div>
        );

      case 'error':
        return (
          <div className="animate-fade-in text-center space-y-6">
            {/* Error icon */}
            <div className="flex justify-center">
              <div className="p-4 rounded-full bg-red-500/10 text-red-500">
                <AlertCircle className="w-12 h-12" />
              </div>
            </div>

            <div className="space-y-2">
              <DialogTitle className="text-2xl font-bold text-foreground">
                Connection Failed
              </DialogTitle>
              <p className="text-muted-foreground">
                Something went wrong. Please try again.
              </p>
            </div>

            {/* Buttons */}
            <div className="space-y-3">
              <div className="flex gap-3">
                <Button
                  onClick={handleClose}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleTryAgain}
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Try Again
                </Button>
              </div>
              <Button
                variant="link"
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Learn more
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="glass-card max-w-md p-0 overflow-hidden border-0 shadow-elegant">
        {/* Close button - only show on intro and error states */}
        {(connectionState === 'intro' || connectionState === 'error') && (
          <DialogClose className="absolute right-4 top-4 z-10 rounded-full p-2 bg-background/10 backdrop-blur-sm hover:bg-background/20 transition-all duration-200">
            <X className="h-4 w-4 text-foreground" />
            <span className="sr-only">Close</span>
          </DialogClose>
        )}

        <div className="p-6 space-y-6">
          {renderContent()}
        </div>
      </DialogContent>
    </Dialog>
  );
};