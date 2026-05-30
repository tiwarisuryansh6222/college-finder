'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Review } from '@/lib/types';
import { StarRating } from '../StarRating';

interface ReviewsTabProps {
  reviews: Review[];
  overallRating: number;
  reviewCount: number;
}

const REVIEWS_PER_PAGE = 5;

const COLORS = [
  'bg-primary-100 text-primary-700',
  'bg-emerald-100 text-emerald-700',
  'bg-violet-100 text-violet-700',
  'bg-amber-100 text-amber-700',
  'bg-rose-100 text-rose-700',
];

function getInitials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
}

// Animated bar for rating distribution
function AnimatedBar({ percent }: { percent: number }) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => setWidth(percent), 100);
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [percent]);

  return (
    <div ref={ref} className="flex-1 h-2 bg-neutral-200 rounded-full overflow-hidden">
      <div
        className="h-full bg-primary-500 rounded-full transition-all duration-700 ease-out"
        style={{ width: `${width}%` }}
      />
    </div>
  );
}

// Star rating picker for write review form
function StarPicker({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(star)}
          className="transition-transform hover:scale-110"
        >
          <svg
            className={`w-7 h-7 ${star <= (hovered || value) ? 'text-amber-400' : 'text-neutral-300'} transition-colors`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </button>
      ))}
    </div>
  );
}

