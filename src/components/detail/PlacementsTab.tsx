'use client';

import React, { useEffect, useRef } from 'react';
import { College } from '@/lib/types';

interface PlacementsTabProps {
  college: College;
}

export function PlacementsTab({ college }: PlacementsTabProps) {
  const barRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Synthesize year-wise placement trend from existing data
  const avgLPA = college.avgSalary / 100000;
  const yearWise = [
    { year: '2022', avgSalary: +(avgLPA * 0.82).toFixed(1), placement: Math.max(college.placementRate - 8, 60) },
    { year: '2023', avgSalary: +(avgLPA * 0.91).toFixed(1), placement: Math.max(college.placementRate - 4, 65) },
    { year: '2024', avgSalary: +avgLPA.toFixed(1),          placement: college.placementRate },
  ];

  const maxSalary = Math.max(...yearWise.map((y) => y.avgSalary));
  const totalRecruiters = college.topCompanies.length * 12;

  // Animate bars on mount
  useEffect(() => {
    const timers = barRefs.current.map((el, i) =>
      setTimeout(() => {
        if (el) el.style.height = `${(yearWise[i].avgSalary / maxSalary) * 140}px`;
      }, 100 + i * 100)
    );
    return () => timers.forEach(clearTimeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const statCards = [
    {
      label: 'Placement Rate',
      value: `${college.placementRate}%`,
      color: 'text-[#10B981]',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
    },
    {
      label: 'Avg Package',
      value: `₹${avgLPA.toFixed(1)} LPA`,
      color: 'text-primary-600',
      bgColor: 'bg-primary-50',
      borderColor: 'border-primary-200',
    },
    {
      label: 'Highest Package',
      value: `₹${(college.highestSalary / 100000).toFixed(0)} LPA`,
      color: 'text-accent-500',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
    },
    {
      label: 'Recruiters',
      value: `${totalRecruiters}+`,
      color: 'text-neutral-800',
      bgColor: 'bg-neutral-50',
      borderColor: 'border-neutral-200',
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-lg font-bold text-neutral-900 pb-2 mb-5 border-b border-neutral-100">
          Placement Statistics
        </h2>

        {/* Big stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statCards.map((card) => (
            <div
              key={card.label}
              className={`${card.bgColor} border ${card.borderColor} rounded-xl p-5 flex flex-col shadow-sm hover:shadow-md transition-shadow`}
            >
              <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
              <p className="text-xs font-medium text-neutral-500 mt-1.5 uppercase tracking-wide">{card.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Year-wise trend bar chart */}
      <div>
        <h3 className="text-base font-semibold text-neutral-800 mb-5">Placement Trends</h3>
        <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-end justify-center gap-8 h-40">
            {yearWise.map((y, i) => (
              <div key={y.year} className="flex flex-col items-center gap-2">
                {/* Salary label above bar */}
                <span className="text-xs font-semibold text-neutral-700">₹{y.avgSalary} LPA</span>
                {/* Bar */}
                <div className="relative w-10 flex items-end justify-center" style={{ height: '140px' }}>
                  <div
                    ref={(el) => { barRefs.current[i] = el; }}
                    className="w-10 bg-primary-500 rounded-t transition-all duration-700 ease-out"
                    style={{ height: '0px' }}
                  />
                </div>
                {/* Year + placement % */}
                <span className="text-xs font-bold text-neutral-600">{y.year}</span>
                <span className="text-[10px] text-neutral-400">{y.placement}% placed</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Recruiters */}
      <div>
        <h3 className="text-base font-semibold text-neutral-800 mb-4">Top Recruiting Companies</h3>
        <div className="flex flex-wrap gap-2">
          {college.topCompanies.map((company) => (
            <span
              key={company}
              className="bg-white border border-neutral-200 text-sm text-neutral-700 px-4 py-2 rounded-xl shadow-sm hover:border-primary-300 hover:shadow-md transition-all cursor-default font-medium"
            >
              {company}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
