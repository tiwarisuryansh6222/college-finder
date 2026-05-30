'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useCompare } from '@/context/CompareContext';
import { useToast } from '@/context/ToastContext';
import { colleges as allColleges } from '@/lib/data/colleges';
import { College } from '@/lib/types';
import { CompareTable } from '@/components/compare/CompareTable';

// ── Empty slot with search ────────────────────────────────────────────────────
function SearchSlot({
  onSelect,
  selectedIds,
}: {
  onSelect: (c: College) => void;
  selectedIds: string[];
}) {
  const [query, setQuery] = useState('');
  const [open, setOpen]   = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const results =
    query.trim().length >= 1
      ? allColleges
          .filter(
            (c) =>
              !selectedIds.includes(c.id) &&
              c.name.toLowerCase().includes(query.toLowerCase())
          )
          .slice(0, 6)
      : [];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative flex-1 min-w-[220px]">
      <div className="bg-white border border-dashed border-neutral-300 rounded-xl p-4 flex flex-col items-center justify-center min-h-[80px] gap-2">
        <svg
          className="w-5 h-5 text-neutral-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          placeholder="Type to search colleges..."
          className="w-full text-sm text-neutral-700 placeholder-neutral-400 border border-neutral-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-400 bg-neutral-50 transition-all"
        />
      </div>

      {/* Dropdown */}
      {open && results.length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-neutral-200 rounded-xl shadow-lg z-20 overflow-hidden">
          {results.map((c) => {
            const initials = c.name.split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase();
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  onSelect(c);
                  setQuery('');
                  setOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-primary-50 transition-colors border-b border-neutral-50 last:border-0"
              >
                <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 font-bold text-xs flex items-center justify-center flex-shrink-0">
                  {initials}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-neutral-800 truncate">{c.name}</p>
                  <p className="text-xs text-neutral-400">{c.location}</p>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── Filled slot ───────────────────────────────────────────────────────────────
function FilledSlot({ college, onRemove }: { college: College; onRemove: () => void }) {
  const initials = college.name.split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase();
  return (
    <div className="flex-1 min-w-[220px] bg-white border border-primary-200 rounded-xl p-4 flex items-center gap-3 relative min-h-[80px]">
      {/* × remove */}
      <button
        type="button"
        onClick={onRemove}
        className="absolute top-2 right-2 text-neutral-400 hover:text-danger transition-colors text-lg leading-none"
        aria-label={`Remove ${college.name}`}
      >
        ×
      </button>
      {/* Logo 48px */}
      <div className="w-12 h-12 rounded-full bg-primary-100 text-primary-700 font-bold text-sm flex items-center justify-center flex-shrink-0">
        {initials}
      </div>
      <div className="min-w-0 pr-5">
        <p className="text-sm font-semibold text-neutral-800 leading-tight line-clamp-2">{college.name}</p>
        <p className="text-xs text-neutral-400 mt-0.5">{college.location}</p>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function ComparePage() {
  const { selected, add, remove, clear } = useCompare();
  const { showToast } = useToast();

  const handleAdd = (college: College) => {
    if (selected.length >= 3) {
      showToast('Maximum 3 colleges can be compared at once', 'error');
      return;
    }
    add(college);
  };

  const slots       = [0, 1, 2];
  const selectedIds = selected.map((c) => c.id);

  return (
    <div>

      {/* ── Page Header ────────────────────────────────────────────── */}
      <div className="bg-white border-b border-neutral-200 py-6 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-neutral-400 mb-2" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-primary-600 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-neutral-600">Compare Colleges</span>
          </nav>

          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-2xl font-bold text-neutral-900">Compare Colleges</h1>
              <p className="text-sm text-neutral-500 mt-1">
                Compare fees, placements, ratings and more side-by-side
              </p>
            </div>
            {selected.length > 0 && (
              <button
                type="button"
                onClick={clear}
                className="text-sm text-neutral-500 hover:text-danger border border-neutral-200 hover:border-red-200 rounded-lg px-4 py-2 transition-all"
              >
                Clear All
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── College Selector Row ────────────────────────────────────── */}
      <div className="bg-neutral-50 border-b border-neutral-200 py-5 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-3">
            Select colleges to compare
          </p>
          <div className="flex gap-6 flex-wrap">
            {slots.map((slot) => {
              const college = selected[slot];
              if (college) {
                return (
                  <FilledSlot
                    key={college.id}
                    college={college}
                    onRemove={() => remove(college.id)}
                  />
                );
              }
              // Show a search slot only if within one of the first available positions
              if (slot <= selected.length) {
                return (
                  <SearchSlot
                    key={`search-${slot}`}
                    onSelect={handleAdd}
                    selectedIds={selectedIds}
                  />
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>

      {/* ── Comparison Table ─────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <CompareTable colleges={selected} />
      </div>
    </div>
  );
}
