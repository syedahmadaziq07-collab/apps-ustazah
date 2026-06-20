import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, Save, CheckCircle } from 'lucide-react';
import { AppPhoneFrame, SoftSkyBackground, StarSparklePattern, IslamicMoonStarDecoration } from '../components/Decorations';
import { StudentLayout } from '../components/StudentLayout';
import { useStudent } from '../components/StudentProvider';
import { getParentInfo, saveParentInfo } from '../services/parentInfoService';

const RELATIONSHIPS = ['Bapa', 'Ibu', 'Penjaga'];

export const ProfilIbuBapaScreen: React.FC = () => {
  const navigate = useNavigate();
  const { selectedStudent } = useStudent();
  const [parentName, setParentName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!selectedStudent?.id) return;
    getParentInfo(selectedStudent.id).then(info => {
      if (info) {
        setParentName(info.parent_name || '');
        setRelationship(info.relationship || '');
        setPhone(info.phone_number || '');
        setAddress(info.address || '');
        setNotes(info.notes || '');
      }
      setLoading(false);
    });
  }, [selectedStudent?.id]);

  const isValid = parentName.trim() && relationship && phone.trim();

  const handleSave = async () => {
    if (!isValid || !selectedStudent?.id) return;
    setSaving(true);
    const ok = await saveParentInfo(selectedStudent.id, {
      parent_name: parentName.trim(),
      relationship,
      phone_number: phone.trim(),
      address: address.trim(),
      notes: notes.trim(),
    });
    setSaving(false);
    if (ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  return (
    <StudentLayout activeNav={null}>
    <AppPhoneFrame className="relative flex flex-col min-h-screen bg-transparent select-none lg:max-w-none lg:mx-0 lg:rounded-none lg:border-0 lg:my-0 lg:shadow-none">
      <SoftSkyBackground variant="sky">
        <StarSparklePattern />
      </SoftSkyBackground>
      <IslamicMoonStarDecoration className="absolute top-18 right-2 z-10 scale-90" />

      <header className="flex items-center gap-3 px-5 pt-5 pb-3 bg-white/80 backdrop-blur-md relative z-10">
        <button onClick={() => navigate('/profil')} className="w-9 h-9 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 hover:bg-purple-100 active:scale-95 transition-all cursor-pointer">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-lg font-black text-slate-800">Ibu Bapa / Penjaga</h1>
          <p className="text-[10px] font-bold text-slate-500">Maklumat perhubungan waris</p>
        </div>
      </header>

      <main className="flex-grow px-5 pb-6 relative z-10 pt-4 overflow-y-auto">
        {loading ? (
          <div className="text-center py-12"><p className="text-xs font-black text-slate-400">Memuatkan...</p></div>
        ) : (
        <div className="space-y-4">
          {/* Phone call link if number exists */}
          {phone && (
            <a href={`tel:${phone}`}
              className="block bg-white rounded-2xl p-4 shadow-sm border border-purple-100/60 flex items-center gap-3 active:scale-[0.98] transition-all">
              <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Hubungi</p>
                <p className="text-sm font-black text-green-700">{phone}</p>
              </div>
            </a>
          )}

          {/* Form */}
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-purple-100/60 space-y-4">
            {/* Nama */}
            <div>
              <label className="text-xs font-black text-slate-700 block mb-1">Nama Ibu Bapa / Penjaga *</label>
              <input type="text" value={parentName} onChange={e => setParentName(e.target.value)}
                placeholder="Ahmad bin Hassan"
                className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 bg-purple-50/50 text-sm font-bold text-slate-800 focus:outline-none focus:border-purple-400 focus:bg-white transition-colors" />
            </div>

            {/* Hubungan */}
            <div>
              <label className="text-xs font-black text-slate-700 block mb-1">Hubungan *</label>
              <div className="flex gap-2">
                {RELATIONSHIPS.map(r => (
                  <button key={r} onClick={() => setRelationship(r)}
                    className={`flex-1 py-3 rounded-xl text-xs font-black border-2 transition-all cursor-pointer ${
                      relationship === r
                        ? 'bg-purple-600 text-white border-purple-600'
                        : 'bg-purple-50/50 text-slate-600 border-purple-200 hover:bg-purple-100'
                    }`}>
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Nombor Telefon */}
            <div>
              <label className="text-xs font-black text-slate-700 block mb-1">Nombor Telefon *</label>
              <input type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                placeholder="012-3456789"
                className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 bg-purple-50/50 text-sm font-bold text-slate-800 focus:outline-none focus:border-purple-400 focus:bg-white transition-colors" />
            </div>

            {/* Alamat */}
            <div>
              <label className="text-xs font-black text-slate-700 block mb-1">Alamat</label>
              <textarea value={address} onChange={e => setAddress(e.target.value)}
                placeholder="No. 10, Jalan Meranti, Taman Seri Idaman, 40000 Shah Alam, Selangor"
                rows={3}
                className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 bg-purple-50/50 text-sm font-bold text-slate-800 focus:outline-none focus:border-purple-400 focus:bg-white transition-colors resize-none" />
            </div>

            {/* Nota Tambahan */}
            <div>
              <label className="text-xs font-black text-slate-700 block mb-1">Nota Tambahan</label>
              <textarea value={notes} onChange={e => setNotes(e.target.value)}
                placeholder="Alahan, keperluan khas, dsb."
                rows={2}
                className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 bg-purple-50/50 text-sm font-bold text-slate-800 focus:outline-none focus:border-purple-400 focus:bg-white transition-colors resize-none" />
            </div>
          </div>

          {/* Simpan button */}
          <button onClick={handleSave} disabled={!isValid || saving}
            className="w-full py-4 rounded-2xl bg-purple-600 text-white text-xs font-black flex items-center justify-center gap-2 hover:bg-purple-700 active:scale-95 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-md">
            {saving ? (
              'Menyimpan...'
            ) : saved ? (
              <><CheckCircle className="w-4 h-4" /> Disimpan</>
            ) : (
              <><Save className="w-4 h-4" /> Simpan</>
            )}
          </button>
        </div>
        )}
      </main>
    </AppPhoneFrame>
    </StudentLayout>
  );
};
