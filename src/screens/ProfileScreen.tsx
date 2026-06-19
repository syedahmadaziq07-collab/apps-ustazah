import React, { useState, useEffect } from 'react';
import { User, ChevronRight } from 'lucide-react';
import {
  AppPhoneFrame,
  SoftSkyBackground,
  StarSparklePattern,
  IslamicMoonStarDecoration
} from '../components/Decorations';
import { BottomNav } from '../components/BottomNav';
import { StudentLayout } from '../components/StudentLayout';
import { useStudent } from '../components/StudentProvider';
import { getSchoolProfile } from '../services/appContentService';
import { SchoolProfile } from '../types';

type MenuItem = {
  icon: string;
  label: string;
  key: string;
};

export const ProfileScreen: React.FC = () => {
  const { selectedStudent } = useStudent();
  const [schoolProfile, setSchoolProfile] = useState<SchoolProfile | null>(null);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  useEffect(() => {
    getSchoolProfile().then((p) => {
      setSchoolProfile(p);
    }).catch(() => {});
  }, []);

  const menuItems: MenuItem[] = [
    { icon: '👤', label: 'Maklumat Profil', key: 'profile' },
    { icon: '👨‍👩‍👧', label: 'Ibu Bapa / Penjaga', key: 'parents' },
    { icon: '⚙️', label: 'Tetapan', key: 'settings' },
    { icon: '🆘', label: 'Bantuan & Sokongan', key: 'help' },
    { icon: 'ℹ️', label: 'Tentang Aplikasi', key: 'about' },
  ];

  const renderModalContent = () => {
    if (activeModal === 'profile') {
      return (
        <div className="text-center">
          <div className="w-20 h-20 rounded-full mx-auto mb-3 overflow-hidden border-3 border-purple-200 bg-purple-50">
            {selectedStudent?.photoUrl ? (
              <img src={selectedStudent.photoUrl} alt="" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <User className="w-8 h-8 text-purple-400" />
              </div>
            )}
          </div>
          <h3 className="text-lg font-black text-slate-800">{selectedStudent?.fullName || '-'}</h3>
          <p className="text-sm font-bold text-slate-500">{selectedStudent?.className || '-'}</p>
        </div>
      );
    }
    if (activeModal === 'parents' || activeModal === 'settings') {
      return (
        <div className="text-center py-8">
          <div className="text-5xl mb-4">🚧</div>
          <p className="text-sm font-black text-slate-600">Sedang dalam pembinaan</p>
          <p className="text-xs font-bold text-slate-400 mt-1">Coming soon</p>
        </div>
      );
    }
    if (activeModal === 'help') {
      const name = schoolProfile?.teacher_name || 'Cikgu Fatimah Binti Ismail';
      const lembaga = schoolProfile?.lembaga_number || 'KB-08249-M';
      const school = schoolProfile?.school_name || 'SK Seri Idaman, Shah Alam, Selangor';
      return (
        <div className="space-y-3">
          <div className="bg-purple-50 rounded-2xl p-4 border border-purple-100">
            <p className="text-xs font-black text-slate-500 uppercase tracking-wider mb-1">Guru Kaunseling</p>
            <p className="text-sm font-black text-slate-800">{name}</p>
          </div>
          <div className="bg-purple-50 rounded-2xl p-4 border border-purple-100">
            <p className="text-xs font-black text-slate-500 uppercase tracking-wider mb-1">No. Lembaga Kaunselor</p>
            <p className="text-sm font-black text-slate-800">{lembaga}</p>
          </div>
          <div className="bg-purple-50 rounded-2xl p-4 border border-purple-100">
            <p className="text-xs font-black text-slate-500 uppercase tracking-wider mb-1">Sekolah</p>
            <p className="text-sm font-black text-slate-800">{school}</p>
          </div>
        </div>
      );
    }
    if (activeModal === 'about') {
      const aName = schoolProfile?.app_name || 'i-Qalb Care';
      const aVer = schoolProfile?.version || 'v1.0.0';
      const aDesc = schoolProfile?.description || 'Aplikasi Kerohanian & Emosi Kanak-Kanak';
      return (
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto border-2 border-purple-200">
            <span className="text-3xl">🌟</span>
          </div>
          <h3 className="text-lg font-black text-slate-800">{aName}</h3>
          <p className="text-xs font-bold text-slate-400">{aVer}</p>
          <p className="text-xs font-bold text-slate-600 leading-relaxed">{aDesc}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <StudentLayout activeNav="Profil">
    <AppPhoneFrame id="profile-screen" className="relative flex flex-col justify-between min-h-screen bg-transparent select-none lg:max-w-none lg:mx-0 lg:rounded-none lg:border-0 lg:my-0 lg:shadow-none">
      <SoftSkyBackground variant="sky">
        <StarSparklePattern />
      </SoftSkyBackground>
      <IslamicMoonStarDecoration className="absolute top-18 right-2 z-10 scale-90" />

      {/* Header — Student photo, name, class */}
      <header className="pt-6 pb-4 px-5 text-center bg-white/80 backdrop-blur-md relative z-10">
        <div className="w-24 h-24 rounded-full mx-auto mb-3 overflow-hidden border-4 border-purple-200 shadow-md bg-white">
          {selectedStudent?.photoUrl ? (
            <img src={selectedStudent.photoUrl} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-purple-50">
              <User className="w-10 h-10 text-purple-400" />
            </div>
          )}
        </div>
        <h1 className="text-xl font-black text-slate-800">{selectedStudent?.fullName || 'Murid'}</h1>
        <p className="text-sm font-bold text-slate-500">{selectedStudent?.className || ''}</p>
      </header>

      {/* Menu List */}
      <main className="flex-grow px-5 pb-6 relative z-10">
        <div className="bg-white rounded-3xl shadow-sm border border-purple-100/60 overflow-hidden">
          {menuItems.map((item, i) => (
            <button
              key={item.key}
              onClick={() => setActiveModal(item.key)}
              className={`w-full flex items-center gap-3 px-5 py-4 text-left active:bg-purple-50 transition-colors cursor-pointer ${
                i < menuItems.length - 1 ? 'border-b border-purple-100/40' : ''
              }`}
            >
              <span className="text-xl shrink-0">{item.icon}</span>
              <span className="flex-1 text-sm font-black text-slate-700">{item.label}</span>
              <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
            </button>
          ))}
        </div>
      </main>

      {/* Modal */}
      {activeModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-5 z-50 animate-fade-in" onClick={() => setActiveModal(null)}>
          <div className="bg-white rounded-[32px] w-full max-w-sm p-6 shadow-2xl border-4 border-purple-100 animate-bounce-in max-h-[80vh] overflow-y-auto relative" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-3 right-4 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-200 active:scale-95 transition-all cursor-pointer text-sm font-black"
            >✕</button>
            {renderModalContent()}
          </div>
        </div>
      )}

      <BottomNav active="Profil" />
    </AppPhoneFrame>
    </StudentLayout>
  );
};
