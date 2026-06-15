import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TeacherSidebar } from './TeacherSidebar';
import { TeacherMobileNav } from './TeacherMobileNav';
import { School } from 'lucide-react';

interface TeacherLayoutProps {
  children: React.ReactNode;
}

export const TeacherLayout: React.FC<TeacherLayoutProps> = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-purple-50/50 flex">
      {/* Sidebar */}
      <TeacherSidebar onLogout={handleLogout} />

      {/* Main Content */}
      <div className="flex-grow flex flex-col min-h-screen">
        {/* Mobile Top Bar */}
        <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white/95 border-b-2 border-purple-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center border border-purple-200">
              <School className="w-4 h-4 text-purple-600" />
            </div>
            <span className="text-sm font-black text-purple-900">ZikirCare</span>
          </div>
          <button
            onClick={handleLogout}
            className="text-xs font-bold text-rose-500 hover:text-rose-700 transition-colors cursor-pointer bg-transparent border-none"
          >
            Logout
          </button>
        </div>

        {/* Page Content */}
        {children}

        {/* Mobile Bottom Nav */}
        <TeacherMobileNav />
      </div>
    </div>
  );
};
