'use client';

import React, { useState, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CourseData } from '@/lib/data/courses';

const STREAM_TABS = [
  { label: 'All Courses', value: '' },
  { label: 'Engineering', value: 'Engineering' },
  { label: 'MBA', value: 'Management' }, // Or MBA, matching the courses data 'MBA' or 'Management'
  { label: 'Medical', value: 'Medical' },
  { label: 'Law', value: 'Law' },
  { label: 'Design', value: 'Design' },
  { label: 'Science', value: 'Science' },
  { label: 'Arts', value: 'Arts' },
  { label: 'Hospitality', value: 'Hospitality' },
];

const LEVEL_TABS = ['All', 'UG', 'PG', 'Diploma', 'Certificate'];

const STREAM_COLORS: Record<string, string> = {
  Engineering: 'bg-primary-600',
  MBA: 'bg-blue-500',
  Management: 'bg-blue-500', // Added just in case
  Medical: 'bg-success',
  Law: 'bg-orange-500',
  Design: 'bg-pink-500',
  Science: 'bg-cyan-500',
  Arts: 'bg-purple-500',
  Hospitality: 'bg-yellow-500',
};

const DEMAND_COLORS: Record<string, string> = {
  'Very High': 'bg-emerald-100 text-emerald-700',
  'High': 'bg-blue-100 text-blue-700',
  'Growing': 'bg-amber-100 text-amber-700',
  'Medium': 'bg-neutral-100 text-neutral-600',
};

function formatCurrency(amount: number) {
  return `${(amount / 100000).toFixed(1)}`;
}

