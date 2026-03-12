import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials missing. Please check your .env.local file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin client for server-side (only available in Node.js environment)
export const getSupabaseAdmin = () => {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  if (!serviceRoleKey) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is missing');
  }
  return createClient(supabaseUrl, serviceRoleKey);
};
