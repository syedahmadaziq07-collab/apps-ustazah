import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, AlertCircle, Sparkles, Star, Heart, Volume2, Brain, Wind, Coffee } from 'lucide-react';
import { emotionData } from '../data/emotions';
import { EmotionKey, TherapyContent, EmotionContent } from '../types';
import { StudentLayout } from '../components/StudentLayout';
import {
  AppPhoneFrame,
  SoftSkyBackground,
  StarSparklePattern,
  IslamicMoonStarDecoration,
  EmotionChildIllustration
} from '../components/Decorations';
import { getEmotionById, getTherapiesByEmotion } from '../services/emotionContentService';

const therapyIcons: Record<string, React.ReactNode> = {
  zikir: <Heart className="w-5 h-5" />,
  doa: <BookOpen className="w-5 h-5" />,
  breathing: <Wind className="w-5 h-5" />,
  kata_semangat: <Sparkles className="w-5 h-5" />,
  rehat: <Coffee className="w-5 h-5" />,
};

const therapyColors: Record<string, string> = {
  zikir: 'bg-emerald-50 border-emerald-200 text-emerald-700',
  doa: 'bg-blue-50 border-blue-200 text-blue-700',
  breathing: 'bg-cyan-50 border-cyan-200 text-cyan-700',
  kata_semangat: 'bg-amber-50 border-amber-200 text-amber-700',
  rehat: 'bg-purple-50 border-purple-200 text-purple-700',
};

