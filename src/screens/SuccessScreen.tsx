import React, { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Sparkles, Home, Star, Volume2 } from 'lucide-react';
import { emotionData, staticDuas } from '../data/emotions';
import { 
  AppPhoneFrame, 
  SoftSkyBackground, 
  StarSparklePattern, 
  ConfettiPattern,
  SuccessStarMosqueIllustration
} from '../components/Decorations';
import { EmotionKey } from '../types';
import { playStaticAudio } from '../utils/audio';

export const SuccessScreen: React.FC = () => {
  const { emotionId } = useParams<{ emotionId: string }>();
  const navigate = useNavigate();
  const [audioFallback, setAudioFallback] = useState('');

  const idVal = emotionId || 'tenang';
  
  let zikirText = "berzikir";

  if (idVal in emotionData) {
    zikirText = emotionData[idVal as EmotionKey].zikirRumi;
  } else {
    const dataObj = staticDuas.find(d => d.id === idVal);
    if (dataObj) {
      zikirText = dataObj.rumi;
    }
  }

  const handlePlayTahniah = useCallback(() => {
    setAudioFallback('');
    playStaticAudio('/audio/malay/tahniah.mp3', () => {
      setAudioFallback('Audio ucapan akan ditambah kemudian.');
    });
  }, []);

  return (
    <AppPhoneFrame id="success-screen-container" className="relative flex flex-col justify-between min-h-screen bg-transparent select-none overflow-hidden pb-8">
      
      {/* Dynamic Sky Sunset Gradient Background */}
      <SoftSkyBackground variant="sunset">
        <StarSparklePattern />
        <ConfettiPattern />
      </SoftSkyBackground>

      {/* Decorative Twinkling Stars */}
      <Star className="absolute top-12 left-10 text-amber-400 fill-amber-200 w-5 h-5 animate-star-twinkle" />
      <Star className="absolute top-36 right-8 text-amber-500 fill-yellow-100 w-7 h-7 animate-pulse-soft" />
      <Star className="absolute bottom-52 left-6 text-amber-400 fill-amber-200 w-5 h-5 animate-star-twinkle" />

      {/* Main Success Area */}
      <main className="flex-grow px-5 pt-6 pb-6 text-center flex flex-col justify-between relative z-20 overflow-y-auto">
        
        {/* Success Star Vector Visuals with Mosque Silhouette inside */}
        <div className="w-full my-3 flex items-center justify-center">
          <SuccessStarMosqueIllustration className="h-56" />
        </div>

        {/* Title */}
        <div className="my-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#047857] bg-[#E6FDF4] border-2 border-[#A7F3D0] px-4 py-1.5 rounded-full inline-flex items-center gap-1.5 animate-bounce-soft mb-2">
            ⭐ Alhamdulillah ⭐
          </span>
          <h1 className="text-4xl font-extrabold text-primary tracking-tight font-sans animate-bounce leading-none drop-shadow-sm">
            Tahniah! 🎉
          </h1>
          <p className="text-[13px] font-black text-slate-800 mt-2 px-3 leading-relaxed">
            Kamu berjaya membaca <span className="text-purple-650 font-black uppercase">&quot;{zikirText}&quot;</span> sebanyak <strong className="text-emerald-650 font-black">10 kali</strong>.
          </p>
        </div>

        {/* Reminder checkcard with childhood style rounded corners */}
        <div className="bg-white/95 rounded-[32px] p-5 border-2 border-purple-100/55 shadow-[0_12px_24px_-10px_rgba(124,58,237,0.12)] text-left mt-3">
          <h2 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-3 flex items-center gap-1.5 border-b-2 border-purple-100 pb-2">
            <Sparkles className="w-4.5 h-4.5 text-amber-500 animate-star-twinkle" />
            Pesanan Untuk Kamu:
          </h2>

          <ul className="space-y-3 font-sans text-[11px] font-black text-slate-700">
            <li className="flex items-start gap-2.5">
              <span className="text-lg bg-pink-100 border border-pink-200 p-1 rounded-xl shrink-0">🤲</span>
              <span className="leading-relaxed pt-0.5">
                Allah sentiasa sayang kepada kanak-kanak yang sabar, tenang, dan rajin berzikir.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-lg bg-[#E6FDF4] border border-[#A7F3D0] p-1 rounded-xl shrink-0">❤️</span>
              <span className="leading-relaxed pt-0.5">
                Kamu sangat hebat hari ini kerana mengawal perasaan dengan penuh tenang dan ceria!
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-lg bg-amber-100 border border-amber-200 p-1 rounded-xl shrink-0">⭐</span>
              <span className="leading-relaxed pt-0.5">
                Mari teruskan amalan zikir harian untuk memelihara jiwa yang murni.
              </span>
            </li>
          </ul>
        </div>

        {/* Audio Ucapan and Return Home */}
        <div className="w-full mt-5 select-none flex flex-col gap-3">
          <button
            id="play-tahniah-audio-btn"
            onClick={handlePlayTahniah}
            className="w-full py-4 border-3 border-amber-400 text-amber-700 hover:bg-amber-50 font-black rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-all text-sm cursor-pointer bg-white/90 shadow-sm"
          >
            <Volume2 className="w-5 h-5" />
            Dengar Ucapan
          </button>
          <button
            id="back-to-home-from-success"
            onClick={() => navigate('/')}
            className="w-full py-4 bg-gradient-to-r from-primary to-purple-600 hover:from-purple-700 hover:to-purple-800 text-white font-black text-base rounded-2xl flex items-center justify-center gap-2 shadow-lg border-b-4 border-purple-800 active:translate-y-[2px] active:border-b-2 transition-all cursor-pointer"
          >
            <Home className="w-5 h-5" />
            Kembali ke Utama
          </button>
        </div>

      </main>

      {/* Audio Fallback Toast */}
      {audioFallback && (
        <div className="fixed bottom-32 left-1/2 -translate-x-1/2 z-50 animate-fade-in">
          <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl px-5 py-3 shadow-lg text-center">
            <p className="text-xs font-black text-amber-900">{audioFallback}</p>
          </div>
        </div>
      )}

    </AppPhoneFrame>
  );
};
