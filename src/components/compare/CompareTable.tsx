'use client';

import React from 'react';
import { College } from '@/lib/types';
import { Badge } from '@/components/Badge';
import { StarRating } from '@/components/StarRating';
import { useCompare } from '@/context/CompareContext';

interface CompareTableProps {
  colleges: College[];
}

function getBestIndex(values: (number | null)[], mode: 'highest' | 'lowest'): number {
  const nums = values.map((v) => (v == null ? NaN : v));
  if (nums.every(isNaN)) return -1;
  const valid = nums.filter((v) => !isNaN(v));
  const best = mode === 'highest' ? Math.max(...valid) : Math.min(...valid);
  return nums.indexOf(best);
}

function getLevels(college: College): string[] {
  const levels = new Set<string>();
  college.courses.forEach((c) => {
    const n = c.name.toLowerCase();
    if (
      n.startsWith('b.') || n.startsWith('be ') || n.startsWith('b.e') ||
      n.startsWith('mbbs') || n.startsWith('bds') || n.startsWith('btech') ||
      n.startsWith('b.tech') || n.startsWith('bca') || n.startsWith('bsc')
    ) levels.add('UG');
    else if (
      n.startsWith('m.') || n.startsWith('mba') || n.startsWith('pgp') ||
      n.startsWith('md ') || n.startsWith('ms ') || n.startsWith('ll.m') ||
      n.startsWith('mtech') || n.startsWith('m.tech') || n.startsWith('mca') ||
      n.startsWith('msc') || n.startsWith('pgdm')
    ) levels.add('PG');
    else if (n.startsWith('ph.d') || n.startsWith('phd')) levels.add('PhD');
    else if (n.startsWith('diploma') || n.startsWith('poly') || n.startsWith('cert')) levels.add('Diploma');
    // default UG for unrecognised
    else levels.add('UG');
  });
  return Array.from(levels);
}

// ── Layout constants ──────────────────────────────────────────────────────────
const LABEL_W = 'w-[180px] min-w-[180px]';
const COL_W   = 'min-w-[220px]';

// ── Section divider row ───────────────────────────────────────────────────────
function SectionRow({ title, colCount }: { title: string; colCount: number }) {
  return (
    <tr>
      <td
        colSpan={1 + colCount}
        className="bg-neutral-100 py-2 px-4 text-xs font-bold text-neutral-500 uppercase tracking-widest"
      >
        {title}
      </td>
    </tr>
  );
}

// ── Data row ──────────────────────────────────────────────────────────────────
function DataRow({
  label,
  cells,
  evenRow,
}: {
  label: string;
  cells: React.ReactNode[];
  evenRow: boolean;
}) {
  return (
    <tr className={evenRow ? 'bg-neutral-50/40' : ''}>
      <td
        className={`${LABEL_W} py-3 px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wide bg-neutral-50 border-b border-neutral-100 align-top`}
      >
        {label}
      </td>
      {cells.map((cell, i) => (
        <td
          key={i}
          className={`${COL_W} py-3 px-4 text-sm text-neutral-700 border-b border-neutral-100 border-l border-neutral-100`}
        >
          {cell}
        </td>
      ))}
    </tr>
  );
}

// ── Best-value cell wrapper ───────────────────────────────────────────────────
function ValueCell({
  value,
  isBest,
  children,
}: {
  value?: string;
  isBest?: boolean;
  children?: React.ReactNode;
}) {
  if (isBest) {
    return (
      <div className="inline-flex items-center gap-1.5">
        <span className="text-sm font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border-l-2 border-emerald-400">
          {value ?? children}
        </span>
        <span className="text-[10px] text-emerald-500 font-semibold uppercase tracking-wide">Best</span>
      </div>
    );
  }
  if (children) return <>{children}</>;
  return <span className="text-sm text-neutral-700">{value}</span>;
}

