import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useFeedback } from '../../context/FeedbackContext';
import { useAuth } from '../../context/AuthContext';
import { usePDF } from '../../context/PDFContext';
import { fetchActivities } from '../../services/activityService';
import { CATEGORIES } from '../../constants/categories';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import MagicRingsBackground from '../../components/MagicRingsBackground';
import { Button, Badge, Card, CardTitle, CardDescription } from '../../components/ui';

// Subcomponents under src/components/dashboard/
import { WelcomeSection } from '../../components/dashboard/WelcomeSection';
import { ResourceSearch } from '../../components/dashboard/ResourceSearch';
import { ResourceOverview } from '../../components/dashboard/ResourceOverview';
import { RecentResources } from '../../components/dashboard/RecentResources';
import { CategoryBrowser } from '../../components/dashboard/CategoryBrowser';
import { RecentActivity } from '../../components/dashboard/RecentActivity';

export const Dashboard = ({ toggleFullScreen }) => {
  const { t } = useLanguage();
  const { addFeedback } = useFeedback();
  const { user, logout } = useAuth();
  const { pdfs, loading: pdfsLoading, error: pdfsError } = usePDF();
  const navigate = useNavigate();

  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [activities, setActivities] = useState([]);
  const [activitiesLoading, setActivitiesLoading] = useState(true);

  const exploreRef = useRef(null);
  const feedbackRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    const loadActivities = async () => {
      try {
        setActivitiesLoading(true);
        const data = await fetchActivities();
        if (isMounted) {
          setActivities(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error('Failed to load activities:', err);
      } finally {
        if (isMounted) setActivitiesLoading(false);
      }
    };
    loadActivities();
    return () => { isMounted = false; };
  }, []);

  const handleFeedbackSubmit = () => {
    if (feedbackText.trim()) {
      addFeedback(feedbackText.trim());
      setFeedbackSubmitted(true);
      setFeedbackText('');
      setTimeout(() => setFeedbackSubmitted(false), 4000);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen transition-colors duration-300 overflow-x-hidden relative font-sans bg-bg-light text-text-dark">
      <MagicRingsBackground />

      {/* Top Utility Header */}
      <div className="z-[1050] bg-slate-900/90 text-white flex justify-between items-center px-4 md:px-8 py-2.5 text-xs font-semibold tracking-wide sticky top-0 border-b border-border-color/50 backdrop-blur-md">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-bold text-sm bg-gradient-to-r from-cyan-400 to-teal-200 bg-clip-text text-transparent">
              Digital Knowledge Platform
            </span>
          </div>
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>
        </div>

        <div className="flex items-center space-x-3 md:space-x-5">
          <button
            onClick={toggleFullScreen}
            className="hidden sm:flex items-center space-x-1.5 opacity-80 hover:opacity-100 transition-opacity"
            title="Toggle Fullscreen"
          >
            <span>⛶</span>
            <span>Fullscreen</span>
          </button>
          
          <div className="h-4 w-px bg-border-color/60 hidden sm:block" />

          <div className="flex items-center space-x-2">
            <Badge variant="primary" size="sm">
              {user?.role?.toUpperCase() || 'USER'}
            </Badge>
            <span className="hidden md:inline font-medium text-slate-300">
              {user?.name || user?.email || 'User'}
            </span>
          </div>

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

      {/* Navigation Header */}
      <header className="z-[1000] sticky top-[41px] flex justify-center items-center py-3 px-4 bg-slate-950/70 backdrop-blur-xl border-b border-border-color/40 shadow-sm">
        <nav className="flex items-center space-x-3 md:space-x-8 px-6 py-2 bg-slate-900/90 border border-border-color/60 rounded-full shadow-lg">
          <button
            onClick={() => scrollToSection(exploreRef)}
            className="text-xs font-bold tracking-wider uppercase text-text-gray hover:text-cyan-400 transition-colors"
          >
            {t('explore') || 'Explore Domains'}
          </button>
          <span className="w-1 h-1 bg-cyan-400 rounded-full"></span>
          <button
            onClick={() => navigate('/judicial-resources')}
            className="text-xs font-bold tracking-wider uppercase text-text-gray hover:text-cyan-400 transition-colors"
          >
            {t('resources') || 'Resources'}
          </button>
          <span className="w-1 h-1 bg-cyan-400 rounded-full"></span>
          <button
            onClick={() => scrollToSection(feedbackRef)}
            className="text-xs font-bold tracking-wider uppercase text-text-gray hover:text-cyan-400 transition-colors"
          >
            {t('feedback') || 'Feedback'}
          </button>
        </nav>
      </header>

      {/* Welcome & Search Hero Area */}
      <section className="relative z-10 py-12 md:py-20 px-4 md:px-8 max-w-6xl mx-auto w-full text-center space-y-6">
        <WelcomeSection userName={user?.name} />
        <ResourceSearch />
      </section>

      {/* Resource Overview Metrics */}
      <section className="relative z-10 px-4 md:px-8 max-w-6xl mx-auto w-full mb-12">
        <ResourceOverview
          totalResources={pdfs.length}
          categoriesCount={Object.keys(CATEGORIES).length}
          activitiesCount={activities.length}
          isLoading={pdfsLoading}
        />
      </section>

      {/* Recent Resources */}
      <section className="relative z-10 px-4 md:px-8 max-w-6xl mx-auto w-full mb-16">
        <RecentResources pdfs={pdfs} isLoading={pdfsLoading} error={pdfsError} />
      </section>

      {/* Category Browser */}
      <section ref={exploreRef} className="relative z-10 px-4 md:px-8 max-w-6xl mx-auto w-full mb-16">
        <CategoryBrowser />
      </section>

      {/* Recent Platform Activity */}
      <section className="relative z-10 px-4 md:px-8 max-w-6xl mx-auto w-full mb-16">
        <RecentActivity activities={activities} isLoading={activitiesLoading} />
      </section>

      {/* User Feedback & Suggestions Section */}
      <section ref={feedbackRef} className="relative z-10 px-4 md:px-8 max-w-4xl mx-auto w-full mb-16">
        <Card className="p-6 md:p-8 text-center space-y-4">
          <span className="text-3xl">💬</span>
          <CardTitle className="text-xl">User Feedback & Suggestions</CardTitle>
          <CardDescription>
            Help us improve the National Digital Knowledge Platform experience.
          </CardDescription>

          <div className="space-y-4 max-w-lg mx-auto pt-2">
            <textarea
              rows={3}
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="Share your thoughts, resource requests, or feedback..."
              className="w-full p-3 rounded-lg bg-slate-950/80 border border-border-color text-text-dark text-xs focus:outline-none focus:border-primary transition-all placeholder-text-gray/50"
            />
            
            <Button variant="primary" size="md" onClick={handleFeedbackSubmit} className="w-full">
              Submit Feedback
            </Button>

            {feedbackSubmitted && (
              <p className="text-xs text-emerald-400 font-semibold animate-pulse">
                Thank you! Your feedback has been recorded.
              </p>
            )}
          </div>
        </Card>
      </section>
    </div>
  );
};

export default Dashboard;
