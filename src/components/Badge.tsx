import React from 'react';
import { CollegeType } from '@/lib/types';
import { COLLEGE_TYPE_COLORS } from '@/lib/constants';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'college-type' | 'naac';
  collegeType?: CollegeType;
  className?: string;
}

export function Badge({ children, variant = 'default', collegeType, className = '' }: BadgeProps) {
  const baseClasses = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors';

  if (variant === 'college-type' && collegeType) {
    const colors = COLLEGE_TYPE_COLORS[collegeType];
    return (
      <span className={`${baseClasses} ${colors.bg} ${colors.text} ${className}`}>
        {children}
      </span>
    );
  }

  if (variant === 'naac') {
    return (
      <span className={`${baseClasses} bg-indigo-100 text-indigo-700 ${className}`}>
        {children}
      </span>
    );
  }

  return (
    <span className={`${baseClasses} bg-gray-100 text-gray-700 ${className}`}>
      {children}
    </span>
  );
}
