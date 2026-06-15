import React from 'react';

// Wrapper to apply common bounce-in and floating animation
const FlowWrapper: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  return (
    <div className={`animate-bounce-in flex justify-center items-center ${className}`}>
      <div className="animate-float">
        {children}
      </div>
    </div>
  );
};

export const HappyChildrenIllustration: React.FC<{ className?: string }> = ({ className = 'h-48' }) => {
  return (
    <FlowWrapper className={className}>
      <svg viewBox="0 0 320 200" className="w-full h-full rounded-2xl shadow-sm overflow-hidden" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#BFDBFE" />
            <stop offset="100%" stopColor="#EFF6FF" />
          </linearGradient>
        </defs>

        {/* Background Sky */}
        <rect width="320" height="200" fill="url(#skyGrad)" />

        {/* Scattered Stars */}
        <polygon points="40,25 43,32 50,33 45,38 46,45 40,41 34,45 35,38 30,33 37,32" fill="#FEF08A" className="animate-pulse" />
        <polygon points="120,15 122,20 127,21 123,25 124,30 120,27 116,30 117,25 113,21 118,20" fill="#FEF08A" />
        <polygon points="280,30 282,35 287,36 283,40 284,45 280,42 276,45 277,40 273,36 278,35" fill="#FEF08A" className="animate-pulse" />
        <polygon points="250,15 251,18 254,19 252,21 252,24 250,22 248,24 248,21 246,19 249,18" fill="#FDE68A" />
        <polygon points="70,55 71,58 74,59 72,61 72,64 70,62 68,64 68,61 66,59 69,58" fill="#FDE68A" />

        {/* Clouds */}
        <ellipse cx="60" cy="40" rx="20" ry="12" fill="white" opacity="0.9" />
        <ellipse cx="80" cy="45" rx="15" ry="10" fill="white" opacity="0.9" />
        
        <ellipse cx="260" cy="50" rx="25" ry="15" fill="white" opacity="0.8" />
        <ellipse cx="240" cy="55" rx="18" ry="12" fill="white" opacity="0.8" />

        {/* Rolling Green Hills */}
        <path d="M-20 200 C80 140, 160 170, 340 130 L340 200 Z" fill="#86EFAC" />
        <path d="M-10 200 C100 160, 220 150, 350 160 L350 200 Z" fill="#4ADE80" opacity="0.7" />

        {/* LEFT CHARACTER: Boy wearing Green Baju Melayu + Songkok Putih */}
        <g transform="translate(85, 80)">
          {/* Hands waving */}
          <line x1="-12" y1="40" x2="-25" y2="20" stroke="#1F2937" strokeWidth="4" strokeLinecap="round" />
          <line x1="42" y1="40" x2="55" y2="20" stroke="#1F2937" strokeWidth="4" strokeLinecap="round" />
          <circle cx="-25" cy="20" r="6" fill="#FDBA74" />
          <circle cx="55" cy="20" r="6" fill="#FDBA74" />

          {/* Body Baju Melayu (green) */}
          <rect x="-10" y="35" width="50" height="55" rx="10" fill="#059669" />
          {/* Inner details */}
          <line x1="15" y1="35" x2="15" y2="55" stroke="#10B981" strokeWidth="3" />
          <circle cx="15" cy="42" r="2.5" fill="#FBBF24" />
          <circle cx="15" cy="50" r="2.5" fill="#FBBF24" />

          {/* Neck */}
          <rect x="10" y="27" width="10" height="10" fill="#FDBA74" />

          {/* Face */}
          <circle cx="15" cy="12" r="22" fill="#FDBA74" />
          
          {/* Eyes */}
          <circle cx="7" cy="8" r="3" fill="#1F2937" />
          <circle cx="23" cy="8" r="3" fill="#1F2937" />
          
          {/* Rosy cheeks */}
          <circle cx="3" cy="16" r="3" fill="#F472B6" opacity="0.6" />
          <circle cx="27" cy="16" r="3" fill="#F472B6" opacity="0.6" />

          {/* U-Smile */}
          <path d="M 11 16 Q 15 22 19 16" stroke="#1F2937" strokeWidth="2.5" strokeLinecap="round" fill="none" />

          {/* White Kopiah / Songkok Putih */}
          <rect x="-3" y="-12" width="36" height="15" rx="4" fill="white" />
          <line x1="-3" y1="0" x2="33" y2="0" stroke="#E5E7EB" strokeWidth="1" />
        </g>

        {/* RIGHT CHARACTER: Girl wearing Pink Baju Kurung + Pink Tudung */}
        <g transform="translate(195, 80)">
          {/* Waving hand */}
          <line x1="42" y1="40" x2="52" y2="18" stroke="#1F2937" strokeWidth="4" strokeLinecap="round" />
          <circle cx="52" cy="18" r="6" fill="#FDBA74" />
          {/* Left hand relaxed */}
          <line x1="-12" y1="40" x2="-18" y2="52" stroke="#1F2937" strokeWidth="4" strokeLinecap="round" />
          <circle cx="-18" cy="52" r="6" fill="#FDBA74" />

          {/* Tudung shape (covering body) */}
          <path d="M -15 35 Q 15 25 45 35 L 45 85 Q 15 95 -15 85 Z" fill="#F472B6" />

          {/* Inner face cutout */}
          <rect x="-10" y="32" width="50" height="55" rx="20" fill="none" />
          
          {/* Face */}
          <circle cx="15" cy="12" r="20" fill="#FDBA74" />

          {/* Eyes with long eyelashes */}
          <circle cx="7" cy="8" r="3" fill="#1F2937" />
          <line x1="7" y1="5" x2="5" y2="2" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="5" y1="6" x2="3" y2="4" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" />
          
          <circle cx="23" cy="8" r="3" fill="#1F2937" />
          <line x1="23" y1="5" x2="25" y2="2" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="25" y1="6" x2="27" y2="4" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" />

          {/* Rosy Cheeks */}
          <circle cx="4" cy="15" r="3" fill="#F43F5E" opacity="0.6" />
          <circle cx="26" cy="15" r="3" fill="#F43F5E" opacity="0.6" />

          {/* Smile */}
          <path d="M 11 16 Q 15 21 19 16" stroke="#1F2937" strokeWidth="2.5" strokeLinecap="round" fill="none" />

          {/* Tudung fold over head */}
          <path d="M -5 0 C -5 -20, 35 -20, 35 0 C 35 15, -5 15, -5 0 Z" fill="#EC4899" />
          <path d="M -5 10 C 2 30, 28 30, 35 10 Z" fill="#EC4899" opacity="0.9" />

          {/* Cute bow on hijab */}
          <circle cx="30" cy="24" r="4" fill="#FCD34D" />
          <polygon points="30,24 35,20 35,28" fill="#FBBF24" />
          <polygon points="30,24 25,20 25,28" fill="#FBBF24" />
        </g>
      </svg>
    </FlowWrapper>
  );
};

