import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, History, Heart, CheckCircle, School, Database } from 'lucide-react';
import { useStudent } from '../../components/StudentProvider';
import { isSupabaseConnected } from '../../lib/supabase';

const statsCards = [
  { label: 'Jumlah Murid', value: '6', icon: <Users className="w-6 h-6" />, color: 'bg-blue-100 text-blue-600 border-blue-200' },
  { label: 'Rekod Hari Ini', value: '0', icon: <History className="w-6 h-6" />, color: 'bg-green-100 text-green-600 border-green-200' },
  { label: 'Emosi Paling Kerap', value: 'Tenang', icon: <Heart className="w-6 h-6" />, color: 'bg-pink-100 text-pink-600 border-pink-200' },
  { label: 'Aktiviti Selesai', value: '0', icon: <CheckCircle className="w-6 h-6" />, color: 'bg-amber-100 text-amber-600 border-amber-200' },
];

const placeholderPages: { label: string; path: string; desc: string }[] = [
  { label: 'Home', path: '/teacher/home', desc: 'Urus kandungan halaman utama aplikasi' },
  { label: 'Emosi', path: '/teacher/emosi', desc: 'Edit emosi, nasihat & gambar' },
  { label: 'Terapi', path: '/teacher/terapi', desc: 'Urus zikir & aktiviti terapi' },
  { label: 'Doa', path: '/teacher/doa', desc: 'Edit senarai doa & zikir harian' },
  { label: 'Gambar', path: '/teacher/gambar', desc: 'Urus gambar murid & ilustrasi' },
  { label: 'Audio', path: '/teacher/audio', desc: 'Urus rakaman audio nasihat & bacaan' },
  { label: 'Profil App', path: '/teacher/profil-app', desc: 'Edit profil sekolah & info aplikasi' },
  { label: 'Tetapan', path: '/teacher/tetapan', desc: 'Tetapan umum & pengguna' },
];

export const TeacherDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { selectedStudent } = useStudent();
  const [supabaseCheck, setSupabaseCheck] = useState<'loading' | 'connected' | 'error'>('loading');

  useEffect(() => {
    if (!isSupabaseConnected) {
      setSupabaseCheck('error');
      return;
    }
    fetch(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/emotions?select=id&limit=1`, {
      headers: { 'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY },
    })
      .then(res => setSupabaseCheck(res.ok ? 'connected' : 'error'))
      .catch(() => setSupabaseCheck('error'));
  }, []);

  return (
    <div className="flex-grow p-4 md:p-6 overflow-y-auto pb-20 md:pb-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-black text-slate-800">Dashboard</h1>
        <p className="text-xs font-bold text-slate-500 mt-1">
          Selamat datang ke dashboard ZikirCare.
          {!isSupabaseConnected && (
            <span className="text-amber-600"> Supabase belum disambungkan.</span>
          )}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {statsCards.map((card) => (
          <div key={card.label} className={`rounded-2xl p-4 border-2 ${card.color} bg-white shadow-sm`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-black text-slate-600">{card.label}</span>
              <span className={card.color.split(' ').slice(0, 2).join(' ') + ' p-2 rounded-xl'}>
                {card.icon}
              </span>
            </div>
            <p className="text-2xl font-black text-slate-800">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions - Menu items */}
      <div className="mb-6">
        <h2 className="text-sm font-black text-slate-700 mb-3">Menu Pantas</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {placeholderPages.map((page) => (
            <button
              key={page.path}
              onClick={() => navigate(page.path)}
              className="bg-white rounded-2xl p-4 border-2 border-purple-100 hover:border-purple-300 hover:shadow-md active:scale-95 transition-all cursor-pointer text-left"
            >
              <p className="text-xs font-black text-purple-700">{page.label}</p>
              <p className="text-[10px] font-bold text-slate-500 mt-1">{page.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Demo mode banner */}
      {!isSupabaseConnected && (
        <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <School className="w-4 h-4 text-amber-600" />
            <p className="text-xs font-black text-amber-800">Mod Demo Aktif</p>
          </div>
          <p className="text-[11px] font-bold text-amber-700 leading-relaxed">
            Mod demo aktif: data disimpan pada peranti ini.
          </p>
        </div>
      )}

      {/* Supabase status card */}
      {isSupabaseConnected && (
        <div className={`rounded-2xl p-4 border-2 ${
          supabaseCheck === 'connected'
            ? 'bg-green-50 border-green-200'
            : supabaseCheck === 'loading'
            ? 'bg-gray-50 border-gray-200'
            : 'bg-amber-50 border-amber-200'
        }`}>
          <div className="flex items-center gap-2 mb-1">
            <Database className={`w-4 h-4 ${
              supabaseCheck === 'connected' ? 'text-green-600' : 'text-amber-600'
            }`} />
            <p className={`text-xs font-black ${
              supabaseCheck === 'connected' ? 'text-green-800' : 'text-amber-800'
            }`}>
              {supabaseCheck === 'connected' ? 'Supabase' : 'Supabase'}
            </p>
          </div>
          <p className="text-[11px] font-bold leading-relaxed text-slate-600">
            {supabaseCheck === 'loading' && 'Sedang memuatkan...'}
            {supabaseCheck === 'connected' && 'Supabase disambungkan.'}
            {supabaseCheck === 'error' && 'Supabase belum lengkap. Sila semak schema atau env.'}
          </p>
        </div>
      )}
    </div>
  );
};
