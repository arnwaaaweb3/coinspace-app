// src/components/AuthGateway.tsx
'use client';

import React, { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import Image from 'next/image';

interface AuthGatewayProps {
  onAuthSuccess: (accountName: string) => void;
}

export default function AuthGateway({ onAuthSuccess }: AuthGatewayProps) {
  const [accountName, setAccountName] = useState('');
  const [authMethod, setAuthMethod] = useState<'menu' | 'google' | 'custom'>('menu');
  const [loading, setLoading] = useState(false);

  // 🔥 GOOGLE LOGIN REAL
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      try {
        // Ambil data user dari Google
        const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        });
        const userData = await userInfo.json();

        // Kirim nama ke parent component
        onAuthSuccess(userData.name || 'Google User');
      } catch (error) {
        console.error('Google login error:', error);
        alert('Gagal login dengan Google. Coba lagi!');
      } finally {
        setLoading(false);
      }
    },
    onError: () => {
      alert('Login Google gagal!');
      setLoading(false);
    },
  });

  const handleGoogleLogin = () => {
    googleLogin(); // Panggil fungsi Google OAuth
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (accountName.trim()) {
      onAuthSuccess(accountName.trim());
    }
  };

  return (
    <div className="min-h-screen bg-[#fef4ea] flex items-center justify-center p-4 font-sans text-gray-800">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100 space-y-6 animate-fadeIn">
        <div className="text-center">
          <div className="flex justify-center mb-2">
            <Image
              src="/coinspace.png"
              alt="Coinspace Logo"
              width={80}
              height={80}
              className="object-contain"
              priority
            />
          </div>
          <h2 className="text-2xl font-black text-[#604cc3]">Coinspace</h2>
          <p className="text-sm text-gray-400 mt-1">Learn Your Way, Master Your Path</p>
        </div>

        {authMethod === 'menu' && (
          <div className="space-y-3">
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full py-3 px-4 border border-gray-300 rounded-xl font-medium text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors duration-200 disabled:opacity-50"
            >
              {loading ? (
                <span className="inline-block w-4 h-4 border-2 border-gray-700 border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12 5.04c1.64 0 3.12.56 4.28 1.67l3.2-3.2C17.52 1.58 14.96 1 12 1 7.35 1 3.37 3.65 1.41 7.56l3.8 2.95C6.17 7.23 8.87 5.04 12 5.04z" />
                  <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.51h6.46c-.29 1.48-1.14 2.73-2.4 3.58l3.73 2.89c2.18-2.01 3.7-4.98 3.7-8.62z" />
                  <path fill="#FBBC05" d="M5.21 14.51c-.24-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29L1.41 6.98C.51 8.79 0 10.83 0 13s.51 4.21 1.41 6.02l3.8-2.51z" />
                  <path fill="#34A353" d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.73-2.89c-1.03.69-2.35 1.11-4.23 1.11-3.13 0-5.83-2.19-6.79-5.47L1.41 16.3C3.37 20.21 7.35 23 12 23z" />
                </svg>
              )}
              {loading ? 'Memproses...' : 'Masuk dengan Google'}
            </button>

            {/* 🔥 DIVIDER DENGAN TULISAN "or" */}
            <div className="relative flex items-center">
              <div className="grow border-t border-gray-300"></div>
              <span className="shrink mx-4 text-sm text-gray-400 font-medium tracking-wider">
                or
              </span>
              <div className="grow border-t border-gray-300"></div>
            </div>

            <button
              onClick={() => setAuthMethod('custom')}
              className="w-full py-3 px-4 bg-[#604cc3] hover:bg-[#4f3da3] text-white rounded-xl font-medium text-sm shadow-md transition-colors duration-200"
            >
              Create Account
            </button>
          </div>
        )}

        {authMethod === 'custom' && (
          <form onSubmit={handleCustomSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">Nama Akun / Creator Name</label>
              <input
                type="text"
                required
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                placeholder="Masukkan nama tampilan kamu..."
                className="w-full px-4 py-2.5 text-sm border rounded-xl focus:ring-2 focus:ring-purple-400 focus:outline-none"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setAuthMethod('menu')}
                className="w-1/3 py-2.5 text-sm font-semibold text-gray-500 hover:text-gray-700 border border-gray-200 rounded-xl"
              >
                Kembali
              </button>
              <button
                type="submit"
                className="w-2/3 py-2.5 text-sm font-semibold text-white bg-[#604cc3] rounded-xl hover:bg-[#4f3da3] transition-colors duration-200 shadow-md"
              >
                Simpan & Lanjut
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}