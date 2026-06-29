//src/hooks/useModuleStats.ts
import { useMemo } from 'react';
import { PublishedModule, ModuleStats } from '@/src/types';

export function useModuleStats(modules: PublishedModule[]): ModuleStats {
  return useMemo(() => {
    const totalEarnings = modules.reduce((acc, module) => acc + module.price * module.sales, 0);
    const totalSales = modules.reduce((acc, module) => acc + module.sales, 0);
    return { totalEarnings, totalSales };
  }, [modules]);
}