-- ============================================================
-- LovableMigration – Founder & Reviews Setup
-- Run this in your Supabase SQL Editor
-- ============================================================

-- 1. founder_profile table
CREATE TABLE IF NOT EXISTS founder_profile (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name             TEXT NOT NULL DEFAULT '',
  role             TEXT NOT NULL DEFAULT '',
  bio              TEXT NOT NULL DEFAULT '',
  experience       TEXT NOT NULL DEFAULT '',
  specialization   JSONB NOT NULL DEFAULT '[]',
  linkedin_url     TEXT NOT NULL DEFAULT '',
  profile_image_url TEXT NOT NULL DEFAULT '',
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE founder_profile ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read founder_profile"
  ON founder_profile FOR SELECT USING (true);

CREATE POLICY "Service role manage founder_profile"
  ON founder_profile FOR ALL USING (auth.role() = 'service_role');

-- 2. reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reviewer_name  TEXT NOT NULL,
  reviewer_role  TEXT NOT NULL,
  company_name   TEXT,
  rating         INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL DEFAULT 5,
  review_text    TEXT NOT NULL,
  is_visible     BOOLEAN NOT NULL DEFAULT true,
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read visible reviews"
  ON reviews FOR SELECT USING (is_visible = true);

CREATE POLICY "Service role manage reviews"
  ON reviews FOR ALL USING (auth.role() = 'service_role');

-- 3. Supabase Storage bucket for founder profile images
INSERT INTO storage.buckets (id, name, public)
VALUES ('founder-images', 'founder-images', true)
ON CONFLICT DO NOTHING;

CREATE POLICY "Public view founder images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'founder-images');

CREATE POLICY "Service role upload founder images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'founder-images' AND auth.role() = 'service_role');

CREATE POLICY "Service role update founder images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'founder-images' AND auth.role() = 'service_role');

-- 4. Seed default founder profile (optional – edit values as needed)
INSERT INTO founder_profile (name, role, bio, experience, specialization, linkedin_url, profile_image_url)
VALUES (
  'Bilal Nazam',
  'Founder & Migration Specialist',
  'Hi, I''m Bilal Nazam, a technology specialist helping developers migrate their projects from Lovable Cloud to Supabase safely and efficiently. I created Lovable Migration to help developers move their applications without downtime, data loss, or technical complexity.',
  '4+ years',
  '["Lovable → Supabase migrations", "Backend optimization", "Database migration"]',
  '',
  ''
)
ON CONFLICT DO NOTHING;

-- 5. Seed sample reviews (optional)
INSERT INTO reviews (reviewer_name, reviewer_role, company_name, rating, review_text, is_visible)
VALUES
  ('Michael R.', 'SaaS Founder', NULL, 5, 'Bilal helped us migrate our Lovable project to Supabase without downtime. Highly recommended.', true),
  ('Sarah K.', 'CTO', 'TechStartup', 5, 'Professional, fast, and reliable. Our migration was completed in under 48 hours with zero data loss.', true),
  ('Ahmed M.', 'Developer', NULL, 5, 'Excellent service. Bilal knows exactly what he is doing. Saved us weeks of work.', true)
ON CONFLICT DO NOTHING;

-- 6. Add deployment_preference to leads table
--    Run this if your leads table already exists
ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS deployment_preference TEXT
    CHECK (deployment_preference IN ('supabase_cloud', 'self_hosted_supabase', 'not_sure'))
    DEFAULT 'not_sure';
