// src/utils/formatAddress.ts
export const formatAddress = (addr: string): string => {
  if (!addr) return '';
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
};