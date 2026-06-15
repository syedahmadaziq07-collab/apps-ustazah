import React, { useState, useRef } from 'react';
import { Upload, Copy, Check, Music, Headphones } from 'lucide-react';
import { isStorageAvailable } from '../../services/storageService';
import { uploadFile, validateAudioFile, formatFileSize } from '../../services/storageService';

interface AudioSection {
  id: string;
  label: string;
  icon: React.ReactNode;
  folder: string;
  suggestedName: string;
  description: string;
}

const sections: AudioSection[] = [
  { id: 'arabic-istighfar', label: 'Audio Arab - Istighfar', icon: <Music className="w-5 h-5" />, folder: 'arabic', suggestedName: 'istighfar.mp3', description: 'Zikir minta ampun — marah' },
  { id: 'arabic-alhamdulillah', label: 'Audio Arab - Alhamdulillah', icon: <Music className="w-5 h-5" />, folder: 'arabic', suggestedName: 'alhamdulillah.mp3', description: 'Zikir syukur — gembira/tenang' },
  { id: 'arabic-hasbunallah', label: 'Audio Arab - Hasbunallah', icon: <Music className="w-5 h-5" />, folder: 'arabic', suggestedName: 'hasbunallah.mp3', description: 'Zikir tawakal — risau' },
  { id: 'arabic-doa-perlindungan', label: 'Audio Arab - Doa Perlindungan', icon: <Music className="w-5 h-5" />, folder: 'arabic', suggestedName: 'doa-perlindungan.mp3', description: 'Doa minta perlindungan — takut' },
  { id: 'malay-marah', label: 'Audio Melayu - Marah', icon: <Headphones className="w-5 h-5" />, folder: 'malay', suggestedName: 'marah-nasihat.mp3', description: 'Nasihat untuk emosi marah' },
  { id: 'malay-gembira', label: 'Audio Melayu - Gembira', icon: <Headphones className="w-5 h-5" />, folder: 'malay', suggestedName: 'gembira-nasihat.mp3', description: 'Nasihat untuk emosi gembira' },
  { id: 'malay-sedih', label: 'Audio Melayu - Sedih', icon: <Headphones className="w-5 h-5" />, folder: 'malay', suggestedName: 'sedih-nasihat.mp3', description: 'Nasihat untuk emosi sedih' },
  { id: 'malay-takut', label: 'Audio Melayu - Takut', icon: <Headphones className="w-5 h-5" />, folder: 'malay', suggestedName: 'takut-nasihat.mp3', description: 'Nasihat untuk emosi takut' },
  { id: 'malay-risau', label: 'Audio Melayu - Risau', icon: <Headphones className="w-5 h-5" />, folder: 'malay', suggestedName: 'risau-nasihat.mp3', description: 'Nasihat untuk emosi risau' },
  { id: 'malay-penat', label: 'Audio Melayu - Penat', icon: <Headphones className="w-5 h-5" />, folder: 'malay', suggestedName: 'penat-nasihat.mp3', description: 'Nasihat untuk emosi penat' },
  { id: 'malay-tenang', label: 'Audio Melayu - Tenang', icon: <Headphones className="w-5 h-5" />, folder: 'malay', suggestedName: 'tenang-nasihat.mp3', description: 'Nasihat untuk emosi tenang' },
  { id: 'success', label: 'Audio Tahniah / Success', icon: <Headphones className="w-5 h-5" />, folder: 'success', suggestedName: 'tahniah.mp3', description: 'Ucapan tahniah selepas selesai zikir' },
];

