import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { usePDF } from '../../context/PDFContext';
import { useFeedback } from '../../context/FeedbackContext';
import { useAuth } from '../../context/AuthContext';
import AdminPDFManager from '../../components/AdminPDFManager';
import { fetchActivities } from '../../services/api';
import AdminHeader from '../../components/admin/AdminHeader';
import AdminSidebar from '../../components/admin/AdminSidebar';
import DashboardStats from '../../components/admin/DashboardStats';
import RecentActivity from '../../components/admin/RecentActivity';
import FeedbackPanel from '../../components/admin/FeedbackPanel';
import { Card, CardTitle, Badge } from '../../components/ui';

export const AdminDashboard = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { accentColor, setAccentColor } = useTheme();
  const [activeTab, setActiveTab] = useState('overview');

  const { pdfs } = usePDF();
  const { feedbacks, markAsRead, deleteFeedback, unreadCount } = useFeedback();

  const [recentActivities, setRecentActivities] = useState([]);
  const [activitiesLoading, setActivitiesLoading] = useState(true);
  const [activitiesError, setActivitiesError] = useState('');

  const stats = [
    { label: 'Total Resources', value: String(pdfs.length), icon: '📚', variant: 'primary' },
    { label: 'Knowledge Domains', value: '8', icon: '🏛️', variant: 'info' },
    { label: 'Audit Logs', value: String(recentActivities.length), icon: '📑', variant: 'warning' },
    { label: 'Unread Feedback', value: String(unreadCount), icon: '💬', variant: unreadCount > 0 ? 'danger' : 'neutral' },
  ];

  const loadRecentActivities = async () => {
    setActivitiesLoading(true);
    setActivitiesError('');
    try {
      const activities = await fetchActivities();
      setRecentActivities(Array.isArray(activities) ? activities.slice(0, 6) : []);
    } catch (err) {
      setActivitiesError(err.message || 'Unable to load recent system activity.');
    } finally {
      setActivitiesLoading(false);
    }
  };

  useEffect(() => {
    loadRecentActivities();
  }, []);

  useEffect(() => {
    if (activeTab === 'overview') {
      loadRecentActivities();
    }
  }, [activeTab]);

  const renderOverview = () => (
    <div className="max-w-6xl mx-auto space-y-8 animate-fadeIn">
      <div>
        <Badge variant="primary" size="sm" className="mb-2">
          Administrator Terminal
        </Badge>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
          Welcome Back, <span className="text-cyan-400">{user?.name || user?.email || 'Administrator'}</span>
        </h1>
        <p className="text-xs text-text-gray mt-1">Real-time system overview and digital repository administration</p>
      </div>

      <DashboardStats stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentActivity
            activities={recentActivities}
            loading={activitiesLoading}
            error={activitiesError}
            onRefresh={loadRecentActivities}
          />
        </div>
        
        <Card className="p-6 flex flex-col justify-between">
          <div>
            <CardTitle>System Role Governance</CardTitle>
            <p className="text-xs text-text-gray mt-1 leading-relaxed">
              Centralized access rights and authority levels for digital repository security.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950/60 border border-border-color/60 text-center mt-6">
            <span className="text-xs text-cyan-400 font-mono">Current Authority: {user?.role?.toUpperCase() || 'ROLE_ADMIN'}</span>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
      <div>
        <Badge variant="secondary" size="sm" className="mb-2">
          Console Preferences
        </Badge>
        <h1 className="text-2xl font-bold tracking-tight text-white">System Settings</h1>
      </div>

      <Card className="p-6">
        <div className="flex justify-between items-center pb-4 border-b border-border-color/50">
          <div>
            <p className="text-sm font-semibold text-white">Accent Theme Highlight</p>
            <p className="text-xs text-text-gray">Customize primary interface highlight color</p>
          </div>
          <input
            type="color"
            value={accentColor}
            onChange={(e) => setAccentColor(e.target.value)}
            className="w-9 h-9 rounded-lg cursor-pointer bg-transparent border-0"
          />
        </div>
      </Card>
    </div>
  );

  return (
    <div className="flex flex-col w-full min-h-screen bg-bg-light text-text-dark font-sans">
      <AdminHeader />
      <div className="flex flex-1 overflow-hidden">
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} unreadCount={unreadCount} />
        <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-10">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'resources' && (
            <div className="max-w-6xl mx-auto animate-fadeIn">
              <AdminPDFManager onActivityChange={loadRecentActivities} />
            </div>
          )}
          {activeTab === 'feedback' && (
            <FeedbackPanel feedbacks={feedbacks} markAsRead={markAsRead} deleteFeedback={deleteFeedback} />
          )}
          {activeTab === 'settings' && renderSettings()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
