import React from 'react';
import { College } from '@/lib/types';

interface PlacementsTabProps {
  college: College;
}

export function PlacementsTab({ college }: PlacementsTabProps) {
  const formatCurrency = (amount: number): string => {
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(amount % 100000 === 0 ? 0 : 1)}L`;
    }
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const stats = [
    {
      label: 'Average Salary',
      value: formatCurrency(college.avgSalary),
      color: 'from-emerald-500 to-emerald-600',
      icon: (
        <svg className="w-8 h-8 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      label: 'Highest Salary',
      value: formatCurrency(college.highestSalary),
      color: 'from-violet-500 to-violet-600',
      icon: (
        <svg className="w-8 h-8 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
    {
      label: 'Placement Rate',
      value: `${college.placementRate}%`,
      color: 'from-indigo-500 to-indigo-600',
      icon: (
        <svg className="w-8 h-8 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      {/* Stat Cards */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">Placement Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={`bg-gradient-to-br ${stat.color} rounded-xl p-6 text-white shadow-lg`}
            >
              <div className="flex items-center justify-between mb-3">
                {stat.icon}
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-white/80 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Top Companies */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">Top Recruiting Companies</h3>
        <div className="flex flex-wrap gap-2">
          {college.topCompanies.map((company) => (
            <span
              key={company}
              className="inline-flex items-center px-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-700 transition-all cursor-default"
            >
              {company}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
