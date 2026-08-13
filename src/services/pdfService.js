/**
 * PDF Service
 * Centralizes PDF fetching, uploading, and deletion API calls.
 */

import apiClient from './apiClient';

export const fetchPDFs = async (params = {}) => {
  const query = new URLSearchParams();
  if (params.page !== undefined && params.page !== null) query.append('page', params.page);
  if (params.size !== undefined && params.size !== null) query.append('size', params.size);
  if (params.sort) query.append('sort', params.sort);
  if (params.direction) query.append('direction', params.direction);
  if (params.category) query.append('category', params.category);
  if (params.search) query.append('search', params.search);

  const queryString = query.toString();
  const url = queryString ? `/api/pdfs?${queryString}` : '/api/pdfs';
  return await apiClient.get(url);
};

export const createPDF = async (pdfData) => {
  return await apiClient.post('/api/pdfs', pdfData);
};

export const deletePDF = async (id) => {
  return await apiClient.delete(`/api/pdfs/${id}`);
};

const pdfService = {
  fetchPDFs,
  createPDF,
  deletePDF,
};

export default pdfService;
