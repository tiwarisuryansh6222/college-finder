import React from 'react';
import { Course } from '@/lib/types';

interface CoursesTabProps {
  courses: Course[];
}

export function CoursesTab({ courses }: CoursesTabProps) {
  const formatCurrency = (amount: number): string => {
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(amount % 100000 === 0 ? 0 : 1)}L`;
    }
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  return (
    <div>
      <h3 className="text-lg font-bold text-gray-900 mb-4">Courses Offered</h3>
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Course Name
              </th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Duration
              </th>
              <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Fees (per year)
              </th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr
                key={course.name}
                className={`border-b border-gray-50 hover:bg-indigo-50/50 transition-colors ${
                  index % 2 === 1 ? 'bg-gray-50/50' : ''
                }`}
              >
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-gray-900">{course.name}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-600">{course.duration}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-sm font-semibold text-gray-800">{formatCurrency(course.fees)}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
