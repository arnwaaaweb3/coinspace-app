// src/app/page.tsx
'use client';

import React, { useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AuthGateway from '@/src/components/AuthGateway';

export default function Home() {
  const [userAccount, setUserAccount] = useState<string | null>(null);

  const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "1010101010-mockid.apps.googleusercontent.com";

  const handleAuthSuccess = (name: string) => {
    setUserAccount(name);
    console.log("Login sukses! User terautentikasi:", name);
  };

  const handleLogout = () => {
    setUserAccount(null);
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <main className="min-h-screen bg-[#fef4ea]">
        {!userAccount ? (
          <AuthGateway onAuthSuccess={handleAuthSuccess} />
        ) : (
          // Dashboard (tetap sama)
          <div className="min-h-screen flex flex-col items-center justify-center p-6 text-gray-800 animate-fadeIn">
            <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100 text-center space-y-6">
              <div className="w-20 h-20 bg-[#604cc3]/10 text-[#604cc3] rounded-full flex items-center justify-center mx-auto text-3xl font-black">
                {userAccount.charAt(0).toUpperCase()}
              </div>
              
              <div className="space-y-2">
                <h1 className="text-2xl font-black text-gray-900">Selamat Datang, Kreator!</h1>
                <p className="text-sm font-semibold text-[#604cc3] bg-[#604cc3]/5 py-1 px-3 rounded-full inline-block">
                  {userAccount}
                </p>
                <p className="text-xs text-gray-400">
                  Status Autentikasi: <span className="text-emerald-500 font-bold">Terhubung (Hybrid Layer)</span>
                </p>
              </div>

              <div className="border-t border-gray-100 pt-4 space-y-3">
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-left text-xs text-amber-800">
                  <strong>CTO Note for Inspect:</strong> Wallet abstrak Sui (zkLogin) akan di-generate otomatis di latar belakang menggunakan data Google Token.
                </div>
                
                <button
                  onClick={handleLogout}
                  className="w-full py-2.5 text-sm font-semibold text-white bg-[#ff7f3e] hover:bg-[#e66f30] rounded-xl transition-colors duration-200 shadow-md"
                >
                  Keluar / Reset State
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </GoogleOAuthProvider>
  );
}