export const AngryChildIllustration: React.FC<{ className?: string }> = ({ className = 'h-48' }) => {
  return (
    <FlowWrapper className={className}>
      <svg viewBox="0 0 200 200" className="w-52 h-52 rounded-2xl shadow-sm overflow-hidden" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="angryGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FED7AA" />
            <stop offset="100%" stopColor="#FEF3C7" />
          </linearGradient>
        </defs>

        {/* Background */}
        <rect width="200" height="200" fill="url(#angryGrad)" />

        {/* Red/Orange Wavy Shapes inside background */}
        <path d="M 0 150 Q 50 120, 100 160 T 200 140 L 200 200 L 0 200 Z" fill="#FDBA74" opacity="0.4" />
        <path d="M 0 170 Q 60 150, 120 180 T 200 160 L 200 200 L 0 200 Z" fill="#F97316" opacity="0.2" />

        {/* Steam Puffs */}
        <g fill="white" opacity="0.85">
          <circle cx="55" cy="50" r="10" />
          <circle cx="65" cy="45" r="8" />
          <circle cx="48" cy="45" r="6" />
          
          <circle cx="145" cy="45" r="10" />
          <circle cx="135" cy="40" r="8" />
          <circle cx="152" cy="40" r="6" />
        </g>

        {/* Boy character centered */}
        <g transform="translate(100, 110)">
          {/* Angry veins / sparks */}
          <path d="M -60 -50 L -45 -35 M -45 -50 L -60 -35" stroke="#EF4444" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M 45 -50 L 60 -35 M 60 -50 L 45 -35" stroke="#EF4444" strokeWidth="3.5" strokeLinecap="round" />

          {/* Fists clenched at sides */}
          <rect x="-42" y="32" width="14" height="14" rx="4" fill="#F87171" stroke="#1F2937" strokeWidth="3" />
          <rect x="28" y="32" width="14" height="14" rx="4" fill="#F87171" stroke="#1F2937" strokeWidth="3" />
          {/* Fist details */}
          <line x1="-35" y1="36" x2="-35" y2="42" stroke="#1F2937" strokeWidth="1.5" />
          <line x1="35" y1="36" x2="35" y2="42" stroke="#1F2937" strokeWidth="1.5" />

          {/* Arms */}
          <path d="M -35 32 L -20 20 M 35 32 L 20 20" stroke="#1F2937" strokeWidth="4" />

          {/* Body Baju Melayu (reddish pink) */}
          <rect x="-25" y="18" width="50" height="50" rx="8" fill="#DC2626" />

          {/* Neck */}
          <rect x="-6" y="8" width="12" height="12" fill="#FCA5A5" />

          {/* Face: red-tinted circle */}
          <circle cx="0" cy="-6" r="28" fill="#FCA5A5" />

          {/* Angry angled eyebrows */}
          <line x1="-16" y1="-18" x2="-4" y2="-12" stroke="#1F2937" strokeWidth="4.5" strokeLinecap="round" />
          <line x1="16" y1="-18" x2="4" y2="-12" stroke="#1F2937" strokeWidth="4.5" strokeLinecap="round" />

          {/* Wide furious eyes */}
          <circle cx="-10" cy="-7" r="4.5" fill="#1F2937" />
          <circle cx="10" cy="-7" r="4.5" fill="#1F2937" />
          <circle cx="-11" cy="-9" r="1.5" fill="white" />
          <circle cx="9" cy="-9" r="1.5" fill="white" />

          {/* Rosy red cheeks */}
          <circle cx="-19" cy="2" r="5" fill="#EF4444" opacity="0.5" />
          <circle cx="19" cy="2" r="5" fill="#EF4444" opacity="0.5" />

          {/* Angry small frown mouth */}
          <path d="M -8 10 Q 0 2 8 10" stroke="#1F2937" strokeWidth="3.5" strokeLinecap="round" fill="none" />

          {/* Kopiah / Songkok */}
          <rect x="-18" y="-36" width="36" height="13" rx="3" fill="white" />
          <line x1="-18" y1="-26" x2="18" y2="-26" stroke="#EF4444" strokeWidth="2.5" />
        </g>
      </svg>
    </FlowWrapper>
  );
};

