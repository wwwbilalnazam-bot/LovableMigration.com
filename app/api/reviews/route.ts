import { NextRequest, NextResponse } from 'next/server';
import { getVisibleReviews, getAllReviewsAdmin, createReview } from '@/lib/reviews';
import { validateToken } from '@/lib/auth';

function getToken(req: NextRequest): string {
  const auth = req.headers.get('authorization');
  if (auth?.startsWith('Bearer ')) return auth.slice(7);
  const cookie = req.headers.get('cookie') ?? '';
  const match = cookie.match(/admin_session=([^;]+)/) ?? cookie.match(/admin_token=([^;]+)/);
  return match?.[1] ?? '';
}

export async function GET(req: NextRequest) {
  const isAdmin = req.nextUrl.searchParams.get('admin') === '1';

  if (isAdmin && !validateToken(getToken(req))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const reviews = isAdmin ? await getAllReviewsAdmin() : await getVisibleReviews();
    return NextResponse.json(reviews);
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Server error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!validateToken(getToken(req))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const review = await createReview(body);
    return NextResponse.json(review, { status: 201 });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Server error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
