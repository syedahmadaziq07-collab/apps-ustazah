import React, { useState, useEffect } from 'react';
import { Award, User, Sparkles, LogOut, CheckCircle, Flame, ShieldAlert, Heart, GraduationCap, Star } from 'lucide-react';
import { 
  AppPhoneFrame, 
  SoftSkyBackground, 
  StarSparklePattern, 
  IslamicMoonStarDecoration,
  PrayingChildIllustration
} from '../components/Decorations';
import { BottomNav } from '../components/BottomNav';
import { StudentLayout } from '../components/StudentLayout';
import { getAppPage, getSchoolSettings, getSchoolProfile } from '../services/appContentService';
import { SchoolProfile } from '../types';

export const ProfileScreen: React.FC = () => {
  const [profileTitle, setProfileTitle] = useState('Profil Guru Kaunseling');
  const [profileSubtitle, setProfileSubtitle] = useState('i-Qalb Care membantu murid mengenal emosi dan mengamalkan cara bertenang secara Islam.');
  const [bodyText, setBodyText] = useState('');
  const [schoolInfo, setSchoolInfo] = useState('SK Seri Idaman, Shah Alam, Selangor');
  const [counsellingNote, setCounsellingNote] = useState('');
  const [privacyNote, setPrivacyNote] = useState('');
  const [schoolProfile, setSchoolProfile] = useState<SchoolProfile | null>(null);
  const [appName, setAppName] = useState('i-Qalb Care');
  const [tagline, setTagline] = useState('');
  const [themeColor, setThemeColor] = useState('#8B5CF6');

  useEffect(() => {
    getAppPage('profile').then((page) => {
      if (page) {
        if (page.title) setProfileTitle(page.title);
        if (page.subtitle) setProfileSubtitle(page.subtitle);
        if (page.body_text) setBodyText(page.body_text);
        if (page.content_json?.schoolInfo) setSchoolInfo(page.content_json.schoolInfo);
        if (page.content_json?.counsellingNote) setCounsellingNote(page.content_json.counsellingNote);
        if (page.content_json?.privacyNote) setPrivacyNote(page.content_json.privacyNote);
      }
    }).catch(() => {});
    getSchoolSettings().then((s) => {
      if (s.app_name) setAppName(s.app_name);
      if (s.tagline) setTagline(s.tagline);
      if (s.theme_color) setThemeColor(s.theme_color);
    }).catch(() => {});
    getSchoolProfile().then((p) => {
      setSchoolProfile(p);
    }).catch(() => {});
  }, []);

  // Simple stats compiled from localStorage history if any
  const historyStr = localStorage.getItem('emosiHistory');
  let completedCount = 5; // seed default
  if (historyStr) {
    try {
      completedCount = JSON.parse(historyStr).length;
    } catch(e) {
      // ignore
    }
  }

  const counselorName = schoolProfile?.teacher_name || "Cikgu Fatimah Binti Ismail";
  const schoolName = schoolProfile?.school_name || schoolInfo;
  const counselorId = schoolProfile?.lembaga_number || "KB-08249-M";

  return (
    <StudentLayout activeNav="Profil">
    <AppPhoneFrame id="profile-screen" className="relative flex flex-col justify-between min-h-screen bg-transparent select-none lg:max-w-none lg:mx-0 lg:rounded-none lg:border-0 lg:my-0 lg:shadow-none">
      
      {/* Pastel background with sparkles */}
      <SoftSkyBackground variant="sunset">
        <StarSparklePattern />
      </SoftSkyBackground>

      {/* Hanging Crescent decoration */}
      <IslamicMoonStarDecoration className="absolute top-18 right-2 z-10 scale-90" />

      {/* Header Bar */}
      <header className="flex items-center gap-2 px-6 pt-5 pb-3 bg-white/90 backdrop-blur-md sticky top-0 z-40 border-b border-purple-100/70 shadow-xs">
        <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center border border-amber-300">
          <span className="text-lg">🧕</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-amber-600 uppercase tracking-wider leading-none mb-0.5">{appName} Panel</span>
          <h1 className="text-base font-black text-slate-800 tracking-tight leading-none">
            {profileTitle}
          </h1>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-grow px-5 pt-3 pb-6 select-none relative z-10 overflow-y-auto">
        
        {/* Profile Card */}
        <div className="bg-gradient-to-r from-primary to-purple-600 rounded-[32px] p-5 text-white shadow-lg relative overflow-hidden border-3 border-purple-300">
          {/* Subtle star pattern backing */}
          <span className="absolute -top-1 -right-1 text-5xl opacity-20 select-none animate-star-twinkle">⭐</span>
          <span className="absolute bottom-1 right-20 text-3xl opacity-10 select-none">🌙</span>

          <div className="flex items-center gap-4 relative z-10">
            {/* Avatar cartoon */}
            <div className="w-16 h-16 rounded-2xl bg-[#FFFDF4] flex items-center justify-center text-4.5xl shadow-md border-3 border-purple-200 select-none animate-pulse-soft overflow-hidden">
              {schoolProfile?.teacher_photo_url ? (
                <img src={schoolProfile.teacher_photo_url} alt="" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              ) : (
                <span>🧕</span>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <span className="text-[9px] font-black tracking-widest bg-white/20 text-white px-2.5 py-1 rounded-full select-none uppercase border border-white/20">
                Kaunselor Berdaftar
              </span>
              <h2 className="text-[15px] font-black truncate mt-2 leading-none">
                {counselorName}
              </h2>
              <p className="text-[10px] opacity-90 truncate font-black tracking-wide mt-1 text-purple-100">
                Lembaga Kaunselor: {counselorId}
              </p>
              <div className="flex items-center gap-1 text-[9px] font-black opacity-90 mt-1.5 text-amber-200">
                <GraduationCap className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{schoolName}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Milestone Stats Block */}
        <div className="grid grid-cols-3 gap-3 my-5">
          {/* Stat 1 */}
          <div className="bg-white/95 p-3 rounded-2xl border-2 border-purple-100/40 shadow-xs text-center relative overflow-hidden">
            <span className="absolute -top-1 -right-1 text-xs opacity-30 select-none">🔥</span>
            <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center mx-auto mb-1">
              <Flame className="w-4 h-4 text-orange-500" />
            </div>
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-wide block">
              Streak
            </span>
            <span className="text-xs font-black text-purple-950 block mt-0.5">
              4 Hari 🔥
            </span>
          </div>

          {/* Stat 2 */}
          <div className="bg-white/95 p-3 rounded-2xl border-2 border-purple-100/40 shadow-xs text-center relative overflow-hidden">
            <span className="absolute -top-1 -right-1 text-xs opacity-30 select-none">✨</span>
            <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-1">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
            </div>
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-wide block">
              Sesi
            </span>
            <span className="text-xs font-black text-purple-950 block mt-0.5">
              {completedCount} Kali
            </span>
          </div>

          {/* Stat 3 */}
          <div className="bg-white/95 p-3 rounded-2xl border-2 border-purple-100/40 shadow-xs text-center relative overflow-hidden">
            <span className="absolute -top-1 -right-1 text-xs opacity-30 select-none">⭐</span>
            <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center mx-auto mb-1">
              <Sparkles className="w-4 h-4 text-indigo-500" />
            </div>
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-wide block">
              Mindset
            </span>
            <span className="text-xs font-black text-emerald-600 block mt-0.5 uppercase tracking-wide leading-none pt-0.5">
              Tenang 😌
            </span>
          </div>
        </div>

        {/* Counseling Tips Section */}
        <div className="flex items-center gap-1.5 mb-3 px-1">
          <Star className="w-3.5 h-3.5 text-amber-500 animate-star-twinkle" />
          <h3 className="text-xs font-black text-purple-950 uppercase tracking-widest leading-none">
            Garis Panduan Kaunseling Minda KPM
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Tip Item 1 */}
          <div className="bg-white/95 rounded-2xl p-4 border-2 border-purple-100/30 shadow-xs flex gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-pink-100 border border-pink-200 flex items-center justify-center text-xl shrink-0 select-none">
              🌱
            </div>
            <div className="flex-1">
              <h4 className="text-xs font-black text-[#8B5CF6]">
                Terapi i-CBT (Cognitive Behavioral Islam)
              </h4>
              <p className="text-[10.5px] font-bold text-slate-600 leading-relaxed mt-1">
                i-Qalb Care menyusun peralihan kognitif negatif kepada gema zikrullah untuk menstabilkan kondisi psikologi murid yang mengalami tekanan, kemarahan atau cemas harian.
              </p>
            </div>
          </div>

          {/* Tip Item 2 */}
          <div className="bg-white/95 rounded-2xl p-4 border-2 border-purple-100/30 shadow-xs flex gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-amber-100 border border-amber-200 flex items-center justify-center text-xl shrink-0 select-none">
              💗
            </div>
            <div className="flex-1">
              <h4 className="text-xs font-black text-[#8B5CF6]">
                Sokongan Emosi Tanpa Sarat (Empathy)
              </h4>
              <p className="text-[10.5px] font-bold text-slate-600 leading-relaxed mt-1">
                Sambutlah luahan dari murid dengan ramah dan sabar. Zikir dapat memainkan peranan psikososial yang menenteramkan dan memulihkan keyakinan diri mereka.
              </p>
            </div>
          </div>

          {/* Tip Item 3 */}
          <div className="bg-white/95 rounded-2xl p-4 border-2 border-purple-100/30 shadow-xs flex gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-teal-100 border border-teal-200 flex items-center justify-center text-xl shrink-0 select-none">
              🏡
            </div>
            <div className="flex-1">
              <h4 className="text-xs font-black text-[#8B5CF6]">
                Amalan Berterusan di Rumah
              </h4>
              <p className="text-[10.5px] font-bold text-slate-600 leading-relaxed mt-1">
                Galakkan murid memasang aplikasi PWA i-Qalb Care di peranti ibu bapa mereka bagi membolehkan latihan zikir, selawat dhuha dan doa dilatih secara mandiri di kediaman masing-masing.
              </p>
            </div>
          </div>
        </div>

        {/* Footer info brand */}
        <div className="mt-8 text-center pb-4 select-none">
          <p className="text-[10px] font-black text-slate-600">
            {appName}{tagline ? `: ${tagline}` : ''} (PWA v1.0.0)
          </p>
          {!privacyNote && (
            <p className="text-[9px] font-bold text-slate-400 mt-1 leading-relaxed px-5">
              Dibangunkan khas untuk Guru Kaunseling Malaysia bagi pengurusan sokongan emosi sejahtera murid sekolah rendah & menengah.
            </p>
          )}
        </div>

      </main>

      {/* Bottom Nav */}
      <BottomNav active="Profil" />
    </AppPhoneFrame>
    </StudentLayout>
  );
};
