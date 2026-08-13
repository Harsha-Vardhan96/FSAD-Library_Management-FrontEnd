import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, GraduationCap, Microscope, Briefcase, Theater, Sparkles, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import AuthBackground from '../../components/auth/AuthBackground';
import GradientText from '../../components/common/GradientText';

const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

const scaleIn = { hidden: { opacity: 0, scale: 0.85 }, visible: { opacity: 1, scale: 1 } };

export const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, user: authUser } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => setMounted(true), 10);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (isAuthenticated && authUser) {
      const r = authUser.role ? authUser.role.toLowerCase() : '';
      navigate(r === 'admin' || r === 'administrator' ? '/admin-dashboard' : '/dashboard', { replace: true });
    }
  }, [isAuthenticated, authUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const user = await login({ email: userInput, password, role });
      const returnedRole = user?.role ? user.role.toLowerCase() : '';
      if (returnedRole === 'admin' || returnedRole === 'administrator') {
        navigate('/admin-dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen overflow-hidden relative font-sans">
      <AuthBackground />
      <div className="relative z-10 flex w-full h-full">
        {/* Left Hero Panel */}
        <motion.div
          className="hidden lg:flex flex-col justify-between w-[55%] h-full px-16 py-14 relative overflow-hidden"
          initial="hidden"
          animate={mounted ? 'visible' : 'hidden'}
          transition={{ staggerChildren: 0.15, delayChildren: 0.2 }}
        >
          <div className="absolute inset-0 bg-[#090D16]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_20%_-20%,rgba(99,102,241,0.25),transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_80%_120%,rgba(236,72,153,0.18),transparent_70%)]" />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: 'radial-[#818cf8] 1px, transparent 1px',
              backgroundSize: '24px 24px',
            }}
          />
          <div className="relative z-10">
            <motion.div className="flex items-center gap-3" variants={scaleIn}>
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-[1.5px] shadow-lg shadow-indigo-500/30">
                <div className="w-full h-full bg-[#090D16] rounded-[14px] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-indigo-400" />
                </div>
              </div>
              <span className="text-xl font-bold text-white tracking-tight">NDLI Portal</span>
            </motion.div>
          </div>
          <div className="relative z-10 max-w-xl space-y-6">
            <motion.div variants={scaleIn} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
              National Digital Library of India
            </motion.div>

            <motion.h1 variants={scaleIn} className="text-4xl xl:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
              Access Millions of <GradientText>Educational Resources</GradientText> Anywhere.
            </motion.h1>

            <motion.p variants={scaleIn} className="text-gray-400 text-sm leading-relaxed">
              Single-window platform providing learning resources to any type of learner, from primary to post-graduate levels across all academic disciplines.
            </motion.p>
          </div>
          <div className="relative z-10 border-t border-white/10 pt-6">
            <p className="text-xs text-gray-500">© 2026 NDLI System. Built for educational excellence.</p>
          </div>
        </motion.div>

        {/* Right Form Panel */}
        <div className="flex-1 h-full bg-[#0B0F19] flex flex-col justify-between px-6 sm:px-12 md:px-16 py-10 overflow-y-auto relative z-10">
          <div className="max-w-md mx-auto w-full space-y-8 my-auto">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Sign In</h2>
              <p className="text-gray-400 text-sm mt-2">Welcome back! Please enter your credentials.</p>
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold">
                {error}
              </div>
            )}

            {/* Role Switcher */}
            <div className="flex bg-[#131927] p-1.5 rounded-2xl border border-white/5">
              <button
                type="button"
                onClick={() => setRole('user')}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  role === 'user'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                User Login
              </button>
              <button
                type="button"
                onClick={() => setRole('admin')}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  role === 'admin'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Admin Login
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-2">Email Address</label>
                <input
                  type="email"
                  required
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full px-4 py-3 rounded-xl bg-[#131927] border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500 transition-all placeholder-gray-500"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-semibold text-gray-300">Password</label>
                  <Link to="/forgot-password" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors font-medium">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-xl bg-[#131927] border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500 transition-all placeholder-gray-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold rounded-xl text-sm transition-all duration-300 shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 group disabled:opacity-50"
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <p className="text-center text-xs text-gray-400">
              Don't have an account?{' '}
              <Link to="/signup" className="text-indigo-400 hover:text-indigo-300 font-bold transition-colors">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
