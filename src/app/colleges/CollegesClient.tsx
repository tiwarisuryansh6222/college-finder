'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { FilterState, SortOption, CollegeType, NaacGrade, College } from '@/lib/types';
import { FEES_RANGE } from '@/lib/constants';
import { useDebounce } from '@/hooks/useDebounce';
import { useColleges } from '@/hooks/useColleges';
import { CollegeFilters } from '@/components/colleges/CollegeFilters';
import { ListingToolbar } from '@/components/colleges/ListingToolbar';
import { CollegeList } from '@/components/colleges/CollegeList';
import { HeroSection } from '@/components/layout/HeroSection';
import { StreamExplorer } from '@/components/colleges/StreamExplorer';

export default function CollegesClient({ initialColleges }: { initialColleges: College[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  // ── Parse URL params into FilterState (for useColleges hook) ────────────
  const getFiltersFromParams = (): FilterState => {
    return {
      search: searchParams.get('q') || '',
      locations: searchParams.get('state')?.split(',').filter(Boolean) || [],
      types: (searchParams.get('stream')?.split(',').filter(Boolean) || []) as CollegeType[],
      ownerships: searchParams.get('type')?.split(',').filter(Boolean) || [],
      feesRange: [
        searchParams.has('minFees') ? Number(searchParams.get('minFees')) : FEES_RANGE[0],
        searchParams.has('maxFees') ? Number(searchParams.get('maxFees')) : FEES_RANGE[1],
      ],
      rating: searchParams.has('rating') ? Number(searchParams.get('rating')) : 0,
      naacGrades: (searchParams.get('naac')?.split(',').filter(Boolean) || []) as NaacGrade[],
      nirfRanks: searchParams.get('nirf')?.split(',').filter(Boolean) || [],
      sort: (searchParams.get('sort') as SortOption) || 'relevance',
    };
  };

  const filters = getFiltersFromParams();

  const [searchInput, setSearchInput] = useState(filters.search);
  const debouncedSearch = useDebounce(searchInput, 300);

  const handleFilterChange = useCallback(
    (partial: Partial<FilterState>) => {
      const newFilters = { ...filters, ...partial };
      const params = new URLSearchParams();

      if (newFilters.search) params.set('q', newFilters.search);
      if (newFilters.locations.length) params.set('state', newFilters.locations.join(','));
      if (newFilters.types.length) params.set('stream', newFilters.types.join(','));
      if (newFilters.ownerships.length) params.set('type', newFilters.ownerships.join(','));
      if (newFilters.feesRange[0] !== FEES_RANGE[0]) params.set('minFees', newFilters.feesRange[0].toString());
      if (newFilters.feesRange[1] !== FEES_RANGE[1]) params.set('maxFees', newFilters.feesRange[1].toString());
      if (newFilters.rating) params.set('rating', newFilters.rating.toString());
      if (newFilters.naacGrades.length) params.set('naac', newFilters.naacGrades.join(','));
      if (newFilters.nirfRanks.length) params.set('nirf', newFilters.nirfRanks.join(','));
      if (newFilters.sort !== 'relevance') params.set('sort', newFilters.sort);

      const paramString = params.toString();
      router.replace(`/colleges${paramString ? `?${paramString}` : ''}`, { scroll: false });
    },
    [filters, router]
  );

  // Sync debounced search to URL
  useEffect(() => {
    if (debouncedSearch !== filters.search) {
      handleFilterChange({ search: debouncedSearch });
    }
  }, [debouncedSearch, filters.search, handleFilterChange]);

  // Sync URL search param to local search input on back/forward navigation
  useEffect(() => {
    setSearchInput(filters.search);
  }, [filters.search]);

  const handleClearAll = () => {
    setSearchInput('');
    router.replace('/colleges', { scroll: false });
  };

  const { colleges, filteredCount, isLoading, hasMore, loadMore } = useColleges(filters, initialColleges);

  return (
    <>
      <HeroSection />
      <StreamExplorer />

      <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6">

        {/* ── LEFT: 280px sticky sidebar ────────────────────────────────── */}
        <CollegeFilters
          isOpen={filterDrawerOpen}
          onClose={() => setFilterDrawerOpen(false)}
        />

        {/* ── RIGHT: toolbar + list ─────────────────────────────────────── */}
        <div className="flex-1 min-w-0">

          {/* Mobile filter button */}
          <button
            type="button"
            onClick={() => setFilterDrawerOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 mb-4 bg-white border border-neutral-200 rounded-lg text-sm font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters
          </button>

          {/* Toolbar: result count + active pills + sort */}
          <ListingToolbar
            totalShowing={colleges.length}
            totalCount={initialColleges.length}
            filteredCount={filteredCount}
          />

          {/* College list: vertical stack of horizontal cards with infinite scroll */}
          <CollegeList
            colleges={colleges}
            isLoading={isLoading}
            hasMore={hasMore}
            onLoadMore={loadMore}
            onClearAll={handleClearAll}
          />
        </div>
      </div>
    </>
  );
}
