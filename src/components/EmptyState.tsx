import React from 'react';
import Link from 'next/link';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
}

export function EmptyState({ icon, title, description, actionLabel, actionHref, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {icon ? (
        <div className="mb-4 text-neutral-300">{icon}</div>
      ) : (
        <div className="mb-4">
          <svg className="w-20 h-20 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
      )}
      <h3 className="text-xl font-semibold text-neutral-700 mb-2">{title}</h3>
      <p className="text-sm text-neutral-500 mb-6 max-w-sm leading-relaxed">{description}</p>
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="inline-flex items-center px-6 py-2.5 bg-primary-600 text-white rounded-[8px] font-medium hover:bg-primary-700 transition-all focus:ring-2 focus:ring-primary-300"
        >
          {actionLabel}
        </Link>
      )}
      {actionLabel && onAction && !actionHref && (
        <button
          onClick={onAction}
          className="inline-flex items-center px-6 py-2.5 bg-primary-600 text-white rounded-[8px] font-medium hover:bg-primary-700 transition-all focus:ring-2 focus:ring-primary-300"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
