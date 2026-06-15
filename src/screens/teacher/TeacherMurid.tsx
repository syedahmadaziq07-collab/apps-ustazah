import React, { useState } from 'react';
import { User, Plus } from 'lucide-react';
import { isSupabaseConnected } from '../../lib/supabase';

const demoStudents = [
  { id: '1', fullName: 'Ahmad Danial', className: 'Kelas 1 Bestari', photoUrl: '', isActive: true },
  { id: '2', fullName: 'Nur Aisyah', className: 'Kelas 1 Bestari', photoUrl: '', isActive: true },
  { id: '3', fullName: 'Muhammad Faiz', className: 'Kelas 2 Cemerlang', photoUrl: '', isActive: true },
  { id: '4', fullName: 'Siti Aminah', className: 'Kelas 2 Cemerlang', photoUrl: '', isActive: true },
  { id: '5', fullName: 'Ali Imran', className: 'Kelas 3 Pintar', photoUrl: '', isActive: true },
  { id: '6', fullName: 'Fatimah Zahra', className: 'Kelas 3 Pintar', photoUrl: '', isActive: true },
];

export const TeacherMurid: React.FC = () => {
  const [students] = useState(demoStudents);

  return (
    <div className="flex-grow p-4 md:p-6 overflow-y-auto pb-20 md:pb-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-slate-800">Murid</h1>
          <p className="text-xs font-bold text-slate-500 mt-1">Senarai murid yang berdaftar.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-purple-600 text-white text-xs font-black rounded-2xl hover:bg-purple-700 active:scale-95 transition-all cursor-pointer shadow-sm">
          <Plus className="w-4 h-4" />
          Tambah Murid
        </button>
      </div>

      {/* TODO: Supabase data integration */}
      {!isSupabaseConnected && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3 mb-4">
          <p className="text-[10px] font-bold text-amber-800">
            Mod demo. Data murid akan diambil dari Supabase apabila disambungkan.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {students.map((student) => (
          <div
            key={student.id}
            className="bg-white rounded-2xl p-4 border-2 border-purple-100 hover:border-purple-200 shadow-sm flex items-center gap-4"
          >
            <div className="w-16 h-20 rounded-xl bg-gradient-to-b from-purple-100 to-amber-50 flex items-center justify-center border-2 border-purple-200 overflow-hidden shrink-0">
              {student.photoUrl ? (
                <img src={student.photoUrl} alt={student.fullName} className="w-full h-full object-cover" />
              ) : (
                <User className="w-6 h-6 text-purple-400" />
              )}
            </div>
            <div className="flex-grow min-w-0">
              <p className="text-sm font-black text-slate-800 truncate">{student.fullName}</p>
              <p className="text-[11px] font-bold text-slate-500">{student.className}</p>
              <span className={`inline-block mt-1.5 text-[9px] font-black px-2 py-0.5 rounded-full ${
                student.isActive
                  ? 'bg-green-100 text-green-700 border border-green-200'
                  : 'bg-slate-100 text-slate-500 border border-slate-200'
              }`}>
                {student.isActive ? 'Aktif' : 'Tidak Aktif'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* TODO: Upload functionality - photo upload to Supabase Storage bucket 'student-photos' */}
      <div className="mt-6 bg-purple-50 border-2 border-purple-200 rounded-2xl p-4">
        <p className="text-[10px] font-bold text-purple-700">
          TODO: Tambah/edit murid & muat naik gambar akan dilaksanakan dalam fasa seterusnya.
          Gambar passport murid boleh dimuat naik ke Supabase Storage bucket 'student-photos'.
        </p>
      </div>
    </div>
  );
};
