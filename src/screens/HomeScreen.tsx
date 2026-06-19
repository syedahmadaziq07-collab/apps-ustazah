import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Bell, Settings, Info, Heart, Award, LogOut } from 'lucide-react';
import { 
  AppPhoneFrame, 
  SoftSkyBackground, 
  StarSparklePattern, 
  CloudDecoration, 
  IslamicMoonStarDecoration
} from '../components/Decorations';
import { EmotionButton } from '../components/EmotionButton';
import { BottomNav } from '../components/BottomNav';
import { StudentLayout } from '../components/StudentLayout';
import { emotionData } from '../data/emotions';
import { EmotionKey } from '../types';
import { useStudent } from '../components/StudentProvider';
import { getAppPage, getSchoolSettings } from '../services/appContentService';
import { getEmotions } from '../services/emotionContentService';
import { playAudioSync } from '../utils/audio';

export const HomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const { selectedStudent, clearStudent } = useStudent();
  const [showCounselorModal, setShowCounselorModal] = useState(false);
  const [homeTitle, setHomeTitle] = useState('Apa perasaan kamu hari ini?');
  const [homeSubtitle, setHomeSubtitle] = useState('Pilih emosi yang kamu rasa sekarang untuk bertenang bersama i-Qalb Care.');
  const [homeImage, setHomeImage] = useState('/assets/illustrations/home-children-hero.png');
  const [selectedLabel, setSelectedLabel] = useState('Hari ini:');
  const [changeBtnText, setChangeBtnText] = useState('Tukar');
  const [appName, setAppName] = useState('i-Qalb Care');
  const [emotionImages, setEmotionImages] = useState<Record<string, string>>({});
  const [emotionAudioUrls, setEmotionAudioUrls] = useState<Record<string, string>>({});

  useEffect(() => {
    getAppPage('home').then((page) => {
      if (page) {
        if (page.title) setHomeTitle(page.title);
        if (page.subtitle) setHomeSubtitle(page.subtitle);
        if (page.image_url) setHomeImage(page.image_url);
        if (page.content_json?.selectedStudentLabel) setSelectedLabel(page.content_json.selectedStudentLabel);
        if (page.content_json?.changeStudentButtonText) setChangeBtnText(page.content_json.changeStudentButtonText);
      }
    }).catch(() => {});
    getSchoolSettings().then((s) => {
      if (s.app_name) setAppName(s.app_name);
    }).catch(() => {});
    getEmotions().then(list => {
      const imgMap: Record<string, string> = {};
      const audioMap: Record<string, string> = {};
      list.forEach(e => {
        if (e.image_url) imgMap[e.id] = e.image_url;
        if (e.malay_audio_url) audioMap[e.id] = e.malay_audio_url;
      });
      setEmotionImages(imgMap);
      setEmotionAudioUrls(audioMap);
    }).catch(() => {});
  }, []);

  // Render guard: redirect is handled by App.tsx, but prevent rendering if no student
  if (!selectedStudent) {
    return null;
  }

  const handleEmotionSelect = (emotion: EmotionKey) => {
    const audioUrl = emotionAudioUrls[emotion];
    if (audioUrl) {
      playAudioSync(audioUrl);
    }
    setTimeout(() => {
      navigate(`/emosi/${emotion}`);
    }, 250);
  };

  return (
    <StudentLayout activeNav="Utama">
    <AppPhoneFrame id="home-screen" className="relative flex flex-col justify-between min-h-screen bg-transparent lg:max-w-none lg:mx-0 lg:rounded-none lg:border-0 lg:my-0 lg:shadow-none">
      {/* Soft Illustrated Sky Background overlay */}
      <SoftSkyBackground variant="sky">
        <StarSparklePattern />
        <CloudDecoration className="absolute top-16 left-2 opacity-80" speed="slow" />
        <CloudDecoration className="absolute top-36 -right-4 opacity-70" speed="normal" />
      </SoftSkyBackground>

      {/* Decorative Moon/Star top layout */}
      <IslamicMoonStarDecoration className="absolute top-18 right-2 z-10" />

      {/* Top Bar Logo & App title */}
      <header className="flex items-center justify-between px-6 pt-5 pb-3 bg-white/90 backdrop-blur-md sticky top-0 z-40 border-b border-purple-100/70 shadow-xs">
        <div className="flex items-center gap-2">
          {/* Logo with star decoration */}
          <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center border border-amber-300 shadow-inner">
            <span className="text-xl animate-star-twinkle">⭐</span>
          </div>
          <div className="flex flex-col">
            <span className="bg-[#D1FAE5] text-[#065F46] text-[10px] font-black px-2 py-0.5 rounded-full w-max leading-none mb-0.5 uppercase tracking-wider">
              EmosiKu
            </span>
            <span className="text-lg font-black text-primary tracking-tight leading-none flex items-center gap-1">
              {appName}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Selected Student Badge */}
          {selectedStudent && (
            <div className="hidden sm:flex items-center gap-1.5 bg-purple-50 border border-purple-200 rounded-full px-3 py-1">
              <span className="text-[10px] font-black text-purple-700 truncate max-w-[120px]">
                {selectedLabel} {selectedStudent.fullName}
              </span>
            </div>
          )}

          {/* Tukar Murid Button */}
          {selectedStudent && (
            <button
              onClick={() => { clearStudent(); navigate('/login'); }}
              className="text-[10px] font-black text-amber-600 bg-amber-50 border border-amber-200 rounded-full px-2.5 py-1 hover:bg-amber-100 active:scale-95 transition-all cursor-pointer"
              title="Tukar Murid"
            >
              {changeBtnText}
            </button>
          )}
          
          {/* Settings Button */}
          <button
            id="toggle-counselor-modal-btn"
            onClick={() => setShowCounselorModal(true)}
            className="w-9 h-9 rounded-full bg-white border border-purple-100 flex items-center justify-center text-primary shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer animate-pulse-soft"
            title="Info & Panduan Kaunselor"
          >
            <Settings className="w-4.5 h-4.5 text-purple-600" />
          </button>
        </div>
      </header>

      {/* Greeting Header */}
      <div className="relative z-10 px-5 md:px-6 pt-3 pb-1">
        <div className="flex items-center justify-between">
          <button className="lg:hidden w-9 h-9 rounded-full bg-white/80 flex items-center justify-center text-purple-600 shadow-sm border border-purple-100 cursor-pointer active:scale-95 transition-all">
            <Menu className="w-5 h-5" />
          </button>
          <button className="w-9 h-9 rounded-full bg-white/80 flex items-center justify-center text-purple-600 shadow-sm border border-purple-100 cursor-pointer active:scale-95 transition-all">
            <Bell className="w-5 h-5" />
          </button>
        </div>
        <div className="mt-2">
          <p className="text-sm font-medium text-purple-600/80">Assalamualaikum,</p>
          <h1 className="text-2xl font-black text-slate-800 leading-tight">
            {selectedStudent?.fullName?.split(' ')[0] || 'Murid'}
          </h1>
          <p className="text-xs font-bold text-slate-500 mt-0.5">Bagaimana perasaan kamu hari ini?</p>
        </div>
      </div>

      {/* Main Content scroll area */}
      <main className="flex-grow px-5 md:px-6 pt-1 pb-6 select-none relative z-10 overflow-y-auto w-full max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center my-4 lg:my-8">
          
          {/* Left Column: Title + Hero Image */}
          <div className="flex flex-col gap-4">
            {/* Polished Kid App Header Title */}
            <div className="text-center sm:text-left">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-800 tracking-tight leading-tight">
                {homeTitle}
              </h2>
              <p className="text-xs sm:text-sm font-bold text-slate-500 mt-1 font-sans">
                {homeSubtitle}
              </p>
            </div>

            {/* High-fidelity custom illustration of the Muslim Boy and Girl */}
            <div className="my-2 overflow-hidden flex justify-center items-center w-full">
              <img
                src={homeImage}
                alt="Kanak-kanak Muslim ceria"
                className="w-full h-[220px] sm:h-[280px] md:h-64 lg:h-[400px] rounded-[32px] object-cover shadow-xl border-4 border-white animate-bounce-in"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Right Column: Emotion Buttons Selection Card */}
          <div className="bg-[#FFFDF4]/95 rounded-[32px] p-6 lg:p-8 shadow-[0_12px_28px_-8px_rgba(124,58,237,0.18)] border-2 border-purple-100/50 relative">
            
            {/* Decorative Sparkle inside card */}
            <span className="absolute -top-3 -right-2 text-2xl animate-star-twinkle">✨</span>

            {/* Grid Layout of 7 EmotionButtons as described */}
            <div className="grid grid-cols-3 gap-3">
              {/* Row 1 */}
              <EmotionButton
                id="gembira"
                emoji={emotionData.gembira.emoji}
                label={emotionData.gembira.label}
                colorType={emotionData.gembira.color}
                onClick={() => handleEmotionSelect('gembira')}
                imageUrl={emotionImages['gembira']}
              />
              <EmotionButton
                id="marah"
                emoji={emotionData.marah.emoji}
                label={emotionData.marah.label}
                colorType={emotionData.marah.color}
                onClick={() => handleEmotionSelect('marah')}
                imageUrl={emotionImages['marah']}
              />
              <EmotionButton
                id="sedih"
                emoji={emotionData.sedih.emoji}
                label={emotionData.sedih.label}
                colorType={emotionData.sedih.color}
                onClick={() => handleEmotionSelect('sedih')}
                imageUrl={emotionImages['sedih']}
              />

              {/* Row 2 */}
              <EmotionButton
                id="takut"
                emoji={emotionData.takut.emoji}
                label={emotionData.takut.label}
                colorType={emotionData.takut.color}
                onClick={() => handleEmotionSelect('takut')}
                imageUrl={emotionImages['takut']}
              />
              <EmotionButton
                id="risau"
                emoji={emotionData.risau.emoji}
                label={emotionData.risau.label}
                colorType={emotionData.risau.color}
                onClick={() => handleEmotionSelect('risau')}
                imageUrl={emotionImages['risau']}
              />
              <EmotionButton
                id="penat"
                emoji={emotionData.penat.emoji}
                label={emotionData.penat.label}
                colorType={emotionData.penat.color}
                onClick={() => handleEmotionSelect('penat')}
                imageUrl={emotionImages['penat']}
              />
            </div>

            {/* Centered Row 3 (Tenang option) */}
            <div className="flex justify-center mt-3">
              <div className="w-1/3 min-w-[90px]">
                <EmotionButton
                  id="tenang"
                  emoji={emotionData.tenang.emoji}
                  label={emotionData.tenang.label}
                  colorType={emotionData.tenang.color}
                  onClick={() => handleEmotionSelect('tenang')}
                  imageUrl={emotionImages['tenang']}
                />
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Counseling guidelines Modal */}
      {showCounselorModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-5 z-50 animate-fade-in">
          <div className="bg-white rounded-[32px] w-full max-w-[380px] p-6 shadow-2xl border-4 border-purple-100 animate-bounce-in max-h-[85vh] overflow-y-auto relative">
            <span className="absolute top-4 right-4 text-3xl">🕌</span>
            <div className="flex items-center gap-2 mb-4 text-primary">
              <Info className="w-5 h-5 shrink-0" />
              <h3 className="text-base font-black tracking-tight text-slate-800">Peranan Guru Kaunseling</h3>
            </div>

            <div className="space-y-4 font-sans text-xs text-slate-600">
              <p className="font-bold leading-relaxed">
                <span className="font-black text-primary">i-Qalb Care</span> direka khas sebagai instrumen bantuan digital untuk kegunaan pengamal kaunseling sekolah di Malaysia dalam mengendalikan terapi intervensi emosi murid:
              </p>

              <div className="p-3.5 bg-emerald-50 rounded-2xl border-2 border-emerald-100">
                <h4 className="font-black text-emerald-950 flex items-center gap-1 text-xs mb-1">
                  <Award className="w-3.5 h-3.5 text-emerald-600" /> Cara Pelaksanaan Sesi:
                </h4>
                <ol className="list-decimal pl-4.5 space-y-1.5 font-bold text-emerald-900 text-[11px]">
                  <li>Tanya khabar murid & kenal pasti perasaan semasa.</li>
                  <li>Minta murid ketik emosi mereka di skrin utama.</li>
                  <li>Dengar nasihat emosi berlandaskan psikologi Islam.</li>
                  <li>Bimbing murid berzikir & menghayati maksud zikir harian.</li>
                  <li>Rujuk laporan emosi di tab <strong className="text-primary font-black">Sejarah</strong>.</li>
                </ol>
              </div>

              <div className="p-3.5 bg-amber-50 rounded-2xl border-2 border-amber-100">
                <h4 className="font-black text-amber-950 flex items-center gap-1 mb-1 text-xs">
                  <Heart className="w-3.5 h-3.5 text-amber-500" /> Prinsip Mindfulness Islam:
                </h4>
                <p className="font-bold text-amber-900 leading-relaxed text-[11px]">
                  Zikrullah bertindak mengaktifkan sistem saraf parasimpati, membantu menurunkan kadar degupan jantung murid sewaktu dilanda panik, marah, bersedih, atau cemas.
                </p>
              </div>
            </div>

            <button
              id="close-counselor-modal-btn"
              onClick={() => setShowCounselorModal(false)}
              className="mt-5 w-full py-3 bg-primary text-white font-extrabold rounded-2xl hover:bg-purple-700 active:scale-95 transition-all cursor-pointer shadow-md text-xs tracking-wider"
            >
              Faham & Mula Sesi
            </button>
          </div>
        </div>
      )}

      {/* Bottom Nav */}
      <BottomNav active="Utama" />
    </AppPhoneFrame>
    </StudentLayout>
  );
};
