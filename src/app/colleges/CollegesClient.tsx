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
  const getFiltersFromParams = (): FilterState => {
    return {
      search: searchParams.get('q') || '',
      locations: searchParams.get('state')?.split(',').filter(Boolean) || [],
      types: (searchParams.get('type')?.split(',').filter(Boolean) || []) as CollegeType[],
      feesRange: [
        searchParams.has('minFees') ? Number(searchParams.get('minFees')) : FEES_RANGE[0],
        searchParams.has('maxFees') ? Number(searchParams.get('maxFees')) : FEES_RANGE[1],
      ],
      rating: Number(searchParams.get('minRating')) || 0,
      naacGrades: (searchParams.get('naac')?.split(',').filter(Boolean) || []) as NaacGrade[],
      sort: (searchParams.get('sort') as SortOption) || 'relevance',
    };
  };

  const filters = getFiltersFromParams();

  const [searchInput, setSearchInput] = useState(filters.search);
  const debouncedSearch = useDebounce(searchInput, 300);

  const handleFilterChange = useCallback((partial: Partial<FilterState>) => {
    const newFilters = { ...filters, ...partial };
    const params = new URLSearchParams();
    
    if (newFilters.search) params.set('q', newFilters.search);
    if (newFilters.locations.length) params.set('state', newFilters.locations.join(','));
    if (newFilters.types.length) params.set('type', newFilters.types.join(','));
    if (newFilters.feesRange[0] !== FEES_RANGE[0]) params.set('minFees', newFilters.feesRange[0].toString());
    if (newFilters.feesRange[1] !== FEES_RANGE[1]) params.set('maxFees', newFilters.feesRange[1].toString());
    if (newFilters.rating) params.set('minRating', newFilters.rating.toString());
    if (newFilters.naacGrades.length) params.set('naac', newFilters.naacGrades.join(','));
    if (newFilters.sort !== 'relevance') params.set('sort', newFilters.sort);

    const paramString = params.toString();
    router.replace(`/colleges${paramString ? `?${paramString}` : ''}`, { scroll: false });
  }, [filters, router]);

  // Sync debounced search to URL
  useEffect(() => {
    if (debouncedSearch !== filters.search) {
      handleFilterChange({ search: debouncedSearch });
    }
  }, [debouncedSearch, filters.search, handleFilterChange]);

  // Sync URL search to local input (e.g. on back button)
  useEffect(() => {
    setSearchInput(filters.search);
  }, [filters.search]);

  const handleClearAll = () => {
    setSearchInput('');
    router.replace('/colleges', { scroll: false });
  };

  const { colleges, totalCount, filteredCount, isLoading, hasMore, loadMore } = useColleges(filters, initialColleges);

  // Infinite scroll
  const { ref: sentinelRef, isIntersecting } = useIntersectionObserver();

  useEffect(() => {
    if (isIntersecting && hasMore && !isLoading) {
      loadMore();
    }
  }, [isIntersecting, hasMore, isLoading, loadMore]);

  return (
    <>
      {/* Hero Section */}
      <div className="bg-[#1a1f5e] pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-[family-name:var(--font-heading)] font-extrabold text-white mb-4 tracking-tight">
            Find Your Perfect College
          </h1>
          <p className="text-lg md:text-xl text-indigo-100 mb-8 font-medium">
            Explore 30+ colleges across India
          </p>
          
          <div className="relative flex items-center bg-white rounded-xl shadow-lg p-1.5 focus-within:ring-4 focus-within:ring-indigo-500/30 transition-all">
            <div className="flex-1 flex items-center px-4">
              <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search colleges, courses, exams, or locations..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full pl-3 pr-4 py-3 bg-transparent text-gray-900 placeholder-gray-500 text-base focus:outline-none font-medium"
              />
            </div>
            <button className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-8 py-3 rounded-lg transition-colors shrink-0 shadow-sm">
              Search
            </button>
          </div>
          
          <div className="mt-6 flex flex-wrap justify-center items-center gap-2 md:gap-3 text-sm text-indigo-200/80 font-semibold tracking-wide uppercase">
            <span>30 Colleges</span>
            <span className="w-1 h-1 bg-indigo-300 rounded-full"></span>
            <span>15 States</span>
            <span className="w-1 h-1 bg-indigo-300 rounded-full"></span>
            <span>Engineering</span>
            <span className="w-1 h-1 bg-indigo-300 rounded-full"></span>
            <span>Management</span>
            <span className="w-1 h-1 bg-indigo-300 rounded-full"></span>
            <span>Medical</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
          {/* Sort Header */}
          <div className="flex flex-row items-center justify-between gap-3 mb-6">
            {/* Mobile filter toggle */}
            <button
              onClick={() => setFilterDrawerOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filters
            </button>

            {/* Sort */}
            <div className="flex items-center gap-3 ml-auto">
              <span className="text-sm font-medium text-gray-500 hidden sm:inline-block">Sort by:</span>
              <select
                value={filters.sort}
                onChange={(e) => handleFilterChange({ sort: e.target.value as SortOption })}
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 cursor-pointer shadow-sm"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
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
    </>
  );
}
