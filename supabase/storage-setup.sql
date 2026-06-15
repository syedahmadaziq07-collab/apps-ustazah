-- ZikirCare Supabase Storage Setup
-- Phase 2D: Storage buckets for image and audio uploads
--
-- Run these SQL statements in your Supabase SQL Editor
-- or create buckets manually via Supabase Dashboard > Storage.
--
-- IMPORTANT: For production, tighten RLS policies to restrict write
-- access to authenticated teachers only. The public read policies below
-- allow the student app to display/play files without authentication.

-- ============================================
-- Bucket: student-photos
-- Purpose: Real passport-style student photos
-- ============================================
INSERT INTO storage.buckets (id, name, public, avif_autodetection)
VALUES ('student-photos', 'student-photos', true, false)
ON CONFLICT (id) DO NOTHING;

-- Public read (anyone can view photos)
CREATE POLICY "student-photos-public-read"
ON storage.objects FOR SELECT
USING (bucket_id = 'student-photos');

-- Authenticated upload (teacher/admin only)
-- For demo: allow anon uploads (restrict in production)
CREATE POLICY "student-photos-upload"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'student-photos');

-- ============================================
-- Bucket: app-images
-- Purpose: School logo, hero images, emotion/therapy/doa images
-- ============================================
INSERT INTO storage.buckets (id, name, public, avif_autodetection)
VALUES ('app-images', 'app-images', true, false)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "app-images-public-read"
ON storage.objects FOR SELECT
USING (bucket_id = 'app-images');

CREATE POLICY "app-images-upload"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'app-images');

-- ============================================
-- Bucket: app-audio
-- Purpose: Malay nasihat audio, Arabic zikir audio, doa audio, therapy audio
-- ============================================
INSERT INTO storage.buckets (id, name, public, avif_autodetection)
VALUES ('app-audio', 'app-audio', true, false)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "app-audio-public-read"
ON storage.objects FOR SELECT
USING (bucket_id = 'app-audio');

CREATE POLICY "app-audio-upload"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'app-audio');

-- ============================================
-- Production Security Notes:
-- ============================================
-- 1. For production, replace INSERT policies with:
--    CREATE POLICY "app-images-upload-authenticated"
--    ON storage.objects FOR INSERT
--    WITH CHECK (
--      bucket_id = 'app-images'
--      AND auth.role() = 'authenticated'
--    );
--
-- 2. To restrict file types at the database level,
--    add a CHECK constraint or use Supabase Dashboard
--    "File size limit" and "Allowed MIME types" settings.
--
-- 3. Recommended limits:
--    - Images: max 5MB, types: image/jpeg, image/png, image/webp
--    - Audio:  max 15MB, types: audio/mpeg, audio/wav, audio/mp4, audio/ogg
