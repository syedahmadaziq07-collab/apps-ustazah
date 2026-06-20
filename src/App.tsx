import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { StudentProvider, useStudent } from './components/StudentProvider';
import { isTeacherLoggedIn } from './services/teacherAuthService';
import { HomeScreen } from './screens/HomeScreen';
import { LoginScreen } from './screens/LoginScreen';
import { EmotionDetailScreen } from './screens/EmotionDetailScreen';
import { ReadingScreen } from './screens/ReadingScreen';
import { CounterScreen } from './screens/CounterScreen';
import { SuccessScreen } from './screens/SuccessScreen';
import { HistoryScreen } from './screens/HistoryScreen';
import { AktivitiHubScreen } from './screens/AktivitiHubScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { ProfilMaklumatScreen } from './screens/ProfilMaklumatScreen';
import { ProfilIbuBapaScreen } from './screens/ProfilIbuBapaScreen';
import { ProfilLaporanScreen } from './screens/ProfilLaporanScreen';
import { ProfilTetapanScreen } from './screens/ProfilTetapanScreen';
import { ProfilBantuanScreen } from './screens/ProfilBantuanScreen';
import { ProfilTentangScreen } from './screens/ProfilTentangScreen';
import { TeacherDashboard } from './screens/teacher/TeacherDashboard';
import { TeacherMurid } from './screens/teacher/TeacherMurid';
import { TeacherSejarah } from './screens/teacher/TeacherSejarah';
import { TeacherHomeEditor } from './screens/teacher/TeacherHomeEditor';
import { TeacherEmosiEditor } from './screens/teacher/TeacherEmosiEditor';
import { TeacherTerapiEditor } from './screens/teacher/TeacherTerapiEditor';
import { TeacherDoaEditor } from './screens/teacher/TeacherDoaEditor';
import { TeacherProfileEditor } from './screens/teacher/TeacherProfileEditor';
import { TeacherBrandingEditor } from './screens/teacher/TeacherBrandingEditor';
import { TeacherGambar } from './screens/teacher/TeacherGambar';
import { TeacherAudio } from './screens/teacher/TeacherAudio';
import { TeacherPlaceholder } from './screens/teacher/TeacherPlaceholder';
import { TeacherLayout } from './components/teacher/TeacherLayout';

function AppRoutes() {
  const { selectedStudent } = useStudent();
  const location = useLocation();

  const isLoginRoute = location.pathname === '/login';
  const isTeacherRoute = location.pathname.startsWith('/teacher');
  const teacherLoggedIn = isTeacherLoggedIn();

  // Teacher route guard: redirect to login if not logged in as teacher
  if (isTeacherRoute && !teacherLoggedIn) {
    return <Navigate to="/login" replace />;
  }

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
      <Route path="/doa" element={<AktivitiHubScreen />} />
      <Route path="/profil" element={<ProfileScreen />} />
      <Route path="/profil/maklumat" element={<ProfilMaklumatScreen />} />
      <Route path="/profil/ibu-bapa" element={<ProfilIbuBapaScreen />} />
      <Route path="/profil/laporan" element={<ProfilLaporanScreen />} />
      <Route path="/profil/tetapan" element={<ProfilTetapanScreen />} />
      <Route path="/profil/bantuan" element={<ProfilBantuanScreen />} />
      <Route path="/profil/tentang" element={<ProfilTentangScreen />} />

      {/* Teacher Routes */}
      <Route path="/teacher" element={<TeacherLayout><TeacherDashboard /></TeacherLayout>} />
      <Route path="/teacher/murid" element={<TeacherLayout><TeacherMurid /></TeacherLayout>} />
      <Route path="/teacher/sejarah" element={<TeacherLayout><TeacherSejarah /></TeacherLayout>} />
      <Route path="/teacher/home" element={<TeacherLayout><TeacherHomeEditor /></TeacherLayout>} />
      <Route path="/teacher/emosi" element={<TeacherLayout><TeacherEmosiEditor /></TeacherLayout>} />
      <Route path="/teacher/terapi" element={<TeacherLayout><TeacherTerapiEditor /></TeacherLayout>} />
      <Route path="/teacher/doa" element={<TeacherLayout><TeacherDoaEditor /></TeacherLayout>} />
      <Route path="/teacher/profil-app" element={<TeacherLayout><TeacherProfileEditor /></TeacherLayout>} />
      <Route path="/teacher/tetapan" element={<TeacherLayout><TeacherBrandingEditor /></TeacherLayout>} />
      <Route path="/teacher/gambar" element={<TeacherLayout><TeacherGambar /></TeacherLayout>} />
      <Route path="/teacher/audio" element={<TeacherLayout><TeacherAudio /></TeacherLayout>} />
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
