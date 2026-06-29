//src/components/dashboard/StatisticsCards.tsx
'use client';

interface StatisticsCardsProps {
  totalEarnings: number;
  totalSales: number;
}

export default function StatisticsCards({ totalEarnings, totalSales }: StatisticsCardsProps) {
  return (
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
  );
}