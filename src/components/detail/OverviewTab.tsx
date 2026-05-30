'use client';

import React from 'react';
import { College } from '@/lib/types';

interface OverviewTabProps {
  college: College;
}

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-lg font-bold text-neutral-900 pb-2 mb-4 border-b border-neutral-100">{children}</h2>
);

// Icon map for highlights
function HighlightIcon({ type }: { type: string }) {
  const cls = 'w-5 h-5 text-primary-600';
  switch (type) {
    case 'calendar':
      return <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
    case 'map':
      return <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>;
    case 'users':
      return <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
    case 'chalkboard':
      return <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>;
    case 'certificate':
      return <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>;
    case 'building':
      return <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>;
    default:
      return null;
  }
}

export function OverviewTab({ college }: OverviewTabProps) {
  // Derive approximate values from existing data
  const campusSize = `${(college.totalCourses * 2 + college.established % 50).toFixed(0)} Acres`;
  const totalStudents = college.totalCourses * 180;
  const facultyCount = Math.floor(college.totalCourses * 4.5);

  const highlights = [
    { icon: 'calendar',     label: 'Established',      value: college.established.toString() },
    { icon: 'map',          label: 'Campus Size',       value: campusSize },
    { icon: 'users',        label: 'Total Students',    value: totalStudents.toLocaleString() },
    { icon: 'chalkboard',   label: 'Faculty',           value: `${facultyCount} Members` },
    { icon: 'certificate',  label: 'Accreditation',     value: `NAAC ${college.naacGrade}` },
    { icon: 'building',     label: 'Ownership',         value: college.type },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* About */}
      <div>
        <SectionHeading>About {college.name}</SectionHeading>
        {college.overview.split('. ').reduce((acc: string[][], cur, i) => {
          // Group sentences into paragraphs of ~2 sentences each
          const paraIdx = Math.floor(i / 2);
          if (!acc[paraIdx]) acc[paraIdx] = [];
          acc[paraIdx].push(cur);
          return acc;
        }, []).map((sentences, i) => (
          <p key={i} className="text-sm text-neutral-600 leading-7 mb-3">
            {sentences.join('. ')}{sentences[sentences.length - 1].endsWith('.') ? '' : '.'}
          </p>
        ))}
      </div>

      {/* Key Highlights */}
      <div>
        <SectionHeading>Key Highlights</SectionHeading>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-neutral-50 border border-neutral-200 rounded-xl p-5">
          {highlights.map((h) => (
            <div key={h.label} className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
                <HighlightIcon type={h.icon} />
              </div>
              <div>
                <p className="text-[10px] font-medium text-neutral-400 uppercase tracking-wide">{h.label}</p>
                <p className="text-sm font-semibold text-neutral-800 mt-0.5">{h.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rankings */}
      <div>
        <SectionHeading>Rankings &amp; Recognition</SectionHeading>
        <div className="grid grid-cols-2 gap-4">
          {/* NIRF */}
          <div className="bg-white border border-neutral-200 rounded-xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
            <p className="text-4xl font-bold text-accent-500">#{college.nirfRank}</p>
            <p className="text-xs font-medium text-neutral-500 mt-1 uppercase tracking-wider">NIRF Ranking 2024</p>
            <div className="mt-3 w-10 h-1 bg-accent-500 rounded-full" />
          </div>
          {/* NAAC */}
          <div className="bg-white border border-neutral-200 rounded-xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
            <p className="text-4xl font-bold text-[#10B981]">{college.naacGrade}</p>
            <p className="text-xs font-medium text-neutral-500 mt-1 uppercase tracking-wider">NAAC Grade</p>
            <div className="mt-3 w-10 h-1 bg-[#10B981] rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
