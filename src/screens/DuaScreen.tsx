import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Star, HelpCircle, Sparkles } from 'lucide-react';
import { 
  AppPhoneFrame, 
  SoftSkyBackground, 
  StarSparklePattern, 
  IslamicMoonStarDecoration,
  PrayingChildIllustration 
} from '../components/Decorations';
import { BottomNav } from '../components/BottomNav';
import { staticDuas } from '../data/emotions';

export const DuaScreen: React.FC = () => {
  const navigate = useNavigate();

  const handleDuaClick = (id: string) => {
    navigate(`/baca/${id}`);
  };

  return (
    <AppPhoneFrame id="dua-screen" className="relative flex flex-col justify-between min-h-screen bg-transparent select-none">
      
      {/* Soft Pastel Background Overlay */}
      <SoftSkyBackground variant="sunset">
        <StarSparklePattern />
      </SoftSkyBackground>

      {/* Elegant hanging crescent decoration */}
      <IslamicMoonStarDecoration className="absolute top-18 right-2 z-10 scale-90" />

      {/* Header Bar */}
      <header className="flex items-center gap-2 px-6 pt-5 pb-3 bg-white/90 backdrop-blur-md sticky top-0 z-40 border-b border-purple-100/70 shadow-xs">
        {/* Book icon */}
        <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center border border-amber-300">
          <span className="text-lg">📖</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-amber-600 uppercase tracking-wider leading-none mb-0.5">Sesi Keimanan</span>
          <h1 className="text-base font-black text-slate-800 tracking-tight leading-none">
            Himpunan Doa Pilihan
          </h1>
        </div>
      </header>

      {/* Main Content scroll flow */}
      <main className="flex-grow px-5 pt-3 pb-6 select-none relative z-10 overflow-y-auto">
        
        {/* Top Hero Layout: Center-aligned Praying Child Illustration */}
        <div className="bg-white/95 rounded-[32px] p-5 shadow-[0_12px_24px_-10px_rgba(124,58,237,0.1)] border-2 border-purple-100/60 mb-5 text-center relative">
          {/* Sparkles around */}
          <span className="absolute -top-3 -left-1 text-2xl animate-star-twinkle">✨</span>
          <span className="absolute -bottom-2 -right-1 text-xl animate-pulse-soft">⭐</span>

          {/* Child praying centered */}
          <PrayingChildIllustration className="h-32 mb-1" />

          <span className="text-[9px] font-black text-purple-600 uppercase tracking-widest bg-purple-100/60 px-3 py-1 rounded-full inline-block animate-pulse-soft">
            Tenang Jiwa Melalui Doa 🤲
          </span>
          <h2 className="text-base font-black text-slate-800 mt-2">
            Mari Membaca Doa Harian
          </h2>
          <p className="text-[10px] font-bold text-slate-500 mt-1 leading-relaxed px-2">
            Membiasakan murid melafazkan doa membantu membina ketahanan emosi serta jiwa yang bersyukur dan tenang.
          </p>
        </div>

        {/* Header Senator list */}
        <div className="flex items-center gap-1.5 mb-3.5 px-1">
          <Star className="w-3.5 h-3.5 text-amber-500 animate-star-twinkle" />
          <h3 className="text-xs font-black text-purple-950 uppercase tracking-widest">
            Senarai Doa Lembut Hati
          </h3>
        </div>

        {/* Stack of widened HORIZONTAL cards as requested in the mockup */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
          
          {staticDuas.map((dua) => {
            // Determine custom pastel themes for each card
            const relativeColor = {
              'istighfar': 'from-[#FEF2F2] to-[#FFF1F2] border-red-200 text-rose-900',
              'doa-tenang': 'from-[#FFFBEB] to-[#FEF3C7] border-amber-200 text-amber-900',
              'doa-perlindungan': 'from-[#F5F3FF] to-[#EDE9FE] border-purple-200 text-purple-900',
              'alhamdulillah': 'from-[#ECFDF5] to-[#D1FAE5] border-emerald-250 text-emerald-950',
              'doa-ibu-bapa': 'from-[#EFF6FF] to-[#DBEAFE] border-blue-200 text-blue-900'
            }[dua.id] || 'from-white to-purple-50/20 border-purple-100 text-purple-950';

            return (
              <button
                id={`dua-card-btn-${dua.id}`}
                key={dua.id}
                onClick={() => handleDuaClick(dua.id)}
                className={`w-full bg-gradient-to-r ${relativeColor} rounded-2xl p-4.5 border-2 shadow-sm flex items-center justify-between gap-4 text-left hover:scale-[1.03] active:scale-97 hover:shadow-md transition-all duration-150 cursor-pointer select-none relative overflow-hidden`}
              >
                
                {/* Visual sparkles absolute backing */}
                <span className="absolute -top-1 -right-1 text-3xl opacity-15">⭐</span>

                {/* Left Area: Icon & Typography */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-2xl filter drop-shadow-xs shrink-0">{dua.emojiDecorative}</span>
                    <h4 className="text-xs font-black uppercase tracking-widest leading-none">
                      {dua.name}
                    </h4>
                  </div>
                  
                  {/* Arabic block simplified & beautiful */}
                  <p className="font-arabic text-left text-lg font-black leading-relaxed truncate opacity-95">
                    {dua.arabic}
                  </p>

                  {/* Rumi Transcription */}
                  <p className="text-[10px] font-black italic mt-1 opacity-90 truncate max-w-[240px]">
                    &quot;{dua.rumi}&quot;
                  </p>
                  
                  {/* Meaning */}
                  <p className="text-[10px] font-black opacity-80 mt-1 lines-clamp-1 truncate max-w-[240px]">
                    {dua.meaning}
                  </p>
                </div>

                {/* Right Area: Large friendly enter chevron arrow indicator */}
                <div className="w-8 h-8 rounded-full bg-white/70 border border-purple-200/50 flex items-center justify-center text-purple-650 shrink-0 font-extrabold text-sm shadow-xs group-hover:scale-105 active:scale-95 transition-all">
                  📖
                </div>

              </button>
            );
          })}

        </div>

      </main>

      {/* Dynamic Bottom Navigation */}
      <BottomNav active="Doa" />
    </AppPhoneFrame>
  );
};
