import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { StudentProvider, useStudent } from './components/StudentProvider';
import { HomeScreen } from './screens/HomeScreen';
import { LoginScreen } from './screens/LoginScreen';
import { EmotionDetailScreen } from './screens/EmotionDetailScreen';
import { ReadingScreen } from './screens/ReadingScreen';
import { CounterScreen } from './screens/CounterScreen';
import { SuccessScreen } from './screens/SuccessScreen';
import { HistoryScreen } from './screens/HistoryScreen';
import { DuaScreen } from './screens/DuaScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { TeacherDashboard } from './screens/teacher/TeacherDashboard';
import { TeacherMurid } from './screens/teacher/TeacherMurid';
import { TeacherSejarah } from './screens/teacher/TeacherSejarah';
import { TeacherHomeEditor } from './screens/teacher/TeacherHomeEditor';
import { TeacherProfileEditor } from './screens/teacher/TeacherProfileEditor';
import { TeacherBrandingEditor } from './screens/teacher/TeacherBrandingEditor';
import { TeacherPlaceholder } from './screens/teacher/TeacherPlaceholder';
import { TeacherLayout } from './components/teacher/TeacherLayout';

function AppRoutes() {
  const { selectedStudent } = useStudent();
  const location = useLocation();

  const isLoginRoute = location.pathname === '/login';
  const isTeacherRoute = location.pathname.startsWith('/teacher');

  // If no student selected and not already on login or teacher pages, redirect to login
  if (!selectedStudent && !isLoginRoute && !isTeacherRoute) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Routes>
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/" element={<HomeScreen />} />
      <Route path="/emosi/:emotionId" element={<EmotionDetailScreen />} />
      <Route path="/baca/:emotionId" element={<ReadingScreen />} />
      <Route path="/kira/:emotionId" element={<CounterScreen />} />
      <Route path="/tahniah/:emotionId" element={<SuccessScreen />} />
      <Route path="/sejarah" element={<HistoryScreen />} />
      <Route path="/doa" element={<DuaScreen />} />
      <Route path="/profil" element={<ProfileScreen />} />

      {/* Teacher Routes */}
      <Route path="/teacher" element={<TeacherLayout><TeacherDashboard /></TeacherLayout>} />
      <Route path="/teacher/murid" element={<TeacherLayout><TeacherMurid /></TeacherLayout>} />
      <Route path="/teacher/sejarah" element={<TeacherLayout><TeacherSejarah /></TeacherLayout>} />
      <Route path="/teacher/home" element={<TeacherLayout><TeacherHomeEditor /></TeacherLayout>} />
      <Route path="/teacher/profil-app" element={<TeacherLayout><TeacherProfileEditor /></TeacherLayout>} />
      <Route path="/teacher/tetapan" element={<TeacherLayout><TeacherBrandingEditor /></TeacherLayout>} />
      <Route path="/teacher/:pageId" element={<TeacherLayout><TeacherPlaceholder /></TeacherLayout>} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <StudentProvider>
        <AppRoutes />
      </StudentProvider>
    </BrowserRouter>
  );
}
