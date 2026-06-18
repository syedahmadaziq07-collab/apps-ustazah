import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, BarChart2, BookOpen, User, LogOut } from 'lucide-react';
import { useStudent } from './StudentProvider';

interface StudentSidebarProps {
  activeNav: 'Utama' | 'Sejarah' | 'Doa' | 'Profil' | null;
}

const navItems = [
  { label: 'Utama', path: '/', icon: Home },
  { label: 'Sejarah', path: '/sejarah', icon: BarChart2 },
  { label: 'Doa', path: '/doa', icon: BookOpen },
  { label: 'Profil', path: '/profil', icon: User },
] as const;

export const StudentSidebar: React.FC<StudentSidebarProps> = ({ activeNav }) => {
  const navigate = useNavigate();
  const { selectedStudent, clearStudent } = useStudent();

  return (
    <aside className="fixed left-0 top-0 w-[260px] h-screen z-50 hidden lg:flex flex-col bg-gradient-to-b from-purple-700 via-purple-800 to-purple-900 text-white shadow-2xl border-r border-purple-600/30">
      {/* Logo & App Name */}
      <div className="px-5 pt-7 pb-5 border-b border-purple-600/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-200/20 flex items-center justify-center border border-amber-300/30">
            <span className="text-xl">⭐</span>
          </div>
          <div>
            <span className="text-[10px] font-black text-amber-200 uppercase tracking-wider block leading-none mb-0.5">ZikirCare</span>
            <span className="text-base font-black tracking-tight text-white leading-none">EmosiKu</span>
          </div>
        </div>
      </div>

      {/* Current Student */}
      {selectedStudent && (
        <div className="px-5 py-4 border-b border-purple-600/30">
          <span className="text-[9px] font-bold text-purple-300 uppercase tracking-wider block mb-1">Murid</span>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-600/50 flex items-center justify-center border border-purple-500/40 overflow-hidden shrink-0">
              {selectedStudent.photoUrl ? (
                <img src={selectedStudent.photoUrl} alt="" className="w-full h-full object-cover" />
              ) : (
                <User className="w-4 h-4 text-purple-300" />
              )}
            </div>
            <span className="text-sm font-black truncate text-white">{selectedStudent.fullName}</span>
          </div>
        </div>
      )}

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeNav === item.label;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-left transition-all cursor-pointer ${
                isActive
                  ? 'bg-white/15 text-white shadow-sm border border-white/10'
                  : 'text-purple-200 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? '' : 'text-purple-300'}`} />
              <span className={`text-sm font-black ${isActive ? '' : ''}`}>{item.label}</span>
              {isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse-soft" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom: Change student */}
      <div className="px-3 py-4 border-t border-purple-600/30">
        <button
          onClick={() => { clearStudent(); navigate('/login'); }}
          className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-purple-300 hover:bg-white/5 hover:text-white transition-all cursor-pointer text-left"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-xs font-black">Tukar Murid</span>
        </button>
      </div>
    </aside>
  );
};
