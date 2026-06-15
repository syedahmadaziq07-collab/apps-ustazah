import React, { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Volume2, Sparkles, Star } from 'lucide-react';
import { emotionData, staticDuas } from '../data/emotions';
import { 
  AppPhoneFrame, 
  SoftSkyBackground, 
  StarSparklePattern, 
  PrayingChildIllustration,
  IslamicMoonStarDecoration
} from '../components/Decorations';
import { EmotionKey } from '../types';
import { playStaticAudio } from '../utils/audio';

export const ReadingScreen: React.FC = () => {
  const { emotionId } = useParams<{ emotionId: string }>();
  const navigate = useNavigate();
  const [audioFallback, setAudioFallback] = useState('');

  const idVal = emotionId || 'tenang';
  
  // Try to resolve as emotion
  let title = "Zikir";
  let arabic = "";
  let rumi = "";
  let maksud = "";
  let isDua = false;

  if (idVal in emotionData) {
    const data = emotionData[idVal as EmotionKey];
    title = data.label;
    arabic = data.zikir;
    rumi = data.zikirRumi;
    maksud = data.zikirMaksud;
  } else {
    // Try to resolve as static dua
    const dataObj = staticDuas.find(d => d.id === idVal);
    if (dataObj) {
      title = dataObj.name;
      arabic = dataObj.arabic;
      rumi = dataObj.rumi;
      maksud = dataObj.meaning;
      isDua = true;
    } else {
      // Fallback
      const fallback = emotionData['tenang'];
      title = fallback.label;
      arabic = fallback.zikir;
      rumi = fallback.zikirRumi;
      maksud = fallback.zikirMaksud;
    }
  }

  const handleListenAudio = useCallback(() => {
    setAudioFallback('');
    const data = idVal in emotionData
      ? emotionData[idVal as EmotionKey]
      : staticDuas.find(d => d.id === idVal);
    if (data && data.audio?.malay) {
      playStaticAudio(data.audio.malay, () => {
        setAudioFallback('Audio nasihat akan ditambah kemudian.');
      });
    } else {
      setAudioFallback('Audio nasihat akan ditambah kemudian.');
    }
  }, [idVal]);

  const handleStartCounter = () => {
    navigate(`/kira/${idVal}`);
  };

  return (
    <AppPhoneFrame id={`reading-screen-${idVal}`} className="relative flex flex-col justify-between min-h-screen bg-transparent">
      
      {/* Soft Pastel Purple / Cream Background ornament */}
      <SoftSkyBackground variant="sunset">
        <StarSparklePattern />
      </SoftSkyBackground>

      {/* Elegant hanging decoration */}
      <IslamicMoonStarDecoration className="absolute top-18 right-2 z-10 scale-90" />

      {/* Header Bar */}
      <header className="flex items-center px-4 pt-5 pb-3 bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-purple-100/50">
        <button
          id="back-to-detail-from-reading"
          onClick={() => {
            if (isDua) {
              navigate('/doa');
            } else {
              navigate(`/emosi/${idVal}`);
            }
          }}
          className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-text-main hover:bg-purple-50 active:scale-95 transition-all shadow-sm cursor-pointer border border-purple-100"
        >
          <ArrowLeft className="w-5 h-5 text-purple-600" />
        </button>
        <div className="ml-3 flex flex-col">
          <span className="text-[10px] font-black text-purple-500 uppercase tracking-widest leading-none mb-0.5">TERAPI MINDA</span>
          <h2 className="text-base font-black text-slate-800 tracking-tight leading-none">
            Sesi Bacaan {title}
          </h2>
        </div>
      </header>

      {/* Reading Core content */}
      <main className="flex-grow px-5 pt-4 pb-6 select-none text-center flex flex-col justify-between relative z-10 overflow-y-auto">
        
        {/* Large stylized Cream Reading card */}
        <div className="bg-[#FFFDF4]/95 rounded-[32px] p-6 shadow-[0_12px_24px_-10px_rgba(124,58,237,0.12)] border-3 border-[#FDE68A] transition-all flex flex-col justify-center min-h-[220px] relative">
          
          {/* Custom stars surrounding the card corners */}
          <span className="absolute -top-3 -left-2 text-2xl animate-star-twinkle">⭐</span>
          <span className="absolute -bottom-2 -right-1 text-xl animate-pulse-soft">✨</span>

          {/* Glowing Badge header */}
          <div className="flex justify-center mb-4">
            <span className="px-4 py-1.5 text-[10px] font-black tracking-wider text-[#92400E] uppercase bg-[#FEF3C7] rounded-full border border-[#FDE68A] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-star-twinkle" />
              Sila Baca Dengan Khusyuk
            </span>
          </div>

          {/* Arabic Core Typography with custom childhood touch */}
          <div className="font-arabic text-3xl font-extrabold text-[#7C3AED] leading-loose my-3 select-all tracking-wide drop-shadow-xs">
            {arabic}
          </div>

          {/* Rumi Transliteration */}
          <div className="text-[15px] font-black text-slate-700 mt-2 select-all leading-snug px-2 italic">
            &quot;{rumi}&quot;
          </div>

          {/* Elegant Divider Line with miniature symbol */}
          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent to-[#FDE68A]" />
            <span className="text-amber-505 text-xs">⭐</span>
            <div className="flex-1 h-[2px] bg-gradient-to-l from-transparent to-[#FDE68A]" />
          </div>

          {/* Meaning / Translation */}
          <div className="text-left bg-white/80 p-3.5 rounded-2xl border-2 border-amber-100 shadow-inner">
            <span className="text-[10px] font-black tracking-wider text-amber-600 uppercase block mb-1">
              Maksud Lafaz:
            </span>
            <p className="text-[11px] font-black text-[#78350F] leading-relaxed">
              {maksud}
            </p>
          </div>

        </div>

        {/* Vector SVG Praying Child Illustration */}
        <div className="w-full my-4 flex flex-col items-center justify-center">
          <PrayingChildIllustration className="h-40" />
          <p className="text-[10px] font-black tracking-wide text-purple-950 uppercase mt-2 bg-purple-100/70 border border-purple-200 px-3 py-1 rounded-full flex items-center gap-1.5 animate-pulse-soft">
            <span>🤲</span> Bayangkan limpahan rahmat Allah swt
          </p>
        </div>

        {/* Action Buttons with Purple Bottom Styling */}
        <div className="flex items-center gap-3 select-none mt-auto">
          
          {/* Audio Nasihat Button */}
          <button
            id="listen-audio-btn"
            onClick={handleListenAudio}
            className="flex-1 py-4 border-3 border-purple-600 text-purple-600 hover:bg-purple-50 font-black rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-all text-sm cursor-pointer bg-white shadow-sm"
          >
            <Volume2 className="w-4.5 h-4.5" />
            Dengar Nasihat
          </button>

          {/* Play/Kira Button */}
          <button
            id="mula-kiraan-btn"
            onClick={handleStartCounter}
            className="flex-1 py-4 bg-primary hover:bg-purple-700 text-white font-black rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-all shadow-md text-sm cursor-pointer animate-pulse-soft"
          >
            <Play className="w-4.5 h-4.5 fill-current" />
            Sebut & Kira
          </button>

        </div>

      </main>

      {/* Audio Fallback Toast */}
      {audioFallback && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-fade-in">
          <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl px-5 py-3 shadow-lg text-center">
            <p className="text-xs font-black text-amber-900">{audioFallback}</p>
          </div>
        </div>
      )}

    </AppPhoneFrame>
  );
};
