import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Play, Volume2, Sparkles, Star } from 'lucide-react';
import { emotionData, staticDuas } from '../data/emotions';
import {
  AppPhoneFrame,
  SoftSkyBackground,
  StarSparklePattern,
  PrayingChildIllustration,
  IslamicMoonStarDecoration
} from '../components/Decorations';
import { EmotionKey, TherapyContent, DuaContent } from '../types';
import { playStaticAudio } from '../utils/audio';
import { getTherapyById } from '../services/emotionContentService';
import { getDuaById } from '../services/duaService';

export const ReadingScreen: React.FC = () => {
  const { emotionId } = useParams<{ emotionId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [audioFallback, setAudioFallback] = useState('');
  const [therapyData, setTherapyData] = useState<TherapyContent | null>(null);
  const [dynamicDua, setDynamicDua] = useState<DuaContent | null>(null);
  const [loaded, setLoaded] = useState(false);

  const idVal = emotionId || 'tenang';
  const therapyId = searchParams.get('therapy');

  useEffect(() => {
    if (therapyId) {
      getTherapyById(therapyId).then(t => { setTherapyData(t); setLoaded(true); });
    } else {
      // Check if this ID is a dynamic dua (not in staticDuas)
      const isStaticDua = staticDuas.some(d => d.id === idVal);
      if (!(idVal in emotionData) && !isStaticDua) {
        getDuaById(idVal).then(d => { setDynamicDua(d); setLoaded(true); });
      } else {
        setLoaded(true);
      }
    }
  }, [therapyId, idVal]);

  let title = "Zikir";
  let arabic = "";
  let rumi = "";
  let maksud = "";
  let isDua = false;
  let audioPath = '';

  if (therapyData) {
    title = therapyData.title;
    arabic = therapyData.arabic_text;
    rumi = therapyData.rumi_text;
    maksud = therapyData.meaning_text;
    audioPath = therapyData.malay_audio_url;
  } else if (dynamicDua) {
    title = dynamicDua.title;
    arabic = dynamicDua.arabic_text;
    rumi = dynamicDua.rumi_text;
    maksud = dynamicDua.meaning_text;
    audioPath = dynamicDua.audio_url;
    isDua = true;
  } else if (idVal in emotionData) {
    const data = emotionData[idVal as EmotionKey];
    title = data.label;
    arabic = data.zikir;
    rumi = data.zikirRumi;
    maksud = data.zikirMaksud;
    audioPath = data.audio.malay;
  } else {
    const dataObj = staticDuas.find(d => d.id === idVal);
    if (dataObj) {
      title = dataObj.name;
      arabic = dataObj.arabic;
      rumi = dataObj.rumi;
      maksud = dataObj.meaning;
      audioPath = dataObj.audio.malay;
      isDua = true;
    }
  }

  const handleListenAudio = useCallback(() => {
    setAudioFallback('');
    const fb = isDua ? 'Audio doa belum ditambah.' : 'Audio belum ditambah lagi.';
    if (audioPath) {
      playStaticAudio(audioPath, () => {
        setAudioFallback(fb);
      });
    } else {
      setAudioFallback(fb);
    }
  }, [audioPath, isDua]);

  const handleStartCounter = () => {
    if (therapyId) {
      navigate(`/kira/${idVal}?therapy=${therapyId}`);
    } else {
      navigate(`/kira/${idVal}`);
    }
  };

  return (
    <AppPhoneFrame id={`reading-screen-${idVal}`} className="relative flex flex-col justify-between min-h-screen bg-transparent">
      <SoftSkyBackground variant="sunset">
        <StarSparklePattern />
      </SoftSkyBackground>
      <IslamicMoonStarDecoration className="absolute top-18 right-2 z-10 scale-90" />

      <header className="flex items-center px-4 pt-5 pb-3 bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-purple-100/50">
        <button onClick={() => {
          if (therapyId) navigate(`/emosi/${idVal}`);
          else if (isDua) navigate('/doa');
          else navigate(`/emosi/${idVal}`);
        }}
          className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-purple-50 active:scale-95 transition-all shadow-sm cursor-pointer border border-purple-100">
          <ArrowLeft className="w-5 h-5 text-purple-600" />
        </button>
        <div className="ml-3 flex flex-col">
          <span className="text-[10px] font-black text-purple-500 uppercase tracking-widest leading-none mb-0.5">TERAPI MINDA</span>
          <h2 className="text-base font-black text-slate-800 tracking-tight leading-none">Sesi {title}</h2>
        </div>
      </header>

      <main className="flex-grow px-5 pt-4 pb-6 select-none text-center flex flex-col justify-between relative z-10 overflow-y-auto">
        <div className="bg-[#FFFDF4]/95 rounded-[32px] p-6 shadow-[0_12px_24px_-10px_rgba(124,58,237,0.12)] border-3 border-[#FDE68A] transition-all flex flex-col justify-center min-h-[220px] relative">
          <span className="absolute -top-3 -left-2 text-2xl animate-star-twinkle">⭐</span>
          <span className="absolute -bottom-2 -right-1 text-xl animate-pulse-soft">✨</span>

          <div className="flex justify-center mb-4">
            <span className="px-4 py-1.5 text-[10px] font-black tracking-wider text-[#92400E] uppercase bg-[#FEF3C7] rounded-full border border-[#FDE68A] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-star-twinkle" />
              {isDua ? 'Bacaan Arab' : 'Sila Baca Dengan Khusyuk'}
            </span>
          </div>

          {arabic && (
            <div className="font-arabic text-3xl font-extrabold text-[#7C3AED] leading-loose my-3 select-all tracking-wide drop-shadow-xs">{arabic}</div>
          )}

          {rumi && (
            <div>
              {isDua && <span className="text-[10px] font-black tracking-wider text-amber-600 uppercase block mt-3 mb-1">Cara sebut:</span>}
              <div className="text-[15px] font-black text-slate-700 select-all leading-snug px-2 italic">&quot;{rumi}&quot;</div>
            </div>
          )}

          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent to-[#FDE68A]" />
            <span className="text-amber-505 text-xs">⭐</span>
            <div className="flex-1 h-[2px] bg-gradient-to-l from-transparent to-[#FDE68A]" />
          </div>

          <div className="text-left bg-white/80 p-3.5 rounded-2xl border-2 border-amber-100 shadow-inner">
            <span className="text-[10px] font-black tracking-wider text-amber-600 uppercase block mb-1">Maksud:</span>
            <p className="text-[11px] font-black text-[#78350F] leading-relaxed">{maksud}</p>
          </div>
        </div>

        <div className="w-full my-4 flex flex-col items-center justify-center">
          <PrayingChildIllustration className="h-40" />
          <p className="text-[10px] font-black tracking-wide text-purple-950 uppercase mt-2 bg-purple-100/70 border border-purple-200 px-3 py-1 rounded-full flex items-center gap-1.5 animate-pulse-soft">
            <span>🤲</span> Bayangkan limpahan rahmat Allah swt
          </p>
        </div>

        <div className="flex items-center gap-3 select-none mt-auto">
          <button onClick={handleListenAudio}
            className="flex-1 py-4 border-3 border-purple-600 text-purple-600 hover:bg-purple-50 font-black rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-all text-sm cursor-pointer bg-white shadow-sm">
            <Volume2 className="w-4.5 h-4.5" />
            {isDua ? 'Dengar Audio' : 'Dengar Nasihat'}
          </button>
          <button onClick={handleStartCounter}
            className="flex-1 py-4 bg-primary hover:bg-purple-700 text-white font-black rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-all shadow-md text-sm cursor-pointer animate-pulse-soft">
            <Play className="w-4.5 h-4.5 fill-current" />
            Sebut & Kira
          </button>
        </div>
      </main>

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
