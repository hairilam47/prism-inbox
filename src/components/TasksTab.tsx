import { useState } from "react";
import { CheckCircle, Circle, ExternalLink, MessageCircle, Send, Camera, Mail, Hash } from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string;
  platform: string;
  contact: string;
  messageId: string;
  completed: boolean;
  priority: 'urgent' | 'soon' | 'later';
  dueDate?: string;
  createdAt: string;
}

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Review contract terms",
    description: "Check the payment schedule and delivery dates in the new client contract",
    platform: "gmail",
    contact: "legal@company.com",
    messageId: "msg_123",
    completed: false,
    priority: 'urgent',
    dueDate: "Today",
    createdAt: "2 hours ago"
  },
  {
    id: "2", 
    title: "Schedule team meeting",
    description: "Set up weekly sync meeting with the design team for next week",
    platform: "slack",
    contact: "Design Team",
    messageId: "msg_456",
    completed: false,
    priority: 'soon',
    dueDate: "Tomorrow",
    createdAt: "5 hours ago"
  },
  {
    id: "3",
    title: "Send birthday wishes",
    description: "Remember to congratulate Sarah on her birthday this weekend",
    platform: "whatsapp",
    contact: "Sarah Johnson", 
    messageId: "msg_789",
    completed: true,
    priority: 'later',
    createdAt: "1 day ago"
  },
  {
    id: "4",
    title: "Book restaurant reservation",
    description: "Make dinner reservation for Saturday at the Italian place downtown",
    platform: "telegram",
    contact: "Partner",
    messageId: "msg_101",
    completed: false,
    priority: 'later',
    dueDate: "This week",
    createdAt: "1 day ago"
  },
  {
    id: "5",
    title: "Update project timeline",
    description: "Revise the project milestones based on client feedback and team capacity",
    platform: "gmail",
    contact: "project-team@company.com",
    messageId: "msg_112",
    completed: false,
    priority: 'soon',
    dueDate: "Friday",
    createdAt: "2 days ago"
  }
];

const platformIcons = {
  whatsapp: MessageCircle,
  telegram: Send,
  instagram: Camera,
  gmail: Mail,
  slack: Hash
};

const priorityColors = {
  urgent: 'priority-urgent',
  soon: 'priority-soon', 
  later: 'priority-later'
};

export const TasksTab = () => {
  const [tasks, setTasks] = useState(mockTasks);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  const toggleTask = (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed }
        : task
    ));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'pending') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const pendingCount = tasks.filter(t => !t.completed).length;
  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div className="pt-safe-top pb-bottom-nav">
      {/* Header */}
      <div className="px-container-padding py-6">
        <h1 className="text-heading font-light text-text-primary mb-2">AI Tasks</h1>
        <p className="text-caption text-text-secondary">
          {pendingCount} pending • {completedCount} completed
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="px-container-padding mb-6">
        <div className="flex space-x-1 bg-surface-muted rounded-lg p-1">
          {[
            { id: 'all', label: 'All', count: tasks.length },
            { id: 'pending', label: 'Pending', count: pendingCount },
            { id: 'completed', label: 'Done', count: completedCount }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`
                flex-1 py-2 px-3 rounded-md text-caption font-medium transition-smooth
                ${filter === tab.id 
                  ? 'bg-surface text-text-primary shadow-sm' 
                  : 'text-text-muted hover:text-text-primary'
                }
              `}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-3 pb-6">
        {filteredTasks.map((task) => {
          const PlatformIcon = platformIcons[task.platform as keyof typeof platformIcons];
          
          return (
            <div key={task.id} className="mx-container-padding">
              <div className={`
                glass-card rounded-xl p-4 transition-all duration-200
                ${task.completed ? 'opacity-60' : 'animate-card-hover'}
              `}>
                <div className="flex items-start space-x-3">
                  {/* Checkbox */}
                  <button
                    onClick={() => toggleTask(task.id)}
                    className="mt-1 touch-manipulation"
                  >
                    {task.completed ? (
                      <CheckCircle className="h-5 w-5 text-priority-later" />
                    ) : (
                      <Circle className="h-5 w-5 text-text-muted hover:text-ai-primary transition-smooth" />
                    )}
                  </button>
                  
                  {/* Task Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className={`
                        text-body font-medium
                        ${task.completed 
                          ? 'text-text-muted line-through' 
                          : 'text-text-primary'
                        }
                      `}>
                        {task.title}
                      </h3>
                      
                      {/* Priority & Due Date */}
                      <div className="flex items-center space-x-2 ml-2">
                        {task.dueDate && !task.completed && (
                          <span className="text-micro text-text-muted">
                            {task.dueDate}
                          </span>
                        )}
                        <div className={`w-2 h-2 rounded-full bg-${priorityColors[task.priority]}`} />
                      </div>
                    </div>
                    
                    <p className={`
                      text-caption leading-relaxed mb-3
                      ${task.completed ? 'text-text-muted' : 'text-text-secondary'}
                    `}>
                      {task.description}
                    </p>
                    
                    {/* Source Info */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <PlatformIcon className="h-3 w-3 text-text-muted" />
                        <span className="text-micro text-text-muted">
                          From {task.contact}
                        </span>
                        <span className="text-micro text-text-muted">•</span>
                        <span className="text-micro text-text-muted">
                          {task.createdAt}
                        </span>
                      </div>
                      
                      <button className="text-ai-primary hover:text-ai-glow transition-smooth touch-manipulation">
                        <ExternalLink className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredTasks.length === 0 && (
        <div className="px-container-padding py-12 text-center">
          <CheckCircle className="h-12 w-12 text-text-muted mx-auto mb-4" />
          <h3 className="text-subheading text-text-primary mb-2">
            {filter === 'completed' ? 'No completed tasks' : 'No pending tasks'}
          </h3>
          <p className="text-caption text-text-muted">
            {filter === 'completed' 
              ? 'Completed tasks will appear here'
              : 'AI will extract tasks from your messages automatically'
            }
          </p>
        </div>
      )}
    </div>
  );
};