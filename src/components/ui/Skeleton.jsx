import React from 'react';

export const Skeleton = ({ className = '', ...props }) => (
  <div
    className={`bg-slate-800/60 rounded-md animate-pulseGlow ${className}`}
    {...props}
  />
);

export default Skeleton;
