// src/components/dashboard/DashboardHeader.tsx
'use client';

import CustomWalletButton from '@/src/components/CustomWalletConnect';

// Definisikan interface props agar dibaca oleh TypeScript
interface DashboardHeaderProps {
  profileName: string;
  onLogout?: () => void; // Tambahkan callback logout
}

export default function DashboardHeader({ profileName, onLogout }: DashboardHeaderProps) {
  const handleLogout = () => {
    // Hapus session dari localStorage
    localStorage.removeItem('coinspace_web2_session');
    
    // Kalau ada callback, panggil
    if (onLogout) {
      onLogout();
    }
    
    // Refresh halaman biar balik ke AuthGateway
    window.location.reload();
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-200 gap-4">
      <div>
        {/* Personalized text menggunakan props profileName */}
        <h1 className="text-2xl font-bold text-purple-600">Hi, {profileName}!</h1>
        <p className="text-sm text-gray-500">Manage your published modules and earnings</p>
      </div>
      
      <div className="flex items-center gap-3">
        {/* Tombol Logout */}
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200 flex items-center gap-2 border border-red-200 hover:border-red-300"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
        
        {/* Wallet Button */}
        <CustomWalletButton />
      </div>
    </div>
  );
}