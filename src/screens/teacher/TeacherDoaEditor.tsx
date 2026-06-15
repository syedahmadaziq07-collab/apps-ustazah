import React, { useState, useEffect, useCallback } from 'react';
import { Save, RotateCcw, Plus } from 'lucide-react';
import { isSupabaseConnected } from '../../lib/supabase';
import { DuaContent } from '../../types';
import { getDuas, saveDua, resetDuasToDefault } from '../../services/duaService';
import { FileUploadField } from '../../components/dashboard/FileUploadField';

export const TeacherDoaEditor: React.FC = () => {
  const [duas, setDuas] = useState<DuaContent[]>([]);
  const [editTarget, setEditTarget] = useState<DuaContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    const list = await getDuas();
    setDuas(list);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const openEdit = (d: DuaContent) => {
    setEditTarget({ ...d });
    setMessage('');
  };

  const newDua = () => {
    setEditTarget({
      id: `dua-${Date.now()}`,
      title: '',
      arabic_text: '',
      rumi_text: '',
      meaning_text: '',
      image_url: '',
      audio_url: '',
      sort_order: duas.length,
      is_active: true,
      emoji_decorative: '📖',
      explanation: '',
    });
    setMessage('');
  };

  const handleSave = async () => {
    if (!editTarget) return;
    setSaving(true);
    const ok = await saveDua(editTarget);
    setSaving(false);
    if (ok) {
      setMessage('Berjaya disimpan.');
      await load();
      setEditTarget(null);
    } else {
      setMessage('Gagal menyimpan. Cuba lagi.');
    }
  };

  const handleReset = async () => {
    const ok = await resetDuasToDefault();
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
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-slate-800">Urus Doa & Zikir Harian</h1>
          <p className="text-xs font-bold text-slate-500 mt-1">Edit senarai doa dan zikir harian untuk murid.</p>
        </div>
        <button onClick={newDua}
          className="flex items-center gap-2 px-4 py-3 bg-purple-600 text-white text-xs font-black rounded-2xl hover:bg-purple-700 active:scale-95 transition-all cursor-pointer">
          <Plus className="w-4 h-4" />
          Tambah Doa
        </button>
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
      {editTarget && (
        <div className="bg-white rounded-2xl border-2 border-purple-200 p-4 mb-6 space-y-4">
          <h2 className="text-sm font-black text-purple-700">{editTarget.id.startsWith('dua-') && !duas.find(d => d.id === editTarget.id) ? 'Tambah Doa Baru' : 'Edit Doa'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-black text-slate-700 block mb-1">ID</label>
              <input type="text" value={editTarget.id} onChange={(e) => setEditTarget({ ...editTarget, id: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border-2 border-purple-200 bg-purple-50/50 text-sm font-bold focus:outline-none focus:border-purple-400" />
            </div>
            <div>
              <label className="text-xs font-black text-slate-700 block mb-1">Tajuk</label>
              <input type="text" value={editTarget.title} onChange={(e) => setEditTarget({ ...editTarget, title: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border-2 border-purple-200 bg-purple-50/50 text-sm font-bold focus:outline-none focus:border-purple-400" />
            </div>
            <div>
              <label className="text-xs font-black text-slate-700 block mb-1">Emoji Hiasan</label>
              <input type="text" value={editTarget.emoji_decorative} onChange={(e) => setEditTarget({ ...editTarget, emoji_decorative: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border-2 border-purple-200 bg-purple-50/50 text-sm font-bold focus:outline-none focus:border-purple-400" />
            </div>
            <div>
              <label className="text-xs font-black text-slate-700 block mb-1">Susunan</label>
              <input type="number" value={editTarget.sort_order} onChange={(e) => setEditTarget({ ...editTarget, sort_order: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 rounded-xl border-2 border-purple-200 bg-purple-50/50 text-sm font-bold focus:outline-none focus:border-purple-400" />
            </div>
            <FileUploadField
              label="URL Gambar"
              value={editTarget.image_url}
              onChange={(url) => setEditTarget({ ...editTarget, image_url: url })}
              bucket="app-images"
              folder="duas"
              type="image"
            />
            <div>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={editTarget.is_active} onChange={(e) => setEditTarget({ ...editTarget, is_active: e.target.checked })}
                  className="w-4 h-4 accent-purple-600" />
                <span className="text-xs font-bold text-slate-600">Aktif</span>
              </label>
            </div>
          </div>
          <div>
            <label className="text-xs font-black text-slate-700 block mb-1">Teks Arab</label>
            <textarea value={editTarget.arabic_text} onChange={(e) => setEditTarget({ ...editTarget, arabic_text: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border-2 border-purple-200 bg-purple-50/50 text-sm font-bold focus:outline-none focus:border-purple-400" rows={3} />
          </div>
          <div>
            <label className="text-xs font-black text-slate-700 block mb-1">Rumi</label>
            <input type="text" value={editTarget.rumi_text} onChange={(e) => setEditTarget({ ...editTarget, rumi_text: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border-2 border-purple-200 bg-purple-50/50 text-sm font-bold focus:outline-none focus:border-purple-400" />
          </div>
          <div>
            <label className="text-xs font-black text-slate-700 block mb-1">Maksud</label>
            <input type="text" value={editTarget.meaning_text} onChange={(e) => setEditTarget({ ...editTarget, meaning_text: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border-2 border-purple-200 bg-purple-50/50 text-sm font-bold focus:outline-none focus:border-purple-400" />
          </div>
          <div>
            <label className="text-xs font-black text-slate-700 block mb-1">Penerangan</label>
            <textarea value={editTarget.explanation} onChange={(e) => setEditTarget({ ...editTarget, explanation: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border-2 border-purple-200 bg-purple-50/50 text-sm font-bold focus:outline-none focus:border-purple-400" rows={2} />
          </div>
          <FileUploadField
            label="URL Audio"
            value={editTarget.audio_url}
            onChange={(url) => setEditTarget({ ...editTarget, audio_url: url })}
            bucket="app-audio"
            folder="duas"
            type="audio"
          />
          <div className="flex items-center gap-3 pt-2">
            <button onClick={handleSave} disabled={saving}
              className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white text-xs font-black rounded-2xl hover:bg-purple-700 active:scale-95 transition-all cursor-pointer disabled:opacity-50">
              <Save className="w-4 h-4" />
              {saving ? 'Menyimpan...' : 'Simpan'}
            </button>
            <button onClick={() => setEditTarget(null)}
              className="px-4 py-3 border-2 border-slate-200 text-xs font-black text-slate-600 rounded-2xl hover:bg-slate-50 active:scale-95 transition-all cursor-pointer">
              Batal
            </button>
          </div>
        </div>
      )}

      {/* List */}
      <div className="space-y-2">
        {duas.map(d => (
          <div key={d.id} className="bg-white rounded-2xl border-2 border-purple-100 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{d.emoji_decorative}</span>
              <div>
                <p className="text-sm font-black text-slate-800">{d.title}</p>
                <p className="text-[10px] font-bold text-slate-400">Susunan: {d.sort_order} | {d.is_active ? 'Aktif' : 'Tidak Aktif'}</p>
              </div>
            </div>
            <button onClick={() => openEdit(d)}
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
