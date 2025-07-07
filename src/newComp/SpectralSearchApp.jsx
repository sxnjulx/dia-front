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
    "pca_plot_data": {
        "neighbors": {
            "x": [
                0.0077086822129786015,
                0.007681503426283598,
                0.00774935819208622,
                0.007746020797640085,
                0.007705117575824261,
                0.0077195363119244576,
                0.007667007856070995,
                0.007720880676060915,
                0.007676231674849987,
                0.007729255594313145
            ],
            "y": [
                -0.0022758215200155973,
                -0.002277480671182275,
                -0.002255193656310439,
                -0.0022824350744485855,
                -0.0022493612486869097,
                -0.002277734223753214,
                -0.0022645192220807076,
                -0.0022573042660951614,
                -0.0022737537510693073,
                -0.0022995455656200647
            ]
        },
        "query": {
            "x": 0.007706127595156431,
            "y": -0.002272500190883875
        }
    },
    "results": [
        {
            "distance": 1.0,
            "id": "2320164003",
            "metadata(USI)": "mzspec:Project_ID:0.mgf:index:6"
        },
        {
            "distance": 0.9999999403953552,
            "id": "1907645907",
            "metadata(USI)": "mzspec:Project_ID:9.mgf:index:20"
        },
        {
            "distance": 0.9999999403953552,
            "id": "3504276988",
            "metadata(USI)": "mzspec:Project_ID:4.mgf:index:3915"
        },
        {
            "distance": 0.9999999403953552,
            "id": "2295258494",
            "metadata(USI)": "mzspec:Project_ID:7.mgf:index:30607"
        },
        {
            "distance": 0.9999999403953552,
            "id": "822742232",
            "metadata(USI)": "mzspec:Project_ID:8.mgf:index:3969"
        },
        {
            "distance": 0.9999999403953552,
            "id": "3442172327",
            "metadata(USI)": "mzspec:Project_ID:1.mgf:index:30750"
        },
        {
            "distance": 0.9999999403953552,
            "id": "3059946909",
            "metadata(USI)": "mzspec:Project_ID:4.mgf:index:17418"
        },
        {
            "distance": 0.9999999403953552,
            "id": "1530567546",
            "metadata(USI)": "mzspec:Project_ID:2.mgf:index:3989"
        },
        {
            "distance": 0.9999999403953552,
            "id": "3261923045",
            "metadata(USI)": "mzspec:Project_ID:8.mgf:index:17512"
        },
        {
            "distance": 0.9999999403953552,
            "id": "2740824660",
            "metadata(USI)": "mzspec:Project_ID:5.mgf:index:31122"
        }
    ],
    "status": "success"
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

  // const handleSearchNearest = async (peptide) => {
  //   setIsSearching(true);
  //   // Simulate API call
  //   await new Promise(resolve => setTimeout(resolve, 2000));
  //   setSearchResults(transformResponse(mockSearchResults));
  //   setActivePeptideIndex(selectedIndex);
  //   setIsSearching(false);
  //   setIsModalOpen(false);
  // };

  function transformResponse(data) {
    const xArray = data.pca_plot_data.neighbors.x;
    const yArray = data.pca_plot_data.neighbors.y;
    data.results = data.results.map((item, index) => ({
      id: item.id,
      neighborsID: index + 1, // Assuming neighbors start from 1
      metadata: item["metadata(USI)"],
      distance: item.distance,
      x: xArray[index],
      y: yArray[index]
    })); 
    console.log("Transformed results:", data);

    return data
  }


  const handleSearchNearest = async (peptide) => {
  setIsSearching(true);

  try {
    const response = await fetch('http://localhost:5000/query_index', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        vector: peptide.vector,
        k: peptide.k,
        use_gpu: peptide.use_gpu
      })
    });

    if (!response.ok) {
      throw new Error('Failed to search nearest peptides');
    }

    const data = await response.json();
    setSearchResults(transformResponse(data)); // backend should return `{ results: [...] }`
    setActivePeptideIndex(selectedIndex); // make sure selectedIndex is in scope
    setIsModalOpen(false);
  } catch (error) {
    console.error('Search error:', error);
    // Optionally show a toast or UI message
  } finally {
    setIsSearching(false);
  }
};

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
              {searchResults?.results?.length > 0 && (
                <>
                  <PeptideResultsList
                    results={searchResults.results}
                    sourcePeptideIndex={activePeptideIndex}
                  />
                  <PeptideResultsPlot
                    results={searchResults.pca_plot_data}
                    sourcePeptideIndex={activePeptideIndex}
                  />
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
