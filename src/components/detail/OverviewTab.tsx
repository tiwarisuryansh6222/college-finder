import React from 'react';
import { College } from '@/lib/types';

interface OverviewTabProps {
  college: College;
}

export function OverviewTab({ college }: OverviewTabProps) {
  const formatCurrency = (amount: number): string => {
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(amount % 100000 === 0 ? 0 : 1)}L`;
    }
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const stats = [
    { label: 'Established', value: college.established.toString(), icon: '🏛️' },
    { label: 'Total Courses', value: college.totalCourses.toString(), icon: '📚' },
    { label: 'Placement Rate', value: `${college.placementRate}%`, icon: '📈' },
    { label: 'Avg Salary', value: formatCurrency(college.avgSalary), icon: '💰' },
  ];

  return (
    <div className="space-y-8">
      {/* Overview */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-3">About {college.name}</h3>
        <p className="text-gray-600 leading-relaxed">{college.overview}</p>
      </div>

      {/* Key Stats */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">Key Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100 p-4 text-center hover:shadow-md transition-shadow"
            >
              <span className="text-2xl mb-2 block">{stat.icon}</span>
              <p className="text-xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Location */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-3">Location</h3>
        <div className="flex items-center gap-2 text-gray-600">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{college.location}</span>
        </div>
      </div>
    </div>
  );
}
