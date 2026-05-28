import { Suspense } from 'react';
import { colleges } from '@/lib/data/colleges';
import CollegesClient from './CollegesClient';
import Loading from './loading';

export default async function CollegesPage() {
  return (
    <Suspense fallback={<Loading />}>
      <CollegesClient initialColleges={colleges} />
    </Suspense>
  );
}
