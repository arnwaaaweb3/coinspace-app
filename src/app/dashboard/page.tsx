// app/page.tsx (atau HomeDashboard.tsx)
'use client';

import React, { useState, useEffect } from 'react';
import { SuiClientProvider, WalletProvider, createNetworkConfig } from '@mysten/dapp-kit';
import { getJsonRpcFullnodeUrl } from '@mysten/sui/jsonRpc';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AuthGateway from '@/src/components/AuthGateway';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import DashboardHeader from '@/src/components/dashboard/DashboardHeader';
import StatisticsCards from '@/src/components/dashboard/StatisticsCards';
import PublishModuleForm from '@/src/components/dashboard/PublishModuleForm';
import ModuleGrid from '@/src/components/dashboard/ModuleGrid';
import { useLocalStorage } from '@/src/hooks/useLocalStorage';
import { useModuleStats } from '@/src/hooks/useModuleStats';
import { PublishedModule } from '@/src/types';

const { networkConfig } = createNetworkConfig({
  localnet: {
    network: 'localnet',
    url: getJsonRpcFullnodeUrl('localnet'),
  },
  mainnet: {
    network: 'mainnet',
    url: getJsonRpcFullnodeUrl('mainnet'),
  },
});

const queryClient = new QueryClient();

export default function HomeDashboard() {
  const [myModules, setMyModules] = useLocalStorage('myModules', []);
  const { totalEarnings, totalSales } = useModuleStats(myModules);

  // 1. Baca localStorage langsung saat init menggunakan lazy initializer (Aman dari cascading render)
  const [profileName, setProfileName] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('coinspace_web2_session');
    }
    return null;
  });
  
  // State pembantu hidrasi Next.js
  const [isMounted, setIsMounted] = useState(false);

  // 2. SOLUSI ESLINT: Di dalam useEffect HANYA nyalakan mount status, JANGAN panggil setState profil secara sinkron!
  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setIsMounted(true);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  const handleAuthSuccess = (name: string) => {
    localStorage.setItem('coinspace_web2_session', name);
    setProfileName(name);
  };

  const handlePublish = (newModule: PublishedModule) => {
    setMyModules([newModule, ...myModules]);
  };

  const handleLogout = () => {
    setProfileName(null);
  };

  // 🔥 GOOGLE CLIENT ID - Ambil dari environment variable
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';

  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networkConfig} defaultNetwork="localnet">
        <WalletProvider autoConnect>
          
          {/* 🔥 BUNGKUS DENGAN GoogleOAuthProvider */}
          <GoogleOAuthProvider clientId={googleClientId}>
            {/* Trik Two-Pass: Tampilkan Loading kosong di server, ganti ke UI asli begitu isMounted true di browser */}
            {!isMounted ? (
              <div className="min-h-screen bg-gray-50 flex items-center justify-center font-sans text-gray-400 text-sm">
                Loading...
              </div>
            ) : !profileName ? (
              /* JIKA BELUM LOGIN WEB2 */
              <AuthGateway onAuthSuccess={handleAuthSuccess} />
            ) : (
              /* JIKA SUDAH LOGIN WEB2 */
              <div className="min-h-screen bg-gray-50 p-6 md:p-12 font-sans text-gray-800">
                <div className="max-w-6xl mx-auto space-y-8">
                  
                  <DashboardHeader 
                    profileName={profileName} 
                    onLogout={handleLogout} 
                  />
                  
                  <StatisticsCards 
                    totalEarnings={totalEarnings} 
                    totalSales={totalSales} 
                  />
                  
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <PublishModuleForm onPublish={handlePublish} />
                    <ModuleGrid modules={myModules} />
                  </div>
                </div>
              </div>
            )}
          </GoogleOAuthProvider>
          
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
}