import React, { useState } from 'react';
import { usePDF } from '../../context/PDFContext';
import PDFViewer from './PDFViewer';

export const PDFGrid = ({ pdfs: propPdfs, category, subdomain, compact }) => {
  const { getPDFsByCategory, getPDFsByNestedPath } = usePDF();
  const [selectedPDF, setSelectedPDF] = useState(null);

  const pdfs = propPdfs
    ? propPdfs
    : subdomain
    ? getPDFsByNestedPath({ category, subdomain })
    : getPDFsByCategory(category);

  if (!pdfs || pdfs.length === 0) {
    return null;
  }

  if (compact) {
    return (
      <>
        {selectedPDF && <PDFViewer pdf={selectedPDF} onClose={() => setSelectedPDF(null)} />}
        <div>
          <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
            📄 Related PDFs
            <span className="text-[10px] font-black text-accent bg-accent/10 px-2 py-0.5 rounded-full">{pdfs.length}</span>
          </h4>
          <div className="space-y-2">
            {pdfs.map((pdf) => (
              <div
                key={pdf.id}
                className="flex items-center justify-between bg-gray-800 hover:bg-gray-700 p-3 rounded-xl cursor-pointer transition-all group/pdf"
                onClick={() => setSelectedPDF(pdf)}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <span className="text-accent text-sm">📕</span>
                  <span className="text-sm text-white font-medium truncate group-hover/pdf:text-accent transition-colors">{pdf.title}</span>
                  {pdf.subSubdomain && (
                    <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider hidden sm:inline">{pdf.subSubdomain}</span>
                  )}
                </div>
                <span className="text-accent text-xs opacity-0 group-hover/pdf:opacity-100 transition-opacity">View →</span>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {selectedPDF && <PDFViewer pdf={selectedPDF} onClose={() => setSelectedPDF(null)} />}
      <div className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pdfs.map((pdf) => (
            <div
              key={pdf.id}
              className="bg-gray-800/90 backdrop-blur-xl rounded-2xl border border-white/5 p-6 hover:border-accent/50 transition-all duration-300 hover:-translate-y-2 cursor-pointer group"
              onClick={() => setSelectedPDF(pdf)}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center text-xl group-hover:bg-accent/40 transition-colors">
                  📕
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-white truncate group-hover:text-accent transition-colors">
                    {pdf.title}
                  </h3>
                  <p className="text-xs text-gray-400">{pdf.uploadDate || 'Recent'}</p>
                </div>
              </div>
              {pdf.description && (
                <p className="text-sm text-gray-300 mb-4 line-clamp-2">
                  {pdf.description}
                </p>
              )}
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <span className="text-xs font-semibold text-accent uppercase">
                  Click to View
                </span>
                <span className="text-accent group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PDFGrid;
