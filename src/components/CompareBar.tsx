'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useCompare } from '@/context/CompareContext';

export function CompareBar() {
  const { selected, remove, clear } = useCompare();
  const router = useRouter();

  const isVisible = selected.length > 0;
  const canCompare = selected.length >= 2;

  const slots = [0, 1, 2];

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 bg-white"
      style={{
        borderTop: '2px solid #7C3AED',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.10)',
        height: '72px',
        transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
      aria-hidden={!isVisible}
    >
      <div className="h-full px-6 flex items-center justify-between gap-4">

        {/* LEFT — 3 college slots */}
        <div className="flex items-center gap-4 flex-1 min-w-0 overflow-x-auto">
          {slots.map((slot) => {
            const college = selected[slot];
            if (college) {
              const initials = college.name
                .split(' ')
                .slice(0, 2)
                .map((w) => w[0])
                .join('')
                .toUpperCase();
              return (
                <div
                  key={college.id}
                  className="flex items-center gap-2 bg-primary-50 border border-primary-200 rounded-xl px-3 py-2 flex-shrink-0 max-w-[180px]"
                >
                  {/* Logo circle */}
                  <div className="w-7 h-7 rounded-full bg-primary-200 text-primary-700 text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {initials}
                  </div>
                  {/* Name */}
                  <span className="text-sm font-medium text-neutral-800 truncate max-w-[120px]">
                    {college.name}
                  </span>
                  {/* × Remove */}
                  <button
                    type="button"
                    onClick={() => remove(college.id)}
                    className="text-neutral-400 hover:text-danger text-lg leading-none ml-2 flex-shrink-0 transition-colors"
                    aria-label={`Remove ${college.name}`}
                  >
                    ×
                  </button>
                </div>
              );
            }
            // Empty slot
            return (
              <div
                key={`empty-${slot}`}
                className="flex items-center justify-center gap-2 bg-neutral-50 border border-dashed border-neutral-300 rounded-xl px-3 py-2 w-[160px] flex-shrink-0"
              >
                <svg
                  className="w-3.5 h-3.5 text-neutral-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span className="text-xs text-neutral-400">Add College</span>
              </div>
            );
          })}
        </div>

        {/* CENTER — count label (hidden on mobile) */}
        <p className="text-sm text-neutral-500 hidden md:block flex-shrink-0">
          <span className="font-semibold text-neutral-700">{selected.length}</span> of 3 colleges selected
        </p>

        {/* RIGHT — action buttons */}
        <div className="flex items-center flex-shrink-0">
          <button
            type="button"
            onClick={() => router.push('/compare')}
            disabled={!canCompare}
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2.5 rounded-lg font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            Compare Now
          </button>
          <button
            type="button"
            onClick={clear}
            className="text-sm text-neutral-400 hover:text-danger ml-4 cursor-pointer transition-colors"
          >
            Clear All
          </button>
        </div>

      </div>
    </div>
  );
}
