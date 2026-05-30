'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { College } from '@/lib/types';
import { colleges } from '@/lib/data/colleges';
import { StarRating } from '@/components/StarRating';
import { Badge } from '@/components/Badge';
import { useCompare } from '@/context/CompareContext';
import { useSaved } from '@/context/SavedContext';
import { OverviewTab }   from '@/components/detail/OverviewTab';
import { CoursesTab }    from '@/components/detail/CoursesTab';
import { PlacementsTab } from '@/components/detail/PlacementsTab';
import { AdmissionsTab } from '@/components/detail/AdmissionsTab';
import { ReviewsTab }    from '@/components/detail/ReviewsTab';
import { DetailSidebar } from '@/components/detail/DetailSidebar';

type Tab = 'overview' | 'courses' | 'placements' | 'admissions' | 'reviews';

const TABS: { key: Tab; label: string }[] = [
  { key: 'overview',   label: 'Overview' },
  { key: 'courses',    label: 'Courses & Fees' },
  { key: 'placements', label: 'Placements' },
  { key: 'admissions', label: 'Admissions' },
  { key: 'reviews',    label: 'Reviews' },
];

// ── Loading skeleton ──────────────────────────────────────────────────────────
function LoadingSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-72 bg-gradient-to-r from-violet-900 to-violet-700 w-full" />
      <div className="h-12 bg-white border-b border-neutral-200 w-full" />
      <div className="max-w-7xl mx-auto px-4 py-8 flex gap-8">
        <div className="flex-1 space-y-5">
          <div className="h-7 bg-neutral-200 rounded w-2/3" />
          <div className="h-4 bg-neutral-200 rounded w-1/2" />
          <div className="space-y-2 mt-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-4 bg-neutral-200 rounded" style={{ width: `${90 - i * 10}%` }} />
            ))}
          </div>
          <div className="grid grid-cols-3 gap-4 mt-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-20 bg-neutral-100 rounded-xl" />
            ))}
          </div>
        </div>
        <div className="w-[320px] hidden lg:block space-y-4">
          <div className="h-96 bg-neutral-100 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

