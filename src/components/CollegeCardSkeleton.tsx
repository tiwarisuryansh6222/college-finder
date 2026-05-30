import React from 'react';

export function CollegeCardSkeleton() {
  return (
    <div className="w-full bg-white rounded-xl border border-neutral-200 shadow-[var(--shadow-card)] mb-3 flex overflow-hidden animate-pulse">
      {/* Left panel */}
      <div className="w-[90px] flex-shrink-0 bg-neutral-50 flex flex-col items-center justify-center p-3 border-r border-neutral-100 gap-3">
        <div className="h-5 w-8 bg-neutral-200 rounded" />
        <div className="w-12 h-12 rounded-full bg-neutral-200" />
      </div>

      {/* Main section */}
      <div className="flex-1 min-w-0 p-4 flex flex-col gap-3">
        {/* Row 1: name + badges */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-neutral-200 rounded w-3/4" />
            <div className="h-3 bg-neutral-200 rounded w-1/2" />
          </div>
          <div className="flex gap-1">
            <div className="h-5 w-14 bg-neutral-200 rounded" />
            <div className="h-5 w-16 bg-neutral-200 rounded" />
          </div>
        </div>

        {/* Row 2: rating + location */}
        <div className="flex items-center gap-3">
          <div className="h-3 w-20 bg-neutral-200 rounded" />
          <div className="h-3 w-28 bg-neutral-200 rounded" />
        </div>

        <div className="h-px bg-neutral-100" />

        {/* Row 3: courses */}
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-14 bg-neutral-200 rounded" />
          <div className="h-5 w-20 bg-neutral-100 rounded-full" />
          <div className="h-5 w-16 bg-neutral-100 rounded-full" />
          <div className="h-5 w-18 bg-neutral-100 rounded-full" />
        </div>

        <div className="h-px bg-neutral-100" />

        {/* Row 4: stats */}
        <div className="flex items-center gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className="h-4 w-14 bg-neutral-200 rounded" />
              <div className="h-3 w-12 bg-neutral-100 rounded" />
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="w-[160px] flex-shrink-0 p-4 flex flex-col gap-2 border-l border-neutral-100">
        <div className="h-8 w-full bg-neutral-200 rounded-lg" />
        <div className="h-8 w-full bg-neutral-100 rounded-lg border border-neutral-200" />
        <div className="flex items-center justify-between mt-1">
          <div className="h-7 w-7 bg-neutral-100 rounded-lg" />
          <div className="h-4 w-16 bg-neutral-100 rounded" />
        </div>
      </div>
    </div>
  );
}
