import React from 'react';
import { Loader2 } from 'lucide-react';

const Loading = () => {
  return (
    <div className="card text-center">
      <div className="spinner mb-4">
        <Loader2 className="animate-spin" size={40} />
      </div>
      <p className="text-lg text-gray-600">
        Processing your OMR sheet...
      </p>
      <p className="text-sm text-gray-500 mt-2">
        This may take a few moments
      </p>
    </div>
  );
};

export default Loading;
