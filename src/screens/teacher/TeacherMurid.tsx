import React, { useState, useEffect, useCallback } from 'react';
import { User, Plus, Edit2, XCircle, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { isSupabaseConnected } from '../../lib/supabase';
import { StudentRecord } from '../../types';
import { getStudents, createStudent, updateStudent, deactivateStudent } from '../../services/studentService';

interface FormFields {
  fullName: string;
  className: string;
  photoUrl: string;
  isActive: boolean;
  sortOrder: number;
}

const emptyForm: FormFields = { fullName: '', className: '', photoUrl: '', isActive: true, sortOrder: 0 };

export const TeacherMurid: React.FC = () => {
  const [students, setStudents] = useState<StudentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormFields>(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const data = await getStudents();
    setStudents(data);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const openAdd = () => {
    resetForm();
    setShowModal(true);
  };

  const openEdit = (s: StudentRecord) => {
    setForm({
      fullName: s.full_name,
      className: s.class_name || '',
      photoUrl: s.photo_url || '',
      isActive: s.is_active,
      sortOrder: s.sort_order,
    });
    setEditingId(s.id);
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.fullName.trim()) return;
    setSaving(true);
    if (editingId) {
      await updateStudent(editingId, form);
    } else {
      await createStudent(form);
    }
    setSaving(false);
    setShowModal(false);
    resetForm();
    await load();
  };

  const handleDeactivate = async (id: string, name: string) => {
    if (!confirm(`Nyahaktifkan ${name}? Murid tidak akan muncul di skrin login.`)) return;
    await deactivateStudent(id);
    await load();
  };

  const activeStudents = students.filter((s) => s.is_active);

  return (
    <div className="flex-grow p-4 md:p-6 overflow-y-auto pb-20 md:pb-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-slate-800">Pengurusan Murid</h1>
          <p className="text-xs font-bold text-slate-500 mt-1">
            Tambah, kemas kini dan susun gambar murid untuk login bergambar.
          </p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2.5 bg-purple-600 text-white text-xs font-black rounded-2xl hover:bg-purple-700 active:scale-95 transition-all cursor-pointer shadow-sm self-start"
        >
          <Plus className="w-4 h-4" />
          Tambah Murid
        </button>
      </div>

      {/* Summary Card */}
      <div className="bg-white rounded-2xl border-2 border-purple-100 p-4 mb-5 flex items-center gap-4 shadow-sm">
        <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center border-2 border-purple-200">
          <User className="w-6 h-6 text-purple-600" />
        </div>
        <div>
          <p className="text-2xl font-black text-slate-800">{activeStudents.length}</p>
          <p className="text-xs font-bold text-slate-500">Murid Aktif</p>
        </div>
        {!isSupabaseConnected && (
          <div className="ml-auto bg-amber-50 border border-amber-200 rounded-full px-3 py-1">
            <span className="text-[10px] font-black text-amber-800">Mod Demo</span>
          </div>
        )}
      </div>

      {/* Student Grid */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-sm font-bold text-slate-400">Memuatkan...</p>
        </div>
      ) : students.length === 0 ? (
        <div className="text-center py-12 bg-white/80 rounded-3xl border-2 border-purple-100">
          <User className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-sm font-black text-slate-600">Tiada murid lagi</p>
          <p className="text-xs font-bold text-slate-400 mt-1">Klik "Tambah Murid" untuk mula.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {students.map((student) => (
            <div
              key={student.id}
              className={`bg-white rounded-2xl border-2 overflow-hidden shadow-sm transition-all ${
                student.is_active ? 'border-purple-100 hover:border-purple-200' : 'border-slate-200 opacity-70'
              }`}
            >
              {/* Card content */}
              <div className="p-4 flex items-start gap-4">
                {/* Passport photo */}
                <div className="w-16 h-[85px] rounded-xl bg-gradient-to-b from-purple-100 to-amber-50 flex items-center justify-center border-2 border-purple-200 overflow-hidden shrink-0">
                  {student.photo_url ? (
                    <img
                      src={student.photo_url}
                      alt={student.full_name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-6 h-6 text-purple-400" />
                  )}
                </div>

                {/* Info */}
                <div className="flex-grow min-w-0">
                  <p className="text-sm font-black text-slate-800 truncate">{student.full_name}</p>
                  <p className="text-[11px] font-bold text-slate-500 mt-0.5">{student.class_name || '-'}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`inline-flex items-center gap-1 text-[9px] font-black px-2 py-0.5 rounded-full border ${
                      student.is_active
                        ? 'bg-green-100 text-green-700 border-green-200'
                        : 'bg-slate-100 text-slate-500 border-slate-200'
                    }`}>
                      {student.is_active ? <Check className="w-2.5 h-2.5" /> : null}
                      {student.is_active ? 'Aktif' : 'Nyahaktif'}
                    </span>
                    {student.sort_order > 0 && (
                      <span className="text-[9px] font-bold text-slate-400">
                        #{student.sort_order}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-1.5 shrink-0">
                  <button
                    onClick={() => openEdit(student)}
                    className="w-8 h-8 rounded-lg bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-500 hover:bg-purple-100 active:scale-95 transition-all cursor-pointer"
                    title="Edit"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  {student.is_active && (
                    <button
                      onClick={() => handleDeactivate(student.id, student.full_name)}
                      className="w-8 h-8 rounded-lg bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-500 hover:bg-rose-100 active:scale-95 transition-all cursor-pointer"
                      title="Nyahaktifkan"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TODO note */}
      <div className="mt-6 bg-purple-50 border-2 border-purple-200 rounded-2xl p-4">
        <p className="text-[10px] font-bold text-purple-700">
          TODO: Muat naik gambar passport ke Supabase Storage bucket 'student-photos' akan dibina dalam fasa seterusnya.
        </p>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={() => setShowModal(false)}>
          <div
            className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 md:p-8 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-black text-slate-800 mb-1">
              {editingId ? 'Edit Murid' : 'Tambah Murid'}
            </h2>
            <p className="text-xs font-bold text-slate-500 mb-5">
              {editingId ? 'Kemas kini maklumat murid.' : 'Daftar murid baru untuk login bergambar.'}
            </p>

            <div className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="text-xs font-black text-slate-700 block mb-1">Nama Penuh *</label>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  placeholder="Ahmad Danial"
                  className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 bg-purple-50/50 text-sm font-bold text-slate-800 focus:outline-none focus:border-purple-400 focus:bg-white transition-colors"
                />
              </div>

              {/* Class Name */}
              <div>
                <label className="text-xs font-black text-slate-700 block mb-1">Kelas</label>
                <input
                  type="text"
                  value={form.className}
                  onChange={(e) => setForm({ ...form, className: e.target.value })}
                  placeholder="Kelas 1 Bestari"
                  className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 bg-purple-50/50 text-sm font-bold text-slate-800 focus:outline-none focus:border-purple-400 focus:bg-white transition-colors"
                />
              </div>

              {/* Photo URL */}
              <div>
                <label className="text-xs font-black text-slate-700 block mb-1">URL Gambar Passport</label>
                <input
                  type="url"
                  value={form.photoUrl}
                  onChange={(e) => setForm({ ...form, photoUrl: e.target.value })}
                  placeholder="https://example.com/photo.jpg"
                  className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 bg-purple-50/50 text-sm font-bold text-slate-800 focus:outline-none focus:border-purple-400 focus:bg-white transition-colors"
                />
                <p className="text-[9px] font-bold text-slate-400 mt-1">
                  Phase later: upload passport photo to Supabase Storage.
                </p>
              </div>

              {/* Sort Order + Active */}
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="text-xs font-black text-slate-700 block mb-1">Susunan</label>
                  <input
                    type="number"
                    min={0}
                    value={form.sortOrder}
                    onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 bg-purple-50/50 text-sm font-bold text-slate-800 focus:outline-none focus:border-purple-400 focus:bg-white transition-colors"
                  />
                </div>
                <div className="flex items-center gap-2 pt-6">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.isActive}
                      onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-10 h-5 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                  <span className="text-xs font-bold text-slate-600">Aktif</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={() => { setShowModal(false); resetForm(); }}
                className="flex-1 py-3 rounded-2xl border-2 border-slate-200 text-xs font-black text-slate-600 hover:bg-slate-50 active:scale-95 transition-all cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !form.fullName.trim()}
                className="flex-1 py-3 rounded-2xl bg-purple-600 text-white text-xs font-black hover:bg-purple-700 active:scale-95 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Menyimpan...' : editingId ? 'Simpan' : 'Tambah'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
