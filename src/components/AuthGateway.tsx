// src/components/AuthGateway.tsx
'use client';

import { useState } from 'react';
import { AuthLayout } from './auth/AuthLayout';
import { AuthHeader } from './auth/AuthHeader';
import { AuthMenu } from './auth/AuthMenu';
import { CustomAuthForm } from './auth/CustomAuthForm';

interface AuthGatewayProps {
  onAuthSuccess: (accountName: string) => void;
}

export default function AuthGateway({ onAuthSuccess }: AuthGatewayProps) {
  const [tempEmail, setTempEmail] = useState('');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const handleEmailPasswordSubmit = async (email: string, password: string) => {
    // 1. Simpan email & password ke DB
    console.log('Saving to DB:', { email, password });
    
    // 2. Simpan email sementara
    setTempEmail(email);
    
    // 3. Buka modal profile
    setIsProfileModalOpen(true);
  };

  const handleProfileSubmit = async (name: string) => {
    // 4. Simpan name ke DB
    console.log('Saving profile:', { name, email: tempEmail });
    
    // 5. Tutup modal
    setIsProfileModalOpen(false);
    
    // 6. Auth success
    onAuthSuccess(name);
  };

  const handleCloseModal = () => {
    setIsProfileModalOpen(false);
  };

  return (
    <>
      {/* Halaman Utama */}
      <AuthLayout>
        <AuthHeader />

        <AuthMenu
          onAuthSuccess={onAuthSuccess}
          onEmailPasswordSubmit={handleEmailPasswordSubmit}
        />

        <p className="text-center text-xs text-gray-400 mt-1">
          By using our services, you agreed to our{' '}
          <a href="#" className="text-[#604cc3] hover:underline">
            Terms & Conditions
          </a>
        </p>
      </AuthLayout>

      {/* Modal Profile */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Background blur overlay */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-md"
            onClick={handleCloseModal}
          />
          
          {/* Modal container */}
          <div className="relative z-10 w-full max-w-md mx-4 animate-in fade-in zoom-in duration-300">
            <div className="bg-white rounded-2xl shadow-2xl p-6">
              {/* Header modal */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">
                  Complete Your Profile
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Close modal"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>

              {/* Form */}
              <CustomAuthForm
                onSubmit={handleProfileSubmit}
                onBack={handleCloseModal}
                email={tempEmail}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}