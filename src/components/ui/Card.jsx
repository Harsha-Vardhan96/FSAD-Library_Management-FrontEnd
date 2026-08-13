import React from 'react';

export const Card = ({ children, className = '', hoverable = false, ...props }) => (
  <div
    className={`bg-slate-900/70 backdrop-blur-md border border-border-color rounded-xl overflow-hidden shadow-md transition-all duration-300 ${
      hoverable ? 'hover:border-primary/50 hover:shadow-lg hover:-translate-y-0.5' : ''
    } ${className}`}
    {...props}
  >
    {children}
  </div>
);

export const CardHeader = ({ children, className = '', ...props }) => (
  <div className={`p-5 border-b border-border-color/50 ${className}`} {...props}>
    {children}
  </div>
);

export const CardTitle = ({ children, className = '', ...props }) => (
  <h3 className={`text-lg font-semibold text-text-dark tracking-tight ${className}`} {...props}>
    {children}
  </h3>
);

export const CardDescription = ({ children, className = '', ...props }) => (
  <p className={`text-xs text-text-gray mt-1 leading-relaxed ${className}`} {...props}>
    {children}
  </p>
);

export const CardContent = ({ children, className = '', ...props }) => (
  <div className={`p-5 ${className}`} {...props}>
    {children}
  </div>
);

export const CardFooter = ({ children, className = '', ...props }) => (
  <div className={`p-4 bg-slate-950/40 border-t border-border-color/50 flex items-center justify-between ${className}`} {...props}>
    {children}
  </div>
);

export default Card;
