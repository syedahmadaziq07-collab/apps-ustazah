import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, ChevronRight } from 'lucide-react';
import {
  AppPhoneFrame,
  SoftSkyBackground,
  StarSparklePattern,
  IslamicMoonStarDecoration
} from '../components/Decorations';
import { StudentLayout } from '../components/StudentLayout';
import { useStudent } from '../components/StudentProvider';

export const ProfileScreen: React.FC = () => {
  const navigate = useNavigate();
  const { selectedStudent } = useStudent();

  const menuItems: { icon: string; label: string; route: string }[] = [
    { icon: '👤', label: 'Maklumat Profil', route: '/profil/maklumat' },
    { icon: '👨‍👩‍👧', label: 'Ibu Bapa / Penjaga', route: '/profil/ibu-bapa' },
    { icon: '📊', label: 'Laporan Mingguan', route: '/profil/laporan' },
    { icon: '⚙️', label: 'Tetapan', route: '/profil/tetapan' },
    { icon: '🆘', label: 'Bantuan & Sokongan', route: '/profil/bantuan' },
    { icon: 'ℹ️', label: 'Tentang Aplikasi', route: '/profil/tentang' },
  ];

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
              key={item.route}
              onClick={() => navigate(item.route)}
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
    </AppPhoneFrame>
    </StudentLayout>
  );
};
