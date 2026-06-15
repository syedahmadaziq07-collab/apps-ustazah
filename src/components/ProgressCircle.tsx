import React from 'react';

interface ProgressCircleProps {
  count: number;
  max: number;
}

export const ProgressCircle: React.FC<ProgressCircleProps> = ({ count, max = 10 }) => {
  const radius = 80;
  const strokeWidth = 12;
  const circumference = 2 * Math.PI * radius; // Approx 502.65
  const progress = Math.min(count, max);
  const strokeDashoffset = circumference - (progress / max) * circumference;

  // Calculate exact end coordinate of progress arc
  // Circle starts from top (-90 degrees)
  const angle = ((progress / max) * 360 - 90) * (Math.PI / 180);
  const starX = 110 + radius * Math.cos(angle);
  const starY = 110 + radius * Math.sin(angle);

  return (
    <div id="progress-circle-container" className="relative flex items-center justify-center w-[220px] h-[220px] mx-auto select-none">
      <svg width="220" height="220" viewBox="0 0 220 220" className="w-full h-full overflow-visible" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="purpleRingGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#A78BFA" />
            <stop offset="50%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#6D28D9" />
          </linearGradient>
          <linearGradient id="backRingGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F5F3FF" />
            <stop offset="100%" stopColor="#DDD6FE" />
          </linearGradient>
          <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#7C3AED" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* Small background circle wrapper */}
        <circle
          cx="110"
          cy="110"
          r="95"
          fill="#F5F3FF"
          opacity="0.65"
          stroke="#E9D5FF"
          strokeWidth="1.5"
        />

        {/* Gray/Soft Lavender Background Circle */}
        <circle
          cx="110"
          cy="110"
          r={radius}
          fill="transparent"
          stroke="url(#backRingGrad)"
          strokeWidth={strokeWidth}
        />

        {/* Animated Purple Progress Circle */}
        <circle
          className="progress-ring__circle transition-all duration-300"
          cx="110"
          cy="110"
          r={radius}
          fill="transparent"
          stroke="url(#purpleRingGrad)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          filter="url(#softShadow)"
          transform="rotate(-90 110 110)"
          style={{ transformOrigin: 'center' }}
        />

        {/* Star Decoration exactly at progress end */}
        {progress > 0 && (
          <g transform={`translate(${starX}, ${starY})`} className="animate-star-twinkle">
            {/* Glow backing */}
            <circle cx="0" cy="0" r="14" fill="#FEF08A" opacity="0.6" className="animate-ping" />
            {/* Star geometry */}
            <path
              d="M 0 -9 L 2.5 -2.5 L 9 -2 L 4 -0 L 5.5 6 L 0 2.5 L -5.5 6 L -4 -0 L -9 -2 L -2.5 -2.5 Z"
              fill="#FBBF24"
              stroke="#D97706"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </g>
        )}

        {/* Twinkling Stars placed in SVG context around the core circle */}
        {/* Top-Right Star */}
        <path
          d="M 185 30 L 187 34 L 192 35 L 188 38 L 189 43 L 185 40 L 181 43 L 182 38 L 178 35 L 183 34 Z"
          fill="#FBBF24"
          className="animate-star-twinkle"
        />
        {/* Bottom-Right Star */}
        <path
          d="M 190 175 L 192 179 L 197 180 L 193 183 L 194 188 L 190 185 L 186 188 L 187 183 L 183 180 L 188 179 Z"
          fill="#F59E0B"
          className="animate-pulse"
        />
        {/* Top-Left Star */}
        <path
          d="M 35 45 L 37 49 L 42 50 L 38 53 L 39 58 L 35 55 L 31 58 L 32 53 L 28 50 L 33 49 Z"
          fill="#A78BFA"
          className="animate-star-twinkle"
        />
        {/* Bottom-Left Star */}
        <path
          d="M 30 165 L 32 169 L 37 170 L 33 173 L 34 178 L 30 175 L 26 178 L 27 173 L 23 170 L 28 169 Z"
          fill="#FBBF24"
          className="animate-pulse"
        />
      </svg>

      {/* Central Metrics Card */}
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className="text-4xl font-extrabold text-primary filter drop-shadow-sm leading-none">
          {count}/{max}
        </span>
        <span className="text-xs font-bold text-emerald-600 mt-1 select-none animate-bounce">
          Sangat baik! 🌸
        </span>
      </div>
    </div>
  );
};