// Individual review card
function ReviewCard({ review, index }: { review: Review; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const [helpful, setHelpful] = useState(Math.floor(Math.random() * 18));
  const [voted, setVoted] = useState<'up' | 'down' | null>(null);
  const colorClass = COLORS[index % COLORS.length];

  // Simulate per-category ratings from overall rating
  const seed = (review.rating * 7 + index * 3) % 3;
  const categories = [
    { label: 'Academics', rating: Math.min(5, review.rating + (seed === 0 ? 0.3 : -0.2)) },
    { label: 'Placements', rating: Math.min(5, review.rating + (seed === 1 ? 0.2 : -0.3)) },
    { label: 'Faculty', rating: Math.min(5, review.rating + (seed === 2 ? 0.1 : -0.1)) },
  ];

  return (
    <div className="bg-white border border-neutral-200 rounded-xl shadow-sm p-5 mb-3 hover:shadow-md transition-shadow">
      {/* ROW 1: Avatar + meta */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${colorClass}`}>
            {getInitials(review.author)}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-semibold text-neutral-800">{review.author}</span>
              <span className="bg-neutral-100 text-neutral-500 text-xs px-2 py-0.5 rounded-full">2024 Batch</span>
            </div>
          </div>
        </div>
        <span className="text-xs text-neutral-400 flex-shrink-0">{formatDate(review.date)}</span>
      </div>

      {/* ROW 2: Overall star rating */}
      <StarRating rating={review.rating} size="sm" showNumber={true} />

      {/* ROW 3: Category mini-ratings */}
      <div className="flex gap-4 flex-wrap mt-2 mb-3">
        {categories.map((cat) => (
          <span key={cat.label} className="flex items-center gap-1 text-xs text-neutral-500">
            <svg className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="font-medium text-neutral-700">{cat.label}:</span>
            <span>{cat.rating.toFixed(1)}</span>
          </span>
        ))}
      </div>

      {/* ROW 4: Review text */}
      <p className={`text-sm text-neutral-700 leading-relaxed ${!expanded ? 'line-clamp-4' : ''}`}>
        {review.comment}
      </p>
      {review.comment.length > 200 && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="text-xs text-primary-600 hover:text-primary-700 mt-1 font-medium"
        >
          {expanded ? 'Show less' : 'Read more'}
        </button>
      )}

      {/* ROW 5: Helpful + Report */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-neutral-100">
        <div className="flex items-center gap-3 text-xs text-neutral-500">
          <span>Was this helpful?</span>
          <button
            type="button"
            onClick={() => { if (voted !== 'up') { setHelpful((v) => v + 1); setVoted('up'); } }}
            className={`flex items-center gap-1 px-2 py-1 rounded-md transition-colors ${
              voted === 'up' ? 'bg-emerald-50 text-emerald-600' : 'hover:bg-neutral-100 text-neutral-500'
            }`}
          >
            👍 {helpful}
          </button>
          <button
            type="button"
            onClick={() => { if (voted !== 'down') { setVoted('down'); } }}
            className={`flex items-center gap-1 px-2 py-1 rounded-md transition-colors ${
              voted === 'down' ? 'bg-red-50 text-red-500' : 'hover:bg-neutral-100 text-neutral-500'
            }`}
          >
            👎
          </button>
        </div>
        <button type="button" className="text-xs text-neutral-400 hover:text-neutral-500">
          Report
        </button>
      </div>
    </div>
  );
}

// Write Review inline form
function WriteReviewForm({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(onClose, 1500);
  };

  if (submitted) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 text-center">
        <p className="text-emerald-700 font-semibold">✓ Review submitted! Thank you.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-neutral-50 border border-neutral-200 rounded-xl p-5 mb-6 flex flex-col gap-4 animate-[scaleIn_0.15s_ease-out]"
    >
      <h3 className="text-sm font-semibold text-neutral-700">Write a Review</h3>
      <div className="grid grid-cols-2 gap-3">
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="text-sm border border-neutral-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-400 bg-white"
        />
        <input
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          placeholder="Course enrolled (optional)"
          className="text-sm border border-neutral-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-400 bg-white"
        />
      </div>
      <div>
        <p className="text-xs text-neutral-500 mb-2">Your Rating</p>
        <StarPicker value={rating} onChange={setRating} />
      </div>
      <textarea
        required
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Share your experience at this college..."
        rows={4}
        className="text-sm border border-neutral-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-400 bg-white resize-none"
      />
      <div className="flex gap-2 justify-end">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm text-neutral-500 hover:text-neutral-700 border border-neutral-200 rounded-lg hover:bg-neutral-100 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!rating}
          className="px-5 py-2 text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Submit Review
        </button>
      </div>
    </form>
  );
}

export function ReviewsTab({ reviews, overallRating, reviewCount }: ReviewsTabProps) {
  const [visibleCount, setVisibleCount] = useState(REVIEWS_PER_PAGE);
  const [showForm, setShowForm] = useState(false);

  // Rating distribution
  const distribution = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((r) => Math.round(r.rating) === star).length;
    const percent = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
    return { star, count, percent };
  });

  // Category averages from reviews (simulate with rating offsets)
  const categories = [
    { label: 'Academics',       offset:  0.1 },
    { label: 'Placements',      offset: -0.2 },
    { label: 'Faculty',         offset:  0.15 },
    { label: 'Infrastructure',  offset: -0.1 },
    { label: 'Campus Life',     offset:  0.05 },
  ];

  const visibleReviews = reviews.slice(0, visibleCount);
  const hasMore = visibleCount < reviews.length;

  return (
    <div>
      {/* Heading row */}
      <div className="flex items-center justify-between pb-2 mb-5 border-b border-neutral-100">
        <h2 className="text-lg font-bold text-neutral-900">Student Reviews</h2>
        <button
          type="button"
          onClick={() => setShowForm((v) => !v)}
          className="bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors shadow-sm"
        >
          {showForm ? 'Cancel' : 'Write a Review'}
        </button>
      </div>

      {/* Write review inline form */}
      {showForm && <WriteReviewForm onClose={() => setShowForm(false)} />}

      {/* PART A: Rating summary */}
      <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-6 mb-6">
        <div className="flex gap-8 flex-wrap">
          {/* Left: big number */}
          <div className="flex flex-col items-center justify-center min-w-[100px]">
            <p className="text-5xl font-bold text-neutral-900">{overallRating}</p>
            <p className="text-neutral-500 text-sm">/5</p>
            <StarRating rating={overallRating} size="md" showNumber={false} />
            <p className="text-xs text-neutral-400 mt-1">Based on {reviewCount.toLocaleString()} reviews</p>
          </div>

          {/* Right: distribution bars */}
          <div className="flex-1 min-w-[160px] flex flex-col gap-2">
            {distribution.map(({ star, count, percent }) => (
              <div key={star} className="flex items-center gap-2">
                <span className="text-xs text-neutral-500 w-4 text-right">{star}</span>
                <svg className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <AnimatedBar percent={percent} />
                <span className="text-xs text-neutral-400 w-6 text-right">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* PART B: Category ratings */}
        <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mt-5 pt-5 border-t border-neutral-200">
          {categories.map((cat) => {
            const catRating = Math.min(5, Math.max(1, overallRating + cat.offset)).toFixed(1);
            return (
              <div key={cat.label} className="flex flex-col items-center gap-1">
                <p className="text-xs text-neutral-400 uppercase tracking-wide text-center">{cat.label}</p>
                <p className="text-base font-semibold text-neutral-800">{catRating}<span className="text-xs text-neutral-400">/5</span></p>
              </div>
            );
          })}
        </div>
      </div>

      {/* PART D: Individual reviews */}
      {reviews.length === 0 ? (
        <p className="text-sm text-neutral-500 text-center py-8">No reviews yet. Be the first to review!</p>
      ) : (
        <>
          {visibleReviews.map((review, i) => (
            <ReviewCard key={review.id} review={review} index={i} />
          ))}

          {hasMore && (
            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => setVisibleCount((v) => v + REVIEWS_PER_PAGE)}
                className="border border-neutral-300 text-neutral-600 hover:border-primary-300 hover:text-primary-600 text-sm font-medium px-6 py-2.5 rounded-lg transition-colors"
              >
                Load More Reviews
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
