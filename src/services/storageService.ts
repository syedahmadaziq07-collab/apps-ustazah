import { supabase, isSupabaseConnected } from '../lib/supabase';

const IMAGE_MAX_SIZE = 5 * 1024 * 1024; // 5MB
const AUDIO_MAX_SIZE = 15 * 1024 * 1024; // 15MB

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const ALLOWED_AUDIO_TYPES = ['audio/mpeg', 'audio/wav', 'audio/mp4', 'audio/ogg'];

export function isStorageAvailable(): boolean {
  return isSupabaseConnected && supabase !== null;
}

export function validateImageFile(file: File): string | null {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return 'Jenis fail tidak disokong. Sila guna JPG, PNG atau WebP.';
  }
  if (file.size > IMAGE_MAX_SIZE) {
    return `Fail terlalu besar. Saiz maksimum 5MB. (${formatFileSize(file.size)})`;
  }
  return null;
}

export function validateAudioFile(file: File): string | null {
  if (!ALLOWED_AUDIO_TYPES.includes(file.type)) {
    return 'Jenis fail tidak disokong. Sila guna MP3, WAV, M4A atau OGG.';
  }
  if (file.size > AUDIO_MAX_SIZE) {
    return `Fail terlalu besar. Saiz maksimum 15MB. (${formatFileSize(file.size)})`;
  }
  return null;
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

function safeFileName(originalName: string): string {
  const name = originalName.replace(/\.[^.]+$/, '');
  const ext = originalName.split('.').pop() || '';
  const safe = name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  const timestamp = Math.floor(Date.now() / 1000);
  return `${safe}-${timestamp}.${ext}`;
}

type BucketName = 'student-photos' | 'app-images' | 'app-audio';

export async function uploadFile(
  bucket: BucketName,
  folder: string,
  file: File
): Promise<{ publicUrl: string; error: string | null }> {
  if (!isStorageAvailable()) {
    return { publicUrl: '', error: 'Supabase Storage belum disambungkan. Sila masukkan URL secara manual buat masa ini.' };
  }

  const fileName = safeFileName(file.name);
  const filePath = folder ? `${folder}/${fileName}` : fileName;

  const { error: uploadError } = await supabase!.storage
    .from(bucket)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (uploadError) {
    return { publicUrl: '', error: `Gagal muat naik: ${uploadError.message}` };
  }

  const { data: publicData } = supabase!.storage
    .from(bucket)
    .getPublicUrl(filePath);

  return { publicUrl: publicData?.publicUrl || '', error: null };
}

export async function deleteFile(bucket: BucketName, path: string): Promise<{ error: string | null }> {
  if (!isStorageAvailable()) {
    return { error: 'Supabase Storage belum disambungkan.' };
  }

  const { error } = await supabase!.storage
    .from(bucket)
    .remove([path]);

  if (error) {
    return { error: `Gagal padam: ${error.message}` };
  }

  return { error: null };
}
