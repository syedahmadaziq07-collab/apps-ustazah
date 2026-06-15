-- ZikirCare Supabase Storage Setup
-- Phase 3A: Storage buckets for image and audio uploads
--
-- Run these SQL statements in your Supabase SQL Editor.
--
-- For school production, replace demo upload policy with teacher-authenticated
-- upload policy (see production notes at bottom).
-- Do not use service role key in frontend.

-- ============================================
-- Bucket: student-photos
-- Purpose: Real passport-style student photos
-- ============================================
INSERT INTO storage.buckets (id, name, public, avif_autodetection)
VALUES ('student-photos', 'student-photos', true, false)
ON CONFLICT (id) DO NOTHING;

-- Public read (anyone can view photos — needed for student login cards)
CREATE POLICY "student-photos-public-read"
ON storage.objects FOR SELECT
USING (bucket_id = 'student-photos');

-- Demo: allow anon upload (anyone can upload).
-- For school production, replace demo upload policy with teacher-authenticated
-- upload policy (see production notes at bottom).
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
-- Production Security Notes
-- ============================================
-- 1. For school production, replace demo upload policy with
--    teacher-authenticated upload policy:
--
--    DROP POLICY IF EXISTS "student-photos-upload" ON storage.objects;
--    CREATE POLICY "student-photos-upload-authenticated"
--    ON storage.objects FOR INSERT
--    WITH CHECK (
--      bucket_id = 'student-photos'
--      AND auth.role() = 'authenticated'
--    );
--
--    (Repeat for app-images-upload and app-audio-upload.)
--
-- 2. Do not use service role key in frontend.
--    The anon key with RLS policies is sufficient.
--
-- 3. To restrict file types at the database level,
--    add a CHECK constraint or use Supabase Dashboard
--    "File size limit" and "Allowed MIME types" settings.
--
-- 4. Recommended limits (already enforced by frontend):
--    - Images: max 5MB, types: image/jpeg, image/png, image/webp
--    - Audio:  max 15MB, types: audio/mpeg, audio/wav, audio/mp4, audio/ogg
