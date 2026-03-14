import { Card, PageHeader } from '../components/ui';
import { 
  CalendarDays, 
  BookOpen, 
  BrainCircuit, 
  Lightbulb, 
  LineChart,
  ListTodo,
  ArrowRight
} from 'lucide-react';

interface DashboardProps {
  setActiveTab: (tab: string) => void;
}

export function Dashboard({ setActiveTab }: DashboardProps) {
  const features = [
    {
      id: 'planner',
      title: 'Smart Planner',
      description: 'Create a clear daily schedule based on your goals and tasks.',
      icon: CalendarDays,
      color: 'text-blue-600',
      bg: 'bg-blue-100',
    },
    {
      id: 'tasks',
      title: 'Task Generator',
      description: 'Convert your high-level goals into actionable, step-by-step tasks.',
      icon: ListTodo,
      color: 'text-emerald-600',
      bg: 'bg-emerald-100',
    },
    {
      id: 'journal',
      title: 'AI Journal',
      description: 'Write your daily journal entry and get emotional intelligence insights.',
      icon: BookOpen,
      color: 'text-purple-600',
      bg: 'bg-purple-100',
    },
    {
      id: 'memory',
      title: 'Memory Assistant',
      description: 'Extract important information from text and search through your saved notes.',
      icon: BrainCircuit,
      color: 'text-rose-600',
      bg: 'bg-rose-100',
    },
    {
      id: 'ideas',
      title: 'Idea Generator',
      description: 'Generate innovative ideas based on any topic.',
      icon: Lightbulb,
      color: 'text-amber-600',
      bg: 'bg-amber-100',
    },
    {
      id: 'insights',
      title: 'Productivity Insights',
      description: 'Analyze your activity data to find patterns and areas for improvement.',
      icon: LineChart,
      color: 'text-cyan-600',
      bg: 'bg-cyan-100',
    },
  ];

  return (
    <div className="space-y-8">
      <PageHeader 
        title="Welcome to your AI Life Dashboard" 
        description="Your personal assistant for organizing tasks, goals, emotions, and productivity."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Card key={feature.id} className="p-6 hover:shadow-md transition-shadow cursor-pointer group" >
              <div onClick={() => setActiveTab(feature.id)}>
                <div className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-4`}>
                  <Icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 mb-2">{feature.title}</h3>
                <p className="text-zinc-600 text-sm mb-4 line-clamp-2">{feature.description}</p>
                <div className="flex items-center text-indigo-600 text-sm font-medium group-hover:translate-x-1 transition-transform">
                  Try it out <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
