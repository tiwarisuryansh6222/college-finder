'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { FEES_RANGE } from '@/lib/constants';

// ── Types ────────────────────────────────────────────────────────────────────
type NirfRange = 'top10' | 'top25' | 'top50' | 'top100' | 'unranked';

const STREAMS = ['Engineering', 'MBA', 'Medical', 'Law', 'Design', 'Science', 'Arts', 'Hospitality'] as const;

const STATES_ALL = [
  'Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu', 'Telangana',
  'Gujarat', 'Rajasthan', 'Uttar Pradesh', 'Madhya Pradesh', 'West Bengal',
];

const COLLEGE_TYPES_ALL = ['All Types', 'Government', 'Private', 'Deemed', 'Autonomous'] as const;

const NAAC_GRADES_ALL = ['A++', 'A+', 'A', 'B++', 'B+', 'Not Accredited'] as const;
const NAAC_COLORS: Record<string, string> = {
  'A++': 'bg-emerald-100 text-emerald-800',
  'A+':  'bg-teal-100 text-teal-800',
  'A':   'bg-blue-100 text-blue-800',
  'B++': 'bg-yellow-100 text-yellow-800',
  'B+':  'bg-orange-100 text-orange-800',
  'Not Accredited': 'bg-neutral-100 text-neutral-600',
};

const NIRF_RANGES: { label: string; value: NirfRange }[] = [
  { label: 'Top 10', value: 'top10' },
  { label: 'Top 25', value: 'top25' },
  { label: 'Top 50', value: 'top50' },
  { label: 'Top 100', value: 'top100' },
  { label: 'Unranked', value: 'unranked' },
];

const RATING_ROWS = [
  { label: '4★ & above', value: '4' },
  { label: '3★ & above', value: '3' },
  { label: '2★ & above', value: '2' },
  { label: 'All ratings', value: '' },
];

const FEES_PRESETS = [
  { label: '< ₹1L', min: 0, max: 100000 },
  { label: '₹1–5L', min: 100000, max: 500000 },
  { label: '₹5–10L', min: 500000, max: 1000000 },
  { label: '> ₹10L', min: 1000000, max: 2000000 },
];

