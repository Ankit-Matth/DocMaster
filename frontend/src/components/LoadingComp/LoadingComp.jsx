import React from 'react';
import { Spinner } from 'react-bootstrap';
import './LoadingComp.css'; // Styles for the overlay

const LoadingComp = ({ show }) => {
  return (
    <div className='loading'>
      <Spinner animation="border" variant="primary" className="spinner" style={{width: '4rem', height: '4rem', borderWidth: '0.5rem'}} />
      <div className="loading-message">Please wait while your file is being uploaded...</div>
    </div>
  );
};
 
export default LoadingComp;