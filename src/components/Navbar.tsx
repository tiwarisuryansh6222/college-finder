'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { useCompare } from '@/context/CompareContext';
import { useSaved } from '@/context/SavedContext';

export function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { selected } = useCompare();
  const { saved } = useSaved();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: '/colleges', label: 'Colleges' },
    { href: '/compare', label: 'Compare', badge: selected.length },
    { href: '/saved', label: 'Saved', badge: saved.length },
  ];

  const userInitials = session?.user?.email
    ? session.user.email.charAt(0).toUpperCase()
    : '';

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/80 backdrop-blur-xl shadow-sm border-b border-neutral-200'
            : 'bg-white border-b border-neutral-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/colleges" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-primary-600 rounded-[8px] flex items-center justify-center group-hover:bg-primary-700 transition-colors">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
              </div>
              <span className="text-lg font-bold text-neutral-900 tracking-tight">
                College<span className="text-primary-600">Finder</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium rounded-[8px] transition-all ${
                    pathname?.startsWith(link.href)
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                  }`}
                >
                  {link.label}
                  {link.badge !== undefined && link.badge > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {link.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>

            {/* Auth + Mobile toggle */}
            <div className="flex items-center gap-2">
              {session ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="w-9 h-9 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-sm font-bold hover:bg-primary-200 transition-colors"
                  >
                    {userInitials}
                  </button>
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-[12px] shadow-lg border border-neutral-200 py-1 animate-[scaleIn_0.15s_ease-out]">
                      <div className="px-4 py-2 border-b border-neutral-100">
                        <p className="text-xs text-neutral-400">Signed in as</p>
                        <p className="text-sm font-medium text-neutral-900 truncate">{session.user?.email}</p>
                      </div>
                      <Link
                        href="/saved"
                        className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
                      >
                        Saved Colleges
                      </Link>
                      <button
                        onClick={() => signOut({ callbackUrl: '/colleges' })}
                        className="w-full text-left px-4 py-2 text-sm text-[#EF4444] hover:bg-red-50 transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/auth/signin"
                  className="hidden md:inline-flex items-center px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-[8px] hover:bg-primary-700 transition-all focus:ring-2 focus:ring-primary-300"
                >
                  Sign In
                </Link>
              )}

              {/* Mobile hamburger */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-[8px] transition-colors"
              >
                {isMobileMenuOpen ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/30 z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed top-16 right-0 w-72 h-[calc(100vh-4rem)] bg-white shadow-xl z-40 md:hidden animate-[slideInRight_0.2s_ease-out] border-l border-neutral-100">
            <div className="p-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center justify-between px-4 py-3 rounded-[8px] text-sm font-medium transition-all ${
                    pathname?.startsWith(link.href)
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-neutral-600 hover:bg-neutral-50'
                  }`}
                >
                  {link.label}
                  {link.badge !== undefined && link.badge > 0 && (
                    <span className="w-5 h-5 bg-primary-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {link.badge}
                    </span>
                  )}
                </Link>
              ))}
              {!session && (
                <Link
                  href="/auth/signin"
                  className="mt-4 text-center px-4 py-2.5 bg-primary-600 text-white text-sm font-medium rounded-[8px] hover:bg-primary-700 transition-all"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </>
      )}

      {/* Spacer */}
      <div className="h-16" />
    </>
  );
}
