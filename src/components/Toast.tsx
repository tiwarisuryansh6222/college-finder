'use client';

import React from 'react';
import { useToast } from '@/context/ToastContext';

export function ToastContainer() {
  const { toasts, removeToast } = useToast();

  const borderColors: Record<string, string> = {
    success: 'border-l-[3px] border-l-[#10B981]',
    error:   'border-l-[3px] border-l-[#EF4444]',
    info:    'border-l-[3px] border-l-primary-400',
  };

  const icons = {
    success: (
      <svg className="w-4 h-4 shrink-0 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
      </svg>
    ),
    error: (
      <svg className="w-4 h-4 shrink-0 text-[#EF4444]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
    info: (
      <svg className="w-4 h-4 shrink-0 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`${borderColors[toast.type]} bg-neutral-900 text-white px-4 py-3 rounded-[12px] shadow-lg flex items-center gap-3 min-w-[280px] max-w-[400px] pointer-events-auto animate-[slideInRight_0.3s_ease-out]`}
        >
          {icons[toast.type]}
          <p className="text-sm font-medium flex-1">{toast.message}</p>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-white/50 hover:text-white transition-colors shrink-0"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}
