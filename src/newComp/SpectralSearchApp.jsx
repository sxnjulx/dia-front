import React, { useState } from 'react';
import FeatureVectorLoader from './FeatureVectorLoader';
import PeptideModal from './PeptideModal ';
import PeptideCard from './PeptideCard';
import PeptideResultsList from './PeptideResultsList';
import PeptideResultsPlot from './PeptideResultsPlot';

// Mock data for demonstration
const mockFeatureVectors = {
  peptidefeatureVector: [
    {
      vector: [0.245, 0.867, 0.123, 0.456, 0.789, 0.321, 0.654, 0.987, 0.147, 0.258, 0.369, 0.741, 0.852, 0.963, 0.159, 0.357, 0.456, 0.789, 0.123, 0.456, 0.789, 0.321, 0.654, 0.987, 0.147, 0.258, 0.369, 0.741, 0.852, 0.963, 0.159, 0.357],
      k: 16,
      use_gpu: true
    },
    {
      vector: [0.123, 0.456, 0.789, 0.321, 0.654, 0.987, 0.147, 0.258, 0.369, 0.741, 0.852, 0.963, 0.159, 0.357, 0.456, 0.789, 0.245, 0.867, 0.123, 0.456, 0.789, 0.321, 0.654, 0.987, 0.147, 0.258, 0.369, 0.741, 0.852, 0.963, 0.159, 0.357],
      k: 16,
      use_gpu: true
    },
    {
      vector: [0.789, 0.321, 0.654, 0.987, 0.147, 0.258, 0.369, 0.741, 0.852, 0.963, 0.159, 0.357, 0.456, 0.789, 0.245, 0.867, 0.123, 0.456, 0.789, 0.321, 0.654, 0.987, 0.147, 0.258, 0.369, 0.741, 0.852, 0.963, 0.159, 0.357, 0.456, 0.789],
      k: 16,
      use_gpu: true
    }
  ]
};

const mockSearchResults = {
  status: "success",
  results: [
    { id: "2320164003", metadata: "mzspec:Project_ID:0.mgf:index:6", distance: 0.8742, x: 0.123, y: 0.456 },
    { id: "2320164004", metadata: "mzspec:Project_ID:1.mgf:index:12", distance: 0.7623, x: 0.789, y: 0.321 },
    { id: "2320164005", metadata: "mzspec:Project_ID:2.mgf:index:18", distance: 0.6891, x: 0.456, y: 0.789 },
    { id: "2320164006", metadata: "mzspec:Project_ID:3.mgf:index:24", distance: 0.5234, x: 0.654, y: 0.147 },
    { id: "2320164007", metadata: "mzspec:Project_ID:4.mgf:index:30", distance: 0.4567, x: 0.258, y: 0.963 }
  ]
};


const SpectralSearchApp = () => {
  const [featureVectors, setFeatureVectors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPeptide, setSelectedPeptide] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);  
  const [activePeptideIndex, setActivePeptideIndex] = useState(null); // Track which peptide generated results


  const handleLoadFeatureVectors = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setFeatureVectors(mockFeatureVectors.peptidefeatureVector);
    setIsLoading(false);
  };

//   const handleLoadFeatureVectors = async () => {
//   setIsLoading(true);
//   try {
//     const response = await fetch('http://localhost:5000/get_extracted_feature_vectors', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({}) // Add any body content if needed
//     });

//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }

//     const data = await response.json();
//     setFeatureVectors(data.peptidefeatureVector);
//   } catch (error) {
//     console.error('Error fetching feature vectors:', error);
//     // Optionally show error to user
//   } finally {
//     setIsLoading(false);
//   }
// };


  const handleCardClick = (peptide, index) => {
    setSelectedPeptide(peptide);
    setSelectedIndex(index);
    setIsModalOpen(true);
  };

  const handleSearchNearest = async (peptide) => {
    setIsSearching(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setSearchResults(mockSearchResults.results);
    setActivePeptideIndex(selectedIndex);
    setIsSearching(false);
    setIsModalOpen(false);
  };

//   const handleSearchNearest = async (peptide) => {
//   setIsSearching(true);

//   try {
//     const response = await fetch('http://localhost:5000/query_index', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         vector: peptide.vector,
//         k: peptide.k,
//         use_gpu: peptide.use_gpu
//       })
//     });

//     if (!response.ok) {
//       throw new Error('Failed to search nearest peptides');
//     }

//     const data = await response.json();
//     setSearchResults(data.results); // backend should return `{ results: [...] }`
//     setActivePeptideIndex(selectedIndex); // make sure selectedIndex is in scope
//     setIsModalOpen(false);
//   } catch (error) {
//     console.error('Search error:', error);
//     // Optionally show a toast or UI message
//   } finally {
//     setIsSearching(false);
//   }
// };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Feature Vector Analysis</h1>
          <p className="text-gray-600 text-lg">Interactive peptide feature vector exploration and nearest neighbor search</p>
        </div>

        {featureVectors.length === 0 ? (
          <FeatureVectorLoader onLoad={handleLoadFeatureVectors} isLoading={isLoading} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Feature Vectors */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Feature Vectors</h2>
              <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                {featureVectors.map((peptide, index) => (
                  <PeptideCard
                    key={index}
                    peptide={peptide}
                    index={index}
                    onClick={handleCardClick}
                    isActive={activePeptideIndex === index}
                  />
                ))}
              </div>
            </div>

            {/* Right Column - Results */}
            <div className="space-y-8">
              {searchResults.length > 0 && (
                <>
                  <PeptideResultsList results={searchResults} sourcePeptideIndex={activePeptideIndex} />
                  <PeptideResultsPlot results={searchResults} sourcePeptideIndex={activePeptideIndex} />
                </>
              )}
            </div>
          </div>
        )}

        {/* Modal */}
        <PeptideModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          peptide={selectedPeptide}
          peptideIndex={selectedIndex}
          onSearchNearest={handleSearchNearest}
          isSearching={isSearching}
        />
      </div>
    </div>
  );
};

export default SpectralSearchApp;
