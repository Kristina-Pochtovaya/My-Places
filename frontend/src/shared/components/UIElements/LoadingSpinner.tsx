import React from 'react';
import './LoadingSpinner.scss';

const LoadingSpinner = (props: {asOverlay: boolean}) => {
  return (
    <div className={`${props.asOverlay && 'loading-spinner__overlay'}`}>
      <div className="lds-dual-ring"></div>
    </div>
  );
};

export default LoadingSpinner;
