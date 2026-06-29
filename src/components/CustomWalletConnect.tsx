// src/components/CustomWalletConnect.tsx
'use client';

import ConnectedWalletStatus from '@/src/components/wallet/ConnectedWalletStatus';
import WalletSelector from '@/src/components/wallet/WalletSelector';
import { useWalletManagement } from '@/src/hooks/useWalletManagement';

interface CustomWalletButtonProps {
  className?: string;
}

export default function CustomWalletButton({ className = '' }: CustomWalletButtonProps) {
  const {
    wallets,
    account,
    isDropdownOpen,
    setIsDropdownOpen,
    handleConnect,
    handleDisconnect,
  } = useWalletManagement();

  // Connected state
  if (account) {
    return <ConnectedWalletStatus address={account.address} onDisconnect={handleDisconnect} />;
  }

  // Disconnected state
  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-md"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        Connect Wallet
      </button>

      {isDropdownOpen && (
        <WalletSelector 
          wallets={wallets} 
          onSelect={handleConnect} 
          onClose={() => setIsDropdownOpen(false)} 
        />
      )}
    </div>
  );
}