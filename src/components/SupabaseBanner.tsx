import React, { useEffect, useState } from 'react';
import { SupabaseHealthStatus, checkSupabaseHealth } from '../lib/supabase';

export const SupabaseBanner: React.FC = () => {
  const [status, setStatus] = useState<SupabaseHealthStatus>('loading');

  useEffect(() => {
    checkSupabaseHealth().then(setStatus);
  }, []);

  if (status === 'connected' || status === 'loading') return null;

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3 mb-4">
      <p className="text-[10px] font-bold text-amber-800">Supabase belum disambungkan, perubahan disimpan pada peranti ini.</p>
    </div>
  );
};
