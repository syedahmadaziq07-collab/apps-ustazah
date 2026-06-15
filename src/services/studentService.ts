import { supabase, isSupabaseConnected } from '../lib/supabase';
import { StudentRecord, SelectedStudent, toSelectedStudent, toStudentRecord } from '../types';

const STORAGE_KEY = 'zikirCareStudents';

const FALLBACK_RECORDS: StudentRecord[] = [
  { id: 'demo-1', full_name: 'Ahmad Danial', class_name: 'Kelas 1 Bestari', photo_url: '', is_active: true, sort_order: 0, created_at: '', updated_at: '' },
  { id: 'demo-2', full_name: 'Nur Aisyah', class_name: 'Kelas 1 Bestari', photo_url: '', is_active: true, sort_order: 1, created_at: '', updated_at: '' },
  { id: 'demo-3', full_name: 'Muhammad Faiz', class_name: 'Kelas 2 Cemerlang', photo_url: '', is_active: true, sort_order: 2, created_at: '', updated_at: '' },
  { id: 'demo-4', full_name: 'Siti Aminah', class_name: 'Kelas 2 Cemerlang', photo_url: '', is_active: true, sort_order: 3, created_at: '', updated_at: '' },
  { id: 'demo-5', full_name: 'Ali Imran', class_name: 'Kelas 3 Pintar', photo_url: '', is_active: true, sort_order: 4, created_at: '', updated_at: '' },
  { id: 'demo-6', full_name: 'Fatimah Zahra', class_name: 'Kelas 3 Pintar', photo_url: '', is_active: true, sort_order: 5, created_at: '', updated_at: '' },
];

function getLocalRecords(): StudentRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [...FALLBACK_RECORDS];
  } catch {
    return [...FALLBACK_RECORDS];
  }
}

function saveLocalRecords(records: StudentRecord[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  } catch {}
}

export async function getStudents(): Promise<StudentRecord[]> {
  if (isSupabaseConnected && supabase) {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('full_name', { ascending: true });
    if (!error && data) {
      return data as StudentRecord[];
    }
    return getLocalRecords();
  }
  return getLocalRecords();
}

export async function getActiveStudents(): Promise<SelectedStudent[]> {
  const records = await getStudents();
  return records
    .filter((r) => r.is_active)
    .sort((a, b) => {
      if (a.sort_order !== b.sort_order) return a.sort_order - b.sort_order;
      return a.full_name.localeCompare(b.full_name);
    })
    .map(toSelectedStudent);
}

export async function createStudent(fields: { fullName: string; className: string; photoUrl: string; isActive: boolean; sortOrder: number }): Promise<StudentRecord> {
  const newRecord: StudentRecord = {
    id: 'local-' + Math.random().toString(36).substring(2, 11),
    full_name: fields.fullName,
    class_name: fields.className || null,
    photo_url: fields.photoUrl || null,
    is_active: fields.isActive,
    sort_order: fields.sortOrder,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  if (isSupabaseConnected && supabase) {
    const { data, error } = await supabase
      .from('students')
      .insert({
        full_name: fields.fullName,
        class_name: fields.className || null,
        photo_url: fields.photoUrl || null,
        is_active: fields.isActive,
        sort_order: fields.sortOrder,
      })
      .select()
      .single();
    if (!error && data) {
      return data as StudentRecord;
    }
  }

  const records = getLocalRecords();
  records.push(newRecord);
  saveLocalRecords(records);
  return newRecord;
}

export async function updateStudent(id: string, fields: { fullName: string; className: string; photoUrl: string; isActive: boolean; sortOrder: number }): Promise<StudentRecord | null> {
  if (isSupabaseConnected && supabase) {
    const { data, error } = await supabase
      .from('students')
      .update({
        full_name: fields.fullName,
        class_name: fields.className || null,
        photo_url: fields.photoUrl || null,
        is_active: fields.isActive,
        sort_order: fields.sortOrder,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();
    if (!error && data) {
      return data as StudentRecord;
    }
  }

  const records = getLocalRecords();
  const idx = records.findIndex((r) => r.id === id);
  if (idx === -1) return null;
  records[idx] = {
    ...records[idx],
    full_name: fields.fullName,
    class_name: fields.className || null,
    photo_url: fields.photoUrl || null,
    is_active: fields.isActive,
    sort_order: fields.sortOrder,
    updated_at: new Date().toISOString(),
  };
  saveLocalRecords(records);
  return records[idx];
}

export async function deactivateStudent(id: string): Promise<boolean> {
  if (isSupabaseConnected && supabase) {
    const { error } = await supabase
      .from('students')
      .update({ is_active: false, updated_at: new Date().toISOString() })
      .eq('id', id);
    if (!error) return true;
  }

  const records = getLocalRecords();
  const idx = records.findIndex((r) => r.id === id);
  if (idx === -1) return false;
  records[idx].is_active = false;
  records[idx].updated_at = new Date().toISOString();
  saveLocalRecords(records);
  return true;
}
