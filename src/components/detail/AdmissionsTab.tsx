'use client';

import React from 'react';
import { College } from '@/lib/types';

interface AdmissionsTabProps {
  college: College;
}

// Derive entrance exams from college type
function getExams(college: College): string[] {
  switch (college.type) {
    case 'Engineering': return ['JEE Main', 'JEE Advanced', 'GATE', 'Institute Entrance Test'];
    case 'Management':  return ['CAT', 'XAT', 'GMAT', 'MAT', 'Institute Entrance Test'];
    case 'Medical':     return ['NEET-UG', 'NEET-PG', 'AIIMS Entrance', 'INI-CET'];
    case 'Arts':        return ['CUET', 'CLAT', 'Institute Entrance Test', 'Merit-based'];
    case 'Science':     return ['CUET', 'IIT JAM', 'TIFR Entrance', 'Institute Entrance Test'];
    default:            return ['Institute Entrance Test'];
  }
}

// Derive eligibility text
function getEligibility(college: College): string {
  switch (college.type) {
    case 'Engineering':
      return `Candidates must have passed 10+2 or equivalent examination with Physics, Mathematics, and Chemistry/Computer Science as compulsory subjects with a minimum of 75% aggregate marks (65% for SC/ST). Admission is based on JEE Main / JEE Advanced rank.`;
    case 'Management':
      return `Candidates must hold a Bachelor's degree in any discipline with a minimum of 50% aggregate marks. Final year students may also apply. Admission is based on valid CAT/XAT/GMAT score followed by Group Discussion and Personal Interview.`;
    case 'Medical':
      return `Candidates must have passed 10+2 with Physics, Chemistry, and Biology with minimum 50% aggregate marks. They must qualify NEET-UG/NEET-PG as applicable. Age limit: 17–25 years as on December 31st of admission year.`;
    case 'Arts':
      return `Candidates must have passed 10+2 or equivalent examination from a recognized board with minimum 50% aggregate marks. Some programs may require specific subject combinations or entrance test scores.`;
    default:
      return `Candidates must meet the academic eligibility criteria as prescribed by the institute. Minimum qualifying marks and entrance test requirements apply based on program selection.`;
  }
}

const STEPS = [
  'Register on the official college portal and fill the application form.',
  'Upload required documents: 10th/12th marksheets, ID proof, passport photo.',
  'Pay the application fee online (₹1,000 – ₹3,000 depending on category).',
  'Appear for entrance exam / submit valid entrance test scores.',
  'Shortlisted candidates appear for counselling / merit-based admission.',
  'Pay the admission fees and complete document verification.',
  'Attend orientation and complete enrollment formalities.',
];

export function AdmissionsTab({ college }: AdmissionsTabProps) {
  const exams = getExams(college);
  const eligibilityText = getEligibility(college);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-lg font-bold text-neutral-900 pb-2 mb-5 border-b border-neutral-100">
          Admission Process
        </h2>

        {/* Entrance Exams */}
        <div>
          <h3 className="text-sm font-semibold text-neutral-700 mb-3 uppercase tracking-wide">
            Entrance Exams Accepted
          </h3>
          <div className="flex flex-wrap gap-2">
            {exams.map((exam) => (
              <span
                key={exam}
                className="bg-primary-50 text-primary-700 font-medium text-sm px-4 py-2 rounded-full border border-primary-200"
              >
                {exam}
              </span>
            ))}
          </div>
        </div>

        {/* Eligibility */}
        <div className="mt-6 bg-neutral-50 border border-neutral-200 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-neutral-700 mb-2">Eligibility Criteria</h3>
          <p className="text-sm text-neutral-700 leading-7">{eligibilityText}</p>
        </div>

        {/* Step-by-step process */}
        <div className="mt-8">
          <h3 className="text-sm font-semibold text-neutral-700 mb-5 uppercase tracking-wide">
            Step-by-step Admission Process
          </h3>
          <div className="relative">
            {STEPS.map((step, i) => (
              <div key={i} className="flex gap-4 mb-6 relative">
                {/* Connector line */}
                {i < STEPS.length - 1 && (
                  <div
                    className="absolute left-4 top-8 w-px border-l-2 border-dashed border-neutral-200"
                    style={{ height: 'calc(100% + 12px)' }}
                  />
                )}
                {/* Circle number */}
                <div className="w-8 h-8 rounded-full bg-primary-600 text-white text-sm font-semibold flex items-center justify-center flex-shrink-0 z-10 shadow-sm">
                  {i + 1}
                </div>
                {/* Step text */}
                <div className="flex-1 pt-1">
                  <p className="text-sm text-neutral-700 leading-relaxed">{step}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
