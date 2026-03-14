import { useState } from 'react';
import { generateJournalReflection } from '../services/geminiService';
import { Card, PageHeader } from '../components/ui';
import { Loader2, BookOpen } from 'lucide-react';
import Markdown from 'react-markdown';

export function Journal() {
  const [entry, setEntry] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!entry) return;
    setLoading(true);
    try {
      const reflection = await generateJournalReflection(entry);
      setResult(reflection);
    } catch (error) {
      console.error(error);
      setResult('Failed to generate reflection. Please check your API key and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="AI Journal Reflection" 
        description="Write your daily journal entry and get emotional intelligence insights."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">Journal Entry</label>
            <textarea 
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
              placeholder="How was your day? What's on your mind?"
              className="w-full p-4 rounded-xl border border-zinc-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none h-64"
            />
          </div>
          <button
            onClick={handleGenerate}
            disabled={loading || !entry}
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <BookOpen className="w-5 h-5" />}
            Analyze Entry
          </button>
        </Card>

        <Card className="p-6 bg-zinc-50/50">
          {result ? (
            <div className="prose prose-zinc max-w-none">
              <Markdown>{result}</Markdown>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-zinc-400 space-y-4 min-h-[300px]">
              <BookOpen className="w-12 h-12 opacity-20" />
              <p>Your emotional insights will appear here.</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
