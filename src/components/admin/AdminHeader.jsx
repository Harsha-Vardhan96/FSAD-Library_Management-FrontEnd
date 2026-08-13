import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { Button, Badge } from '../ui';

export const AdminHeader = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { t } = useLanguage();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="z-[1050] flex justify-between items-center px-4 md:px-8 py-3 text-xs font-semibold tracking-wide sticky top-0 border-b backdrop-blur-md shadow-sm border-border-color/60 bg-slate-950/90 text-white">
      <div className="flex items-center space-x-4">
        <div
          className="flex items-center space-x-2.5 cursor-pointer group"
          onClick={() => navigate('/dashboard')}
        >
          <span className="text-lg group-hover:scale-110 transition-transform">🛡️</span>
          <span className="font-bold text-sm bg-gradient-to-r from-cyan-400 to-teal-200 bg-clip-text text-transparent uppercase tracking-wider">
            {t('adminConsole') || 'Admin Control Center'}
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-3 md:space-x-5">
        <Badge variant="primary" size="sm">
          {user?.role?.toUpperCase() || 'ADMINISTRATOR'}
        </Badge>
        <span className="hidden sm:inline font-medium text-slate-300 text-xs">
          {user?.name || user?.email || 'Admin'}
        </span>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="text-rose-400 hover:text-rose-300 hover:bg-rose-500/10"
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default AdminHeader;
