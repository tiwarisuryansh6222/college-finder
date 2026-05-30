'use client';

import { useCompare } from '@/context/CompareContext';
import { useEffect } from 'react';

/**
 * Adds/removes padding-bottom on the body element when the CompareBar is visible,
 * so page content doesn't get hidden behind the 72px fixed bar.
 */
export function BodyPadding() {
  const { selected } = useCompare();
  const isVisible = selected.length > 0;

  useEffect(() => {
    document.body.style.paddingBottom = isVisible ? '72px' : '0px';
    return () => {
      document.body.style.paddingBottom = '0px';
    };
  }, [isVisible]);

  return null;
}
