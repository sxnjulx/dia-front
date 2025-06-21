const PeptideCard = ({ peptide, index }) => {
  return (
    <div className="group relative overflow-hidden bg-gradient-to-br from-white via-purple-50 to-blue-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-purple-100 hover:border-purple-300">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full -translate-x-16 -translate-y-16 group-hover:scale-110 transition-transform duration-500"></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-blue-400 to-indigo-400 rounded-full translate-x-12 translate-y-12 group-hover:scale-110 transition-transform duration-500"></div>
      </div>
      
      <div className="relative p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <Atom className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-1">
                Peptide #{index + 1}
              </h3>
              <p className="text-sm text-purple-600 font-medium">
                {peptide.sequence || 'Unknown Sequence'}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Score</div>
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {peptide.score?.toFixed(2) || 'N/A'}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 border border-purple-100">
            <div className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">Mass</div>
            <div className="text-lg font-bold text-gray-800">{peptide.mass?.toFixed(4) || 'N/A'}</div>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 border border-blue-100">
            <div className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">Charge</div>
            <div className="text-lg font-bold text-gray-800">{peptide.charge || 'N/A'}</div>
          </div>
        </div>

        {peptide.modifications && peptide.modifications.length > 0 && (
          <div className="mb-4">
            <div className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-2">Modifications</div>
            <div className="flex flex-wrap gap-1">
              {peptide.modifications.map((mod, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 text-xs rounded-full border border-purple-200"
                >
                  {mod}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500">
            RT: {peptide.retentionTime?.toFixed(2) || 'N/A'} min
          </div>
          <div className="flex items-center gap-1">
            <Zap className="w-3 h-3 text-purple-500" />
            <span className="text-xs text-gray-600">
              {peptide.intensity?.toFixed(0) || 'N/A'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};


export default PeptideCard;