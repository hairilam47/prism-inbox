import { Brain, Zap, Clock, CheckCircle } from "lucide-react";

interface DigestData {
  newMessages: number;
  urgent: number;
  tasks: number;
  lowPriority: number;
}

const mockDigest: DigestData = {
  newMessages: 12,
  urgent: 3,
  tasks: 2,
  lowPriority: 7
};

export const AIDigestBox = () => {
  return (
    <div className="mx-container-padding mb-6">
      <div className="glass-card rounded-xl p-6 neon-glow">
        {/* AI Indicator */}
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 rounded-full bg-ai-primary flex items-center justify-center mr-3 animate-glow-pulse">
            <Brain className="h-4 w-4 text-white" />
          </div>
          <div>
            <p className="text-subheading font-medium text-text-primary">AI Summary</p>
            <p className="text-caption text-text-muted">Last updated: just now</p>
          </div>
        </div>

        {/* Digest Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center">
            <p className="text-display font-extralight text-text-primary">
              {mockDigest.newMessages}
            </p>
            <p className="text-caption text-text-secondary">new messages</p>
          </div>
          <div className="text-center">
            <p className="text-display font-extralight text-text-primary">
              {mockDigest.tasks}
            </p>
            <p className="text-caption text-text-secondary">tasks extracted</p>
          </div>
        </div>

        {/* Priority Breakdown */}
        <div className="flex justify-between items-center p-3 bg-surface-muted rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-priority-urgent animate-glow-pulse" />
            <span className="text-caption text-text-secondary">Urgent</span>
            <span className="text-body font-medium text-priority-urgent">
              {mockDigest.urgent}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-priority-soon" />
            <span className="text-caption text-text-secondary">Soon</span>
            <span className="text-body font-medium text-priority-soon">
              {mockDigest.tasks}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-priority-later" />
            <span className="text-caption text-text-secondary">Later</span>
            <span className="text-body font-medium text-priority-later">
              {mockDigest.lowPriority}
            </span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex space-x-2 mt-4">
          <button className="flex-1 bg-ai-primary text-white py-2 px-4 rounded-lg text-caption font-medium hover:bg-ai-glow transition-smooth touch-manipulation">
            Review All
          </button>
          <button className="flex-1 bg-surface border border-glass-border py-2 px-4 rounded-lg text-caption font-medium text-text-primary hover:bg-surface-muted transition-smooth touch-manipulation">
            Mark Read
          </button>
        </div>
      </div>
    </div>
  );
};