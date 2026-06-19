import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, User, CheckCircle } from 'lucide-react';
import { AppPhoneFrame, SoftSkyBackground, StarSparklePattern, IslamicMoonStarDecoration } from '../components/Decorations';
import { StudentLayout } from '../components/StudentLayout';
import { useStudent } from '../components/StudentProvider';
import { EmotionHistoryItem } from '../types';

function getWeekRange() {
  const now = new Date();
  const day = now.getDay();
  const start = new Date(now);
  start.setDate(now.getDate() - day);
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);
  return { start, end };
}

export const ProfilLaporanScreen: React.FC = () => {
  const navigate = useNavigate();
  const { selectedStudent } = useStudent();
  const [records, setRecords] = useState<EmotionHistoryItem[]>([]);

  useEffect(() => {
    const { start, end } = getWeekRange();
    const raw = localStorage.getItem('emosiHistory');
    if (raw) {
      try {
        const all = JSON.parse(raw) as EmotionHistoryItem[];
        const filtered = all.filter(item => {
          if (selectedStudent?.id && item.studentId && item.studentId !== selectedStudent.id) return false;
          const d = new Date(item.completedAt);
          return d >= start && d <= end;
        });
        setRecords(filtered);
      } catch { setRecords([]); }
    }
  }, [selectedStudent]);

  const handleShare = () => {
    const lines = records.map(r => `• ${r.emoji} ${r.label} — ${r.aktiviti} (${r.completedDate || new Date(r.completedAt).toLocaleDateString('ms-MY')})`);
    const text = `Laporan Mingguan i-Qalb Care\n\n${lines.join('\n')}\n\n— Diproses oleh i-Qalb Care`;
    if (navigator.share) {
      navigator.share({ title: 'Laporan Mingguan i-Qalb Care', text }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text).then(() => alert('Laporan telah disalin.')).catch(() => {});
    }
  };

  return (
    <StudentLayout activeNav={null}>
    <AppPhoneFrame id="laporan-screen" className="relative flex flex-col min-h-screen bg-transparent select-none lg:max-w-none lg:mx-0 lg:rounded-none lg:border-0 lg:my-0 lg:shadow-none">
      <SoftSkyBackground variant="sky">
        <StarSparklePattern />
      </SoftSkyBackground>
      <IslamicMoonStarDecoration className="absolute top-18 right-2 z-10 scale-90" />

      <header className="flex items-center justify-between px-5 pt-5 pb-3 bg-white/80 backdrop-blur-md relative z-10">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/profil')} className="w-9 h-9 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 hover:bg-purple-100 active:scale-95 transition-all cursor-pointer">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-lg font-black text-slate-800">Laporan Mingguan</h1>
            <p className="text-[10px] font-bold text-slate-500">Bahan bacaan dari semasa ke semasa.</p>
          </div>
        </div>
        <button onClick={handleShare} className="w-9 h-9 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 hover:bg-purple-100 active:scale-95 transition-all cursor-pointer">
          <Share2 className="w-4.5 h-4.5" />
        </button>
      </header>

      <main className="flex-grow px-5 pb-6 relative z-10 overflow-y-auto pt-3">
        {records.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 text-center shadow-sm border border-purple-100/60 mt-2">
            <p className="text-sm font-black text-slate-600">Tiada rekod minggu ini.</p>
            <p className="text-xs font-bold text-slate-400 mt-1">Pilih emosi dan mulakan terapi.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {records.map(r => (
              <div key={r.id} className="bg-white rounded-2xl p-4 shadow-sm border border-purple-100/60 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center shrink-0 overflow-hidden border border-purple-200">
                  {r.studentPhotoUrl ? (
                    <img src={r.studentPhotoUrl} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-5 h-5 text-purple-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-black text-slate-700 truncate">{r.aktiviti}</p>
                  <p className="text-[10px] font-bold text-slate-400 mt-0.5">{r.completedDate || new Date(r.completedAt).toLocaleDateString('ms-MY')}</p>
                </div>
                <div className="flex items-center gap-1 text-[10px] font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <CheckCircle className="w-3 h-3" />
                  Selesai
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </AppPhoneFrame>
    </StudentLayout>
  );
};
