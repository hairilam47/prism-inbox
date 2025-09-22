import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
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
      className="fixed bottom-8 right-8 w-14 h-14 bg-surface rounded-full flex items-center justify-center shadow-glass transition-smooth hover:scale-105 neon-glow"
    >
      <ArrowRight className="w-6 h-6 text-ai-primary" />
    </button>
  );

  const SelectableCard = ({ 
    text, 
    isSelected, 
    onClick 
  }: { 
    text: string; 
    isSelected: boolean; 
    onClick: () => void; 
  }) => (
    <button
      onClick={onClick}
      className={`w-full p-4 rounded-lg border-2 transition-smooth text-left ${
        isSelected 
          ? 'border-ai-primary bg-ai-primary/10 text-ai-primary' 
          : 'border-glass-border bg-surface hover:border-ai-primary/50'
      }`}
    >
      {text}
    </button>
  );

  if (currentStep === 1) {
    return (
      <div className="min-h-screen bg-ai-primary flex flex-col items-center justify-center px-6 relative">
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            One Inbox.<br />
            Your Priorities,<br />
            Your Control.
          </h1>
          <p className="text-lg text-white/80 max-w-md">
            Unify Telegram, Gmail, Slack & more — only see what matters.
          </p>
        </div>
        <ArrowButton onClick={nextStep} />
      </div>
    );
  }

  if (currentStep === 2) {
    const reasons = [
      'Too many messages',
      'Content creator',
      'Work productivity',
      'Other'
    ];

    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 relative">
        <div className="w-full max-w-md space-y-8">
          <h2 className="text-3xl font-bold text-ai-primary text-center">
            What brings you here?
          </h2>
          
          <div className="space-y-4">
            {reasons.map((reason) => (
              <SelectableCard
                key={reason}
                text={reason}
                isSelected={selectedReason === reason}
                onClick={() => setSelectedReason(reason)}
              />
            ))}
          </div>

          {selectedReason === 'Other' && (
            <Input
              placeholder="Tell us more..."
              value={customReason}
              onChange={(e) => setCustomReason(e.target.value)}
              className="w-full"
            />
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
      'Creator',
      'Professional',
      'Student',
      'Other'
    ];

    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 relative">
        <div className="w-full max-w-md space-y-8">
          <h2 className="text-3xl font-bold text-ai-primary text-center">
            Tell us about yourself
          </h2>
          
          <div className="space-y-4">
            {backgrounds.map((background) => (
              <SelectableCard
                key={background}
                text={background}
                isSelected={selectedBackground === background}
                onClick={() => setSelectedBackground(background)}
              />
            ))}
          </div>

          {selectedBackground === 'Other' && (
            <Input
              placeholder="Tell us more..."
              value={customBackground}
              onChange={(e) => setCustomBackground(e.target.value)}
              className="w-full"
            />
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
      <div className="min-h-screen bg-surface-muted flex flex-col items-center justify-center px-6 relative">
        <div className="text-center space-y-8 max-w-md">
          {/* Placeholder for animation - you can replace with actual GIF/Lottie */}
          <div className="w-64 h-40 bg-glass-bg border border-glass-border rounded-xl flex items-center justify-center mx-auto animate-glow-pulse">
            <div className="text-center space-y-2">
              <div className="text-sm text-text-muted">📧 → 🔍 → ⚡</div>
              <div className="text-xs text-text-secondary">Messages → Filter → Priority</div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-text-primary">
              We filter your inbox.
            </h2>
            <p className="text-text-secondary">
              You control the rules.
            </p>
          </div>
          
          <Button 
            onClick={nextStep}
            className="w-full bg-ai-primary hover:bg-ai-glow text-white py-4 text-lg rounded-xl transition-smooth"
          >
            Start
          </Button>
        </div>
      </div>
    );
  }

  return null;
};

export default OnboardingFlow;