import { Database } from "lucide-react";

const FeatureVectorLoader = ({ onLoad, isLoading }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl border-2 border-dashed border-blue-300">
      <Database className="w-16 h-16 text-blue-500 mb-4" />
      <button
        onClick={onLoad}
        disabled={isLoading}
        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
      >
        {isLoading ? (
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Loading...
          </div>
        ) : (
          'Load Feature Vectors'
        )}
      </button>
    </div>
  );
};

export default FeatureVectorLoader;