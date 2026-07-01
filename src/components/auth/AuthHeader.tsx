import Image from 'next/image';

export const AuthHeader = () => (
  <div className="text-center">
    <div className="flex justify-center mb-2">
      <Image
        src="/coinspace.png"
        alt="Coinspace Logo"
        width={70}
        height={70}
        className="object-contain select-none"
        draggable={false}
        priority
      />
    </div>
    <h2 className="text-3xl font-black text-[#604cc3]">Coinspace</h2>
    <p className="text-sm text-gray-400 mt-1">Learn Your Way, Master Your Path</p>
  </div>
);