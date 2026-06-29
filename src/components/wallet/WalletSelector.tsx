// src/components/wallet/WalletSelector.tsx
'use client';

import Image from 'next/image';
import { useWallets } from '@mysten/dapp-kit';

// Ambil tipe wallet dari useWallets
type Wallet = ReturnType<typeof useWallets>[number];

interface WalletSelectorProps {
  wallets: Wallet[];
  onSelect: (wallet: Wallet) => void;
  onClose: () => void;
}

export default function WalletSelector({ wallets, onSelect, onClose }: WalletSelectorProps) {
  return (
    <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50 max-h-96 overflow-y-auto">
      <div className="px-4 py-2.5 border-b border-gray-100">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Select Wallet</p>
      </div>

      {wallets.length === 0 ? (
        <div className="px-4 py-6 text-center text-sm text-gray-500">
          No wallet detected. Please install Sui Wallet.
        </div>
      ) : (
        wallets.map((wallet) => (
          <button
            key={wallet.name}
            onClick={() => {
              onSelect(wallet);
              onClose();
            }}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-purple-50 transition-colors duration-150"
          >
            {wallet.icon && (
              <Image
                src={wallet.icon}
                alt={wallet.name}
                width={24}
                height={24}
                unoptimized
                className="object-contain"
              />
            )}
            <span className="text-sm font-medium text-gray-800">{wallet.name}</span>
          </button>
        ))
      )}
    </div>
  );
}