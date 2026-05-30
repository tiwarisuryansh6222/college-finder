'use client';

import React from 'react';
import Link from 'next/link';
import { College } from '@/lib/types';
import { Badge } from './Badge';
import { StarRating } from './StarRating';
import { useCompare } from '@/context/CompareContext';
import { useSaved } from '@/context/SavedContext';
import { useToast } from '@/context/ToastContext';

interface CollegeCardProps {
  college: College;
  showRemoveSaved?: boolean;
}

export function CollegeCard({ college, showRemoveSaved = false }: CollegeCardProps) {
  const { isSelected, add, remove } = useCompare();
  const { isSaved, toggle } = useSaved();
  const { showToast } = useToast();
  const compared = isSelected(college.id);
  const saved = isSaved(college.id);

  // CompareContext.add already fires the max-3 toast internally
  const handleCompareToggle = () => {
    compared ? remove(college.id) : add(college);
  };

  const initials = college.name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

  const feesFormatted = `₹${(college.fees / 100000).toFixed(1)}L/yr`;
  const placementFormatted = `${college.placementRate}%`;
  const salaryFormatted = `₹${(college.avgSalary / 100000).toFixed(1)} LPA`;
  const nirfLabel = college.nirfRank ? `#${college.nirfRank}` : 'NR';

  // Show up to 4 course names
  const courseNames = college.courses.slice(0, 4).map((c) => c.name);
  const extraCourses = college.courses.length - 4;

  return (
    <div className="w-full bg-white rounded-xl border border-neutral-200 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] hover:border-primary-200 transition-all duration-200 mb-3 flex overflow-hidden group">

      {/* ── LEFT PANEL: rank + logo ───────────────────────────────────────── */}
      <div className="w-[90px] flex-shrink-0 bg-neutral-50 flex flex-col items-center justify-center p-3 border-r border-neutral-100">
        {college.nirfRank ? (
          <>
            <span className="text-2xl font-bold text-accent-500 leading-none">#{college.nirfRank}</span>
            <span className="text-[10px] text-neutral-400 tracking-widest uppercase mt-0.5">NIRF</span>
          </>
        ) : (
          <span className="text-sm font-medium text-neutral-400">NR</span>
        )}

        {/* Logo */}
        <div className="mt-3 w-12 h-12 rounded-full border border-neutral-200 bg-primary-100 text-primary-700 font-bold text-sm flex items-center justify-center overflow-hidden flex-shrink-0">
          {college.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={college.logo} alt={college.name} className="w-full h-full object-cover" />
          ) : (
            initials
          )}
        </div>
      </div>

      {/* ── MAIN SECTION ─────────────────────────────────────────────────── */}
      <div className="flex-1 min-w-0 p-4 flex flex-col gap-2">

        {/* ROW 1 — Identity */}
        <div className="flex items-start justify-between gap-2">
          <Link
            href={`/colleges/${college.id}`}
            className="text-base font-semibold text-primary-600 hover:text-primary-700 hover:underline cursor-pointer leading-tight line-clamp-2 flex-1 min-w-0"
          >
            {college.name}
          </Link>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <Badge variant="naac" naacGrade={college.naacGrade}>NAAC {college.naacGrade}</Badge>
            <Badge variant="college-type" collegeType={college.type}>{college.type}</Badge>
          </div>
        </div>

        {/* ROW 2 — Rating + Location */}
        <div className="flex items-center gap-3 flex-wrap">
          <StarRating rating={college.rating} size="sm" showNumber={true} />
          <span className="text-xs text-neutral-400">({college.reviewCount?.toLocaleString() ?? 0} reviews)</span>
          <span className="w-px h-3 bg-neutral-300" />
          <div className="flex items-center gap-1 text-sm text-neutral-500">
            {/* Map-pin icon */}
            <svg className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-xs">{college.location}</span>
          </div>
        </div>

        <div className="border-t border-neutral-100" />

        {/* ROW 3 — Courses */}
        <div className="flex items-center flex-wrap gap-1.5">
          <span className="text-xs font-medium text-neutral-400 uppercase tracking-wide mr-1">Courses:</span>
          {courseNames.map((name) => (
            <span
              key={name}
              className="bg-neutral-100 text-neutral-600 text-xs px-2 py-0.5 rounded-full"
            >
              {name}
            </span>
          ))}
          {extraCourses > 0 && (
            <span className="text-xs text-primary-600 font-medium">+{extraCourses} more</span>
          )}
        </div>

        <div className="border-t border-neutral-100" />

        {/* ROW 4 — Key stats */}
        <div className="flex items-center gap-4 flex-wrap">
          {/* Fees */}
          <div className="flex flex-col items-center gap-0.5">
            <div className="flex items-center gap-0.5">
              <svg className="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-semibold text-neutral-800">{feesFormatted}</span>
            </div>
            <span className="text-xs text-neutral-400">Annual Fees</span>
          </div>

          {/* Placement */}
          <div className="flex flex-col items-center gap-0.5">
            <div className="flex items-center gap-0.5">
              <svg className="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span className="text-sm font-semibold text-neutral-800">{placementFormatted}</span>
            </div>
            <span className="text-xs text-neutral-400">Placement</span>
          </div>

          {/* Avg Salary */}
          <div className="flex flex-col items-center gap-0.5">
            <div className="flex items-center gap-0.5">
              <svg className="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-semibold text-neutral-800">{salaryFormatted}</span>
            </div>
            <span className="text-xs text-neutral-400">Avg Package</span>
          </div>

          {/* NIRF Rank */}
          <div className="flex flex-col items-center gap-0.5">
            <div className="flex items-center gap-0.5">
              <svg className="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              <span className="text-sm font-semibold text-neutral-800">{nirfLabel}</span>
            </div>
            <span className="text-xs text-neutral-400">NIRF Rank</span>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL: actions ──────────────────────────────────────────── */}
      <div className="w-[160px] flex-shrink-0 p-4 flex flex-col gap-2 border-l border-neutral-100">
        {/* Apply Now */}
        <button
          type="button"
          className="w-full bg-accent-500 hover:bg-accent-600 text-gray-900 text-sm font-semibold rounded-lg py-2 text-center transition-colors shadow-sm"
        >
          Apply Now
        </button>

        {/* View Details */}
        <Link
          href={`/colleges/${college.id}`}
          className="w-full text-sm rounded-lg py-2 text-center border border-primary-600 text-primary-600 hover:bg-primary-50 transition-colors block"
        >
          View Details
        </Link>

        {/* Save + Compare row */}
        <div className="flex items-center justify-between mt-1">
          {/* Heart / save */}
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); toggle(college); }}
            title={saved ? 'Remove from saved' : 'Save college'}
            className={`p-1.5 rounded-lg transition-all ${
              saved
                ? 'text-red-500 bg-red-50'
                : 'text-neutral-400 hover:text-red-400 hover:bg-red-50'
            }`}
          >
            <svg className="w-5 h-5" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>

          {/* Compare checkbox */}
          <label className="flex items-center gap-1.5 cursor-pointer group">
            <span
              className={`w-3.5 h-3.5 border-2 rounded-sm flex items-center justify-center transition-all ${
                compared
                  ? 'bg-primary-600 border-primary-600'
                  : 'border-neutral-400 group-hover:border-primary-600'
              }`}
              onClick={handleCompareToggle}
            >
              {compared && (
                <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </span>
            <span className="text-xs text-neutral-500 group-hover:text-neutral-700 transition-colors">Compare</span>
          </label>
        </div>

        {/* Remove from saved (if shown on saved page) */}
        {showRemoveSaved && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              toggle(college);
              showToast('Removed from shortlist', 'info');
            }}
            className="w-full px-2 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors border border-red-200 flex items-center justify-center gap-1.5 mt-1"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Remove
          </button>
        )}
      </div>
    </div>
  );
}
