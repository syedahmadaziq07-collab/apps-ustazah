-- ZikirCare Supabase Schema
-- Phase 1: Foundation tables for student login, emotion tracking, and future CMS

-- ============================================
-- Table: school_settings
-- ============================================
CREATE TABLE IF NOT EXISTS school_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_name text,
  app_name text DEFAULT 'ZikirCare',
  logo_url text,
  tagline text,
  theme_color text DEFAULT '#8B5CF6',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ============================================
-- Table: students
-- Real student photos should be stored in Supabase Storage bucket 'student-photos'
-- and linked via students.photo_url
-- ============================================
CREATE TABLE IF NOT EXISTS students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  class_name text,
  photo_url text,
  is_active boolean DEFAULT true,
  sort_order int DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ============================================
-- Table: teacher_profiles
-- Teacher auth uses Supabase Auth email/password.
-- This table stores profile info linked to auth.users.
-- ============================================
CREATE TABLE IF NOT EXISTS teacher_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text,
  full_name text,
  role text DEFAULT 'teacher',
  created_at timestamptz DEFAULT now()
);

-- ============================================
-- Table: app_pages
-- Editable page content for Home, Sejarah, Doa, Profile screens
-- ============================================
CREATE TABLE IF NOT EXISTS app_pages (
  id text PRIMARY KEY,
  page_name text NOT NULL,
  title text,
  subtitle text,
  body_text text,
  image_url text,
  audio_url text,
  content_json jsonb DEFAULT '{}'::jsonb,
  is_active boolean DEFAULT true,
  updated_at timestamptz DEFAULT now()
);

-- ============================================
-- Table: emotions
-- Editable emotion definitions
-- ============================================
CREATE TABLE IF NOT EXISTS emotions (
  id text PRIMARY KEY,
  label text NOT NULL,
  emoji text,
  color text,
  advice_text text,
  image_url text,
  malay_audio_url text,
  arabic_audio_url text,
  sort_order int DEFAULT 0,
  is_active boolean DEFAULT true,
  updated_at timestamptz DEFAULT now()
);

-- ============================================
-- Table: therapies
-- Editable therapy/zikir activities linked to emotions
-- ============================================
CREATE TABLE IF NOT EXISTS therapies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  emotion_id text REFERENCES emotions(id),
  title text NOT NULL,
  instruction text,
  therapy_type text,
  count_target int DEFAULT 0,
  arabic_text text,
  rumi_text text,
  meaning_text text,
  image_url text,
  malay_audio_url text,
  arabic_audio_url text,
  sort_order int DEFAULT 0,
  is_active boolean DEFAULT true,
  updated_at timestamptz DEFAULT now()
);

-- ============================================
-- Table: duas
-- Editable doa/zikir list
-- ============================================
CREATE TABLE IF NOT EXISTS duas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  arabic_text text,
  rumi_text text,
  meaning_text text,
  image_url text,
  audio_url text,
  sort_order int DEFAULT 0,
  is_active boolean DEFAULT true,
  updated_at timestamptz DEFAULT now()
);

-- ============================================
-- Table: emotion_logs
-- Records of student emotion/therapy sessions
-- ============================================
CREATE TABLE IF NOT EXISTS emotion_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES students(id),
  student_full_name text,
  student_photo_url text,
  emotion_id text,
  emotion_label text,
  therapy_id uuid,
  therapy_title text,
  status text DEFAULT 'completed',
  started_at timestamptz,
  completed_at timestamptz DEFAULT now(),
  completed_date text,
  completed_time text,
  share_text text,
  created_at timestamptz DEFAULT now()
);

-- ============================================
-- Storage buckets (create via Supabase Dashboard)
-- ============================================
-- Required buckets:
-- 1. student-photos  (public read, authenticated write)
-- 2. app-images      (public read, authenticated write)
-- 3. app-audio       (public read, authenticated write)
--
-- TODO: Add Row Level Security (RLS) policies when deploying to production.
-- For Phase 1, RLS is left as a manual setup step.
-- Example RLS for students table:
--   CREATE POLICY "Students are viewable by everyone" ON students FOR SELECT USING (true);
--   CREATE POLICY "Students are insertable by teachers only" ON students FOR INSERT WITH CHECK (auth.role() = 'authenticated');
