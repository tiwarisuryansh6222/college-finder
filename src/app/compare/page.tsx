'use client';

import React, { useState } from 'react';
import { useCompare } from '@/context/CompareContext';
import { EmptyState } from '@/components/EmptyState';
import { SearchModal } from '@/components/SearchModal';
import { Badge } from '@/components/Badge';
import { StarRating } from '@/components/StarRating';

interface CompareRow {
  label: string;
  getValue: (i: number) => string;
  getNumeric?: (i: number) => number;
  highlight?: 'highest' | 'lowest';
  isBadge?: boolean;
  isNaacBadge?: boolean;
  isRating?: boolean;
  isLong?: boolean;
}

interface CompareSection {
  title: string;
  rows: CompareRow[];
}

export default function ComparePage() {
  const { selected, remove, clear } = useCompare();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatCurrency = (amount: number): string => {
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(amount % 100000 === 0 ? 0 : 1)}L`;
    }
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  if (selected.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <EmptyState
          title="No colleges to compare"
          description="You haven't selected any colleges to compare. Go to the college listing and add colleges to compare."
          actionLabel="Browse Colleges"
          actionHref="/colleges"
        />
      </div>
    );
  }

  const getBestValue = (
    values: number[],
    mode: 'highest' | 'lowest'
  ): number => {
    if (mode === 'highest') return Math.max(...values);
    return Math.min(...values);
  };

  const sections: CompareSection[] = [
    {
      title: 'Basic Information',
      rows: [
        { label: 'College Name', getValue: (i: number) => selected[i].name },
        { label: 'Location', getValue: (i: number) => selected[i].location },
        { label: 'Type', getValue: (i: number) => selected[i].type, isBadge: true },
        { label: 'Established', getValue: (i: number) => selected[i].established.toString() },
        { label: 'NAAC Grade', getValue: (i: number) => selected[i].naacGrade, isNaacBadge: true },
        { label: 'NIRF Rank', getValue: (i: number) => `#${selected[i].nirfRank}` },
      ],
    },
    {
      title: 'Fees',
      rows: [
        {
          label: 'Annual Fees',
          getValue: (i: number) => formatCurrency(selected[i].fees),
          getNumeric: (i: number) => selected[i].fees,
          highlight: 'lowest' as const,
        },
      ],
    },
    {
      title: 'Academics',
      rows: [
        { label: 'Total Courses', getValue: (i: number) => selected[i].totalCourses.toString() },
        {
          label: 'Courses Offered',
          getValue: (i: number) =>
            selected[i].courses.map((c) => c.name).join(', '),
          isLong: true,
        },
      ],
    },
    {
      title: 'Placements',
      rows: [
        {
          label: 'Avg Salary',
          getValue: (i: number) => formatCurrency(selected[i].avgSalary),
          getNumeric: (i: number) => selected[i].avgSalary,
          highlight: 'highest' as const,
        },
        {
          label: 'Highest Salary',
          getValue: (i: number) => formatCurrency(selected[i].highestSalary),
          getNumeric: (i: number) => selected[i].highestSalary,
          highlight: 'highest' as const,
        },
        {
          label: 'Placement Rate',
          getValue: (i: number) => `${selected[i].placementRate}%`,
          getNumeric: (i: number) => selected[i].placementRate,
          highlight: 'highest' as const,
        },
        {
          label: 'Top Companies',
          getValue: (i: number) => selected[i].topCompanies.join(', '),
          isLong: true,
        },
      ],
    },
    {
      title: 'Ratings',
      rows: [
        {
          label: 'Overall Rating',
          getValue: (i: number) => selected[i].rating.toString(),
          getNumeric: (i: number) => selected[i].rating,
          highlight: 'highest' as const,
          isRating: true,
        },
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Comparing {selected.length} College{selected.length > 1 ? 's' : ''}
          </h1>
          <p className="text-sm text-gray-500 mt-1">Side-by-side comparison of selected colleges</p>
        </div>
        <div className="flex gap-2">
          {selected.length < 3 && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add College
            </button>
          )}
          <button
            onClick={clear}
            className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden overflow-x-auto">
        <table className="w-full min-w-[640px]">
          {/* College Headers */}
          <thead>
            <tr className="border-b border-gray-100">
              <th className="w-44 p-4 bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                College
              </th>
              {selected.map((college) => (
                <th key={college.id} className="p-4 text-center border-l border-gray-100">
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mb-2">
                      <span className="text-xl font-bold text-indigo-600">{college.name.charAt(0)}</span>
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">{college.name}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{college.location}</p>
                    <button
                      onClick={() => remove(college.id)}
                      className="mt-2 text-xs text-red-500 hover:text-red-600 font-medium transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {sections.map((section) => (
              <React.Fragment key={section.title}>
                {/* Section Header */}
                <tr>
                  <td
                    colSpan={selected.length + 1}
                    className="px-4 py-3 bg-indigo-50 text-xs font-bold text-indigo-700 uppercase tracking-wider"
                  >
                    {section.title}
                  </td>
                </tr>
                {/* Section Rows */}
                {section.rows.map((row) => {
                  const numericValues = row.getNumeric
                    ? selected.map((_, i) => row.getNumeric!(i))
                    : [];
                  const bestVal = row.highlight
                    ? getBestValue(numericValues, row.highlight)
                    : null;

                  return (
                    <tr key={row.label} className="border-b border-gray-50 hover:bg-gray-50/50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-500 bg-gray-50/50">
                        {row.label}
                      </td>
                      {selected.map((college, i) => {
                        const value = row.getValue(i);
                        const isHighlighted = bestVal !== null && row.getNumeric && row.getNumeric(i) === bestVal;

                        return (
                          <td
                            key={college.id}
                            className={`px-4 py-3 text-center border-l border-gray-50 ${
                              isHighlighted ? 'bg-emerald-50' : ''
                            }`}
                          >
                            {row.isRating ? (
                              <div className="flex justify-center">
                                <StarRating rating={selected[i].rating} size="sm" />
                              </div>
                            ) : row.isBadge ? (
                              <Badge variant="college-type" collegeType={selected[i].type}>
                                {value}
                              </Badge>
                            ) : row.isNaacBadge ? (
                              <Badge variant="naac">{value}</Badge>
                            ) : (
                              <span
                                className={`text-sm ${
                                  isHighlighted
                                    ? 'font-bold text-emerald-700'
                                    : 'text-gray-700'
                                } ${row.isLong ? 'text-xs leading-relaxed' : ''}`}
                              >
                                {value}
                              </span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <SearchModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
