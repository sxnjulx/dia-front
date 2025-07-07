// Peptide Results List Component
const PeptideResultsList = ({ results }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-4">
        <h3 className="text-xl font-bold">Search Results</h3>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {results.map((result, index) => (
          <div key={result.id} className="border-b border-gray-200 p-4 hover:bg-gray-50 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-semibold text-gray-800">neighbour : {result.neighborsID}</h4>
                <h4 className="font-semibold text-gray-800">ID: {result.id}</h4>
                <p className="text-sm text-gray-600 mt-1">{result.metadata}</p>
              </div>
              <div className="text-right">
                <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-semibold">
                  Similarity: {result.distance.toFixed(17)}
                </div>
              </div>
            </div>
            <div className="text-xs text-gray-500">
              Position: ({result.x.toFixed(17)}, {result.y.toFixed(17)})
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default PeptideResultsList;