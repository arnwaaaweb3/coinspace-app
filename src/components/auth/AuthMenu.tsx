// src/components/auth/AuthMenu.tsx
'use client';

import { useState } from 'react';
import { GoogleLoginButton } from './GoogleLoginButton';
import { Divider } from '@/src/components/ui/Divider';

interface Props {
  onAuthSuccess: (name: string) => void;
  onEmailPasswordSubmit: (email: string, password: string) => void;
  isLoading?: boolean;
}

export const AuthMenu = ({ 
  onAuthSuccess, 
  onEmailPasswordSubmit, 
  isLoading = false 
}: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && password.trim()) {
      onEmailPasswordSubmit(email.trim(), password.trim());
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="space-y-3">
      {/* Google Login */}
      <GoogleLoginButton onAuthSuccess={onAuthSuccess} />
      
      <Divider text="or" />
      
      {/* Email & Password Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">
            Enter your email address
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            disabled={isLoading}
            className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#604cc3] focus:border-[#604cc3] focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password..."
            disabled={isLoading}
            className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#604cc3] focus:border-[#604cc3] focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed pr-12"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              // Eye open icon (password visible)
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            ) : (
              // Eye closed icon (password hidden)
              <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                <line x1="1" y1="1" x2="23" y2="23"/>
              </svg>
            )}
          </button>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-4 bg-[#604cc3] hover:bg-[#4f3da3] disabled:bg-[#604cc3]/50 text-white rounded-xl font-medium text-sm shadow-md transition-colors duration-200 cursor-pointer"
        >
          {isLoading ? 'Creating Account...' : 'Create New Account'}
        </button>
      </form>
    </div>
  );
};