export const PrayingChildIllustration: React.FC<{ className?: string }> = ({ className = 'h-48' }) => {
  return (
    <FlowWrapper className={className}>
      <svg viewBox="0 0 200 220" className="w-52 h-56 rounded-2xl shadow-sm overflow-hidden" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="prayingGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#EDE9FE" />
            <stop offset="100%" stopColor="#F5F3FF" />
          </linearGradient>
        </defs>

        {/* Background */}
        <rect width="200" height="220" fill="url(#prayingGrad)" />

        {/* Crescent Moon top-right */}
        <path d="M 165 25 A 15 15 0 1 0 180 50 A 20 20 0 1 1 165 25 Z" fill="#FBBF24" />

        {/* Sparkling Stars */}
        <g fill="#A78BFA" opacity="0.8">
          {/* Star 1 */}
          <path d="M 30 40 L 33 45 L 38 48 L 33 51 L 30 56 L 27 51 L 22 48 L 27 45 Z" />
          {/* Star 2 */}
          <path d="M 130 65 L 132 68 L 137 70 L 132 72 L 130 77 L 128 72 L 123 70 L 128 68 Z" />
          {/* Star 3 */}
          <path d="M 45 140 L 47 143 L 52 145 L 47 147 L 45 152 L 43 147 L 38 145 L 43 143 Z" className="animate-pulse" />
        </g>

        {/* Peaceful Boy character centered */}
        <g transform="translate(100, 115)">
          {/* Sparkles around head */}
          <circle cx="-42" cy="-45" r="2.5" fill="#FBBF24" />
          <circle cx="45" cy="-35" r="2" fill="#FBBF24" />

          {/* Hands raised in dua position */}
          {/* Right hand (rounded rectangle, palm tilted) */}
          <g transform="translate(14, 25) rotate(-15)">
            <rect x="-8" y="-12" width="16" height="24" rx="6" fill="#FDBA74" stroke="#1F2937" strokeWidth="2.5" />
            {/* fingers detail */}
            <line x1="-3" y1="-8" x2="-3" y2="2" stroke="#1F2937" strokeWidth="1.5" />
            <line x1="1" y1="-9" x2="1" y2="3" stroke="#1F2937" strokeWidth="1.5" />
          </g>
          {/* Left hand (rounded rectangle, palm tilted) */}
          <g transform="translate(-14, 25) rotate(15)">
            <rect x="-8" y="-12" width="16" height="24" rx="6" fill="#FDBA74" stroke="#1F2937" strokeWidth="2.5" />
            {/* fingers detail */}
            <line x1="3" y1="-8" x2="3" y2="2" stroke="#1F2937" strokeWidth="1.5" />
            <line x1="-1" y1="-9" x2="-1" y2="3" stroke="#1F2937" strokeWidth="1.5" />
          </g>

          {/* Body Baju Melayu (green) */}
          <rect x="-24" y="24" width="48" height="52" rx="8" fill="#10B981" />

          {/* Neck */}
          <rect x="-6" y="14" width="12" height="12" fill="#FDBA74" />

          {/* Face */}
          <circle cx="0" cy="0" r="26" fill="#FDBA74" />

          {/* Closed peaceful eyes (two curved lines) */}
          <path d="M -15 -2 C -11 3, -7 3, -3 -2" fill="none" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" />
          <path d="M 3 -2 C 7 3, 11 3, 15 -2" fill="none" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" />

          {/* Sweet closed smile */}
          <path d="M -4 9 Q 0 13 4 9" fill="none" stroke="#1F2937" strokeWidth="2.5" strokeLinecap="round" />

          {/* Rosy cheeks */}
          <circle cx="-17" cy="6" r="3.5" fill="#F472B6" opacity="0.6" />
          <circle cx="17" cy="6" r="3.5" fill="#F472B6" opacity="0.6" />

          {/* White Kopiah */}
          <rect x="-16" y="-30" width="32" height="13" rx="3" fill="white" />
          <line x1="-16" y1="-22" x2="16" y2="-22" stroke="#E5E7EB" strokeWidth="1.5" />
        </g>
      </svg>
    </FlowWrapper>
  );
};