export const EmotionDetailScreen: React.FC = () => {
  const { emotionId } = useParams<{ emotionId: string }>();
  const navigate = useNavigate();
  const [therapies, setTherapies] = useState<TherapyContent[]>([]);
  const [loadingTherapies, setLoadingTherapies] = useState(true);
  const [emotionImageUrl, setEmotionImageUrl] = useState('');
  const [emotionDataFull, setEmotionDataFull] = useState<EmotionContent | null>(null);

  const evVal = (emotionId || 'tenang') as EmotionKey;
  const currentEmotion = emotionData[evVal];

  useEffect(() => {
    if (emotionId) {
      setLoadingTherapies(true);
      getEmotionById(emotionId).then(e => {
        setEmotionDataFull(e);
        if (e?.image_url) setEmotionImageUrl(e.image_url);
      });
      getTherapiesByEmotion(emotionId).then(list => {
        setTherapies(list.filter(t => t.is_active));
        setLoadingTherapies(false);
      });
    }
  }, [emotionId]);

  useEffect(() => {
    if (!emotionDataFull?.audio_malay_url) return;
    const audio = new Audio(emotionDataFull.audio_malay_url);
    audio.play().catch(() => {});
    return () => { audio.pause(); audio.src = ''; };
  }, [emotionDataFull?.audio_malay_url]);

  if (!currentEmotion) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-5 bg-bg-app select-none text-center">
        <AlertCircle className="w-12 h-12 text-rose-500 mb-2" />
        <p className="font-extrabold text-lg text-slate-800">Emosi tidak dijumpai.</p>
        <button onClick={() => navigate('/')}
          className="mt-4 px-6 py-2 bg-primary text-white font-extrabold rounded-xl shadow-md cursor-pointer">
          Balik ke Utama
        </button>
      </div>
    );
  }

  const colorMap: Record<string, string> = {
    yellow: 'text-amber-500 border-amber-300 bg-amber-50',
    red: 'text-rose-500 border-rose-300 bg-rose-50',
    blue: 'text-blue-500 border-blue-350 bg-blue-50',
    purple: 'text-purple-500 border-purple-300 bg-purple-50',
    orange: 'text-orange-500 border-orange-350 bg-orange-50',
    teal: 'text-teal-600 border-teal-350 bg-teal-50',
    green: 'text-emerald-500 border-emerald-350 bg-emerald-50',
  };
  const badgeMap: Record<string, string> = {
    yellow: 'bg-amber-100 text-[#78350F] border-amber-200',
    red: 'bg-rose-100 text-[#991B1B] border-rose-200',
    blue: 'bg-blue-100 text-[#1E3A8A] border-blue-200',
    purple: 'bg-purple-100 text-[#581C87] border-purple-200',
    orange: 'bg-orange-100 text-[#7C2D12] border-orange-200',
    teal: 'bg-teal-100 text-[#115E59] border-teal-200',
    green: 'bg-emerald-100 text-[#064E3B] border-emerald-250',
  };

  const themeBorder = colorMap[currentEmotion.color] || colorMap.purple;
  const badgeStyle = badgeMap[currentEmotion.color] || badgeMap.purple;

  return (
    <StudentLayout activeNav={null}>
    <AppPhoneFrame id={`emotion-detail-${evVal}`} className="relative flex flex-col min-h-screen bg-transparent select-none lg:max-w-none lg:mx-0 lg:rounded-none lg:border-0 lg:my-0 lg:shadow-none">
      <SoftSkyBackground variant="sunset">
        <StarSparklePattern />
      </SoftSkyBackground>
      <IslamicMoonStarDecoration className="absolute top-18 right-2 z-10 scale-90" />

      <header className="flex items-center px-4 pt-5 pb-3 bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-purple-100/50">
        <button onClick={() => navigate('/')}
          className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-purple-50 active:scale-95 transition-all shadow-sm cursor-pointer border border-purple-100">
          <ArrowLeft className="w-5 h-5 text-purple-600" />
        </button>
        <div className="ml-3 flex flex-col">
          <span className="text-[10px] font-black text-purple-500 uppercase tracking-widest leading-none mb-0.5">Diagnos Jiwa</span>
          <h2 className="text-base font-black text-slate-800 tracking-tight leading-none">Terapi Emosi Anak</h2>
        </div>
      </header>

      <main className="flex-grow px-5 pt-4 pb-6 relative z-10 overflow-y-auto">
        <div className="my-1 text-center bg-white/60 backdrop-blur-xs p-3 rounded-3xl border border-purple-100/50">
          <div className="text-6xl animate-pulse-soft filter drop-shadow-sm select-none my-1 flex items-center justify-center">
            {emotionImageUrl ? (
              <img src={emotionImageUrl} alt={currentEmotion.label} className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md" />
            ) : (
              currentEmotion.emoji
            )}
          </div>
          <span className={`text-[10px] font-black tracking-widest uppercase border px-3.5 py-1 rounded-full ${badgeStyle}`}>
            Kamu Sedang Rasa {currentEmotion.label}
          </span>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight mt-1 leading-none uppercase select-none">{currentEmotion.label}</h1>
        </div>

        <div className="w-full my-3 flex items-center justify-center">
          {emotionImageUrl ? (
            <img src={emotionImageUrl} alt={currentEmotion.label} className="h-44 w-auto object-contain rounded-2xl" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          ) : (
            <EmotionChildIllustration emotion={evVal} className="h-44" />
          )}
        </div>

        <div className="bg-white rounded-[32px] p-5.5 border-2 border-purple-100/65 shadow-[0_12px_24px_-10px_rgba(124,58,237,0.12)] text-left mt-auto">
          <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-2 flex items-center gap-1.5 border-b-2 border-purple-100 pb-2">
            <Sparkles className="w-4 h-4 text-amber-500 animate-star-twinkle" />
            Nasihat Santun Cikgu:
          </h3>
          <div className="bg-[#FFFDF4]/95 p-3.5 rounded-2xl border-2 border-amber-200 shadow-inner mb-4.5">
            <p className="text-[11.5px] font-black text-[#78350F] leading-relaxed">
              &quot;{currentEmotion.nasihat}&quot;
            </p>
          </div>

          {/* Therapy Selection */}
          <div className="mt-4">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-3 flex items-center gap-1.5">
              <Star className="w-4 h-4 text-amber-500" />
              Pilih Aktiviti Terapi:
            </h3>

            {loadingTherapies ? (
              <p className="text-[10px] font-bold text-slate-400">Sedang memuatkan...</p>
            ) : therapies.length === 0 ? (
              <p className="text-[10px] font-bold text-slate-400">Cikgu belum menambah kandungan ini.</p>
            ) : (
              <div className="space-y-3">
                {therapies.map(t => (
                  <button key={t.id}
                    onClick={() => navigate(`/baca/${evVal}?therapy=${t.id}`)}
                    className="w-full flex items-center gap-3 p-3.5 rounded-2xl border-2 border-purple-100 bg-white hover:bg-purple-50 active:scale-[0.98] transition-all cursor-pointer text-left shadow-sm">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${therapyColors[t.therapy_type] || 'bg-purple-50 border-purple-200 text-purple-700'} border`}>
                      {therapyIcons[t.therapy_type] || <Heart className="w-5 h-5" />}
                    </div>
                    <div className="flex-grow min-w-0">
                      <p className="text-sm font-black text-slate-800">{t.title}</p>
                      <p className="text-[10px] font-bold text-slate-500">{t.instruction}</p>
                    </div>
                    <span className="text-xs font-black text-purple-500">{t.count_target}x</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </AppPhoneFrame>
    </StudentLayout>
  );
};
