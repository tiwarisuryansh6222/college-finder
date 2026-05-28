'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { College } from '@/lib/types';
import { useToast } from './ToastContext';

interface CompareContextType {
  selected: College[];
  add: (college: College) => void;
  remove: (id: string) => void;
  clear: () => void;
  isSelected: (id: string) => boolean;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

const MAX_COMPARE = 3;

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [selected, setSelected] = useState<College[]>([]);
  const { showToast } = useToast();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('compare-colleges');
      if (stored) {
        setSelected(JSON.parse(stored) as College[]);
      }
    } catch (error) {
      console.warn('Error reading compare from sessionStorage:', error);
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      try {
        sessionStorage.setItem('compare-colleges', JSON.stringify(selected));
      } catch (error) {
        console.warn('Error writing compare to sessionStorage:', error);
      }
    }
  }, [selected, isHydrated]);

  const add = useCallback(
    (college: College) => {
      setSelected((prev) => {
        if (prev.length >= MAX_COMPARE) {
          queueMicrotask(() => showToast('Maximum 3 colleges can be compared at a time', 'error'));
          return prev;
        }
        if (prev.some((c) => c.id === college.id)) {
          return prev;
        }
        queueMicrotask(() => showToast(`${college.name} added to compare`, 'success'));
        return [...prev, college];
      });
    },
    [showToast]
  );

  const remove = useCallback(
    (id: string) => {
      setSelected((prev) => {
        const college = prev.find((c) => c.id === id);
        if (college) {
          queueMicrotask(() => showToast(`${college.name} removed from compare`, 'info'));
        }
        return prev.filter((c) => c.id !== id);
      });
    },
    [showToast]
  );

  const clear = useCallback(() => {
    setSelected([]);
    queueMicrotask(() => showToast('Compare list cleared', 'info'));
  }, [showToast]);

  const isSelected = useCallback(
    (id: string) => selected.some((c) => c.id === id),
    [selected]
  );

  return (
    <CompareContext.Provider value={{ selected, add, remove, clear, isSelected }}>
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare(): CompareContextType {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
}
