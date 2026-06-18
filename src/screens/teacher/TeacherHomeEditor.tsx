import React, { useState, useEffect, useCallback } from 'react';
import { Save, RotateCcw, Eye, School } from 'lucide-react';
import { SupabaseBanner } from '../../components/SupabaseBanner';
import { AppPage } from '../../types';
import { getAppPage, saveAppPage, getDefaultPage } from '../../services/appContentService';
import { FileUploadField } from '../../components/dashboard/FileUploadField';

interface HomeContent {
  title: string;
  subtitle: string;
  bodyText: string;
  imageUrl: string;
  audioUrl: string;
  selectedStudentLabel: string;
  changeStudentButtonText: string;
  welcomeText: string;
}

const emptyContent: HomeContent = {
  title: '',
  subtitle: '',
  bodyText: '',
  imageUrl: '',
  audioUrl: '',
  selectedStudentLabel: 'Hari ini:',
  changeStudentButtonText: 'Tukar',
  welcomeText: 'Selamat datang',
};

export const TeacherHomeEditor: React.FC = () => {
  const [form, setForm] = useState<HomeContent>(emptyContent);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [dirty, setDirty] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const page = await getAppPage('home');
    if (page) {
      setForm({
        title: page.title || '',
        subtitle: page.subtitle || '',
        bodyText: page.body_text || '',
        imageUrl: page.image_url || '',
        audioUrl: page.audio_url || '',
        selectedStudentLabel: page.content_json?.selectedStudentLabel || 'Hari ini:',
        changeStudentButtonText: page.content_json?.changeStudentButtonText || 'Tukar',
        welcomeText: page.content_json?.welcomeText || 'Selamat datang',
      });
    }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    const pageData: Partial<AppPage> = {
      title: form.title,
      subtitle: form.subtitle,
      body_text: form.bodyText,
      image_url: form.imageUrl,
      audio_url: form.audioUrl,
      content_json: {
        selectedStudentLabel: form.selectedStudentLabel,
        changeStudentButtonText: form.changeStudentButtonText,
        welcomeText: form.welcomeText,
      },
    };
    const ok = await saveAppPage('home', pageData);
    setSaving(false);
    if (ok) {
      setMessage('Berjaya disimpan.');
      setDirty(false);
    } else {
      setMessage('Gagal menyimpan. Cuba lagi.');
    }
  };

  const handleReset = async () => {
    const def = getDefaultPage('home');
    if (def) {
      setForm({
        title: def.title,
        subtitle: def.subtitle,
        bodyText: def.body_text,
        imageUrl: def.image_url,
        audioUrl: def.audio_url,
        selectedStudentLabel: def.content_json?.selectedStudentLabel || 'Hari ini:',
        changeStudentButtonText: def.content_json?.changeStudentButtonText || 'Tukar',
        welcomeText: def.content_json?.welcomeText || 'Selamat datang',
      });
      setDirty(true);
    }
  };

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
        <h1 className="text-xl md:text-2xl font-black text-slate-800">Urus Halaman Utama</h1>
        <p className="text-xs font-bold text-slate-500 mt-1">
          Edit kandungan yang dipaparkan pada halaman utama murid.
        </p>
      </div>

      <SupabaseBanner />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Editor */}
        <div className="space-y-4">
          <div>
            <label className="text-xs font-black text-slate-700 block mb-1">Tajuk Home</label>
            <input type="text" value={form.title} onChange={(e) => { setForm({ ...form, title: e.target.value }); setDirty(true); }}
              className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 bg-purple-50/50 text-sm font-bold text-slate-800 focus:outline-none focus:border-purple-400 focus:bg-white transition-colors" />
          </div>
          <div>
            <label className="text-xs font-black text-slate-700 block mb-1">Subtitle Home</label>
            <input type="text" value={form.subtitle} onChange={(e) => { setForm({ ...form, subtitle: e.target.value }); setDirty(true); }}
              className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 bg-purple-50/50 text-sm font-bold text-slate-800 focus:outline-none focus:border-purple-400 focus:bg-white transition-colors" />
          </div>
          <div>
            <label className="text-xs font-black text-slate-700 block mb-1">Teks Alu-aluan</label>
            <input type="text" value={form.welcomeText} onChange={(e) => { setForm({ ...form, welcomeText: e.target.value }); setDirty(true); }}
              className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 bg-purple-50/50 text-sm font-bold text-slate-800 focus:outline-none focus:border-purple-400 focus:bg-white transition-colors" />
          </div>
          <div>
            <label className="text-xs font-black text-slate-700 block mb-1">Label Murid Dipilih</label>
            <input type="text" value={form.selectedStudentLabel} onChange={(e) => { setForm({ ...form, selectedStudentLabel: e.target.value }); setDirty(true); }}
              className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 bg-purple-50/50 text-sm font-bold text-slate-800 focus:outline-none focus:border-purple-400 focus:bg-white transition-colors" />
            <p className="text-[9px] font-bold text-slate-400 mt-1">Contoh: "Hari ini:"</p>
          </div>
          <div>
            <label className="text-xs font-black text-slate-700 block mb-1">Teks Butang Tukar Murid</label>
            <input type="text" value={form.changeStudentButtonText} onChange={(e) => { setForm({ ...form, changeStudentButtonText: e.target.value }); setDirty(true); }}
              className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 bg-purple-50/50 text-sm font-bold text-slate-800 focus:outline-none focus:border-purple-400 focus:bg-white transition-colors" />
          </div>
          <FileUploadField
            label="URL Gambar Hero"
            value={form.imageUrl}
            onChange={(url) => { setForm({ ...form, imageUrl: url }); setDirty(true); }}
            bucket="app-images"
            folder="home"
            type="image"
            helperText="Muat naik gambar hero atau taip URL manual."
          />
          <FileUploadField
            label="URL Audio Home (opsional)"
            value={form.audioUrl}
            onChange={(url) => { setForm({ ...form, audioUrl: url }); setDirty(true); }}
            bucket="app-audio"
            folder="malay"
            type="audio"
            helperText="Muat naik audio latar atau taip URL manual."
          />

          {message && (
            <p className={`text-xs font-black px-4 py-2 rounded-xl ${message.includes('Berjaya') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-rose-50 text-rose-700 border border-rose-200'}`}>
              {message}
            </p>
          )}

          <div className="flex items-center gap-3 pt-2">
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

        {/* Preview */}
        <div className="bg-white rounded-2xl border-2 border-purple-100 p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4 text-purple-600">
            <Eye className="w-4 h-4" />
            <span className="text-xs font-black text-purple-700">Pratonton Halaman Utama</span>
          </div>
          <div className="bg-gradient-to-b from-purple-50 via-amber-50 to-purple-50 rounded-xl p-5 border-2 border-purple-100">
            <div className="text-center mb-3">
              <div className="w-10 h-10 rounded-full bg-white shadow-md border-2 border-purple-200 flex items-center justify-center mx-auto mb-2">
                <School className="w-5 h-5 text-purple-600" />
              </div>
              <h2 className="text-lg font-black text-slate-800">{form.title || 'Apa perasaan kamu hari ini?'}</h2>
              <p className="text-xs font-bold text-slate-500 mt-1">{form.subtitle}</p>
            </div>
            {form.imageUrl && (
              <div className="rounded-xl overflow-hidden border-2 border-purple-200 mb-3">
                <img src={form.imageUrl} alt="Hero" className="w-full h-32 object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              </div>
            )}
            <div className="flex items-center justify-between bg-white/80 rounded-xl px-3 py-2 border border-purple-100">
              <span className="text-[10px] font-bold text-purple-700">{form.selectedStudentLabel} Ahmad</span>
              <span className="text-[10px] font-black text-amber-600 bg-amber-50 border border-amber-200 rounded-full px-2.5 py-1">{form.changeStudentButtonText}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
