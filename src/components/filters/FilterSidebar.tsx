'use client';

import React from 'react';
import { CollegeType, NaacGrade, FilterState } from '@/lib/types';
import { STATES, COLLEGE_TYPES, NAAC_GRADES, FEES_RANGE, RATING_FILTERS } from '@/lib/constants';
import { RangeSlider } from './RangeSlider';

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
  onClearAll: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export function FilterSidebar({ filters, onFilterChange, onClearAll, isOpen, onClose }: FilterSidebarProps) {
  const toggleArrayFilter = <T extends string>(
    current: T[],
    value: T,
    key: keyof FilterState
  ) => {
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onFilterChange({ [key]: updated } as Partial<FilterState>);
  };

  const hasActiveFilters =
    filters.locations.length > 0 ||
    filters.types.length > 0 ||
    filters.feesRange[0] !== FEES_RANGE[0] ||
    filters.feesRange[1] !== FEES_RANGE[1] ||
    filters.rating > 0 ||
    filters.naacGrades.length > 0;

  const sidebarContent = (
    <div className="space-y-6">
      {/* Clear All */}
      {hasActiveFilters && (
        <button
          onClick={onClearAll}
          className="w-full text-sm font-medium text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-lg transition-all"
        >
          Clear All Filters
        </button>
      )}

      {/* Location */}
      <div>
        <h4 className="text-xs uppercase tracking-wider font-semibold text-gray-500 mb-3">Location</h4>
        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
          {STATES.map((state) => (
            <label
              key={state}
              className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <input
                type="checkbox"
                checked={filters.locations.includes(state)}
                onChange={() => toggleArrayFilter(filters.locations, state, 'locations')}
                className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-sm text-gray-700">{state}</span>
            </label>
          ))}
        </div>
      </div>

      {/* College Type */}
      <div>
        <h4 className="text-xs uppercase tracking-wider font-semibold text-gray-500 mb-3">College Type</h4>
        <div className="space-y-1.5">
          {COLLEGE_TYPES.map((type) => (
            <label
              key={type}
              className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <input
                type="checkbox"
                checked={filters.types.includes(type)}
                onChange={() => toggleArrayFilter<CollegeType>(filters.types, type, 'types')}
                className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-sm text-gray-700">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Fees Range */}
      <div>
        <h4 className="text-xs uppercase tracking-wider font-semibold text-gray-500 mb-3">Fees Range</h4>
        <RangeSlider
          min={FEES_RANGE[0]}
          max={FEES_RANGE[1]}
          value={filters.feesRange}
          onChange={(value) => onFilterChange({ feesRange: value })}
        />
      </div>

      {/* Rating */}
      <div>
        <h4 className="text-xs uppercase tracking-wider font-semibold text-gray-500 mb-3">Rating</h4>
        <div className="flex flex-wrap gap-2">
          {RATING_FILTERS.map((r) => (
            <button
              key={r}
              onClick={() => onFilterChange({ rating: filters.rating === r ? 0 : r })}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                filters.rating === r
                  ? 'bg-amber-100 text-amber-700 border border-amber-200'
                  : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'
              }`}
            >
              <svg className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {r}+
            </button>
          ))}
        </div>
      </div>

      {/* NAAC Grade */}
      <div>
        <h4 className="text-xs uppercase tracking-wider font-semibold text-gray-500 mb-3">NAAC Grade</h4>
        <div className="flex flex-wrap gap-2">
          {NAAC_GRADES.map((grade) => (
            <button
              key={grade}
              onClick={() => toggleArrayFilter<NaacGrade>(filters.naacGrades, grade, 'naacGrades')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                filters.naacGrades.includes(grade)
                  ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                  : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'
              }`}
            >
              {grade}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-[280px] flex-shrink-0">
        <div className="sticky top-20 bg-white rounded-xl border border-gray-100 shadow-sm p-5 max-h-[calc(100vh-6rem)] overflow-y-auto">
          <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Filters</h3>
          {sidebarContent}
        </div>
      </aside>

      {/* Mobile drawer */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/30 z-40 lg:hidden"
            onClick={onClose}
          />
          <div className="fixed top-0 left-0 w-[300px] h-full bg-white z-50 shadow-xl lg:hidden animate-[slideInLeft_0.2s_ease-out] overflow-y-auto">
            <div className="p-5">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Filters</h3>
                <button
                  onClick={onClose}
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              {sidebarContent}
            </div>
          </div>
        </>
      )}
    </>
  );
}
