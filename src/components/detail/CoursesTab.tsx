'use client';

import React, { useState } from 'react';
import { Course } from '@/lib/types';

interface CoursesTabProps {
  courses: Course[];
}

const SHOW_LIMIT = 5;

// Derive level from course name heuristics
function getLevel(name: string): 'UG' | 'PG' | 'PhD' | 'Other' {
  const n = name.toLowerCase();
  if (n.startsWith('b.') || n.startsWith('be ') || n.startsWith('b.e') || n.startsWith('b.tech') || n.startsWith('b.sc') || n.startsWith('b.a') || n.startsWith('b.com') || n.startsWith('b.des') || n.startsWith('b.pharm') || n.startsWith('b.arch') || n.startsWith('mbbs') || n.startsWith('bds')) return 'UG';
  if (n.startsWith('m.') || n.startsWith('me ') || n.startsWith('m.e') || n.startsWith('m.tech') || n.startsWith('m.sc') || n.startsWith('m.a') || n.startsWith('mba') || n.startsWith('pgp') || n.startsWith('pgd') || n.startsWith('executive') || n.startsWith('md ') || n.startsWith('ms ') || n.startsWith('ll.m')) return 'PG';
  if (n.startsWith('ph.d') || n.startsWith('phd')) return 'PhD';
  return 'Other';
}

// Dummy eligibility & entrance exam derived from course name
function eligibility(name: string): string {
  const level = getLevel(name);
  if (level === 'UG') return '10+2 with 75%+ marks';
  if (level === 'PG') return 'Bachelor\'s degree with 60%+ marks';
  if (level === 'PhD') return 'Master\'s degree with UGC-NET/GATE';
  return 'As per institute norms';
}

function entranceExams(name: string): string[] {
  const n = name.toLowerCase();
  if (n.includes('b.tech') || n.includes('b.e') || n.includes('m.tech')) return ['JEE Main', 'JEE Adv', 'GATE'];
  if (n.includes('mba') || n.includes('pgp') || n.includes('pgd') || n.includes('executive')) return ['CAT', 'XAT', 'GMAT'];
  if (n.includes('mbbs') || n.includes('bds') || n.includes('md ') || n.includes('ms ')) return ['NEET-UG', 'NEET-PG'];
  if (n.includes('m.sc') || n.includes('b.sc')) return ['CUET', 'Institution-based'];
  if (n.includes('ll.b') || n.includes('ll.m')) return ['CLAT', 'AILET'];
  return ['Institution-based'];
}

export function CoursesTab({ courses }: CoursesTabProps) {
  // Determine available levels
  const levels = Array.from(new Set(courses.map((c) => getLevel(c.name))));
  const orderedLevels = (['UG', 'PG', 'PhD', 'Other'] as const).filter((l) => levels.includes(l));

  const [activeLevel, setActiveLevel] = useState<string>(orderedLevels[0] || 'UG');
  const [showAll, setShowAll] = useState(false);

  const filtered = courses.filter((c) => getLevel(c.name) === activeLevel);
  const displayed = showAll ? filtered : filtered.slice(0, SHOW_LIMIT);

  return (
    <div>
      <h2 className="text-lg font-bold text-neutral-900 pb-2 mb-4 border-b border-neutral-100">
        Courses &amp; Fees
      </h2>

      {/* Level filter tabs */}
      <div className="flex gap-1 mb-5 bg-neutral-100 p-1 rounded-lg w-fit">
        {orderedLevels.map((level) => (
          <button
            key={level}
            type="button"
            onClick={() => { setActiveLevel(level); setShowAll(false); }}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
              activeLevel === level
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-neutral-500 hover:text-neutral-700'
            }`}
          >
            {level}
          </button>
        ))}
      </div>

      {/* Courses table */}
      {filtered.length === 0 ? (
        <p className="text-sm text-neutral-500 py-6 text-center">No courses found for this level.</p>
      ) : (
        <>
          <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-neutral-50 border-b border-neutral-200">
                  <th className="px-5 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wide">Course</th>
                  <th className="px-5 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wide">Duration</th>
                  <th className="px-5 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wide">Total Fees</th>
                  <th className="px-5 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wide hidden md:table-cell">Eligibility</th>
                  <th className="px-5 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wide hidden lg:table-cell">Entrance Exam</th>
                </tr>
              </thead>
              <tbody>
                {displayed.map((course, i) => {
                  const exams = entranceExams(course.name);
                  return (
                    <tr
                      key={course.name}
                      className={`border-b border-neutral-100 hover:bg-primary-50 transition-colors ${
                        i % 2 === 1 ? 'bg-neutral-50/70' : ''
                      }`}
                    >
                      <td className="px-5 py-3.5">
                        <span className="text-sm font-medium text-neutral-800">{course.name}</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="text-sm text-neutral-500">{course.duration}</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="text-sm font-semibold text-primary-600">
                          ₹{(course.fees / 100000).toFixed(1)}L
                        </span>
                      </td>
                      <td className="px-5 py-3.5 hidden md:table-cell">
                        <span className="text-xs text-neutral-500">{eligibility(course.name)}</span>
                      </td>
                      <td className="px-5 py-3.5 hidden lg:table-cell">
                        <div className="flex flex-wrap gap-1">
                          {exams.map((exam) => (
                            <span
                              key={exam}
                              className="bg-primary-50 text-primary-700 text-xs px-2 py-0.5 rounded font-medium"
                            >
                              {exam}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filtered.length > SHOW_LIMIT && (
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              className="mt-3 text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
            >
              {showAll
                ? `Show less`
                : `View all ${filtered.length} ${activeLevel} courses →`}
            </button>
          )}
        </>
      )}
    </div>
  );
}
