import React, { Suspense } from 'react';
import { courses } from '@/lib/data/courses';
import CoursesClient from './CoursesClient';

export default function CoursesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-neutral-50" />}>
      <CoursesClient initialCourses={courses} />
    </Suspense>
  );
}
