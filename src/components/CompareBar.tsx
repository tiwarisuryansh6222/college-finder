'use client';

import React from 'react';
import Link from 'next/link';
import { useCompare } from '@/context/CompareContext';

export function CompareBar() {
  const { selected, remove, clear } = useCompare();

  if (selected.length === 0) return null;

  const emptySlots = 3 - selected.length;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-[slideUp_0.3s_ease-out]">
      <div className="max-w-5xl mx-auto px-4 pb-4">
        <div className="bg-white/95 backdrop-blur-lg rounded-[12px] shadow-2xl border border-neutral-200 p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1 min-w-0 overflow-x-auto">
              {selected.map((college) => (
                <div
                  key={college.id}
                  className="flex items-center gap-2 bg-primary-50 rounded-[12px] px-3 py-2 min-w-[180px] flex-shrink-0"
                >
                  <div className="w-8 h-8 bg-primary-100 rounded-[8px] flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-primary-600">
                      {college.name.charAt(0)}
                    </span>
                  </div>
                  <span className="text-xs font-medium text-neutral-700 truncate">
                    {college.name}
                  </span>
                  <button
                    onClick={() => remove(college.id)}
                    className="ml-auto text-neutral-400 hover:text-[#EF4444] transition-colors flex-shrink-0"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
              {Array.from({ length: emptySlots }).map((_, i) => (
                <div
                  key={`empty-${i}`}
                  className="flex items-center justify-center border-2 border-dashed border-neutral-200 rounded-[12px] px-3 py-2 min-w-[180px] min-h-[48px] flex-shrink-0"
                >
                  <svg className="w-5 h-5 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={clear}
                className="px-4 py-2 text-sm font-medium text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 rounded-[8px] transition-all"
              >
                Clear
              </button>
              <Link
                href="/compare"
                className="px-5 py-2.5 bg-primary-600 text-white text-sm font-semibold rounded-[8px] hover:bg-primary-700 transition-all focus:ring-2 focus:ring-primary-300"
              >
                Compare Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
