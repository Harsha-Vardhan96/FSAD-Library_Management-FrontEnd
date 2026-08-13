import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppProviders from './app/AppProviders';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import ForgotPassword from './pages/auth/ForgotPassword';
import Dashboard from './pages/user/Dashboard';
import ResourceViewer from './pages/user/ResourceViewer';
import SearchResults from './pages/user/SearchResults';
import AdminDashboard from './pages/admin/AdminDashboard';
import CategoryResourcePage from './pages/category/CategoryResourcePage';
import NotFound from './pages/NotFound';
import ProtectedRoute from './routes/ProtectedRoute';
import AdminRoute from './routes/AdminRoute';
import { ROUTES } from './constants/routes';

function App() {
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <AppProviders>
      <Router>
        <div className="min-h-screen transition-colors duration-300 bg-bg-light">
          <Routes>
            {/* Public Routes */}
            <Route path={ROUTES.HOME} element={<Login />} />
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.SIGNUP} element={<Signup />} />
            <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />

            {/* Authenticated User Protected Routes */}
            <Route
              path={ROUTES.DASHBOARD}
              element={
                <ProtectedRoute>
                  <Dashboard toggleFullScreen={toggleFullScreen} />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.SEARCH}
              element={
                <ProtectedRoute>
                  <SearchResults toggleFullScreen={toggleFullScreen} />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.VIEW_RESOURCE}
              element={
                <ProtectedRoute>
                  <ResourceViewer toggleFullScreen={toggleFullScreen} />
                </ProtectedRoute>
              }
            />

            {/* Category Pages */}
            <Route
              path={ROUTES.JUDICIAL_RESOURCES}
              element={
                <ProtectedRoute>
                  <CategoryResourcePage categoryId="judicial" toggleFullScreen={toggleFullScreen} />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.SCHOOL_EDUCATION}
              element={
                <ProtectedRoute>
                  <CategoryResourcePage categoryId="school" toggleFullScreen={toggleFullScreen} />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.RESEARCH_RESOURCES}
              element={
                <ProtectedRoute>
                  <CategoryResourcePage categoryId="research" toggleFullScreen={toggleFullScreen} />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.PATENTS_AND_STANDARDS}
              element={
                <ProtectedRoute>
                  <CategoryResourcePage categoryId="patents" toggleFullScreen={toggleFullScreen} />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.HIGHER_EDUCATION}
              element={
                <ProtectedRoute>
                  <CategoryResourcePage categoryId="higher" toggleFullScreen={toggleFullScreen} />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.CAREER_DEVELOPMENT}
              element={
                <ProtectedRoute>
                  <CategoryResourcePage categoryId="career" toggleFullScreen={toggleFullScreen} />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.CULTURAL_ARCHIVES}
              element={
                <ProtectedRoute>
                  <CategoryResourcePage categoryId="cultural" toggleFullScreen={toggleFullScreen} />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.NEWSPAPER_ARCHIVES}
              element={
                <ProtectedRoute>
                  <CategoryResourcePage categoryId="newspaper" toggleFullScreen={toggleFullScreen} />
                </ProtectedRoute>
              }
            />

            {/* Protected Admin Route */}
            <Route
              path={ROUTES.ADMIN_DASHBOARD}
              element={
                <AdminRoute>
                  <AdminDashboard toggleFullScreen={toggleFullScreen} />
                </AdminRoute>
              }
            />

            {/* Catch-all 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </AppProviders>
  );
}

export default App;
