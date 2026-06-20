import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Clock } from 'lucide-react';
import {
  AppPhoneFrame,
  SoftSkyBackground,
  StarSparklePattern,
  IslamicMoonStarDecoration,
} from '../components/Decorations';
import { BottomNav } from '../components/BottomNav';
import { StudentLayout } from '../components/StudentLayout';
import { DuaContent } from '../types';
import { getDuas } from '../services/duaService';

type FilterKey = 'semua' | 'zikir' | 'terapi' | 'doa' | 'bacaan';

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'semua', label: 'Semua' },
  { key: 'zikir', label: 'Zikir' },
  { key: 'terapi', label: 'Terapi' },
  { key: 'doa', label: 'Doa' },
  { key: 'bacaan', label: 'Bacaan' },
];

const SECTION_CONFIG: { key: string; label: string; icon: string; kategori: string; desc: string }[] = [
  { key: 'zikir', label: 'Zikir Harian', icon: '📿', kategori: 'zikir', desc: 'Zikir ringkas untuk diamalkan setiap hari' },
  { key: 'terapi', label: 'Terapi & Relaksasi', icon: '🧘', kategori: 'terapi', desc: 'Aktiviti menenangkan minda dan tubuh' },
  { key: 'doa', label: 'Doa Harian', icon: '🤲', kategori: 'doa', desc: 'Doa-doa harian untuk diamalkan' },
  { key: 'bacaan', label: 'Bacaan & Mutiara', icon: '📖', kategori: 'bacaan', desc: 'Bacaan ringkas dan mutiara kata' },
];

const cardGradients = [
  'from-[#FEF2F2] to-[#FFF1F2] border-red-200',
  'from-[#FFFBEB] to-[#FEF3C7] border-amber-200',
  'from-[#F5F3FF] to-[#EDE9FE] border-purple-200',
  'from-[#ECFDF5] to-[#D1FAE5] border-emerald-200',
  'from-[#EFF6FF] to-[#DBEAFE] border-blue-200',
  'from-[#FDF2F8] to-[#FCE7F3] border-pink-200',
  'from-[#F0FDF4] to-[#DCFCE7] border-green-200',
  'from-[#FFF7ED] to-[#FFEDD5] border-orange-200',
];

function getDuration(item: DuaContent): string {
  if (item.kategori === 'zikir') return '2 minit';
  if (item.kategori === 'doa') return '3 minit';
  return '5 minit';
}

