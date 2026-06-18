import React, { useState } from 'react';

interface EmotionButtonProps {
  id: string;
  emoji: string;
  label: string;
  colorType: 'yellow' | 'red' | 'blue' | 'purple' | 'orange' | 'teal' | 'green';
  onClick: () => void;
  imageUrl?: string;
}

export const EmotionButton: React.FC<EmotionButtonProps> = ({ id, emoji, label, colorType, onClick, imageUrl }) => {
  const [shaking, setShaking] = useState(false);

  const handleClick = () => {
    setShaking(true);
    onClick();
    setTimeout(() => {
      setShaking(false);
    }, 300);
  };

  // Pastel styles based on color palette
  const colorMap = {
    yellow: 'bg-yellow-pastel text-amber-800 border-amber-200 hover:bg-yellow-100',
    red: 'bg-pink-pastel text-rose-800 border-rose-200 hover:bg-rose-100', // red-pastel uses pink-pastel/rose-800
    blue: 'bg-blue-pastel text-blue-800 border-blue-200 hover:bg-blue-200/60',
    purple: 'bg-primary-light text-purple-800 border-purple-200 hover:bg-purple-100',
    orange: 'bg-orange-pastel text-orange-800 border-orange-200 hover:bg-orange-100',
    teal: 'bg-teal-pastel text-teal-800 border-teal-200 hover:bg-teal-100',
    green: 'bg-green-pastel text-emerald-800 border-emerald-200 hover:bg-emerald-100',
  };

  return (
    <button
      id={`emotion-btn-${id}`}
      onClick={handleClick}
      className={`relative w-full aspect-square flex flex-col items-center justify-center rounded-full border-3 shadow-md font-sans transition-all duration-200 cursor-pointer ${
        colorMap[colorType]
      } ${shaking ? 'animate-shake' : 'hover:scale-[1.08] active:scale-95'}`}
    >
      {imageUrl ? (
        <img src={imageUrl} alt={label} className="w-12 h-12 rounded-full object-cover border-2 border-white/80 shadow-sm mb-1" />
      ) : (
        <span className="text-4xl filter drop-shadow-sm mb-1 animate-pulse-soft">{emoji}</span>
      )}
      <span className="text-[11px] font-black leading-none">{label}</span>
      
      {/* Tap decorative dot */}
      <div className="absolute bottom-1.5 w-1.5 h-1.5 rounded-full bg-current opacity-40" />
    </button>
  );
};