export default function CoursesClient({ initialCourses }: { initialCourses: CourseData[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [searchQuery, setSearchQuery] = useState('');
  
  // URL params for stream and level
  const activeStream = searchParams.get('stream') || '';
  const activeLevel = searchParams.get('level') || 'All';

  // Handlers for URL updates
  const setStream = (stream: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (stream) params.set('stream', stream);
    else params.delete('stream');
    router.push(`/courses?${params.toString()}`);
  };

  const setLevel = (level: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (level && level !== 'All') params.set('level', level);
    else params.delete('level');
    router.push(`/courses?${params.toString()}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled client-side on every keystroke, but we keep the form to prevent reload
  };

  // Filter courses
  const filteredCourses = useMemo(() => {
    return initialCourses.filter((c) => {
      // 1. Search Query
      if (searchQuery && !c.name.toLowerCase().includes(searchQuery.toLowerCase()) && !c.fullName.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      // 2. Stream
      if (activeStream && c.stream !== activeStream && activeStream !== 'All Courses') {
        // Handle 'MBA' vs 'Management' edge case if any
        if (activeStream === 'Management' && c.stream !== 'MBA') return false;
        if (activeStream !== 'Management' && c.stream !== activeStream) return false;
      }
      // 3. Level
      if (activeLevel && activeLevel !== 'All' && c.level !== activeLevel) {
        return false;
      }
      return true;
    });
  }, [initialCourses, searchQuery, activeStream, activeLevel]);

  return (
    <div className="bg-neutral-50 min-h-screen pb-20">
      
      {/* ── PAGE HERO ── */}
      <div className="bg-gradient-to-r from-[#4C1D95] via-[#6D28D9] to-[#7C3AED] py-14 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white leading-tight">
            Explore 40+ Courses Across 8 Streams
          </h1>
          <p className="text-base text-white/70 mt-4 max-w-2xl mx-auto leading-relaxed">
            Find the right course, know the fees, entrance exams, and career paths
          </p>

          <form
            onSubmit={handleSearchSubmit}
            className="bg-white rounded-xl shadow-2xl mt-8 flex items-center overflow-hidden mx-auto max-w-2xl"
          >
            <div className="flex items-center gap-2 px-4 shrink-0 border-r border-neutral-200">
              <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
              <span className="text-sm text-neutral-600 whitespace-nowrap py-4">Course Name</span>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search courses..."
              className="flex-1 px-4 py-4 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none bg-transparent"
            />
            <button
              type="submit"
              className="flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-neutral-900 font-semibold px-7 py-4 text-sm transition-all shrink-0"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search
            </button>
          </form>
        </div>
      </div>

      {/* ── STREAM FILTER TABS ── */}
      <div className="bg-white border-b border-neutral-200 shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 flex items-center overflow-x-auto hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {STREAM_TABS.map((tab) => {
            const isActive = activeStream === tab.value || (activeStream === 'Management' && tab.value === 'MBA');
            return (
              <button
                key={tab.value}
                onClick={() => setStream(tab.value === 'MBA' ? 'Management' : tab.value)}
                className={`px-5 py-3 text-sm font-medium whitespace-nowrap transition-all border-b-2 shrink-0 ${
                  isActive
                    ? 'text-primary-600 border-primary-600 font-semibold bg-primary-50'
                    : 'text-neutral-500 border-transparent hover:text-primary-600'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── COURSE LEVEL FILTER ── */}
      <div className="max-w-7xl mx-auto px-4 mt-6">
        <div className="flex flex-wrap gap-2">
          {LEVEL_TABS.map((level) => {
            const isActive = activeLevel === level;
            return (
              <button
                key={level}
                onClick={() => setLevel(level)}
                className={`px-4 py-1.5 text-sm font-medium rounded-full border transition-colors ${
                  isActive
                    ? 'bg-primary-600 text-white border-primary-600 shadow-sm'
                    : 'bg-white text-neutral-600 border-neutral-200 hover:border-primary-300 hover:text-primary-600'
                }`}
              >
                {level}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-7xl mx-auto px-4 mt-8">
        
        {/* RESULT COUNT */}
        <div className="mb-4">
          <span className="text-sm text-neutral-500">
            Showing {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* GRID */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => {
              const streamColorClass = STREAM_COLORS[course.stream] || 'bg-neutral-400';
              const demandColorClass = DEMAND_COLORS[course.demandLevel] || DEMAND_COLORS['Medium'];

              return (
                <div
                  key={course.id}
                  className="bg-white border border-neutral-200 rounded-[12px] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] hover:border-primary-200 transition-all duration-300 p-5 flex flex-col h-full"
                >
                  {/* TOP ROW */}
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${streamColorClass}`} />
                      <span className="text-xs text-neutral-400 font-medium uppercase tracking-wider">{course.stream}</span>
                    </div>
                    <span className="text-[10px] font-bold bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded border border-neutral-200 uppercase tracking-wide">
                      {course.level}
                    </span>
                  </div>

                  {/* COURSE NAME */}
                  <h3 className="text-lg font-semibold text-neutral-900 mt-2 leading-tight">
                    {course.name}
                  </h3>
                  <p className="text-sm text-neutral-500 mt-0.5">{course.fullName}</p>

                  <div className="flex-1" />

                  {/* STATS ROW */}
                  <div className="flex items-center gap-4 mt-4 pt-4 border-t border-neutral-100">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1 text-neutral-700">
                        <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span className="text-sm font-semibold">{course.duration}</span>
                      </div>
                      <span className="text-[10px] text-neutral-400 uppercase tracking-wide">Duration</span>
                    </div>
                    
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1 text-neutral-700">
                        <span className="font-semibold text-sm">₹{formatCurrency(course.minFees)}–{formatCurrency(course.maxFees)}L/yr</span>
                      </div>
                      <span className="text-[10px] text-neutral-400 uppercase tracking-wide">Annual Fees</span>
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1 text-neutral-700">
                        <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                        <span className="text-sm font-semibold">{course.collegesCount}</span>
                      </div>
                      <span className="text-[10px] text-neutral-400 uppercase tracking-wide">Colleges</span>
                    </div>
                  </div>

                  {/* DEMAND BADGE */}
                  <div className="mt-4">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-md ${demandColorClass}`}>
                      {course.demandLevel} Demand
                    </span>
                  </div>

                  {/* ENTRANCE EXAMS */}
                  <div className="mt-4">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-xs text-neutral-400 mr-1 font-medium">Via:</span>
                      {course.entranceExams.slice(0, 3).map((exam) => (
                        <span key={exam} className="bg-primary-50 text-primary-700 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-primary-100">
                          {exam}
                        </span>
                      ))}
                      {course.entranceExams.length > 3 && (
                        <span className="text-[10px] text-neutral-400">+{course.entranceExams.length - 3}</span>
                      )}
                    </div>
                  </div>

                  {/* TOP SKILLS */}
                  <div className="mt-3 mb-5">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {course.topSkills.slice(0, 3).map((skill) => (
                        <span key={skill} className="bg-neutral-100 text-neutral-600 text-[10px] font-medium px-2 py-0.5 rounded-full border border-neutral-200">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* BOTTOM CTA */}
                  <div className="mt-auto pt-4 border-t border-neutral-100">
                    <button
                      onClick={() => {
                        // Navigate to /colleges with stream and maybe course query
                        const p = new URLSearchParams();
                        p.set('stream', course.stream === 'MBA' ? 'Management' : course.stream);
                        p.set('q', course.name);
                        router.push(`/colleges?${p.toString()}`);
                      }}
                      className="w-full text-center py-2 text-sm font-semibold text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors border border-transparent hover:border-primary-100"
                    >
                      Explore Colleges →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-[12px] border border-neutral-200 p-12 text-center max-w-2xl mx-auto shadow-sm mt-8">
            <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-display font-semibold text-neutral-900">No courses found</h3>
            <p className="text-neutral-500 mt-2">
              We couldn't find any courses matching your current filters. Try searching with a different term or clearing your filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setStream('');
                setLevel('');
              }}
              className="mt-6 px-6 py-2 bg-primary-50 text-primary-700 font-medium rounded-lg hover:bg-primary-100 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
