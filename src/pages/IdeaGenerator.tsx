import { useState } from 'react';
import { generateIdeas } from '../services/geminiService';
import { Card, PageHeader } from '../components/ui';
import { Loader2, Lightbulb } from 'lucide-react';
import Markdown from 'react-markdown';

export function IdeaGenerator() {
  const [topic, setTopic] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!topic) return;
    setLoading(true);
    try {
      const ideas = await generateIdeas(topic);
      setResult(ideas);
    } catch (error) {
      console.error(error);
      setResult('Failed to generate ideas. Please check your API key and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="AI Idea Generator" 
        description="Generate innovative ideas based on any topic."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">Topic</label>
            <textarea 
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. A productivity app for students"
              className="w-full p-3 rounded-xl border border-zinc-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none h-32"
            />
          </div>
          <button
            onClick={handleGenerate}
            disabled={loading || !topic}
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Lightbulb className="w-5 h-5" />}
            Generate Ideas
          </button>
        </Card>

        <Card className="p-6 bg-zinc-50/50">
          {result ? (
            <div className="prose prose-zinc max-w-none">
              <Markdown>{result}</Markdown>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-zinc-400 space-y-4 min-h-[300px]">
              <Lightbulb className="w-12 h-12 opacity-20" />
              <p>Your innovative ideas will appear here.</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
