'use client';

import React, { createContext, useContext, useCallback } from 'react';
import { College } from '@/lib/types';
import { useToast } from './ToastContext';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface SavedContextType {
  saved: College[];
  toggle: (college: College) => void;
  isSaved: (id: string) => boolean;
}

const SavedContext = createContext<SavedContextType | undefined>(undefined);

export function SavedProvider({ children }: { children: React.ReactNode }) {
  const [saved, setSaved] = useLocalStorage<College[]>('saved-colleges', []);
  const { showToast } = useToast();

  const toggle = useCallback(
    (college: College) => {
      setSaved((prev) => {
        const exists = prev.some((c) => c.id === college.id);
        if (exists) {
          queueMicrotask(() => showToast(`${college.name} removed from saved`, 'info'));
          return prev.filter((c) => c.id !== college.id);
        } else {
          queueMicrotask(() => showToast(`${college.name} saved`, 'success'));
          return [...prev, college];
        }
      });
    },
    [setSaved, showToast]
  );

  const isSaved = useCallback(
    (id: string) => saved.some((c) => c.id === id),
    [saved]
  );

  return (
    <SavedContext.Provider value={{ saved, toggle, isSaved }}>
      {children}
    </SavedContext.Provider>
  );
}

export function useSaved(): SavedContextType {
  const context = useContext(SavedContext);
  if (!context) {
    throw new Error('useSaved must be used within a SavedProvider');
  }
  return context;
}
