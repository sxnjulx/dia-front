import { Atom } from 'lucide-react';
import React from 'react';

const PeptideCard = ({ peptide, index }) => {
  const { sequence, charge, precursorMz, score } = peptide;

  return (
    <div
      className="relative overflow-hidden rounded-3xl p-6 bg-gradient-to-br
                 from-purple-800/50 via-purple-700/40 to-indigo-700/40
                 border border-white/20 shadow-xl backdrop-blur-lg"
    >
      {/* animated glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 blur-2xl opacity-30 animate-pulse" />

      <div className="relative z-10 flex items-start gap-4">
        <div className="shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center bg-purple-600/60">
          <Atom className="w-6 h-6 text-white" />
        </div>

        <div className="flex-1">
          <h4 className="text-lg font-bold text-white tracking-wide">
            Peptide #{index + 1}
          </h4>
          <p className="text-purple-200">
            Sequence: <span className="font-semibold text-white">{sequence || 'N/A'}</span>
          </p>
          <p className="text-purple-200">
            Charge: <span className="font-semibold text-white">{charge ?? '—'}</span>
          </p>
          <p className="text-purple-200">
            Precursor m/z: <span className="font-semibold text-white">{precursorMz ?? '—'}</span>
          </p>
          <p className="text-purple-200">
            Score: <span className="font-semibold text-white">{score ?? '—'}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PeptideCard;
