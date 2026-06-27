'use client';

import React, { useState, useEffect } from 'react';
import { useWallet, WalletProvider } from '@suiet/wallet-kit';

interface PublishedModule {
  id: string;
  title: string;
  price: number;
  sales: number;
}

function ConnectWalletButton() {
  const wallet = useWallet();
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    if (wallet.connected && wallet.account) {
      setAddress(wallet.account.address);
    } else {
      setAddress(null);
    }
  }, [wallet.connected, wallet.account]);

  const handleConnect = async () => {
    try {
      if (!wallet.connected) {
        console.log(Object.keys(wallet));
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      alert('Failed to connect wallet. Please try again.');
    }
  };

  if (address) {
    const shortAddress = address.slice(0, 6) + '...' + address.slice(-4);
    return (
      <div className="flex items-center gap-3 bg-green-100 px-4 py-2 rounded-xl border border-green-300 cursor-default select-none">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <span className="text-xs font-semibold text-green-700">Connected: {shortAddress}</span>
      </div>
    );
  }

  return (
    <button
      onClick={handleConnect}
      className="bg-coin-purple text-white text-xs font-semibold px-4 py-2 rounded-xl hover:bg-coin-purple/90 transition"
    >
      Connect Wallet
    </button>
  );
}

export default function HomeDashboard() {
  // Form States
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Data Dummy Koleksi Buku Kreator agar langsung muncul visualisasi
  const [myModules, setMyModules] = useState<PublishedModule[]>([
    { id: '1', title: 'Basic Move Programming 101', price: 2.5, sales: 14 },
    { id: '2', title: 'Kitab Sakti Humas Digital (Undip Edition)', price: 0, sales: 128 },
    { id: '3', title: 'Advanced Sui Smart Contracts', price: 5.0, sales: 6 },
  ]);

  // Menghitung Statistik Ringkas
  const totalEarnings = myModules.reduce((acc, curr) => acc + (curr.price * curr.sales), 0);
  const totalSales = myModules.reduce((acc, curr) => acc + curr.sales, 0);

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !file) {
      alert('Title and file are required!');
      return;
    }

    setIsUploading(true);
    try {
      // Simulasi sukses untuk visualisasi sebelum SDK aktif
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      const newModule: PublishedModule = {
        id: Date.now().toString(),
        title: title,
        price: price,
        sales: 0,
      };

      setMyModules([newModule, ...myModules]);
      alert('Content successfully published!');
      
      // Reset Form
      setTitle('');
      setDescription('');
      setPrice(0);
      setFile(null);
    } catch (error) {
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <WalletProvider>
      <div className="min-h-screen bg-coin-cream p-6 md:p-12 font-sans text-gray-800">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* TOP BAR */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 rounded-2xl shadow-sm border border-coin-purple/5 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-coin-purple">Coinspace Creator Hub</h1>
              <p className="text-sm text-gray-400">Direct P2P intellectual property manager</p>
            </div>
            <div className="flex items-center gap-3">
              <ConnectWalletButton />
            </div>
          </div>

          {/* STATS SECTION */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-coin-purple">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Earnings</p>
              <p className="text-3xl font-black text-coin-purple mt-1">{totalEarnings.toFixed(1)} SUI</p>
              <p className="text-xs text-gray-400 mt-2">≈ 95% Cut Net Revenue</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-coin-orange">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Modules Distributed</p>
              <p className="text-3xl font-black text-coin-orange mt-1">{totalSales} Times</p>
              <p className="text-xs text-gray-400 mt-2">Direct P2P transactions recorded</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-green-500">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Storage Status</p>
              <p className="text-3xl font-black text-green-600 mt-1">100%</p>
              <p className="text-xs text-gray-400 mt-2">Permanent on Arweave Network</p>
            </div>
          </div>

          {/* MAIN BODY */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT SIDE: UPLOAD FORM */}
            <div className="lg:col-span-5 bg-white p-6 rounded-2xl shadow-md border border-coin-purple/5">
              <h2 className="text-xl font-bold text-coin-purple mb-1">Publish New Module</h2>
              <p className="text-xs text-gray-400 mb-6">Instantly locks into Arweave storage</p>
              
              <form onSubmit={handlePublish} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-coin-purple mb-1">Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Basic Move Programming"
                    className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-coin-orange transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-coin-purple mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe briefly what your idea is about."
                    className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-coin-orange transition-colors resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-coin-purple mb-1">Attach File (.pdf, .epub)</label>
                  <input
                    type="file"
                    accept=".pdf,.epub,.zip"
                    onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                    className="w-full text-xs text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-coin-purple/10 file:text-coin-purple hover:file:bg-coin-purple/20 cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-coin-purple mb-1">Price</label>
                  <div className="relative rounded-xl shadow-sm">
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      value={price}
                      onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-coin-orange transition-colors"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none font-bold text-xs text-coin-orange">
                      SUI
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1">Enter &apos;0&apos; if you want this module to be free.</p>
                </div>

                <button
                  type="submit"
                  disabled={isUploading}
                  className="w-full bg-coin-orange hover:bg-coin-orange/90 text-white text-sm font-bold py-3 px-4 rounded-xl transition-all shadow-md disabled:bg-gray-400"
                >
                  {isUploading ? 'Uploading....' : 'Your module is online!'}
                </button>
              </form>
            </div>

            {/* RIGHT SIDE: LIVE GRID LIST */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-coin-purple">Your Published Shelf</h2>
                <span className="text-xs bg-coin-orange/10 text-coin-orange font-bold px-2 py-1 rounded-md">
                  {myModules.length} Active Modules
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {myModules.map((mod) => (
                  <div key={mod.id} className="bg-white p-5 rounded-2xl shadow-sm border border-coin-purple/5 flex flex-col justify-between hover:shadow-md transition-shadow">
                    <div>
                      <span className={`inline-block text-[10px] font-extrabold px-2 py-0.5 rounded-full mb-3 ${mod.price === 0 ? 'bg-green-100 text-green-700' : 'bg-coin-orange/10 text-coin-orange'}`}>
                        {mod.price === 0 ? 'FREE ACCESS' : 'PAID ASSET'}
                      </span>
                      <h3 className="font-bold text-gray-800 text-sm line-clamp-2">{mod.title}</h3>
                    </div>
                    
                    <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
                      <div>
                        <p className="text-[10px] text-gray-400 font-medium">Sales Volume</p>
                        <p className="text-xs font-bold text-gray-700">{mod.sales} Readers</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-gray-400 font-medium">Price Tag</p>
                        <p className="text-sm font-black text-coin-purple">
                          {mod.price === 0 ? '0' : mod.price} <span className="text-[10px] font-bold">SUI</span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </WalletProvider>
  );
}