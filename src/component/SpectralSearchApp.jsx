import React, { useState } from 'react';
import Header from './Header';
import SearchForm from './SearchForm';
import ResultsPanel from './ResultsPanel';
import SearchHistoryPanel from './SearchHistoryPanel';
import BackgroundEffects from './BackgroundEffects';
import VectorSearchPanel from './VectorSearchPanel';

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
      const response = await fetch('/api/analyze-spectrum', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hdfUrl: hdfUrl.trim() }),
      });

      if (!response.ok) throw new Error(`Server error: ${response.status}`);

      const data = await response.json();
      setPeptideData(data);

      setSearchHistory(prev => [
        { id: Date.now(), url: hdfUrl, timestamp: new Date(), peptideCount: data.peptides?.length || 0 },
        ...prev.slice(0, 4)
      ]);
    } catch (err) {
      setError(`Failed to analyze spectrum: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 relative">
      <BackgroundEffects />
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
        <Header />
        <SearchForm hdfUrl={hdfUrl} setHdfUrl={setHdfUrl} handleSubmit={handleSubmit} isLoading={isLoading} />
        <ResultsPanel error={error} peptideData={peptideData} />
        <SearchHistoryPanel searchHistory={searchHistory} onClickUrl={setHdfUrl} />
      </div>
      <VectorSearchPanel />
    </div>
  );
};

export default SpectralSearchApp;