export const SuccessStarIllustration: React.FC<{ className?: string }> = ({ className = 'h-52' }) => {
  // 20 confetti pieces random placements
  const confettis = [
    { x: 30, y: 50, w: 10, h: 5, color: '#F472B6', delay: '0.1s', rot: 15 },
    { x: 50, y: 30, w: 6, h: 12, color: '#10B981', delay: '0.3s', rot: -45 },
    { x: 90, y: 40, w: 8, h: 8, color: '#3B82F6', delay: '0.5s', rot: 30 },
    { x: 210, y: 35, w: 12, h: 6, color: '#A78BFA', delay: '0.2s', rot: 60 },
    { x: 250, y: 60, w: 7, h: 14, color: '#F59E0B', delay: '0.7s', rot: -20 },
    { x: 270, y: 110, w: 10, h: 6, color: '#EC4899', delay: '0.9s', rot: 40 },
    { x: 25, y: 120, w: 8, h: 8, color: '#10B981', delay: '1.1s', rot: -10 },
    { x: 60, y: 220, w: 11, h: 5, color: '#3B82F6', delay: '1.3s', rot: 75 },
    { x: 100, y: 250, w: 6, h: 12, color: '#EC4899', delay: '0.4s', rot: -35 },
    { x: 150, y: 230, w: 8, h: 8, color: '#FBBF24', delay: '0.8s', rot: 25 },
    { x: 220, y: 240, w: 10, h: 6, color: '#10B981', delay: '1.2s', rot: 50 },
    { x: 260, y: 190, w: 12, h: 5, color: '#A78BFA', delay: '0.6s', rot: -65 },
    { x: 200, y: 80, w: 9, h: 9, color: '#14B8A6', delay: '1.4s', rot: 15 },
    { x: 110, y: 20, w: 7, h: 12, color: '#F43F5E', delay: '1.5s', rot: 80 },
    { x: 150, y: 45, w: 10, h: 5, color: '#A78BFA', delay: '0.2s', rot: -40 },
  ];

  return (
    <FlowWrapper className={className}>
      <svg viewBox="0 0 300 300" className="w-64 h-64 rounded-3xl shadow-sm overflow-hidden bg-gradient-to-b from-[#FEF08A] to-[#FDE68A]" xmlns="http://www.w3.org/2000/svg">
        
        {/* Confetti Elements */}
        {confettis.map((c, idx) => (
          <rect
            key={idx}
            x={c.x}
            y={c.y}
            width={c.w}
            height={c.h}
            fill={c.color}
            transform={`rotate(${c.rot}, ${c.x + c.w/2}, ${c.y + c.h/2})`}
            opacity="0.9"
            className="animate-pulse"
            style={{ animationDelay: c.delay }}
          />
        ))}

        {/* Small stars around */}
        <polygon points="45,80 47,84 52,85 48,88 49,93 45,90 41,93 42,88 38,85 43,84" fill="#F59E0B" />
        <polygon points="245,60 247,64 252,65 248,68 249,73 245,70 241,73 242,68 238,65 243,64" fill="#FBBF24" />
        <polygon points="65,180 67,184 72,185 68,188 69,193 65,190 61,193 62,188 58,185 63,184" fill="#FBBF24" />
        <polygon points="235,210 237,214 242,215 238,218 239,223 235,220 231,223 232,218 228,215 233,214" fill="#F59E0B" />

        {/* LARGE Center Star */}
        <g id="centerStar" transform="translate(150, 140)">
          {/* Sparkle background glow */}
          <circle cx="0" cy="10" r="65" fill="#FEF08A" opacity="0.6" />
          <circle cx="0" cy="10" r="50" fill="white" opacity="0.4" />

          {/* 5-pointed star */}
          <polygon 
            points="0,-85 24,-25 85,-20 38,22 55,82 0,45 -55,82 -38,22 -85,-20 -24,-25" 
            fill="#FBBF24" 
            stroke="#D97706" 
            strokeWidth="4" 
            strokeLinejoin="round" 
          />

          {/* Core White Mosque Detail Inside the Star */}
          <g transform="translate(0, 0)">
            {/* Mosque dome */}
            <path d="M-18 25 C-18 2, 18 2, 18 25 Z" fill="white" />
            {/* Crescent moon on top of dome */}
            <path d="M-2 -3 A 4 4 0 1 0 5 3 A 5 5 0 1 1 -2 -3 Z" fill="#D97706" transform="translate(0, 3)" />
            {/* Mosque base block */}
            <rect x="-24" y="25" width="48" height="20" fill="white" />
            {/* Mosque arched door */}
            <path d="M-6 45 C-6 35, 6 35, 6 45 Z" fill="#F59E0B" />
            {/* Minaret Left */}
            <rect x="-32" y="10" width="6" height="35" fill="white" />
            <polygon points="-33,10 -29,2 -25,10" fill="#F59E0B" />
            {/* Minaret Right */}
            <rect x="26" y="10" width="6" height="35" fill="white" />
            <polygon points="25,10 29,2 33,10" fill="#F59E0B" />
          </g>
        </g>
      </svg>
    </FlowWrapper>
  );
};

