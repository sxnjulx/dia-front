import { Search, X } from "lucide-react";

// Peptide Modal Component
const PeptideModal = ({ isOpen, onClose, peptide, peptideIndex, onSearchNearest, isSearching }) => {
  if (!isOpen || !peptide) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Possible Peptide {peptideIndex + 1}</h2>
          <button 
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">Complete Feature Vector (32 dimensions)</h3>
            <div className="grid grid-cols-4 gap-2 bg-gray-50 p-4 rounded-lg">
              {peptide.vector.map((value, index) => (
                <div key={index} className="bg-white p-2 rounded text-center text-sm font-mono border">
                  <span className="text-gray-500 text-xs">#{index + 1}</span>
                  <div className="font-semibold text-gray-800">{value.toFixed(4)}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">Parameters</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-600 text-sm">K-value:</span>
                  <div className="font-semibold text-gray-800">{peptide.k}</div>
                </div>
                <div>
                  <span className="text-gray-600 text-sm">GPU Acceleration:</span>
                  <div className="font-semibold text-gray-800">{peptide.use_gpu ? 'Enabled' : 'Disabled'}</div>
                </div>
              </div>
            </div>
          </div>
          
          <button
            onClick={() => onSearchNearest(peptide)}
            disabled={isSearching}
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 disabled:opacity-50 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center"
          >
            {isSearching ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Searching...
              </div>
            ) : (
              <>
                <Search className="w-5 h-5 mr-2" />
                Search Nearest Peptides
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PeptideModal;