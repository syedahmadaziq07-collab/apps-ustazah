import { supabase, isSupabaseConnected } from '../lib/supabase';
import { EmotionHistoryItem, EmotionKey } from '../types';

const LOCAL_STORAGE_KEY = 'emosiHistory';

interface SupabaseEmotionLog {
  id: string;
  student_id: string;
  student_full_name: string;
  student_photo_url: string;
  emotion_id: string;
  emotion_label: string;
  therapy_title: string;
  status: string;
  completed_at: string;
  completed_date: string;
  completed_time: string;
  share_text: string;
}

function mapSupabaseRowToHistoryItem(row: SupabaseEmotionLog): EmotionHistoryItem {
  return {
    id: row.id,
    studentId: row.student_id,
    studentFullName: row.student_full_name,
    studentPhotoUrl: row.student_photo_url,
    emotion: row.emotion_id as EmotionKey,
    label: row.emotion_label,
    emoji: '',
    aktiviti: row.therapy_title,
    completedAt: row.completed_at,
    completedDate: row.completed_date,
    completedTime: row.completed_time,
    completed: true,
    shareText: row.share_text,
  };
}

function getLocalLogs(): EmotionHistoryItem[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export async function getEmotionLogs(studentId?: string): Promise<EmotionHistoryItem[]> {
  const localLogs = getLocalLogs();

  if (!isSupabaseConnected || !supabase) {
    return studentId ? localLogs.filter(l => l.studentId === studentId) : localLogs;
  }

  try {
    let query = supabase.from('emotion_logs').select('*').order('completed_at', { ascending: false });
    if (studentId) {
      query = query.eq('student_id', studentId);
    }
    const { data, error } = await query;
    if (!error && data) {
      const supabaseLogs = (data as SupabaseEmotionLog[]).map(mapSupabaseRowToHistoryItem);
      const supabaseIds = new Set(supabaseLogs.map(l => l.id));
      const localOnly = localLogs.filter(l => !supabaseIds.has(l.id));
      return [...supabaseLogs, ...localOnly];
    }
  } catch {}

  return studentId ? localLogs.filter(l => l.studentId === studentId) : localLogs;
}
