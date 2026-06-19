import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, GraduationCap, FileBadge, School } from 'lucide-react';
import { AppPhoneFrame, SoftSkyBackground, StarSparklePattern, IslamicMoonStarDecoration } from '../components/Decorations';
import { StudentLayout } from '../components/StudentLayout';
import { getSchoolProfile } from '../services/appContentService';
import { SchoolProfile } from '../types';

export const ProfilBantuanScreen: React.FC = () => {
  const navigate = useNavigate();
  const [schoolProfile, setSchoolProfile] = useState<SchoolProfile | null>(null);

  useEffect(() => {
    getSchoolProfile().then(p => setSchoolProfile(p)).catch(() => {});
  }, []);

  const name = schoolProfile?.teacher_name || 'Cikgu Fatimah Binti Ismail';
  const lembaga = schoolProfile?.lembaga_number || 'KB-08249-M';
  const school = schoolProfile?.school_name || 'SK Seri Idaman, Shah Alam, Selangor';

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
        <h1 className="text-lg font-black text-slate-800">Bantuan & Sokongan</h1>
      </header>

      <main className="flex-grow px-5 pb-6 relative z-10 pt-4">
        <div className="space-y-3">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-purple-100/60 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center shrink-0">
              <GraduationCap className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Guru Kaunseling</p>
              <p className="text-sm font-black text-slate-800">{name}</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-purple-100/60 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center shrink-0">
              <FileBadge className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-wider">No. Lembaga Kaunselor</p>
              <p className="text-sm font-black text-slate-800">{lembaga}</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-purple-100/60 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center shrink-0">
              <School className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Sekolah</p>
              <p className="text-sm font-black text-slate-800">{school}</p>
            </div>
          </div>
        </div>
      </main>
    </AppPhoneFrame>
    </StudentLayout>
  );
};
