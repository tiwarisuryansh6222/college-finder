import React from 'react';
import { careers } from '@/lib/data/careers';
import CareersClient from './CareersClient';

export default function CareersPage() {
  return <CareersClient initialDomains={careers} />;
}
