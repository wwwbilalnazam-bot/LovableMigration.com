import { NextRequest, NextResponse } from 'next/server';
import { updateReview, deleteReview } from '@/lib/reviews';
import { validateToken } from '@/lib/auth';

function getToken(req: NextRequest): string {
  const auth = req.headers.get('authorization');
  if (auth?.startsWith('Bearer ')) return auth.slice(7);
  const cookie = req.headers.get('cookie') ?? '';
  const match = cookie.match(/admin_session=([^;]+)/) ?? cookie.match(/admin_token=([^;]+)/);
  return match?.[1] ?? '';
}

interface Props {
  params: Promise<{ id: string }>;
}

export async function PUT(req: NextRequest, { params }: Props) {
  if (!validateToken(getToken(req))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  try {
    const body = await req.json();
    const review = await updateReview(id, body);
    return NextResponse.json(review);
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Server error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: Props) {
  if (!validateToken(getToken(req))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  try {
    await deleteReview(id);
    return NextResponse.json({ success: true });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Server error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