export const SadChildIllustration: React.FC<{ className?: string }> = ({ className = 'h-48' }) => {
  return (
    <FlowWrapper className={className}>
      <svg viewBox="0 0 200 200" className="w-52 h-52 rounded-2xl shadow-sm overflow-hidden" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="sadGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#BFDBFE" />
            <stop offset="100%" stopColor="#EFF6FF" />
          </linearGradient>
        </defs>

        {/* Background */}
        <rect width="200" height="200" fill="url(#sadGrad)" />

        {/* Falling soft rain drops */}
        <ellipse cx="30" cy="50" rx="2" ry="6" fill="#60A5FA" opacity="0.6" />
        <ellipse cx="50" cy="30" rx="1.5" ry="5" fill="#60A5FA" opacity="0.4" />
        <ellipse cx="150" cy="40" rx="2" ry="6" fill="#60A5FA" opacity="0.6" />
        <ellipse cx="170" cy="70" rx="1.5" ry="5" fill="#60A5FA" opacity="0.4" />
        <ellipse cx="40" cy="120" rx="1.5" ry="5" fill="#60A5FA" opacity="0.5" />
        <ellipse cx="160" cy="130" rx="2" ry="6" fill="#60A5FA" opacity="0.5" />

        {/* Sad boy character tilted down */}
        <g transform="translate(100, 115)">
          {/* Background raindrop splash */}
          <path d="M-50 45 Q-70 30, -90 40" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" fill="none" />

          {/* Arms down */}
          <line x1="-22" y1="20" x2="-32" y2="40" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" />
          <line x1="22" y1="20" x2="32" y2="40" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" />
          <circle cx="-32" cy="40" r="5" fill="#FED7AA" />
          <circle cx="32" cy="40" r="5" fill="#FED7AA" />

          {/* Body Baju Melayu (blue) */}
          <rect x="-24" y="16" width="48" height="50" rx="8" fill="#2563EB" />

          {/* Neck */}
          <rect x="-5" y="8" width="10" height="10" fill="#FED7AA" />

          {/* Face tilted down */}
          <circle cx="0" cy="-6" r="26" fill="#FED7AA" />

          {/* Eyes with single tear falling from left eye */}
          <ellipse cx="-10" cy="-5" rx="3.5" ry="3" fill="#1F2937" />
          <ellipse cx="10" cy="-5" rx="3.5" ry="3" fill="#1F2937" />
          
          {/* Eyebrows angled up-center (sad) */}
          <path d="M -16 -13 Q -10 -15 -4 -10" fill="none" stroke="#1F2937" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M 16 -13 Q 10 -15 4 -10" fill="none" stroke="#1F2937" strokeWidth="3.5" strokeLinecap="round" />

          {/* BIG blue teardrop under left eye */}
          <path d="M -10 0 C -14 5, -6 5, -10 0 L -10 12 C -13 14, -7 14, -10 12 Z" fill="#3B82F6" className="animate-pulse" />
          <ellipse cx="-10" cy="11" rx="3" ry="4" fill="#60A5FA" />

          {/* Curved down mouth */}
          <path d="M -8 11 Q 0 4 8 11" fill="none" stroke="#1F2937" strokeWidth="3.5" strokeLinecap="round" />

          {/* Rosy cheeks */}
          <circle cx="-18" cy="4" r="3" fill="#F472B6" opacity="0.4" />
          <circle cx="18" cy="4" r="3" fill="#F472B6" opacity="0.4" />

          {/* White Kopiah */}
          <rect x="-16" y="-30" width="32" height="13" rx="3" fill="white" />
          <line x1="-16" y1="-22" x2="16" y2="-22" stroke="#DBEAFE" strokeWidth="1.5" />
        </g>
      </svg>
    </FlowWrapper>
  );
};