// ── Collapsible group ─────────────────────────────────────────────────────────
function FilterGroup({
  title,
  defaultOpen = false,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-neutral-100 last:border-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between py-3 px-4 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors cursor-pointer"
      >
        <span>{title}</span>
        <svg
          className={`w-4 h-4 text-neutral-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
interface CollegeFiltersProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CollegeFilters({ isOpen, onClose }: CollegeFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Local draft state (applied only on "Apply Filters")
  const [streams,   setStreams]   = useState<string[]>(() => searchParams.get('stream')?.split(',').filter(Boolean) || []);
  const [states,    setStates]    = useState<string[]>(() => searchParams.get('state')?.split(',').filter(Boolean) || []);
  const [type,      setType]      = useState<string>(() => searchParams.get('type') || '');
  const [minFees,   setMinFees]   = useState<number>(() => Number(searchParams.get('minFees') || FEES_RANGE[0]));
  const [maxFees,   setMaxFees]   = useState<number>(() => Number(searchParams.get('maxFees') || FEES_RANGE[1]));
  const [rating,    setRating]    = useState<string>(() => searchParams.get('rating') || '');
  const [naac,      setNaac]      = useState<string[]>(() => searchParams.get('naac')?.split(',').filter(Boolean) || []);
  const [nirf,      setNirf]      = useState<string[]>(() => searchParams.get('nirf')?.split(',').filter(Boolean) || []);
  const [showAllStates, setShowAllStates] = useState(false);

  // Sync draft from URL when params change (e.g. back button / "Clear All")
  useEffect(() => {
    setStreams(searchParams.get('stream')?.split(',').filter(Boolean) || []);
    setStates(searchParams.get('state')?.split(',').filter(Boolean) || []);
    setType(searchParams.get('type') || '');
    setMinFees(Number(searchParams.get('minFees') || FEES_RANGE[0]));
    setMaxFees(Number(searchParams.get('maxFees') || FEES_RANGE[1]));
    setRating(searchParams.get('rating') || '');
    setNaac(searchParams.get('naac')?.split(',').filter(Boolean) || []);
    setNirf(searchParams.get('nirf')?.split(',').filter(Boolean) || []);
  }, [searchParams]);

  // Active count
  const activeCount =
    streams.length +
    states.length +
    (type && type !== 'All Types' ? 1 : 0) +
    (minFees !== FEES_RANGE[0] || maxFees !== FEES_RANGE[1] ? 1 : 0) +
    (rating ? 1 : 0) +
    naac.length +
    nirf.length;

  const handleClearAll = () => {
    setStreams([]); setStates([]); setType('');
    setMinFees(FEES_RANGE[0]); setMaxFees(FEES_RANGE[1]);
    setRating(''); setNaac([]); setNirf([]);
    router.replace('/colleges', { scroll: false });
    onClose();
  };

  const handleApply = () => {
    const params = new URLSearchParams(searchParams.toString());

    // preserve existing params that aren't filter-related
    const q = params.get('q');
    const sort = params.get('sort');
    params.delete('stream'); params.delete('state'); params.delete('type');
    params.delete('minFees'); params.delete('maxFees'); params.delete('rating');
    params.delete('naac'); params.delete('nirf');
    if (q) params.set('q', q);
    if (sort) params.set('sort', sort);

    if (streams.length) params.set('stream', streams.join(','));
    if (states.length) params.set('state', states.join(','));
    if (type && type !== 'All Types') params.set('type', type);
    if (minFees !== FEES_RANGE[0]) params.set('minFees', minFees.toString());
    if (maxFees !== FEES_RANGE[1]) params.set('maxFees', maxFees.toString());
    if (rating) params.set('rating', rating);
    if (naac.length) params.set('naac', naac.join(','));
    if (nirf.length) params.set('nirf', nirf.join(','));

    const str = params.toString();
    router.replace(`/colleges${str ? `?${str}` : ''}`, { scroll: false });
    onClose();
  };

  const toggleArr = (arr: string[], val: string, setArr: (a: string[]) => void) => {
    setArr(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);
  };

  // ── Fees range helpers ───────────────────────────────────────────────────
  const feesPercMin = ((minFees - FEES_RANGE[0]) / (FEES_RANGE[1] - FEES_RANGE[0])) * 100;
  const feesPercMax = ((maxFees - FEES_RANGE[0]) / (FEES_RANGE[1] - FEES_RANGE[0])) * 100;

  const handleMinSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Math.min(Number(e.target.value), maxFees - 50000);
    setMinFees(v);
  };
  const handleMaxSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Math.max(Number(e.target.value), minFees + 50000);
    setMaxFees(v);
  };

  const fmt = (v: number) => `₹${(v / 100000).toFixed(1)}L`;

  const activePreset = FEES_PRESETS.find((p) => p.min === minFees && p.max === maxFees);

  const visibleStates = showAllStates ? STATES_ALL : STATES_ALL.slice(0, 5);

  // ── Sidebar content ──────────────────────────────────────────────────────
  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-100 flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-neutral-700">Filters</span>
          {activeCount > 0 && (
            <span className="bg-primary-600 text-white text-xs font-semibold rounded-full px-2 py-0.5 leading-none">
              {activeCount}
            </span>
          )}
        </div>
        {activeCount > 0 && (
          <button
            type="button"
            onClick={handleClearAll}
            className="text-xs text-primary-600 hover:text-primary-700 font-medium transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Scrollable filter groups */}
      <div className="flex-1 overflow-y-auto">

        {/* GROUP 1 — Stream */}
        <FilterGroup title="Stream" defaultOpen={true}>
          <div className="space-y-1">
            {STREAMS.map((s) => (
              <label key={s} className="flex items-center gap-2.5 py-1.5 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={streams.includes(s)}
                  onChange={() => toggleArr(streams, s, setStreams)}
                  className="w-4 h-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500 cursor-pointer"
                />
                <span className="text-sm text-neutral-700 group-hover:text-neutral-900 transition-colors">{s}</span>
              </label>
            ))}
          </div>
        </FilterGroup>

        {/* GROUP 2 — Location */}
        <FilterGroup title="Location / State" defaultOpen={true}>
          <div className="space-y-1">
            {visibleStates.map((s) => (
              <label key={s} className="flex items-center gap-2.5 py-1.5 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={states.includes(s)}
                  onChange={() => toggleArr(states, s, setStates)}
                  className="w-4 h-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500 cursor-pointer"
                />
                <span className="text-sm text-neutral-700 group-hover:text-neutral-900 transition-colors">{s}</span>
              </label>
            ))}
            <button
              type="button"
              onClick={() => setShowAllStates((v) => !v)}
              className="text-xs text-primary-600 hover:text-primary-700 font-medium mt-1 transition-colors"
            >
              {showAllStates ? '− Show less' : `+ Show ${STATES_ALL.length - 5} more`}
            </button>
          </div>
        </FilterGroup>

        {/* GROUP 3 — College Type */}
        <FilterGroup title="College Type" defaultOpen={false}>
          <div className="space-y-1">
            {COLLEGE_TYPES_ALL.map((t) => (
              <label key={t} className="flex items-center gap-2.5 py-1.5 cursor-pointer group">
                <input
                  type="radio"
                  name="college-type"
                  checked={type === t || (t === 'All Types' && !type)}
                  onChange={() => setType(t === 'All Types' ? '' : t)}
                  className="w-4 h-4 border-neutral-300 text-primary-600 focus:ring-primary-500 cursor-pointer"
                />
                <span className="text-sm text-neutral-700 group-hover:text-neutral-900 transition-colors">{t}</span>
              </label>
            ))}
          </div>
        </FilterGroup>

        {/* GROUP 4 — Fees */}
        <FilterGroup title="Fees Range" defaultOpen={true}>
          <div>
            <p className="text-sm text-primary-600 font-medium mb-3 text-center">
              {fmt(minFees)} – {fmt(maxFees)}
            </p>
            {/* Dual-thumb range slider */}
            <div className="relative h-6 mb-3">
              <div className="absolute top-1/2 -translate-y-1/2 w-full h-1.5 bg-neutral-200 rounded-full" />
              <div
                className="absolute top-1/2 -translate-y-1/2 h-1.5 bg-primary-600 rounded-full"
                style={{ left: `${feesPercMin}%`, width: `${feesPercMax - feesPercMin}%` }}
              />
              <input
                type="range" min={FEES_RANGE[0]} max={FEES_RANGE[1]} step={50000}
                value={minFees} onChange={handleMinSlider}
                className="range-slider-thumb absolute top-0 w-full h-6 appearance-none bg-transparent pointer-events-none z-10"
              />
              <input
                type="range" min={FEES_RANGE[0]} max={FEES_RANGE[1]} step={50000}
                value={maxFees} onChange={handleMaxSlider}
                className="range-slider-thumb absolute top-0 w-full h-6 appearance-none bg-transparent pointer-events-none z-20"
              />
            </div>
            {/* Preset pills */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {FEES_PRESETS.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => { setMinFees(p.min); setMaxFees(p.max); }}
                  className={`text-xs px-2.5 py-1 rounded-full font-medium transition-all ${
                    activePreset?.label === p.label
                      ? 'bg-primary-600 text-white'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </FilterGroup>

        {/* GROUP 5 — Rating */}
        <FilterGroup title="Rating" defaultOpen={false}>
          <div className="space-y-1">
            {RATING_ROWS.map((r) => (
              <button
                key={r.value}
                type="button"
                onClick={() => setRating(r.value === rating ? '' : r.value)}
                className={`w-full flex items-center gap-2 px-2 py-2 rounded text-sm transition-all ${
                  r.value === rating
                    ? 'bg-primary-50 border-l-2 border-primary-600 pl-[6px]'
                    : 'hover:bg-neutral-50 border-l-2 border-transparent pl-[6px]'
                }`}
              >
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: r.value ? Number(r.value) : 5 }).map((_, i) => (
                    <svg key={i} className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-neutral-700">{r.label}</span>
              </button>
            ))}
          </div>
        </FilterGroup>

        {/* GROUP 6 — NAAC Grade */}
        <FilterGroup title="NAAC Grade" defaultOpen={false}>
          <div className="space-y-1">
            {NAAC_GRADES_ALL.map((g) => (
              <label key={g} className="flex items-center gap-2.5 py-1.5 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={naac.includes(g)}
                  onChange={() => toggleArr(naac, g, setNaac)}
                  className="w-4 h-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500 cursor-pointer"
                />
                <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${NAAC_COLORS[g]}`}>{g}</span>
              </label>
            ))}
          </div>
        </FilterGroup>

        {/* GROUP 7 — NIRF Rank */}
        <FilterGroup title="NIRF Rank" defaultOpen={false}>
          <div className="space-y-1">
            {NIRF_RANGES.map((n) => (
              <label key={n.value} className="flex items-center gap-2.5 py-1.5 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={nirf.includes(n.value)}
                  onChange={() => toggleArr(nirf, n.value, setNirf)}
                  className="w-4 h-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500 cursor-pointer"
                />
                <span className="text-sm text-neutral-700 group-hover:text-neutral-900 transition-colors">{n.label}</span>
              </label>
            ))}
          </div>
        </FilterGroup>
      </div>

      {/* Sticky Apply button */}
      <div className="flex-shrink-0 px-4 pt-3 pb-4 border-t border-neutral-200 bg-white">
        <button
          type="button"
          onClick={handleApply}
          className="w-full bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg py-2.5 transition-colors shadow-sm"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* ── Desktop sticky sidebar ───────────────────────────────────────── */}
      <aside className="hidden lg:flex flex-col w-[280px] flex-shrink-0">
        <div
          className="sticky bg-white border border-neutral-200 rounded-r-xl shadow-sm overflow-hidden flex flex-col"
          style={{ top: '120px', maxHeight: 'calc(100vh - 136px)' }}
        >
          {sidebarContent}
        </div>
      </aside>

      {/* ── Mobile bottom-sheet drawer ───────────────────────────────────── */}
      {isOpen && (
        <>
          {/* backdrop */}
          <div
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            onClick={onClose}
          />
          {/* sheet */}
          <div
            className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl shadow-xl lg:hidden flex flex-col"
            style={{ maxHeight: '90vh', animation: 'slideUp 0.25s ease-out' }}
          >
            {/* drag handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 bg-neutral-300 rounded-full" />
            </div>
            <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-100">
              <span className="font-semibold text-neutral-800 text-sm">Filters</span>
              <button
                type="button"
                onClick={onClose}
                className="p-1 text-neutral-400 hover:text-neutral-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">{sidebarContent}</div>
          </div>
        </>
      )}
    </>
  );
}
