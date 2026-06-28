// src/components/CustomWalletButton.tsx
'use client';

import React, { useState } from 'react';
import { useWalletKit } from '@mysten/wallet-kit';
import { useCurrentAccount } from '@mysten/dapp-kit';
import Image from 'next/image';

interface CustomWalletButtonProps {
  className?: string;
}

// Tipe dari wallet yang dikembalikan oleh useWalletKit
interface WalletKitWallet {
  name: string;
  icon?: string;
  installed?: boolean;
}

export default function CustomWalletButton({ className = '' }: CustomWalletButtonProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const { wallets, connect, currentWallet, disconnect, status } = useWalletKit();
  const account = useCurrentAccount();

  // Format address
  const formatAddress = (addr: string) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  // Handle connect ke wallet tertentu
  const handleConnect = async (walletName: string) => {
    try {
      await connect(walletName);
      setIsDropdownOpen(false);
    } catch (error) {
      console.error('Failed to connect:', error);
      alert('Failed to connect wallet. Please try again.');
    }
  };

  // Handle disconnect
  const handleDisconnect = async () => {
    try {
      await disconnect();
      setIsDropdownOpen(false);
    } catch (error) {
      console.error('Failed to disconnect:', error);
    }
  };

  // Jika sudah connected
  if (status === ('connected' as typeof status) && account) {
    return (
      <div className={`relative ${className}`}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-2 bg-green-50 hover:bg-green-100 px-4 py-2.5 rounded-xl border border-green-300 transition-all duration-200 group"
        >
          <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm font-semibold text-green-700">
            {formatAddress(account.address)}
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

        {/* Dropdown untuk disconnect */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-50 animate-fadeIn">
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="text-xs text-gray-500">Connected to {currentWallet?.name}</p>
            </div>
            <button
              onClick={handleDisconnect}
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

  // Jika belum connected - tampilkan tombol dengan dropdown wallet list
  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="bg-linear-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        Connect Wallet
      </button>

      {/* Dropdown list wallet */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50 max-h-96 overflow-y-auto animate-fadeIn">
          <div className="px-4 py-2.5 border-b border-gray-100">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Select Wallet</p>
            <p className="text-xs text-gray-400 mt-0.5">Choose your preferred Sui wallet</p>
          </div>
          
          {wallets.length === 0 ? (
            <div className="px-4 py-6 text-center">
              <div className="text-4xl mb-2">🦊</div>
              <p className="text-sm font-medium text-gray-700">No wallet detected</p>
              <p className="text-xs text-gray-500 mt-1">Please install a Sui wallet extension</p>
              <div className="mt-3 space-x-2">
                <a 
                  href="https://chrome.google.com/webstore/detail/sui-wallet/opcgpfmipidbgpenhmajoajpbobppdil" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-purple-600 hover:text-purple-700 underline"
                >
                  Sui Wallet
                </a>
                <a 
                  href="https://suiet.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-purple-600 hover:text-purple-700 underline"
                >
                  Suiet
                </a>
                <a 
                  href="https://okx.com/download" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-purple-600 hover:text-purple-700 underline"
                >
                  OKX
                </a>
              </div>
            </div>
          ) : (
            wallets.map((wallet: WalletKitWallet) => {
              const isInstalled = wallet.installed ?? false;
              
              return (
                <button
                  key={wallet.name}
                  onClick={() => handleConnect(wallet.name)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-purple-50 transition-colors duration-150 group"
                  disabled={!isInstalled}
                >
                  {/* Wallet Icon */}
                  {wallet.icon ? (
                    <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 bg-gray-100">
                      <Image 
                        src={wallet.icon} 
                        alt={wallet.name} 
                        fill
                        className="object-cover"
                        onError={(e) => {
                          const target = e.currentTarget as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-sm shrink-0">
                      {wallet.name.charAt(0)}
                    </div>
                  )}
                  
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium text-gray-800">{wallet.name}</p>
                    <p className="text-xs text-gray-500">
                      {isInstalled ? '✓ Installed' : 'Not installed'}
                    </p>
                  </div>
                  
                  {isInstalled && (
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  )}
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}