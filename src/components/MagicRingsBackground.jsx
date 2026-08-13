import React from 'react';
import './MagicRingsBackground.css';

const MagicRingsBackground = () => {
  return (
    <div className="magic-rings-container">
      <div className="ring-wrapper-left">
        <div className="magic-ring left-ring-1"></div>
        <div className="magic-ring left-ring-2"></div>
        <div className="magic-ring left-ring-3"></div>
        <div className="magic-ring left-ring-4"></div>
      </div>
      <div className="ring-wrapper-right">
        <div className="magic-ring right-ring-1"></div>
        <div className="magic-ring right-ring-2"></div>
        <div className="magic-ring right-ring-3"></div>
        <div className="magic-ring right-ring-4"></div>
      </div>
      <div className="vignette-overlay"></div>
    </div>
  );
};

export default MagicRingsBackground;
