import React, { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, CheckCircle2 } from 'lucide-react';
import { emotionData, staticDuas } from '../data/emotions';
import { 
  AppPhoneFrame, 
  SoftSkyBackground, 
  StarSparklePattern, 
  IslamicMoonStarDecoration 
} from '../components/Decorations';
import { ProgressCircle } from '../components/ProgressCircle';
import { EmotionKey, EmotionHistoryItem } from '../types';
import { playStaticAudio } from '../utils/audio';
import { isSupabaseConnected, supabase } from '../lib/supabase';
import { useStudent } from '../components/StudentProvider';

export const CounterScreen: React.FC = () => {
  const { emotionId } = useParams<{ emotionId: string }>();
  const navigate = useNavigate();
  const { selectedStudent } = useStudent();

  const idVal = emotionId || 'tenang';
  const [count, setCount] = useState(0);
  const [audioFallback, setAudioFallback] = useState('');

  // Determine if it is an emotion or static dua
  let label = "Zikir";
  let activeZikir = "Astaghfirullah";
  let emotionKey: EmotionKey = 'tenang';
  let activityName = "Baca zikir 10 kali";
  let tipText = "Fokus, tenang dan serahkan semua emosi kepada Allah.";
  let arabicAudioPath = "";

  if (idVal in emotionData) {
    const data = emotionData[idVal as EmotionKey];
    label = data.label;
    activeZikir = data.zikirRumi;
    emotionKey = idVal as EmotionKey;
    activityName = data.aktiviti;
    arabicAudioPath = data.audio?.arabic || "";

    // Tips mapping
    const tipsMap: Record<EmotionKey, string> = {
      gembira: "💡 Tips: Rasakan rasa syukur yang mendalam atas nikmat kurniaan Allah di dalam hati.",
      marah: "💡 Tips: Fokus, pejam mata perlahan-lahan dan rasa bertenang semasa beristighfar.",
      sedih: "💡 Tips: Yakinlah bahawa Allah mendengar rintihan hati kamu dan sedia menolong.",
      takut: "💡 Tips: Rasakan perlindung-Nya membentengi tubuh dan menyingkirkan cemas.",
      risau: "💡 Tips: Lepaskan segala kekhawatiran dan letakkan kepercayaan kepada takdir Allah.",
      penat: "💡 Tips: Rehatkan jasad sejenak dan biarkan selawat menyejukkan sanubarimu.",
      tenang: "💡 Tips: Kekalkan keceriaan ini dengan menghayati kesucian nama Allah."
    };
    tipText = tipsMap[emotionKey] || tipText;
  } else {
    // Custom Static Dua mapping
    const dataObj = staticDuas.find(d => d.id === idVal);
    if (dataObj) {
      label = dataObj.name;
      activeZikir = dataObj.rumi;
      activityName = `Baca ${dataObj.name} 10 kali`;
      arabicAudioPath = dataObj.audio?.arabic || "";
      
      const emotionMapping: Record<string, EmotionKey> = {
        'istighfar': 'marah',
        'doa-tenang': 'tenang',
        'doa-perlindungan': 'takut',
        'alhamdulillah': 'gembira',
        'doa-ibu-bapa': 'sedih'
      };
      emotionKey = emotionMapping[idVal] || 'tenang';

      const tipsMapping: Record<string, string> = {
        'istighfar': "💡 Tips: Rasakan ketenangan mengalir di dalam urat darah saat memohon ampun.",
        'doa-tenang': "💡 Tips: Semoga Allah meniupkan kesabaran dan kelapangan dalam dada kamu.",
        'doa-perlindungan': "💡 Tips: Yakinlah tiada satu makhluk pun dapat memudaratkan dengan izin Allah.",
        'alhamdulillah': "💡 Tips: Ucapkan dari lubuk hati yang paling ikhlas mengenang rahmat-Nya.",
        'doa-ibu-bapa': "💡 Tips: Selitkan wajah manis ibu bapa kamu dalam fikiran semasa mendoakan mereka."
      };
      tipText = tipsMapping[idVal] || tipText;
    }
  }

  const handleTap = useCallback(() => {
    if (count >= 10) return;

    const nextCount = count + 1;
    setCount(nextCount);

    // Play Arabic audio
    if (arabicAudioPath) {
      playStaticAudio(arabicAudioPath, () => {
        setAudioFallback('Audio bacaan akan ditambah kemudian.');
      });
    }

    try {
      if ('vibrate' in navigator) {
        navigator.vibrate(30); // small haptic pulse
      }
    } catch (e) {
      // ignore
    }

    if (nextCount === 10) {
      setTimeout(() => {
        saveCompletionData();
        navigate(`/tahniah/${idVal}`);
      }, 500);
    }
  }, [count, arabicAudioPath, idVal, navigate]);

  const saveCompletionData = () => {
    try {
      const now = new Date();
      const completedDate = now.toLocaleDateString('ms-MY', { day: '2-digit', month: '2-digit', year: 'numeric' });
      const completedTime = now.toLocaleTimeString('ms-MY', { hour: '2-digit', minute: '2-digit' });
      const shareText = `Rekod Emosi ZikirCare
Murid: ${selectedStudent?.fullName || '-'}
Kelas: ${selectedStudent?.className || '-'}
Tarikh: ${completedDate}
Masa: ${completedTime}
Emosi: ${emotionData[emotionKey]?.label || 'Tenang'}
Terapi: ${activityName}
Status: Selesai`;

      const newItem: EmotionHistoryItem = {
        id: 'zikir-' + Math.random().toString(36).substring(2, 11) + '-' + Date.now(),
        emotion: emotionKey,
        label: emotionData[emotionKey]?.label || 'Tenang',
        emoji: emotionData[emotionKey]?.emoji || '😌',
        aktiviti: activityName,
        completedAt: now.toISOString(),
        completed: true,
        studentId: selectedStudent?.id,
        studentFullName: selectedStudent?.fullName,
        studentPhotoUrl: selectedStudent?.photoUrl,
        completedDate,
        completedTime,
        shareText,
      };

      // Save to localStorage
      const existingHistoryStr = localStorage.getItem('emosiHistory');
      const historyList: EmotionHistoryItem[] = existingHistoryStr ? JSON.parse(existingHistoryStr) : [];
      historyList.unshift(newItem);
      localStorage.setItem('emosiHistory', JSON.stringify(historyList));

      // Also save to Supabase if connected
      if (isSupabaseConnected && supabase) {
        (async () => {
          try {
            await supabase.from('emotion_logs').insert({
              student_id: selectedStudent?.id,
              student_full_name: selectedStudent?.fullName,
              student_photo_url: selectedStudent?.photoUrl,
              emotion_id: emotionKey,
              emotion_label: emotionData[emotionKey]?.label || 'Tenang',
              therapy_title: activityName,
              status: 'completed',
              completed_at: now.toISOString(),
              completed_date: completedDate,
              completed_time: completedTime,
              share_text: shareText,
            });
          } catch (_e) { /* supabase insert non-critical */ }
        })();
      }
    } catch (e) {
      console.error('Failed to save zikir to history list:', e);
    }
  };

  return (
    <AppPhoneFrame id={`counter-screen-${idVal}`} className="relative flex flex-col justify-between min-h-screen bg-transparent">
      
      {/* Soft Purple Background Layer */}
      <SoftSkyBackground variant="sunset">
        <StarSparklePattern />
      </SoftSkyBackground>

      {/* Elegant hanging decoration */}
      <IslamicMoonStarDecoration className="absolute top-18 right-2 z-10 scale-90" />

      {/* Header Bar */}
      <header className="flex items-center px-4 pt-5 pb-3 bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-purple-100/50">
        <button
          id="back-to-reading-from-counter"
          onClick={() => navigate(`/baca/${idVal}`)}
          className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-text-main hover:bg-purple-50 active:scale-95 transition-all shadow-sm cursor-pointer border border-purple-100"
        >
          <ArrowLeft className="w-5 h-5 text-purple-600" />
        </button>
        <span className="text-xs font-black text-purple-600 bg-purple-100/70 border border-purple-200/50 px-3.5 py-1.5 rounded-full ml-3 shrink-0">
          Zikir Terapi Murid
        </span>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow px-5 pt-4 pb-6 select-none text-center flex flex-col justify-between relative z-10 overflow-y-auto">
        
        {/* Title and Instruction Label */}
        <div className="my-2 text-center bg-white/60 backdrop-blur-xs p-4 rounded-3xl border border-purple-100/50">
          <h1 className="text-2xl font-black text-slate-800 tracking-tight leading-tight">
            Sebut <span className="text-purple-600 font-black">{activeZikir}</span>
          </h1>
          <p className="text-[11px] font-bold text-slate-550 mt-1.5 whitespace-pre-line leading-relaxed px-4">
            Ketuk butang di bawah apabila kamu selesai melafazkan bacaan ini sehinggalah penuh bintang di atas.
          </p>
        </div>

        {/* Polished progress circle wrapped in stars/sparkles decoration */}
        <div className="flex items-center justify-center my-6 relative p-2">
          {/* Animated background concentric rings */}
          <div className="absolute w-56 h-56 bg-purple-300/10 rounded-full animate-ping pointer-events-none -z-10" style={{ animationDuration: '3s' }} />
          <div className="absolute w-44 h-44 bg-purple-400/5 rounded-full animate-pulse pointer-events-none -z-10" />
          
          <ProgressCircle count={count} max={10} />
        </div>

        {/* Active Tips indicator */}
        <div className="px-1 my-3 select-none">
          <div className="bg-[#FFFDF4]/95 border-2 border-amber-200 rounded-2xl p-4 shadow-sm flex items-start gap-2 text-left">
            <span className="text-xl animate-bounce-soft shrink-0">💡</span>
            <p className="text-xs font-black text-amber-950 leading-relaxed">
              {tipText}
            </p>
          </div>
        </div>

        {/* Tap Counter Button */}
        <div className="w-full select-none mt-auto">
          <button
            id="increment-counter-btn"
            onClick={handleTap}
            className="w-full py-5 bg-gradient-to-r from-primary to-purple-600 hover:from-purple-700 hover:to-purple-800 text-white text-base font-black rounded-3xl shadow-lg border-b-6 border-purple-800 flex items-center justify-center gap-2 active:translate-y-[3px] active:border-b-2 hover:translate-y-[-1px] transition-all duration-150 cursor-pointer animate-pulse-soft"
          >
            <CheckCircle2 className="w-5.5 h-5.5 text-emerald-300" />
            SAYA DAH BACA ✓
          </button>
          
          <span className="block text-[10px] text-slate-500 font-black mt-2 text-center tracking-wide uppercase">
            👉 Tap butang besar ini untuk kiraan zikir seterusnya
          </span>
        </div>

      </main>

      {/* Audio Fallback Toast */}
      {audioFallback && (
        <div className="fixed bottom-28 left-1/2 -translate-x-1/2 z-50 animate-fade-in">
          <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl px-5 py-3 shadow-lg text-center">
            <p className="text-xs font-black text-amber-900">{audioFallback}</p>
          </div>
        </div>
      )}

    </AppPhoneFrame>
  );
};
