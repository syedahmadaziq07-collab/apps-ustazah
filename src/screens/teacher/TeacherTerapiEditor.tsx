import React, { useState, useEffect, useCallback } from 'react';
import { Save, RotateCcw, Plus, ChevronDown, ChevronUp } from 'lucide-react';
import { isSupabaseConnected } from '../../lib/supabase';
import { EmotionContent, TherapyContent } from '../../types';
import { getEmotions } from '../../services/emotionContentService';
import { getTherapiesByEmotion, saveTherapy, resetTherapiesToDefault, getDefaultTherapies } from '../../services/emotionContentService';
import { FileUploadField } from '../../components/dashboard/FileUploadField';

export const TeacherTerapiEditor: React.FC = () => {
  const [emotions, setEmotions] = useState<EmotionContent[]>([]);
  const [therapiesMap, setTherapiesMap] = useState<Record<string, TherapyContent[]>>({});
  const [expanded, setExpanded] = useState<string | null>(null);
  const [editTarget, setEditTarget] = useState<TherapyContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    const elist = await getEmotions();
    setEmotions(elist.filter(e => e.is_active));
    const map: Record<string, TherapyContent[]> = {};
    for (const e of elist) {
      if (e.is_active) {
        map[e.id] = await getTherapiesByEmotion(e.id);
      }
    }
    setTherapiesMap(map);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const openEdit = (t: TherapyContent) => {
    setEditTarget({ ...t });
    setMessage('');
  };

  const newTherapy = (emotionId: string) => {
    setEditTarget({
      id: `th-${emotionId}-${Date.now()}`,
      emotion_id: emotionId,
      title: '',
      instruction: '',
      therapy_type: 'zikir',
      count_target: 1,
      arabic_text: '',
      rumi_text: '',
      meaning_text: '',
      image_url: '',
      malay_audio_url: '',
      arabic_audio_url: '',
      sort_order: (therapiesMap[emotionId]?.length || 0),
      is_active: true,
    });
    setMessage('');
  };

  const handleSave = async () => {
    if (!editTarget) return;
    setSaving(true);
    const ok = await saveTherapy(editTarget);
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
    const ok = await resetTherapiesToDefault();
    if (ok) {
      setMessage('Reset ke default berjaya.');
      await load();
    }
  };

  if (loading) {
    return <div className="flex-grow p-4 md:p-6 overflow-y-auto pb-20 md:pb-6"><p className="text-sm font-bold text-slate-400">Memuatkan...</p></div>;
  }

  return (
    <div className="flex-grow p-4 md:p-6 overflow-y-auto pb-20 md:pb-6">
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-black text-slate-800">Urus Terapi</h1>
        <p className="text-xs font-bold text-slate-500 mt-1">Edit senarai terapi untuk setiap emosi.</p>
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
          <h2 className="text-sm font-black text-purple-700">{editTarget.id ? 'Edit Terapi' : 'Tambah Terapi Baru'}</h2>
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
              <label className="text-xs font-black text-slate-700 block mb-1">Arahan</label>
              <input type="text" value={editTarget.instruction} onChange={(e) => setEditTarget({ ...editTarget, instruction: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border-2 border-purple-200 bg-purple-50/50 text-sm font-bold focus:outline-none focus:border-purple-400" />
            </div>
            <div>
              <label className="text-xs font-black text-slate-700 block mb-1">Jenis Terapi</label>
              <select value={editTarget.therapy_type} onChange={(e) => setEditTarget({ ...editTarget, therapy_type: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border-2 border-purple-200 bg-purple-50/50 text-sm font-bold focus:outline-none focus:border-purple-400">
                <option value="zikir">Zikir</option>
                <option value="doa">Doa</option>
                <option value="breathing">Pernafasan</option>
                <option value="kata_semangat">Kata Semangat</option>
                <option value="rehat">Rehat</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-black text-slate-700 block mb-1">Sasaran Kiraan</label>
              <input type="number" value={editTarget.count_target} onChange={(e) => setEditTarget({ ...editTarget, count_target: parseInt(e.target.value) || 1 })}
                className="w-full px-3 py-2 rounded-xl border-2 border-purple-200 bg-purple-50/50 text-sm font-bold focus:outline-none focus:border-purple-400" />
            </div>
            <div>
              <label className="text-xs font-black text-slate-700 block mb-1">Susunan</label>
              <input type="number" value={editTarget.sort_order} onChange={(e) => setEditTarget({ ...editTarget, sort_order: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 rounded-xl border-2 border-purple-200 bg-purple-50/50 text-sm font-bold focus:outline-none focus:border-purple-400" />
            </div>
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
              className="w-full px-3 py-2 rounded-xl border-2 border-purple-200 bg-purple-50/50 text-sm font-bold focus:outline-none focus:border-purple-400" rows={2} />
          </div>
          <div>
            <label className="text-xs font-black text-slate-700 block mb-1">Teks Rumi</label>
            <input type="text" value={editTarget.rumi_text} onChange={(e) => setEditTarget({ ...editTarget, rumi_text: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border-2 border-purple-200 bg-purple-50/50 text-sm font-bold focus:outline-none focus:border-purple-400" />
          </div>
          <div>
            <label className="text-xs font-black text-slate-700 block mb-1">Maksud</label>
            <input type="text" value={editTarget.meaning_text} onChange={(e) => setEditTarget({ ...editTarget, meaning_text: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border-2 border-purple-200 bg-purple-50/50 text-sm font-bold focus:outline-none focus:border-purple-400" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FileUploadField
              label="URL Audio Malay"
              value={editTarget.malay_audio_url}
              onChange={(url) => setEditTarget({ ...editTarget, malay_audio_url: url })}
              bucket="app-audio"
              folder="malay"
              type="audio"
            />
            <FileUploadField
              label="URL Audio Arab"
              value={editTarget.arabic_audio_url}
              onChange={(url) => setEditTarget({ ...editTarget, arabic_audio_url: url })}
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
            <button onClick={() => setEditTarget(null)}
              className="px-4 py-3 border-2 border-slate-200 text-xs font-black text-slate-600 rounded-2xl hover:bg-slate-50 active:scale-95 transition-all cursor-pointer">
              Batal
            </button>
          </div>
        </div>
      )}

      {/* Emotion Accordion List */}
      <div className="space-y-3">
        {emotions.map(e => (
          <div key={e.id} className="bg-white rounded-2xl border-2 border-purple-100 overflow-hidden">
            <button onClick={() => setExpanded(expanded === e.id ? null : e.id)}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-purple-50 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <span className="text-xl">{e.emoji}</span>
                <span className="text-sm font-black text-slate-800">{e.label}</span>
                <span className="text-[10px] font-bold text-slate-400">({therapiesMap[e.id]?.length || 0} terapi)</span>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={(ev) => { ev.stopPropagation(); newTherapy(e.id); }}
                  className="p-1.5 border border-purple-200 rounded-lg text-purple-500 hover:bg-purple-50 cursor-pointer">
                  <Plus className="w-3.5 h-3.5" />
                </button>
                {expanded === e.id ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </div>
            </button>
            {expanded === e.id && (
              <div className="px-4 pb-4 space-y-2">
                {(therapiesMap[e.id] || []).length === 0 && (
                  <p className="text-[10px] font-bold text-slate-400 italic">Tiada terapi untuk emosi ini.</p>
                )}
                {(therapiesMap[e.id] || []).map(t => (
                  <div key={t.id} className="border border-purple-100 rounded-xl p-3 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-black text-slate-700">{t.title}</p>
                      <p className="text-[10px] font-bold text-slate-400">Jenis: {t.therapy_type} | Kiraan: {t.count_target} | Susunan: {t.sort_order}</p>
                    </div>
                    <button onClick={() => openEdit(t)}
                      className="px-3 py-1.5 border border-purple-200 text-[10px] font-black text-purple-600 rounded-xl hover:bg-purple-50 cursor-pointer">
                      Edit
                    </button>
                  </div>
                ))}
              </div>
            )}
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
