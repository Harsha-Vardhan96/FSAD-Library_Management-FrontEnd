import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePDF } from '../../context/PDFContext';

export const ResourceViewer = ({ toggleFullScreen }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getAllPDFs, getPDFById } = usePDF();
  const allPDFs = getAllPDFs();
  const selectedPdf = getPDFById(id);

  const normalizeKey = (value) =>
    value?.toString().trim().toLowerCase().replace(/-/g, ' ').replace(/%20/g, ' ') || '';

  const normalizedId = normalizeKey(id);

  const matchedPdf = useMemo(() => {
    if (selectedPdf) return selectedPdf;
    return allPDFs.find((pdf) => {
      const titleMatch = normalizeKey(pdf.title) === normalizedId;
      const subMatch = normalizeKey(pdf.subdomain) === normalizedId;
      const subSubMatch = normalizeKey(pdf.subSubdomain) === normalizedId;
      return titleMatch || subMatch || subSubMatch;
    });
  }, [selectedPdf, allPDFs, normalizedId]);

  const displayName = matchedPdf?.title || id?.replace(/-/g, ' ').replace(/%20/g, ' ') || 'Resource Details';
  const categoryName = matchedPdf?.category || 'General';

  return (
    <div className="flex flex-col w-full min-h-screen bg-ndl-dark text-white font-sans">
      {/* Top Bar */}
      <div className="z-[1050] bg-gray-900 border-b border-white/10 px-[5%] py-3 flex justify-between items-center text-xs sticky top-0">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-300 hover:text-accent font-bold transition-colors"
        >
          <span>⬅️</span> Back
        </button>
        <span className="font-mono text-gray-400 truncate max-w-md">{displayName}</span>
        {toggleFullScreen && (
          <button onClick={toggleFullScreen} className="text-gray-300 hover:text-accent font-bold">
            ⛶ Fullscreen
          </button>
        )}
      </div>

      {/* Main Content */}
      <main className="flex-1 px-[5%] py-10 max-w-6xl mx-auto w-full space-y-8">
        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 shadow-2xl space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div>
              <span className="text-xs font-mono text-accent uppercase tracking-widest">{categoryName}</span>
              <h1 className="text-3xl font-extrabold tracking-tight mt-1">{displayName}</h1>
            </div>
            {matchedPdf?.url && (
              <a
                href={matchedPdf.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gradient-to-r from-accent to-orange-500 text-white font-bold rounded-xl text-xs hover:scale-105 transition-transform"
              >
                Download PDF 📥
              </a>
            )}
          </div>

          <div className="p-6 rounded-2xl bg-black/30 border border-white/5 space-y-4">
            <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider">Document Metadata</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs font-mono">
              <div>
                <span className="text-gray-500 block">Category:</span>
                <span className="text-white">{matchedPdf?.category || 'N/A'}</span>
              </div>
              <div>
                <span className="text-gray-500 block">Subdomain:</span>
                <span className="text-white">{matchedPdf?.subdomain || 'N/A'}</span>
              </div>
              <div>
                <span className="text-gray-500 block">Sub-Subdomain:</span>
                <span className="text-white">{matchedPdf?.subSubdomain || 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Embedded Viewer Placeholder / Frame */}
          <div className="w-full h-[600px] rounded-2xl bg-black/60 border border-white/10 flex items-center justify-center relative overflow-hidden">
            {matchedPdf?.url ? (
              <iframe src={matchedPdf.url} className="w-full h-full border-0" title={displayName} />
            ) : (
              <div className="text-center space-y-3 p-8">
                <span className="text-5xl block">📑</span>
                <p className="text-sm text-gray-400 font-medium">Digital Document Stream Preview</p>
                <p className="text-xs text-gray-500 max-w-sm">
                  Full PDF document rendering module active. Content streamed directly from repository.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResourceViewer;
