'use client';

import React from 'react';
import Link from 'next/link';
import { College } from '@/lib/types';
import { StarRating } from './StarRating';
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
    <div className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col">
      {/* Image */}
      <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
        <img
          src={college.image}
          alt={college.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge variant="college-type" collegeType={college.type}>
            {college.type}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <Badge variant="naac">NAAC {college.naacGrade}</Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Name & Location */}
        <div className="mb-2">
          <h3 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-2 group-hover:text-indigo-600 transition-colors">
            {college.name}
          </h3>
          <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {college.location}
          </p>
        </div>

        {/* Rating */}
        <div className="mb-3">
          <StarRating rating={college.rating} size="sm" reviewCount={college.reviewCount} />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2 mb-4 mt-auto">
          <div className="bg-gray-50 rounded-lg p-2">
            <p className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">Fees/Year</p>
            <p className="text-sm font-bold text-gray-800">{formatCurrency(college.fees)}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-2">
            <p className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">Avg Package</p>
            <p className="text-sm font-bold text-emerald-600">{formatCurrency(college.avgSalary)}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Link
              href={`/colleges/${college.id}`}
              className="flex-1 text-center px-3 py-2 bg-indigo-600 text-white text-xs font-medium rounded-lg hover:bg-indigo-700 transition-all focus:ring-2 focus:ring-indigo-300"
            >
              View Details
            </Link>
            <button
              onClick={(e) => {
                e.preventDefault();
                compared ? remove(college.id) : add(college);
              }}
              className={`flex items-center justify-center gap-1.5 p-2 rounded-lg border text-xs font-medium transition-all ${
                compared
                  ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                  : 'bg-white border-gray-200 text-gray-600 hover:border-indigo-200 hover:text-indigo-600'
              }`}
              title={compared ? 'Remove from compare' : 'Add to compare'}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {/* scale icon */}
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </svg>
              {compared ? 'Compared' : 'Compare'}
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                toggle(college);
              }}
              className={`p-2 rounded-lg border transition-all ${
                saved
                  ? 'bg-red-50 border-red-200 text-red-500'
                  : 'border-gray-200 text-gray-400 hover:border-red-200 hover:text-red-400'
              }`}
              title={saved ? 'Remove from saved' : 'Save college'}
            >
              <svg
                className="w-4 h-4"
                fill={saved ? 'currentColor' : 'none'}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
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
              className="w-full px-3 py-2 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors border border-red-100 flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Remove from saved
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
