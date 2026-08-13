import React, { useState } from 'react';
import { X, Download } from 'lucide-react';

export const PDFViewer = ({ pdf, onClose }) => {
  const handleDownload = () => {
    if (pdf.file || pdf.url) {
      const link = document.createElement('a');
      link.href = pdf.file || pdf.url;
      link.download = pdf.fileName || pdf.title || 'document.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex flex-col font-sans">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800 p-4 flex items-center justify-between">
        <div className="flex-1">
          <h2 className="text-xl font-bold text-white truncate">{pdf.title}</h2>
          <p className="text-sm text-gray-400">{pdf.fileName || pdf.category}</p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleDownload}
            className="p-2 hover:bg-gray-800 rounded-lg text-gray-300 hover:text-white transition-colors"
            title="Download PDF"
          >
            <Download className="w-5 h-5" />
          </button>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg text-gray-300 hover:text-white transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* PDF Display */}
      <div className="flex-1 overflow-auto flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full h-[650px] overflow-hidden">
          <iframe
            src={pdf.file || pdf.url}
            type="application/pdf"
            width="100%"
            height="100%"
            title={pdf.title}
            className="rounded"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 border-t border-gray-800 p-4 text-center text-gray-400 text-sm font-mono">
        <p>PDF Viewer • Use browser controls for page navigation</p>
      </div>
    </div>
  );
};

export default PDFViewer;
