import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, AlertCircle, Sparkles, Star } from 'lucide-react';
import { emotionData } from '../data/emotions';
import { EmotionKey } from '../types';
import { 
  AppPhoneFrame, 
  SoftSkyBackground, 
  StarSparklePattern, 
  IslamicMoonStarDecoration,
  EmotionChildIllustration 
} from '../components/Decorations';

export const EmotionDetailScreen: React.FC = () => {
  const { emotionId } = useParams<{ emotionId: string }>();
  const navigate = useNavigate();

  const evVal = (emotionId || 'tenang') as EmotionKey;
  const currentEmotion = emotionData[evVal];

  if (!currentEmotion) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-5 bg-bg-app select-none text-center">
        <AlertCircle className="w-12 h-12 text-rose-500 mb-2" />
        <p className="font-extrabold text-lg text-slate-800">Emosi tidak dijumpai.</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 px-6 py-2 bg-primary text-white font-extrabold rounded-xl shadow-md cursor-pointer"
        >
          Balik ke Utama
        </button>
      </div>
    );
  }

  // Map theme colors to CSS colors
  const colorMap = {
    yellow: 'text-amber-500 border-amber-300 bg-amber-50',
    red: 'text-rose-500 border-rose-300 bg-rose-50',
    blue: 'text-blue-500 border-blue-350 bg-blue-50',
    purple: 'text-purple-500 border-purple-300 bg-purple-50',
    orange: 'text-orange-500 border-orange-350 bg-orange-50',
    teal: 'text-teal-600 border-teal-350 bg-teal-50',
    green: 'text-emerald-500 border-emerald-350 bg-emerald-50',
  };

  const badgeMap = {
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
    <AppPhoneFrame id={`emotion-detail-${evVal}`} className="relative flex flex-col justify-between min-h-screen bg-transparent select-none">
      
      {/* Soft Sky Pastel background behind everything */}
      <SoftSkyBackground variant="sunset">
        <StarSparklePattern />
      </SoftSkyBackground>

      {/* Hanging crescent */}
      <IslamicMoonStarDecoration className="absolute top-18 right-2 z-10 scale-90" />

      {/* Header bar with Back button */}
      <header className="flex items-center px-4 pt-5 pb-3 bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-purple-100/50">
        <button
          id="back-to-home-from-detail"
          onClick={() => navigate('/')}
          className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-text-main hover:bg-purple-50 active:scale-95 transition-all shadow-sm cursor-pointer border border-purple-100"
        >
          <ArrowLeft className="w-5 h-5 text-purple-600" />
        </button>
        <div className="ml-3 flex flex-col">
          <span className="text-[10px] font-black text-purple-500 uppercase tracking-widest leading-none mb-0.5">Diagnos Jiwa</span>
          <h2 className="text-base font-black text-slate-800 tracking-tight leading-none">
            Terapi Emosi Anak
          </h2>
        </div>
      </header>

      {/* Main Emotion Summary View */}
      <main className="flex-grow px-5 pt-4 pb-6 select-none text-center flex flex-col justify-between relative z-10 overflow-y-auto">
        
        {/* Emotion title banner */}
        <div className="my-1 text-center bg-white/60 backdrop-blur-xs p-3 rounded-3xl border border-purple-100/50">
          {/* Large Emoji centered with scale pulse */}
          <div className="text-6xl animate-pulse-soft filter drop-shadow-sm select-none my-1">
            {currentEmotion.emoji}
          </div>

          <span className={`text-[10px] font-black tracking-widest uppercase border px-3.5 py-1 rounded-full ${badgeStyle}`}>
            Kamu Sedang Rasa {currentEmotion.label}
          </span>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight mt-1 leading-none uppercase select-none">
            {currentEmotion.label}
          </h1>
        </div>

        {/* Cohesive Vector Emotion Illustration replacing traditional static SVGs */}
        <div className="w-full my-3 flex items-center justify-center">
          <EmotionChildIllustration emotion={evVal} className="h-44" />
        </div>

        {/* White Advice & Task Card with children theme */}
        <div className="bg-white rounded-[32px] p-5.5 border-2 border-purple-100/65 shadow-[0_12px_24px_-10px_rgba(124,58,237,0.12)] text-left mt-auto">
          
          <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-2 flex items-center gap-1.5 border-b-2 border-purple-100 pb-2">
            <Sparkles className="w-4 h-4 text-amber-500 animate-star-twinkle" />
            Nasihat Santun Cikgu:
          </h3>
          
          {/* Advice Text */}
          <div className="bg-[#FFFDF4]/95 p-3.5 rounded-2xl border-2 border-amber-200 shadow-inner mb-4.5">
            <p className="text-[11.5px] font-black text-[#78350F] leading-relaxed">
              &quot;{currentEmotion.nasihat}&quot;
            </p>
          </div>

          {/* Activity highlight card */}
          <div className="bg-emerald-50 border-2 border-emerald-250 rounded-2xl p-4 flex gap-3.5 items-center">
            <span className="text-3xl filter drop-shadow-sm shrink-0 select-none animate-bounce-soft">✨</span>
            <div className="flex-grow min-w-0">
              <span className="text-[9px] font-black tracking-widest text-emerald-800 uppercase block leading-none">
                Aktiviti Yang Dicadangkan:
              </span>
              <p className="text-[13px] font-black text-emerald-950 mt-1 leading-tight mb-0.5">
                {currentEmotion.aktiviti}
              </p>
            </div>
          </div>

          {/* Large Action Button */}
          <button
            id={`mula-sekarang-btn-${evVal}`}
            onClick={() => navigate(`/baca/${evVal}`)}
            className="mt-5 w-full py-4.5 bg-gradient-to-r from-primary to-purple-600 hover:from-purple-700 hover:to-purple-800 text-white font-black text-base rounded-2xl flex items-center justify-center gap-2 shadow-lg border-b-4 border-purple-800 active:translate-y-[2px] active:border-b-2 transition-all cursor-pointer animate-pulse-soft"
          >
            Mula Terapi Penawar <span className="text-lg">➔</span>
          </button>

        </div>

      </main>
    </AppPhoneFrame>
  );
};
