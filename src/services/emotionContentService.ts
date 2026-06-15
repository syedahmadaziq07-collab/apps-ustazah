import { supabase, isSupabaseConnected } from '../lib/supabase';
import { EmotionContent, TherapyContent } from '../types';

const EMOTIONS_KEY = 'zikirCareEmotions';
const THERAPIES_KEY = 'zikirCareTherapies';

const DEFAULT_EMOTIONS: EmotionContent[] = [
  { id: 'gembira', label: 'Gembira', emoji: '😊', color: 'yellow', advice_text: 'Oh, kamu sedang rasa gembira hari ini. Alhamdulillah, itu perasaan yang baik. Jom kita ucap Alhamdulillah bersama-sama.', image_url: '', malay_audio_url: '/audio/malay/gembira-nasihat.mp3', arabic_audio_url: '/audio/arabic/alhamdulillah.mp3', sort_order: 0, is_active: true, zikir: 'الْحَمْدُ لِلّٰهِ', zikir_rumi: 'Alhamdulillah', zikir_maksud: 'Segala puji bagi Allah.', aktiviti: 'Baca Alhamdulillah 5 kali' },
  { id: 'marah', label: 'Marah', emoji: '😡', color: 'red', advice_text: 'Oh, kamu sedang rasa marah. Tidak apa, kita cuba bertenang sama-sama. Jom baca istighfar perlahan-lahan.', image_url: '', malay_audio_url: '/audio/malay/marah-nasihat.mp3', arabic_audio_url: '/audio/arabic/istighfar.mp3', sort_order: 1, is_active: true, zikir: 'أَسْتَغْفِرُ اللهَ', zikir_rumi: 'Astaghfirullah', zikir_maksud: 'Aku memohon ampun kepada Allah.', aktiviti: 'Baca istighfar 10 kali' },
  { id: 'sedih', label: 'Sedih', emoji: '😢', color: 'blue', advice_text: 'Oh, kamu sedang rasa sedih. Tidak apa, semua orang pernah rasa sedih. Mari kita tenangkan hati dan ingat Allah sentiasa bersama kita.', image_url: '', malay_audio_url: '/audio/malay/sedih-nasihat.mp3', arabic_audio_url: '/audio/arabic/doa-tenang.mp3', sort_order: 2, is_active: true, zikir: 'حَسْبِيَ اللهُ', zikir_rumi: 'Hasbiyallah', zikir_maksud: 'Cukuplah Allah bagiku.', aktiviti: 'Baca doa kesedihan 10 kali' },
  { id: 'takut', label: 'Takut', emoji: '😨', color: 'purple', advice_text: 'Oh, kamu sedang rasa takut. Jangan risau, kita boleh minta perlindungan daripada Allah.', image_url: '', malay_audio_url: '/audio/malay/takut-nasihat.mp3', arabic_audio_url: '/audio/arabic/doa-perlindungan.mp3', sort_order: 3, is_active: true, zikir: 'أَعُوذُ بِاللهِ', zikir_rumi: 'A\'udzubillah', zikir_maksud: 'Aku berlindung dengan Allah.', aktiviti: 'Baca doa perlindungan 10 kali' },
  { id: 'risau', label: 'Risau', emoji: '😟', color: 'orange', advice_text: 'Oh, kamu sedang rasa risau. Mari kita tarik nafas perlahan-lahan dan ingat bahawa Allah sentiasa menjaga kita.', image_url: '', malay_audio_url: '/audio/malay/risau-nasihat.mp3', arabic_audio_url: '/audio/arabic/hasbunallah.mp3', sort_order: 4, is_active: true, zikir: 'تَوَكَّلْتُ عَلَى اللهِ', zikir_rumi: 'Tawakkaltu \'alallah', zikir_maksud: 'Aku bertawakal kepada Allah.', aktiviti: 'Baca doa tawakal 10 kali' },
  { id: 'penat', label: 'Penat', emoji: '😴', color: 'teal', advice_text: 'Oh, kamu sedang rasa penat. Tidak apa, badan kita juga perlukan rehat. Mari kita bertenang sebentar.', image_url: '', malay_audio_url: '/audio/malay/penat-nasihat.mp3', arabic_audio_url: '/audio/arabic/doa-kekuatan.mp3', sort_order: 5, is_active: true, zikir: 'صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ', zikir_rumi: 'Sallallahu \'alaihi wasallam', zikir_maksud: 'Semoga Allah merahmatinya (merahmati Nabi).', aktiviti: 'Baca selawat 10 kali' },
  { id: 'tenang', label: 'Tenang', emoji: '😌', color: 'green', advice_text: 'Alhamdulillah, kamu sedang rasa tenang. Mari kita terus bersyukur dan kekalkan perasaan baik ini.', image_url: '', malay_audio_url: '/audio/malay/tenang-nasihat.mp3', arabic_audio_url: '/audio/arabic/alhamdulillah.mp3', sort_order: 6, is_active: true, zikir: 'سُبْحَانَ اللهِ', zikir_rumi: 'Subhanallah', zikir_maksud: 'Maha Suci Allah.', aktiviti: 'Baca tasbih 10 kali' },
];

