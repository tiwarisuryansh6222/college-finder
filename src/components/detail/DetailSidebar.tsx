'use client';

import React from 'react';
import Link from 'next/link';
import { College } from '@/lib/types';
import { Badge } from '@/components/Badge';
import { useCompare } from '@/context/CompareContext';
import { useSaved } from '@/context/SavedContext';
import { colleges } from '@/lib/data/colleges';

interface DetailSidebarProps {
  college: College;
}

export function DetailSidebar({ college }: DetailSidebarProps) {
  const { isSelected, add, remove } = useCompare();
  const { isSaved, toggle } = useSaved();
  const compared = isSelected(college.id);
  const saved = isSaved(college.id);

  const initials = college.name.split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase();

  // Similar colleges: same type, different id
  const similar = colleges
    .filter((c) => c.type === college.type && c.id !== college.id)
    .slice(0, 3);

  return (
    <aside className="w-full md:w-[280px] lg:w-[320px] flex-shrink-0">
      <div className="sticky" style={{ top: '140px' }}>

        {/* ── Card 1: Quick info ──────────────────────────────────────────── */}
        <div className="bg-white border border-neutral-200 rounded-xl shadow-sm p-5">
          {/* Logo + name */}
          <div className="flex items-center gap-3 pb-4 border-b border-neutral-100">
            <div className="w-14 h-14 rounded-full bg-primary-100 text-primary-700 font-bold text-lg flex items-center justify-center flex-shrink-0 border-2 border-primary-200 overflow-hidden">
              {college.logo
                ? <img src={college.logo} alt={college.name} className="w-full h-full object-cover" />
                : initials
              }
            </div>
            <div className="min-w-0">
              <p className="text-base font-semibold text-neutral-800 leading-tight line-clamp-2">{college.name}</p>
              <p className="text-xs text-neutral-400 mt-0.5">{college.location}</p>
            </div>
          </div>

          {/* Quick info list */}
          <div className="py-3 space-y-0 border-b border-neutral-100">
            {[
              { label: 'Location',    value: college.location },
              { label: 'Type',        value: college.type },
              { label: 'Established', value: college.established.toString() },
              { label: 'NAAC Grade',  value: college.naacGrade },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between items-center py-2 border-b border-neutral-50 last:border-0">
                <span className="text-sm text-neutral-500">{label}</span>
                <span className="text-sm font-medium text-neutral-700 text-right max-w-[55%] line-clamp-1">{value}</span>
              </div>
            ))}
          </div>

          {/* Fees highlight */}
          <div className="bg-primary-50 border border-primary-200 rounded-xl p-4 mt-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary-600 mb-1">Annual Fees</p>
            <p className="text-2xl font-bold text-primary-700">₹{(college.fees / 100000).toFixed(1)}L</p>
            <p className="text-xs text-primary-400 mt-0.5">per year</p>
          </div>

          {/* Placement highlight */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mt-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600 mb-1">Avg Placement</p>
            <p className="text-2xl font-bold text-emerald-600">₹{(college.avgSalary / 100000).toFixed(1)} LPA</p>
          </div>

          {/* CTA buttons */}
          <div className="mt-5 flex flex-col gap-2">
            <button
              type="button"
              className="w-full bg-accent-500 hover:bg-accent-600 text-gray-900 text-sm font-semibold py-2.5 rounded-lg transition-colors shadow-sm"
            >
              Apply Now
            </button>
            <button
              type="button"
              className="w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-sm font-medium py-2.5 rounded-lg transition-colors"
            >
              Download Brochure
            </button>
            <button
              type="button"
              onClick={() => (compared ? remove(college.id) : add(college))}
              className={`w-full text-sm font-medium py-2.5 rounded-lg border transition-all ${
                compared
                  ? 'bg-primary-50 text-primary-700 border-primary-300'
                  : 'text-neutral-600 border-neutral-200 hover:bg-neutral-50'
              }`}
            >
              {compared ? '✓ Added to Compare' : 'Add to Compare'}
            </button>
            <button
              type="button"
              onClick={() => toggle(college)}
              className={`w-full flex items-center justify-center gap-2 text-sm font-medium py-2.5 rounded-lg border transition-all ${
                saved
                  ? 'bg-red-50 text-red-600 border-red-200'
                  : 'text-neutral-600 border-neutral-200 hover:bg-neutral-50'
              }`}
            >
              <svg className="w-4 h-4" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {saved ? 'Shortlisted' : 'Shortlist'}
            </button>
          </div>
        </div>

        {/* ── Card 2: Similar Colleges ───────────────────────────────────── */}
        {similar.length > 0 && (
          <div className="bg-white border border-neutral-200 rounded-xl shadow-sm p-4 mt-4">
            <p className="text-sm font-semibold text-neutral-700 mb-3">Similar Colleges</p>
            <div className="flex flex-col">
              {similar.map((c, i) => {
                const sim_initials = c.name.split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase();
                return (
                  <div
                    key={c.id}
                    className={`flex items-center gap-3 py-3 ${i < similar.length - 1 ? 'border-b border-neutral-100' : ''}`}
                  >
                    <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 font-bold text-xs flex items-center justify-center flex-shrink-0">
                      {sim_initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/colleges/${c.id}`}
                        className="text-sm text-primary-600 hover:text-primary-700 hover:underline font-medium leading-tight line-clamp-2 block"
                      >
                        {c.name}
                      </Link>
                      <p className="text-xs text-neutral-400 mt-0.5">⭐ {c.rating} · {c.location.split(',')[1]?.trim()}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
