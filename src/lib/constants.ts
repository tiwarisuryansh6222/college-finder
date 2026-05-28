import { CollegeType, NaacGrade, SortOption } from './types';

export const STATES = [
  'Maharashtra',
  'Karnataka',
  'Tamil Nadu',
  'Delhi',
  'Uttar Pradesh',
  'Rajasthan',
  'West Bengal',
  'Telangana',
  'Kerala',
  'Gujarat',
] as const;

export const COLLEGE_TYPE_COLORS: Record<CollegeType, { bg: string; text: string }> = {
  Engineering: { bg: 'bg-blue-100', text: 'text-blue-700' },
  Management: { bg: 'bg-purple-100', text: 'text-purple-700' },
  Medical: { bg: 'bg-green-100', text: 'text-green-700' },
  Arts: { bg: 'bg-orange-100', text: 'text-orange-700' },
  Science: { bg: 'bg-teal-100', text: 'text-teal-700' },
};

export const COLLEGE_TYPES: CollegeType[] = [
  'Engineering',
  'Management',
  'Medical',
  'Arts',
  'Science',
];

export const NAAC_GRADES: NaacGrade[] = ['A++', 'A+', 'A', 'B++', 'B+', 'B'];

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'fees-low', label: 'Fees: Low to High' },
  { value: 'fees-high', label: 'Fees: High to Low' },
  { value: 'rating', label: 'Rating' },
  { value: 'nirf-rank', label: 'NIRF Rank' },
];

export const FEES_RANGE: [number, number] = [0, 2000000];

export const ITEMS_PER_PAGE = 9;

export const RATING_FILTERS = [3, 4, 4.5] as const;
