// src/components/auth/CustomAuthForm.tsx
'use client';

import { useState } from 'react';

interface Props {
  onSubmit: (name: string) => void;
  onBack: () => void;
  email?: string;
}

export const CustomAuthForm = ({ onSubmit, email }: Props) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) onSubmit(name.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Avatar Circle */}
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center">
          <div className="relative">
            {/* Avatar Circle - Line Art Style */}
            <div className="w-24 h-24 rounded-full border-2 border-dashed border-[#604cc3] flex items-center justify-center bg-transparent">
              <svg
                className="w-12 h-12 text-[#604cc3]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>

            {/* Edit Button - Circle kecil di pojok kanan bawah */}
            <button
              type="button"
              onClick={() => {
                // Nanti di sini logic buat upload/ganti avatar
                console.log('Change avatar clicked!');
                // Bisa pake file input atau trigger modal
              }}
              className="absolute bottom-0 -right-1 w-7 h-7 rounded-full bg-[#604cc3] hover:bg-[#4f3da3] flex items-center justify-center border-2 border-white shadow-md transition-all duration-200 hover:scale-110 cursor-pointer"
              aria-label="Change profile picture"
            >
              {/* Icon Fountain Pen / Edit */}
              <svg
                className="w-3.5 h-3.5 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 19l7-7 3 3-7 7-3-3z" />
                <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                <path d="M2 2l7.586 7.586" />
                <circle cx="11" cy="11" r="2" />
              </svg>
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2">Profile Picture</p>
        </div>
      </div>

      {/* Email info (readonly) */}
      {email && (
        <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
          <p className="text-xs text-gray-500">Email</p>
          <p className="text-sm font-medium text-gray-700">{email}</p>
        </div>
      )}

      <div>
        <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">
          Your Name
        </label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your display name..."
          className="w-full px-4 py-2.5 text-sm border border-gray-300 text-gray-700 rounded-xl focus:ring-2 focus:ring-[#604cc3] focus:border-[#604cc3] focus:outline-none transition-all duration-200"
        />
      </div>

      <div className="flex gap-2 pt-2">
        <button
          type="submit"
          className="w-full py-2.5 text-sm font-semibold text-white bg-[#604cc3] rounded-xl hover:bg-[#4f3da3] transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
        >
          Save Profile
        </button>
      </div>
    </form>
  );
};