// ── Main component ────────────────────────────────────────────────────────────
export function CompareTable({ colleges }: CompareTableProps) {
  const { remove } = useCompare();

  if (colleges.length < 2) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <svg
          className="w-14 h-14 text-neutral-200 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
        <p className="text-base font-semibold text-neutral-600 mb-1">Select at least 2 colleges to compare.</p>
        <p className="text-sm text-neutral-400">Use the search boxes above to add colleges</p>
      </div>
    );
  }

  const n = colleges.length;

  // ── Pre-compute best indices ──────────────────────────────────────────────
  const bestNirf   = getBestIndex(colleges.map((c) => c.nirfRank),      'lowest');
  const bestFees   = getBestIndex(colleges.map((c) => c.fees),           'lowest');
  const bestRate   = getBestIndex(colleges.map((c) => c.placementRate),  'highest');
  const bestAvgSal = getBestIndex(colleges.map((c) => c.avgSalary),      'highest');
  const bestHiSal  = getBestIndex(colleges.map((c) => c.highestSalary),  'highest');
  const bestRating = getBestIndex(colleges.map((c) => c.rating),         'highest');

  // Total program fees — estimate using first course duration
  const totalFeesArr = colleges.map((c) => {
    const dur = parseFloat(c.courses[0]?.duration) || 4;
    return c.fees * dur;
  });
  const bestTotalFees = getBestIndex(totalFeesArr, 'lowest');

  // Total recruiters proxy
  const recruiterArr = colleges.map((c) => c.topCompanies.length * 12);
  const bestRecruiters = getBestIndex(recruiterArr, 'highest');

  let rowIdx = 0;
  const nextRow = () => { rowIdx++; return rowIdx % 2 === 0; };

  return (
    <div className="bg-white border border-neutral-200 rounded-xl shadow-sm overflow-x-auto">
      <table className="w-full border-collapse">

        {/* ── Sticky column headers ─────────────────────────────────────── */}
        <thead>
          <tr
            className="border-b-2 border-primary-100 bg-white"
            style={{ position: 'sticky', top: '200px', zIndex: 30 }}
          >
            {/* Label cell */}
            <th
              className={`${LABEL_W} p-4 bg-neutral-50 text-left text-xs font-semibold text-neutral-400 uppercase tracking-wide border-r border-neutral-100`}
            >
              Category
            </th>
            {/* Per-college header */}
            {colleges.map((college) => {
              const initials = college.name
                .split(' ')
                .slice(0, 2)
                .map((w) => w[0])
                .join('')
                .toUpperCase();
              return (
                <th
                  key={college.id}
                  className={`${COL_W} p-4 text-left border-l border-neutral-100 relative`}
                >
                  {/* Remove × */}
                  <button
                    type="button"
                    onClick={() => remove(college.id)}
                    className="absolute top-2 right-2 text-neutral-400 hover:text-danger transition-colors text-lg leading-none"
                    aria-label={`Remove ${college.name}`}
                  >
                    ×
                  </button>
                  <div className="flex items-center gap-3 pr-6">
                    {/* Logo 40px */}
                    <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-700 font-bold text-sm flex items-center justify-center flex-shrink-0">
                      {initials}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-neutral-800 line-clamp-2 leading-snug">
                        {college.name}
                      </p>
                      <p className="text-xs text-neutral-400 mt-0.5 truncate">{college.location}</p>
                    </div>
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {/* ── SECTION: Basic Information ──────────────────────────────── */}
          <SectionRow title="Basic Information" colCount={n} />

          <DataRow
            label="NIRF Rank"
            evenRow={nextRow()}
            cells={colleges.map((c, i) => (
              <ValueCell key={c.id} value={`#${c.nirfRank}`} isBest={i === bestNirf} />
            ))}
          />

          <DataRow
            label="NAAC Grade"
            evenRow={nextRow()}
            cells={colleges.map((c) => (
              <Badge key={c.id} variant="naac" naacGrade={c.naacGrade}>
                NAAC {c.naacGrade}
              </Badge>
            ))}
          />

          <DataRow
            label="Location"
            evenRow={nextRow()}
            cells={colleges.map((c) => (
              <span key={c.id}>{c.location}</span>
            ))}
          />

          <DataRow
            label="College Type"
            evenRow={nextRow()}
            cells={colleges.map((c) => (
              <Badge key={c.id} variant="college-type" collegeType={c.type}>
                {c.type}
              </Badge>
            ))}
          />

          <DataRow
            label="Established"
            evenRow={nextRow()}
            cells={colleges.map((c) => (
              <span key={c.id}>{c.established}</span>
            ))}
          />

          <DataRow
            label="Approved By"
            evenRow={nextRow()}
            cells={colleges.map((c) => (
              <span key={c.id} className="text-xs text-neutral-500">
                UGC, AICTE
              </span>
            ))}
          />

          {/* ── SECTION: Academics ─────────────────────────────────────── */}
          <SectionRow title="Academics" colCount={n} />

          <DataRow
            label="Total Courses"
            evenRow={nextRow()}
            cells={colleges.map((c) => (
              <span key={c.id}>{c.courses.length} courses</span>
            ))}
          />

          <DataRow
            label="Levels Offered"
            evenRow={nextRow()}
            cells={colleges.map((c) => (
              <div key={c.id} className="flex flex-wrap gap-1">
                {getLevels(c).map((lvl) => (
                  <span
                    key={lvl}
                    className="bg-primary-50 text-primary-700 text-xs font-medium px-2 py-0.5 rounded-full border border-primary-200"
                  >
                    {lvl}
                  </span>
                ))}
              </div>
            ))}
          />

          {/* ── SECTION: Fees ──────────────────────────────────────────── */}
          <SectionRow title="Fees" colCount={n} />

          <DataRow
            label="Annual Fees"
            evenRow={nextRow()}
            cells={colleges.map((c, i) => (
              <ValueCell
                key={c.id}
                value={`₹${(c.fees / 100000).toFixed(1)}L`}
                isBest={i === bestFees}
              />
            ))}
          />

          <DataRow
            label="Total Program Fees"
            evenRow={nextRow()}
            cells={colleges.map((c, i) => (
              <ValueCell
                key={c.id}
                value={`₹${(totalFeesArr[i] / 100000).toFixed(1)}L`}
                isBest={i === bestTotalFees}
              />
            ))}
          />

          {/* ── SECTION: Placements ─────────────────────────────────────── */}
          <SectionRow title="Placements" colCount={n} />

          <DataRow
            label="Placement Rate"
            evenRow={nextRow()}
            cells={colleges.map((c, i) => (
              <ValueCell
                key={c.id}
                value={`${c.placementRate}%`}
                isBest={i === bestRate}
              />
            ))}
          />

          <DataRow
            label="Avg Package"
            evenRow={nextRow()}
            cells={colleges.map((c, i) => (
              <ValueCell
                key={c.id}
                value={`₹${(c.avgSalary / 100000).toFixed(1)} LPA`}
                isBest={i === bestAvgSal}
              />
            ))}
          />

          <DataRow
            label="Highest Package"
            evenRow={nextRow()}
            cells={colleges.map((c, i) => (
              <ValueCell
                key={c.id}
                value={`₹${(c.highestSalary / 100000).toFixed(0)} LPA`}
                isBest={i === bestHiSal}
              />
            ))}
          />

          <DataRow
            label="Total Recruiters"
            evenRow={nextRow()}
            cells={colleges.map((c, i) => (
              <ValueCell
                key={c.id}
                value={`${recruiterArr[i]}+`}
                isBest={i === bestRecruiters}
              />
            ))}
          />

          <DataRow
            label="Top Companies"
            evenRow={nextRow()}
            cells={colleges.map((c) => (
              <div key={c.id} className="flex flex-wrap gap-1">
                {c.topCompanies.slice(0, 3).map((co) => (
                  <span
                    key={co}
                    className="bg-neutral-100 text-neutral-600 text-xs px-2 py-0.5 rounded-full"
                  >
                    {co}
                  </span>
                ))}
              </div>
            ))}
          />

          {/* ── SECTION: Student Ratings ────────────────────────────────── */}
          <SectionRow title="Student Ratings" colCount={n} />

          <DataRow
            label="Overall Rating"
            evenRow={nextRow()}
            cells={colleges.map((c, i) => (
              <div key={c.id} className="flex items-center gap-2">
                <StarRating rating={c.rating} size="sm" showNumber />
                {i === bestRating && (
                  <span className="text-[10px] text-emerald-500 font-semibold uppercase tracking-wide">
                    Best
                  </span>
                )}
              </div>
            ))}
          />

          <DataRow
            label="Review Count"
            evenRow={nextRow()}
            cells={colleges.map((c) => (
              <span key={c.id}>
                {(c.reviewCount ?? 0).toLocaleString()} reviews
              </span>
            ))}
          />
        </tbody>

        {/* ── Apply Now footer ─────────────────────────────────────────── */}
        <tfoot>
          <tr className="border-t-2 border-neutral-100">
            <td className="p-4 bg-neutral-50" />
            {colleges.map((c) => (
              <td key={c.id} className="p-4 border-l border-neutral-100">
                <button
                  type="button"
                  className="w-full bg-accent-500 hover:bg-accent-600 text-gray-900 text-sm font-semibold py-2.5 rounded-lg transition-colors"
                >
                  Apply to {c.name.split(' ')[0]}
                </button>
              </td>
            ))}
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
