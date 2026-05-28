'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

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
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-primary-50 via-white to-primary-100">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-[12px] shadow-xl border border-neutral-100 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-primary-600 rounded-[12px] flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-neutral-900">Welcome back</h1>
            <p className="text-neutral-500 mt-1 text-sm">Sign in to your CollegeFinder account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg border border-red-100">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-xs font-medium text-neutral-500 uppercase tracking-wide mb-1.5">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-[8px] text-sm focus:outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-100 transition-all"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-medium text-neutral-500 uppercase tracking-wide mb-1.5">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter any password"
                className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-[8px] text-sm focus:outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-100 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-2.5 bg-primary-600 text-white text-sm font-semibold rounded-[8px] hover:bg-primary-700 transition-all focus:ring-2 focus:ring-primary-300 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Guest */}
          <button
            onClick={handleGuest}
            className="w-full px-4 py-2.5 bg-neutral-50 text-neutral-700 text-sm font-medium rounded-[8px] border border-neutral-200 hover:bg-neutral-100 transition-all"
          >
            Continue as Guest
          </button>

          {/* Helper text */}
          <p className="text-xs text-neutral-400 text-center mt-6">
            Demo mode — any email and password will work
          </p>
        </div>
      </div>
    </div>
  );
}
