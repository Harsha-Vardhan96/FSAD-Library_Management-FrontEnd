import React from 'react';
import { Button } from './Button';

export const ErrorState = ({
  title = 'Failed to load content',
  message = 'An error occurred while fetching data. Please try again.',
  onRetry,
  className = '',
}) => (
  <div className={`flex flex-col items-center justify-center p-8 text-center rounded-xl border border-red-500/20 bg-red-500/5 ${className}`}>
    <div className="p-3 mb-3 rounded-full bg-red-500/10 text-red-400">
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
    <h3 className="text-base font-semibold text-red-400">{title}</h3>
    <p className="text-xs text-text-gray mt-1 max-w-sm leading-relaxed">{message}</p>
    {onRetry && (
      <div className="mt-4">
        <Button variant="outline" size="sm" onClick={onRetry}>
          Try Again
        </Button>
      </div>
    )}
  </div>
);

export default ErrorState;
