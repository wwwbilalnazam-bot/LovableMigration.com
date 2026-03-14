'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Star, Plus, Edit, Trash2, Eye, EyeOff, Loader2 } from 'lucide-react';

interface Review {
  id: string;
  reviewer_name: string;
  reviewer_role: string;
  company_name?: string;
  rating: number;
  review_text: string;
  is_visible: boolean;
  created_at: string;
}

export default function ReviewsAdminPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch('/api/reviews?admin=1');
    const data = await res.json();
    setReviews(Array.isArray(data) ? data : []);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function toggleVisibility(review: Review) {
    setActionId(review.id);
    await fetch(`/api/reviews/${review.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_visible: !review.is_visible }),
    });
    await load();
    setActionId(null);
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this review? This cannot be undone.')) return;
    setActionId(id);
    await fetch(`/api/reviews/${id}`, { method: 'DELETE' });
    setReviews((prev) => prev.filter((r) => r.id !== id));
    setActionId(null);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="h2 italic mb-2">
            Client <span className="text-primary">Reviews</span>
          </h1>
          <p className="text-text-muted text-sm font-black uppercase tracking-widest">
            {reviews.length} total &mdash;{' '}
            {reviews.filter((r) => r.is_visible).length} visible
          </p>
        </div>
        <Link
          href="/admin/reviews/new"
          className="flex items-center gap-2 px-6 py-3 bg-primary text-black font-black rounded-xl hover:bg-primary/90 transition-all"
        >
          <Plus size={18} />
          Add Review
        </Link>
      </div>

      {/* Table */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className={`glass-card !p-6 border-white/5 bg-surface/30 flex items-center gap-5 flex-wrap transition-opacity ${
              actionId === review.id ? 'opacity-50 pointer-events-none' : ''
            }`}
          >
            {/* Stars */}
            <div className="flex gap-0.5 flex-shrink-0">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  size={14}
                  className={
                    i <= review.rating
                      ? 'fill-amber-400 text-amber-400'
                      : 'fill-white/10 text-white/10'
                  }
                />
              ))}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="font-bold text-white text-sm">
                {review.reviewer_name}
              </p>
              <p className="text-text-muted text-xs">
                {review.reviewer_role}
                {review.company_name ? ` · ${review.company_name}` : ''}
              </p>
              <p className="text-text-subtle text-xs mt-1 line-clamp-1 italic">
                &ldquo;{review.review_text}&rdquo;
              </p>
            </div>

            {/* Visibility badge */}
            <span
              className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full flex-shrink-0 border ${
                review.is_visible
                  ? 'bg-primary/10 text-primary border-primary/20'
                  : 'bg-white/5 text-text-subtle border-white/10'
              }`}
            >
              {review.is_visible ? 'Visible' : 'Hidden'}
            </span>

            {/* Actions */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => toggleVisibility(review)}
                title={review.is_visible ? 'Hide review' : 'Show review'}
                className="p-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-primary/30 hover:text-primary transition-all text-text-muted"
              >
                {review.is_visible ? (
                  <EyeOff size={16} />
                ) : (
                  <Eye size={16} />
                )}
              </button>
              <Link
                href={`/admin/reviews/edit/${review.id}`}
                className="p-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-primary/30 hover:text-primary transition-all text-text-muted"
              >
                <Edit size={16} />
              </Link>
              <button
                onClick={() => handleDelete(review.id)}
                title="Delete review"
                className="p-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-red-500/30 hover:text-red-400 transition-all text-text-muted"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}

        {reviews.length === 0 && (
          <div className="glass-card !p-16 border-white/5 bg-surface/30 text-center">
            <p className="text-text-muted italic text-lg mb-4">
              No reviews yet.
            </p>
            <Link
              href="/admin/reviews/new"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-black font-black rounded-xl hover:bg-primary/90 transition-all"
            >
              <Plus size={18} />
              Add Your First Review
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
