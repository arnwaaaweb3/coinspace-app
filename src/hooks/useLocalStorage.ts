//src/hooks/useLocalStorage.ts
import { useState, useEffect, startTransition } from 'react';
import { PublishedModule } from '@/src/types';

export function useLocalStorage(key: string, initialValue: PublishedModule[]) {
  const [data, setData] = useState<PublishedModule[]>(initialValue);

  // Load from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem(key);
    if (savedData) {
      startTransition(() => {
        try {
          setData(JSON.parse(savedData));
        } catch (error) {
          console.error(`Error parsing ${key} from localStorage:`, error);
        }
      });
    }
  }, [key]);

  // Save to localStorage
  useEffect(() => {
    if (data.length > 0) {
      localStorage.setItem(key, JSON.stringify(data));
    }
  }, [key, data]);

  return [data, setData] as const;
}