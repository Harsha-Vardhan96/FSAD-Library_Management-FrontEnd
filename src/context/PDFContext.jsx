import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { fetchPDFs, createPDF, deletePDF } from '../services/api';

const PDFContext = createContext();

export const PDFProvider = ({ children }) => {
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch PDFs from the backend API (Source of Truth)
  const loadPDFs = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchPDFs(params);
      if (Array.isArray(response)) {
        setPdfs(response);
      } else if (response && Array.isArray(response.content)) {
        setPdfs(response.content);
      } else {
        setPdfs([]);
      }
    } catch (err) {
      console.error('Error loading PDFs from backend:', err);
      setError(err.message || 'Unable to connect to backend server for PDFs.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPDFs();
  }, [loadPDFs]);

  const addPDF = async (pdfData) => {
    setError(null);
    try {
      const newPDF = await createPDF(pdfData);
      setPdfs((prevPdfs) => [...prevPdfs, newPDF]);
      return newPDF;
    } catch (err) {
      console.error('Backend PDF upload failed:', err);
      const errorMsg = err.message || 'PDF upload failed on backend.';
      setError(errorMsg);
      throw new Error(errorMsg);
    }
  };

  const removePDF = async (id) => {
    setError(null);
    try {
      await deletePDF(id);
      setPdfs((prevPdfs) => prevPdfs.filter((pdf) => pdf.id !== id && String(pdf.id) !== String(id)));
    } catch (err) {
      console.error('Backend PDF delete failed:', err);
      const errorMsg = err.message || 'PDF deletion failed on backend.';
      setError(errorMsg);
      throw new Error(errorMsg);
    }
  };

  const clearError = () => setError(null);

  const getPDFsByCategory = (category) => {
    if (!category) {
      return pdfs;
    }
    return pdfs.filter((pdf) => pdf.category === category);
  };

  const getPDFsByNestedPath = ({ category, subdomain, subSubdomain }) => {
    return pdfs.filter((pdf) => {
      if (category && pdf.category !== category) return false;
      if (subdomain && pdf.subdomain !== subdomain) return false;
      if (subSubdomain && pdf.subSubdomain !== subSubdomain) return false;
      return true;
    });
  };

  const getPDFById = (id) => {
    return pdfs.find((pdf) => pdf.id === id || String(pdf.id) === String(id));
  };

  const getAllPDFs = () => {
    return pdfs;
  };

  return (
    <PDFContext.Provider
      value={{
        pdfs,
        loading,
        error,
        fetchPDFs: loadPDFs,
        addPDF,
        removePDF,
        clearError,
        getPDFsByCategory,
        getPDFsByNestedPath,
        getPDFById,
        getAllPDFs,
      }}
    >
      {children}
    </PDFContext.Provider>
  );
};

export const usePDF = () => {
  const context = useContext(PDFContext);
  if (!context) {
    throw new Error('usePDF must be used within PDFProvider');
  }
  return context;
};
