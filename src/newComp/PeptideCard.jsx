import { Eye, Zap } from "lucide-react";

// Peptide Card Component
const PeptideCard = ({ peptide, index, onClick, isActive }) => {
  const preview = peptide.vector.slice(0, 3);
  
  return (
    <div 
      onClick={() => onClick(peptide, index)}
      className={`border rounded-lg p-4 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
        isActive 
          ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-500 border-2 shadow-lg ring-2 ring-blue-200' 
          : 'bg-white border-gray-200 hover:shadow-lg hover:border-blue-400'
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className={`font-bold text-lg ${isActive ? 'text-blue-700' : 'text-gray-800'}`}>
          Possible Peptide {index + 1}
          {isActive && <span className="ml-2 text-xs bg-blue-500 text-white px-2 py-1 rounded-full">ACTIVE</span>}
        </h3>
        <Eye className={`w-5 h-5 ${isActive ? 'text-blue-500' : 'text-gray-500'}`} />
      </div>
      <div className="text-sm text-gray-600 mb-2">
        <span className="font-medium">Preview:</span> {preview.map(val => val.toFixed(10)).join(', ')}...
      </div>
      <div className="flex items-center text-xs text-gray-500">
        <Zap className="w-4 h-4 mr-1" />
        <span>K: {peptide.k} | GPU: {peptide.use_gpu ? '✓' : '✗'}</span>
      </div>
    </div>
  );
};
export default PeptideCard;