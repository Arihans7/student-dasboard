import { 
  LayoutDashboard, 
  CalendarDays, 
  BookOpen, 
  BrainCircuit, 
  Lightbulb, 
  LineChart,
  ListTodo
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'planner', label: 'Smart Planner', icon: CalendarDays },
    { id: 'tasks', label: 'Task Generator', icon: ListTodo },
    { id: 'journal', label: 'AI Journal', icon: BookOpen },
    { id: 'memory', label: 'Memory Assistant', icon: BrainCircuit },
    { id: 'ideas', label: 'Idea Generator', icon: Lightbulb },
    { id: 'insights', label: 'Insights', icon: LineChart },
  ];

  return (
    <aside className="w-64 bg-white border-r border-zinc-200 flex flex-col h-full">
      <div className="p-6 border-b border-zinc-200">
        <h1 className="text-xl font-semibold tracking-tight text-zinc-900 flex items-center gap-2">
          <BrainCircuit className="w-6 h-6 text-indigo-600" />
          AI Life Dashboard
        </h1>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive 
                  ? 'bg-indigo-50 text-indigo-700' 
                  : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-indigo-600' : 'text-zinc-400'}`} />
              {tab.label}
            </button>
          );
        })}
      </nav>
      <div className="p-4 border-t border-zinc-200">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-semibold">
            U
          </div>
          <div className="text-sm font-medium text-zinc-900">User Profile</div>
        </div>
      </div>
    </aside>
  );
}
