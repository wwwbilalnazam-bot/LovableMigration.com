import { NextRequest, NextResponse } from 'next/server';
import { validateToken } from '@/lib/auth';
import { getSupabaseAdmin } from '@/lib/supabase';

function getToken(req: NextRequest): string {
  const auth = req.headers.get('authorization');
  if (auth?.startsWith('Bearer ')) return auth.slice(7);
  const cookie = req.headers.get('cookie') ?? '';
  const match = cookie.match(/admin_session=([^;]+)/) ?? cookie.match(/admin_token=([^;]+)/);
  return match?.[1] ?? '';
}

export async function POST(req: NextRequest) {
  if (!validateToken(getToken(req))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const ext = file.name.split('.').pop() ?? 'jpg';
    const fileName = `profile-${Date.now()}.${ext}`;
    const buffer = await file.arrayBuffer();

    const admin = getSupabaseAdmin();
    const { error } = await admin.storage
      .from('founder-images')
      .upload(fileName, buffer, { contentType: file.type, upsert: true });

    if (error) throw new Error(error.message);

    const { data: urlData } = admin.storage
      .from('founder-images')
      .getPublicUrl(fileName);

    return NextResponse.json({ url: urlData.publicUrl });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Upload failed';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
