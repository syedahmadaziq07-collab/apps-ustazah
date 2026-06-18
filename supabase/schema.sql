-- ZikirCare Supabase Schema
-- Phase 3A: Complete schema with all columns used by services, indexes, and comments
-- Safe to run multiple times (uses CREATE TABLE IF NOT EXISTS and CREATE INDEX IF NOT EXISTS)

-- ============================================
-- Table: school_settings
-- Singleton row for school branding.
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
-- Student profiles for photo login.
-- Photo files stored in storage bucket 'student-photos'.
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

CREATE INDEX IF NOT EXISTS idx_students_active_sort ON students (is_active, sort_order);

-- ============================================
-- Table: teacher_profiles
-- Linked to auth.users when Supabase Auth is enabled.
-- For now, teacher PIN login (VITE_TEACHER_PIN) is used.
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
-- Editable page content for Home, Login, Profile screens.
-- id is a stable text key: 'login', 'home', 'profile'.
-- content_json stores page-specific JSON fields.
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
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ============================================
-- Table: emotions
-- Editable emotion definitions with zikir text.
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
  zikir text,
  zikir_rumi text,
  zikir_maksud text,
  aktiviti text,
  sort_order int DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Audio fields for student page auto-play (Phase 3E)
ALTER TABLE emotions ADD COLUMN IF NOT EXISTS audio_terapi_url text;
ALTER TABLE emotions ADD COLUMN IF NOT EXISTS audio_baca_url text;
ALTER TABLE emotions ADD COLUMN IF NOT EXISTS audio_tahniah_url text;

CREATE INDEX IF NOT EXISTS idx_emotions_active_sort ON emotions (is_active, sort_order);

-- ============================================
-- Table: therapies
-- Therapy/zikir activities linked to an emotion via emotion_id.
-- ============================================
CREATE TABLE IF NOT EXISTS therapies (
  id text PRIMARY KEY,
  emotion_id text REFERENCES emotions(id) ON DELETE CASCADE,
  title text NOT NULL,
  instruction text,
  therapy_type text,
  count_target int DEFAULT 1,
  arabic_text text,
  rumi_text text,
  meaning_text text,
  image_url text,
  malay_audio_url text,
  arabic_audio_url text,
  sort_order int DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_therapies_emotion ON therapies (emotion_id, is_active, sort_order);

-- ============================================
-- Table: duas
-- Editable doa/zikir list for the Dua screen.
-- ============================================
CREATE TABLE IF NOT EXISTS duas (
  id text PRIMARY KEY,
  title text NOT NULL,
  arabic_text text,
  rumi_text text,
  meaning_text text,
  image_url text,
  audio_url text,
  emoji_decorative text DEFAULT '📖',
  explanation text,
  sort_order int DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_duas_active_sort ON duas (is_active, sort_order);

-- ============================================
-- Table: emotion_logs
-- Records of completed student emotion/therapy sessions.
-- Used by Sejarah screens and parent share.
-- ============================================
CREATE TABLE IF NOT EXISTS emotion_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES students(id) ON DELETE SET NULL,
  student_full_name text,
  student_photo_url text,
  emotion_id text,
  emotion_label text,
  therapy_id text,
  therapy_title text,
  status text DEFAULT 'completed',
  started_at timestamptz,
  completed_at timestamptz DEFAULT now(),
  completed_date text,
  completed_time text,
  share_text text,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_emotion_logs_created ON emotion_logs (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_emotion_logs_student ON emotion_logs (student_id);

-- ============================================
-- Table: school_profile
-- Editable school counsellor profile for the student Profil page.
-- Singleton row: teacher_name, lembaga_number, school_name, teacher_photo_url.
-- ============================================
CREATE TABLE IF NOT EXISTS school_profile (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_name text NOT NULL DEFAULT '',
  lembaga_number text NOT NULL DEFAULT '',
  school_name text NOT NULL DEFAULT '',
  teacher_photo_url text NOT NULL DEFAULT '',
  updated_at timestamptz DEFAULT now()
);
