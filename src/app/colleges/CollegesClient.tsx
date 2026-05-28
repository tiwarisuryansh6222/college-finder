'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { FilterState, SortOption, CollegeType, NaacGrade, College } from '@/lib/types';
import { FEES_RANGE, SORT_OPTIONS } from '@/lib/constants';
import { useDebounce } from '@/hooks/useDebounce';
import { useColleges } from '@/hooks/useColleges';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { CollegeCard } from '@/components/CollegeCard';
import { CollegeCardSkeleton } from '@/components/CollegeCardSkeleton';
import { FilterSidebar } from '@/components/filters/FilterSidebar';
import { EmptyState } from '@/components/EmptyState';

export default function CollegesClient({ initialColleges }: { initialColleges: College[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  // Parse URL params into filter state
  const getFiltersFromParams = useCallback((): FilterState => {
    return {
      search: searchParams.get('q') || '',
      locations: searchParams.get('locations')?.split(',').filter(Boolean) || [],
      types: (searchParams.get('types')?.split(',').filter(Boolean) || []) as CollegeType[],
      feesRange: [
        Number(searchParams.get('feesMin')) || FEES_RANGE[0],
        Number(searchParams.get('feesMax')) || FEES_RANGE[1],
      ],
      rating: Number(searchParams.get('rating')) || 0,
      naacGrades: (searchParams.get('naac')?.split(',').filter(Boolean) || []) as NaacGrade[],
      sort: (searchParams.get('sort') as SortOption) || 'relevance',
    };
  }, [searchParams]);

  const [filters, setFilters] = useState<FilterState>(getFiltersFromParams);
  const [searchInput, setSearchInput] = useState(filters.search);
  const debouncedSearch = useDebounce(searchInput, 300);

  // Sync debounced search
  useEffect(() => {
    setFilters((prev) => ({ ...prev, search: debouncedSearch }));
  }, [debouncedSearch]);

  // Sync filters to URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.search) params.set('q', filters.search);
    if (filters.locations.length) params.set('locations', filters.locations.join(','));
    if (filters.types.length) params.set('types', filters.types.join(','));
    if (filters.feesRange[0] !== FEES_RANGE[0]) params.set('feesMin', filters.feesRange[0].toString());
    if (filters.feesRange[1] !== FEES_RANGE[1]) params.set('feesMax', filters.feesRange[1].toString());
    if (filters.rating) params.set('rating', filters.rating.toString());
    if (filters.naacGrades.length) params.set('naac', filters.naacGrades.join(','));
    if (filters.sort !== 'relevance') params.set('sort', filters.sort);

    const paramString = params.toString();
    router.replace(`/colleges${paramString ? `?${paramString}` : ''}`, { scroll: false });
  }, [filters, router]);

  const { colleges, totalCount, filteredCount, isLoading, hasMore, loadMore } = useColleges(filters, initialColleges);

  // Infinite scroll
  const { ref: sentinelRef, isIntersecting } = useIntersectionObserver();

  useEffect(() => {
    if (isIntersecting && hasMore && !isLoading) {
      loadMore();
    }
  }, [isIntersecting, hasMore, isLoading, loadMore]);

  const handleFilterChange = (partial: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...partial }));
  };

  const handleClearAll = () => {
    const defaultFilters: FilterState = {
      search: '',
      locations: [],
      types: [],
      feesRange: FEES_RANGE,
      rating: 0,
      naacGrades: [],
      sort: 'relevance',
    };
    setFilters(defaultFilters);
    setSearchInput('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex gap-8">
        {/* Filter Sidebar */}
        <FilterSidebar
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearAll={handleClearAll}
          isOpen={filterDrawerOpen}
          onClose={() => setFilterDrawerOpen(false)}
        />

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Search + Sort Header */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            {/* Mobile filter toggle */}
            <button
              onClick={() => setFilterDrawerOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filters
            </button>

            {/* Search */}
            <div className="relative flex-1">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search colleges by name, location, type, courses..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
              />
            </div>

            {/* Sort */}
            <select
              value={filters.sort}
              onChange={(e) => handleFilterChange({ sort: e.target.value as SortOption })}
              className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 cursor-pointer"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Result Count */}
          <div className="mb-4">
            <p className="text-sm text-gray-500">
              Showing <span className="font-semibold text-gray-700">{colleges.length}</span> of{' '}
              <span className="font-semibold text-gray-700">{filteredCount}</span> colleges
            </p>
          </div>

          {/* Grid */}
          {isLoading && colleges.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <CollegeCardSkeleton key={i} />
              ))}
            </div>
          ) : colleges.length === 0 ? (
            <EmptyState
              title="No colleges found"
              description="Try adjusting your filters or search to find what you're looking for."
              actionLabel="Clear Filters"
              onAction={handleClearAll}
            />
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {colleges.map((college) => (
                  <CollegeCard key={college.id} college={college} />
                ))}
              </div>

              {/* Infinite scroll sentinel */}
              {hasMore && (
                <div ref={sentinelRef} className="flex justify-center py-8">
                  <div className="flex items-center gap-3 text-gray-400">
                    <div className="w-5 h-5 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
                    <span className="text-sm">Loading more colleges...</span>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
