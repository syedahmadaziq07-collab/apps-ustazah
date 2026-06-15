import React, { useState, useEffect, useCallback } from 'react';
import { Save, RotateCcw, School } from 'lucide-react';
import { isSupabaseConnected } from '../../lib/supabase';
import { SchoolSettings } from '../../types';
import { getSchoolSettings, saveSchoolSettings, getDefaultSettings } from '../../services/appContentService';

export const TeacherBrandingEditor: React.FC = () => {
  const [form, setForm] = useState<SchoolSettings>(getDefaultSettings());
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    const settings = await getSchoolSettings();
    if (settings) setForm(settings);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    const ok = await saveSchoolSettings(form);
    setSaving(false);
    setMessage(ok ? 'Berjaya disimpan.' : 'Gagal menyimpan. Cuba lagi.');
  };

  const handleReset = () => {
    setForm(getDefaultSettings());
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
        <h1 className="text-xl md:text-2xl font-black text-slate-800">Tetapan Sekolah & Aplikasi</h1>
        <p className="text-xs font-bold text-slate-500 mt-1">
          Urus nama sekolah, jenama aplikasi dan warna tema.
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
            <label className="text-xs font-black text-slate-700 block mb-1">Nama Sekolah</label>
            <input type="text" value={form.school_name} onChange={(e) => setForm({ ...form, school_name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 bg-purple-50/50 text-sm font-bold text-slate-800 focus:outline-none focus:border-purple-400 focus:bg-white transition-colors" />
          </div>
          <div>
            <label className="text-xs font-black text-slate-700 block mb-1">Nama Aplikasi</label>
            <input type="text" value={form.app_name} onChange={(e) => setForm({ ...form, app_name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 bg-purple-50/50 text-sm font-bold text-slate-800 focus:outline-none focus:border-purple-400 focus:bg-white transition-colors" />
          </div>
          <div>
            <label className="text-xs font-black text-slate-700 block mb-1">Tagline</label>
            <input type="text" value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 bg-purple-50/50 text-sm font-bold text-slate-800 focus:outline-none focus:border-purple-400 focus:bg-white transition-colors" />
          </div>
          <div>
            <label className="text-xs font-black text-slate-700 block mb-1">URL Logo Sekolah</label>
            <input type="url" value={form.logo_url} onChange={(e) => setForm({ ...form, logo_url: e.target.value })}
              placeholder="https://example.com/logo.png"
              className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 bg-purple-50/50 text-sm font-bold text-slate-800 focus:outline-none focus:border-purple-400 focus:bg-white transition-colors" />
            <p className="text-[9px] font-bold text-slate-400 mt-1">Fasa seterusnya: upload logo terus ke Supabase Storage.</p>
          </div>
          <div>
            <label className="text-xs font-black text-slate-700 block mb-1">Warna Tema</label>
            <div className="flex items-center gap-3">
              <input type="color" value={form.theme_color} onChange={(e) => setForm({ ...form, theme_color: e.target.value })}
                className="w-12 h-12 rounded-xl border-2 border-purple-200 cursor-pointer" />
              <input type="text" value={form.theme_color} onChange={(e) => setForm({ ...form, theme_color: e.target.value })}
                className="flex-1 px-4 py-3 rounded-xl border-2 border-purple-200 bg-purple-50/50 text-sm font-bold text-slate-800 focus:outline-none focus:border-purple-400 focus:bg-white transition-colors" />
            </div>
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
          <div className="flex items-center gap-2 mb-4" style={{ color: form.theme_color || '#8B5CF6' }}>
            <School className="w-4 h-4" />
            <span className="text-xs font-black" style={{ color: form.theme_color || '#8B5CF6' }}>Pratonton Jenama</span>
          </div>
          <div className="rounded-xl p-6 border-2" style={{ borderColor: form.theme_color || '#8B5CF6', backgroundColor: `${form.theme_color}08` || '#f5f3ff' }}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center text-xl border-2 bg-white overflow-hidden" style={{ borderColor: form.theme_color || '#8B5CF6' }}>
                {form.logo_url ? (
                  <img src={form.logo_url} alt="Logo" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                ) : (
                  <span style={{ color: form.theme_color || '#8B5CF6' }}>🏫</span>
                )}
              </div>
              <div>
                <p className="text-lg font-black" style={{ color: form.theme_color || '#8B5CF6' }}>{form.app_name || 'ZikirCare'}</p>
                <p className="text-[11px] font-bold text-slate-500">{form.school_name || 'SK AL-FALAH'}</p>
              </div>
            </div>
            <p className="text-xs font-bold text-slate-500 italic">{form.tagline || 'Aplikasi Kerohanian & Emosi Kanak-Kanak'}</p>
            <div className="mt-4 flex items-center gap-2">
              <span className="text-[9px] font-bold text-slate-400">Warna tema:</span>
              <span className="w-4 h-4 rounded-full border border-slate-200" style={{ backgroundColor: form.theme_color || '#8B5CF6' }} />
              <span className="text-[9px] font-mono font-bold text-slate-500">{form.theme_color || '#8B5CF6'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
