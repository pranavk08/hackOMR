import React, { useState } from 'react';
import Header from './components/Header';
import UploadArea from './components/UploadArea';
import Results from './components/Results';
import Loading from './components/Loading';
import ErrorMessage from './components/ErrorMessage';
import { processOMRImage } from './services/api';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setError(null);
    setResults(null);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setError(null);
    setResults(null);
  };

  const handleProcessImage = async () => {
    if (!selectedFile) {
      setError('Please select a file first.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResults(null);

    try {
      const result = await processOMRImage(selectedFile);
      setResults(result);
    } catch (err) {
      console.error('Error processing image:', err);
      setError(err.message || 'Failed to process image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <Header />
      
      <main className="main-content">
        <UploadArea
          selectedFile={selectedFile}
          onFileSelect={handleFileSelect}
          onRemoveFile={handleRemoveFile}
          onProcessImage={handleProcessImage}
          isLoading={isLoading}
        />

        {isLoading && <Loading />}

        {error && <ErrorMessage message={error} />}

        {results && <Results data={results} />}
      </main>
    </div>
  );
}

export default App;
