import React from 'react';
import { Atom, Database } from 'lucide-react';

const SearchHistoryPanel = ({ searchHistory, onClickUrl }) => {
  if (searchHistory.length === 0) return null;

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
        <Database className="w-5 h-5" />
        Recent Analyses
      </h3>
      <div className="space-y-3">
        {searchHistory.map((search) => (
          <div
            key={search.id}
            className="flex items-center justify-between p-4 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 cursor-pointer transition-all duration-300 border border-white/10 hover:border-white/30 group"
            onClick={() => onClickUrl(search.url)}
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate group-hover:text-purple-200">
                {search.url}
              </p>
              <p className="text-xs text-purple-300">
                {search.timestamp.toLocaleString()} • {search.peptideCount} peptides found
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Atom className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-bold text-purple-300">{search.peptideCount}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchHistoryPanel;
