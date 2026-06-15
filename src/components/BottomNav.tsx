import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, BarChart2, BookOpen, User } from 'lucide-react';

interface BottomNavProps {
  active: 'Utama' | 'Sejarah' | 'Doa' | 'Profil';
}

export const BottomNav: React.FC<BottomNavProps> = ({ active }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNav = (tab: string, path: string) => {
    navigate(path);
  };

  return (
    <div className="sticky bottom-4 mx-auto w-[calc(100%-32px)] max-w-[500px] md:max-w-[700px] mb-4 mt-2 h-[68px] bg-white/95 backdrop-blur-md flex items-center justify-around px-4 shadow-[0_12px_32px_rgba(124,58,237,0.16)] z-50 rounded-[24px] border-2 border-purple-100/50 shrink-0">
      {/* Utama Tab */}
      <button
        id="nav-utama-btn"
        onClick={() => handleNav('Utama', '/')}
        className="flex flex-col items-center justify-center flex-1 h-full relative cursor-pointer group transition-all"
      >
        <Home
          className={`w-[22px] h-[22px] transition-transform group-active:scale-90 ${
            active === 'Utama' ? 'text-purple-600 scale-105' : 'text-gray-400'
          }`}
        />
        <span
          className={`text-[10px] font-black mt-1 ${
            active === 'Utama' ? 'text-purple-600 font-extrabold' : 'text-gray-400'
          }`}
        >
          Utama
        </span>
        {active === 'Utama' && (
          <span className="absolute bottom-0 w-1.5 h-1.5 bg-purple-600 rounded-full animate-pulse-soft" />
        )}
      </button>

      {/* Sejarah Tab */}
      <button
        id="nav-sejarah-btn"
        onClick={() => handleNav('Sejarah', '/sejarah')}
        className="flex flex-col items-center justify-center flex-1 h-full relative cursor-pointer group transition-all"
      >
        <BarChart2
          className={`w-[22px] h-[22px] transition-transform group-active:scale-90 ${
            active === 'Sejarah' ? 'text-purple-600 scale-105' : 'text-gray-400'
          }`}
        />
        <span
          className={`text-[10px] font-black mt-1 ${
            active === 'Sejarah' ? 'text-purple-600 font-extrabold' : 'text-gray-400'
          }`}
        >
          Sejarah
        </span>
        {active === 'Sejarah' && (
          <span className="absolute bottom-0 w-1.5 h-1.5 bg-purple-600 rounded-full animate-pulse-soft" />
        )}
      </button>

      {/* Doa Tab */}
      <button
        id="nav-doa-btn"
        onClick={() => handleNav('Doa', '/doa')}
        className="flex flex-col items-center justify-center flex-1 h-full relative cursor-pointer group transition-all"
      >
        <BookOpen
          className={`w-[22px] h-[22px] transition-transform group-active:scale-90 ${
            active === 'Doa' ? 'text-purple-600 scale-105' : 'text-gray-400'
          }`}
        />
        <span
          className={`text-[10px] font-black mt-1 ${
            active === 'Doa' ? 'text-purple-600 font-extrabold' : 'text-gray-400'
          }`}
        >
          Doa
        </span>
        {active === 'Doa' && (
          <span className="absolute bottom-0 w-1.5 h-1.5 bg-purple-600 rounded-full animate-pulse-soft" />
        )}
      </button>

      {/* Profil Tab */}
      <button
        id="nav-profil-btn"
        onClick={() => handleNav('Profil', '/profil')}
        className="flex flex-col items-center justify-center flex-1 h-full relative cursor-pointer group transition-all"
      >
        <User
          className={`w-[22px] h-[22px] transition-transform group-active:scale-90 ${
            active === 'Profil' ? 'text-purple-600 scale-105' : 'text-gray-400'
          }`}
        />
        <span
          className={`text-[10px] font-black mt-1 ${
            active === 'Profil' ? 'text-purple-600 font-extrabold' : 'text-gray-400'
          }`}
        >
          Profil
        </span>
        {active === 'Profil' && (
          <span className="absolute bottom-0 w-1.5 h-1.5 bg-purple-600 rounded-full animate-pulse-soft" />
        )}
      </button>
    </div>
  );
};
