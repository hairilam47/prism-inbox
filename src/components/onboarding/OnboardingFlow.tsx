import React, { useState } from 'react';
import { ArrowRight, User, Briefcase, GraduationCap, MessageSquare, Sparkles, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';

const OnboardingFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedReason, setSelectedReason] = useState('');
  const [selectedBackground, setSelectedBackground] = useState('');
  const [customReason, setCustomReason] = useState('');
  const [customBackground, setCustomBackground] = useState('');
  const navigate = useNavigate();

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // Save onboarding data and go to main app
      localStorage.setItem('onboarding_completed', 'true');
      navigate('/');
    }
  };

  const ArrowButton = ({ onClick }: { onClick: () => void }) => (
    <button 
      onClick={onClick}
      className="fixed bottom-8 right-8 w-16 h-16 bg-glass-bg backdrop-blur-lg border border-glass-border rounded-full flex items-center justify-center shadow-elegant transition-smooth hover:scale-110 hover:shadow-glow neon-glow animate-fade-in"
    >
      <ArrowRight className="w-6 h-6 text-ai-primary" />
    </button>
  );

  const GlowingCard = ({ 
    text, 
    icon,
    isSelected, 
    onClick 
  }: { 
    text: string;
    icon?: React.ReactNode;
    isSelected: boolean; 
    onClick: () => void; 
  }) => (
    <button
      onClick={onClick}
      className={`group relative w-full p-6 rounded-xl transition-all duration-300 text-left border backdrop-blur-sm ${
        isSelected 
          ? 'border-ai-primary bg-ai-primary/20 text-ai-primary shadow-glow animate-scale-in' 
          : 'border-glass-border bg-glass-bg hover:border-ai-primary/60 hover:bg-glass-bg/80 hover:shadow-elegant'
      }`}
    >
      <div className="flex items-center space-x-3">
        {icon && <div className="text-ai-primary">{icon}</div>}
        <span className="font-medium">{text}</span>
      </div>
      {isSelected && (
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-ai-primary/10 to-ai-glow/10 pointer-events-none" />
      )}
    </button>
  );

  if (currentStep === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-ai-primary via-ai-glow to-ai-primary/80 flex flex-col items-center justify-center px-6 relative overflow-hidden">
        {/* Floating background elements */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC4xIi8+Cjwvc3ZnPgo=')] opacity-30" />
        
        <div className="relative z-10 text-center space-y-8 animate-fade-in">
          <div className="glass-card p-8 md:p-12 rounded-2xl backdrop-blur-xl border border-white/20 shadow-elegant">
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
              One Inbox.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80">
                Smarter Priorities.
              </span>
            </h1>
            <p className="text-xl text-white/90 max-w-lg mx-auto">
              Unify Telegram, Gmail, Slack & more — powered by AI filters.
            </p>
          </div>
        </div>
        <ArrowButton onClick={nextStep} />
      </div>
    );
  }

  if (currentStep === 2) {
    const reasons = [
      { text: 'Too many messages', icon: <MessageSquare className="w-5 h-5" /> },
      { text: 'Content creator', icon: <Sparkles className="w-5 h-5" /> },
      { text: 'Work productivity', icon: <Briefcase className="w-5 h-5" /> },
      { text: 'Other', icon: <Users className="w-5 h-5" /> }
    ];

    return (
      <div className="min-h-screen bg-background dark:bg-background/95 flex flex-col items-center justify-center px-6 relative overflow-hidden">
        {/* Tech pattern background */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(var(--ai-primary-rgb),0.02)_25%,rgba(var(--ai-primary-rgb),0.02)_50%,transparent_50%,transparent_75%,rgba(var(--ai-primary-rgb),0.02)_75%)] bg-[length:20px_20px]" />
        
        <div className="relative z-10 w-full max-w-lg space-y-8 animate-fade-in">
          <h2 className="text-4xl font-bold text-ai-primary text-center neon-glow">
            What's your focus?
          </h2>
          
          <div className="space-y-4">
            {reasons.map((reason) => (
              <GlowingCard
                key={reason.text}
                text={reason.text}
                icon={reason.icon}
                isSelected={selectedReason === reason.text}
                onClick={() => setSelectedReason(reason.text)}
              />
            ))}
          </div>

          {selectedReason === 'Other' && (
            <div className="animate-scale-in">
              <Input
                placeholder="Tell us more..."
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
                className="w-full bg-glass-bg backdrop-blur-sm border-glass-border focus:border-ai-primary focus:shadow-glow transition-all"
              />
            </div>
          )}
        </div>
        
        {(selectedReason && selectedReason !== 'Other') || (selectedReason === 'Other' && customReason) ? (
          <ArrowButton onClick={nextStep} />
        ) : null}
      </div>
    );
  }

  if (currentStep === 3) {
    const backgrounds = [
      { text: 'Creator', icon: <Sparkles className="w-5 h-5" /> },
      { text: 'Professional', icon: <Briefcase className="w-5 h-5" /> },
      { text: 'Student', icon: <GraduationCap className="w-5 h-5" /> },
      { text: 'Other', icon: <User className="w-5 h-5" /> }
    ];

    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-surface-muted to-background flex flex-col items-center justify-center px-6 relative overflow-hidden">
        {/* Floating orbs */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-ai-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-ai-glow/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        
        <div className="relative z-10 w-full max-w-lg space-y-8 animate-fade-in">
          <h2 className="text-4xl font-bold text-ai-primary text-center">
            Who are you?
          </h2>
          
          <div className="space-y-4">
            {backgrounds.map((background) => (
              <GlowingCard
                key={background.text}
                text={background.text}
                icon={background.icon}
                isSelected={selectedBackground === background.text}
                onClick={() => setSelectedBackground(background.text)}
              />
            ))}
          </div>

          {selectedBackground === 'Other' && (
            <div className="animate-scale-in">
              <Input
                placeholder="Tell us more..."
                value={customBackground}
                onChange={(e) => setCustomBackground(e.target.value)}
                className="w-full bg-glass-bg backdrop-blur-sm border-glass-border focus:border-ai-primary focus:shadow-glow transition-all"
              />
            </div>
          )}
        </div>
        
        {(selectedBackground && selectedBackground !== 'Other') || (selectedBackground === 'Other' && customBackground) ? (
          <ArrowButton onClick={nextStep} />
        ) : null}
      </div>
    );
  }

  if (currentStep === 4) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 relative">
        <div className="text-center space-y-12 max-w-lg animate-fade-in">
          {/* AI Flow Animation */}
          <div className="relative w-80 h-48 bg-glass-bg border border-glass-border rounded-2xl flex items-center justify-center mx-auto backdrop-blur-lg shadow-elegant">
            <div className="flex items-center justify-center space-x-8">
              <div className="flex flex-col items-center space-y-2 animate-pulse">
                <div className="w-12 h-12 bg-ai-primary/20 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-ai-primary" />
                </div>
                <span className="text-xs text-text-muted">Messages</span>
              </div>
              
              <ArrowRight className="w-6 h-6 text-ai-primary animate-pulse" style={{ animationDelay: '0.5s' }} />
              
              <div className="flex flex-col items-center space-y-2 animate-pulse" style={{ animationDelay: '1s' }}>
                <div className="w-12 h-12 bg-ai-glow/20 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-ai-glow" />
                </div>
                <span className="text-xs text-text-muted">AI Filter</span>
              </div>
              
              <ArrowRight className="w-6 h-6 text-ai-primary animate-pulse" style={{ animationDelay: '1.5s' }} />
              
              <div className="flex flex-col items-center space-y-2 animate-pulse" style={{ animationDelay: '2s' }}>
                <div className="w-12 h-12 bg-gradient-to-br from-ai-primary to-ai-glow rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">⚡</span>
                </div>
                <span className="text-xs text-text-muted">Priority</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-text-primary">
              Smarter Inbox. Your Rules.
            </h2>
            <p className="text-lg text-text-secondary max-w-md mx-auto">
              AI highlights what matters, the rest stays organized.
            </p>
          </div>
          
          <Button 
            onClick={nextStep}
            className="w-full bg-gradient-to-r from-ai-primary to-ai-glow hover:from-ai-glow hover:to-ai-primary text-white py-6 text-xl rounded-xl transition-all duration-300 shadow-glow hover:shadow-elegant hover:scale-105 neon-glow"
          >
            Start Now
          </Button>
        </div>
      </div>
    );
  }

  return null;
};

export default OnboardingFlow;