import { NextRequest, NextResponse } from 'next/server';
import { getFounderProfile, upsertFounderProfile } from '@/lib/founder';
import { validateToken } from '@/lib/auth';

function getToken(req: NextRequest): string {
  const auth = req.headers.get('authorization');
  if (auth?.startsWith('Bearer ')) return auth.slice(7);
  const cookie = req.headers.get('cookie') ?? '';
  const match = cookie.match(/admin_session=([^;]+)/) ?? cookie.match(/admin_token=([^;]+)/);
  return match?.[1] ?? '';
}

export async function GET() {
  try {
    const profile = await getFounderProfile();
    return NextResponse.json(profile);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  if (!validateToken(getToken(req))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const body = await req.json();
    const profile = await upsertFounderProfile(body);
    return NextResponse.json(profile);
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Server error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
