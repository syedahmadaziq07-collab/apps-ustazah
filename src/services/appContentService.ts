import { supabase, isSupabaseConnected } from '../lib/supabase';
import { SchoolSettings, AppPage, SchoolProfile } from '../types';

const SETTINGS_KEY = 'zikirCareSchoolSettings';
const PAGES_KEY = 'zikirCareAppPages';
const SCHOOL_PROFILE_KEY = 'zikirCareSchoolProfile';
const SETTINGS_SINGLETON_ID = '00000000-0000-0000-0000-000000000001';
const SCHOOL_PROFILE_SINGLETON_ID = '00000000-0000-0000-0000-000000000002';

const DEFAULT_SETTINGS: SchoolSettings = {
  school_name: 'SK AL-FALAH',
  app_name: 'ZikirCare',
  logo_url: '',
  tagline: 'Aplikasi Kerohanian & Emosi Kanak-Kanak',
  theme_color: '#8B5CF6',
};

const DEFAULT_SCHOOL_PROFILE: SchoolProfile = {
  teacher_name: 'Cikgu Fatimah Binti Ismail',
  lembaga_number: 'KB-08249-M',
  school_name: 'SK Seri Idaman, Shah Alam, Selangor',
  teacher_photo_url: '',
};

const DEFAULT_PAGES: Record<string, AppPage> = {
  home: {
    id: 'home',
    page_name: 'home',
    title: 'Apa perasaan kamu hari ini?',
    subtitle: 'Pilih emosi yang kamu rasa sekarang untuk bertenang bersama ZikirCare.',
    body_text: '',
    image_url: '/assets/illustrations/home-children-hero.png',
    audio_url: '',
    content_json: {
      welcomeText: 'Selamat datang',
      selectedStudentLabel: 'Hari ini:',
      changeStudentButtonText: 'Tukar',
    },
    is_active: true,
    updated_at: new Date().toISOString(),
  },
  profile: {
    id: 'profile',
    page_name: 'profile',
    title: 'Profil App',
    subtitle: 'ZikirCare membantu murid mengenal emosi dan mengamalkan cara bertenang secara Islam.',
    body_text: 'Aplikasi ZikirCare: Tenang Bersama Islam direka khas sebagai instrumen bantuan digital untuk pengamal kaunseling sekolah dalam mengendalikan terapi intervensi emosi murid.',
    image_url: '',
    audio_url: '',
    content_json: {
      schoolInfo: 'SK Seri Idaman, Shah Alam, Selangor',
      counsellingNote: 'ZikirCare menyusun peralihan kognitif negatif kepada gema zikrullah untuk menstabilkan kondisi psikologi murid.',
      privacyNote: 'Data murid disimpan secara setempat dan tidak dikongsi dengan pihak ketiga.',
      supportText: 'Untuk sokongan teknikal, hubungi pihak pentadbir sistem.',
    },
    is_active: true,
    updated_at: new Date().toISOString(),
  },
  login: {
    id: 'login',
    page_name: 'login',
    title: 'Siapa yang hadir hari ini?',
    subtitle: 'Pilih gambar kamu sebelum mula.',
    body_text: '',
    image_url: '',
    audio_url: '',
    content_json: {},
    is_active: true,
    updated_at: new Date().toISOString(),
  },
};

function getLocalSettings(): SchoolSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    return raw ? JSON.parse(raw) : { ...DEFAULT_SETTINGS };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

function saveLocalSettings(settings: SchoolSettings) {
  try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)); } catch {}
}

function getLocalPages(): Record<string, AppPage> {
  try {
    const raw = localStorage.getItem(PAGES_KEY);
    return raw ? JSON.parse(raw) : JSON.parse(JSON.stringify(DEFAULT_PAGES));
  } catch {
    return JSON.parse(JSON.stringify(DEFAULT_PAGES));
  }
}

function saveLocalPages(pages: Record<string, AppPage>) {
  try { localStorage.setItem(PAGES_KEY, JSON.stringify(pages)); } catch {}
}

export async function getSchoolSettings(): Promise<SchoolSettings> {
  if (isSupabaseConnected && supabase) {
    const { data, error } = await supabase
      .from('school_settings')
      .select('*')
      .limit(1)
      .maybeSingle();
    if (!error && data) {
      return data as SchoolSettings;
    }
  }
  return getLocalSettings();
}

export async function saveSchoolSettings(settings: SchoolSettings): Promise<boolean> {
  if (isSupabaseConnected && supabase) {
    const { id, ...upsertData } = settings;
    const { error } = await supabase
      .from('school_settings')
      .upsert({ ...upsertData, id: id || SETTINGS_SINGLETON_ID })
      .eq('id', id || SETTINGS_SINGLETON_ID);
    if (!error) return true;
  }
  saveLocalSettings(settings);
  return true;
}

export async function getAppPage(pageId: string): Promise<AppPage | null> {
  if (isSupabaseConnected && supabase) {
    const { data, error } = await supabase
      .from('app_pages')
      .select('*')
      .eq('id', pageId)
      .maybeSingle();
    if (!error && data) {
      return data as AppPage;
    }
  }
  const pages = getLocalPages();
  return pages[pageId] || null;
}

export async function saveAppPage(pageId: string, data: Partial<AppPage>): Promise<boolean> {
  if (isSupabaseConnected && supabase) {
    const { error } = await supabase
      .from('app_pages')
      .upsert({ id: pageId, page_name: pageId, ...data, updated_at: new Date().toISOString() })
      .eq('id', pageId);
    if (!error) return true;
  }
  const pages = getLocalPages();
  pages[pageId] = { ...(pages[pageId] || DEFAULT_PAGES[pageId]), ...data, updated_at: new Date().toISOString() };
  saveLocalPages(pages);
  return true;
}

function getLocalSchoolProfile(): SchoolProfile {
  try {
    const raw = localStorage.getItem(SCHOOL_PROFILE_KEY);
    return raw ? JSON.parse(raw) : { ...DEFAULT_SCHOOL_PROFILE };
  } catch {
    return { ...DEFAULT_SCHOOL_PROFILE };
  }
}

function saveLocalSchoolProfile(profile: SchoolProfile) {
  try { localStorage.setItem(SCHOOL_PROFILE_KEY, JSON.stringify(profile)); } catch {}
}

export async function getSchoolProfile(): Promise<SchoolProfile> {
  if (isSupabaseConnected && supabase) {
    const { data, error } = await supabase
      .from('school_profile')
      .select('*')
      .limit(1)
      .maybeSingle();
    if (!error && data) {
      return data as SchoolProfile;
    }
  }
  return getLocalSchoolProfile();
}

export async function saveSchoolProfile(profile: SchoolProfile): Promise<boolean> {
  if (isSupabaseConnected && supabase) {
    const { id, ...upsertData } = profile;
    const { error } = await supabase
      .from('school_profile')
      .upsert({ ...upsertData, id: id || SCHOOL_PROFILE_SINGLETON_ID })
      .eq('id', id || SCHOOL_PROFILE_SINGLETON_ID);
    if (!error) return true;
  }
  saveLocalSchoolProfile(profile);
  return true;
}

export function getDefaultSchoolProfile(): SchoolProfile {
  return { ...DEFAULT_SCHOOL_PROFILE };
}

export function getDefaultSettings(): SchoolSettings {
  return { ...DEFAULT_SETTINGS };
}

export function getDefaultPage(pageId: string): AppPage | null {
  return DEFAULT_PAGES[pageId] ? { ...DEFAULT_PAGES[pageId] } : null;
}
