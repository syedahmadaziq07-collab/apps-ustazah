import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Users, Home, Heart, BookOpen, BookHeart,
  History, Image, Music, FileText, Settings, LogOut, School
} from 'lucide-react';

const menuItems: { label: string; icon: React.ReactNode; path: string; id: string }[] = [
  { label: 'Dashboard', icon: <LayoutDashboard className="w-4.5 h-4.5" />, path: '/teacher', id: 'dashboard' },
  { label: 'Murid', icon: <Users className="w-4.5 h-4.5" />, path: '/teacher/murid', id: 'murid' },
  { label: 'Home', icon: <Home className="w-4.5 h-4.5" />, path: '/teacher/home', id: 'home' },
  { label: 'Emosi', icon: <Heart className="w-4.5 h-4.5" />, path: '/teacher/emosi', id: 'emosi' },
  { label: 'Terapi', icon: <BookOpen className="w-4.5 h-4.5" />, path: '/teacher/terapi', id: 'terapi' },
  { label: 'Doa', icon: <BookHeart className="w-4.5 h-4.5" />, path: '/teacher/doa', id: 'doa' },
  { label: 'Sejarah', icon: <History className="w-4.5 h-4.5" />, path: '/teacher/sejarah', id: 'sejarah' },
  { label: 'Gambar', icon: <Image className="w-4.5 h-4.5" />, path: '/teacher/gambar', id: 'gambar' },
  { label: 'Audio', icon: <Music className="w-4.5 h-4.5" />, path: '/teacher/audio', id: 'audio' },
  { label: 'Profil App', icon: <FileText className="w-4.5 h-4.5" />, path: '/teacher/profil-app', id: 'profil-app' },
  { label: 'Tetapan', icon: <Settings className="w-4.5 h-4.5" />, path: '/teacher/tetapan', id: 'tetapan' },
];

interface TeacherSidebarProps {
  onLogout: () => void;
}

export const TeacherSidebar: React.FC<TeacherSidebarProps> = ({ onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentId = menuItems.find(m => {
    if (m.path === '/teacher') return location.pathname === '/teacher';
    return location.pathname.startsWith(m.path);
  })?.id || 'dashboard';

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white/95 backdrop-blur-md border-r-2 border-purple-100 h-screen sticky top-0 overflow-y-auto">
      {/* Logo */}
      <div className="px-5 py-6 border-b-2 border-purple-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center border-2 border-purple-200">
            <School className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <p className="text-sm font-black text-purple-900 leading-tight">ZikirCare</p>
            <p className="text-[9px] font-bold text-purple-500">Dashboard Guru</p>
          </div>
        </div>
      </div>

      {/* Nav Items */}
      <nav className="flex-grow px-3 py-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = item.id === currentId;
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer text-left ${
                isActive
                  ? 'bg-purple-100 text-purple-700 shadow-sm'
                  : 'text-slate-600 hover:bg-purple-50 hover:text-purple-600'
              }`}
            >
              <span className={isActive ? 'text-purple-600' : 'text-slate-400'}>{item.icon}</span>
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t-2 border-purple-100">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-black text-rose-600 hover:bg-rose-50 transition-all cursor-pointer"
        >
          <LogOut className="w-4.5 h-4.5" />
          Logout
        </button>
      </div>
    </aside>
  );
};
