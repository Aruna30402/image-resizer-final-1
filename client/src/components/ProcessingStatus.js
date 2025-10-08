import React from 'react';
import './ProcessingStatus.css';

const ProcessingStatus = ({ status }) => {
  return (
    <div className="processing-status">
      <div className="processing-content">
        <div className="spinner"></div>
        <p>{status}</p>
      </div>
    </div>
  );
};

export default ProcessingStatus;
