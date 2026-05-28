import React from 'react';
import { CollegeType } from '@/lib/types';
import { COLLEGE_TYPE_COLORS } from '@/lib/constants';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'college-type' | 'naac' | 'rank';
  collegeType?: CollegeType;
  naacGrade?: string;
  className?: string;
}

export function Badge({ children, variant = 'default', collegeType, naacGrade, className = '' }: BadgeProps) {
  const base = 'inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-[6px]';

  if (variant === 'rank') {
    return (
      <span className={`${base} bg-accent-500 text-neutral-900 font-bold ${className}`}>
        {children}
      </span>
    );
  }

  if (variant === 'college-type' && collegeType) {
    const colors = COLLEGE_TYPE_COLORS[collegeType];
    return (
      <span className={`${base} ${colors.bg} ${colors.text} ${className}`}>
        {children}
      </span>
    );
  }

  if (variant === 'naac') {
    const grade = naacGrade ?? (typeof children === 'string' ? children.replace('NAAC ', '') : '');
    const gradeColor =
      grade === 'A++' ? 'bg-emerald-100 text-emerald-800' :
      grade === 'A+'  ? 'bg-teal-100 text-teal-800' :
      grade === 'A'   ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800';
    return (
      <span className={`${base} ${gradeColor} ${className}`}>
        {children}
      </span>
    );
  }

  return (
    <span className={`${base} bg-neutral-100 text-neutral-700 ${className}`}>
      {children}
    </span>
  );
}
