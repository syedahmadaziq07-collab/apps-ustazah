import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Info } from 'lucide-react';
import { AppPhoneFrame, SoftSkyBackground, StarSparklePattern, IslamicMoonStarDecoration } from '../components/Decorations';
import { StudentLayout } from '../components/StudentLayout';
import { getSchoolProfile } from '../services/appContentService';
import { SchoolProfile } from '../types';

export const ProfilTentangScreen: React.FC = () => {
  const navigate = useNavigate();
  const [schoolProfile, setSchoolProfile] = useState<SchoolProfile | null>(null);

  useEffect(() => {
    getSchoolProfile().then(p => setSchoolProfile(p)).catch(() => {});
  }, []);

  const aName = schoolProfile?.app_name || 'i-Qalb Care';
  const aVer = schoolProfile?.version || 'v1.0.0';
  const aDesc = schoolProfile?.description || 'Aplikasi Kerohanian & Emosi Kanak-Kanak';

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
        <h1 className="text-lg font-black text-slate-800">Tentang Aplikasi</h1>
      </header>

      <main className="flex-grow px-5 pb-6 relative z-10 pt-4">
        <div className="bg-white rounded-3xl p-6 text-center shadow-sm border border-purple-100/60">
          <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto border-2 border-purple-200 mb-4">
            <span className="text-3xl">🌟</span>
          </div>
          <h2 className="text-lg font-black text-slate-800">{aName}</h2>
          <p className="text-xs font-bold text-slate-400 mt-1">{aVer}</p>
          <p className="text-sm font-bold text-slate-600 leading-relaxed mt-3">{aDesc}</p>
        </div>
      </main>
    </AppPhoneFrame>
    </StudentLayout>
  );
};
