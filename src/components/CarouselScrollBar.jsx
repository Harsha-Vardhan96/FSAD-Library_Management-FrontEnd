import React, { useState, useRef, useEffect } from 'react';

const CarouselScrollBar = ({ totalCards = 8, onScroll }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const barRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    updatePosition(e);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      updatePosition(e);
    }
  };

  const updatePosition = (e) => {
    if (!barRef.current) return;

    const rect = barRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));

    setScrollPosition(percentage);
    if (onScroll) {
      onScroll(percentage);
    }
  };

  const handleBarClick = (e) => {
    updatePosition(e);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  const currentCard = Math.round((scrollPosition / 100) * (totalCards - 1)) + 1;

  return (
    <div className="w-full max-w-[1700px] mx-auto px-8 mt-6">
      {/* Scroll Bar Container */}
      <div className="flex flex-col gap-4">
        {/* Visual Scroll Bar */}
        <div
          ref={barRef}
          onClick={handleBarClick}
          className="relative w-full h-2 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-full cursor-pointer overflow-hidden shadow-lg"
        >
          {/* Progress Fill */}
          <div
            className="absolute h-full bg-gradient-to-r from-accent to-purple-500 transition-all duration-150 rounded-full shadow-lg shadow-accent/50"
            style={{ width: `${scrollPosition}%` }}
          />

          {/* Draggable Thumb */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full shadow-xl cursor-grab active:cursor-grabbing transition-all hover:scale-125 border-2 border-accent"
            style={{
              left: `${scrollPosition}%`,
              transform: 'translate(-50%, -50%)',
            }}
            onMouseDown={handleMouseDown}
          />
        </div>

        {/* Stats Below Scroll Bar */}
        <div className="flex items-center justify-between text-xs font-semibold text-gray-400">
          <div className="flex items-center gap-2">
            <span className="text-accent">📍 Card {currentCard}</span>
            <span className="text-gray-500">of {totalCards}</span>
          </div>
          <div className="text-gray-500">
            {Math.round(scrollPosition)}% scrolled
          </div>
        </div>
      </div>

      {/* Card Indicators */}
      <div className="flex gap-2 mt-4 justify-center flex-wrap">
        {Array.from({ length: totalCards }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              const newPosition = (idx / (totalCards - 1)) * 100;
              setScrollPosition(newPosition);
              if (onScroll) {
                onScroll(newPosition);
              }
            }}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 hover:scale-150 ${
              Math.abs(currentCard - (idx + 1)) === 0
                ? 'bg-accent shadow-lg shadow-accent/50 w-6'
                : 'bg-gray-600 hover:bg-accent/50'
            }`}
            title={`Go to card ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default CarouselScrollBar;
