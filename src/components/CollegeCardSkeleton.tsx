import React from 'react';

export function CollegeCardSkeleton() {
  return (
    <div className="bg-white rounded-[12px] border border-neutral-200 shadow-[var(--shadow-card)] p-5 flex flex-col animate-pulse">
      {/* Logo + title row */}
      <div className="flex gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-neutral-200 shrink-0" />
        <div className="flex-1 space-y-2 pt-1">
          <div className="h-4 bg-neutral-200 rounded w-3/4" />
          <div className="h-3 bg-neutral-200 rounded w-1/2" />
          <div className="h-3 bg-neutral-200 rounded w-2/3" />
        </div>
      </div>

      <div className="h-px bg-neutral-200 mb-4" />

      {/* Stats row */}
      <div className="flex gap-2 mb-5">
        <div className="flex-1 h-14 bg-neutral-100 rounded-lg" />
        <div className="flex-1 h-14 bg-neutral-100 rounded-lg" />
        <div className="flex-1 h-14 bg-neutral-100 rounded-lg" />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <div className="flex-1 h-9 bg-neutral-200 rounded-lg" />
        <div className="w-24 h-9 bg-neutral-200 rounded-lg" />
        <div className="w-9 h-9 bg-neutral-200 rounded-lg" />
      </div>
    </div>
  );
}
