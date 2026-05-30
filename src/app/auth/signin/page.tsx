'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// ── Graduation / Books SVG illustration ──────────────────────────────────────
function GraduationIllustration() {
  return (
    <svg
      viewBox="0 0 340 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-72 h-64"
      aria-hidden="true"
    >
      {/* ── Stacked books (bottom) ─────────── */}
      {/* Book 3 - bottom, widest */}
      <rect x="50" y="230" width="240" height="28" rx="5" fill="rgba(255,255,255,0.18)" />
      <rect x="50" y="230" width="14" height="28" rx="3" fill="rgba(255,255,255,0.35)" />
      {/* Book 2 */}
      <rect x="60" y="202" width="220" height="28" rx="5" fill="rgba(255,255,255,0.22)" />
      <rect x="60" y="202" width="14" height="28" rx="3" fill="rgba(255,255,255,0.40)" />
      {/* Book 1 - top */}
      <rect x="72" y="174" width="196" height="28" rx="5" fill="rgba(255,255,255,0.28)" />
      <rect x="72" y="174" width="14" height="28" rx="3" fill="rgba(255,255,255,0.50)" />
      {/* Page lines */}
      {[0, 1, 2, 3].map((i) => (
        <React.Fragment key={i}>
          <rect x="100" y={182 + i * 5} width="60" height="2" rx="1" fill="rgba(255,255,255,0.20)" />
          <rect x="180" y={182 + i * 5} width="60" height="2" rx="1" fill="rgba(255,255,255,0.20)" />
        </React.Fragment>
      ))}

      {/* ── Open book (center) ─────────────── */}
      <rect x="90" y="104" width="72" height="70" rx="5" fill="rgba(255,255,255,0.16)" />
      <rect x="178" y="104" width="72" height="70" rx="5" fill="rgba(255,255,255,0.13)" />
      <rect x="162" y="102" width="16" height="74" rx="4" fill="rgba(255,255,255,0.35)" />
      {[0, 1, 2, 3, 4].map((i) => (
        <React.Fragment key={i}>
          <rect x="102" y={116 + i * 10} width="46" height="2" rx="1" fill="rgba(255,255,255,0.22)" />
          <rect x="192" y={116 + i * 10} width="46" height="2" rx="1" fill="rgba(255,255,255,0.22)" />
        </React.Fragment>
      ))}

      {/* ── Graduation cap ─────────────────── */}
      {/* Board */}
      <ellipse cx="170" cy="72" rx="58" ry="12" fill="rgba(255,255,255,0.88)" />
      {/* Cap top (mortarboard) */}
      <polygon points="112,72 170,50 228,72" fill="rgba(255,255,255,0.95)" />
      {/* Cap body cylinder */}
      <rect x="152" y="52" width="36" height="24" rx="4" fill="rgba(255,255,255,0.90)" />

      {/* Tassel */}
      <line x1="226" y1="72" x2="226" y2="106" stroke="rgba(255,215,80,0.95)" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="226" cy="112" r="6" fill="rgba(255,215,80,0.95)" />

      {/* ── Floating sparkles ─────────────── */}
      {[
        { x: 38,  y: 55,  r: 4 },
        { x: 298, y: 68,  r: 3 },
        { x: 308, y: 150, r: 4.5 },
        { x: 28,  y: 160, r: 3 },
        { x: 260, y: 215, r: 3.5 },
        { x: 72,  y: 222, r: 2.5 },
      ].map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="rgba(255,255,255,0.38)" />
      ))}

      {/* Stars */}
      {[
        { x: 44, y: 82 },
        { x: 296, y: 95 },
      ].map((s, i) => (
        <path
          key={i}
          d={`M${s.x} ${s.y - 5} l1.5 3 3.5 0.5 -2.5 2.5 0.6 3.5 -3.1 -1.7 -3.1 1.7 0.6 -3.5 -2.5 -2.5 3.5 -0.5z`}
          fill="rgba(255,215,80,0.65)"
        />
      ))}
    </svg>
  );
}

// ── Eye icon ─────────────────────────────────────────────────────────────────
function EyeIcon({ open }: { open: boolean }) {
  return open ? (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ) : (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
    </svg>
  );
}

// ── Main sign-in page ─────────────────────────────────────────────────────────
export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail]               = useState('');
  const [password, setPassword]         = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading]       = useState(false);
  const [error, setError]               = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    setIsLoading(false);

    if (result?.ok) {
      router.push('/colleges');
      router.refresh();
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  const handleGuest = () => {
    router.push('/colleges');
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex">

      {/* ── LEFT PANEL: Illustration ─────────────────────────────── */}
      <div
        className="hidden lg:flex w-1/2 flex-col items-center justify-center p-12 text-white"
        style={{
          background: 'linear-gradient(135deg, #4C1D95 0%, #6D28D9 55%, #7C3AED 100%)',
        }}
      >
        <GraduationIllustration />

        {/* Tagline */}
        <div className="text-center mt-8">
          <h2 className="text-2xl font-bold text-white">Join 1 Crore+ Students</h2>
          <p className="text-white/70 text-sm mt-2">
            Make smarter college decisions with EduFinder
          </p>
        </div>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          {['✓ 30+ Colleges', '✓ Real Reviews', '✓ Free to Use'].map((pill) => (
            <span
              key={pill}
              className="bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm text-white font-medium"
            >
              {pill}
            </span>
          ))}
        </div>
      </div>

      {/* ── RIGHT PANEL: Form ─────────────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center p-10 bg-white">
        <div className="w-full max-w-sm">

          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-9 h-9 bg-primary-600 rounded-xl flex items-center justify-center shadow-md">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
            </div>
            <span className="text-base font-bold text-neutral-800 tracking-tight">EduFinder</span>
          </div>

          {/* Heading */}
          <h1 className="text-2xl font-bold text-neutral-900">Welcome back</h1>
          <p className="text-sm text-neutral-500 mt-1 mb-6">
            Sign in to access your shortlist and compare history
          </p>

          {/* Error alert */}
          {error && (
            <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl border border-red-100 mb-5">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5" id="signin-form">
            {/* Email */}
            <div>
              <label
                htmlFor="signin-email"
                className="block text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1.5"
              >
                Email Address
              </label>
              <input
                id="signin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="signin-password"
                className="block text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="signin-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="Enter any password"
                  className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all pr-10"
                />
                <button
                  type="button"
                  id="toggle-password"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  <EyeIcon open={showPassword} />
                </button>
              </div>
            </div>

            {/* Sign In button — accent variant */}
            <button
              id="signin-submit"
              type="submit"
              disabled={isLoading}
              className="w-full bg-amber-400 hover:bg-amber-500 text-gray-900 font-semibold text-sm py-3 rounded-xl transition-colors shadow-sm disabled:opacity-60 disabled:cursor-not-allowed mt-4"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-gray-900/30 border-t-gray-900 rounded-full animate-spin" />
                  Signing in…
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-neutral-200" />
            <span className="text-xs text-neutral-400 font-medium">or</span>
            <div className="flex-1 h-px bg-neutral-200" />
          </div>

          {/* Continue as Guest — secondary variant */}
          <button
            id="signin-guest"
            type="button"
            onClick={handleGuest}
            className="w-full border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700 text-sm font-medium py-2.5 rounded-xl transition-colors"
          >
            Continue as Guest
          </button>

          <p className="text-xs text-neutral-400 text-center mt-3">
            Demo mode: any email and password works
          </p>
        </div>
      </div>
    </div>
  );
}
