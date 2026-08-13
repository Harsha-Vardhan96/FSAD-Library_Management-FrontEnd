import React from 'react';
import { Badge } from '../ui';

export const WelcomeSection = ({ userName }) => {
  return (
    <div className="space-y-3 text-center max-w-3xl mx-auto">
      <Badge variant="primary" size="md" className="mx-auto">
        National Digital Knowledge Platform
      </Badge>
      <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase leading-tight">
        Welcome Back, <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-400 bg-clip-text text-transparent">{userName || 'Knowledge Explorer'}</span> 👋
      </h1>
      <p className="text-text-gray text-xs md:text-sm max-w-xl mx-auto leading-relaxed">
        Explore academic journals, research datasets, legal archives, and educational resources across India's digital repository.
      </p>
    </div>
  );
};

export default WelcomeSection;
