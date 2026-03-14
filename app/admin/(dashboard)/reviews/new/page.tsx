'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Loader2, Star } from 'lucide-react';

const inputCls =
  'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-primary/50 transition-colors placeholder:text-text-subtle';

export default function NewReviewPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    reviewer_name: '',
    reviewer_role: '',
    company_name: '',
    rating: 5,
    review_text: '',
    is_visible: true,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function handleSave() {
    if (!form.reviewer_name.trim() || !form.review_text.trim()) {
      setError('Name and review text are required.');
      return;
    }
    setSaving(true);
    setError('');

    const res = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        company_name: form.company_name.trim() || null,
      }),
    });

    if (!res.ok) {
      const json = await res.json();
      setError(json.error ?? 'Failed to create review');
      setSaving(false);
      return;
    }

    router.push('/admin/reviews');
  }

  return (
    <div className="space-y-8 max-w-2xl">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/reviews"
          className="p-2 rounded-xl bg-white/5 border border-white/5 hover:border-primary/30 hover:text-primary transition-all text-text-muted"
        >
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="h2 italic mb-1">
            Add <span className="text-primary">Review</span>
          </h1>
          <p className="text-text-muted text-sm font-black uppercase tracking-widest">
            Create a new client testimonial
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl px-5 py-3 text-sm">
          {error}
        </div>
      )}

      <div className="glass-card !p-8 border-white/5 bg-surface/30 space-y-6">
        {/* Star rating */}
        <div className="space-y-2">
          <label className="block text-xs font-black uppercase tracking-widest text-text-subtle">
            Rating
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setForm((f) => ({ ...f, rating: star }))}
                className="transition-transform hover:scale-110"
                aria-label={`${star} star${star > 1 ? 's' : ''}`}
              >
                <Star
                  size={28}
                  className={
                    star <= form.rating
                      ? 'fill-amber-400 text-amber-400'
                      : 'fill-white/10 text-white/10'
                  }
                />
              </button>
            ))}
            <span className="ml-2 text-sm text-text-muted self-center">
              {form.rating} / 5
            </span>
          </div>
        </div>

        {/* Name + Role */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="block text-xs font-black uppercase tracking-widest text-text-subtle">
              Reviewer Name <span className="text-red-400">*</span>
            </label>
            <input
              value={form.reviewer_name}
              onChange={(e) =>
                setForm((f) => ({ ...f, reviewer_name: e.target.value }))
              }
              className={inputCls}
              placeholder="Michael R."
            />
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-black uppercase tracking-widest text-text-subtle">
              Role / Title <span className="text-red-400">*</span>
            </label>
            <input
              value={form.reviewer_role}
              onChange={(e) =>
                setForm((f) => ({ ...f, reviewer_role: e.target.value }))
              }
              className={inputCls}
              placeholder="SaaS Founder"
            />
          </div>
        </div>

        {/* Company */}
        <div className="space-y-2">
          <label className="block text-xs font-black uppercase tracking-widest text-text-subtle">
            Company Name{' '}
            <span className="text-text-subtle font-normal normal-case">
              (optional)
            </span>
          </label>
          <input
            value={form.company_name}
            onChange={(e) =>
              setForm((f) => ({ ...f, company_name: e.target.value }))
            }
            className={inputCls}
            placeholder="Acme Inc."
          />
        </div>

        {/* Review text */}
        <div className="space-y-2">
          <label className="block text-xs font-black uppercase tracking-widest text-text-subtle">
            Review Text <span className="text-red-400">*</span>
          </label>
          <textarea
            value={form.review_text}
            onChange={(e) =>
              setForm((f) => ({ ...f, review_text: e.target.value }))
            }
            rows={5}
            className={`${inputCls} resize-none`}
            placeholder="Bilal helped us migrate our Lovable project to Supabase without downtime…"
          />
        </div>

        {/* Visibility toggle */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setForm((f) => ({ ...f, is_visible: !f.is_visible }))}
            className={`relative w-11 h-6 rounded-full transition-colors ${
              form.is_visible ? 'bg-primary' : 'bg-white/10'
            }`}
            aria-label="Toggle visibility"
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                form.is_visible ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
          <span className="text-sm font-bold text-text-muted">
            {form.is_visible
              ? 'Visible on website'
              : 'Hidden from website'}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-8 py-4 bg-primary text-black font-black rounded-xl hover:bg-primary/90 transition-all disabled:opacity-50"
        >
          {saving ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Save size={18} />
          )}
          {saving ? 'Saving…' : 'Save Review'}
        </button>
        <Link
          href="/admin/reviews"
          className="px-6 py-4 text-sm font-bold text-text-muted hover:text-white transition-colors"
        >
          Cancel
        </Link>
      </div>
    </div>
  );
}
