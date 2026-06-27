'use client';

import React, { useState } from 'react';

export default function UploadModulePage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !file) {
      alert('Title field are required!');
      return;
    }

    setIsUploading(true);
    try {
      // TODO CTO NOTE:
      // 1. Tembak file utama ke Arweave via Irys Network.
      // 2. Dapatkan IPFS/Arweave Hash dari file tersebut.
      // 3. Panggil Smart Contract Sui (register_module) menggunakan Sui SDK.
      
      console.log('Content to be published:', { title, description, price, file });
      alert('Content successfully published!');
    } catch (error) {
      console.error('Failed to publish content:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-coin-cream p-8 flex justify-center items-center">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl border border-coin-purple/10">
        
        {/* Header Form */}
        <h1 className="text-3xl font-bold text-coin-purple mb-2">Publish your idea to a module book!</h1>
        <p className="text-gray-500 mb-8">Turn your knowledge into a digital asset that can be accessed by anyone without a fee.</p>

        <form onSubmit={handlePublish} className="space-y-6">
          {/* Input Judul */}
          <div>
            <label className="block text-sm font-semibold text-coin-purple mb-2">Title</label>
            <input 
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Basic Move Programming"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-coin-orange transition-colors"
            />
          </div>

          {/* Input Deskripsi */}
          <div>
            <label className="block text-sm font-semibold text-coin-purple mb-2">Description</label>
            <textarea 
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe briefly what your idea is about..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-coin-orange transition-colors resize-none"
            />
          </div>

          {/* Input File (Arweave Storage Target) */}
          <div>
            <label className="block text-sm font-semibold text-coin-purple mb-2">Attach  File</label>
            <input 
              type="file"
              accept=".pdf,.epub,.zip"
              onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-coin-purple/10 file:text-coin-purple hover:file:bg-coin-purple/20 transition-all cursor-pointer"
            />
          </div>

          {/* Input Harga */}
          <div>
            <label className="block text-sm font-semibold text-coin-purple mb-2">Price</label>
            <div className="relative rounded-xl shadow-sm">
              <input 
                type="number"
                min="0"
                step="0.1"
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                placeholder="0"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-coin-orange transition-colors"
              />
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none font-bold text-coin-orange">
                SUI
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-1">Isi angka 0 jika ingin modul ini diakses gratis (User hanya bayar gas fee).</p>
          </div>

          {/* Tombol CTA Submit */}
          <button
            type="submit"
            disabled={isUploading}
            className="w-full bg-coin-orange hover:bg-coin-orange/90 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg shadow-coin-orange/20 disabled:bg-gray-400 disabled:shadow-none"
          >
            {isUploading ? 'Sedang Memproses ke Blockchain...' : 'Terbitkan Modul & Kunci di Blockchain'}
          </button>
        </form>

      </div>
    </div>
  );
}