'use client';

import React, { useState } from 'react';
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

  const activeCount =
    filters.locations.length +
    filters.types.length +
    filters.naacGrades.length +
    (filters.feesRange[0] !== FEES_RANGE[0] || filters.feesRange[1] !== FEES_RANGE[1] ? 1 : 0) +
    (filters.rating > 0 ? 1 : 0);

  const hasActiveFilters = activeCount > 0;

  const sidebarContent = (
    <div className="space-y-6">
      {/* Clear All */}
      {hasActiveFilters && (
        <button
          onClick={onClearAll}
          className="w-full text-sm font-medium text-[#EF4444] hover:text-red-600 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-[8px] transition-all"
        >
          Clear All Filters
        </button>
      )}

      {/* Location */}
      <details open className="group">
        <summary className="list-none flex items-center justify-between cursor-pointer font-bold text-neutral-900 text-sm mb-3 uppercase tracking-wider">
          Location
          <svg className="w-4 h-4 text-neutral-400 group-open:-rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </summary>
        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
          {STATES.map((state) => (
            <label
              key={state}
              className="flex items-center gap-2.5 px-2 py-1.5 rounded-[8px] hover:bg-neutral-50 cursor-pointer transition-colors"
            >
              <input
                type="checkbox"
                checked={filters.locations.includes(state)}
                onChange={() => toggleArrayFilter(filters.locations, state, 'locations')}
                className="w-4 h-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm text-neutral-700 font-medium">{state}</span>
            </label>
          ))}
        </div>
      </details>

      <hr className="border-neutral-100" />

      {/* College Type */}
      <details open className="group">
        <summary className="list-none flex items-center justify-between cursor-pointer font-bold text-neutral-900 text-sm mb-3 uppercase tracking-wider">
          College Type
          <svg className="w-4 h-4 text-neutral-400 group-open:-rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </summary>
        <div className="space-y-1.5">
          {COLLEGE_TYPES.map((type) => (
            <label
              key={type}
              className="flex items-center gap-2.5 px-2 py-1.5 rounded-[8px] hover:bg-neutral-50 cursor-pointer transition-colors"
            >
              <input
                type="checkbox"
                checked={filters.types.includes(type)}
                onChange={() => toggleArrayFilter<CollegeType>(filters.types, type, 'types')}
                className="w-4 h-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm text-neutral-700 font-medium">{type}</span>
            </label>
          ))}
        </div>
      </details>

      <hr className="border-neutral-100" />

      {/* Fees Range */}
      <details open className="group">
        <summary className="list-none flex items-center justify-between cursor-pointer font-bold text-neutral-900 text-sm mb-3 uppercase tracking-wider">
          Fees Range
          <svg className="w-4 h-4 text-neutral-400 group-open:-rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </summary>
        <div className="mb-2 text-sm font-semibold text-primary-600 text-center bg-primary-50 py-1 rounded-[6px]">
          ₹{filters.feesRange[0] / 100000}L - ₹{filters.feesRange[1] / 100000}L
        </div>
        <RangeSlider
          min={FEES_RANGE[0]}
          max={FEES_RANGE[1]}
          value={filters.feesRange}
          onChange={(value) => onFilterChange({ feesRange: value })}
        />
      </details>

      <hr className="border-neutral-100" />

      {/* Rating */}
      <details open className="group">
        <summary className="list-none flex items-center justify-between cursor-pointer font-bold text-neutral-900 text-sm mb-3 uppercase tracking-wider">
          Rating
          <svg className="w-4 h-4 text-neutral-400 group-open:-rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </summary>
        <div className="flex flex-wrap gap-2">
          {RATING_FILTERS.map((r) => (
            <button
              key={r}
              onClick={() => onFilterChange({ rating: filters.rating === r ? 0 : r })}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-[6px] text-sm font-medium transition-all ${
                filters.rating === r
                  ? 'bg-accent-500/10 text-accent-600 border border-accent-500/30'
                  : 'bg-neutral-50 text-neutral-600 border border-neutral-200 hover:bg-neutral-100'
              }`}
            >
              <svg className="w-3.5 h-3.5 text-accent-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {r}+
            </button>
          ))}
        </div>
      </details>

      <hr className="border-neutral-100" />

      {/* NAAC Grade */}
      <details open className="group">
        <summary className="list-none flex items-center justify-between cursor-pointer font-bold text-neutral-900 text-sm mb-3 uppercase tracking-wider">
          NAAC Grade
          <svg className="w-4 h-4 text-neutral-400 group-open:-rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </summary>
        <div className="flex flex-wrap gap-2">
          {NAAC_GRADES.map((grade) => (
            <button
              key={grade}
              onClick={() => toggleArrayFilter<NaacGrade>(filters.naacGrades, grade, 'naacGrades')}
              className={`px-3 py-1.5 rounded-[6px] text-sm font-medium transition-all ${
                filters.naacGrades.includes(grade)
                  ? 'bg-primary-100 text-primary-700 border border-primary-200'
                  : 'bg-neutral-50 text-neutral-600 border border-neutral-200 hover:bg-neutral-100'
              }`}
            >
              {grade}
            </button>
          ))}
        </div>
      </details>

      {/* Apply Filters Button */}
      <button
        onClick={onClose}
        className="w-full text-sm font-bold text-white bg-primary-600 hover:bg-primary-700 py-3 rounded-[8px] transition-colors shadow-sm"
      >
        Apply Filters
      </button>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-[280px] flex-shrink-0">
        <div className="sticky top-20 bg-white rounded-[12px] border border-neutral-200 shadow-[var(--shadow-sidebar)] p-5 max-h-[calc(100vh-6rem)] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider flex items-center gap-2">
              Filters
              {activeCount > 0 && (
                <span className="bg-primary-100 text-primary-700 text-xs font-bold px-2 py-0.5 rounded-full">
                  {activeCount}
                </span>
              )}
            </h3>
          </div>
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
                <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider flex items-center gap-2">
                  Filters
                  {activeCount > 0 && (
                    <span className="bg-primary-100 text-primary-700 text-xs font-bold px-2 py-0.5 rounded-full">
                      {activeCount}
                    </span>
                  )}
                </h3>
                <button
                  onClick={onClose}
                  className="p-1 text-neutral-400 hover:text-neutral-600 transition-colors"
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
