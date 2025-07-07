// File: components/ErrorMessage.jsx
import React from 'react';
import { AlertCircle } from 'lucide-react';

const ErrorMessage = ({ error }) => (
  <div className="bg-red-500/20 backdrop-blur-sm border-2 border-red-400/50 rounded-2xl p-6 mb-8 flex items-center gap-4">
    <div className="w-12 h-12 bg-red-500 rounded-2xl flex items-center justify-center">
      <AlertCircle className="h-6 w-6 text-white" />
    </div>
    <p className="text-red-100 text-lg font-medium">{error}</p>
  </div>
);

export default ErrorMessage;
