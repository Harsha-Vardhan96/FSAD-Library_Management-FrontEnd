import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { requestPasswordReset, resetPassword } from '../../services/api';
import AuthBackground from '../../components/auth/AuthBackground';
import GradientText from '../../components/common/GradientText';

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const response = await requestPasswordReset(email);
      setSuccess(response.message || 'OTP sent to your email.');
      setStep(2);
    } catch (err) {
      setError(err.message || 'Failed to send OTP.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const response = await resetPassword(email, otp, newPassword);
      setSuccess(response.message || 'Password reset successful.');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.message || 'Failed to reset password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen overflow-hidden relative font-sans">
      <AuthBackground />
      <div className="relative z-10 flex w-full h-full">
        {/* Left Hero Panel */}
        <div className="hidden lg:flex flex-col justify-between w-[55%] h-full px-16 py-14 relative overflow-hidden bg-[#090D16]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-[1.5px]">
              <div className="w-full h-full bg-[#090D16] rounded-[14px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-indigo-400" />
              </div>
            </div>
            <span className="text-xl font-bold text-white tracking-tight">NDLI Portal</span>
          </div>

          <div className="max-w-xl space-y-6">
            <h1 className="text-4xl font-extrabold text-white tracking-tight leading-tight">
              Password Recovery <GradientText>& Account Security</GradientText>
            </h1>
            <p className="text-gray-400 text-sm leading-relaxed">
              Enter your registered email address to receive a 6-digit verification OTP and safely reset your password.
            </p>
          </div>

          <p className="text-xs text-gray-500">© 2026 NDLI System.</p>
        </div>

        {/* Right Form Panel */}
        <div className="flex-1 h-full bg-[#0B0F19] flex flex-col justify-between px-6 sm:px-12 md:px-16 py-10 overflow-y-auto">
          <div className="max-w-md mx-auto w-full space-y-6 my-auto">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {step === 1 ? 'Forgot Password' : 'Reset Password'}
              </h2>
              <p className="text-gray-400 text-sm mt-2">
                {step === 1 ? 'Enter your account email address below.' : `Enter the OTP sent to ${email}`}
              </p>
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold">
                {error}
              </div>
            )}
            {success && (
              <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-semibold">
                {success}
              </div>
            )}

            {step === 1 ? (
              <form onSubmit={handleRequestOtp} className="space-y-4">
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
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold rounded-xl text-sm transition-all duration-300 shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 group disabled:opacity-50"
                >
                  {loading ? (
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Send OTP</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">Enter 6-Digit OTP</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="123456"
                    className="w-full px-4 py-3 rounded-xl bg-[#131927] border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500 transition-all placeholder-gray-500 font-mono tracking-widest text-center"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">New Password</label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-xl bg-[#131927] border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500 transition-all placeholder-gray-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold rounded-xl text-sm transition-all duration-300 shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 group disabled:opacity-50"
                >
                  {loading ? (
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <span>Reset Password</span>
                  )}
                </button>
              </form>
            )}

            <p className="text-center text-xs text-gray-400">
              Remember your password?{' '}
              <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-bold transition-colors">
                Back to Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