export const ScaredChildIllustration: React.FC<{ className?: string }> = ({ className = 'h-48' }) => {
  return (
    <FlowWrapper className={className}>
      <svg viewBox="0 0 200 200" className="w-52 h-52 rounded-2xl shadow-sm overflow-hidden" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="scaredGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#EDE9FE" />
            <stop offset="100%" stopColor="#DDD6FE" />
          </linearGradient>
        </defs>

        {/* Background */}
        <rect width="200" height="200" fill="url(#scaredGrad)" />

        {/* Ghostly / shadow shapes in back */}
        <path d="M30 40 C30 20, 60 20, 60 40 C60 50, 45 60, 40 70 C35 60, 30 50, 30 40 Z" fill="#C084FC" opacity="0.15" />
        <path d="M140 30 C140 10, 170 10, 170 30 C170 40, 155 50, 150 60 C145 50, 140 40, 140 30 Z" fill="#C084FC" opacity="0.15" />

        {/* Scared character center */}
        <g transform="translate(100, 115)">
          {/* Hands covering mouth */}
          <g transform="translate(-10, 8)" className="animate-pulse">
            {/* Left hand details */}
            <circle cx="-5" cy="0" r="7" fill="#FED7AA" stroke="#1F2937" strokeWidth="2" />
            <line x1="-5" y1="-4" x2="-5" y2="4" stroke="#1F2937" strokeWidth="1" />
          </g>
          <g transform="translate(10, 8)" className="animate-pulse">
            {/* Right hand details */}
            <circle cx="5" cy="0" r="7" fill="#FED7AA" stroke="#1F2937" strokeWidth="2" />
            <line x1="5" y1="-4" x2="5" y2="4" stroke="#1F2937" strokeWidth="1" />
          </g>

          {/* Arms raised up holding hands to face */}
          <path d="M -22 25 L -14 10 M 22 25 L 14 10" stroke="#1F2937" strokeWidth="3" />

          {/* Body Baju Melayu (purple-pastel color) */}
          <rect x="-24" y="20" width="48" height="50" rx="8" fill="#6B21A8" />

          {/* Neck */}
          <rect x="-5" y="10" width="10" height="12" fill="#FED7AA" />

          {/* Face */}
          <circle cx="0" cy="-6" r="26" fill="#FED7AA" />

          {/* Large wide eyes (larger circles) */}
          <circle cx="-10" cy="-6" r="6" fill="white" stroke="#1F2937" strokeWidth="2" />
          <circle cx="10" cy="-6" r="6" fill="white" stroke="#1F2937" strokeWidth="2" />
          {/* Tiny pupils shifted to center to look cross-eyed/scared */}
          <circle cx="-8" cy="-6" r="2.5" fill="#1F2937" />
          <circle cx="8" cy="-6" r="2.5" fill="#1F2937" />

          {/* Eyebrows raised high */}
          <path d="M -16 -16 M -16 -15 Q -10 -20 -4 -15" fill="none" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" />
          <path d="M 4 -15 Q 10 -20 16 -15" fill="none" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" />

          {/* Shivering sweat drops */}
          <path d="M -22 -15 C -24 -11, -26 -11, -22 -15 Z" fill="#60A5FA" />
          <circle cx="24" cy="-10" r="1.5" fill="#60A5FA" />

          {/* Mouth open in small 'O' shape, partially hidden behind hands */}
          <ellipse cx="0" cy="5" rx="4" ry="5" fill="#1F2937" />

          {/* Rosy pale cheeks */}
          <circle cx="-17" cy="3" r="3" fill="#EF4444" opacity="0.4" />
          <circle cx="17" cy="3" r="3" fill="#EF4444" opacity="0.4" />

          {/* White Kopiah */}
          <rect x="-16" y="-30" width="32" height="13" rx="3" fill="white" />
          <line x1="-16" y1="-22" x2="16" y2="-22" stroke="#EDE9FE" strokeWidth="1.5" />
        </g>
      </svg>
    </FlowWrapper>
  );
};

