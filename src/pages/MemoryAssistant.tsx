import { useState } from 'react';
import { extractMemoryInfo, searchKnowledge } from '../services/geminiService';
import { Card, PageHeader } from '../components/ui';
import { Loader2, BrainCircuit, Search, Database } from 'lucide-react';
import Markdown from 'react-markdown';

export function MemoryAssistant() {
  const [text, setText] = useState('');
  const [extractedData, setExtractedData] = useState('');
  const [loadingExtract, setLoadingExtract] = useState(false);

  const [notes, setNotes] = useState('');
  const [question, setQuestion] = useState('');
  const [searchResult, setSearchResult] = useState('');
  const [loadingSearch, setLoadingSearch] = useState(false);

  const handleExtract = async () => {
    if (!text) return;
    setLoadingExtract(true);
    try {
      const data = await extractMemoryInfo(text);
      setExtractedData(data);
    } catch (error) {
      console.error(error);
      setExtractedData('Failed to extract data. Please check your API key and try again.');
    } finally {
      setLoadingExtract(false);
    }
  };

  const handleSearch = async () => {
    if (!notes || !question) return;
    setLoadingSearch(true);
    try {
      const result = await searchKnowledge(notes, question);
      setSearchResult(result);
    } catch (error) {
      console.error(error);
      setSearchResult('Failed to search knowledge. Please check your API key and try again.');
    } finally {
      setLoadingSearch(false);
    }
  };

  return (
    <div className="space-y-12">
      <PageHeader 
        title="Memory & Knowledge Assistant" 
        description="Extract important information from text and search through your saved notes."
      />

      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-zinc-900 flex items-center gap-2">
          <Database className="w-5 h-5 text-indigo-600" />
          Extract Information
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Raw Text</label>
              <textarea 
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste your meeting notes, emails, or thoughts here..."
                className="w-full p-3 rounded-xl border border-zinc-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none h-32"
              />
            </div>
            <button
              onClick={handleExtract}
              disabled={loadingExtract || !text}
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loadingExtract ? <Loader2 className="w-5 h-5 animate-spin" /> : <BrainCircuit className="w-5 h-5" />}
              Extract Data
            </button>
          </Card>

          <Card className="p-6 bg-zinc-50/50">
            {extractedData ? (
              <div className="prose prose-zinc max-w-none">
                <pre className="bg-zinc-900 text-zinc-100 p-4 rounded-xl overflow-x-auto text-sm">
                  <code>{extractedData}</code>
                </pre>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-zinc-400 space-y-4 min-h-[200px]">
                <BrainCircuit className="w-12 h-12 opacity-20" />
                <p>Extracted JSON data will appear here.</p>
              </div>
            )}
          </Card>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-zinc-900 flex items-center gap-2">
          <Search className="w-5 h-5 text-indigo-600" />
          Knowledge Search
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Stored Notes</label>
              <textarea 
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Paste your stored notes here to search against..."
                className="w-full p-3 rounded-xl border border-zinc-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none h-32"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Question</label>
              <input 
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="What do you want to know?"
                className="w-full p-3 rounded-xl border border-zinc-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={loadingSearch || !notes || !question}
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loadingSearch ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
              Search Notes
            </button>
          </Card>

          <Card className="p-6 bg-zinc-50/50">
            {searchResult ? (
              <div className="prose prose-zinc max-w-none">
                <Markdown>{searchResult}</Markdown>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-zinc-400 space-y-4 min-h-[200px]">
                <Search className="w-12 h-12 opacity-20" />
                <p>Search results will appear here.</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
