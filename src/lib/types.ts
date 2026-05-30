export type CollegeType = 'Engineering' | 'Management' | 'Medical' | 'Arts' | 'Science';

export type NaacGrade = 'A++' | 'A+' | 'A' | 'B++' | 'B+' | 'B';

export type SortOption = 'relevance' | 'fees-low' | 'fees-high' | 'rating' | 'nirf-rank';

export interface Review {
  id: string;
  author: string;
  date: string;
  rating: number;
  comment: string;
}

export interface Course {
  name: string;
  duration: string;
  fees: number;
}

export interface College {
  id: string;
  name: string;
  location: string;
  state: string;
  type: CollegeType;
  image: string;
  logo: string;
  overview: string;
  established: number;
  naacGrade: NaacGrade;
  nirfRank: number;
  rating: number;
  reviewCount: number;
  fees: number;
  avgSalary: number;
  highestSalary: number;
  placementRate: number;
  totalCourses: number;
  courses: Course[];
  topCompanies: string[];
  reviews: Review[];
}

export interface FilterState {
  search: string;
  locations: string[];
  types: CollegeType[];
  feesRange: [number, number];
  ownerships: string[];
  rating: number;
  naacGrades: NaacGrade[];
  nirfRanks: string[];
  sort: SortOption;
}
