import React, { useState } from 'react';
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

export const ReadingScreen: React.FC = () => {
  const { emotionId } = useParams<{ emotionId: string }>();
  const navigate = useNavigate();
  const [showAudioModal, setShowAudioModal] = useState(false);

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

  const handleListenAudio = () => {
    setShowAudioModal(true);
  };

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
          
          {/* Audio Listen Button */}
          <button
            id="listen-audio-btn"
            onClick={handleListenAudio}
            className="flex-1 py-4 border-3 border-purple-600 text-purple-600 hover:bg-purple-50 font-black rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-all text-sm cursor-pointer bg-white shadow-sm"
          >
            <Volume2 className="w-4.5 h-4.5" />
            Dengar Sebutan
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

      {/* Floating Audio Player Modal */}
      {showAudioModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-5 z-50 animate-fade-in">
          <div className="bg-white rounded-[32px] w-full max-w-[340px] p-6 shadow-2xl border-4 border-amber-100 text-center animate-bounce-in relative">
            <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-4xl bg-amber-100 p-2.5 rounded-full border-3 border-amber-300 shadow-md">🎧</span>
            
            <h3 className="text-lg font-black text-slate-800 mt-6 mb-2">Terapi Audio ZikirCare</h3>
            
            <div className="p-3.5 bg-amber-50 rounded-2xl border-2 border-amber-100 text-left my-4 text-xs font-bold text-amber-900">
              <p className="mb-2 flex items-center gap-1">
                <span>🔊</span> <strong>Sebutlah mengikut rentak:</strong>
              </p>
              <p className="leading-relaxed">
                Tarik nafas perlahan-lahan dari hidung, sebutkan kalimah suci ini dengan tenang di dalam minda seiring hembusan nafas yang damai.
              </p>
            </div>

            {/* Simulated Child Wave player */}
            <div className="flex justify-center items-center gap-1 mb-5 h-8">
              <span className="w-1 bg-purple-600 h-6 rounded-full animate-pulse" />
              <span className="w-1 bg-purple-500 h-3 rounded-full animate-bounce-soft" style={{ animationDelay: '0.1s' }} />
              <span className="w-1 bg-purple-400 h-8 rounded-full animate-pulse-soft" style={{ animationDelay: '0.2s' }} />
              <span className="w-1 bg-purple-500 h-4 rounded-full animate-bounce-soft" />
              <span className="w-1 bg-purple-600 h-7 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
            </div>

            <button
              id="close-audio-modal-btn"
              onClick={() => setShowAudioModal(false)}
              className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-black rounded-2xl text-xs tracking-wide cursor-pointer"
            >
              Tutup & Mula Kira
            </button>
          </div>
        </div>
      )}

    </AppPhoneFrame>
  );
};
