import React, { useState } from 'react';
import { Search, Loader2, Atom, AlertCircle, CheckCircle } from 'lucide-react';

const VectorSearchPanel = () => {
  const [vectorInput, setVectorInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    let parsedVector;
    try {
      parsedVector = JSON.parse(vectorInput);
      if (!Array.isArray(parsedVector.vector)) throw new Error('Invalid vector format');
    } catch (err) {
      setError('Invalid JSON input');
      return;
    }

    setIsLoading(true);
    setError('');
    setResults([]);

    try {
      const response = await fetch('/api/query-vector', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsedVector),
      });

      if (!response.ok) throw new Error(`Server error: ${response.status}`);

      const data = await response.json();
      if (data.status !== 'success') throw new Error('Query failed');

      setResults(data.results);
    } catch (err) {
      setError(`Vector search failed: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 mb-12">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        <Atom className="w-6 h-6 text-purple-300" />
        Query Vector Similarity Search
      </h2>

      <textarea
        rows={6}
        value={vectorInput}
        onChange={(e) => setVectorInput(e.target.value)}
        placeholder='Paste vector JSON here'
        className="w-full px-4 py-3 bg-white/20 text-white placeholder-white/60 border border-white/30 rounded-xl mb-4 font-mono"
        disabled={isLoading}
      />

      <button
        onClick={handleSearch}
        disabled={isLoading || !vectorInput.trim()}
        className="w-full bg-gradient-to-r from-purple-600 via-purple-700 to-blue-700 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-3 hover:scale-105 transition-all"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Searching...
          </>
        ) : (
          <>
            <Search className="w-5 h-5" />
            Search Nearest Peptides
          </>
        )}
      </button>

      {error && (
        <div className="mt-6 flex items-center gap-4 bg-red-500/20 border border-red-400 p-4 rounded-xl">
          <AlertCircle className="text-red-300 w-6 h-6" />
          <span className="text-red-200">{error}</span>
        </div>
      )}

      {results.length > 0 && (
        <div className="mt-8">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="w-6 h-6 text-emerald-400" />
            <h3 className="text-white text-xl font-bold">Top Similar Peptides</h3>
          </div>
          <ul className="space-y-4">
            {results.map((res, idx) => (
              <li
                key={res.id}
                className="bg-white/10 border border-white/20 rounded-xl p-4 backdrop-blur-sm text-white"
              >
                <div className="flex justify-between items-center">
                  <span className="font-mono text-sm text-purple-200">#{idx + 1} ID: {res.id}</span>
                  <span className="text-sm text-purple-300">Distance: {res.distance.toFixed(4)}</span>
                </div>
                <p className="text-sm mt-1 text-white/80">{res.metadata}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default VectorSearchPanel;
