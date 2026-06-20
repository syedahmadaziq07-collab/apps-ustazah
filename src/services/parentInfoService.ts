import { supabase, isSupabaseConnected } from '../lib/supabase';
import { ParentInfo } from '../types';

const STORAGE_PREFIX = 'parentInfo_';

export async function getParentInfo(studentId: string): Promise<ParentInfo | null> {
  if (isSupabaseConnected && supabase) {
    const { data, error } = await supabase
      .from('parent_info')
      .select('*')
      .eq('student_id', studentId)
      .maybeSingle();
    if (!error && data) return data as ParentInfo;
  }
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + studentId);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export async function saveParentInfo(studentId: string, info: {
  parent_name: string;
  relationship: string;
  phone_number: string;
  address: string;
  notes: string;
}): Promise<boolean> {
  if (isSupabaseConnected && supabase) {
    const existing = await getParentInfo(studentId);
    if (existing?.id) {
      const { error } = await supabase
        .from('parent_info')
        .update({ ...info, updated_at: new Date().toISOString() })
        .eq('id', existing.id);
      if (!error) return true;
    } else {
      const { error } = await supabase
        .from('parent_info')
        .insert({ student_id: studentId, ...info, updated_at: new Date().toISOString() });
      if (!error) return true;
    }
  }
  try {
    const record: ParentInfo = {
      student_id: studentId,
      parent_name: info.parent_name,
      relationship: info.relationship,
      phone_number: info.phone_number,
      address: info.address,
      notes: info.notes,
      updated_at: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_PREFIX + studentId, JSON.stringify(record));
  } catch {
    return false;
  }
  return true;
}
