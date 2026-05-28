'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

/* ─── Stream definitions ────────────────────────────────── */
const STREAMS = [
  {
    name: 'Engineering',
    count: 12,
    color: 'text-primary-600',
    bg: 'bg-primary-50',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
      </svg>
    ),
  },
  {
    name: 'MBA',
    stream: 'Management',
    count: 8,
    color: 'text-primary-600',
    bg: 'bg-primary-50',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    name: 'Medical',
    count: 6,
    color: 'text-[#10B981]',
    bg: 'bg-emerald-50',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
      </svg>
    ),
  },
  {
    name: 'Law',
    count: 4,
    color: 'text-orange-500',
    bg: 'bg-orange-50',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    ),
  },
  {
    name: 'Design',
    count: 5,
    color: 'text-pink-500',
    bg: 'bg-pink-50',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    name: 'Science',
    count: 7,
    color: 'text-blue-500',
    bg: 'bg-blue-50',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15M14.25 3.104c.251.023.501.05.75.082M19.8 15a2.25 2.25 0 01-.659 1.591l-1.591 1.591a2.25 2.25 0 01-3.182 0L12 15.75m7.8-.75a2.25 2.25 0 00-.659-1.591L17.25 11.5M4.2 15a2.25 2.25 0 00.659 1.591l1.591 1.591a2.25 2.25 0 003.182 0L12 15.75" />
      </svg>
    ),
  },
  {
    name: 'Arts',
    count: 5,
    color: 'text-purple-500',
    bg: 'bg-purple-50',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
      </svg>
    ),
  },
  {
    name: 'Hospitality',
    count: 3,
    color: 'text-yellow-600',
    bg: 'bg-yellow-50',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
];

export function StreamExplorer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeStream = searchParams.get('stream') || '';

  // Only render when no stream filter is active
  if (activeStream) return null;

  const handleStreamClick = (streamName: string, streamParam?: string) => {
    const param = streamParam ?? streamName;
    const params = new URLSearchParams(searchParams.toString());
    params.set('stream', param);
    router.push(`/colleges?${params.toString()}`);
  };

  return (
    <section className="py-10 bg-neutral-50 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading row */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-neutral-800">Explore by Stream</h2>
          <Link
            href="/colleges"
            className="text-sm text-primary-600 hover:text-primary-700 hover:underline flex items-center gap-1"
          >
            View All Colleges
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STREAMS.map((stream) => {
            const streamParam = stream.stream ?? stream.name;
            const isActive = activeStream === streamParam;

            return (
              <button
                key={stream.name}
                onClick={() => handleStreamClick(stream.name, stream.stream)}
                className={`group text-left bg-white rounded-[12px] border p-5 cursor-pointer transition-all duration-200 ${
                  isActive
                    ? 'border-primary-600 bg-primary-50 shadow-[var(--shadow-card-hover)]'
                    : 'border-neutral-200 hover:shadow-[var(--shadow-card-hover)] hover:border-primary-300'
                }`}
              >
                {/* Icon circle */}
                <div className={`w-12 h-12 rounded-full ${stream.bg} flex items-center justify-center`}>
                  <span className={stream.color}>{stream.icon}</span>
                </div>

                {/* Name */}
                <p className="text-base font-semibold text-neutral-800 mt-3">{stream.name}</p>

                {/* Count */}
                <p className="text-sm text-neutral-500 mt-0.5">{stream.count} Colleges</p>

                {/* Arrow (hover only) */}
                <div className="flex items-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs text-primary-400 font-medium">Explore</span>
                  <svg className="w-3.5 h-3.5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
