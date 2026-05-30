'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CareerDomain, Career } from '@/lib/data/careers';

export default function CareersClient({ initialDomains }: { initialDomains: CareerDomain[] }) {
  const router = useRouter();
  const [expandedDomain, setExpandedDomain] = useState<string | null>(null);
  
  // Ref for scrolling to the expanded section
  const expandedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (expandedDomain && expandedRef.current) {
      expandedRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [expandedDomain]);

  return (
    <div className="bg-neutral-50 min-h-screen pb-20">
      
      {/* ── PAGE HERO ── */}
      <div className="bg-gradient-to-r from-[#4C1D95] via-[#6D28D9] to-[#7C3AED] py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white leading-tight">
            Explore Career Paths
          </h1>
          <p className="text-base text-white/70 mt-4 max-w-2xl mx-auto leading-relaxed">
            Discover salaries, required skills, and top companies for every career
          </p>
        </div>
      </div>

      {/* ── DOMAIN CARDS GRID ── */}
      <div className="max-w-7xl mx-auto px-4 mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {initialDomains.map((domain) => {
            const isExpanded = expandedDomain === domain.id;
            // Map icons based on string
            let IconObj = <span className="text-xl font-bold">{domain.name[0]}</span>;
            
            return (
              <div
                key={domain.id}
                onClick={() => setExpandedDomain(isExpanded ? null : domain.id)}
                className={`bg-white border rounded-[12px] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] p-6 cursor-pointer transition-all duration-300 relative overflow-hidden ${isExpanded ? 'ring-2 ring-primary-500 border-primary-500' : 'border-neutral-200'}`}
              >
                {/* Left accent border */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${domain.color}`} />

                {/* Icon */}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${domain.color} bg-opacity-10 mb-4`}>
                  <svg className={`w-6 h-6 ${domain.color.replace('bg-', 'text-')}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {/* Just generic icons based on id for visual appeal */}
                    {domain.id === 'engg' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />}
                    {domain.id === 'mba' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />}
                    {domain.id === 'med' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />}
                    {domain.id === 'law' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />}
                    {domain.id === 'des' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />}
                    {domain.id === 'sci' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />}
                    {domain.id === 'arts' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />}
                    {domain.id === 'hosp' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />}
                  </svg>
                </div>

                <h2 className="text-lg font-semibold text-neutral-900 mt-3">{domain.name}</h2>
                <p className="text-sm text-neutral-500 mt-1 line-clamp-2 min-h-[40px]">{domain.description}</p>
                
                <div className="flex flex-col gap-1 mt-4 pt-4 border-t border-neutral-100">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-neutral-500">Careers</span>
                    <span className="font-semibold text-neutral-900">{domain.careerCount} Paths</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-neutral-500">Avg Salary</span>
                    <span className="font-semibold text-primary-600">{domain.avgSalaryRange}</span>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-sm font-medium">
                  <span className={isExpanded ? 'text-primary-700' : 'text-primary-600'}>
                    {isExpanded ? 'Close ×' : 'Explore →'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── INLINE CAREER GRID (EXPANDED) ── */}
      {expandedDomain && (
        <div 
          ref={expandedRef}
          className="max-w-7xl mx-auto px-4 mt-8 animate-[slideUp_0.3s_ease-out]"
        >
          {initialDomains.filter(d => d.id === expandedDomain).map((domain) => (
            <div key={`expanded-${domain.id}`} className="bg-white rounded-2xl border border-neutral-200 shadow-lg p-6 sm:p-8">
              
              {/* Header */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-100">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${domain.color} bg-opacity-10`}>
                    <svg className={`w-5 h-5 ${domain.color.replace('bg-', 'text-')}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {domain.id === 'engg' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />}
                      {domain.id === 'mba' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />}
                      {domain.id === 'med' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />}
                      {domain.id === 'law' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />}
                      {domain.id === 'des' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />}
                      {domain.id === 'sci' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />}
                      {domain.id === 'arts' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />}
                      {domain.id === 'hosp' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />}
                    </svg>
                  </div>
                  <h2 className="text-2xl font-display font-bold text-neutral-900">Careers in {domain.name.replace(' Careers', '')}</h2>
                </div>
                <button
                  onClick={() => setExpandedDomain(null)}
                  className="p-2 text-neutral-400 hover:text-neutral-700 transition-colors rounded-full hover:bg-neutral-100"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {domain.careers.map((career) => {
                  let demandColor = 'bg-neutral-100 text-neutral-600';
                  if (career.demandLevel === 'Very High') demandColor = 'bg-emerald-100 text-emerald-700';
                  else if (career.demandLevel === 'High') demandColor = 'bg-blue-100 text-blue-700';
                  else if (career.demandLevel === 'Growing') demandColor = 'bg-amber-100 text-amber-700';

                  return (
                    <div key={career.id} className="bg-white border border-neutral-200 rounded-[12px] shadow-sm p-5 flex flex-col hover:shadow-md transition-shadow">
                      <h3 className="text-base font-semibold text-neutral-900">{career.title}</h3>
                      <p className="text-sm text-neutral-500 mt-1 line-clamp-2 h-[40px]">{career.description}</p>
                      
                      <hr className="my-4 border-neutral-100" />
                      
                      <div className="mb-4">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-lg font-bold text-primary-600">{career.avgSalary}</span>
                          <span className="text-xs text-neutral-400">per annum</span>
                        </div>
                        <div className="flex items-center gap-1.5 mt-2">
                          <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                          </svg>
                          <span className="text-sm text-neutral-600 truncate" title={career.education}>{career.education}</span>
                        </div>
                        <div className="mt-3">
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded ${demandColor}`}>
                            {career.demandLevel} Demand
                          </span>
                        </div>
                      </div>

                      <hr className="my-4 border-neutral-100" />

                      <div className="flex-1 space-y-4">
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold mb-1.5 block">Top Skills</span>
                          <div className="flex flex-wrap gap-1.5">
                            {career.topSkills.slice(0, 4).map(skill => (
                              <span key={skill} className="bg-neutral-100 text-neutral-600 text-[10px] px-2 py-0.5 rounded-full whitespace-nowrap">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold mb-1.5 block">Top Employers</span>
                          <div className="flex flex-wrap gap-1.5">
                            {career.topCompanies.slice(0, 3).map(company => (
                              <span key={company} className="bg-primary-50 text-primary-700 text-[10px] px-2 py-0.5 rounded-full border border-primary-100 whitespace-nowrap">
                                {company}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-5 pt-4 border-t border-neutral-100">
                        <button
                          onClick={() => {
                            const p = new URLSearchParams();
                            p.set('stream', career.stream === 'Management' ? 'Management' : career.stream);
                            router.push(`/colleges?${p.toString()}`);
                          }}
                          className="w-full text-center py-2 text-sm font-semibold text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors"
                        >
                          Find Colleges for this Career →
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
