'use client';

import React, { useEffect, useRef } from 'react';
import { College } from '@/lib/types';
import { CollegeCard } from '@/components/CollegeCard';
import { CollegeCardSkeleton } from '@/components/CollegeCardSkeleton';

interface CollegeListProps {
  colleges: College[];
  isLoading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  onClearAll?: () => void;
}

export function CollegeList({
  colleges,
  isLoading,
  hasMore,
  onLoadMore,
  onClearAll,
}: CollegeListProps) {
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // IntersectionObserver to auto-trigger loadMore
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onLoadMore();
        }
      },
      { threshold: 0, rootMargin: '120px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [onLoadMore, hasMore]);

  // ── Initial loading state ─────────────────────────────────────────────────
  if (isLoading && colleges.length === 0) {
    return (
      <div className="flex flex-col">
        {Array.from({ length: 6 }).map((_, i) => (
          <CollegeCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  // ── Empty state ───────────────────────────────────────────────────────────
  if (!isLoading && colleges.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <svg
          className="w-12 h-12 text-neutral-300 mb-4"
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <h3 className="text-lg font-semibold text-neutral-600 mb-1">No colleges found</h3>
        <p className="text-sm text-neutral-400 mb-5">
          Try adjusting your filters or search term.
        </p>
        {onClearAll && (
          <button
            type="button"
            onClick={onClearAll}
            className="bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors shadow-sm"
          >
            Clear All Filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* College cards */}
      {colleges.map((college) => (
        <CollegeCard key={college.id} college={college} />
      ))}

      {/* Loading-more skeletons */}
      {isLoading && colleges.length > 0 && (
        <>
          {Array.from({ length: 3 }).map((_, i) => (
            <CollegeCardSkeleton key={`skeleton-more-${i}`} />
          ))}
        </>
      )}

      {/* Invisible IntersectionObserver sentinel */}
      {hasMore && !isLoading && (
        <div ref={sentinelRef} className="h-4" aria-hidden="true" />
      )}

      {/* End of list */}
      {!hasMore && !isLoading && colleges.length > 0 && (
        <p className="text-center text-sm text-neutral-400 py-6">
          You&apos;ve seen all {colleges.length} colleges
        </p>
      )}
    </div>
  );
}