const DEFAULT_THERAPIES: TherapyContent[] = [
  { id: 'th-gembira-1', emotion_id: 'gembira', title: 'Ucap Alhamdulillah', instruction: 'Ucap Alhamdulillah dengan penuh rasa syukur.', therapy_type: 'zikir', count_target: 5, arabic_text: 'الْحَمْدُ لِلّٰهِ', rumi_text: 'Alhamdulillah', meaning_text: 'Segala puji bagi Allah.', image_url: '', malay_audio_url: '/audio/malay/gembira-nasihat.mp3', arabic_audio_url: '/audio/arabic/alhamdulillah.mp3', sort_order: 0, is_active: true },
  { id: 'th-gembira-2', emotion_id: 'gembira', title: 'Senyum dan Ucap Terima Kasih', instruction: 'Senyum dan ucap terima kasih kepada orang di sekeliling.', therapy_type: 'kata_semangat', count_target: 3, arabic_text: '', rumi_text: '', meaning_text: '', image_url: '', malay_audio_url: '', arabic_audio_url: '', sort_order: 1, is_active: true },
  { id: 'th-gembira-3', emotion_id: 'gembira', title: 'Kongsi Kata Baik', instruction: 'Kongsi satu perkara baik yang berlaku hari ini.', therapy_type: 'kata_semangat', count_target: 1, arabic_text: '', rumi_text: '', meaning_text: '', image_url: '', malay_audio_url: '', arabic_audio_url: '', sort_order: 2, is_active: true },
  { id: 'th-marah-1', emotion_id: 'marah', title: 'Baca Istighfar', instruction: 'Baca istighfar perlahan-lahan.', therapy_type: 'zikir', count_target: 10, arabic_text: 'أَسْتَغْفِرُ اللهَ', rumi_text: 'Astaghfirullah', meaning_text: 'Aku memohon ampun kepada Allah.', image_url: '', malay_audio_url: '/audio/malay/marah-nasihat.mp3', arabic_audio_url: '/audio/arabic/istighfar.mp3', sort_order: 0, is_active: true },
  { id: 'th-marah-2', emotion_id: 'marah', title: 'Tarik Nafas', instruction: 'Tarik nafas perlahan-lahan 3 kali.', therapy_type: 'breathing', count_target: 3, arabic_text: '', rumi_text: '', meaning_text: '', image_url: '', malay_audio_url: '', arabic_audio_url: '', sort_order: 1, is_active: true },
  { id: 'th-marah-3', emotion_id: 'marah', title: 'Duduk dan Tenangkan Badan', instruction: 'Duduk dan tenangkan badan.', therapy_type: 'rehat', count_target: 1, arabic_text: '', rumi_text: '', meaning_text: '', image_url: '', malay_audio_url: '', arabic_audio_url: '', sort_order: 2, is_active: true },
  { id: 'th-sedih-1', emotion_id: 'sedih', title: 'Baca Doa Tenang', instruction: 'Baca doa minta ketenangan.', therapy_type: 'doa', count_target: 10, arabic_text: 'حَسْبِيَ اللهُ', rumi_text: 'Hasbiyallah', meaning_text: 'Cukuplah Allah bagiku.', image_url: '', malay_audio_url: '/audio/malay/sedih-nasihat.mp3', arabic_audio_url: '/audio/arabic/doa-tenang.mp3', sort_order: 0, is_active: true },
  { id: 'th-sedih-2', emotion_id: 'sedih', title: 'Tarik Nafas Perlahan', instruction: 'Tarik nafas perlahan-lahan.', therapy_type: 'breathing', count_target: 3, arabic_text: '', rumi_text: '', meaning_text: '', image_url: '', malay_audio_url: '', arabic_audio_url: '', sort_order: 1, is_active: true },
  { id: 'th-sedih-3', emotion_id: 'sedih', title: 'Dengar Kata Semangat', instruction: 'Dengar kata semangat.', therapy_type: 'kata_semangat', count_target: 1, arabic_text: '', rumi_text: '', meaning_text: '', image_url: '', malay_audio_url: '', arabic_audio_url: '', sort_order: 2, is_active: true },
  { id: 'th-takut-1', emotion_id: 'takut', title: 'Baca Doa Perlindungan', instruction: 'Baca doa minta perlindungan Allah.', therapy_type: 'doa', count_target: 10, arabic_text: 'أَعُوذُ بِاللهِ', rumi_text: 'A\'udzubillah', meaning_text: 'Aku berlindung dengan Allah.', image_url: '', malay_audio_url: '/audio/malay/takut-nasihat.mp3', arabic_audio_url: '/audio/arabic/doa-perlindungan.mp3', sort_order: 0, is_active: true },
  { id: 'th-takut-2', emotion_id: 'takut', title: 'Tarik Nafas', instruction: 'Tarik nafas 3 kali.', therapy_type: 'breathing', count_target: 3, arabic_text: '', rumi_text: '', meaning_text: '', image_url: '', malay_audio_url: '', arabic_audio_url: '', sort_order: 1, is_active: true },
  { id: 'th-takut-3', emotion_id: 'takut', title: 'Sebut Allah Sentiasa Menjaga Saya', instruction: 'Sebut perlahan-lahan: Allah sentiasa menjaga saya.', therapy_type: 'kata_semangat', count_target: 3, arabic_text: '', rumi_text: '', meaning_text: '', image_url: '', malay_audio_url: '', arabic_audio_url: '', sort_order: 2, is_active: true },
  { id: 'th-risau-1', emotion_id: 'risau', title: 'Baca Hasbunallah', instruction: 'Baca Hasbunallah dengan penuh yakin.', therapy_type: 'zikir', count_target: 10, arabic_text: 'حَسْبُنَا اللهُ وَنِعْمَ الْوَكِيلُ', rumi_text: 'Hasbunallah wa ni\'mal wakil', meaning_text: 'Cukuplah Allah bagiku dan sebaik-baik tempat berserah.', image_url: '', malay_audio_url: '/audio/malay/risau-nasihat.mp3', arabic_audio_url: '/audio/arabic/hasbunallah.mp3', sort_order: 0, is_active: true },
  { id: 'th-risau-2', emotion_id: 'risau', title: 'Latihan Nafas', instruction: 'Tarik nafas 3 kali.', therapy_type: 'breathing', count_target: 3, arabic_text: '', rumi_text: '', meaning_text: '', image_url: '', malay_audio_url: '', arabic_audio_url: '', sort_order: 1, is_active: true },
  { id: 'th-risau-3', emotion_id: 'risau', title: 'Fikir Satu Perkara Baik', instruction: 'Fikir satu perkara baik yang berlaku hari ini.', therapy_type: 'kata_semangat', count_target: 1, arabic_text: '', rumi_text: '', meaning_text: '', image_url: '', malay_audio_url: '', arabic_audio_url: '', sort_order: 2, is_active: true },
  { id: 'th-penat-1', emotion_id: 'penat', title: 'Rehat Sebentar', instruction: 'Rehatkan badan sebentar.', therapy_type: 'rehat', count_target: 1, arabic_text: '', rumi_text: '', meaning_text: '', image_url: '', malay_audio_url: '/audio/malay/penat-nasihat.mp3', arabic_audio_url: '/audio/arabic/doa-kekuatan.mp3', sort_order: 0, is_active: true },
  { id: 'th-penat-2', emotion_id: 'penat', title: 'Tarik Nafas', instruction: 'Tarik nafas 3 kali.', therapy_type: 'breathing', count_target: 3, arabic_text: '', rumi_text: '', meaning_text: '', image_url: '', malay_audio_url: '', arabic_audio_url: '', sort_order: 1, is_active: true },
  { id: 'th-penat-3', emotion_id: 'penat', title: 'Baca Doa Kekuatan', instruction: 'Baca doa minta kekuatan.', therapy_type: 'doa', count_target: 3, arabic_text: 'صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ', rumi_text: 'Sallallahu \'alaihi wasallam', meaning_text: 'Semoga Allah merahmatinya.', image_url: '', malay_audio_url: '', arabic_audio_url: '/audio/arabic/doa-kekuatan.mp3', sort_order: 2, is_active: true },
  { id: 'th-tenang-1', emotion_id: 'tenang', title: 'Ucap Alhamdulillah', instruction: 'Ucap Alhamdulillah dengan syukur.', therapy_type: 'zikir', count_target: 5, arabic_text: 'الْحَمْدُ لِلّٰهِ', rumi_text: 'Alhamdulillah', meaning_text: 'Segala puji bagi Allah.', image_url: '', malay_audio_url: '/audio/malay/tenang-nasihat.mp3', arabic_audio_url: '/audio/arabic/alhamdulillah.mp3', sort_order: 0, is_active: true },
  { id: 'th-tenang-2', emotion_id: 'tenang', title: 'Zikir Ringkas', instruction: 'Baca zikir ringkas.', therapy_type: 'zikir', count_target: 10, arabic_text: 'سُبْحَانَ اللهِ', rumi_text: 'Subhanallah', meaning_text: 'Maha Suci Allah.', image_url: '', malay_audio_url: '', arabic_audio_url: '/audio/arabic/alhamdulillah.mp3', sort_order: 1, is_active: true },
  { id: 'th-tenang-3', emotion_id: 'tenang', title: 'Kekalkan Perasaan Baik', instruction: 'Kekalkan perasaan baik ini.', therapy_type: 'kata_semangat', count_target: 1, arabic_text: '', rumi_text: '', meaning_text: '', image_url: '', malay_audio_url: '', arabic_audio_url: '', sort_order: 2, is_active: true },
];

