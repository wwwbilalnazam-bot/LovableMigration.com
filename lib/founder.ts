import { supabase, getSupabaseAdmin } from './supabase';

export interface FounderProfile {
  id?: string;
  name: string;
  role: string;
  bio: string;
  experience: string;
  specialization: string[];
  linkedin_url: string;
  profile_image_url: string;
}

const DEFAULT_FOUNDER: FounderProfile = {
  name: 'Bilal Nazam',
  role: 'Founder & Migration Specialist',
  bio: "Hi, I'm Bilal Nazam, a technology specialist helping developers migrate their projects from Lovable Cloud to Supabase safely and efficiently. I created Lovable Migration to help developers move their applications without downtime, data loss, or technical complexity.",
  experience: '4+ years',
  specialization: [
    'Lovable → Supabase migrations',
    'Backend optimization',
    'Database migration',
  ],
  linkedin_url: '',
  profile_image_url: '',
};

export async function getFounderProfile(): Promise<FounderProfile> {
  try {
    const { data, error } = await supabase
      .from('founder_profile')
      .select('*')
      .limit(1)
      .maybeSingle();

    if (error || !data) return DEFAULT_FOUNDER;

    return {
      ...data,
      specialization: Array.isArray(data.specialization)
        ? data.specialization
        : [],
    };
  } catch {
    return DEFAULT_FOUNDER;
  }
}

export async function upsertFounderProfile(
  profile: Partial<FounderProfile>
): Promise<FounderProfile> {
  const admin = getSupabaseAdmin();

  const { data: existing } = await admin
    .from('founder_profile')
    .select('id')
    .limit(1)
    .maybeSingle();

  if (existing?.id) {
    const { data, error } = await admin
      .from('founder_profile')
      .update({ ...profile, updated_at: new Date().toISOString() })
      .eq('id', existing.id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return { ...data, specialization: Array.isArray(data.specialization) ? data.specialization : [] };
  }

  const { data, error } = await admin
    .from('founder_profile')
    .insert(profile)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return { ...data, specialization: Array.isArray(data.specialization) ? data.specialization : [] };
}
