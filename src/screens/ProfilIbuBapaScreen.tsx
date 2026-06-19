import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { AppPhoneFrame, SoftSkyBackground, StarSparklePattern, IslamicMoonStarDecoration } from '../components/Decorations';
import { StudentLayout } from '../components/StudentLayout';

export const ProfilIbuBapaScreen: React.FC = () => {
  const navigate = useNavigate();

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
        <h1 className="text-lg font-black text-slate-800">Ibu Bapa / Penjaga</h1>
      </header>

      <main className="flex-grow px-5 pb-6 relative z-10 pt-4">
        <div className="bg-white rounded-3xl p-8 text-center shadow-sm border border-purple-100/60">
          <div className="text-5xl mb-4">🚧</div>
          <p className="text-sm font-black text-slate-600">Sedang dalam pembinaan</p>
          <p className="text-xs font-bold text-slate-400 mt-1">Coming soon</p>
        </div>
      </main>
    </AppPhoneFrame>
    </StudentLayout>
  );
};
