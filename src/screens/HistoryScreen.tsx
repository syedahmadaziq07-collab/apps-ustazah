import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AppPhoneFrame, SoftSkyBackground, StarSparklePattern, IslamicMoonStarDecoration } from '../components/Decorations';
import { BottomNav } from '../components/BottomNav';
import { StudentLayout } from '../components/StudentLayout';
import { useStudent } from '../components/StudentProvider';
import { EmotionKey, EmotionHistoryItem } from '../types';
import { emotionData } from '../data/emotions';
import { getEmotionLogs } from '../services/emotionLogService';

type Tab = 'week' | 'month' | 'year';

const DAY_LABELS = ['Ahd', 'Isn', 'Sel', 'Rab', 'Kha', 'Jum', 'Sab'];
const MALAY_MONTHS = ['Januari', 'Februari', 'Mac', 'April', 'Mei', 'Jun', 'Julai', 'Ogos', 'September', 'Oktober', 'November', 'Disember'];

function getWeekRange(date: Date) {
  const d = new Date(date);
  const day = d.getDay();
  const start = new Date(d);
  start.setDate(d.getDate() - day);
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);
  return { start, end };
}

function getMonthRange(date: Date) {
  const start = new Date(date.getFullYear(), date.getMonth(), 1);
  const end = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
  return { start, end };
}

function getYearRange(date: Date) {
  const start = new Date(date.getFullYear(), 0, 1);
  const end = new Date(date.getFullYear(), 11, 31, 23, 59, 59, 999);
  return { start, end };
}