export const CalmChildIllustration: React.FC<{ className?: string }> = ({ className = 'h-48' }) => {
  return (
    <FlowWrapper className={className}>
      <svg viewBox="0 0 200 200" className="w-52 h-52 rounded-2xl shadow-sm overflow-hidden" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="calmGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#CCFBF1" />
            <stop offset="100%" stopColor="#F0FDF4" />
          </linearGradient>
        </defs>

        {/* Background */}
        <rect width="200" height="200" fill="url(#calmGrad)" />

        {/* Concentric circle aura behind character (white, low opacity) */}
        <circle cx="100" cy="110" r="60" fill="white" opacity="0.4" />
        <circle cx="100" cy="110" r="45" fill="white" opacity="0.5" />
        <circle cx="100" cy="110" r="30" fill="white" opacity="0.6" />

        {/* Floating sparkles and small stars */}
        <polygon points="35,45 37,49 42,50 38,52 39,57 35,54 31,57 32,52 28,50 33,49" fill="#10B981" />
        <polygon points="160,50 162,54 167,55 163,57 164,62 160,59 156,62 157,57 153,55 158,54" fill="#3B82F6" className="animate-star-twinkle" />
        <circle cx="150" cy="120" r="2.5" fill="#F59E0B" />
        <circle cx="45" cy="130" r="2" fill="#F59E0B" />

        {/* Boy character centered, peaceful expressions */}
        <g transform="translate(100, 115)">
          {/* Arms comfortably down */}
          <line x1="-22" y1="20" x2="-30" y2="40" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" />
          <line x1="22" y1="20" x2="30" y2="40" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" />
          <circle cx="-30" cy="40" r="5" fill="#FDBA74" />
          <circle cx="30" cy="40" r="5" fill="#FDBA74" />

          {/* Body Baju Melayu (turquoise) */}
          <rect x="-24" y="16" width="48" height="50" rx="8" fill="#0D9488" />

          {/* Neck */}
          <rect x="-5" y="8" width="10" height="10" fill="#FDBA74" />

          {/* Face */}
          <circle cx="0" cy="-6" r="26" fill="#FDBA74" />

          {/* Closed peaceful eyes */}
          <path d="M -13 -3 C -10 1, -7 1, -4 -3" fill="none" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" />
          <path d="M 4 -3 C 7 1, 10 1, 13 -3" fill="none" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" />

          {/* Friendly happy smile */}
          <path d="M -5 7 Q 0 12 5 7" fill="none" stroke="#1F2937" strokeWidth="2.5" strokeLinecap="round" />

          {/* Calm pink cheeks */}
          <circle cx="-16" cy="4" r="3.5" fill="#F472B6" opacity="0.6" />
          <circle cx="18" cy="4" r="3.5" fill="#F472B6" opacity="0.6" />

          {/* White Kopiah */}
          <rect x="-16" y="-30" width="32" height="13" rx="3" fill="white" />
          <line x1="-16" y1="-22" x2="16" y2="-22" stroke="#CCFBF1" strokeWidth="1.5" />
        </g>
      </svg>
    </FlowWrapper>
  );
};

