import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import AuthBackground from '../../components/auth/AuthBackground';
import GradientText from '../../components/common/GradientText';

const scaleIn = { hidden: { opacity: 0, scale: 0.85 }, visible: { opacity: 1, scale: 1 } };

export const Signup = () => {
  const navigate = useNavigate();
  const { signup, isAuthenticated, user: authUser } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
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
      const user = await signup({ name: fullName, email, password, role });
      const returnedRole = user?.role ? user.role.toLowerCase() : '';
      if (returnedRole === 'admin' || returnedRole === 'administrator') {
        navigate('/admin-dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Signup failed. Please try again.');
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
              Join National Educational Repository
            </motion.div>

            <motion.h1 variants={scaleIn} className="text-4xl xl:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
              Create Your Free Account & <GradientText>Unlock Knowledge</GradientText>.
            </motion.h1>
          </div>

          <div className="relative z-10 border-t border-white/10 pt-6">
            <p className="text-xs text-gray-500">© 2026 NDLI System. Built for educational excellence.</p>
          </div>
        </motion.div>

        {/* Right Form Panel */}
        <div className="flex-1 h-full bg-[#0B0F19] flex flex-col justify-between px-6 sm:px-12 md:px-16 py-10 overflow-y-auto relative z-10">
          <div className="max-w-md mx-auto w-full space-y-6 my-auto">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Create Account</h2>
              <p className="text-gray-400 text-sm mt-2">Get started with your free educational portal profile.</p>
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
                User Account
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
                Admin Account
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">Full Name</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-xl bg-[#131927] border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500 transition-all placeholder-gray-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full px-4 py-3 rounded-xl bg-[#131927] border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500 transition-all placeholder-gray-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">Password</label>
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
                className="w-full py-3.5 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold rounded-xl text-sm transition-all duration-300 shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 group disabled:opacity-50 mt-2"
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Create Account</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <p className="text-center text-xs text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-bold transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
