'use client';

import React, { useState, useMemo } from 'react';
import { colleges } from '@/lib/data/colleges';
import { useCompare } from '@/context/CompareContext';
import { Badge } from './Badge';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const { add, isSelected } = useCompare();

  const results = useMemo(() => {
    if (!query.trim()) return colleges.slice(0, 10);
    const q = query.toLowerCase();
    return colleges
      .filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.location.toLowerCase().includes(q) ||
          c.type.toLowerCase().includes(q)
      )
      .slice(0, 10);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[70vh] flex flex-col animate-[scaleIn_0.2s_ease-out]">
        {/* Header */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-900">Add College to Compare</h3>
            <button
              onClick={onClose}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <input
            type="text"
            placeholder="Search colleges..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            autoFocus
          />
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto p-2">
          {results.map((college) => {
            const selected = isSelected(college.id);
            return (
              <button
                key={college.id}
                onClick={() => {
                  if (!selected) {
                    add(college);
                    onClose();
                  }
                }}
                disabled={selected}
                className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all ${
                  selected
                    ? 'bg-indigo-50 opacity-60 cursor-not-allowed'
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-indigo-600">
                    {college.name.charAt(0)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{college.name}</p>
                  <p className="text-xs text-gray-500">{college.location}</p>
                </div>
                <Badge variant="college-type" collegeType={college.type}>
                  {college.type}
                </Badge>
                {selected && (
                  <span className="text-xs text-indigo-600 font-medium">Added</span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
