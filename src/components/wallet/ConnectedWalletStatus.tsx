//  src/components/wallet/ConnectedWalletStatus.tsx
'use client';

import { useState } from 'react';
import { formatAddress } from '@/src/utils/formatAddress';

interface ConnectedWalletStatusProps {
  address: string;
  onDisconnect: () => void;
}

export default function ConnectedWalletStatus({ address, onDisconnect }: ConnectedWalletStatusProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center gap-2 bg-green-50 hover:bg-green-100 px-4 py-2.5 rounded-xl border border-green-300 transition-all duration-200"
      >
        <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
        <span className="text-sm font-semibold text-green-700">
          {formatAddress(address)}
        </span>
        <svg 
          className={`w-4 h-4 text-green-600 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-50">
          <button
            onClick={() => {
              onDisconnect();
              setIsDropdownOpen(false);
            }}
            className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
}