function getLocalEmotions(): EmotionContent[] {
  try { const r = localStorage.getItem(EMOTIONS_KEY); return r ? JSON.parse(r) : JSON.parse(JSON.stringify(DEFAULT_EMOTIONS)); }
  catch { return JSON.parse(JSON.stringify(DEFAULT_EMOTIONS)); }
}
function saveLocalEmotions(d: EmotionContent[]) { try { localStorage.setItem(EMOTIONS_KEY, JSON.stringify(d)); } catch {} }

function getLocalTherapies(): TherapyContent[] {
  try { const r = localStorage.getItem(THERAPIES_KEY); return r ? JSON.parse(r) : JSON.parse(JSON.stringify(DEFAULT_THERAPIES)); }
  catch { return JSON.parse(JSON.stringify(DEFAULT_THERAPIES)); }
}
function saveLocalTherapies(d: TherapyContent[]) { try { localStorage.setItem(THERAPIES_KEY, JSON.stringify(d)); } catch {} }

export async function getEmotions(): Promise<EmotionContent[]> {
  if (isSupabaseConnected && supabase) {
    const { data, error } = await supabase.from('emotions').select('*').order('sort_order');
    if (!error && data) return data as EmotionContent[];
  }
  return getLocalEmotions();
}
export async function getEmotionById(id: string): Promise<EmotionContent | null> {
  const list = await getEmotions();
  return list.find(e => e.id === id) || null;
}
export async function saveEmotion(data: EmotionContent): Promise<boolean> {
  if (isSupabaseConnected && supabase) {
    const { error } = await supabase.from('emotions').upsert({ ...data, updated_at: new Date().toISOString() }).eq('id', data.id);
    if (!error) return true;
  }
  const list = getLocalEmotions();
  const idx = list.findIndex(e => e.id === data.id);
  if (idx >= 0) list[idx] = data; else list.push(data);
  saveLocalEmotions(list);
  return true;
}
export async function deactivateEmotion(id: string): Promise<boolean> {
  if (isSupabaseConnected && supabase) {
    const { error } = await supabase.from('emotions').update({ is_active: false, updated_at: new Date().toISOString() }).eq('id', id);
    if (!error) return true;
  }
  const list = getLocalEmotions();
  const e = list.find(x => x.id === id);
  if (e) { e.is_active = false; saveLocalEmotions(list); return true; }
  return false;
}
export async function resetEmotionsToDefault(): Promise<boolean> {
  if (isSupabaseConnected && supabase) {
    for (const e of DEFAULT_EMOTIONS) { await supabase.from('emotions').upsert({ ...e, updated_at: new Date().toISOString() }).eq('id', e.id); }
  }
  saveLocalEmotions(DEFAULT_EMOTIONS);
  return true;
}

