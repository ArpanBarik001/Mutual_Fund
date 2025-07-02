import React from 'react';
import './css/Spinner.css';

const Spinner = () => {
  return (
    <div className="spinner-wrapper">
      <div className="spinner" />
      <p>Loading results...</p>
    </div>
  );
};

export default Spinner;
