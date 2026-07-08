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
import { EmotionButton, EmotionButtonProps } from '../components/EmotionButton';
import { BottomNav } from '../components/BottomNav';
import { StudentLayout } from '../components/StudentLayout';
import { emotionData } from '../data/emotions';
import { EmotionKey, EmotionContent } from '../types';
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
  const [logoUrl, setLogoUrl] = useState('');
  const [logoError, setLogoError] = useState(false);
  const [emotionImages, setEmotionImages] = useState<Record<string, string>>({});
  const [emotionAudioUrls, setEmotionAudioUrls] = useState<Record<string, string>>({});
  const [emotionMeta, setEmotionMeta] = useState<Record<string, EmotionContent>>({});

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
      if (s.logo_url) { setLogoUrl(s.logo_url); setLogoError(false); console.log('[branding] logo_url:', s.logo_url); }
    }).catch(() => {});
    getEmotions().then(list => {
      const imgMap: Record<string, string> = {};
      const audioMap: Record<string, string> = {};
      const metaMap: Record<string, EmotionContent> = {};
      list.forEach(e => {
        metaMap[e.id] = e;
        if (e.image_url) imgMap[e.id] = e.image_url;
        if (e.malay_audio_url) audioMap[e.id] = e.malay_audio_url;
      });
      setEmotionMeta(metaMap);
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
          {/* Logo */}
          <div className="w-9 h-9 rounded-full overflow-hidden bg-white border-2 border-amber-300 flex items-center justify-center">
            {logoUrl && !logoError ? (
              <img src={logoUrl} alt="I-Qalb Care" className="w-full h-full object-cover rounded-full" onError={() => { console.error('[branding] Logo failed to load:', logoUrl); setLogoError(true); }} />
            ) : (
              <span className="text-xl">⭐</span>
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black text-primary tracking-tight leading-none flex items-center gap-1">
              {appName}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Selected Student Badge */}
          {selectedStudent && (
            <div className="hidden sm:flex items-center gap-1.5 bg-purple-50 border border-purple-200 rounded-full px-3 py-1">
              <span className="text-[11px] font-black text-purple-700 truncate max-w-[220px]">
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
      <div className="relative z-10 px-6 md:px-8 pt-4 pb-2">
        <div className="flex items-center justify-between">
          <button className="lg:hidden w-9 h-9 rounded-full bg-white/80 flex items-center justify-center text-purple-600 shadow-sm border border-purple-100 cursor-pointer active:scale-95 transition-all">
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <button className="w-9 h-9 rounded-full bg-white/80 flex items-center justify-center text-purple-600 shadow-sm border border-purple-100 cursor-pointer active:scale-95 transition-all">
              <Bell className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="mt-3">
          <p className="text-base font-semibold text-purple-600/80">Assalamualaikum,</p>
          <h1 className="text-3xl font-black text-slate-800 leading-tight">
            {selectedStudent?.fullName?.split(' ')?.slice(0, 2)?.join(' ')?.toUpperCase() || 'MURID'}
          </h1>
          <p className="text-sm font-bold text-slate-500 mt-1">Bagaimana perasaan kamu hari ini?</p>
        </div>
      </div>

      {/* Main Content scroll area */}
      <main className="flex-grow px-6 md:px-8 lg:px-10 pt-2 pb-6 select-none relative z-10 overflow-y-auto w-full max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 lg:gap-16 items-center my-6 lg:my-10">
          
          {/* Left Column: Title + Hero Image */}
          <div className="flex flex-col gap-6">
            {/* Polished Kid App Header Title */}
            <div className="text-center sm:text-left">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-800 tracking-tight leading-tight">
                {homeTitle}
              </h2>
              <p className="text-sm sm:text-base font-bold text-slate-500 mt-2 font-sans">
                {homeSubtitle}
              </p>
            </div>

            {/* High-fidelity custom illustration of the Muslim Boy and Girl */}
            <div className="my-2 overflow-hidden flex justify-center items-center w-full">
              <img
                src={homeImage}
                alt="Kanak-kanak Muslim ceria"
                className="w-full max-h-[220px] sm:max-h-[280px] md:max-h-none md:h-72 lg:h-[440px] rounded-[32px] object-cover shadow-xl border-4 border-white animate-bounce-in"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Right Column: Emotion Buttons Selection Card */}
          <div className="bg-[#FFFDF4]/95 rounded-[32px] p-4 sm:p-6 lg:p-8 shadow-[0_16px_36px_-10px_rgba(124,58,237,0.2)] border-2 border-purple-100/50 relative">
            
            {/* Decorative Sparkle inside card */}
            <span className="absolute -top-3 -right-2 text-2xl animate-star-twinkle">✨</span>

            {/* Grid Layout of 7 EmotionButtons — all same size */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-5 justify-items-center">
              <EmotionButton
                id="gembira"
                emoji={emotionMeta['gembira']?.emoji || emotionData.gembira.emoji}
                label={emotionMeta['gembira']?.label || emotionData.gembira.label}
                colorType={(emotionMeta['gembira']?.color as EmotionButtonProps['colorType']) || emotionData.gembira.color}
                onClick={() => handleEmotionSelect('gembira')}
                imageUrl={emotionImages['gembira']}
              />
              <EmotionButton
                id="marah"
                emoji={emotionMeta['marah']?.emoji || emotionData.marah.emoji}
                label={emotionMeta['marah']?.label || emotionData.marah.label}
                colorType={(emotionMeta['marah']?.color as EmotionButtonProps['colorType']) || emotionData.marah.color}
                onClick={() => handleEmotionSelect('marah')}
                imageUrl={emotionImages['marah']}
              />
              <EmotionButton
                id="sedih"
                emoji={emotionMeta['sedih']?.emoji || emotionData.sedih.emoji}
                label={emotionMeta['sedih']?.label || emotionData.sedih.label}
                colorType={(emotionMeta['sedih']?.color as EmotionButtonProps['colorType']) || emotionData.sedih.color}
                onClick={() => handleEmotionSelect('sedih')}
                imageUrl={emotionImages['sedih']}
              />
              <EmotionButton
                id="takut"
                emoji={emotionMeta['takut']?.emoji || emotionData.takut.emoji}
                label={emotionMeta['takut']?.label || emotionData.takut.label}
                colorType={(emotionMeta['takut']?.color as EmotionButtonProps['colorType']) || emotionData.takut.color}
                onClick={() => handleEmotionSelect('takut')}
                imageUrl={emotionImages['takut']}
              />
              <EmotionButton
                id="risau"
                emoji={emotionMeta['risau']?.emoji || emotionData.risau.emoji}
                label={emotionMeta['risau']?.label || emotionData.risau.label}
                colorType={(emotionMeta['risau']?.color as EmotionButtonProps['colorType']) || emotionData.risau.color}
                onClick={() => handleEmotionSelect('risau')}
                imageUrl={emotionImages['risau']}
              />
              <EmotionButton
                id="penat"
                emoji={emotionMeta['penat']?.emoji || emotionData.penat.emoji}
                label={emotionMeta['penat']?.label || emotionData.penat.label}
                colorType={(emotionMeta['penat']?.color as EmotionButtonProps['colorType']) || emotionData.penat.color}
                onClick={() => handleEmotionSelect('penat')}
                imageUrl={emotionImages['penat']}
              />
              <EmotionButton
                id="tenang"
                emoji={emotionMeta['tenang']?.emoji || emotionData.tenang.emoji}
                label={emotionMeta['tenang']?.label || emotionData.tenang.label}
                colorType={(emotionMeta['tenang']?.color as EmotionButtonProps['colorType']) || emotionData.tenang.color}
                onClick={() => handleEmotionSelect('tenang')}
                imageUrl={emotionImages['tenang']}
                className="sm:col-start-2"
              />
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
