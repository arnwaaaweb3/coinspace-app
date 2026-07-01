// src/app/marketplace/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { SuiClientProvider, WalletProvider, createNetworkConfig } from '@mysten/dapp-kit';
import { getJsonRpcFullnodeUrl } from '@mysten/sui/jsonRpc';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useCurrentAccount, useSignAndExecuteTransaction } from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import CustomWalletButton from '@/src/components/CustomWalletConnect';
import Link from 'next/link';

// 🔥 Setup network config
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

interface PublishedModule {
  id: string;
  title: string;
  description?: string;
  price: number;
  sales: number;
  creatorAddress?: string;
}

// 🔥 Komponen Marketplace yang sebenarnya (dipisah biar bisa pake hooks)
function MarketplaceContent() {
  const [modules, setModules] = useState<PublishedModule[]>(() => {
    if (typeof window !== 'undefined') {
      const savedModules = localStorage.getItem('myModules');
      if (savedModules) {
        try {
          return JSON.parse(savedModules);
        } catch (e) {
          console.error('Error parsing modules:', e);
          return [];
        }
      }
    }
    return [];
  });

  const [isBuying, setIsBuying] = useState<string | null>(null);
  const account = useCurrentAccount(); // ✅ Sekarang aman karena ada WalletProvider
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction(); // ✅ Aman

  useEffect(() => {
    localStorage.setItem('myModules', JSON.stringify(modules));
  }, [modules]);

  const handleBuyModule = async (mod: PublishedModule) => {
    if (!account) {
      alert('🔴 Silakan hubungkan Sui Wallet kamu terlebih dahulu!');
      return;
    }

    if (isBuying === mod.id) return;
    setIsBuying(mod.id);

    try {
      const tx = new Transaction();
      
      if (mod.price > 0) {
        const priceInMist = Math.floor(mod.price * 1_000_000_000);
        const amountInMist = BigInt(priceInMist);
        const [coin] = tx.splitCoins(tx.gas, [amountInMist]);
        const targetAddress = mod.creatorAddress || account.address;
        tx.transferObjects([coin], targetAddress);
      }

      signAndExecuteTransaction(
        { transaction: tx },
        {
          onSuccess: (result) => {
            console.log('Transaction success:', result);
            alert(`✅ Sukses membeli modul "${mod.title}"! 
            
📦 Transaction ID: ${result.digest}`);
            
            const updated = modules.map((m) => 
              m.id === mod.id ? { ...m, sales: m.sales + 1 } : m
            );
            setModules(updated);
            setIsBuying(null);
          },
          onError: (err) => {
            console.error('Transaksi gagal:', err);
            const errorMessage = err instanceof Error ? err.message : 'Unknown error';
            if (errorMessage.includes('rejected')) {
              alert('❌ Transaksi dibatalkan oleh user.');
            } else if (errorMessage.includes('insufficient')) {
              alert('❌ Saldo SUI tidak mencukupi untuk transaksi ini.');
            } else {
              alert(`❌ Pembelian gagal: ${errorMessage}`);
            }
            setIsBuying(null);
          }
        }
      );
    } catch (error) {
      console.error('Buy error:', error);
      alert(`❌ Terjadi error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setIsBuying(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12 font-sans text-gray-800">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Marketplace */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-200 gap-4">
          <div>
            <h1 className="text-2xl font-black text-[#604cc3]">Coinspace Marketplace</h1>
            <p className="text-sm text-gray-500">Temukan modul berkualitas langsung dari penulis terpercaya</p>
          </div>
          <div className="flex items-center gap-3">
            <Link 
              href="/" 
              className="text-sm font-semibold text-gray-600 hover:text-[#604cc3] px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 transition-all hover:bg-gray-100"
            >
              Mode Kreator ✍️
            </Link>
            <CustomWalletButton />
          </div>
        </div>

        {/* Grid Modul */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-700">Modul & Karya Tersedia</h2>
            <span className="text-sm text-gray-400">{modules.length} modul</span>
          </div>
          
          {modules.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-center space-y-3">
              <div className="text-5xl">📚</div>
              <p className="text-sm text-gray-400 font-medium">Belum ada modul yang di-publish oleh kreator.</p>
              <p className="text-xs text-gray-300">Masuk ke Mode Kreator untuk menerbitkan karya pertamamu!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modules.map((mod) => (
                <div 
                  key={mod.id} 
                  className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-lg transition-shadow flex flex-col justify-between"
                >
                  <div className="p-6 space-y-3">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="text-lg font-bold text-gray-800 line-clamp-2">{mod.title}</h3>
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-bold shrink-0 ${
                        mod.price === 0 ? 'bg-green-50 text-green-600' : 'bg-purple-50 text-[#604cc3]'
                      }`}>
                        {mod.price === 0 ? 'FREE' : `${mod.price} SUI`}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 line-clamp-3">
                      {mod.description || 'Tidak ada deskripsi untuk modul ini.'}
                    </p>
                    <div className="text-xs text-gray-400 flex items-center gap-1">
                      <span>👤 {mod.creatorAddress ? 'Terpajang P2P' : 'Kreator'}</span>
                      <span>•</span>
                      <span>🔥 {mod.sales || 0} Terjual</span>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <button
                      onClick={() => handleBuyModule(mod)}
                      disabled={isBuying === mod.id}
                      className={`w-full py-3 text-center text-sm font-bold text-white rounded-xl shadow-md transition-all ${
                        isBuying === mod.id
                          ? 'bg-gray-400 cursor-not-allowed'
                          : mod.price === 0
                          ? 'bg-green-500 hover:bg-green-600'
                          : 'bg-[#ff7f3e] hover:bg-[#e66f32]'
                      }`}
                    >
                      {isBuying === mod.id ? (
                        <span className="flex items-center justify-center gap-2">
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                          Memproses...
                        </span>
                      ) : mod.price === 0 ? (
                        'Akses Gratis (Gas Fee)'
                      ) : (
                        'Beli Modul Sekarang'
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// 🔥 EXPORT: Bungkus MarketplaceContent dengan semua provider
export default function MarketplaceDashboard() {
  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networkConfig} defaultNetwork="localnet">
        <WalletProvider autoConnect>
          <MarketplaceContent />
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
}