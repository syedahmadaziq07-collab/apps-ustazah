import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { AppPhoneFrame, SoftSkyBackground, StarSparklePattern, IslamicMoonStarDecoration } from '../components/Decorations';
import { StudentLayout } from '../components/StudentLayout';
import { useStudent } from '../components/StudentProvider';

const NOTIF_KEY = 'iQalbCare_notif_enabled';

export const ProfilTetapanScreen: React.FC = () => {
  const navigate = useNavigate();
  const { clearStudent } = useStudent();
  const [notifOn, setNotifOn] = useState(() => localStorage.getItem(NOTIF_KEY) === 'true');

  useEffect(() => {
    localStorage.setItem(NOTIF_KEY, notifOn ? 'true' : 'false');
  }, [notifOn]);

  const handleLogout = () => {
    clearStudent();
    navigate('/login');
  };

  const rows = [
    { icon: '🌐', label: 'Bahasa', value: 'Bahasa Malaysia', right: null, onClick: null },
    {
      icon: '🔔', label: 'Notifikasi', value: null,
      right: (
        <button onClick={() => setNotifOn(!notifOn)}
          className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${notifOn ? 'bg-purple-600' : 'bg-slate-300'}`}>
          <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-transform ${notifOn ? 'translate-x-5.5' : 'translate-x-0.5'}`} />
        </button>
      ),
      onClick: null,
    },
    { icon: '🔒', label: 'Privasi', value: 'Akan datang', right: <ChevronRight className="w-4 h-4 text-slate-300" />, onClick: null },
    { icon: '🔑', label: 'Tukar PIN', value: 'Akan datang', right: <ChevronRight className="w-4 h-4 text-slate-300" />, onClick: null },
    { icon: '🚪', label: 'Log Keluar', value: null, right: null, onClick: handleLogout, danger: true },
  ];

  return (
    <StudentLayout activeNav={null}>
    <AppPhoneFrame id="tetapan-screen" className="relative flex flex-col min-h-screen bg-transparent select-none lg:max-w-none lg:mx-0 lg:rounded-none lg:border-0 lg:my-0 lg:shadow-none">
      <SoftSkyBackground variant="sky">
        <StarSparklePattern />
      </SoftSkyBackground>
      <IslamicMoonStarDecoration className="absolute top-18 right-2 z-10 scale-90" />

      <header className="flex items-center gap-3 px-5 pt-5 pb-3 bg-white/80 backdrop-blur-md relative z-10">
        <button onClick={() => navigate('/profil')} className="w-9 h-9 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 hover:bg-purple-100 active:scale-95 transition-all cursor-pointer">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-black text-slate-800">Tetapan</h1>
      </header>

      <main className="flex-grow px-5 pt-3 pb-6 relative z-10">
        <div className="bg-white rounded-3xl shadow-sm border border-purple-100/60 overflow-hidden">
          {rows.map((r, i) => (
            <div key={i}
              onClick={r.onClick ? r.onClick : undefined}
              className={`flex items-center gap-3 px-5 py-4 ${r.onClick ? 'cursor-pointer active:bg-purple-50 transition-colors' : ''} ${i < rows.length - 1 ? 'border-b border-purple-100/40' : ''}`}
            >
              <span className="text-xl shrink-0">{r.icon}</span>
              <span className={`flex-1 text-sm font-black ${r.danger ? 'text-red-500' : 'text-slate-700'}`}>{r.label}</span>
              {r.value && <span className="text-xs font-bold text-slate-400">{r.value}</span>}
              {r.right}
            </div>
          ))}
        </div>

        <p className="text-center text-xs font-bold text-slate-400 mt-6">Versi 1.0.0</p>
      </main>
    </AppPhoneFrame>
    </StudentLayout>
  );
};
