import React from 'react';
import { useParams } from 'react-router-dom';

const pageNames: Record<string, string> = {
  home: 'Urus Halaman Utama',
  emosi: 'Urus Emosi',
  terapi: 'Urus Terapi',
  doa: 'Urus Doa',
  gambar: 'Urus Gambar',
  audio: 'Urus Audio',
  'profil-app': 'Urus Profil Aplikasi',
  tetapan: 'Tetapan Sistem',
};

export const TeacherPlaceholder: React.FC = () => {
  const { pageId } = useParams<{ pageId: string }>();
  const title = pageNames[pageId || ''] || 'Halaman';

  return (
    <div className="flex-grow p-4 md:p-6 overflow-y-auto pb-20 md:pb-6">
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-black text-slate-800">{title}</h1>
        <p className="text-xs font-bold text-slate-500 mt-1">
          Fungsi edit penuh akan dibuat dalam fasa seterusnya.
        </p>
      </div>

      <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6 text-center">
        <div className="text-4xl mb-3">🚧</div>
        <p className="text-sm font-black text-amber-800">
          Fasa seterusnya: Edit "{title}"
        </p>
        <p className="text-xs font-bold text-amber-700 mt-2 leading-relaxed max-w-md mx-auto">
          Anda akan dapat mengedit kandungan halaman ini, termasuk teks, gambar, audio, dan susunan
          terus dari dashboard tanpa perlu mengubah kod aplikasi.
        </p>
      </div>
    </div>
  );
};
