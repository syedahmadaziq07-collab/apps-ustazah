import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Trash2, Check, Award, BarChart3, Star, Sparkles, Share2, User } from 'lucide-react';
import { 
  AppPhoneFrame, 
  SoftSkyBackground, 
  StarSparklePattern, 
  IslamicMoonStarDecoration,
  CloudDecoration
} from '../components/Decorations';
import { BottomNav } from '../components/BottomNav';
import { StudentLayout } from '../components/StudentLayout';
import { SadChildIllustration } from '../components/Illustrations';
import { emotionData } from '../data/emotions';
import { EmotionKey, EmotionHistoryItem } from '../types';
import { getEmotions } from '../services/emotionContentService';

export const HistoryScreen: React.FC = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState<EmotionHistoryItem[]>([]);
  const [emotionImageMap, setEmotionImageMap] = useState<Record<string, string>>({});

  // Local helper to format date/time into beautiful Malay text
  const formatMalayTime = (isoString: string): string => {
    try {
      const d = new Date(isoString);
      const day = d.getDate();
      const monthNames = [
        "Januari", "Februari", "Mac", "April", "Mei", "Jun", 
        "Julai", "Ogos", "September", "Oktober", "November", "Disember"
      ];
      const month = monthNames[d.getMonth()];
      let hrs = d.getHours();
      const mins = d.getMinutes().toString().padStart(2, '0');
      
      let timeframe = 'pagi';
      if (hrs >= 12 && hrs < 14) timeframe = 'tengah hari';
      else if (hrs >= 14 && hrs < 19) timeframe = 'petang';
      else if (hrs >= 19 || hrs < 5) timeframe = 'malam';

      hrs = hrs % 12;
      hrs = hrs ? hrs : 12;

      const now = new Date();
      if (d.toDateString() === now.toDateString()) {
        return `Hari ini, ${hrs}:${mins} ${timeframe}`;
      }

      const yesterday = new Date();
      yesterday.setDate(now.getDate() - 1);
      if (d.toDateString() === yesterday.toDateString()) {
        return `Semalam, ${hrs}:${mins} ${timeframe}`;
      }

      return `${day} ${month}, ${hrs}:${mins} ${timeframe}`;
    } catch (e) {
      return "Baru sahaja";
    }
  };

  useEffect(() => {
    const rawHistory = localStorage.getItem('emosiHistory');
    if (!rawHistory) {
      const seedData: EmotionHistoryItem[] = [
        {
          id: 'seed-1',
          emotion: 'marah',
          label: 'Marah',
          emoji: '😡',
          aktiviti: 'Baca istighfar 10 kali',
          completedAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
          completed: true
        },
        {
          id: 'seed-2',
          emotion: 'sedih',
          label: 'Sedih',
          emoji: '😢',
          aktiviti: 'Baca doa kesedihan 10 kali',
          completedAt: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
          completed: true
        },
        {
          id: 'seed-3',
          emotion: 'gembira',
          label: 'Gembira',
          emoji: '😊',
          aktiviti: 'Baca Alhamdulillah 10 kali',
          completedAt: new Date(Date.now() - 1000 * 60 * 60 * 25).toISOString(),
          completed: true
        },
        {
          id: 'seed-4',
          emotion: 'takut',
          label: 'Takut',
          emoji: '😨',
          aktiviti: 'Baca doa perlindungan 10 kali',
          completedAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
          completed: true
        },
        {
          id: 'seed-5',
          emotion: 'tenang',
          label: 'Tenang',
          emoji: '😌',
          aktiviti: 'Baca tasbih 10 kali',
          completedAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
          completed: true
        }
      ];
      localStorage.setItem('emosiHistory', JSON.stringify(seedData));
      setHistory(seedData);
    } else {
      try {
        setHistory(JSON.parse(rawHistory));
      } catch (err) {
        setHistory([]);
      }
    }
    getEmotions().then(list => {
      const map: Record<string, string> = {};
      list.forEach(e => { if (e.image_url) map[e.id] = e.image_url; });
      setEmotionImageMap(map);
    }).catch(() => {});
  }, []);

  const emotionsList: { key: EmotionKey; emoji: string }[] = [
    { key: 'gembira', emoji: '😊' },
    { key: 'marah', emoji: '😡' },
    { key: 'sedih', emoji: '😢' },
    { key: 'takut', emoji: '😨' },
    { key: 'tenang', emoji: '😌' }
  ];

  const getStatsCount = (key: EmotionKey) => {
    return history.filter(item => item.emotion === key).length;
  };

  const handleClearHistory = () => {
    if (confirm("Adakah anda pasti mahu menetapkan semula (reset) semua rekod sejarah emosi?")) {
      localStorage.setItem('emosiHistory', JSON.stringify([]));
      setHistory([]);
    }
  };

  const handleShare = (item: EmotionHistoryItem) => {
    const text = item.shareText || `Assalamualaikum. Hari ini ${item.studentFullName || 'murid'} telah memilih emosi ${item.label} dan menyelesaikan aktiviti "${item.aktiviti}". Tahniah atas usaha yang baik.
Tarikh: ${item.completedDate || formatMalayTime(item.completedAt)}${item.completedTime ? ', ' + item.completedTime : ''}`;

    if (navigator.share) {
      navigator.share({ title: 'Rekod Emosi ZikirCare', text }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text).then(() => {
        alert('Rekod telah disalin. Boleh paste kepada ibu bapa.');
      }).catch(() => {});
    }
  };

  return (
    <StudentLayout activeNav="Sejarah">
    <AppPhoneFrame id="history-screen" className="relative flex flex-col justify-between min-h-screen bg-transparent select-none lg:max-w-none lg:mx-0 lg:rounded-none lg:border-0 lg:my-0 lg:shadow-none">
      
      {/* Soft warm Cream childhood background */}
      <SoftSkyBackground variant="sunset">
        <StarSparklePattern />
        <CloudDecoration className="absolute top-18 left-1 opacity-70 scale-90" speed="slow" />
      </SoftSkyBackground>

      {/* Hanging ornament */}
      <IslamicMoonStarDecoration className="absolute top-18 right-2 z-10 scale-90" />

      {/* Header Bar */}
      <header className="flex items-center justify-between px-6 pt-5 pb-3 bg-white/90 backdrop-blur-md sticky top-0 z-40 border-b border-purple-100/70 shadow-xs">
        <div className="flex items-center gap-2">
          {/* Calendar decoration */}
          <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center border border-amber-300">
            <span className="text-lg">📅</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-amber-600 uppercase tracking-wider leading-none mb-0.5">Rekod Perkembangan</span>
            <h1 className="text-base font-black text-slate-800 tracking-tight leading-none">
              Sejarah Emosi
            </h1>
          </div>
        </div>
        
        {history.length > 0 && (
          <button
            id="clear-history-btn"
            onClick={handleClearHistory}
            className="p-2.5 text-rose-500 hover:bg-rose-50 rounded-full border border-purple-100/50 hover:border-rose-200 transition-all cursor-pointer bg-white"
            title="Padam Semua Rekod"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </header>

      {/* Main Stats Scroll */}
      <main className="flex-grow px-5 pt-3 pb-6 select-none relative z-10 overflow-y-auto">
        
        {/* Weekly Stats Header structured extra round */}
        <div className="bg-white/95 rounded-[32px] p-5 shadow-[0_12px_24px_-10px_rgba(124,58,237,0.1)] border-2 border-purple-100/60 mb-5 relative">
          
          {/* Sparkly corner overlays */}
          <span className="absolute -top-3 -right-2 text-2xl animate-star-twinkle">✨</span>

          <div className="flex items-center gap-2 mb-2 text-primary">
            <BarChart3 className="w-4.5 h-4.5 text-purple-600" />
            <h2 className="text-xs font-black uppercase tracking-widest text-purple-950">Statistik Emosi</h2>
          </div>
          <p className="text-[11px] font-bold text-slate-500 leading-relaxed px-1">
            Pantau graf ringkas yang kerap dilalui anak murid untuk membantu guru kaunseling mengenali emosi semasa harian.
          </p>

          {/* Emoji row dashboard customized with cheerful round elements */}
          <div className="grid grid-cols-5 gap-1.5 mt-4 text-center bg-purple-50/50 p-3.5 rounded-2xl border border-purple-100/40">
            {emotionsList.map((em) => {
              const count = getStatsCount(em.key);
              return (
                <div key={em.key} className="flex flex-col items-center">
                  <span className="text-3xl filter drop-shadow-xs transition-transform hover:scale-115 active:scale-95 duration-150 cursor-pointer select-none flex items-center justify-center">
                    {emotionImageMap[em.key] ? (
                      <img src={emotionImageMap[em.key]} alt="" className="w-9 h-9 rounded-full object-cover" />
                    ) : (
                      em.emoji
                    )}
                  </span>
                  <span className="text-[9px] font-black text-purple-950 mt-1 capitalize tracking-wide select-none">
                    {em.key}
                  </span>
                  <div className="mt-2 min-w-[26px] h-[24px] rounded-full bg-primary text-[11px] font-black text-white flex items-center justify-center border-2 border-white shadow-sm">
                    {count}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent logs card list */}
        <div className="flex items-center gap-1.5 mb-3.5 select-none px-1">
          <Star className="w-3.5 h-3.5 text-amber-500 animate-star-twinkle" />
          <h3 className="text-xs font-black text-purple-950 uppercase tracking-widest">
            Perkembangan Terkini Murid
          </h3>
        </div>

        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center bg-white p-8 rounded-[32px] border-2 border-purple-100/50 shadow-sm min-h-[240px]">
            <SadChildIllustration className="h-32 mb-2" />
            <p className="text-sm font-black text-slate-800 mt-2">Belum ada rekod hari ini.</p>
            <p className="text-[11px] font-bold text-slate-400 text-center mt-1 leading-relaxed px-4">
              Tidak apa. Pilih emosi kamu dan mula bertenang perlahan-lahan.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
            {history.map((item) => {
              const emotionDetails = emotionData[item.emotion];
              const colorClasses = {
                yellow: 'bg-yellow-50 text-amber-800 border-amber-200',
                red: 'bg-rose-50 text-rose-800 border-rose-200',
                blue: 'bg-blue-50 text-blue-800 border-blue-200',
                purple: 'bg-purple-50 text-purple-800 border-purple-200',
                orange: 'bg-orange-50 text-orange-800 border-orange-200',
                teal: 'bg-teal-50 text-teal-800 border-teal-200',
                green: 'bg-emerald-50 text-emerald-800 border-emerald-200',
              };
              const pillStyle = emotionDetails ? colorClasses[emotionDetails.color] : 'bg-purple-50 text-purple-800 border-purple-200';

              return (
                <div
                  key={item.id}
                  className="bg-white/95 rounded-2xl p-4 shadow-sm border-2 border-purple-100/30 hover:border-purple-200/60 transition-all group relative overflow-hidden"
                >
                  {/* Decorative background sparkle shape */}
                  <span className="absolute top-1 right-2 text-lg opacity-15 filter grayscale select-none">✨</span>

                  {/* Student Info + Emotion */}
                  <div className="flex items-start gap-3">
                    {/* Student photo */}
                    <div className="w-10 h-12 rounded-lg bg-gradient-to-b from-purple-100 to-amber-50 flex items-center justify-center border border-purple-200 overflow-hidden shrink-0">
                      {item.studentPhotoUrl ? (
                        <img src={item.studentPhotoUrl} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-4 h-4 text-purple-400" />
                      )}
                    </div>

                    <div className="flex-grow min-w-0">
                      {/* Student name + emotion badge */}
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-xs font-black text-slate-800">
                          {item.studentFullName || 'Murid'}
                        </span>
                        <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border ${pillStyle} flex items-center gap-1`}>
                          {emotionImageMap[item.emotion] ? (
                            <img src={emotionImageMap[item.emotion]} alt="" className="w-3.5 h-3.5 rounded-full object-cover" />
                          ) : (
                            item.emoji
                          )} {item.label}
                        </span>
                      </div>

                      {/* Activity */}
                      <p className="text-[11px] font-black text-slate-700 mt-1 leading-tight">
                        {item.aktiviti}
                      </p>

                      {/* Date/Time Row */}
                      <div className="flex items-center gap-2 mt-1 text-[10px] font-bold text-slate-400">
                        <span>{item.completedDate || formatMalayTime(item.completedAt)}</span>
                        {item.completedTime && <span>• {item.completedTime}</span>}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col items-center gap-1.5 shrink-0">
                      {/* Success indicator */}
                      <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 border-2 border-emerald-200 flex items-center justify-center shadow-inner">
                        <Check className="w-3.5 h-3.5 stroke-[3.5px]" />
                      </div>
                      {/* Share button */}
                      <button
                        onClick={() => handleShare(item)}
                        className="w-7 h-7 rounded-full bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-500 hover:bg-purple-100 active:scale-95 transition-all cursor-pointer"
                        title="Share dengan Parent"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </main>

      {/* Bottom Navigation */}
      <BottomNav active="Sejarah" />
    </AppPhoneFrame>
    </StudentLayout>
  );
};
