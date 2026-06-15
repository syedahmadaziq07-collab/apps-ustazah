import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, GraduationCap, School, Lock, User } from 'lucide-react';
import { useStudent } from '../components/StudentProvider';
import { isSupabaseConnected } from '../lib/supabase';
import { SelectedStudent } from '../types';

const FALLBACK_STUDENTS: SelectedStudent[] = [
  { id: 'demo-1', fullName: 'Ahmad Danial', className: 'Kelas 1 Bestari', photoUrl: '' },
  { id: 'demo-2', fullName: 'Nur Aisyah', className: 'Kelas 1 Bestari', photoUrl: '' },
  { id: 'demo-3', fullName: 'Muhammad Faiz', className: 'Kelas 2 Cemerlang', photoUrl: '' },
  { id: 'demo-4', fullName: 'Siti Aminah', className: 'Kelas 2 Cemerlang', photoUrl: '' },
  { id: 'demo-5', fullName: 'Ali Imran', className: 'Kelas 3 Pintar', photoUrl: '' },
  { id: 'demo-6', fullName: 'Fatimah Zahra', className: 'Kelas 3 Pintar', photoUrl: '' },
];

export const LoginScreen: React.FC = () => {
  const navigate = useNavigate();
  const { selectStudent } = useStudent();
  const [showTeacherLogin, setShowTeacherLogin] = useState(false);
  const [teacherEmail, setTeacherEmail] = useState('');
  const [teacherPassword, setTeacherPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [supabaseMissing] = useState(!isSupabaseConnected);

  const handleStudentSelect = (student: SelectedStudent) => {
    selectStudent(student);
    navigate('/');
  };

  const handleTeacherLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (!teacherEmail || !teacherPassword) {
      setLoginError('Sila masukkan email dan kata laluan.');
      return;
    }

    // TODO: Replace with Supabase Auth login when deploying
    // For Phase 1, use a simple placeholder teacher login
    if (teacherEmail === 'guru@zikir.care' && teacherPassword === 'guru123') {
      navigate('/teacher');
      return;
    }

    setLoginError('Email atau kata laluan tidak sah. (Guna: guru@zikir.care / guru123)');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-amber-50 to-purple-50 flex flex-col">
      {/* School Header */}
      <header className="px-6 pt-6 pb-4 text-center">
        <div className="w-16 h-16 rounded-full bg-white shadow-md border-2 border-purple-200 flex items-center justify-center mx-auto mb-3">
          <School className="w-8 h-8 text-purple-600" />
        </div>
        <h1 className="text-2xl font-black text-purple-900 tracking-tight">ZikirCare</h1>
        <p className="text-xs font-bold text-purple-600 mt-1">
          Terapi Emosi & Zikir untuk Murid
        </p>
        {supabaseMissing && (
          <div className="mt-2 inline-block bg-amber-50 border border-amber-200 rounded-full px-4 py-1">
            <span className="text-[10px] font-black text-amber-800">Supabase belum disambungkan.</span>
          </div>
        )}
      </header>

      {/* Student Selection */}
      {!showTeacherLogin ? (
        <main className="flex-grow px-5 pb-6 overflow-y-auto">
          <div className="text-center mb-5">
            <h2 className="text-lg font-black text-slate-800">Siapa yang hadir hari ini?</h2>
            <p className="text-xs font-bold text-slate-500 mt-1">Pilih gambar kamu sebelum mula.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            {FALLBACK_STUDENTS.map((student) => (
              <button
                key={student.id}
                onClick={() => handleStudentSelect(student)}
                className="bg-white rounded-2xl p-4 shadow-md border-2 border-purple-100 hover:border-purple-300 hover:shadow-lg active:scale-95 transition-all cursor-pointer text-center"
              >
                <div className="w-full aspect-[3/4] rounded-xl bg-gradient-to-b from-purple-100 to-amber-50 flex items-center justify-center mb-3 border-2 border-purple-200 overflow-hidden">
                  {student.photoUrl ? (
                    <img
                      src={student.photoUrl}
                      alt={student.fullName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-12 h-12 text-purple-400" />
                  )}
                </div>
                <p className="text-xs font-black text-slate-800 leading-tight">{student.fullName}</p>
                <p className="text-[10px] font-bold text-slate-500 mt-1">{student.className}</p>
              </button>
            ))}
          </div>

          {/* Teacher Login Toggle */}
          <div className="text-center mt-8">
            <button
              onClick={() => setShowTeacherLogin(true)}
              className="inline-flex items-center gap-2 text-sm font-bold text-purple-600 hover:text-purple-800 transition-colors cursor-pointer bg-transparent border-none"
            >
              <GraduationCap className="w-4 h-4" />
              Login Cikgu
            </button>
          </div>

          <p className="text-[10px] text-slate-400 text-center mt-4 font-bold">
            Data murid adalah sampel demo. Hubung admin untuk data sebenar.
          </p>
        </main>
      ) : (
        /* Teacher Login Form */
        <main className="flex-grow px-5 pb-6 flex items-start justify-center pt-8">
          <div className="bg-white rounded-3xl shadow-lg border-2 border-purple-100 p-6 w-full max-w-sm">
            <div className="text-center mb-5">
              <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-3 border-2 border-purple-200">
                <GraduationCap className="w-7 h-7 text-purple-600" />
              </div>
              <h2 className="text-base font-black text-slate-800">Login Cikgu</h2>
              <p className="text-[11px] font-bold text-slate-500 mt-1">Akses dashboard cikgu untuk mengurus aplikasi.</p>
            </div>

            <form onSubmit={handleTeacherLogin} className="space-y-4">
              <div>
                <label className="text-xs font-black text-slate-700 block mb-1">Email / ID Cikgu</label>
                <input
                  type="email"
                  value={teacherEmail}
                  onChange={(e) => setTeacherEmail(e.target.value)}
                  placeholder="guru@zikir.care"
                  className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 bg-purple-50/50 text-sm font-bold text-slate-800 focus:outline-none focus:border-purple-400 focus:bg-white transition-colors"
                />
              </div>
              <div>
                <label className="text-xs font-black text-slate-700 block mb-1">Password / PIN</label>
                <input
                  type="password"
                  value={teacherPassword}
                  onChange={(e) => setTeacherPassword(e.target.value)}
                  placeholder="••••••"
                  className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 bg-purple-50/50 text-sm font-bold text-slate-800 focus:outline-none focus:border-purple-400 focus:bg-white transition-colors"
                />
              </div>

              {loginError && (
                <p className="text-xs font-bold text-rose-600 bg-rose-50 rounded-xl px-3 py-2 border border-rose-200">
                  {loginError}
                </p>
              )}

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-black rounded-2xl flex items-center justify-center gap-2 shadow-md hover:from-purple-700 hover:to-purple-800 active:scale-95 transition-all cursor-pointer text-sm"
              >
                <LogIn className="w-4 h-4" />
                Login
              </button>

              <button
                type="button"
                onClick={() => { setShowTeacherLogin(false); setLoginError(''); }}
                className="w-full py-2 text-xs font-bold text-purple-600 hover:text-purple-800 transition-colors cursor-pointer bg-transparent border-none"
              >
                ← Kembali ke pilihan murid
              </button>
            </form>

            {/* TODO: Replace placeholder login with Supabase Auth email/password */}
            <p className="text-[9px] text-slate-400 text-center mt-4 font-bold">
              Phase 1: Login placeholder. Guna: guru@zikir.care / guru123
            </p>
          </div>
        </main>
      )}
    </div>
  );
};
