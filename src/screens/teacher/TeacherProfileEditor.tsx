import React, { useState, useEffect } from 'react';
import { Save, RotateCcw, User, Info } from 'lucide-react';
import { SupabaseBanner } from '../../components/SupabaseBanner';
import { SchoolProfile } from '../../types';
import { getSchoolProfile, saveSchoolProfile, getDefaultSchoolProfile } from '../../services/appContentService';
import { FileUploadField } from '../../components/dashboard/FileUploadField';

export const TeacherProfileEditor: React.FC = () => {
  const [schoolProfile, setSchoolProfile] = useState<SchoolProfile>(getDefaultSchoolProfile());
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    getSchoolProfile().then((p) => {
      setSchoolProfile(p);
      setLoading(false);
    });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    const ok = await saveSchoolProfile(schoolProfile);
    setSaving(false);
    if (ok) {
      setMessage('Berjaya disimpan.');
    } else {
      setMessage('Gagal menyimpan. Cuba lagi.');
    }
  };

  const handleReset = () => {
    setSchoolProfile(getDefaultSchoolProfile());
  };

  const field = (label: string, key: keyof SchoolProfile, placeholder?: string) => (
    <div>
      <label className="text-xs font-black text-slate-700 block mb-1">{label}</label>
      <input type="text" value={schoolProfile[key] as string}
        onChange={(e) => setSchoolProfile({ ...schoolProfile, [key]: e.target.value })}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 bg-purple-50/50 text-sm font-bold text-slate-800 focus:outline-none focus:border-purple-400 focus:bg-white transition-colors" />
    </div>
  );

  if (loading) {
    return (
      <div className="flex-grow p-4 md:p-6 overflow-y-auto pb-20 md:pb-6">
        <p className="text-sm font-bold text-slate-400">Sedang memuatkan...</p>
      </div>
    );
  }

  return (
    <div className="flex-grow p-4 md:p-6 overflow-y-auto pb-20 md:pb-6">
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-black text-slate-800">Urus Profil App</h1>
        <p className="text-xs font-bold text-slate-500 mt-1">
          Edit maklumat yang dipaparkan di halaman Profil murid.
        </p>
      </div>

      <SupabaseBanner />

      {/* Profil Kaunselor — feeds "Bantuan & Sokongan" */}
      <div className="mb-8 bg-white rounded-2xl border-2 border-purple-100 p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <User className="w-5 h-5 text-purple-600" />
          <h2 className="text-sm font-black text-purple-800">Profil Kaunselor (Bantuan & Sokongan)</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {field('Nama Kaunselor', 'teacher_name', 'Cikgu Fatimah Binti Ismail')}
          {field('Nombor Lembaga Kaunselor', 'lembaga_number', 'KB-08249-M')}
          {field('Nama Sekolah', 'school_name', 'SK Seri Idaman, Shah Alam, Selangor')}
          <div>
            <FileUploadField
              label="URL Gambar Kaunselor"
              value={schoolProfile.teacher_photo_url}
              onChange={(url) => setSchoolProfile({ ...schoolProfile, teacher_photo_url: url })}
              bucket="app-images"
              folder="counsellor"
              type="image"
              helperText="Muat naik gambar kaunselor atau taip URL manual."
            />
          </div>
        </div>
      </div>

      {/* Tentang Aplikasi — feeds "Tentang Aplikasi" menu item */}
      <div className="mb-8 bg-white rounded-2xl border-2 border-purple-100 p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Info className="w-5 h-5 text-purple-600" />
          <h2 className="text-sm font-black text-purple-800">Tentang Aplikasi</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {field('Nama Aplikasi', 'app_name', 'i-Qalb Care')}
          {field('Versi Aplikasi', 'version', 'v1.0.0')}
        </div>
        <div className="mt-4">
          <label className="text-xs font-black text-slate-700 block mb-1">Penerangan Ringkas</label>
          <textarea rows={3} value={schoolProfile.description}
            onChange={(e) => setSchoolProfile({ ...schoolProfile, description: e.target.value })}
            placeholder="Aplikasi Kerohanian & Emosi Kanak-Kanak"
            className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 bg-purple-50/50 text-sm font-bold text-slate-800 focus:outline-none focus:border-purple-400 focus:bg-white transition-colors resize-none" />
        </div>
      </div>

      {message && (
        <p className={`mb-4 text-xs font-black px-4 py-2 rounded-xl ${message.includes('Berjaya') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-rose-50 text-rose-700 border border-rose-200'}`}>
          {message}
        </p>
      )}

      <div className="flex items-center gap-3">
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white text-xs font-black rounded-2xl hover:bg-purple-700 active:scale-95 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-sm">
          <Save className="w-4 h-4" />
          {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
        </button>
        <button onClick={handleReset}
          className="flex items-center gap-2 px-4 py-3 border-2 border-slate-200 text-xs font-black text-slate-600 rounded-2xl hover:bg-slate-50 active:scale-95 transition-all cursor-pointer">
          <RotateCcw className="w-3.5 h-3.5" />
          Reset ke Default
        </button>
      </div>
    </div>
  );
};
