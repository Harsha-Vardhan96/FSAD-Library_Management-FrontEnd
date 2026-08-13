import React from 'react';

export const EmptyState = ({
  icon: Icon,
  title = 'No records found',
  description = 'There are no items matching your criteria at this time.',
  action,
  className = '',
}) => (
  <div className={`flex flex-col items-center justify-center p-8 text-center rounded-xl border border-dashed border-border-color bg-slate-900/30 ${className}`}>
    {Icon && (
      <div className="p-3 mb-3 rounded-full bg-slate-800/80 text-text-gray">
        <Icon className="w-8 h-8" />
      </div>
    )}
    <h3 className="text-base font-semibold text-text-dark">{title}</h3>
    <p className="text-xs text-text-gray mt-1 max-w-sm leading-relaxed">{description}</p>
    {action && <div className="mt-4">{action}</div>}
  </div>
);

export default EmptyState;
