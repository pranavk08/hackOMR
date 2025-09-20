import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileImage, X, Play } from 'lucide-react';

const UploadArea = ({ selectedFile, onFileSelect, onRemoveFile, onProcessImage, isLoading }) => {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.bmp', '.webp']
    },
    multiple: false
  });

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="card">
      {!selectedFile ? (
        <div
          {...getRootProps()}
          className={`upload-area ${isDragActive ? 'dragover' : ''}`}
        >
          <input {...getInputProps()} />
          <div className="upload-content">
            <Upload className="upload-icon" size={64} />
            <h3 className="text-2xl font-semibold mb-2">
              {isDragActive ? 'Drop your image here' : 'Drop your OMR image here'}
            </h3>
            <p className="text-gray-600 mb-6">
              or click to browse files
            </p>
            <button className="btn btn-primary">
              <Upload size={20} />
              Choose File
            </button>
          </div>
        </div>
      ) : (
        <div className="file-info">
          <div className="file-details">
            <FileImage className="text-green-500" size={24} />
            <div className="file-info-text">
              <div className="font-semibold">{selectedFile.name}</div>
              <div className="text-sm text-gray-600">
                {formatFileSize(selectedFile.size)}
              </div>
            </div>
            <button
              onClick={onRemoveFile}
              className="btn btn-danger"
              style={{ padding: '8px', minWidth: 'auto' }}
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {selectedFile && (
        <div className="text-center mt-6">
          <button
            onClick={onProcessImage}
            disabled={isLoading}
            className="btn btn-success"
          >
            <Play size={20} />
            {isLoading ? 'Processing...' : 'Process OMR Sheet'}
          </button>
        </div>
      )}

      <style jsx>{`
        .upload-area {
          border: 3px dashed #667eea;
          border-radius: 16px;
          padding: 60px 20px;
          text-align: center;
          transition: all 0.3s ease;
          cursor: pointer;
          background: #f8f9ff;
        }

        .upload-area:hover {
          border-color: #764ba2;
          background: #f0f2ff;
          transform: translateY(-2px);
        }

        .upload-area.dragover {
          border-color: #764ba2;
          background: #e8ebff;
          transform: scale(1.02);
        }

        .upload-content {
          pointer-events: none;
        }

        .upload-icon {
          color: #667eea;
          margin-bottom: 20px;
        }

        .file-info {
          background: #e8f5e8;
          border-radius: 12px;
          padding: 20px;
          border-left: 4px solid #4caf50;
        }

        .file-details {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .file-info-text {
          flex: 1;
        }
      `}</style>
    </div>
  );
};

export default UploadArea;