export async function getTherapiesByEmotion(emotionId: string): Promise<TherapyContent[]> {
  if (isSupabaseConnected && supabase) {
    const { data, error } = await supabase.from('therapies').select('*').eq('emotion_id', emotionId).order('sort_order');
    if (!error && data) return data as TherapyContent[];
  }
  return getLocalTherapies().filter(t => t.emotion_id === emotionId);
}
export async function getTherapyById(id: string): Promise<TherapyContent | null> {
  if (isSupabaseConnected && supabase) {
    const { data, error } = await supabase.from('therapies').select('*').eq('id', id).maybeSingle();
    if (!error && data) return data as TherapyContent;
  }
  return getLocalTherapies().find(t => t.id === id) || null;
}
export async function saveTherapy(data: TherapyContent): Promise<boolean> {
  if (isSupabaseConnected && supabase) {
    const { error } = await supabase.from('therapies').upsert({ ...data, updated_at: new Date().toISOString() }).eq('id', data.id);
    if (!error) return true;
  }
  const list = getLocalTherapies();
  const idx = list.findIndex(t => t.id === data.id);
  if (idx >= 0) list[idx] = data; else list.push(data);
  saveLocalTherapies(list);
  return true;
}
export async function deactivateTherapy(id: string): Promise<boolean> {
  if (isSupabaseConnected && supabase) {
    const { error } = await supabase.from('therapies').update({ is_active: false, updated_at: new Date().toISOString() }).eq('id', id);
    if (!error) return true;
  }
  const list = getLocalTherapies();
  const t = list.find(x => x.id === id);
  if (t) { t.is_active = false; saveLocalTherapies(list); return true; }
  return false;
}
export async function resetTherapiesToDefault(): Promise<boolean> {
  if (isSupabaseConnected && supabase) {
    for (const t of DEFAULT_THERAPIES) { await supabase.from('therapies').upsert({ ...t, updated_at: new Date().toISOString() }).eq('id', t.id); }
  }
  saveLocalTherapies(DEFAULT_THERAPIES);
  return true;
}

export function getDefaultEmotions(): EmotionContent[] { return JSON.parse(JSON.stringify(DEFAULT_EMOTIONS)); }
export function getDefaultTherapies(): TherapyContent[] { return JSON.parse(JSON.stringify(DEFAULT_THERAPIES)); }
