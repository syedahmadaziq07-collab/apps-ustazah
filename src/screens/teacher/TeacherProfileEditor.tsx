import React, { useState, useEffect, useCallback } from 'react';
import { Save, RotateCcw, Eye, School } from 'lucide-react';
import { isSupabaseConnected } from '../../lib/supabase';
import { AppPage } from '../../types';
import { getAppPage, saveAppPage, getDefaultPage } from '../../services/appContentService';

interface ProfileContent {
  title: string;
  subtitle: string;
  bodyText: string;
  imageUrl: string;
  audioUrl: string;
  schoolInfo: string;
  counsellingNote: string;
  privacyNote: string;
  supportText: string;
}

const emptyContent: ProfileContent = {
  title: '', subtitle: '', bodyText: '', imageUrl: '', audioUrl: '',
  schoolInfo: '', counsellingNote: '', privacyNote: '', supportText: '',
};

export const TeacherProfileEditor: React.FC = () => {
  const [form, setForm] = useState<ProfileContent>(emptyContent);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [dirty, setDirty] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const page = await getAppPage('profile');
    if (page) {
      setForm({
        title: page.title || '',
        subtitle: page.subtitle || '',
        bodyText: page.body_text || '',
        imageUrl: page.image_url || '',
        audioUrl: page.audio_url || '',
        schoolInfo: page.content_json?.schoolInfo || '',
        counsellingNote: page.content_json?.counsellingNote || '',
        privacyNote: page.content_json?.privacyNote || '',
        supportText: page.content_json?.supportText || '',
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
        schoolInfo: form.schoolInfo,
        counsellingNote: form.counsellingNote,
        privacyNote: form.privacyNote,
        supportText: form.supportText,
      },
    };
    const ok = await saveAppPage('profile', pageData);
    setSaving(false);
    if (ok) {
      setMessage('Berjaya disimpan.');
      setDirty(false);
    } else {
      setMessage('Gagal menyimpan. Cuba lagi.');
    }
  };

  const handleReset = async () => {
    const def = getDefaultPage('profile');
    if (def) {
      setForm({
        title: def.title,
        subtitle: def.subtitle,
        bodyText: def.body_text,
        imageUrl: def.image_url,
        audioUrl: def.audio_url,
        schoolInfo: def.content_json?.schoolInfo || '',
        counsellingNote: def.content_json?.counsellingNote || '',
        privacyNote: def.content_json?.privacyNote || '',
        supportText: def.content_json?.supportText || '',
      });
      setDirty(true);
    }
  };

  if (loading) {
    return (
      <div className="flex-grow p-4 md:p-6 overflow-y-auto pb-20 md:pb-6">
        <p className="text-sm font-bold text-slate-400">Memuatkan...</p>
      </div>
    );
  }

  return (
    <div className="flex-grow p-4 md:p-6 overflow-y-auto pb-20 md:pb-6">
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-black text-slate-800">Urus Profil App</h1>
        <p className="text-xs font-bold text-slate-500 mt-1">
          Edit maklumat sekolah, tujuan aplikasi dan nota sokongan.
        </p>
      </div>

      {!isSupabaseConnected && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3 mb-4">
          <p className="text-[10px] font-bold text-amber-800">
            Supabase belum disambungkan, perubahan disimpan pada peranti ini.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="text-xs font-black text-slate-700 block mb-1">Tajuk Profil</label>
            <input type="text" value={form.title} onChange={(e) => { setForm({ ...form, title: e.target.value }); setDirty(true); }}
              className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 bg-purple-50/50 text-sm font-bold text-slate-800 focus:outline-none focus:border-purple-400 focus:bg-white transition-colors" />
          </div>
          <div>
            <label className="text-xs font-black text-slate-700 block mb-1">Subtitle Profil</label>
            <input type="text" value={form.subtitle} onChange={(e) => { setForm({ ...form, subtitle: e.target.value }); setDirty(true); }}
              className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 bg-purple-50/50 text-sm font-bold text-slate-800 focus:outline-none focus:border-purple-400 focus:bg-white transition-colors" />
          </div>
          <div>
            <label className="text-xs font-black text-slate-700 block mb-1">Tujuan Aplikasi / Body Text</label>
            <textarea rows={3} value={form.bodyText} onChange={(e) => { setForm({ ...form, bodyText: e.target.value }); setDirty(true); }}
              className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 bg-purple-50/50 text-sm font-bold text-slate-800 focus:outline-none focus:border-purple-400 focus:bg-white transition-colors resize-none" />
          </div>
          <div>
            <label className="text-xs font-black text-slate-700 block mb-1">Nota Kaunseling</label>
            <textarea rows={2} value={form.counsellingNote} onChange={(e) => { setForm({ ...form, counsellingNote: e.target.value }); setDirty(true); }}
              className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 bg-purple-50/50 text-sm font-bold text-slate-800 focus:outline-none focus:border-purple-400 focus:bg-white transition-colors resize-none" />
          </div>
          <div>
            <label className="text-xs font-black text-slate-700 block mb-1">Maklumat Sekolah</label>
            <input type="text" value={form.schoolInfo} onChange={(e) => { setForm({ ...form, schoolInfo: e.target.value }); setDirty(true); }}
              className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 bg-purple-50/50 text-sm font-bold text-slate-800 focus:outline-none focus:border-purple-400 focus:bg-white transition-colors" />
          </div>
          <div>
            <label className="text-xs font-black text-slate-700 block mb-1">Nota Privasi</label>
            <textarea rows={2} value={form.privacyNote} onChange={(e) => { setForm({ ...form, privacyNote: e.target.value }); setDirty(true); }}
              className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 bg-purple-50/50 text-sm font-bold text-slate-800 focus:outline-none focus:border-purple-400 focus:bg-white transition-colors resize-none" />
          </div>
          <div>
            <label className="text-xs font-black text-slate-700 block mb-1">Teks Sokongan</label>
            <input type="text" value={form.supportText} onChange={(e) => { setForm({ ...form, supportText: e.target.value }); setDirty(true); }}
              className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 bg-purple-50/50 text-sm font-bold text-slate-800 focus:outline-none focus:border-purple-400 focus:bg-white transition-colors" />
          </div>
          <div>
            <label className="text-xs font-black text-slate-700 block mb-1">URL Gambar Profil</label>
            <input type="url" value={form.imageUrl} onChange={(e) => { setForm({ ...form, imageUrl: e.target.value }); setDirty(true); }}
              className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 bg-purple-50/50 text-sm font-bold text-slate-800 focus:outline-none focus:border-purple-400 focus:bg-white transition-colors" />
          </div>
          <div>
            <label className="text-xs font-black text-slate-700 block mb-1">URL Audio Profil (opsional)</label>
            <input type="url" value={form.audioUrl} onChange={(e) => { setForm({ ...form, audioUrl: e.target.value }); setDirty(true); }}
              className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 bg-purple-50/50 text-sm font-bold text-slate-800 focus:outline-none focus:border-purple-400 focus:bg-white transition-colors" />
            <p className="text-[9px] font-bold text-slate-400 mt-1">Fasa seterusnya: upload audio terus ke Supabase Storage.</p>
          </div>

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
            <span className="text-xs font-black text-purple-700">Pratonton Profil</span>
          </div>
          <div className="bg-gradient-to-b from-purple-50 to-amber-50 rounded-xl p-5 border-2 border-purple-100">
            <div className="text-center mb-3">
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-2 text-xl border-2 border-amber-200">🧕</div>
              <h2 className="text-base font-black text-slate-800">{form.title || 'Profil App'}</h2>
              <p className="text-[11px] font-bold text-slate-500 mt-1">{form.subtitle}</p>
            </div>
            {form.bodyText && (
              <p className="text-[11px] font-bold text-slate-600 leading-relaxed mb-3 bg-white/80 rounded-xl p-3 border border-purple-100">
                {form.bodyText}
              </p>
            )}
            {form.schoolInfo && (
              <div className="text-[10px] font-bold text-slate-500 bg-white/80 rounded-xl px-3 py-2 border border-purple-100">
                🏫 {form.schoolInfo}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
