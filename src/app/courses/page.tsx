import React from 'react';
import { courses } from '@/lib/data/courses';
import CoursesClient from './CoursesClient';

export default function CoursesPage() {
  return <CoursesClient initialCourses={courses} />;
}
