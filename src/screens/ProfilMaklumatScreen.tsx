import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User } from 'lucide-react';
import { AppPhoneFrame, SoftSkyBackground, StarSparklePattern, IslamicMoonStarDecoration } from '../components/Decorations';
import { StudentLayout } from '../components/StudentLayout';
import { useStudent } from '../components/StudentProvider';

export const ProfilMaklumatScreen: React.FC = () => {
  const navigate = useNavigate();
  const { selectedStudent } = useStudent();

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
        <h1 className="text-lg font-black text-slate-800">Maklumat Profil</h1>
      </header>

      <main className="flex-grow px-5 pb-6 relative z-10 pt-4">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-purple-100/60 text-center">
          <div className="w-20 h-20 rounded-full mx-auto mb-3 overflow-hidden border-3 border-purple-200 bg-purple-50">
            {selectedStudent?.photoUrl ? (
              <img src={selectedStudent.photoUrl} alt="" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <User className="w-8 h-8 text-purple-400" />
              </div>
            )}
          </div>
          <h2 className="text-lg font-black text-slate-800">{selectedStudent?.fullName || '-'}</h2>
          <p className="text-sm font-bold text-slate-500 mt-1">{selectedStudent?.className || '-'}</p>
        </div>
      </main>
    </AppPhoneFrame>
    </StudentLayout>
  );
};
