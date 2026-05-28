import React from 'react';
import { CollegeCardSkeleton } from '@/components/CollegeCardSkeleton';

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex gap-8">
        {/* Sidebar Skeleton (hidden on mobile) */}
        <div className="hidden lg:block w-[280px] flex-shrink-0">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 h-[calc(100vh-6rem)] animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="space-y-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i}>
                  <div className="h-3 bg-gray-200 rounded w-1/4 mb-3"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Skeleton */}
        <div className="flex-1 min-w-0">
          {/* Header Skeleton */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6 animate-pulse">
            <div className="h-10 bg-gray-200 rounded-lg flex-1"></div>
            <div className="h-10 bg-gray-200 rounded-lg w-40"></div>
          </div>
          
          <div className="h-4 bg-gray-200 rounded w-48 mb-4 animate-pulse"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <CollegeCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
