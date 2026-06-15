import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomeScreen } from './screens/HomeScreen';
import { EmotionDetailScreen } from './screens/EmotionDetailScreen';
import { ReadingScreen } from './screens/ReadingScreen';
import { CounterScreen } from './screens/CounterScreen';
import { SuccessScreen } from './screens/SuccessScreen';
import { HistoryScreen } from './screens/HistoryScreen';
import { DuaScreen } from './screens/DuaScreen';
import { ProfileScreen } from './screens/ProfileScreen';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/emosi/:emotionId" element={<EmotionDetailScreen />} />
        <Route path="/baca/:emotionId" element={<ReadingScreen />} />
        <Route path="/kira/:emotionId" element={<CounterScreen />} />
        <Route path="/tahniah/:emotionId" element={<SuccessScreen />} />
        <Route path="/sejarah" element={<HistoryScreen />} />
        <Route path="/doa" element={<DuaScreen />} />
        <Route path="/profil" element={<ProfileScreen />} />
        {/* Fallback route back to home */}
        <Route path="*" element={<HomeScreen />} />
      </Routes>
    </BrowserRouter>
  );
}
