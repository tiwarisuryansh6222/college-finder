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
        <div className="flex items-center gap-2">
          <Link
            href={`/colleges/${college.id}`}
            className="flex-1 text-center px-3 py-2 bg-indigo-600 text-white text-xs font-medium rounded-lg hover:bg-indigo-700 transition-all focus:ring-2 focus:ring-indigo-300"
          >
            View Details
          </Link>
          <button
            onClick={() => compared ? remove(college.id) : add(college)}
            className={`p-2 rounded-lg border transition-all ${
              compared
                ? 'bg-indigo-50 border-indigo-200 text-indigo-600'
                : 'border-gray-200 text-gray-400 hover:border-indigo-200 hover:text-indigo-500'
            }`}
            title={compared ? 'Remove from compare' : 'Add to compare'}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </button>
          <button
            onClick={() => toggle(college)}
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
      </div>
    </div>
  );
}
