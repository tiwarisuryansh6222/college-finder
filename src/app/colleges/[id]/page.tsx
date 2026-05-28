'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { College } from '@/lib/types';
import { colleges } from '@/lib/data/colleges';
import { StarRating } from '@/components/StarRating';
import { Badge } from '@/components/Badge';
import { OverviewTab } from '@/components/detail/OverviewTab';
import { CoursesTab } from '@/components/detail/CoursesTab';
import { PlacementsTab } from '@/components/detail/PlacementsTab';
import { ReviewsTab } from '@/components/detail/ReviewsTab';
import { useCompare } from '@/context/CompareContext';
import { useSaved } from '@/context/SavedContext';

type Tab = 'overview' | 'courses' | 'placements' | 'reviews';

export default function CollegeDetailPage() {
  const params = useParams();
  const [college, setCollege] = useState<College | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const { isSelected, add, remove } = useCompare();
  const { isSaved, toggle } = useSaved();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      const found = colleges.find((c) => c.id === params.id);
      setCollege(found || null);
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [params.id]);

  const formatCurrency = (amount: number): string => {
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(amount % 100000 === 0 ? 0 : 1)}L`;
    }
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const tabs: { key: Tab; label: string }[] = [
    { key: 'overview', label: 'Overview' },
    { key: 'courses', label: 'Courses' },
    { key: 'placements', label: 'Placements' },
    { key: 'reviews', label: 'Reviews' },
  ];

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-72 bg-gray-200 w-full" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex gap-8">
            <div className="flex-1 space-y-4">
              <div className="h-10 bg-gray-200 rounded w-2/3" />
              <div className="h-4 bg-gray-200 rounded w-1/3" />
              <div className="h-12 bg-gray-200 rounded w-full mt-6" />
              <div className="space-y-3 mt-8">
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-5/6" />
                <div className="h-4 bg-gray-200 rounded w-4/6" />
              </div>
              <div className="grid grid-cols-4 gap-4 mt-8">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-28 bg-gray-200 rounded-xl" />
                ))}
              </div>
            </div>
            <div className="hidden lg:block w-[320px] space-y-4">
              <div className="h-64 bg-gray-200 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!college) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-700">College not found</h2>
        <p className="text-gray-500 mt-2">The college you&apos;re looking for doesn&apos;t exist.</p>
      </div>
    );
  }

  const compared = isSelected(college.id);
  const saved = isSaved(college.id);

  return (
    <div>
      {/* Hero */}
      <div className="relative h-72 md:h-80 overflow-hidden">
        <img
          src={college.image}
          alt={college.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="college-type" collegeType={college.type}>
              {college.type}
            </Badge>
            <Badge variant="naac">NAAC {college.naacGrade}</Badge>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">{college.name}</h1>
          <p className="text-white/80 flex items-center gap-1 text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {college.location}
          </p>
        </div>
      </div>

      {/* Sticky Tab Nav */}
      <div className="sticky top-16 z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-0 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-5 py-3.5 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
                  activeTab === tab.key
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {activeTab === 'overview' && <OverviewTab college={college} />}
            {activeTab === 'courses' && <CoursesTab courses={college.courses} />}
            {activeTab === 'placements' && <PlacementsTab college={college} />}
            {activeTab === 'reviews' && (
              <ReviewsTab
                reviews={college.reviews}
                overallRating={college.rating}
                reviewCount={college.reviewCount}
              />
            )}
          </div>

          {/* Sticky Sidebar */}
          <aside className="hidden lg:block w-[320px] flex-shrink-0">
            <div className="sticky top-32 bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
              {/* Logo + Name */}
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-indigo-600">{college.name.charAt(0)}</span>
                </div>
                <h3 className="font-bold text-gray-900 text-sm">{college.name}</h3>
              </div>

              <div className="border-t border-gray-100 pt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Rating</span>
                  <StarRating rating={college.rating} size="sm" reviewCount={college.reviewCount} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Fees/Year</span>
                  <span className="text-sm font-semibold text-gray-800">{formatCurrency(college.fees)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">NAAC Grade</span>
                  <Badge variant="naac">{college.naacGrade}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">NIRF Rank</span>
                  <span className="text-sm font-semibold text-gray-800">#{college.nirfRank}</span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4 space-y-2">
                <button
                  onClick={() => (saved ? toggle(college) : toggle(college))}
                  className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    saved
                      ? 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100'
                      : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <svg className="w-4 h-4" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  {saved ? 'Saved' : 'Save College'}
                </button>
                <button
                  onClick={() => (compared ? remove(college.id) : add(college))}
                  className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    compared
                      ? 'bg-indigo-50 text-indigo-600 border border-indigo-200 hover:bg-indigo-100'
                      : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  {compared ? 'Added to Compare' : 'Add to Compare'}
                </button>
                <button className="w-full px-4 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-all focus:ring-2 focus:ring-indigo-300">
                  Apply Now
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
