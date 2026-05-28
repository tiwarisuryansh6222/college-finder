'use client';

import { useState, useEffect, useMemo } from 'react';
import { College, FilterState } from '@/lib/types';
import { colleges as allColleges } from '@/lib/data/colleges';
import { ITEMS_PER_PAGE } from '@/lib/constants';

interface UseCollegesReturn {
  colleges: College[];
  totalCount: number;
  filteredCount: number;
  isLoading: boolean;
  hasMore: boolean;
  loadMore: () => void;
}

export function useColleges(filters: FilterState): UseCollegesReturn {
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [
    filters.search,
    filters.sort,
    JSON.stringify(filters.locations),
    JSON.stringify(filters.types),
    JSON.stringify(filters.feesRange),
    filters.rating,
    JSON.stringify(filters.naacGrades),
  ]);

  const filtered = useMemo(() => {
    let result = [...allColleges];

    // Search
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(searchLower) ||
          c.location.toLowerCase().includes(searchLower) ||
          c.type.toLowerCase().includes(searchLower) ||
          c.courses.some((course) => course.name.toLowerCase().includes(searchLower))
      );
    }

    // Location filter
    if (filters.locations.length > 0) {
      result = result.filter((c) => filters.locations.includes(c.state));
    }

    // Type filter
    if (filters.types.length > 0) {
      result = result.filter((c) => filters.types.includes(c.type));
    }

    // Fees range filter
    result = result.filter(
      (c) => c.fees >= filters.feesRange[0] && c.fees <= filters.feesRange[1]
    );

    // Rating filter
    if (filters.rating > 0) {
      result = result.filter((c) => c.rating >= filters.rating);
    }

    // NAAC grade filter
    if (filters.naacGrades.length > 0) {
      result = result.filter((c) => filters.naacGrades.includes(c.naacGrade));
    }

    // Sorting
    switch (filters.sort) {
      case 'fees-low':
        result.sort((a, b) => a.fees - b.fees);
        break;
      case 'fees-high':
        result.sort((a, b) => b.fees - a.fees);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'nirf-rank':
        result.sort((a, b) => a.nirfRank - b.nirfRank);
        break;
      default:
        break;
    }

    return result;
  }, [filters]);

  const paginatedColleges = useMemo(() => {
    return filtered.slice(0, page * ITEMS_PER_PAGE);
  }, [filtered, page]);

  const loadMore = () => {
    if (paginatedColleges.length < filtered.length) {
      setIsLoading(true);
      setTimeout(() => {
        setPage((prev) => prev + 1);
        setIsLoading(false);
      }, 800);
    }
  };

  return {
    colleges: paginatedColleges,
    totalCount: allColleges.length,
    filteredCount: filtered.length,
    isLoading,
    hasMore: paginatedColleges.length < filtered.length,
    loadMore,
  };
}
