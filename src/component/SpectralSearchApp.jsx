import React, { useState } from 'react';
import { Search, Upload, FileText, Loader2, AlertCircle, CheckCircle, Atom, Zap, Database } from 'lucide-react';


const SpectralSearchApp = () => {
  const [hdfUrl, setHdfUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [peptideData, setPeptideData] = useState(null);
  const [error, setError] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);

  const handleSubmit = async () => {
    if (!hdfUrl.trim()) {
      setError('Please provide a valid HDF file URL');
      return;
    }

    setIsLoading(true);
    setError('');
    setPeptideData(null);

    try {
      // Replace with your actual backend endpoint
      const response = await fetch('/api/analyze-spectrum', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ hdfUrl: hdfUrl.trim() }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      setPeptideData(data);
      
      // Add to search history
      setSearchHistory(prev => [{
        id: Date.now(),
        url: hdfUrl,
        timestamp: new Date(),
        peptideCount: data.peptides?.length || 0
      }, ...prev.slice(0, 4)]); // Keep last 5 searches

    } catch (err) {
      setError(`Failed to analyze spectrum: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" w-full min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Floating molecules decoration */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-4 h-4 bg-white/20 rounded-full animate-bounce`}
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 20}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i * 0.5}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl">
              <Database className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-5xl font-black bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
              ProteoSearch
            </h1>
          </div>
          <p className="text-purple-200 text-xl font-medium max-w-2xl mx-auto">
            Advanced proteomics analysis platform for MS spectrometer data identification and peptide discovery
          </p>
          <div className="mt-4 flex items-center justify-center gap-6 text-sm text-purple-300">
            <div className="flex items-center gap-2">
              <Atom className="w-4 h-4" />
              <span>Peptide Analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span>Real-time Processing</span>
            </div>
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4" />
              <span>HDF5 Compatible</span>
            </div>
          </div>
        </div>

        {/* Search Form */}
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

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/20 backdrop-blur-sm border-2 border-red-400/50 rounded-2xl p-6 mb-8 flex items-center gap-4">
            <div className="w-12 h-12 bg-red-500 rounded-2xl flex items-center justify-center">
              <AlertCircle className="h-6 w-6 text-white" />
            </div>
            <p className="text-red-100 text-lg font-medium">{error}</p>
          </div>
        )}

        {/* Results */}
        {peptideData && (
          <div className="mb-8">
            <div className="bg-emerald-500/20 backdrop-blur-sm border-2 border-emerald-400/50 rounded-2xl p-6 mb-8 flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-emerald-100 text-lg font-bold">
                  Analysis Complete!
                </p>
                <p className="text-emerald-200">
                  Successfully identified {peptideData.peptides?.length || 0} peptides from your sample
                </p>
              </div>
            </div>

            {peptideData.metadata && (
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6 mb-8">
                <h3 className="font-bold text-white text-xl mb-4 flex items-center gap-3">
                  <Database className="w-5 h-5" />
                  Sample Information
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Sample ID', value: peptideData.metadata.sampleId },
                    { label: 'Scan Count', value: peptideData.metadata.scanCount },
                    { label: 'Runtime', value: peptideData.metadata.runtime },
                    { label: 'Instrument', value: peptideData.metadata.instrument }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <div className="text-xs text-purple-300 uppercase tracking-wide font-bold mb-1">
                        {item.label}
                      </div>
                      <div className="text-lg font-bold text-white">
                        {item.value || 'N/A'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {peptideData.peptides && peptideData.peptides.length > 0 ? (
              <div>
                <h2 className="text-3xl font-black text-white mb-8 flex items-center gap-4">
                  <Atom className="w-8 h-8 text-purple-400" />
                  Identified Peptides
                  <span className="text-purple-400">({peptideData.peptides.length})</span>
                </h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
                  {peptideData.peptides.map((peptide, index) => (
                    <PeptideCard key={index} peptide={peptide} index={index} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-16">
                <Atom className="w-16 h-16 text-purple-400 mx-auto mb-4 opacity-50" />
                <p className="text-purple-200 text-xl">No peptides were identified in this sample.</p>
              </div>
            )}
          </div>
        )}

        {/* Search History */}
        {searchHistory.length > 0 && (
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
                  onClick={() => setHdfUrl(search.url)}
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
        )}
      </div>
    </div>
  );
};

export default SpectralSearchApp;