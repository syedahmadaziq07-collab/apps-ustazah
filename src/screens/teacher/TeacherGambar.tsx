import React, { useState, useRef } from 'react';
import { Upload, Copy, Check, Image as ImageIcon, School, Home, FileText, Heart, BookOpen, BookHeart, Users } from 'lucide-react';
import { isStorageAvailable } from '../../services/storageService';
import { uploadFile, validateImageFile, formatFileSize } from '../../services/storageService';

interface UploadSection {
  id: string;
  label: string;
  icon: React.ReactNode;
  bucket: 'app-images' | 'student-photos';
  folder: string;
}

const sections: UploadSection[] = [
  { id: 'logo', label: 'Logo Sekolah', icon: <School className="w-5 h-5" />, bucket: 'app-images', folder: 'branding' },
  { id: 'home', label: 'Gambar Halaman Utama', icon: <Home className="w-5 h-5" />, bucket: 'app-images', folder: 'home' },
  { id: 'profile', label: 'Gambar Profil App', icon: <FileText className="w-5 h-5" />, bucket: 'app-images', folder: 'profile' },
  { id: 'emosi', label: 'Gambar Emosi', icon: <Heart className="w-5 h-5" />, bucket: 'app-images', folder: 'emotions' },
  { id: 'terapi', label: 'Gambar Terapi', icon: <BookOpen className="w-5 h-5" />, bucket: 'app-images', folder: 'therapies' },
  { id: 'doa', label: 'Gambar Doa', icon: <BookHeart className="w-5 h-5" />, bucket: 'app-images', folder: 'duas' },
  { id: 'murid', label: 'Gambar Murid', icon: <Users className="w-5 h-5" />, bucket: 'student-photos', folder: 'students' },
];

export const TeacherGambar: React.FC = () => {
  const [urls, setUrls] = useState<Record<string, string>>({});
  const [uploading, setUploading] = useState<Record<string, boolean>>({});
  const [messages, setMessages] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState<Record<string, boolean>>({});
  const storageAvail = isStorageAvailable();

  const handleUpload = async (section: UploadSection, file: File) => {
    if (!storageAvail) return;
    const err = validateImageFile(file);
    if (err) {
      setMessages(prev => ({ ...prev, [section.id]: err }));
      return;
    }
    setUploading(prev => ({ ...prev, [section.id]: true }));
    setMessages(prev => ({ ...prev, [section.id]: 'Memuat naik...' }));
    const { publicUrl, error } = await uploadFile(section.bucket, section.folder, file);
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
        <h1 className="text-xl md:text-2xl font-black text-slate-800">Urus Gambar</h1>
        <p className="text-xs font-bold text-slate-500 mt-1">Muat naik dan urus gambar yang digunakan dalam aplikasi.</p>
      </div>

      {!storageAvail && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3 mb-4">
          <p className="text-[10px] font-bold text-amber-800">
            Supabase Storage belum disambungkan. Sila masukkan URL secara manual buat masa ini.
          </p>
        </div>
      )}

      <p className="text-[10px] font-bold text-purple-600 bg-purple-50 border border-purple-200 rounded-xl px-4 py-2.5 mb-5">
        Selepas upload, URL boleh digunakan dalam editor Home, Profil, Murid, Emosi, Terapi atau Doa.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sections.map(section => (
          <div key={section.id} className="bg-white rounded-2xl border-2 border-purple-100 p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600">
                {section.icon}
              </div>
              <h3 className="text-sm font-black text-slate-800">{section.label}</h3>
            </div>

            {/* Upload area */}
            <label
              className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl border-2 border-dashed text-xs font-black transition-all cursor-pointer ${
                storageAvail && !uploading[section.id]
                  ? 'border-purple-300 bg-purple-50/50 text-purple-600 hover:bg-purple-100 active:scale-[0.99]'
                  : 'border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Upload className="w-4 h-4" />
              {uploading[section.id] ? 'Memuat naik...' : storageAvail ? 'Pilih Fail Gambar' : 'Storage Tidak Disambungkan'}
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.webp"
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
                <img
                  src={urls[section.id]}
                  alt={section.label}
                  className="w-full h-28 object-cover rounded-xl border-2 border-purple-200"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={urls[section.id]}
                    readOnly
                    className="flex-1 px-3 py-1.5 rounded-lg border border-purple-200 bg-purple-50 text-[9px] font-bold text-slate-600"
                  />
                  <button
                    onClick={() => handleCopy(section.id, urls[section.id])}
                    className="p-2 rounded-lg border border-purple-200 text-purple-500 hover:bg-purple-50 cursor-pointer shrink-0"
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
