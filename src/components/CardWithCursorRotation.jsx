import React from 'react';

const CardWithCursorRotation = ({ children, className = "" }) => {
  return (
    <div
      className={className}
      style={{
        transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateX(0px) translateY(0px)',
        transition: 'transform 0.1s ease-out',
      }}
    >
      {children}
    </div>
  );
};

export default CardWithCursorRotation;
