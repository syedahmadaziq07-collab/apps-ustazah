import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, GraduationCap, School, Lock, User, ChevronRight } from 'lucide-react';
import { useStudent } from '../components/StudentProvider';
import { isSupabaseConnected } from '../lib/supabase';
import { SelectedStudent } from '../types';
import { getActiveStudents } from '../services/studentService';
import { getSchoolSettings, getAppPage } from '../services/appContentService';
import { isTeacherLoggedIn, loginTeacher } from '../services/teacherAuthService';

export const LoginScreen: React.FC = () => {
  const navigate = useNavigate();
  const { selectStudent } = useStudent();
  const [teacherPin, setTeacherPin] = useState('');
  const [loginError, setLoginError] = useState('');
  const [supabaseMissing] = useState(!isSupabaseConnected);
  const [students, setStudents] = useState<SelectedStudent[]>([]);
  const [loadingStudents, setLoadingStudents] = useState(true);
  const [studentError, setStudentError] = useState(false);
  const [schoolName, setSchoolName] = useState('ZikirCare');
  const [appName, setAppName] = useState('ZikirCare');
  const [tagline, setTagline] = useState('Terapi Emosi & Zikir untuk Murid');
  const [logoUrl, setLogoUrl] = useState('');
  const [loginTitle, setLoginTitle] = useState('Siapa yang belajar hari ini?');
  const [loginSubtitle, setLoginSubtitle] = useState('Pilih gambar dan nama kamu untuk mula.');
  const [teacherAlreadyIn] = useState(isTeacherLoggedIn());

  useEffect(() => {
    getActiveStudents()
      .then((list) => {
        setStudents(list);
        setLoadingStudents(false);
      })
      .catch(() => {
        setStudentError(true);
        setLoadingStudents(false);
      });
    getSchoolSettings().then((s) => {
      if (s.school_name) setSchoolName(s.school_name);
      if (s.app_name) setAppName(s.app_name);
      if (s.tagline) setTagline(s.tagline);
      if (s.logo_url) setLogoUrl(s.logo_url);
    }).catch(() => {});
    getAppPage('login').then((page) => {
      if (page) {
        if (page.title) setLoginTitle(page.title);
        if (page.subtitle) setLoginSubtitle(page.subtitle);
      }
    }).catch(() => {});
  }, []);

  const handleStudentSelect = (student: SelectedStudent) => {
    selectStudent(student);
    navigate('/');
  };

  const handleTeacherLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    const result = loginTeacher(teacherPin);
    if (result.success) {
      navigate('/teacher');
    } else {
      setLoginError(result.error || 'PIN cikgu tidak betul. Sila cuba lagi.');
    }
  };

  const handleTeacherDashboard = () => {
    navigate('/teacher');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-amber-50 to-purple-50 flex flex-col">
      {/* School Header */}
      <header className="px-6 pt-6 pb-4 text-center">
        <div className="w-16 h-16 rounded-full bg-white shadow-md border-2 border-purple-200 flex items-center justify-center mx-auto mb-3 overflow-hidden">
          {logoUrl ? (
            <img src={logoUrl} alt={schoolName} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          ) : (
            <School className="w-8 h-8 text-purple-600" />
          )}
        </div>
        <h1 className="text-2xl font-black text-purple-900 tracking-tight">{appName}</h1>
        <p className="text-xs font-bold text-purple-600 mt-1">{tagline}</p>
        {supabaseMissing && (
          <div className="mt-2 inline-block bg-amber-50 border border-amber-200 rounded-full px-4 py-1">
            <span className="text-[10px] font-black text-amber-800">Supabase belum disambungkan.</span>
          </div>
        )}
      </header>

      {/* Main Content - Two columns on desktop, stacked on mobile */}
      <main className="flex-grow px-5 pb-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Student Section - 3/5 width on desktop */}
          <div className="lg:col-span-3">
            <div className="text-center mb-4">
              <h2 className="text-lg font-black text-slate-800">{loginTitle}</h2>
              <p className="text-xs font-bold text-slate-500 mt-1">{loginSubtitle}</p>
            </div>

            {loadingStudents ? (
              <div className="text-center py-8">
                <p className="text-sm font-bold text-slate-400">Memuatkan...</p>
              </div>
            ) : studentError || students.length === 0 ? (
              <div className="text-center py-8 bg-white/80 rounded-3xl border-2 border-purple-100">
                <User className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-sm font-black text-slate-600">Tiada murid aktif untuk dipilih.</p>
                <p className="text-xs font-bold text-slate-400 mt-1">Tidak apa, cuba lagi nanti ya.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {students.map((student) => (
                  <button
                    key={student.id}
                    onClick={() => handleStudentSelect(student)}
                    className="bg-white rounded-2xl p-4 shadow-md border-2 border-purple-100 hover:border-purple-300 hover:shadow-lg active:scale-95 transition-all cursor-pointer text-center"
                  >
                    <div className="w-full aspect-[3/4] rounded-xl bg-gradient-to-b from-purple-100 to-amber-50 flex items-center justify-center mb-3 border-2 border-purple-200 overflow-hidden">
                      {student.photoUrl ? (
                        <img src={student.photoUrl} alt={student.fullName} className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-12 h-12 text-purple-400" />
                      )}
                    </div>
                    <p className="text-xs font-black text-slate-800 leading-tight">{student.fullName}</p>
                    <p className="text-[10px] font-bold text-slate-500 mt-1">{student.className}</p>
                  </button>
                ))}
              </div>
            )}

            <p className="text-[10px] text-slate-400 text-center mt-4 font-bold">
              Data murid adalah sampel demo. Hubung admin untuk data sebenar.
            </p>
          </div>

          {/* Teacher Section - 2/5 width on desktop */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-lg border-2 border-purple-100 p-5 sticky top-6">
              <div className="text-center mb-4">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-2 border-2 border-purple-200">
                  <GraduationCap className="w-6 h-6 text-purple-600" />
                </div>
                <h2 className="text-base font-black text-slate-800">Login Cikgu</h2>
                <p className="text-[10px] font-bold text-slate-500 mt-1 leading-relaxed">
                  Akses dashboard untuk mengurus murid, emosi, terapi, doa, gambar dan audio.
                </p>
              </div>

              {teacherAlreadyIn ? (
                <button
                  onClick={handleTeacherDashboard}
                  className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-black rounded-2xl flex items-center justify-center gap-2 shadow-md hover:from-purple-700 hover:to-purple-800 active:scale-95 transition-all cursor-pointer text-sm"
                >
                  <LogIn className="w-4 h-4" />
                  Buka Dashboard Cikgu
                </button>
              ) : (
                <form onSubmit={handleTeacherLogin} className="space-y-3">
                  <div>
                    <label className="text-xs font-black text-slate-700 block mb-1">PIN Cikgu</label>
                    <input
                      type="password"
                      value={teacherPin}
                      onChange={(e) => setTeacherPin(e.target.value)}
                      placeholder="Masukkan PIN"
                      className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 bg-purple-50/50 text-sm font-bold text-slate-800 focus:outline-none focus:border-purple-400 focus:bg-white transition-colors"
                      autoComplete="off"
                    />
                  </div>

                  {loginError && (
                    <p className="text-xs font-bold text-rose-600 bg-rose-50 rounded-xl px-3 py-2 border border-rose-200">
                      {loginError}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-black rounded-2xl flex items-center justify-center gap-2 shadow-md hover:from-purple-700 hover:to-purple-800 active:scale-95 transition-all cursor-pointer text-sm"
                  >
                    <Lock className="w-4 h-4" />
                    Masuk Dashboard
                  </button>

                  <p className="text-[9px] text-slate-400 text-center font-bold pt-1">
                    Bahagian ini hanya untuk cikgu.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
