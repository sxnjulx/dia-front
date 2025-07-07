import React from 'react';
import { CheckCircle, AlertCircle, Database, Atom } from 'lucide-react';
import PeptideCard from './PeptideCard';

const ResultsPanel = ({ error, peptideData }) => {
  if (error) {
    return (
      <div className="bg-red-500/20 backdrop-blur-sm border-2 border-red-400/50 rounded-2xl p-6 mb-8 flex items-center gap-4">
        <div className="w-12 h-12 bg-red-500 rounded-2xl flex items-center justify-center">
          <AlertCircle className="h-6 w-6 text-white" />
        </div>
        <p className="text-red-100 text-lg font-medium">{error}</p>
      </div>
    );
  }

  if (!peptideData) return null;

  return (
    <div className="mb-8">
      <div className="bg-emerald-500/20 backdrop-blur-sm border-2 border-emerald-400/50 rounded-2xl p-6 mb-8 flex items-center gap-4">
        <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center">
          <CheckCircle className="h-6 w-6 text-white" />
        </div>
        <div>
          <p className="text-emerald-100 text-lg font-bold">Analysis Complete!</p>
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
            {[ 'sampleId', 'scanCount', 'runtime', 'instrument' ].map((key) => (
              <div key={key} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-xs text-purple-300 uppercase tracking-wide font-bold mb-1">
                  {key.replace(/([A-Z])/g, ' $1')}
                </div>
                <div className="text-lg font-bold text-white">{peptideData.metadata[key] || 'N/A'}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {peptideData.peptides?.length > 0 ? (
        <>
          <h2 className="text-3xl font-black text-white mb-8 flex items-center gap-4">
            <Atom className="w-8 h-8 text-purple-400" />
            Identified Peptides
            <span className="text-purple-400">({peptideData.peptides.length})</span>
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
            {peptideData.peptides.map((peptide, i) => (
              <PeptideCard key={i} peptide={peptide} index={i} />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-16">
          <Atom className="w-16 h-16 text-purple-400 mx-auto mb-4 opacity-50" />
          <p className="text-purple-200 text-xl">No peptides were identified in this sample.</p>
        </div>
      )}
    </div>
  );
};

export default ResultsPanel;
