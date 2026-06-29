// src/hooks/useWalletManagement.ts
import { useState } from 'react';
import { useWallets, useConnectWallet, useDisconnectWallet, useCurrentAccount } from '@mysten/dapp-kit';

// Export tipe biar bisa dipake di komponen lain
export type Wallet = ReturnType<typeof useWallets>[number];

export function useWalletManagement() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const wallets = useWallets();
  const { mutate: connect } = useConnectWallet();
  const { mutate: disconnect } = useDisconnectWallet();
  const account = useCurrentAccount();

  const handleConnect = (wallet: Wallet) => {
    connect(
      { wallet },
      {
        onSuccess: () => {
          setIsDropdownOpen(false);
        },
        onError: (error) => {
          console.error('Connection failed via dapp-kit:', error);
          alert(`Failed to connect to ${wallet.name}. Please unlock your wallet extension first.`);
        },
      }
    );
  };

  const handleDisconnect = () => {
    try {
      disconnect();
      setIsDropdownOpen(false);
    } catch (error) {
      console.error('Failed to disconnect:', error);
    }
  };

  return {
    wallets,
    account,
    isDropdownOpen,
    setIsDropdownOpen,
    handleConnect,
    handleDisconnect,
  };
}