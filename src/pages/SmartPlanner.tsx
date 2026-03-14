import { useState } from 'react';
import { generateSmartPlan } from '../services/geminiService';
import { Card, PageHeader } from '../components/ui';
import { Loader2, CalendarDays } from 'lucide-react';
import Markdown from 'react-markdown';

export function SmartPlanner() {
  const [goals, setGoals] = useState('');
  const [tasks, setTasks] = useState('');
  const [hours, setHours] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!goals || !tasks || !hours) return;
    setLoading(true);
    try {
      const plan = await generateSmartPlan(goals, tasks, hours);
      setResult(plan);
    } catch (error) {
      console.error(error);
      setResult('Failed to generate plan. Please check your API key and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Smart Planner" 
        description="Create a clear daily schedule based on your goals and tasks."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">User Goals</label>
            <textarea 
              value={goals}
              onChange={(e) => setGoals(e.target.value)}
              placeholder="e.g. Prepare for Data Structures exam"
              className="w-full p-3 rounded-xl border border-zinc-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none h-24"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">Tasks</label>
            <textarea 
              value={tasks}
              onChange={(e) => setTasks(e.target.value)}
              placeholder="e.g. Linked Lists, Trees, Graphs, Sorting"
              className="w-full p-3 rounded-xl border border-zinc-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none h-24"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">Available Time</label>
            <input 
              type="text"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              placeholder="e.g. 6 hours"
              className="w-full p-3 rounded-xl border border-zinc-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            />
          </div>
          <button
            onClick={handleGenerate}
            disabled={loading || !goals || !tasks || !hours}
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <CalendarDays className="w-5 h-5" />}
            Generate Schedule
          </button>
        </Card>

        <Card className="p-6 bg-zinc-50/50">
          {result ? (
            <div className="prose prose-zinc max-w-none">
              <Markdown>{result}</Markdown>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-zinc-400 space-y-4 min-h-[300px]">
              <CalendarDays className="w-12 h-12 opacity-20" />
              <p>Your optimized schedule will appear here.</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
