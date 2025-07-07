// File: components/SearchForm.jsx
import React from 'react';
import { Search, FileText, Loader2, Atom } from 'lucide-react';

const SearchForm = ({ hdfUrl, setHdfUrl, isLoading, handleSubmit }) => (
  <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 mb-8">
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-bold text-white mb-3 uppercase tracking-wide">
          HDF5 Spectrum File URL
        </label>
        <div className="relative">
          <input
            type="url"
            value={hdfUrl}
            onChange={(e) => setHdfUrl(e.target.value)}
            placeholder="https://example.com/spectrum-data.hdf5"
            className="w-full px-6 py-4 pl-14 bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-2xl focus:ring-4 focus:ring-purple-500/50 focus:border-purple-400 text-white placeholder-white/60 font-medium transition-all duration-300"
            disabled={isLoading}
          />
          <FileText className="absolute left-4 top-4.5 h-6 w-6 text-white/70" />
          <div className="absolute right-4 top-4.5">
            <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={isLoading || !hdfUrl.trim()}
        className="w-full bg-gradient-to-r from-purple-600 via-purple-700 to-blue-700 hover:from-purple-700 hover:via-purple-800 hover:to-blue-800 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 shadow-2xl hover:shadow-purple-500/25 hover:scale-105 transform"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-6 w-6 animate-spin" />
            <span className="text-lg">Analyzing Spectrum...</span>
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-200"></div>
            </div>
          </>
        ) : (
          <>
            <Search className="h-6 w-6" />
            <span className="text-lg">Discover Peptides</span>
            <Atom className="h-6 w-6" />
          </>
        )}
      </button>
    </div>
  </div>
);

export default SearchForm;