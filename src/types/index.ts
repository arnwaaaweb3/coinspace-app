//src/types/index.ts
export interface PublishedModule {
  id: string;
  title: string;
  price: number;
  sales: number;
}

export interface ModuleStats {
  totalEarnings: number;
  totalSales: number;
}