export const TeacherAudio: React.FC = () => {
  const [urls, setUrls] = useState<Record<string, string>>({});
  const [uploading, setUploading] = useState<Record<string, boolean>>({});
  const [messages, setMessages] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState<Record<string, boolean>>({});
  const storageAvail = isStorageAvailable();

  const handleUpload = async (section: AudioSection, file: File) => {
    if (!storageAvail) return;
    const err = validateAudioFile(file);
    if (err) {
      setMessages(prev => ({ ...prev, [section.id]: err }));
      return;
    }
    setUploading(prev => ({ ...prev, [section.id]: true }));
    setMessages(prev => ({ ...prev, [section.id]: 'Memuat naik...' }));
    const { publicUrl, error } = await uploadFile('app-audio', section.folder, file);
    if (error) {
      setMessages(prev => ({ ...prev, [section.id]: error }));
    } else if (publicUrl) {
      setUrls(prev => ({ ...prev, [section.id]: publicUrl }));
      setMessages(prev => ({ ...prev, [section.id]: 'Muat naik berjaya' }));
      setTimeout(() => setMessages(prev => ({ ...prev, [section.id]: '' })), 3000);
    }
    setUploading(prev => ({ ...prev, [section.id]: false }));
  };

  const handleCopy = async (id: string, url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(prev => ({ ...prev, [id]: true }));
      setTimeout(() => setCopied(prev => ({ ...prev, [id]: false })), 2000);
    } catch { /* ignore */ }
  };

  return (
    <div className="flex-grow p-4 md:p-6 overflow-y-auto pb-20 md:pb-6">
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-black text-slate-800">Urus Audio</h1>
        <p className="text-xs font-bold text-slate-500 mt-1">Muat naik audio bacaan Arab, nasihat Melayu dan ucapan aplikasi.</p>
      </div>

      {!storageAvail && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3 mb-4">
          <p className="text-[10px] font-bold text-amber-800">
            Supabase Storage belum disambungkan. Sila masukkan URL secara manual buat masa ini.
          </p>
        </div>
      )}

      <div className="bg-purple-50 border border-purple-200 rounded-xl px-4 py-2.5 mb-5 space-y-1">
        <p className="text-[10px] font-bold text-purple-700">
          Untuk audio Arab, fail ini akan dimainkan ketika murid tekan &quot;Saya dah baca&quot;.
        </p>
        <p className="text-[10px] font-bold text-purple-700">
          Untuk audio Melayu, fail digunakan pada nasihat dan ucapan.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sections.map(section => (
          <div key={section.id} className="bg-white rounded-2xl border-2 border-purple-100 p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600">
                {section.icon}
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-800">{section.label}</h3>
                <p className="text-[9px] font-bold text-slate-400">Cadangan: {section.suggestedName} — {section.description}</p>
              </div>
            </div>

            {/* Upload area */}
            <label
              className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl border-2 border-dashed text-xs font-black transition-all cursor-pointer ${
                storageAvail && !uploading[section.id]
                  ? 'border-amber-300 bg-amber-50/50 text-amber-600 hover:bg-amber-100 active:scale-[0.99]'
                  : 'border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Upload className="w-4 h-4" />
              {uploading[section.id] ? 'Memuat naik...' : storageAvail ? 'Pilih Fail Audio' : 'Storage Tidak Disambungkan'}
              <input
                type="file"
                accept=".mp3,.wav,.m4a,.ogg"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleUpload(section, file);
                  e.target.value = '';
                }}
                disabled={!storageAvail || uploading[section.id]}
                className="hidden"
              />
            </label>

            {/* Message */}
            {messages[section.id] && (
              <p className={`mt-2 text-[10px] font-black px-3 py-1.5 rounded-lg ${
                messages[section.id].includes('berjaya') ? 'bg-green-50 text-green-700 border border-green-200' :
                'bg-rose-50 text-rose-700 border border-rose-200'
              }`}>
                {messages[section.id]}
              </p>
            )}

            {/* Preview + URL */}
            {urls[section.id] && (
              <div className="mt-3 space-y-2">
                <audio src={urls[section.id]} controls className="w-full h-8">
                  Audio tidak dapat dimainkan.
                </audio>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={urls[section.id]}
                    readOnly
                    className="flex-1 px-3 py-1.5 rounded-lg border border-amber-200 bg-amber-50 text-[9px] font-bold text-slate-600"
                  />
                  <button
                    onClick={() => handleCopy(section.id, urls[section.id])}
                    className="p-2 rounded-lg border border-amber-200 text-amber-500 hover:bg-amber-50 cursor-pointer shrink-0"
                  >
                    {copied[section.id] ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                {copied[section.id] && (
                  <p className="text-[9px] font-black text-green-600">URL telah disalin.</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
