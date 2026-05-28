'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useSaved } from '@/context/SavedContext';
import { CollegeCard } from '@/components/CollegeCard';
import { EmptyState } from '@/components/EmptyState';

export default function SavedPage() {
  const { data: session, status } = useSession();
  const { saved } = useSaved();

  if (status === 'unauthenticated') {
    redirect('/auth/signin');
  }

  if (status === 'loading') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-80 bg-gray-200 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">Saved Colleges</h1>
        <p className="text-sm text-neutral-500 mt-1">
          {saved.length > 0
            ? `${saved.length} saved college${saved.length === 1 ? '' : 's'}`
            : 'Your saved colleges will appear here'}
        </p>
      </div>

      {saved.length === 0 ? (
        <EmptyState
          title="No saved colleges yet"
          description="Tap the heart on any college to save it for later"
          actionLabel="Explore Colleges"
          actionHref="/colleges"
          icon={
            <svg className="w-20 h-20 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {saved.map((college) => (
            <CollegeCard key={college.id} college={college} showRemoveSaved />
          ))}
        </div>
      )}
    </div>
  );
}
