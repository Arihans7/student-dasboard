import { useState } from 'react';
import { generateProductivityInsights } from '../services/geminiService';
import { Card, PageHeader } from '../components/ui';
import { Loader2, LineChart } from 'lucide-react';
import Markdown from 'react-markdown';

export function Insights() {
  const [log, setLog] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!log) return;
    setLoading(true);
    try {
      const insights = await generateProductivityInsights(log);
      setResult(insights);
    } catch (error) {
      console.error(error);
      setResult('Failed to generate insights. Please check your API key and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Productivity Insights" 
        description="Analyze your activity data to find patterns and areas for improvement."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">Activity Log</label>
            <textarea 
              value={log}
              onChange={(e) => setLog(e.target.value)}
              placeholder="Paste your daily activity log here... (e.g. 9am-11am coding, 11am-12pm meeting, 1pm-3pm reading)"
              className="w-full p-4 rounded-xl border border-zinc-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none h-64"
            />
          </div>
          <button
            onClick={handleGenerate}
            disabled={loading || !log}
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <LineChart className="w-5 h-5" />}
            Analyze Productivity
          </button>
        </Card>

        <Card className="p-6 bg-zinc-50/50">
          {result ? (
            <div className="prose prose-zinc max-w-none">
              <Markdown>{result}</Markdown>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-zinc-400 space-y-4 min-h-[300px]">
              <LineChart className="w-12 h-12 opacity-20" />
              <p>Your productivity insights will appear here.</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
