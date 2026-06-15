import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { SelectedStudent } from '../types';

const STUDENT_STORAGE_KEY = 'zikirCareSelectedStudent';

interface StudentContextValue {
  selectedStudent: SelectedStudent | null;
  selectStudent: (student: SelectedStudent) => void;
  clearStudent: () => void;
}

const StudentContext = createContext<StudentContextValue>({
  selectedStudent: null,
  selectStudent: () => {},
  clearStudent: () => {},
});

export const useStudent = () => useContext(StudentContext);

export const StudentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedStudent, setSelectedStudent] = useState<SelectedStudent | null>(() => {
    try {
      const stored = localStorage.getItem(STUDENT_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const selectStudent = useCallback((student: SelectedStudent) => {
    setSelectedStudent(student);
    try {
      localStorage.setItem(STUDENT_STORAGE_KEY, JSON.stringify(student));
    } catch {}
  }, []);

  const clearStudent = useCallback(() => {
    setSelectedStudent(null);
    try {
      localStorage.removeItem(STUDENT_STORAGE_KEY);
    } catch {}
  }, []);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STUDENT_STORAGE_KEY);
      if (stored) {
        setSelectedStudent(JSON.parse(stored));
      }
    } catch {}
  }, []);

  return (
    <StudentContext.Provider value={{ selectedStudent, selectStudent, clearStudent }}>
      {children}
    </StudentContext.Provider>
  );
};
