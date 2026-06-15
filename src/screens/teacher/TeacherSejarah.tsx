import React, { useState, useEffect } from 'react';
import { User, Share2, Calendar, Clock, Heart } from 'lucide-react';
import { EmotionHistoryItem } from '../../types';
import { isSupabaseConnected } from '../../lib/supabase';

function formatDate(isoString: string): string {
  try {
    const d = new Date(isoString);
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  } catch {
    return '-';
  }
}

function formatTime(isoString: string): string {
  try {
    const d = new Date(isoString);
    let hrs = d.getHours().toString().padStart(2, '0');
    const mins = d.getMinutes().toString().padStart(2, '0');
    return `${hrs}:${mins}`;
  } catch {
    return '-';
  }
}

export const TeacherSejarah: React.FC = () => {
  const [logs, setLogs] = useState<(EmotionHistoryItem & { studentFullName?: string })[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('emosiHistory');
      if (raw) {
        setLogs(JSON.parse(raw));
      }
    } catch {}
  }, []);

  const handleShare = (item: EmotionHistoryItem) => {
    const shareText = item.shareText || `Rekod Emosi ZikirCare
Murid: ${item.studentFullName || '-'}
Tarikh: ${item.completedDate || formatDate(item.completedAt)}
Masa: ${item.completedTime || formatTime(item.completedAt)}
Emosi: ${item.label}
Terapi: ${item.aktiviti}
Status: Selesai`;

    if (navigator.share) {
      navigator.share({ title: 'Rekod Emosi ZikirCare', text: shareText }).catch(() => {});
    } else {
      navigator.clipboard.writeText(shareText).then(() => {
        alert('Rekod telah disalin. Boleh paste kepada ibu bapa.');
      }).catch(() => {});
    }
  };

  return (
    <div className="flex-grow p-4 md:p-6 overflow-y-auto pb-20 md:pb-6">
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-black text-slate-800">Sejarah Emosi</h1>
        <p className="text-xs font-bold text-slate-500 mt-1">Rekod terapi emosi murid.</p>
        {isSupabaseConnected && (
          <p className="text-[10px] font-bold text-green-600 mt-1">Supabase: Rekod akan disimpan dalam pangkalan data.</p>
        )}
      </div>

      {logs.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 border-2 border-purple-100 text-center">
          <Calendar className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <p className="text-sm font-black text-slate-500">Belum ada rekod.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {logs.map((item) => {
            const emojiMap: Record<string, string> = {
              gembira: '😊', marah: '😡', sedih: '😢',
              takut: '😨', risau: '😟', penat: '😴', tenang: '😌',
            };
            return (
              <div key={item.id} className="bg-white rounded-2xl p-4 border-2 border-purple-100 shadow-sm">
                <div className="flex items-start gap-3">
                  {/* Student photo placeholder */}
                  <div className="w-12 h-14 rounded-lg bg-gradient-to-b from-purple-100 to-amber-50 flex items-center justify-center border border-purple-200 overflow-hidden shrink-0">
                    {item.studentPhotoUrl ? (
                      <img src={item.studentPhotoUrl} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-5 h-5 text-purple-400" />
                    )}
                  </div>
                  <div className="flex-grow min-w-0">
                    <p className="text-sm font-black text-slate-800">
                      {item.studentFullName || 'Murid'}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-lg">{emojiMap[item.emotion] || '😌'}</span>
                      <span className="text-[11px] font-black text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
                        {item.label}
                      </span>
                    </div>
                    <p className="text-[11px] font-bold text-slate-600 mt-1">{item.aktiviti}</p>
                    <div className="flex items-center gap-3 mt-1.5 text-[10px] font-bold text-slate-400">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {item.completedDate || formatDate(item.completedAt)}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {item.completedTime || formatTime(item.completedAt)}</span>
                      <span className="text-green-600">✓ Selesai</span>
                    </div>
                  </div>
                  {/* Share button */}
                  <button
                    onClick={() => handleShare(item)}
                    className="shrink-0 w-9 h-9 rounded-full bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-500 hover:bg-purple-100 active:scale-95 transition-all cursor-pointer"
                    title="Share dengan Parent"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-6 bg-purple-50 border-2 border-purple-200 rounded-2xl p-4">
        <p className="text-[10px] font-bold text-purple-700">
          TODO: Integrasi Supabase emotion_logs untuk rekod masa sebenar dan muat turun data.
        </p>
      </div>
    </div>
  );
};
