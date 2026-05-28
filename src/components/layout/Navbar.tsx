'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';

/* ─── SVG icon helpers ──────────────────────────────────── */
function IconGraduationCap({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    </svg>
  );
}
function IconSearch({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}
function IconBell({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
  );
}
function IconMenu({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}
function IconClose({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
function IconChevronDown({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

/* ─── Stream tabs config ─────────────────────────────────── */
const STREAM_TABS = [
  { label: 'All', value: '' },
  { label: 'Engineering', value: 'Engineering' },
  { label: 'MBA', value: 'Management' },
  { label: 'Medical', value: 'Medical' },
  { label: 'Law', value: 'Law' },
  { label: 'Design', value: 'Design' },
  { label: 'Science', value: 'Science' },
  { label: 'Arts', value: 'Arts' },
  { label: 'Hospitality', value: 'Hospitality' },
];

/* ─── Main Component ─────────────────────────────────────── */
export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { data: session } = useSession();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const activeStream = searchParams.get('stream') || '';
  const userInitial = session?.user?.email?.charAt(0).toUpperCase() ?? '';

  /* ── Handlers ─── */
  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/colleges?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/colleges');
    }
    setMobileSearchOpen(false);
  };

  const handleStreamClick = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set('stream', value);
    } else {
      params.delete('stream');
    }
    router.push(`/colleges?${params.toString()}`);
  };

  const isOnColleges = pathname === '/colleges' || pathname?.startsWith('/colleges');

  return (
    <div className="sticky top-0 z-50">
      {/* ── TIER 1 ── */}
      <div className="bg-white border-b border-neutral-200 h-16 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center gap-4">

          {/* Logo */}
          <Link href="/colleges" className="flex items-center gap-2 shrink-0 w-[200px]">
            <div className="w-8 h-8 bg-primary-600 rounded-[8px] flex items-center justify-center shrink-0">
              <IconGraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-xl text-neutral-900 tracking-tight">
              Edu<span className="text-primary-600">Finder</span>
            </span>
          </Link>

          {/* Desktop search bar (hidden on mobile) */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 items-center rounded-full border border-neutral-200 bg-neutral-50 overflow-hidden"
          >
            <div className="flex items-center pl-4 pr-2">
              <IconSearch className="w-4 h-4 text-neutral-400 shrink-0" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search colleges, courses, exams & more"
              className="flex-1 py-2.5 px-2 text-sm bg-transparent text-neutral-900 placeholder-neutral-400 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-primary-600 hover:bg-primary-700 text-white px-5 py-2 text-sm font-medium rounded-r-full transition-colors shrink-0 self-stretch flex items-center"
            >
              Search
            </button>
          </form>

          {/* Mobile: search icon */}
          <button
            className="md:hidden ml-auto p-2 text-neutral-500 hover:text-primary-600 transition-colors"
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
          >
            <IconSearch className="w-5 h-5" />
          </button>

          {/* Right section */}
          <div className="hidden md:flex items-center gap-2 ml-4 shrink-0 w-[200px] justify-end">
            {session ? (
              <>
                {/* Bell */}
                <div className="relative">
                  <button className="p-2 text-neutral-500 hover:text-primary-600 transition-colors relative">
                    <IconBell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white" />
                  </button>
                </div>

                {/* Avatar + dropdown */}
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-1.5 focus:outline-none"
                  >
                    <div className="w-9 h-9 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center font-semibold text-sm">
                      {userInitial}
                    </div>
                    <IconChevronDown className={`w-3.5 h-3.5 text-neutral-400 transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {profileOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-[12px] border border-neutral-200 shadow-lg py-1 animate-[scaleIn_0.15s_ease-out]">
                      <div className="px-4 py-2 border-b border-neutral-100">
                        <p className="text-xs text-neutral-400">Signed in as</p>
                        <p className="text-sm font-medium text-neutral-900 truncate">{session.user?.email}</p>
                      </div>
                      <Link
                        href="/saved"
                        onClick={() => setProfileOpen(false)}
                        className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-primary-600 transition-colors"
                      >
                        My Shortlist
                      </Link>
                      <button
                        className="w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
                      >
                        Settings
                      </button>
                      <button
                        onClick={() => { setProfileOpen(false); signOut({ callbackUrl: '/colleges' }); }}
                        className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/auth/signin"
                  className="px-4 py-2 text-sm font-medium text-primary-600 border border-primary-200 rounded-[8px] hover:bg-primary-50 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/auth/signin"
                  className="px-4 py-2 text-sm font-semibold bg-primary-600 text-white rounded-[8px] hover:bg-primary-700 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-neutral-500 hover:text-neutral-900 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <IconClose className="w-5 h-5" /> : <IconMenu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile search bar (drops below tier 1) */}
        {mobileSearchOpen && (
          <form
            onSubmit={handleSearch}
            className="md:hidden border-t border-neutral-200 bg-white px-4 py-2 flex items-center gap-2"
          >
            <div className="flex-1 flex items-center border border-neutral-200 rounded-full bg-neutral-50 overflow-hidden">
              <IconSearch className="w-4 h-4 text-neutral-400 ml-3 shrink-0" />
              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search colleges, courses..."
                className="flex-1 py-2 px-2 text-sm bg-transparent focus:outline-none"
              />
            </div>
            <button type="submit" className="bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-medium">
              Go
            </button>
          </form>
        )}
      </div>

      {/* ── TIER 2 — Stream tabs ── */}
      <div className="bg-white border-b border-neutral-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Scrollable tabs */}
          <div
            className="flex items-center overflow-x-auto hide-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {STREAM_TABS.map((tab) => {
              const isActive = activeStream === tab.value;
              return (
                <button
                  key={tab.value}
                  onClick={() => handleStreamClick(tab.value)}
                  className={`px-5 py-3 text-sm font-medium whitespace-nowrap transition-all border-b-2 shrink-0 ${
                    isActive
                      ? 'text-primary-600 border-primary-600 font-semibold bg-primary-50'
                      : 'text-neutral-500 border-transparent hover:text-primary-600'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Desktop quick links */}
          <div className="hidden md:flex items-center gap-4 shrink-0 ml-4">
            <Link href="/compare" className="text-xs text-neutral-400 hover:text-primary-600 transition-colors whitespace-nowrap">
              Compare Colleges
            </Link>
            <Link href="/colleges" className="text-xs text-neutral-400 hover:text-primary-600 transition-colors whitespace-nowrap">
              College Reviews
            </Link>
          </div>
        </div>
      </div>

      {/* ── Mobile slide-out drawer ── */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/30 z-40 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed top-0 right-0 w-72 h-full bg-white z-50 shadow-xl md:hidden animate-[slideInRight_0.2s_ease-out] flex flex-col">
            <div className="p-5 border-b border-neutral-100 flex items-center justify-between">
              <span className="font-display font-bold text-lg text-neutral-900">Menu</span>
              <button onClick={() => setMobileMenuOpen(false)} className="p-1 text-neutral-400 hover:text-neutral-700">
                <IconClose className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-1">
              <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider px-3 py-2">Streams</p>
              {STREAM_TABS.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => { handleStreamClick(tab.value); setMobileMenuOpen(false); }}
                  className={`w-full text-left px-4 py-2.5 rounded-[8px] text-sm font-medium transition-colors ${
                    activeStream === tab.value
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
              <div className="border-t border-neutral-100 my-3" />
              <Link href="/compare" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2.5 text-sm text-neutral-600 hover:text-primary-600 hover:bg-neutral-50 rounded-[8px] transition-colors">Compare Colleges</Link>
              <Link href="/saved" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2.5 text-sm text-neutral-600 hover:text-primary-600 hover:bg-neutral-50 rounded-[8px] transition-colors">My Shortlist</Link>
            </div>
            <div className="p-4 border-t border-neutral-100 space-y-2">
              {session ? (
                <>
                  <div className="px-4 py-2 flex items-center gap-3">
                    <div className="w-9 h-9 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center font-semibold text-sm shrink-0">{userInitial}</div>
                    <p className="text-sm text-neutral-700 truncate">{session.user?.email}</p>
                  </div>
                  <button
                    onClick={() => { setMobileMenuOpen(false); signOut({ callbackUrl: '/colleges' }); }}
                    className="w-full px-4 py-2.5 text-sm font-medium text-red-500 bg-red-50 hover:bg-red-100 rounded-[8px] transition-colors text-center"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/auth/signin" onClick={() => setMobileMenuOpen(false)} className="block w-full px-4 py-2.5 text-sm font-medium text-center text-primary-600 border border-primary-200 rounded-[8px] hover:bg-primary-50 transition-colors">
                    Login
                  </Link>
                  <Link href="/auth/signin" onClick={() => setMobileMenuOpen(false)} className="block w-full px-4 py-2.5 text-sm font-semibold text-center bg-primary-600 text-white rounded-[8px] hover:bg-primary-700 transition-colors">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
