'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

function IconSearch({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}
function IconMapPin({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

const QUICK_LINKS = [
  { label: 'Top Engineering Colleges', q: 'Engineering', stream: 'Engineering' },
  { label: 'Top MBA Colleges', q: 'MBA', stream: 'Management' },
  { label: 'NEET Medical Colleges', q: 'Medical', stream: 'Medical' },
  { label: 'Top IITs', q: 'IIT', stream: 'Engineering' },
  { label: 'Top NITs', q: 'NIT', stream: 'Engineering' },
];

export function HeroSection() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set('q', query.trim());
    router.push(`/colleges${params.toString() ? `?${params.toString()}` : ''}`);
  };

  const handleQuickLink = (q: string, stream: string) => {
    const params = new URLSearchParams();
    if (q) params.set('q', q);
    if (stream) params.set('stream', stream);
    router.push(`/colleges?${params.toString()}`);
  };

  return (
    <>
      {/* ── Gradient hero ── */}
      <div className="bg-gradient-to-r from-[#4C1D95] via-[#6D28D9] to-[#7C3AED] py-14 px-6">
        <div className="max-w-4xl mx-auto text-center">

          {/* Eyebrow pill */}
          <div className="inline-flex items-center bg-white/10 text-white/80 text-xs px-3 py-1 rounded-full mb-4">
            🎓 India's Most Trusted College Discovery Platform
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white leading-tight mt-2">
            Find Your Perfect College.
            <br />
            <span className="text-primary-200">Compare. Shortlist. Apply.</span>
          </h1>

          {/* Subtext */}
          <p className="text-base text-white/70 mt-4 max-w-2xl mx-auto leading-relaxed">
            Explore 30+ colleges across Engineering, MBA, Medical, Law, Design and more.
            Make informed decisions with real data.
          </p>

          {/* Search bar */}
          <form
            onSubmit={handleSearch}
            className="bg-white rounded-xl shadow-2xl mt-8 flex items-center overflow-hidden"
          >
            {/* Location prefix */}
            <div className="flex items-center gap-2 px-4 shrink-0 border-r border-neutral-200">
              <IconMapPin className="w-4 h-4 text-neutral-400 shrink-0" />
              <span className="text-sm text-neutral-600 whitespace-nowrap py-4">All India</span>
            </div>

            {/* Search input */}
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search colleges, courses, exams..."
              className="flex-1 px-4 py-4 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none bg-transparent"
            />

            {/* CTA button */}
            <button
              type="submit"
              className="flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-neutral-900 font-semibold px-7 py-4 text-sm transition-all shrink-0 self-stretch"
            >
              <IconSearch className="w-4 h-4" />
              Search
            </button>
          </form>

          {/* Quick links */}
          <div className="flex flex-wrap justify-center items-center gap-2 mt-5">
            <span className="text-white/60 text-xs">Popular:</span>
            {QUICK_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => handleQuickLink(link.q, link.stream)}
                className="bg-white/10 hover:bg-white/20 text-white text-xs px-3 py-1 rounded-full cursor-pointer transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Stats bar (white, below gradient) ── */}
      <div className="bg-white border-b border-neutral-200 py-4">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center justify-around divide-x divide-neutral-200">
            {[
              { number: '30+', label: 'Colleges Listed' },
              { number: '8', label: 'Career Streams' },
              { number: '15+', label: 'States Covered' },
              { number: '500+', label: 'Courses Available' },
            ].map((stat) => (
              <div key={stat.label} className="flex-1 text-center px-4">
                <div className="text-2xl font-bold text-primary-600">{stat.number}</div>
                <div className="text-xs text-neutral-500 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
