//src/components/dashboard/PublishModuleForm.tsx
'use client';

import { useState } from 'react';
import { PublishedModule } from '@/src/types';

interface PublishModuleFormProps {
  onPublish: (newModule: PublishedModule) => void;
}

export default function PublishModuleForm({ onPublish }: PublishModuleFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !file) {
      alert('Title and file are required!');
      return;
    }
    if (!['application/pdf', 'application/epub+zip', 'application/zip'].includes(file.type)) {
      alert('Invalid file type. Please upload a .pdf, .epub, or .zip file.');
      return;
    }

    setIsUploading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const newModule: PublishedModule = {
        id: Date.now().toString(),
        title: title,
        price: price,
        sales: 0,
      };
      onPublish(newModule);
      alert('Module published successfully!');
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
          {isUploading ? 'Uploading...' : 'Publish Module'}
        </button>
      </form>
    </div>
  );
}