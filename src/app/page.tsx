'use client';

import React, { useState, useEffect, startTransition } from 'react';
import { WalletKitProvider } from '@mysten/wallet-kit';
import CustomWalletButton from '@/src/components/CustomWalletConnect';

// Interface untuk Published Modules
interface PublishedModule {
  id: string;
  title: string;
  price: number;
  sales: number;
}

export default function HomeDashboard() {
  // Form States
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Published modules state
  const [myModules, setMyModules] = useState<PublishedModule[]>([]);

  // Load modules from localStorage on mount
  useEffect(() => {
    const savedModules = localStorage.getItem('myModules');
    if (savedModules) {
      startTransition(() => {
        try {
          const parsedModules = JSON.parse(savedModules);
          setMyModules(parsedModules);
        } catch (error) {
          console.error('Error parsing saved modules:', error);
        }
      });
    }
  }, []);

  // Save modules to localStorage whenever they change
  useEffect(() => {
    if (myModules.length > 0) {
      localStorage.setItem('myModules', JSON.stringify(myModules));
    }
  }, [myModules]);

  // Statistics calculations
  const totalEarnings = myModules.reduce((acc, module) => acc + module.price * module.sales, 0);
  const totalSales = myModules.reduce((acc, module) => acc + module.sales, 0);

  // Handle publishing a new module
  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !file) {
      alert('Title and file are required!');
      return;
    }

    // File validation
    if (!['application/pdf', 'application/epub+zip', 'application/zip'].includes(file.type)) {
      alert('Invalid file type. Please upload a .pdf, .epub, or .zip file.');
      return;
    }

    setIsUploading(true);

    try {
      // Simulate upload process
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const newModule: PublishedModule = {
        id: Date.now().toString(),
        title: title,
        price: price,
        sales: 0,
      };

      setMyModules([newModule, ...myModules]);
      alert('Module published successfully!');

      // Reset form inputs
      setTitle('');
      setDescription('');
      setPrice(0);
      setFile(null);
    } catch (error) {
      console.error('Error publishing module:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <WalletKitProvider>
      <div className="min-h-screen bg-gray-50 p-6 md:p-12 font-sans text-gray-800">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Top Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-200 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-purple-600">Creator Dashboard</h1>
              <p className="text-sm text-gray-500">Manage your published modules and earnings</p>
            </div>
            <CustomWalletButton />
          </div>

          {/* Statistics Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-purple-600">
              <p className="text-xs font-bold text-gray-400 uppercase">Total Earnings</p>
              <p className="text-3xl font-black text-purple-600 mt-1">{totalEarnings.toFixed(1)} SUI</p>
              <p className="text-xs text-gray-500">Net revenue from all modules</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-orange-400">
              <p className="text-xs font-bold text-gray-400 uppercase">Modules Sold</p>
              <p className="text-3xl font-black text-orange-500 mt-1">{totalSales}</p>
              <p className="text-xs text-gray-500">Total sales across all modules</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-green-500">
              <p className="text-xs font-bold text-gray-400 uppercase">Storage Status</p>
              <p className="text-3xl font-black text-green-600 mt-1">100%</p>
              <p className="text-xs text-gray-500">Backed by decentralized storage</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Publish Form */}
            <div className="lg:col-span-5 bg-white p-6 rounded-2xl shadow-md">
              <h2 className="text-xl font-bold text-purple-600 mb-4">Publish New Module</h2>

              <form onSubmit={handlePublish} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter module title"
                    className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Briefly describe your module"
                    className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">File Upload</label>
                  <input
                    type="file"
                    accept=".pdf,.epub,.zip"
                    onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                    className="w-full text-sm text-gray-500 file:bg-purple-100 file:text-purple-600 file:border-none file:rounded-lg file:px-4 file:py-2 file:font-semibold hover:file:bg-purple-200"
                  />
                  <p className="text-xs text-gray-400 mt-1">Supported: PDF, EPUB, ZIP</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Price (SUI)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isUploading}
                  className="w-full py-3 text-sm font-bold text-white bg-purple-600 rounded-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  {isUploading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Uploading...
                    </span>
                  ) : (
                    'Publish Module'
                  )}
                </button>
              </form>
            </div>

            {/* Right: Published Modules */}
            <div className="lg:col-span-7">
              <h2 className="text-xl font-bold text-purple-600 mb-4">Published Modules</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {myModules.length === 0 ? (
                  <div className="col-span-2 bg-white p-8 rounded-lg shadow-md border border-gray-100 text-center">
                    <div className="text-4xl mb-3">📚</div>
                    <p className="text-sm text-gray-400">No modules published yet.</p>
                    <p className="text-xs text-gray-300 mt-1">Publish your first module to get started!</p>
                  </div>
                ) : (
                  myModules.map((mod) => (
                    <div key={mod.id} className="bg-white p-4 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-200">
                      <h3 className="text-lg font-bold text-gray-800 line-clamp-1">{mod.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-sm font-semibold ${mod.price === 0 ? 'text-green-600' : 'text-purple-600'}`}>
                          {mod.price === 0 ? 'Free' : `${mod.price} SUI`}
                        </span>
                        <span className="text-xs text-gray-300">•</span>
                        <span className="text-sm text-gray-500">Sales: {mod.sales}</span>
                      </div>
                      <div className="mt-3 flex gap-2">
                        <button className="text-xs text-purple-600 hover:text-purple-700 font-medium">
                          View
                        </button>
                        <button className="text-xs text-gray-400 hover:text-gray-600 font-medium">
                          Edit
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </WalletKitProvider>
  );
}