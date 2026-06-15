import { supabase, isSupabaseConnected } from '../lib/supabase';
import { DuaContent } from '../types';

const DUAS_KEY = 'zikirCareDuas';

const DEFAULT_DUAS: DuaContent[] = [
  { id: 'dua-1', title: 'Doa Sebelum Tidur', arabic_text: 'بِاسْمِكَ اللَّهُمَّ أَحْيَا وَأَمُوتُ', rumi_text: 'Bismikallahumma ahya wa amut', meaning_text: 'Dengan nama-Mu Ya Allah, aku hidup dan aku mati.', image_url: '', audio_url: '/audio/arabic/doa-tidur.mp3', sort_order: 0, is_active: true, emoji_decorative: '🛌', explanation: 'Baca doa ini sebelum tidur.' },
  { id: 'dua-2', title: 'Doa Bangun Tidur', arabic_text: 'الْحَمْدُ لِلّٰهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ', rumi_text: 'Alhamdulillahillazi ahyana ba\'da ma amatana wa ilaihin nusyur', meaning_text: 'Segala puji bagi Allah yang menghidupkan kami setelah mematikan kami dan kepada-Nya tempat kembali.', image_url: '', audio_url: '/audio/arabic/alhamdulillah.mp3', sort_order: 1, is_active: true, emoji_decorative: '🌅', explanation: 'Baca doa ini selepas bangun tidur.' },
  { id: 'dua-3', title: 'Doa Masuk Tandas', arabic_text: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ', rumi_text: 'Allahumma inni a\'udzubika minal khubutsi wal khabaits', meaning_text: 'Ya Allah, aku berlindung dengan-Mu dari gangguan syaitan jantan dan syaitan betina.', image_url: '', audio_url: '/audio/arabic/doa-perlindungan.mp3', sort_order: 2, is_active: true, emoji_decorative: '🚽', explanation: 'Baca doa ini sebelum masuk ke tandas.' },
  { id: 'dua-4', title: 'Doa Keluar Tandas', arabic_text: 'غُفْرَانَكَ', rumi_text: 'Ghufranaka', meaning_text: 'Aku memohon ampunan-Mu.', image_url: '', audio_url: '', sort_order: 3, is_active: true, emoji_decorative: '🧼', explanation: 'Baca doa ini selepas keluar tandas.' },
  { id: 'dua-5', title: 'Doa Makan', arabic_text: 'اللَّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا وَقِنَا عَذَابَ النَّارِ', rumi_text: 'Allahumma barik lana fi ma razaqtana wa qina azaban nar', meaning_text: 'Ya Allah, berkatilah rezeki yang Engkau berikan kepada kami dan peliharalah kami dari azab neraka.', image_url: '', audio_url: '/audio/arabic/doa-kekuatan.mp3', sort_order: 4, is_active: true, emoji_decorative: '🍽️', explanation: 'Baca doa ini sebelum makan.' },
  { id: 'dua-6', title: 'Doa Selepas Makan', arabic_text: 'الْحَمْدُ لِلّٰهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ', rumi_text: 'Alhamdulillahilazi at\'amana wa saqana wa ja\'alana muslimin', meaning_text: 'Segala puji bagi Allah yang memberi kami makan dan minum dan menjadikan kami orang Islam.', image_url: '', audio_url: '/audio/arabic/alhamdulillah.mp3', sort_order: 5, is_active: true, emoji_decorative: '🥤', explanation: 'Baca doa ini selepas makan.' },
  { id: 'dua-7', title: 'Doa Naik Kenderaan', arabic_text: 'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ', rumi_text: 'Subhanallazi sakhkhara lana haza wa ma kunna lahu muqrinin', meaning_text: 'Maha Suci Allah yang memudahkan kenderaan ini untuk kami, sedang kami tidak berdaya menguasainya.', image_url: '', audio_url: '/audio/arabic/hasbunallah.mp3', sort_order: 6, is_active: true, emoji_decorative: '🚗', explanation: 'Baca doa ini semasa naik kenderaan.' },
  { id: 'dua-8', title: 'Doa Masuk Rumah', arabic_text: 'بِسْمِ اللهِ وَلَجْنَا وَبِسْمِ اللهِ خَرَجْنَا وَعَلَى اللهِ رَبِّنَا تَوَكَّلْنَا', rumi_text: 'Bismillahi walajna wa bismillahi kharajna wa \'alallahi rabbina tawakkalna', meaning_text: 'Dengan nama Allah kami masuk, dengan nama Allah kami keluar, dan kepada Allah Tuhan kami bertawakal.', image_url: '', audio_url: '/audio/arabic/doa-tenang.mp3', sort_order: 7, is_active: true, emoji_decorative: '🏠', explanation: 'Baca doa ini sebelum masuk rumah.' },
  { id: 'dua-9', title: 'Doa Keluar Rumah', arabic_text: 'بِسْمِ اللهِ تَوَكَّلْتُ عَلَى اللهِ لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللهِ', rumi_text: 'Bismillahi tawakkaltu \'alallahi la haula wa la quwwata illa billah', meaning_text: 'Dengan nama Allah, aku bertawakal kepada Allah. Tiada daya dan kekuatan melainkan dengan Allah.', image_url: '', audio_url: '/audio/arabic/hasbunallah.mp3', sort_order: 8, is_active: true, emoji_decorative: '🚪', explanation: 'Baca doa ini sebelum keluar rumah.' },
  { id: 'dua-10', title: 'Doa Untuk Ibu Bapa', arabic_text: 'رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا', rumi_text: 'Rabbirhamhuma kama rabbayani saghira', meaning_text: 'Ya Allah, sayangilah kedua ibu bapaku sebagaimana mereka menyayangiku semasa kecil.', image_url: '', audio_url: '/audio/arabic/doa-tenang.mp3', sort_order: 9, is_active: true, emoji_decorative: '👨‍👩‍👧‍👦', explanation: 'Baca doa ini untuk kedua ibu bapa.' },
  { id: 'dua-11', title: 'Doa Masuk Masjid', arabic_text: 'اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ', rumi_text: 'Allahummaftah li abwaba rahmatik', meaning_text: 'Ya Allah, bukakanlah untukku pintu-pintu rahmat-Mu.', image_url: '', audio_url: '', sort_order: 10, is_active: true, emoji_decorative: '🕌', explanation: 'Baca doa ini semasa masuk masjid.' },
  { id: 'dua-12', title: 'Doa Keluar Masjid', arabic_text: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ', rumi_text: 'Allahumma inni asaluka min fadlik', meaning_text: 'Ya Allah, aku memohon kurnia-Mu.', image_url: '', audio_url: '', sort_order: 11, is_active: true, emoji_decorative: '🕌', explanation: 'Baca doa ini semasa keluar masjid.' },
  { id: 'dua-13', title: 'Doa Belajar', arabic_text: 'رَبِّ زِدْنِي عِلْمًا وَارْزُقْنِي فَهْمًا', rumi_text: 'Rabbi zidni \'ilman warzuqni fahma', meaning_text: 'Ya Tuhanku, tambahkanlah ilmu dan berikanlah aku kefahaman.', image_url: '', audio_url: '/audio/arabic/doa-kekuatan.mp3', sort_order: 12, is_active: true, emoji_decorative: '📚', explanation: 'Baca doa ini sebelum belajar.' },
  { id: 'dua-14', title: 'Doa Bersyukur', arabic_text: 'رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ', rumi_text: 'Rabbi awzi\'ni an asykura ni\'matakallati an\'amta \'alayya', meaning_text: 'Ya Tuhanku, ilhamkanlah aku untuk mensyukuri nikmat-Mu yang telah Engkau berikan kepadaku.', image_url: '', audio_url: '/audio/arabic/alhamdulillah.mp3', sort_order: 13, is_active: true, emoji_decorative: '🙏', explanation: 'Baca doa ini sebagai tanda syukur.' },
  { id: 'dua-15', title: 'Doa Mohon Kekuatan', arabic_text: 'رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا وَثَبِّتْ أَقْدَامَنَا', rumi_text: 'Rabbana afrigh \'alayna sabran wa tsabbit aqdamana', meaning_text: 'Ya Tuhan kami, limpahkanlah kesabaran kepada kami dan teguhkanlah pendirian kami.', image_url: '', audio_url: '/audio/arabic/doa-kekuatan.mp3', sort_order: 14, is_active: true, emoji_decorative: '💪', explanation: 'Baca doa ini minta kekuatan hati.' },
];

function getLocal(): DuaContent[] {
  try { const r = localStorage.getItem(DUAS_KEY); return r ? JSON.parse(r) : JSON.parse(JSON.stringify(DEFAULT_DUAS)); }
  catch { return JSON.parse(JSON.stringify(DEFAULT_DUAS)); }
}
function saveLocal(d: DuaContent[]) { try { localStorage.setItem(DUAS_KEY, JSON.stringify(d)); } catch {} }

export async function getDuas(): Promise<DuaContent[]> {
  if (isSupabaseConnected && supabase) {
    const { data, error } = await supabase.from('duas').select('*').order('sort_order');
    if (!error && data) return data as DuaContent[];
  }
  return getLocal();
}
export async function getDuaById(id: string): Promise<DuaContent | null> {
  const list = await getDuas();
  return list.find(d => d.id === id) || null;
}
export async function saveDua(data: DuaContent): Promise<boolean> {
  if (isSupabaseConnected && supabase) {
    const { error } = await supabase.from('duas').upsert({ ...data, updated_at: new Date().toISOString() }).eq('id', data.id);
    if (!error) return true;
  }
  const list = getLocal();
  const idx = list.findIndex(d => d.id === data.id);
  if (idx >= 0) list[idx] = data; else list.push(data);
  saveLocal(list);
  return true;
}
export async function deactivateDua(id: string): Promise<boolean> {
  if (isSupabaseConnected && supabase) {
    const { error } = await supabase.from('duas').update({ is_active: false, updated_at: new Date().toISOString() }).eq('id', id);
    if (!error) return true;
  }
  const list = getLocal();
  const d = list.find(x => x.id === id);
  if (d) { d.is_active = false; saveLocal(list); return true; }
  return false;
}
export async function resetDuasToDefault(): Promise<boolean> {
  if (isSupabaseConnected && supabase) {
    for (const d of DEFAULT_DUAS) { await supabase.from('duas').upsert({ ...d, updated_at: new Date().toISOString() }).eq('id', d.id); }
  }
  saveLocal(DEFAULT_DUAS);
  return true;
}
export function getDefaultDuas(): DuaContent[] { return JSON.parse(JSON.stringify(DEFAULT_DUAS)); }
