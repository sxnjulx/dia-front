// File: components/Header.jsx
import React from 'react';
import { Atom, Zap, Database } from 'lucide-react';

const Header = () => (
  <div className="text-center mb-12">
    <div className="inline-flex items-center gap-3 mb-4">
      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl">
        <Database className="w-6 h-6 text-white" />
      </div>
      <h1 className="text-5xl font-black bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
        ProteoSearch
      </h1>
    </div>
    <p className="text-purple-200 text-xl font-medium max-w-2xl mx-auto">
      Advanced proteomics analysis platform for MS spectrometer data identification and peptide discovery
    </p>
    <div className="mt-4 flex items-center justify-center gap-6 text-sm text-purple-300">
      <div className="flex items-center gap-2">
        <Atom className="w-4 h-4" />
        <span>Peptide Analysis</span>
      </div>
      <div className="flex items-center gap-2">
        <Zap className="w-4 h-4" />
        <span>Real-time Processing</span>
      </div>
      <div className="flex items-center gap-2">
        <Database className="w-4 h-4" />
        <span>HDF5 Compatible</span>
      </div>
    </div>
  </div>
);

export default Header;