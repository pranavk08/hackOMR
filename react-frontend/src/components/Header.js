import React from 'react';
import { ScanLine } from 'lucide-react';

const Header = () => {
  return (
    <header className="text-center mb-8">
      <h1 className="text-6xl font-bold text-white mb-4 flex items-center justify-center gap-4">
        <ScanLine className="text-6xl" />
        OMR Scanner
      </h1>
      <p className="text-xl text-white opacity-90">
        Upload your OMR sheet image and get instant results
      </p>
    </header>
  );
};

export default Header;
