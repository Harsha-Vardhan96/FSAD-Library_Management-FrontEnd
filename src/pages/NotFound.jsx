import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const NotFound = () => {
  const { isAuthenticated, user } = useAuth();
  const role = user?.role ? user.role.toLowerCase() : '';
  const isAdmin = role === 'admin' || role === 'administrator';

  const homePath = isAuthenticated ? (isAdmin ? '/admin-dashboard' : '/dashboard') : '/login';

  return (
    <div className="min-h-screen bg-ndl-dark text-white flex flex-col items-center justify-center p-6 text-center font-sans">
      <div className="w-24 h-24 bg-accent/10 border border-accent/30 rounded-3xl flex items-center justify-center mb-6 shadow-xl backdrop-blur-md">
        <span className="text-4xl font-black text-accent tracking-tighter">404</span>
      </div>
      <h1 className="text-3xl font-extrabold mb-3 tracking-tight">Page Not Found</h1>
      <p className="text-gray-400 max-w-md mb-8 text-sm leading-relaxed">
        The page you are looking for doesn't exist, has been removed, or is temporarily unavailable.
      </p>
      <Link
        to={homePath}
        className="px-8 py-3.5 bg-gradient-to-r from-accent to-orange-500 hover:from-orange-500 hover:to-accent text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-accent/20 hover:scale-105"
      >
        Return to Safety
      </Link>
    </div>
  );
};

export default NotFound;