// ── Star icon (filled amber) ──────────────────────────────────────────────────
const StarIcon = ({ filled = true }: { filled?: boolean }) => (
  <svg className={`w-5 h-5 ${filled ? 'text-amber-400' : 'text-neutral-500'}`} fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

export default function CollegeDetailPage() {
  const params = useParams();
  const [college, setCollege] = useState<College | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [tabsStuck, setTabsStuck] = useState(false);

  const { isSelected, add, remove } = useCompare();
  const { isSaved, toggle } = useSaved();

  // Section refs for scroll-to
  const headerRef     = useRef<HTMLDivElement>(null);
  const tabBarRef     = useRef<HTMLDivElement>(null);
  const overviewRef   = useRef<HTMLDivElement>(null);
  const coursesRef    = useRef<HTMLDivElement>(null);
  const placementsRef = useRef<HTMLDivElement>(null);
  const admissionsRef = useRef<HTMLDivElement>(null);
  const reviewsRef    = useRef<HTMLDivElement>(null);

  const sectionRefs: Record<Tab, React.RefObject<HTMLDivElement | null>> = {
    overview:   overviewRef,
    courses:    coursesRef,
    placements: placementsRef,
    admissions: admissionsRef,
    reviews:    reviewsRef,
  };

  // Load college
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      const found = colleges.find((c) => c.id === params.id);
      setCollege(found || null);
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [params.id]);

  // Sticky tab detection
  useEffect(() => {
    const onScroll = () => {
      const headerBottom = headerRef.current?.getBoundingClientRect().bottom ?? 0;
      setTabsStuck(headerBottom <= 64); // 64px = navbar height
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll-spy: update active tab based on scroll position
  useEffect(() => {
    const onScroll = () => {
      const OFFSET = 180;
      const order: Tab[] = ['reviews', 'admissions', 'placements', 'courses', 'overview'];
      for (const tab of order) {
        const el = sectionRefs[tab].current;
        if (el && el.getBoundingClientRect().top <= OFFSET) {
          setActiveTab(tab);
          return;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollToSection = (tab: Tab) => {
    setActiveTab(tab);
    const el = sectionRefs[tab].current;
    if (el) {
      const offset = 160; // below sticky nav height
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  if (isLoading) return <LoadingSkeleton />;

  if (!college) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <svg className="w-16 h-16 text-neutral-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 className="text-2xl font-bold text-neutral-700 mb-2">College not found</h2>
        <p className="text-neutral-400">The college you&apos;re looking for doesn&apos;t exist.</p>
      </div>
    );
  }

  const compared = isSelected(college.id);
  const saved = isSaved(college.id);
  const initials = college.name.split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase();

  // Derive quick stats from existing data
  const campusSize   = `${(college.totalCourses * 2 + college.established % 50).toFixed(0)} Acres`;
  const totalStudents = (college.totalCourses * 180).toLocaleString();
  const facultyCount  = Math.floor(college.totalCourses * 4.5);

  return (
    <div>
      {/* ══════════════════════════════════════════
          SECTION A — COLLEGE HEADER (full-width banner)
      ══════════════════════════════════════════ */}
      <div
        ref={headerRef}
        className="w-full py-10 px-6"
        style={{ background: 'linear-gradient(135deg, #4C1D95 0%, #7C3AED 100%)' }}
      >
        <div className="max-w-7xl mx-auto">

          {/* ROW 1: Identity */}
          <div className="flex items-start gap-6 flex-wrap">
            {/* Logo */}
            <div className="w-20 h-20 rounded-full bg-white border-4 border-white shadow-xl flex items-center justify-center overflow-hidden flex-shrink-0">
              {college.logo
                ? <img src={college.logo} alt={college.name} className="w-full h-full object-cover" />
                : <span className="text-primary-700 font-bold text-xl">{initials}</span>
              }
            </div>

            {/* Name + location + badges */}
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl font-bold text-white font-display leading-tight">{college.name}</h1>

              <div className="flex items-center gap-1.5 mt-1.5 text-white/70 text-sm">
                <svg className="w-4 h-4 text-white/60 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{college.location}</span>
              </div>

              <div className="flex flex-wrap gap-2 mt-2.5">
                <span className="bg-white/10 text-white text-xs px-3 py-1 rounded-full border border-white/20">{college.type}</span>
                <span className="bg-white/10 text-white text-xs px-3 py-1 rounded-full border border-white/20">
                  Estd. {college.established}
                </span>
                <span className="text-white/60 text-xs self-center">Approved by: UGC, AICTE</span>
              </div>
            </div>
          </div>

          {/* ROW 2: Quick stats */}
          <div className="mt-6 flex gap-6 flex-wrap">
            {[
              { label: 'Established', value: college.established.toString() },
              { label: 'Campus',      value: campusSize },
              { label: 'Students',    value: totalStudents },
              { label: 'Faculty',     value: `${facultyCount}` },
            ].map((s) => (
              <div key={s.label} className="flex flex-col">
                <span className="text-xl font-bold text-white">{s.value}</span>
                <span className="text-white/60 text-xs uppercase tracking-wide">{s.label}</span>
              </div>
            ))}
          </div>

          {/* ROW 3: Badges */}
          <div className="mt-4 flex flex-wrap gap-3 items-center">
            <Badge variant="naac" naacGrade={college.naacGrade}>NAAC {college.naacGrade}</Badge>
            <span className="bg-amber-400 text-gray-900 font-bold text-xs px-3 py-1 rounded-full">
              NIRF #{college.nirfRank}
            </span>
            {/* Star rating */}
            <div className="flex items-center gap-1.5">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} filled={i < Math.round(college.rating)} />
                ))}
              </div>
              <span className="text-white/90 text-sm font-medium">{college.rating}/5</span>
              <span className="text-white/60 text-xs">({college.reviewCount?.toLocaleString()} reviews)</span>
            </div>
          </div>

          {/* ROW 4: CTA buttons */}
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              className="bg-amber-400 hover:bg-amber-500 text-gray-900 font-semibold px-6 py-2.5 rounded-lg transition-colors shadow-md text-sm"
            >
              Apply Now
            </button>
            <button
              type="button"
              className="bg-white/10 text-white border border-white/30 px-6 py-2.5 rounded-lg hover:bg-white/20 transition-colors text-sm font-medium"
            >
              Download Brochure
            </button>
            <button
              type="button"
              onClick={() => (compared ? remove(college.id) : add(college))}
              className={`px-5 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                compared
                  ? 'bg-white/20 text-white border-white/40'
                  : 'bg-transparent text-white border-white/30 hover:bg-white/10'
              }`}
            >
              {compared ? '✓ In Compare' : 'Add to Compare'}
            </button>
            {/* Heart shortlist */}
            <button
              type="button"
              onClick={() => toggle(college)}
              className={`p-2.5 rounded-lg border transition-all ${
                saved
                  ? 'bg-red-500/20 border-red-400/40 text-red-300'
                  : 'bg-white/10 border-white/30 text-white/80 hover:bg-white/20'
              }`}
              title={saved ? 'Remove from shortlist' : 'Shortlist'}
            >
              <svg className="w-5 h-5" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          SECTION B — STICKY SUB-NAV TABS
      ══════════════════════════════════════════ */}
      <div
        ref={tabBarRef}
        className={`bg-white border-b border-neutral-200 z-40 transition-shadow ${
          tabsStuck ? 'fixed left-0 right-0 shadow-md' : 'relative'
        }`}
        style={tabsStuck ? { top: '64px' } : {}}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto scrollbar-none">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => scrollToSection(tab.key)}
                className={`px-6 py-4 text-sm whitespace-nowrap border-b-2 transition-all ${
                  activeTab === tab.key
                    ? 'text-primary-600 font-semibold border-primary-600'
                    : 'text-neutral-500 font-medium border-transparent hover:text-primary-600 hover:border-primary-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Spacer when tabs are fixed to prevent content jump */}
      {tabsStuck && <div className="h-14" />}

      {/* ══════════════════════════════════════════
          SECTION C — MAIN CONTENT + SIDEBAR
      ══════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 items-start">

        {/* LEFT: tab sections */}
        <div className="flex-1 min-w-0 flex flex-col gap-12">

          <div ref={overviewRef} id="section-overview">
            <OverviewTab college={college} />
          </div>

          <div ref={coursesRef} id="section-courses">
            <CoursesTab courses={college.courses} />
          </div>

          <div ref={placementsRef} id="section-placements">
            <PlacementsTab college={college} />
          </div>

          <div ref={admissionsRef} id="section-admissions">
            <AdmissionsTab college={college} />
          </div>

          <div ref={reviewsRef} id="section-reviews">
            <ReviewsTab
              reviews={college.reviews}
              overallRating={college.rating}
              reviewCount={college.reviewCount}
            />
          </div>
        </div>

        {/* RIGHT: sticky sidebar */}
        <DetailSidebar college={college} />
      </div>
    </div>
  );
}
