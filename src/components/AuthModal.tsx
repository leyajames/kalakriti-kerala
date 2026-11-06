import React, { useState } from 'react';
import { useCultural } from '../context/CulturalContext';
import { registerUser, loginUser, isSupabaseConfigured } from '../lib/supabase';
import { UserRole } from '../lib/database.types';
import { 
  X, 
  Mail, 
  Lock, 
  User, 
  CheckCircle, 
  ShieldCheck, 
  Flame, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  Sparkles,
  Database,
  ArrowRight
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, language, setUser, user } = useCultural();
  
  const [authMode, setAuthMode] = useState<'LOGIN' | 'SIGNUP'>('LOGIN');
  const [selectedRole, setSelectedRole] = useState<UserRole>('registered_user');
  
  // Form fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // UI states
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successText, setSuccessText] = useState('');

  if (!isAuthModalOpen) return null;

  const isConnected = isSupabaseConfigured();

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // 1. Client-Side Input Validation
    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!password || password.length < 6) {
      setErrorMessage('Password must contain at least 6 characters.');
      return;
    }

    if (authMode === 'SIGNUP') {
      if (!fullName.trim()) {
        setErrorMessage('Full name is required to create a profile.');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match. Please re-enter.');
        return;
      }
    }

    setIsLoading(true);

    try {
      if (authMode === 'SIGNUP') {
        const { user: authUser, error } = await registerUser(
          email.trim(),
          password,
          fullName.trim(),
          selectedRole
        );

        if (error) {
          setErrorMessage(error);
          setIsLoading(false);
          return;
        }

        const newUserProfile = {
          id: authUser?.id,
          name: fullName.trim(),
          email: email.trim(),
          role: selectedRole,
        };

        setUser(newUserProfile);
        try {
          localStorage.setItem('kalakriti_user', JSON.stringify(newUserProfile));
        } catch {}

        setSuccessText(`Account created as ${selectedRole.replace('_', ' ').toUpperCase()}! Welcome to KALAKRITI.`);
        setIsSuccess(true);

        setTimeout(() => {
          setIsSuccess(false);
          setIsAuthModalOpen(false);
        }, 1600);

      } else {
        // LOGIN
        const { user: authUser, error } = await loginUser(email.trim(), password);

        if (error) {
          setErrorMessage(error);
          setIsLoading(false);
          return;
        }

        const userRole = (authUser?.user_metadata?.role as UserRole) || selectedRole || 'registered_user';
        const loggedInUser = {
          id: authUser?.id,
          name: authUser?.user_metadata?.full_name || email.split('@')[0],
          email: email.trim(),
          role: userRole,
        };

        setUser(loggedInUser);
        try {
          localStorage.setItem('kalakriti_user', JSON.stringify(loggedInUser));
        } catch {}

        setSuccessText(`Authenticated securely! Logged in as ${userRole.replace('_', ' ')}.`);
        setIsSuccess(true);

        setTimeout(() => {
          setIsSuccess(false);
          setIsAuthModalOpen(false);
        }, 1400);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
      className="fixed inset-0 z-70 overflow-y-auto bg-deep-brown/85 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn select-none"
    >
      <div className="relative w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-cultural border-2 border-cream-gold my-6">
        
        {/* Top Heritage Gold Bar */}
        <div className="h-2 bg-gradient-to-r from-traditional-red via-cream-gold to-terracotta" />

        {/* Modal Header */}
        <div className="p-6 pb-4 bg-parchment-warm border-b border-warm-sand/30 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-deep-brown text-cream-gold flex items-center justify-center border border-cream-gold shadow-sm">
              <Flame className="w-5 h-5 text-cream-gold" />
            </div>
            <div>
              <h3 id="auth-modal-title" className="font-display text-xl font-bold text-deep-brown">
                {authMode === 'LOGIN' ? 'Sign In to KALAKRITI' : 'Create Your Account'}
              </h3>
              <p className="text-[11px] text-olive-green font-medium">
                {language === 'en' ? 'Thrissur Cultural Sanctuary' : 'തൃശ്ശൂർ സാംസ്കാരിക കൂട്ടായ്മ'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAuthModalOpen(false)}
            aria-label="Close authentication modal"
            className="p-1.5 rounded-full hover:bg-white text-deep-brown/60 hover:text-traditional-red transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Connection Status Pill */}
        <div className="px-6 py-2 bg-parchment border-b border-warm-sand/30 flex items-center justify-between text-[11px]">
          <div className="flex items-center space-x-1.5 text-deep-brown/70">
            <Database className="w-3.5 h-3.5 text-terracotta" />
            <span>Supabase PostgreSQL Auth</span>
          </div>

          <span className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded-full font-bold text-[10px] ${
            isConnected
              ? 'bg-olive-green/20 text-olive-green'
              : 'bg-cream-gold/40 text-deep-brown'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isConnected ? 'bg-olive-green' : 'bg-terracotta'}`} />
            <span>{isConnected ? 'Supabase Live' : 'Local Dev Sync'}</span>
          </span>
        </div>

        {/* Auth Mode Tabs (Sign In vs Sign Up) */}
        <div className="grid grid-cols-2 border-b border-warm-sand/30 bg-white">
          <button
            type="button"
            onClick={() => { setAuthMode('LOGIN'); setErrorMessage(null); }}
            className={`py-3 text-xs font-bold transition-all border-b-2 ${
              authMode === 'LOGIN'
                ? 'border-traditional-red text-traditional-red bg-parchment-warm/40'
                : 'border-transparent text-deep-brown/60 hover:text-deep-brown'
            }`}
          >
            Sign In (ലോഗിൻ)
          </button>

          <button
            type="button"
            onClick={() => { setAuthMode('SIGNUP'); setErrorMessage(null); }}
            className={`py-3 text-xs font-bold transition-all border-b-2 ${
              authMode === 'SIGNUP'
                ? 'border-traditional-red text-traditional-red bg-parchment-warm/40'
                : 'border-transparent text-deep-brown/60 hover:text-deep-brown'
            }`}
          >
            Register (പുതിയ അക്കൗണ്ട്)
          </button>
        </div>

        {/* Body Content */}
        {isSuccess ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-olive-green/20 text-olive-green flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h4 className="font-display text-xl font-bold text-deep-brown">
              Authentication Success!
            </h4>
            <p className="text-xs text-deep-brown/80 max-w-xs mx-auto">
              {successText}
            </p>
          </div>
        ) : (
          <form onSubmit={handleAuthSubmit} className="p-6 space-y-4">
            
            {/* Error Banner */}
            {errorMessage && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-traditional-red text-xs flex items-start space-x-2 animate-shake">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <p className="leading-snug">{errorMessage}</p>
              </div>
            )}

            {/* Role Selection (on Register) */}
            {authMode === 'SIGNUP' && (
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-deep-brown flex items-center justify-between">
                  <span>Select Your Role *</span>
                  <span className="text-[10px] text-terracotta">RLS Permissions Applied</span>
                </label>
                
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedRole('registered_user')}
                    className={`p-2 rounded-xl text-center border text-xs font-semibold transition-all ${
                      selectedRole === 'registered_user'
                        ? 'border-traditional-red bg-traditional-red/10 text-traditional-red font-bold'
                        : 'border-warm-sand/40 bg-parchment-warm text-deep-brown/70 hover:bg-white'
                    }`}
                  >
                    <User className="w-4 h-4 mx-auto mb-1 text-olive-green" />
                    <span className="block text-[11px]">User</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedRole('artist')}
                    className={`p-2 rounded-xl text-center border text-xs font-semibold transition-all ${
                      selectedRole === 'artist'
                        ? 'border-traditional-red bg-traditional-red/10 text-traditional-red font-bold'
                        : 'border-warm-sand/40 bg-parchment-warm text-deep-brown/70 hover:bg-white'
                    }`}
                  >
                    <Sparkles className="w-4 h-4 mx-auto mb-1 text-terracotta" />
                    <span className="block text-[11px]">Artist</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedRole('admin')}
                    className={`p-2 rounded-xl text-center border text-xs font-semibold transition-all ${
                      selectedRole === 'admin'
                        ? 'border-traditional-red bg-traditional-red/10 text-traditional-red font-bold'
                        : 'border-warm-sand/40 bg-parchment-warm text-deep-brown/70 hover:bg-white'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4 mx-auto mb-1 text-traditional-red" />
                    <span className="block text-[11px]">Admin</span>
                  </button>
                </div>

                <p className="text-[10px] text-deep-brown/60 italic pt-0.5">
                  {selectedRole === 'registered_user' && 'Submit cultural listings, bookmark festivals, and write reviews.'}
                  {selectedRole === 'artist' && 'Showcase traditional artwork, receive inquiries, and manage portfolio.'}
                  {selectedRole === 'admin' && 'Access the Curation Desk to review, approve, and moderate submissions.'}
                </p>
              </div>
            )}

            {/* Full Name (Sign Up only) */}
            {authMode === 'SIGNUP' && (
              <div className="space-y-1">
                <label className="text-xs font-bold text-deep-brown">Full Name *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-warm-sand absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Madhavan Namboodiri"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-warm-sand/50 text-xs text-deep-brown outline-none focus:border-traditional-red"
                  />
                </div>
              </div>
            )}

            {/* Email Address */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-deep-brown">Email Address *</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-warm-sand absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-warm-sand/50 text-xs text-deep-brown outline-none focus:border-traditional-red"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-deep-brown flex items-center justify-between">
                <span>Password *</span>
                <span className="text-[10px] text-deep-brown/50">Minimum 6 characters</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-warm-sand absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-warm-sand/50 text-xs text-deep-brown outline-none focus:border-traditional-red"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-deep-brown/50 hover:text-deep-brown"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password (Sign Up only) */}
            {authMode === 'SIGNUP' && (
              <div className="space-y-1">
                <label className="text-xs font-bold text-deep-brown">Confirm Password *</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-warm-sand absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter your password"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-warm-sand/50 text-xs text-deep-brown outline-none focus:border-traditional-red"
                  />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-traditional-red hover:bg-traditional-red-dark text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>{authMode === 'LOGIN' ? 'Sign In' : 'Create Account'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Quick Helper Text */}
            <p className="text-[10px] text-deep-brown/60 text-center pt-2 leading-relaxed">
              Passwords are cryptographically hashed and verified using Supabase Auth (Argon2 / bcrypt). Database secrets are never exposed to the client.
            </p>

          </form>
        )}

      </div>
    </div>
  );
};
