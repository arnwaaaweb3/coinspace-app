'use client';

import Image from 'next/image';

interface Props {
  children: React.ReactNode;
}

export const AuthLayout = ({ children }: Props) => {
  return (
    <div className="h-screen w-screen bg-[#fef4ea] flex font-sans text-gray-800 overflow-hidden">
      {/* Left - Image */}
      <div className="w-1/2 h-full relative">
        <Image
          src="/education.webp"
          alt="Education"
          fill
          className="object-cover select-none"
          draggable={false}
          priority
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Right - Form */}
      <div className="w-1/2 h-full bg-white flex items-center justify-center p-8 relative">
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-linear-to-t from-[#604cc3]/10 to-transparent pointer-events-none" />
        <div className="w-full max-w-sm space-y-6">
          {children}
        </div>
      </div>
    </div>
  );
};