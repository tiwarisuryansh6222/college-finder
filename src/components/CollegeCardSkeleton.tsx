import React from 'react';

export function CollegeCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col animate-pulse">
      {/* Image skeleton */}
      <div className="aspect-[16/9] bg-gray-200" />
      
      {/* Content skeleton */}
      <div className="p-4 flex flex-col flex-1">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
        <div className="h-3 bg-gray-200 rounded w-1/2 mb-3" />
        <div className="h-3 bg-gray-200 rounded w-1/3 mb-4" />
        
        <div className="grid grid-cols-2 gap-2 mb-4 mt-auto">
          <div className="bg-gray-100 rounded-lg p-3">
            <div className="h-2 bg-gray-200 rounded w-1/2 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
          </div>
          <div className="bg-gray-100 rounded-lg p-3">
            <div className="h-2 bg-gray-200 rounded w-1/2 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex-1 h-9 bg-gray-200 rounded-lg" />
          <div className="w-9 h-9 bg-gray-200 rounded-lg" />
          <div className="w-9 h-9 bg-gray-200 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
