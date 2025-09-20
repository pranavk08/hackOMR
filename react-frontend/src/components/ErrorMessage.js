import React from 'react';
import { AlertTriangle } from 'lucide-react';

const ErrorMessage = ({ message }) => {
  return (
    <div className="error">
      <AlertTriangle size={20} />
      <span>{message}</span>
    </div>
  );
};

export default ErrorMessage;