export const AktivitiHubScreen: React.FC = () => {
  const navigate = useNavigate();
  const [duas, setDuas] = useState<DuaContent[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterKey>('semua');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDuas().then(list => {
      setDuas(list.filter(d => d.is_active));
      setLoading(false);
    });
  }, []);

  const sections = useMemo(() => {
    const zikirItems = duas.filter(d => d.kategori === 'zikir');
    const doaItems = duas.filter(d => d.kategori === 'doa');
    const bacaanItems = duas.filter(d => d.kategori === 'bacaan');

    const terapiItems: { id: string; title: string; desc: string; emoji: string; duration: string; navigateTo: string }[] = [
      { id: 'th-marah-2', title: 'Tarik Nafas Dalam', desc: 'Ambil nafas perlahan, tahan, hembus', emoji: '🌬️', duration: '3 minit', navigateTo: '/emosi/marah' },
      { id: 'th-risau-2', title: 'Latihan Pernafasan', desc: 'Teknik pernafasan untuk bertenang', emoji: '🫁', duration: '3 minit', navigateTo: '/emosi/risau' },
      { id: 'th-penat-1', title: 'Rehatkan Badan', desc: 'Duduk selesa dan rehatkan badan', emoji: '😌', duration: '5 minit', navigateTo: '/emosi/penat' },
      { id: 'th-gembira-2', title: 'Senyum & Ucap Syukur', desc: 'Senaman ringkas untuk rasa positif', emoji: '😊', duration: '2 minit', navigateTo: '/emosi/gembira' },
      { id: 'th-takut-3', title: 'Ucap Kata Semangat', desc: 'Ingatkan diri Allah sentiasa bersama', emoji: '💪', duration: '2 minit', navigateTo: '/emosi/takut' },
    ];

    const allSections = [
      { ...SECTION_CONFIG[0], items: zikirItems },
      { ...SECTION_CONFIG[1], items: terapiItems },
      { ...SECTION_CONFIG[2], items: doaItems },
      { ...SECTION_CONFIG[3], items: bacaanItems },
    ];

    if (activeFilter === 'semua') return allSections;
    if (activeFilter === 'zikir') return [allSections[0]];
    if (activeFilter === 'terapi') return [allSections[1]];
    if (activeFilter === 'doa') return [allSections[2]];
    if (activeFilter === 'bacaan') return [allSections[3]];
    return [];
  }, [duas, activeFilter]);

  return (
    <StudentLayout activeNav="Doa">
    <AppPhoneFrame id="aktiviti-screen" className="relative flex flex-col min-h-screen bg-transparent select-none lg:max-w-none lg:mx-0 lg:rounded-none lg:border-0 lg:my-0 lg:shadow-none">
      <SoftSkyBackground variant="sunset">
        <StarSparklePattern />
      </SoftSkyBackground>
      <IslamicMoonStarDecoration className="absolute top-18 right-2 z-10 scale-90" />

      {/* Header */}
      <header className="flex items-center justify-between px-5 pt-5 pb-3 bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-purple-100/50">
        <div>
          <h1 className="text-lg font-black text-slate-800">Aktiviti</h1>
          <p className="text-[10px] font-bold text-slate-500 mt-0.5 max-w-[260px] leading-tight">Pilih aktiviti yang sesuai untuk membantu emosi dan kerohanian kamu.</p>
        </div>
        <button className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-purple-600 shadow-sm border border-purple-100 cursor-pointer active:scale-95 transition-all">
          <Bell className="w-5 h-5" />
        </button>
      </header>

      {/* Filter Tabs */}
      <div className="sticky top-[76px] z-30 bg-white/70 backdrop-blur-md px-5 pt-3 pb-2 border-b border-purple-100/30">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {FILTERS.map(f => (
            <button key={f.key} onClick={() => setActiveFilter(f.key)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-black transition-all cursor-pointer ${
                activeFilter === f.key ? 'bg-purple-600 text-white shadow-md' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
              }`}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="flex-grow px-5 pt-4 pb-6 relative z-10 overflow-y-auto">
        {loading ? (
          <div className="text-center py-8"><p className="text-xs font-black text-slate-400">Sedang memuatkan...</p></div>
        ) : (
          sections.map((section) => {
            const sectionItems = section.items as any[];
            if (sectionItems.length === 0) return null;
            if (section.key === 'terapi') {
              return (
                <div key={section.key} className="mb-6">
                  <SectionHeader icon={section.icon} label={section.label} desc={section.desc} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {(sectionItems as typeof sectionItems & { navigateTo: string }[]).map((item, i) => (
                      <button key={item.id} onClick={() => navigate(item.navigateTo)}
                        className={`w-full bg-gradient-to-r ${cardGradients[i % cardGradients.length]} rounded-2xl p-4 border-2 shadow-sm flex items-center gap-4 text-left hover:scale-[1.02] active:scale-98 transition-all cursor-pointer`}>
                        <span className="text-3xl shrink-0">{item.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-black text-slate-800">{item.title}</h4>
                          <p className="text-[10px] font-bold text-slate-500 mt-0.5">{item.desc}</p>
                          <span className="inline-flex items-center gap-1 text-[10px] font-black text-slate-400 mt-1">
                            <Clock className="w-3 h-3" /> {item.duration}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              );
            }
            return (
              <div key={section.key} className="mb-6">
                <SectionHeader icon={section.icon} label={section.label} desc={section.desc} />
                {sectionItems.length === 0 ? (
                  <div className="bg-white/80 rounded-2xl p-5 text-center border border-purple-100/50">
                    <p className="text-xs font-black text-slate-400">Tiada aktiviti buat masa ini</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {(sectionItems as DuaContent[]).map((item, i) => (
                      <button key={item.id} onClick={() => navigate(`/baca/${item.id}`)}
                        className={`w-full bg-gradient-to-r ${cardGradients[i % cardGradients.length]} rounded-2xl p-4 border-2 shadow-sm flex items-center gap-4 text-left hover:scale-[1.02] active:scale-98 transition-all cursor-pointer`}>
                        <span className="text-3xl shrink-0">{item.emoji_decorative}</span>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-black text-slate-800">{item.title}</h4>
                          <p className="text-[10px] font-bold text-slate-500 mt-0.5 truncate">{item.explanation}</p>
                          <span className="inline-flex items-center gap-1 text-[10px] font-black text-slate-400 mt-1">
                            <Clock className="w-3 h-3" /> {getDuration(item)}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
        {!loading && sections.every(s => (s.items as any[]).length === 0) && (
          <div className="bg-white/80 rounded-2xl p-6 text-center border border-purple-100/50 mt-4">
            <span className="text-4xl block mb-2">📭</span>
            <p className="text-sm font-black text-slate-500">Tiada aktiviti buat masa ini</p>
          </div>
        )}
      </main>

      <BottomNav active="Doa" />
    </AppPhoneFrame>
    </StudentLayout>
  );
};

const SectionHeader: React.FC<{ icon: string; label: string; desc: string }> = ({ icon, label, desc }) => (
  <div className="flex items-center gap-2 mb-3 px-1">
    <span className="text-lg">{icon}</span>
    <div>
      <h3 className="text-xs font-black text-purple-950 uppercase tracking-widest">{label}</h3>
      <p className="text-[10px] font-bold text-slate-400">{desc}</p>
    </div>
  </div>
);
