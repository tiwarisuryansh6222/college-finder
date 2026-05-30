'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { College, FilterState } from '@/lib/types';
import { ITEMS_PER_PAGE } from '@/lib/constants';

interface UseCollegesReturn {
  colleges: College[];
  totalCount: number;
  filteredCount: number;
  isLoading: boolean;
  hasMore: boolean;
  loadMore: () => void;
}

export function useColleges(filters: FilterState, initialColleges: College[]): UseCollegesReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const isFirstMount = useRef(true);

  // Reset page when filters change
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
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
    JSON.stringify(filters.ownerships),
    JSON.stringify(filters.feesRange),
    filters.rating,
    JSON.stringify(filters.naacGrades),
    JSON.stringify(filters.nirfRanks),
  ]);

  const filtered = useMemo(() => {
    let result = [...initialColleges];

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

    // Type filter (Stream)
    if (filters.types.length > 0) {
      result = result.filter((c) => filters.types.includes(c.type));
    }

    // Ownership filter (College Type)
    if (filters.ownerships && filters.ownerships.length > 0) {
      result = result.filter((c) => {
        const isGov = c.name.includes('Indian Institute') || c.name.includes('National') || c.name.includes('All India') || c.name.includes('University') || c.name.includes('Jadavpur') || c.name.includes('Armed Forces');
        const cOwnership = isGov ? 'Government' : 'Private';
        return filters.ownerships.includes(cOwnership);
      });
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

    // NIRF rank filter
    if (filters.nirfRanks && filters.nirfRanks.length > 0) {
      result = result.filter((c) => {
        const rank = c.nirfRank || 999999;
        const isUnranked = rank > 100 || rank === 0;
        return filters.nirfRanks.some((r) => {
          if (r === 'top10') return rank > 0 && rank <= 10;
          if (r === 'top25') return rank > 0 && rank <= 25;
          if (r === 'top50') return rank > 0 && rank <= 50;
          if (r === 'top100') return rank > 0 && rank <= 100;
          if (r === 'unranked') return isUnranked;
          return false;
        });
      });
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
  }, [filters, initialColleges]);

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
    totalCount: initialColleges.length,
    filteredCount: filtered.length,
    isLoading,
    hasMore: paginatedColleges.length < filtered.length,
    loadMore,
  };
}
