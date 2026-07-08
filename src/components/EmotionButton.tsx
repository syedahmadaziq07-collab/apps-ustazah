import React, { useState } from 'react';

export interface EmotionButtonProps {
  id: string;
  emoji: string;
  label: string;
  colorType: 'yellow' | 'red' | 'blue' | 'purple' | 'orange' | 'teal' | 'green';
  onClick: () => void;
  imageUrl?: string;
  className?: string;
}

export const EmotionButton: React.FC<EmotionButtonProps> = ({ id, emoji, label, colorType, onClick, imageUrl, className = '' }) => {
  const [shaking, setShaking] = useState(false);

  const handleClick = () => {
    setShaking(true);
    onClick();
    setTimeout(() => {
      setShaking(false);
    }, 300);
  };

  const colorMap: Record<string, string> = {
    yellow: 'bg-yellow-pastel text-amber-800 border-amber-200 hover:bg-yellow-100',
    red: 'bg-pink-pastel text-rose-800 border-rose-200 hover:bg-rose-100',
    blue: 'bg-blue-pastel text-blue-800 border-blue-200 hover:bg-blue-200/60',
    purple: 'bg-primary-light text-purple-800 border-purple-200 hover:bg-purple-100',
    orange: 'bg-orange-pastel text-orange-800 border-orange-200 hover:bg-orange-100',
    teal: 'bg-teal-pastel text-teal-800 border-teal-200 hover:bg-teal-100',
    green: 'bg-green-pastel text-emerald-800 border-emerald-200 hover:bg-emerald-100',
  };

  const circleClass = `w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full border-3 shadow-md shrink-0 ${colorMap[colorType]}`;

  const wrapperClass = `relative w-full flex flex-col items-center gap-1.5 font-sans transition-all duration-200 cursor-pointer ${className} ${
    shaking ? 'animate-shake' : 'hover:scale-[1.08] active:scale-95'
  }`;

  if (imageUrl) {
    return (
      <button id={`emotion-btn-${id}`} onClick={handleClick} className={wrapperClass}>
        <div className={`${circleClass} overflow-hidden`}>
          <img src={imageUrl} alt={label} className="w-full h-full object-cover" />
        </div>
        <span className="text-[11px] font-black leading-none">{label}</span>
      </button>
    );
  }

  return (
    <button id={`emotion-btn-${id}`} onClick={handleClick} className={wrapperClass}>
      <div className={`${circleClass} flex items-center justify-center`}>
        <span className="text-4xl filter drop-shadow-sm animate-pulse-soft">{emoji}</span>
      </div>
      <span className="text-[11px] font-black leading-none">{label}</span>
    </button>
  );
};
