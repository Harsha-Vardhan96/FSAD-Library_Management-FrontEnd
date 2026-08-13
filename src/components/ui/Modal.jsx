import React, { useEffect } from 'react';

export const Modal = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  maxWidth = 'max-w-lg',
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen && onClose) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity animate-fadeInUp"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog Container */}
      <div
        className={`relative w-full ${maxWidth} bg-slate-900 border border-border-color rounded-2xl shadow-2xl overflow-hidden z-10 animate-popIn`}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        {(title || onClose) && (
          <div className="flex items-center justify-between p-5 border-b border-border-color/50">
            <div>
              {title && <h3 className="text-lg font-bold text-text-dark tracking-tight">{title}</h3>}
              {description && <p className="text-xs text-text-gray mt-0.5">{description}</p>}
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-text-gray hover:text-text-dark hover:bg-slate-800 transition-colors focus:outline-none"
                aria-label="Close"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* Content Body */}
        <div className="p-5 max-h-[70vh] overflow-y-auto">{children}</div>

        {/* Footer Actions */}
        {footer && (
          <div className="p-4 bg-slate-950/50 border-t border-border-color/50 flex items-center justify-end space-x-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
