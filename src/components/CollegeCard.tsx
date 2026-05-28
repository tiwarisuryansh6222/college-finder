'use client';

import React from 'react';
import Link from 'next/link';
import { College } from '@/lib/types';
import { Badge } from './Badge';
import { useCompare } from '@/context/CompareContext';
import { useSaved } from '@/context/SavedContext';

interface CollegeCardProps {
  college: College;
  showRemoveSaved?: boolean;
}

export function CollegeCard({ college, showRemoveSaved = false }: CollegeCardProps) {
  const { isSelected, add, remove } = useCompare();
  const { isSaved, toggle } = useSaved();
  const compared = isSelected(college.id);
  const saved = isSaved(college.id);

  const formatCurrency = (amount: number): string => {
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(amount % 100000 === 0 ? 0 : 1)}L`;
    }
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  return (
    <div className="group bg-white rounded-[12px] border border-neutral-200 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] hover:border-primary-500 transition-all duration-200 p-5 flex flex-col h-full">
      {/* Top Section */}
      <div className="flex gap-4 mb-4">
        {/* Logo avatar */}
        <div className="w-12 h-12 rounded-full bg-primary-50 border border-primary-100 flex items-center justify-center shrink-0 text-primary-700 font-bold text-base">
          {college.name.substring(0, 2).toUpperCase()}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-2">
            <Link
              href={`/colleges/${college.id}`}
              className="font-semibold text-primary-600 hover:text-primary-700 hover:underline text-base leading-tight line-clamp-2"
            >
              {college.name}
            </Link>
            {college.nirfRank && (
              <span className="shrink-0 bg-accent-500 text-neutral-900 text-[10px] font-bold px-2 py-0.5 rounded-[6px] uppercase tracking-wide">
                #{college.nirfRank} NIRF
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-1.5 mt-2">
            <span className="flex items-center gap-1 text-xs text-neutral-500 font-medium">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              {college.location}
            </span>
            <span className="w-1 h-1 bg-neutral-300 rounded-full"></span>
            <Badge variant="college-type" collegeType={college.type}>{college.type}</Badge>
            <span className="w-1 h-1 bg-neutral-300 rounded-full"></span>
            <Badge variant="naac" naacGrade={college.naacGrade}>NAAC {college.naacGrade}</Badge>
          </div>
        </div>
      </div>

      <hr className="border-neutral-100 mb-4" />

      {/* Stats pills */}
      <div className="flex gap-2 mb-5 mt-auto">
        <div className="flex-1 bg-neutral-50 rounded-lg p-2.5 text-center border border-neutral-100">
          <div className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium mb-1">Fees/Yr</div>
          <div className="text-sm font-semibold text-neutral-900">{formatCurrency(college.fees)}</div>
        </div>
        <div className="flex-1 bg-neutral-50 rounded-lg p-2.5 text-center border border-neutral-100">
          <div className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium mb-1">Rating</div>
          <div className="text-sm font-semibold text-neutral-900 flex items-center justify-center gap-1">
            <span className="text-accent-500 text-xs">⭐</span> {college.rating}
          </div>
        </div>
        <div className="flex-1 bg-neutral-50 rounded-lg p-2.5 text-center border border-neutral-100">
          <div className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium mb-1">Placement</div>
          <div className="text-sm font-semibold text-[#10B981]">{college.placementRate}%</div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Link
            href={`/colleges/${college.id}`}
            className="flex-1 text-center px-3 py-2 bg-white text-primary-600 border border-primary-600 text-sm font-semibold rounded-[8px] hover:bg-primary-50 transition-all focus:ring-2 focus:ring-primary-200"
          >
            View Details
          </Link>

          <label className="flex items-center gap-1.5 px-3 py-2 border border-neutral-200 rounded-[8px] cursor-pointer hover:bg-neutral-50 transition-colors text-xs font-medium text-neutral-600">
            <input
              type="checkbox"
              checked={compared}
              onChange={() => compared ? remove(college.id) : add(college)}
              className="w-4 h-4 text-primary-600 rounded border-neutral-300 focus:ring-primary-500 cursor-pointer"
            />
            Compare
          </label>

          <button
            onClick={(e) => {
              e.preventDefault();
              toggle(college);
            }}
            className={`p-2 rounded-[8px] border transition-all ${
              saved
                ? 'bg-red-50 border-red-200 text-red-500'
                : 'bg-white border-neutral-200 text-neutral-400 hover:border-red-200 hover:text-red-400'
            }`}
            title={saved ? 'Remove from saved' : 'Save college'}
          >
            <svg className="w-5 h-5" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>

        {showRemoveSaved && (
          <button
            onClick={(e) => {
              e.preventDefault();
              toggle(college);
            }}
            className="w-full px-3 py-2 text-xs font-medium text-[#EF4444] bg-red-50 hover:bg-red-100 rounded-[8px] transition-colors border border-red-100 flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Remove from saved
          </button>
        )}
      </div>
    </div>
  );
}
