export type EmotionKey = 'gembira' | 'marah' | 'sedih' | 'takut' | 'risau' | 'penat' | 'tenang';

export interface AudioPaths {
  arabic: string;
  malay: string;
}

export interface EmotionDetails {
  emoji: string;
  label: string;
  color: 'yellow' | 'red' | 'blue' | 'purple' | 'orange' | 'teal' | 'green';
  illustration: 'HappyChildren' | 'AngryChild' | 'SadChild' | 'ScaredChild' | 'CalmChild';
  nasihat: string;
  aktiviti: string;
  zikir: string;
  zikirRumi: string;
  zikirMaksud: string;
  audio: AudioPaths;
}

export interface EmotionContent {
  id: string;
  label: string;
  emoji: string;
  color: string;
  advice_text: string;
  image_url: string;
  malay_audio_url: string;
  arabic_audio_url: string;
  sort_order: number;
  is_active: boolean;
  zikir: string;
  zikir_rumi: string;
  zikir_maksud: string;
  aktiviti: string;
}

export interface TherapyContent {
  id: string;
  emotion_id: string;
  title: string;
  instruction: string;
  therapy_type: string;
  count_target: number;
  arabic_text: string;
  rumi_text: string;
  meaning_text: string;
  image_url: string;
  malay_audio_url: string;
  arabic_audio_url: string;
  sort_order: number;
  is_active: boolean;
}

export interface DuaContent {
  id: string;
  title: string;
  arabic_text: string;
  rumi_text: string;
  meaning_text: string;
  image_url: string;
  audio_url: string;
  sort_order: number;
  is_active: boolean;
  emoji_decorative: string;
  explanation: string;
}

export interface DuaItem {
  id: string;
  name: string;
  arabic: string;
  rumi: string;
  meaning: string;
  bgColorClass: string;
  emojiDecorative: string;
  explanation: string;
  audio: AudioPaths;
}

export interface SelectedStudent {
  id: string;
  fullName: string;
  className: string;
  photoUrl: string;
}

export interface EmotionHistoryItem {
  id: string;
  emotion: EmotionKey;
  label: string;
  emoji: string;
  aktiviti: string;
  completedAt: string;
  completed: boolean;
  studentId?: string;
  studentFullName?: string;
  studentPhotoUrl?: string;
  completedDate?: string;
  completedTime?: string;
  shareText?: string;
  therapyId?: string;
  therapyTitle?: string;
}

export interface StudentRecord {
  id: string;
  full_name: string;
  class_name: string | null;
  photo_url: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export function toSelectedStudent(r: StudentRecord): SelectedStudent {
  return {
    id: r.id,
    fullName: r.full_name,
    className: r.class_name || '',
    photoUrl: r.photo_url || '',
  };
}

export function toStudentRecord(s: SelectedStudent, partial?: Partial<StudentRecord>): StudentRecord {
  return {
    id: s.id,
    full_name: s.fullName,
    class_name: s.className || null,
    photo_url: s.photoUrl || null,
    is_active: partial?.is_active ?? true,
    sort_order: partial?.sort_order ?? 0,
    created_at: partial?.created_at || new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

export interface SchoolSettings {
  id?: string;
  school_name: string;
  app_name: string;
  logo_url: string;
  tagline: string;
  theme_color: string;
}

export interface AppPage {
  id: string;
  page_name: string;
  title: string;
  subtitle: string;
  body_text: string;
  image_url: string;
  audio_url: string;
  content_json: Record<string, string>;
  is_active: boolean;
  updated_at: string;
}

export interface EmotionLogRecord {
  id: string;
  studentId: string;
  studentFullName: string;
  studentPhotoUrl: string;
  emotionId: string;
  emotionLabel: string;
  therapyTitle: string;
  status: string;
  completedAt: string;
  completedDate: string;
  completedTime: string;
  shareText: string;
}
