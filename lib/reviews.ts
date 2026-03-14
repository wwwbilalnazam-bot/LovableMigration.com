import { supabase, getSupabaseAdmin } from './supabase';

export interface Review {
  id?: string;
  reviewer_name: string;
  reviewer_role: string;
  company_name?: string;
  rating: number;
  review_text: string;
  is_visible?: boolean;
  created_at?: string;
}

const FALLBACK_REVIEWS: Review[] = [
  {
    id: '1',
    reviewer_name: 'Michael R.',
    reviewer_role: 'SaaS Founder',
    rating: 5,
    review_text:
      'Bilal helped us migrate our Lovable project to Supabase without downtime. Highly recommended.',
    is_visible: true,
  },
  {
    id: '2',
    reviewer_name: 'Sarah K.',
    reviewer_role: 'CTO',
    company_name: 'TechStartup',
    rating: 5,
    review_text:
      'Professional, fast, and reliable. Our migration was completed in under 48 hours with zero data loss.',
    is_visible: true,
  },
  {
    id: '3',
    reviewer_name: 'Ahmed M.',
    reviewer_role: 'Developer',
    rating: 5,
    review_text:
      'Excellent service. Bilal knows exactly what he is doing. Saved us weeks of work.',
    is_visible: true,
  },
];

export async function getVisibleReviews(): Promise<Review[]> {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('is_visible', true)
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) return FALLBACK_REVIEWS;
    return data;
  } catch {
    return FALLBACK_REVIEWS;
  }
}

export async function getAllReviewsAdmin(): Promise<Review[]> {
  try {
    const admin = getSupabaseAdmin();
    const { data, error } = await admin
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data) return [];
    return data;
  } catch {
    return [];
  }
}

export async function createReview(
  review: Omit<Review, 'id' | 'created_at'>
): Promise<Review> {
  const admin = getSupabaseAdmin();
  const { data, error } = await admin
    .from('reviews')
    .insert({ ...review, is_visible: review.is_visible ?? true })
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function updateReview(
  id: string,
  review: Partial<Review>
): Promise<Review> {
  const admin = getSupabaseAdmin();
  const { data, error } = await admin
    .from('reviews')
    .update(review)
    .eq('id', id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function deleteReview(id: string): Promise<void> {
  const admin = getSupabaseAdmin();
  const { error } = await admin.from('reviews').delete().eq('id', id);
  if (error) throw new Error(error.message);
}
