'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { SortOption } from '@/lib/types';
import { SORT_OPTIONS } from '@/lib/constants';

interface ListingToolbarProps {
  totalShowing: number;
  totalCount: number;
  filteredCount: number;
}

// Label map for filter pills
const PARAM_LABELS: Record<string, string> = {
  q:       'Search',
  stream:  'Stream',
  state:   'State',
  type:    'Type',
  minFees: 'Min Fees',
  maxFees: 'Max Fees',
  rating:  'Rating',
  naac:    'NAAC',
  nirf:    'NIRF',
};

function fmtFees(v: string) {
  const n = Number(v);
  return isNaN(n) ? v : `₹${(n / 100000).toFixed(1)}L`;
}

export function ListingToolbar({ totalShowing, totalCount, filteredCount }: ListingToolbarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  const currentSort = (searchParams.get('sort') as SortOption) || 'relevance';
  const currentSortLabel = SORT_OPTIONS.find((o) => o.value === currentSort)?.label || 'Relevance';

  // Close sort dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setSortOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSort = (value: SortOption) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === 'relevance') params.delete('sort');
    else params.set('sort', value);
    const str = params.toString();
    router.replace(`/colleges${str ? `?${str}` : ''}`, { scroll: false });
    setSortOpen(false);
  };

  const removeFilter = (paramKey: string, value?: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      // Multi-value param: remove just this value
      const current = params.get(paramKey)?.split(',').filter(Boolean) || [];
      const updated = current.filter((v) => v !== value);
      if (updated.length) params.set(paramKey, updated.join(','));
      else params.delete(paramKey);
    } else {
      params.delete(paramKey);
    }
    const str = params.toString();
    router.replace(`/colleges${str ? `?${str}` : ''}`, { scroll: false });
  };

  // Build active filter pills from URL params
  const activePills: { key: string; display: string; paramKey: string; value?: string }[] = [];
  const multiParams = ['stream', 'state', 'naac', 'nirf'];
  const singleParams = ['q', 'type', 'rating'];

  multiParams.forEach((param) => {
    const val = searchParams.get(param);
    if (val) {
      val.split(',').filter(Boolean).forEach((v) => {
        activePills.push({
          key: `${param}-${v}`,
          display: `${PARAM_LABELS[param]}: ${v}`,
          paramKey: param,
          value: v,
        });
      });
    }
  });

  singleParams.forEach((param) => {
    const val = searchParams.get(param);
    if (val) {
      activePills.push({
        key: param,
        display: `${PARAM_LABELS[param]}: ${val}`,
        paramKey: param,
      });
    }
  });

  // Fees pill
  const minFees = searchParams.get('minFees');
  const maxFees = searchParams.get('maxFees');
  if (minFees || maxFees) {
    activePills.push({
      key: 'fees',
      display: `Fees: ${fmtFees(minFees || '0')} – ${fmtFees(maxFees || '2000000')}`,
      paramKey: '__fees',
    });
  }

  const removeFeesPill = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('minFees');
    params.delete('maxFees');
    const str = params.toString();
    router.replace(`/colleges${str ? `?${str}` : ''}`, { scroll: false });
  };

  return (
    <div className="mb-4">
      {/* Main toolbar row */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        {/* Left: result count */}
        <p className="text-sm text-neutral-600 flex-shrink-0">
          Showing{' '}
          <span className="font-semibold text-neutral-800">{totalShowing}</span>
          {' '}of{' '}
          <span className="font-semibold text-neutral-800">{filteredCount}</span>
          {' '}colleges
        </p>

        {/* Right: sort dropdown */}
        <div className="flex items-center gap-2 flex-shrink-0" ref={sortRef}>
          <span className="text-sm text-neutral-500 hidden sm:block">Sort by:</span>
          <div className="relative">
            <button
              type="button"
              onClick={() => setSortOpen((o) => !o)}
              className="flex items-center gap-2 px-3 py-1.5 bg-white border border-neutral-200 rounded-lg text-sm font-medium text-neutral-700 hover:border-primary-300 hover:bg-primary-50 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-100"
            >
              <span>{currentSortLabel}</span>
              <svg
                className={`w-4 h-4 text-neutral-400 transition-transform ${sortOpen ? 'rotate-180' : ''}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {sortOpen && (
              <div className="absolute right-0 top-full mt-1 bg-white border border-neutral-200 rounded-xl shadow-lg z-20 min-w-[200px] overflow-hidden animate-[scaleIn_0.15s_ease-out]">
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => handleSort(opt.value)}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                      currentSort === opt.value
                        ? 'bg-primary-50 text-primary-700 font-medium'
                        : 'text-neutral-700 hover:bg-neutral-50'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Active filter pills row */}
      {activePills.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {activePills.map((pill) => (
            <span
              key={pill.key}
              className="inline-flex items-center gap-1.5 bg-primary-100 text-primary-700 text-xs px-2.5 py-1 rounded-full font-medium"
            >
              {pill.display}
              <button
                type="button"
                onClick={() =>
                  pill.paramKey === '__fees'
                    ? removeFeesPill()
                    : removeFilter(pill.paramKey, pill.value)
                }
                className="text-primary-500 hover:text-primary-800 transition-colors leading-none"
                aria-label={`Remove ${pill.display} filter`}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
