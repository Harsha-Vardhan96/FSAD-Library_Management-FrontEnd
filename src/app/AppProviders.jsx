import React from 'react';
import { ThemeProvider } from '../context/ThemeContext';
import { LanguageProvider } from '../context/LanguageContext';
import { AuthProvider } from '../context/AuthContext';
import { PDFProvider } from '../context/PDFContext';
import { FeedbackProvider } from '../context/FeedbackContext';

/**
 * AppProviders Component
 * Composes all global React Context Providers into a clean hierarchy.
 */
export const AppProviders = ({ children }) => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <PDFProvider>
            <FeedbackProvider>
              {children}
            </FeedbackProvider>
          </PDFProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default AppProviders;
