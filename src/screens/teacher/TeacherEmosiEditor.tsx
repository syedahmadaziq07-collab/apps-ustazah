import React, { useState, useEffect, useCallback } from 'react';
import { Save, RotateCcw } from 'lucide-react';
import { isSupabaseConnected } from '../../lib/supabase';
import { EmotionContent } from '../../types';
import { getEmotions, saveEmotion, resetEmotionsToDefault, getDefaultEmotions } from '../../services/emotionContentService';
import { FileUploadField } from '../../components/dashboard/FileUploadField';

const colorOptions = ['yellow', 'red', 'blue', 'purple', 'orange', 'teal', 'green'];
const illustrationOptions = ['HappyChildren', 'AngryChild', 'SadChild', 'ScaredChild', 'CalmChild'];

export const TeacherEmosiEditor: React.FC = () => {
  const [emotions, setEmotions] = useState<EmotionContent[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<EmotionContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    const list = await getEmotions();
    setEmotions(list);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const openEdit = (e: EmotionContent) => {
    setEditId(e.id);
    setForm({ ...e });
    setMessage('');
  };

  const handleSave = async () => {
    if (!form) return;
    setSaving(true);
    const ok = await saveEmotion(form);
    setSaving(false);
    if (ok) {
      setMessage('Berjaya disimpan.');
      await load();
      setEditId(null);
      setForm(null);
    } else {
      setMessage('Gagal menyimpan. Cuba lagi.');
    }
  };

  const handleReset = async () => {
    const ok = await resetEmotionsToDefault();
    if (ok) {
      setMessage('Reset ke default berjaya.');
      await load();
    }
  };

  if (loading) {
    return <div className="flex-grow p-4 md:p-6 overflow-y-auto pb-20 md:pb-6"><p className="text-sm font-bold text-slate-400">Sedang memuatkan...</p></div>;
  }

  return (
    <div className="flex-grow p-4 md:p-6 overflow-y-auto pb-20 md:pb-6">
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-black text-slate-800">Urus Emosi</h1>
        <p className="text-xs font-bold text-slate-500 mt-1">Edit senarai emosi yang dipaparkan kepada murid.</p>
      </div>

      {!isSupabaseConnected && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3 mb-4">
          <p className="text-[10px] font-bold text-amber-800">Supabase belum disambungkan, perubahan disimpan pada peranti ini.</p>
        </div>
      )}

      {message && (
        <div className={`mb-4 text-xs font-black px-4 py-2 rounded-xl ${message.includes('Berjaya') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-rose-50 text-rose-700 border border-rose-200'}`}>
          {message}
        </div>
      )}

      {/* Edit Form */}
      {form && (
        <div className="bg-white rounded-2xl border-2 border-purple-200 p-4 mb-6 space-y-4">
          <h2 className="text-sm font-black text-purple-700">Edit: {form.label}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-black text-slate-700 block mb-1">ID Emosi</label>
              <input type="text" value={form.id} onChange={(e) => setForm({ ...form, id: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border-2 border-purple-200 bg-purple-50/50 text-sm font-bold focus:outline-none focus:border-purple-400" />
            </div>
            <div>
              <label className="text-xs font-black text-slate-700 block mb-1">Label</label>
              <input type="text" value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border-2 border-purple-200 bg-purple-50/50 text-sm font-bold focus:outline-none focus:border-purple-400" />
            </div>
            <div>
              <label className="text-xs font-black text-slate-700 block mb-1">Emoji</label>
              <input type="text" value={form.emoji} onChange={(e) => setForm({ ...form, emoji: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border-2 border-purple-200 bg-purple-50/50 text-sm font-bold focus:outline-none focus:border-purple-400" />
            </div>
            <div>
              <label className="text-xs font-black text-slate-700 block mb-1">Warna</label>
              <select value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border-2 border-purple-200 bg-purple-50/50 text-sm font-bold focus:outline-none focus:border-purple-400">
                {colorOptions.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-black text-slate-700 block mb-1">Ilustrasi</label>
              <select value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border-2 border-purple-200 bg-purple-50/50 text-sm font-bold focus:outline-none focus:border-purple-400">
                {illustrationOptions.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-black text-slate-700 block mb-1">Susunan</label>
              <input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 rounded-xl border-2 border-purple-200 bg-purple-50/50 text-sm font-bold focus:outline-none focus:border-purple-400" />
            </div>
            <div>
              <label className="text-xs font-black text-slate-700 block mb-1">Aktif</label>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                  className="w-4 h-4 accent-purple-600" />
                <span className="text-xs font-bold text-slate-600">Emosi aktif</span>
              </label>
            </div>
            <FileUploadField
              label="URL Gambar"
              value={form.image_url}
              onChange={(url) => setForm({ ...form, image_url: url })}
              bucket="app-images"
              folder="emotions"
              type="image"
            />
          </div>
          <div>
            <label className="text-xs font-black text-slate-700 block mb-1">Teks Nasihat</label>
            <textarea value={form.advice_text} onChange={(e) => setForm({ ...form, advice_text: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border-2 border-purple-200 bg-purple-50/50 text-sm font-bold focus:outline-none focus:border-purple-400" rows={3} />
          </div>
          <div>
            <label className="text-xs font-black text-slate-700 block mb-1">Zikir (Arab)</label>
            <input type="text" value={form.zikir} onChange={(e) => setForm({ ...form, zikir: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border-2 border-purple-200 bg-purple-50/50 text-sm font-bold focus:outline-none focus:border-purple-400" />
          </div>
          <div>
            <label className="text-xs font-black text-slate-700 block mb-1">Zikir (Rumi)</label>
            <input type="text" value={form.zikir_rumi} onChange={(e) => setForm({ ...form, zikir_rumi: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border-2 border-purple-200 bg-purple-50/50 text-sm font-bold focus:outline-none focus:border-purple-400" />
          </div>
          <div>
            <label className="text-xs font-black text-slate-700 block mb-1">Zikir (Maksud)</label>
            <input type="text" value={form.zikir_maksud} onChange={(e) => setForm({ ...form, zikir_maksud: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border-2 border-purple-200 bg-purple-50/50 text-sm font-bold focus:outline-none focus:border-purple-400" />
          </div>
          <div>
            <label className="text-xs font-black text-slate-700 block mb-1">Aktiviti</label>
            <input type="text" value={form.aktiviti} onChange={(e) => setForm({ ...form, aktiviti: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border-2 border-purple-200 bg-purple-50/50 text-sm font-bold focus:outline-none focus:border-purple-400" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FileUploadField
              label="URL Audio Malay"
              value={form.malay_audio_url}
              onChange={(url) => setForm({ ...form, malay_audio_url: url })}
              bucket="app-audio"
              folder="malay"
              type="audio"
            />
            <FileUploadField
              label="URL Audio Arab"
              value={form.arabic_audio_url}
              onChange={(url) => setForm({ ...form, arabic_audio_url: url })}
              bucket="app-audio"
              folder="arabic"
              type="audio"
            />
          </div>
          <div className="flex items-center gap-3 pt-2">
            <button onClick={handleSave} disabled={saving}
              className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white text-xs font-black rounded-2xl hover:bg-purple-700 active:scale-95 transition-all cursor-pointer disabled:opacity-50">
              <Save className="w-4 h-4" />
              {saving ? 'Menyimpan...' : 'Simpan'}
            </button>
            <button onClick={() => { setEditId(null); setForm(null); }}
              className="px-4 py-3 border-2 border-slate-200 text-xs font-black text-slate-600 rounded-2xl hover:bg-slate-50 active:scale-95 transition-all cursor-pointer">
              Batal
            </button>
          </div>
        </div>
      )}

      {/* List */}
      <div className="space-y-2">
        {emotions.map(e => (
          <div key={e.id} className="bg-white rounded-2xl border-2 border-purple-100 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{e.emoji}</span>
              <div>
                <p className="text-sm font-black text-slate-800">{e.label}</p>
                <p className="text-[10px] font-bold text-slate-400">ID: {e.id} | Susunan: {e.sort_order} | {e.is_active ? 'Aktif' : 'Tidak Aktif'}</p>
              </div>
            </div>
            <button onClick={() => openEdit(e)}
              className="px-4 py-2 border-2 border-purple-200 text-xs font-black text-purple-600 rounded-2xl hover:bg-purple-50 active:scale-95 transition-all cursor-pointer">
              Edit
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <button onClick={handleReset}
          className="flex items-center gap-2 px-4 py-3 border-2 border-slate-200 text-xs font-black text-slate-600 rounded-2xl hover:bg-slate-50 active:scale-95 transition-all cursor-pointer">
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Semua ke Default
        </button>
      </div>
    </div>
  );
};
