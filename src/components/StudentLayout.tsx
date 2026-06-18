import React from 'react';
import { StudentSidebar } from './StudentSidebar';

interface StudentLayoutProps {
  children: React.ReactNode;
  activeNav: 'Utama' | 'Sejarah' | 'Doa' | 'Profil' | null;
}

export const StudentLayout: React.FC<StudentLayoutProps> = ({ children, activeNav }) => {
  return (
    <div className="min-h-screen">
      <StudentSidebar activeNav={activeNav} />
      <div className="lg:pl-[260px] min-h-screen">
        {children}
      </div>
    </div>
  );
};
