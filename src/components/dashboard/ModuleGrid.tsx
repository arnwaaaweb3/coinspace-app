//src/components/dashboard/ModuleGrid.tsx
'use client';

import { PublishedModule } from '@/src/types';

interface ModuleGridProps {
  modules: PublishedModule[];
}

export default function ModuleGrid({ modules }: ModuleGridProps) {
  return (
    <div className="lg:col-span-7">
      <h2 className="text-xl font-bold text-purple-600 mb-4">Published Modules</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {modules.length === 0 ? (
          <div className="col-span-2 bg-white p-8 rounded-lg shadow-md border border-gray-100 text-center">
            <div className="text-4xl mb-3">📚</div>
            <p className="text-sm text-gray-400">No modules published yet.</p>
          </div>
        ) : (
          modules.map((mod) => (
            <div 
              key={mod.id} 
              className="bg-white p-4 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-200"
            >
              <h3 className="text-lg font-bold text-gray-800 line-clamp-1">{mod.title}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm font-semibold text-purple-600">{mod.price} SUI</span>
                <span className="text-sm text-gray-500">Sales: {mod.sales}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}