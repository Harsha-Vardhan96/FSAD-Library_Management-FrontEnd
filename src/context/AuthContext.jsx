/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize authentication state on startup from localStorage
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && typeof parsedUser === 'object') {
          setUser(parsedUser);
        }
      }
    } catch (err) {
      console.error('Failed to parse stored auth user state:', err);
      localStorage.removeItem('user');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Centralized login operation using authService
  const login = useCallback(async (credentials) => {
    setIsLoading(true);
    try {
      const userData = await authService.loginUser(credentials);
      const cleanUser = {
        id: userData.id || null,
        name: userData.name || '',
        email: userData.email || '',
        role: userData.role || 'user',
        token: userData.token || null,
      };
      setUser(cleanUser);
      localStorage.setItem('user', JSON.stringify(cleanUser));
      return cleanUser;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Centralized signup operation using authService
  const signup = useCallback(async (credentials) => {
    setIsLoading(true);
    try {
      const userData = await authService.signUpUser(credentials);
      const cleanUser = {
        id: userData.id || null,
        name: userData.name || '',
        email: userData.email || '',
        role: userData.role || 'user',
        token: userData.token || null,
      };
      setUser(cleanUser);
      localStorage.setItem('user', JSON.stringify(cleanUser));
      return cleanUser;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Centralized logout operation
  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
  }, []);

  // Refresh auth state manually if required
  const refreshAuth = useCallback(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error('Error refreshing auth state:', err);
      setUser(null);
    }
  }, []);

  const value = {
    user,
    isAuthenticated: Boolean(user),
    isLoading,
    login,
    signup,
    logout,
    refreshAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