function formatDateRange(tab: Tab, date: Date) {
  if (tab === 'week') {
    const { start, end } = getWeekRange(date);
    return `${start.getDate()} ${MALAY_MONTHS[start.getMonth()]} ${start.getFullYear()} - ${end.getDate()} ${MALAY_MONTHS[end.getMonth()]} ${end.getFullYear()}`;
  }
  if (tab === 'month') {
    return `${MALAY_MONTHS[date.getMonth()]} ${date.getFullYear()}`;
  }
  return `${date.getFullYear()}`;
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function isSameMonth(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}

function isSameYear(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear();
}

export const HistoryScreen: React.FC = () => {
  const { selectedStudent } = useStudent();
  const [tab, setTab] = useState<Tab>('week');
  const [cursor, setCursor] = useState(new Date());
  const [history, setHistory] = useState<EmotionHistoryItem[]>([]);

  useEffect(() => {
    getEmotionLogs(selectedStudent?.id).then(setHistory).catch(() => setHistory([]));
  }, [selectedStudent?.id]);

  const filtered = history.filter(item => {
    if (selectedStudent?.id && item.studentId && item.studentId !== selectedStudent.id) return false;
    const d = new Date(item.completedAt);
    if (tab === 'week') { const { start, end } = getWeekRange(cursor); return d >= start && d <= end; }
    if (tab === 'month') { const { start, end } = getMonthRange(cursor); return d >= start && d <= end; }
    const { start, end } = getYearRange(cursor); return d >= start && d <= end;
  });

  const { start, end } = tab === 'week' ? getWeekRange(cursor) : tab === 'month' ? getMonthRange(cursor) : getYearRange(cursor);
  const totalSessions = filtered.length;

  const dayBuckets: { date: Date; items: EmotionHistoryItem[] }[] = [];
  if (tab === 'week') {
    for (let i = 0; i < 7; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      dayBuckets.push({ date: d, items: [] });
    }
  } else if (tab === 'month') {
    const daysInMonth = end.getDate();
    for (let i = 1; i <= daysInMonth; i++) {
      const d = new Date(cursor.getFullYear(), cursor.getMonth(), i);
      dayBuckets.push({ date: d, items: [] });
    }
  } else {
    for (let i = 0; i < 12; i++) {
      const d = new Date(cursor.getFullYear(), i, 1);
      dayBuckets.push({ date: d, items: [] });
    }
  }

  for (const item of filtered) {
    const d = new Date(item.completedAt);
    const bucket = dayBuckets.find(b => {
      if (tab === 'year') return b.date.getMonth() === d.getMonth();
      return isSameDay(b.date, d);
    });
    if (bucket) bucket.items.push(item);
  }

  const maxCount = Math.max(1, ...dayBuckets.map(b => b.items.length));

  const dominantEmotion = (items: EmotionHistoryItem[]) => {
    if (items.length === 0) return null;
    const counts: Record<string, number> = {};
    for (const item of items) {
      counts[item.emotion] = (counts[item.emotion] || 0) + 1;
    }
    let best = '';
    let bestCount = 0;
    for (const [key, count] of Object.entries(counts)) {
      if (count > bestCount) { best = key; bestCount = count; }
    }
    return best as EmotionKey;
  };

  const emotionTotals: { key: EmotionKey; count: number }[] = [];
  const totalMap: Record<string, number> = {};
  for (const item of filtered) {
    totalMap[item.emotion] = (totalMap[item.emotion] || 0) + 1;
  }
  for (const [key, count] of Object.entries(totalMap)) {
    emotionTotals.push({ key: key as EmotionKey, count });
  }
  emotionTotals.sort((a, b) => b.count - a.count);

  const navigateDate = (dir: number) => {
    const next = new Date(cursor);
    if (tab === 'week') next.setDate(next.getDate() + dir * 7);
    else if (tab === 'month') next.setMonth(next.getMonth() + dir);
    else next.setFullYear(next.getFullYear() + dir);
    setCursor(next);
  };

  const barHeight = (count: number) => {
    if (count === 0) return 4;
    return Math.max(8, (count / maxCount) * 120);
  };

  const tabs: { key: Tab; label: string }[] = [
    { key: 'week', label: 'Minggu' },
    { key: 'month', label: 'Bulan' },
    { key: 'year', label: 'Tahun' },
  ];

  return (
    <StudentLayout activeNav="Sejarah">
    <AppPhoneFrame id="history-screen" className="relative flex flex-col justify-between min-h-screen bg-transparent select-none lg:max-w-none lg:mx-0 lg:rounded-none lg:border-0 lg:my-0 lg:shadow-none">
      <SoftSkyBackground variant="sky">
        <StarSparklePattern />
      </SoftSkyBackground>
      <IslamicMoonStarDecoration className="absolute top-18 right-2 z-10 scale-90" />

      <header className="pt-5 pb-2 px-5 text-center bg-white/80 backdrop-blur-md relative z-10">
        <h1 className="text-xl font-black text-slate-800">Rekod Emosi</h1>
        <p className="text-xs font-bold text-slate-500 mt-0.5">Lihat perkembangan emosi kamu dari semasa ke semasa.</p>
      </header>

      <main className="flex-grow px-5 pb-6 relative z-10 overflow-y-auto">
        {/* Tab filter */}
        <div className="flex items-center justify-center gap-2 my-4">
          {tabs.map(t => (
            <button key={t.key} onClick={() => { setTab(t.key); setCursor(new Date()); }}
              className={`px-5 py-2 rounded-full text-xs font-black transition-all cursor-pointer ${
                tab === t.key ? 'bg-purple-600 text-white shadow-md' : 'bg-white text-slate-500 border border-slate-200 hover:bg-purple-50'
              }`}
            >{t.label}</button>
          ))}
        </div>

        {/* Date navigation */}
        <div className="flex items-center justify-between bg-white rounded-2xl px-4 py-3 shadow-sm border border-purple-100/60 mb-4">
          <button onClick={() => navigateDate(-1)} className="w-9 h-9 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 hover:bg-purple-100 active:scale-95 transition-all cursor-pointer">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm font-black text-slate-700">{formatDateRange(tab, cursor)}</span>
          <button onClick={() => navigateDate(1)} className="w-9 h-9 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 hover:bg-purple-100 active:scale-95 transition-all cursor-pointer">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Bar chart */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-purple-100/60 mb-4">
          <div className="flex items-end justify-around gap-0.5" style={{ height: 160 }}>
            {dayBuckets.map((bucket, i) => {
              const count = bucket.items.length;
              const domEmo = dominantEmotion(bucket.items);
              const bh = barHeight(count);
              const emojiData = domEmo ? emotionData[domEmo] : null;
              return (
                <div key={i} className="flex flex-col items-center gap-1 flex-1">
                  {domEmo && count > 0 && (
                    <span className="text-sm leading-none">{emojiData?.emoji || '😶'}</span>
                  )}
                  <div className="w-full flex justify-center" style={{ height: 120 }}>
                    <div
                      className="w-5/6 rounded-full bg-gradient-to-t from-purple-500 to-purple-300 transition-all duration-300 self-end"
                      style={{ height: bh }}
                    />
                  </div>
                  <span className="text-[9px] font-bold text-slate-400 mt-1">
                    {tab === 'year' ? MALAY_MONTHS[bucket.date.getMonth()].slice(0, 3) : bucket.date.getDate()}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Ringkasan */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-purple-100/60">
          <h3 className="text-sm font-black text-slate-800 mb-3">
            Ringkasan {tabs.find(t => t.key === tab)?.label} Ini
          </h3>
          {totalSessions === 0 ? (
            <p className="text-xs font-bold text-slate-400 text-center py-6">Tiada rekod untuk tempoh ini.</p>
          ) : (
            <>
              <p className="text-xs font-bold text-slate-500 mb-3">Jumlah sesi: {totalSessions}</p>
              <div className="space-y-2">
                {emotionTotals.map(et => {
                  const ed = emotionData[et.key];
                  return (
                    <div key={et.key} className="flex items-center gap-3 px-3 py-2.5 bg-purple-50/60 rounded-xl">
                      <span className="text-lg">{ed?.emoji || '😶'}</span>
                      <span className="flex-1 text-sm font-black text-slate-700">{ed?.label || et.key}</span>
                      <span className="text-xs font-black text-purple-600 bg-purple-100 px-2.5 py-1 rounded-full">{et.count} {tab === 'year' ? 'bulan' : 'hari'}</span>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </main>

      <BottomNav active="Sejarah" />
    </AppPhoneFrame>
    </StudentLayout>
  );
};