export const PrayingChildSideIllustration: React.FC<{ className?: string }> = ({ className = 'h-40' }) => {
  return (
    <FlowWrapper className={className}>
      <svg viewBox="0 0 200 200" className="w-48 h-48 rounded-2xl shadow-sm overflow-hidden bg-gradient-to-b from-[#EDE9FE] to-[#F5F3FF]" xmlns="http://www.w3.org/2000/svg">
        
        {/* Crescent moon top-left */}
        <path d="M 25 25 A 10 10 0 1 0 35 42 A 13 13 0 1 1 25 25 Z" fill="#F59E0B" />
        
        {/* Sparkle stars */}
        <polygon points="160,35 162,38 165,39 162,40 163,43 160,41 157,43 158,40 155,39 158,38" fill="#FBBF24" />
        <polygon points="40,120 41,122 43,123 41,124 42,126 40,125 38,126 39,124 37,123 39,122" fill="#FBBF24" />

        {/* Character Praying */}
        <g transform="translate(100, 105)">
          
          {/* Hands raised holding open Quran / kitab in front of him */}
          
          {/* Hands in dua */}
          <circle cx="-12" cy="22" r="5" fill="#FDBA74" stroke="#1F2937" strokeWidth="1.5" />
          <circle cx="12" cy="22" r="5" fill="#FDBA74" stroke="#1F2937" strokeWidth="1.5" />
          
          {/* Body */}
          <rect x="-22" y="24" width="44" height="48" rx="8" fill="#7C3AED" />

          {/* Neck */}
          <rect x="-5" y="14" width="10" height="10" fill="#FDBA74" />

          {/* Face */}
          <circle cx="0" cy="0" r="24" fill="#FDBA74" />

          {/* Eyes closed peacefully */}
          <path d="M -11 -2 C -8 1, -5 1, -2 -2" fill="none" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" />
          <path d="M 2 -2 C 5 1, 8 1, 11 -2" fill="none" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" />

          {/* Small content smile */}
          <path d="M -4 8 Q 0 11 4 8" fill="none" stroke="#1F2937" strokeWidth="2.5" strokeLinecap="round" />

          {/* White Kopiah */}
          <rect x="-15" y="-28" width="30" height="12" rx="3" fill="white" />
          <line x1="-15" y1="-20" x2="15" y2="-20" stroke="#EDE9FE" strokeWidth="1" />

          {/* Small Open Kitab / Book in front of them */}
          <g transform="translate(0, 42)">
            {/* Left page */}
            <path d="M-22 0 Q-11 -4, 0 2 L0 14 Q-11 8, -22 10 Z" fill="#FFFBEB" stroke="#78350F" strokeWidth="2" />
            {/* Right page */}
            <path d="M22 0 Q11 -4, 0 2 L0 14 Q11 8, 22 10 Z" fill="#FFFBEB" stroke="#78350F" strokeWidth="2" />
            {/* Kitab book Cover back edge */}
            <path d="M-22 10 Q0 16, 22 10 L22 12 Q0 18, -22 12 Z" fill="#D97706" />
            {/* Small decorative lines on book pages to represent text */}
            <line x1="-16" y1="4" x2="-6" y2="1" stroke="#F59E0B" strokeWidth="1.5" />
            <line x1="-16" y1="8" x2="-6" y2="5" stroke="#F59E0B" strokeWidth="1.5" />
            <line x1="6" y1="1" x2="16" y2="4" stroke="#F59E0B" strokeWidth="1.5" />
            <line x1="6" y1="5" x2="16" y2="8" stroke="#F59E0B" strokeWidth="1.5" />
          </g>

        </g>
      </svg>
    </FlowWrapper>
  );
};
