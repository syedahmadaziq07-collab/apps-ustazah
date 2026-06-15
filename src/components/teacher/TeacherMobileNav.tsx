import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, History, Heart, BookOpen, LogOut } from 'lucide-react';

const mobileTabs: { label: string; icon: React.ReactNode; path: string }[] = [
  { label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, path: '/teacher' },
  { label: 'Murid', icon: <Users className="w-5 h-5" />, path: '/teacher/murid' },
  { label: 'Sejarah', icon: <History className="w-5 h-5" />, path: '/teacher/sejarah' },
  { label: 'Emosi', icon: <Heart className="w-5 h-5" />, path: '/teacher/emosi' },
];

export const TeacherMobileNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t-2 border-purple-100">
      <div className="flex items-center justify-around px-2 py-2">
        {mobileTabs.map((tab) => {
          const isActive = tab.path === '/teacher'
            ? location.pathname === '/teacher'
            : location.pathname.startsWith(tab.path);
          return (
            <button
              key={tab.label}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                isActive ? 'text-purple-600' : 'text-slate-400'
              }`}
            >
              {tab.icon}
              <span className={`text-[9px] font-black ${isActive ? 'text-purple-600' : 'text-slate-400'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
