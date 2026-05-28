# CollegeFinder

A production-grade college discovery platform built for the AI Software Engineer Internship assignment (Track B — Frontend Engineer).

## Features
- **College Listing + Search** — searchable, filterable grid with URL-synced state
- **College Detail Page** — tabbed layout with overview, courses, placements, and reviews
- **Compare Colleges** — side-by-side comparison of up to 3 colleges with best-value highlighting
- **Authentication + Saved Items** — NextAuth credentials provider with localStorage-persisted saved list

## Tech Stack
Next.js 14 (App Router) · TypeScript · TailwindCSS · NextAuth.js

## Architecture Decisions
- Data is served from `/lib/data/colleges.ts` (mock dataset of 30 colleges) — all data flows through server components into client hooks, never hardcoded in UI components
- `CompareContext` uses sessionStorage so compare state persists across page navigation
- `SavedContext` uses localStorage so saved colleges survive browser refresh  
- URL-synced filters using `useSearchParams` so filter state is shareable and survives navigation
- Skeleton loading on all async boundaries using Next.js `loading.tsx`

## Folder Structure
```text
C:\PROJECTS\INTERN-DEMO\COLLEGE-FINDER\SRC
+---app
|   |   favicon.ico
|   |   globals.css
|   |   layout.tsx
|   |   page.tsx
|   |   
|   +---api
|   |   \---auth
|   |       \---[...nextauth]
|   |               route.ts
|   |               
|   +---auth
|   |   \---signin
|   |           page.tsx
|   |           
|   +---colleges
|   |   |   CollegesClient.tsx
|   |   |   loading.tsx
|   |   |   page.tsx
|   |   |   
|   |   \---[id]
|   |           page.tsx
|   |           
|   +---compare
|   |       page.tsx
|   |       
|   \---saved
|           page.tsx
|           
+---components
|   |   AuthProvider.tsx
|   |   Badge.tsx
|   |   CollegeCard.tsx
|   |   CollegeCardSkeleton.tsx
|   |   CompareBar.tsx
|   |   EmptyState.tsx
|   |   Navbar.tsx
|   |   SearchModal.tsx
|   |   StarRating.tsx
|   |   Toast.tsx
|   |   
|   +---detail
|   |       CoursesTab.tsx
|   |       OverviewTab.tsx
|   |       PlacementsTab.tsx
|   |       ReviewsTab.tsx
|   |       
|   \---filters
|           FilterSidebar.tsx
|           RangeSlider.tsx
|           
+---context
|       CompareContext.tsx
|       SavedContext.tsx
|       ToastContext.tsx
|       
+---hooks
|       useColleges.ts
|       useDebounce.ts
|       useIntersectionObserver.ts
|       useLocalStorage.ts
|       
\---lib
    |   constants.ts
    |   types.ts
    |   
    \---data
            colleges.ts
```

## Running Locally

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Known Limitations + What I'd do with more time
- **Backend Integration**: Currently using a mock dataset. With more time, I would integrate a real backend database (like PostgreSQL or MongoDB) with an ORM like Prisma.
- **Enhanced Search**: The current search is a simple client-side string match. I would implement server-side search using something like Elasticsearch or Typesense for typo-tolerance and better relevance.
- **Responsive Tables**: The compare table can get crowded on very small mobile screens. I would implement a sticky column or a different visualization for mobile comparisons.
- **User Profiles**: Enhance the NextAuth implementation to support robust user profiles, avatars, and persistent server-side saved lists rather than localStorage.
