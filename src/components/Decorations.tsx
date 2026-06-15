import React from 'react';

// 1. AppPhoneFrame: Wraps application views with a playful childhood-themed container
export const AppPhoneFrame: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  return (
    <div className={`w-full max-w-[430px] sm:max-w-[768px] lg:max-w-[1150px] xl:max-w-[1240px] mx-auto min-h-screen sm:min-h-[96vh] sm:my-4 sm:rounded-[36px] bg-[#FDF6FF] shadow-2xl relative flex flex-col overflow-hidden border border-purple-100/40 ${className}`}>
      {children}
    </div>
  );
};

// 2. SoftSkyBackground: Renders a beautiful sky gradient with star twinkle overlays
export const SoftSkyBackground: React.FC<{ children?: React.ReactNode; variant?: 'sky' | 'sunset' | 'night' | 'garden' }> = ({ children, variant = 'sky' }) => {
  const gradientClass = {
    sky: 'from-[#BFDBFE] via-[#EFF6FF] to-[#FFF1F2]',
    sunset: 'from-[#FFEDD5] via-[#FFF1F2] to-[#FDF4FF]',
    night: 'from-[#1E1B4B] via-[#4C1D95] to-[#2E1065]',
    garden: 'from-[#ECFDF5] via-[#F0FDF4] to-[#FFFBEB]',
  }[variant];

  return (
    <div className={`absolute inset-0 bg-gradient-to-b ${gradientClass} transition-all duration-500 -z-50 overflow-hidden`}>
      {children}
    </div>
  );
};

// 3. StarSparklePattern: A beautiful pattern of glowing, twinkling yellow childhood stars
export const StarSparklePattern: React.FC<{ className?: string }> = ({ className = 'absolute inset-0 pointer-events-none' }) => {
  return (
    <svg className={`${className} animate-pulse-soft z-0`} viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Tweaked sparkle sizes and offsets */}
      <g fill="#FEF08A">
        <path d="M40,60 L43,68 L51,69 L44,75 L45,83 L39,78 L33,83 L34,75 L27,69 L35,68 Z" opacity="0.9" className="animate-star-twinkle" />
        <path d="M340,80 L342,86 L349,87 L343,92 L344,99 L339,95 L334,99 L335,92 L329,87 L336,86 Z" opacity="0.8" />
        <path d="M80,300 L82,306 L89,307 L83,312 L84,319 L79,315 L74,319 L75,312 L69,307 L76,306 Z" opacity="0.85" className="animate-star-twinkle" />
        <path d="M320,280 L322,286 L329,287 L323,292 L324,299 L319,295 L314,299 L315,292 L309,287 L316,286 Z" opacity="0.9" />
        {/* Tiny dots */}
        <circle cx="150" cy="50" r="3" opacity="0.6" />
        <circle cx="280" cy="180" r="2.5" opacity="0.75" />
        <circle cx="100" cy="150" r="3.5" opacity="0.7" />
        <circle cx="220" cy="330" r="2" opacity="0.8" />
      </g>
    </svg>
  );
};

// 4. CloudDecoration: Soft, puffy childhood cartoon clouds for background decoration
export const CloudDecoration: React.FC<{ className?: string; speed?: 'slow' | 'normal' }> = ({ className = '', speed = 'normal' }) => {
  const duration = speed === 'slow' ? 'animate-[float_8s_easeInOut_infinite]' : 'animate-float';
  return (
    <div className={`pointer-events-none select-none z-10 ${duration} ${className}`}>
      <svg width="90" height="48" viewBox="0 0 90 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 36c-2.2 0-4-1.8-4-4s1.8-4 4-4c.3 0 .6.1.9.2A11.9 11.9 0 0 1 30 14c4.8 0 8.9 2.8 10.8 7a11.97 11.97 0 0 1 17.2 0c1.9-4.2 6-7 10.8-7 6.6 0 12 5.4 12 12 0 .9-.1 1.7-.3 2.5C82.1 34.2 80.3 36 78 36H18z" fill="#ffffff" fillOpacity="0.92" filter="drop-shadow(0 4px 6px rgba(124,58,237,0.04))" />
      </svg>
    </div>
  );
};

// 5. GreenHillBackground: Friendly, rolling green hills behind character overlays
export const GreenHillBackground: React.FC<{ className?: string }> = ({ className = 'absolute bottom-0 left-0 right-0 h-28 pointer-events-none -z-10' }) => {
  return (
    <div className={className}>
      <svg className="w-full h-full" viewBox="0 0 360 120" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Back Hill */}
        <path d="M-20 120 C80 60, 200 100, 380 40 L380 120 Z" fill="#A7F3D0" opacity="0.75" />
        {/* Front Hill */}
        <path d="M-10 120 C100 80, 240 70, 370 90 L370 120 Z" fill="#34D399" opacity="0.9" />
      </svg>
    </div>
  );
};

// 6. IslamicMoonStarDecoration: Playful crescent moon and hanging star vector ornament
export const IslamicMoonStarDecoration: React.FC<{ className?: string }> = ({ className = 'absolute top-4 right-4 text-amber-400' }) => {
  return (
    <div className={`pointer-events-none filter drop-shadow-[0_2px_5px_rgba(251,191,36,0.3)] ${className}`}>
      <svg width="48" height="64" viewBox="0 0 48 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Thread */}
        <line x1="24" y1="0" x2="24" y2="28" stroke="#FBBF24" strokeWidth="1.5" strokeDasharray="3 2" />
        {/* Star */}
        <path d="M24 28 L26 33 L31 34 L27 38 L28 43 L24 40 L20 43 L21 38 L17 34 L22 33 Z" fill="#FBBF24" />
        {/* Crescent Moon */}
        <path d="M12 12 A 10 10 0 1 0 26 24 A 12 12 0 1 1 12 12 Z" fill="#FBBF24" transform="translate(6, 4)" />
      </svg>
    </div>
  );
};

// 7. ConfettiPattern: Colorful confetti shapes that float or twinkle for success scenes
export const ConfettiPattern: React.FC<{ className?: string }> = ({ className = 'absolute inset-0 pointer-events-none' }) => {
  const dots = [
    { x: '15%', y: '15%', color: '#EC4899', rot: 15 },
    { x: '25%', y: '40%', color: '#10B981', rot: -20 },
    { x: '80%', y: '20%', color: '#3B82F6', rot: 45 },
    { x: '10%', y: '70%', color: '#F59E0B', rot: -10 },
    { x: '88%', y: '65%', color: '#8B5CF6', rot: 30 },
    { x: '35%', y: '85%', color: '#EF4444', rot: 12 },
    { x: '75%', y: '80%', color: '#14B8A6', rot: -35 },
  ];
  return (
    <div className={className}>
      {dots.map((d, i) => (
        <span
          key={i}
          className="absolute text-2xl animate-float"
          style={{
            left: d.x,
            top: d.y,
            transform: `rotate(${d.rot}deg)`,
            animationDelay: `${i * 0.4}s`,
            color: d.color,
          }}
        >
          ✨
        </span>
      ))}
    </div>
  );
};

// 8. ChildrenHeroIllustration: The high-fidelity, polished, cute illustration for the home page banner
export const ChildrenHeroIllustration: React.FC<{ className?: string }> = ({ className = 'w-full h-44' }) => {
  return (
    <div className={`relative flex items-center justify-center pt-2 select-none ${className}`}>
      {/* Background Frame built with clouds, hills, and stars */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-[#EFF6FF] to-[#D1FAE5] rounded-[32px] overflow-hidden border-2 border-white shadow-md -z-20">
        <GreenHillBackground />
        <StarSparklePattern />
        <CloudDecoration className="absolute top-2 left-3" speed="slow" />
        <CloudDecoration className="absolute top-6 right-4" speed="normal" />
      </div>

      {/* Characters Layer */}
      <svg viewBox="0 0 320 180" className="w-full h-full max-h-[160px] drop-shadow-md" xmlns="http://www.w3.org/2000/svg">
        {/* Left Boy - Waving cheekily, wearing green Baju Melayu, Songkok Putih */}
        <g transform="translate(75, 45)">
          {/* Shadow */}
          <ellipse cx="20" cy="115" rx="30" ry="8" fill="#10B981" opacity="0.15" />

          {/* Hands waving */}
          <path d="M-10 82 Q-22 55 -30 35" stroke="#F9ABC4" strokeWidth="4" strokeLinecap="round" />
          <circle cx="-30" cy="35" r="7" fill="#FDBA74" /> {/* wave hand left */}

          <path d="M50 82 Q65 65 72 45" stroke="#F9ABC4" strokeWidth="4" strokeLinecap="round" />
          <circle cx="72" cy="45" r="7" fill="#FDBA74" /> {/* wave hand right */}

          {/* Legs & Shoes */}
          <rect x="2" y="105" width="12" height="12" rx="4" fill="#047857" />
          <rect x="26" y="105" width="12" height="12" rx="4" fill="#047857" />

          {/* Body Baju Melayu */}
          <path d="M-14 110 C-14 85 54 85 54 110 Z" fill="#059669" />
          {/* Golden Button Details */}
          <line x1="20" y1="85" x2="20" y2="105" stroke="#10B981" strokeWidth="3.5" />
          <circle cx="20" cy="91" r="3" fill="#FBBF24" />
          <circle cx="20" cy="99" r="3" fill="#FBBF24" />

          {/* Neck */}
          <rect x="14" y="70" width="12" height="12" fill="#FDBA74" />

          {/* Large Round Face */}
          <circle cx="20" cy="46" r="28" fill="#FDBA74" />

          {/* Big Cartoon Eyes */}
          <circle cx="10" cy="42" r="4.5" fill="#1F2937" />
          <circle cx="9" cy="40" r="1.5" fill="white" /> {/* highlight */}
          <circle cx="30" cy="42" r="4.5" fill="#1F2937" />
          <circle cx="29" cy="40" r="1.5" fill="white" /> {/* highlight */}

          {/* Cheerful wide-open smiling mouth */}
          <path d="M12 55 Q20 64 28 55 Z" fill="#991B1B" />
          <path d="M14 56 Q20 62 26 56" stroke="#1F2937" strokeWidth="1" fill="none" />

          {/* Rosy blush cheeks */}
          <circle cx="5" cy="51" r="4" fill="#F43F5E" opacity="0.5" />
          <circle cx="35" cy="51" r="4" fill="#F43F5E" opacity="0.5" />

          {/* Proper Muslim White Kopiah */}
          <path d="M-4 22 C-4 5, 44 5, 44 22 Z" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="2" />
        </g>

        {/* Right Girl - Wearing elegant pink outfit and white flowy tudung */}
        <g transform="translate(195, 45)">
          {/* Shadow */}
          <ellipse cx="20" cy="115" rx="32" ry="8" fill="#DB2777" opacity="0.1" />

          {/* Feet */}
          <rect x="4" y="105" width="10" height="12" rx="4" fill="#DB2777" />
          <rect x="26" y="105" width="10" height="12" rx="4" fill="#DB2777" />

          {/* White flowy headscarf/Tudung covering body sides */}
          <path d="M-22 68 C-25 105 10 120 20 120 C30 120 65 105 62 68 C59 20 -19 20 -22 68 Z" fill="#FFFFFF" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.06))" />

          {/* Inner pink outfit */}
          <path d="M-6 80 L46 80 L40 110 L0 110 Z" fill="#FB7185" />

          {/* Hands waving */}
          <path d="M-12 85 Q-18 68 -24 55" stroke="#FDBA74" strokeWidth="4.5" strokeLinecap="round" />
          <circle cx="-24" cy="55" r="7" fill="#FDBA74" />
          
          <path d="M52 85 Q62 68 68 55" stroke="#FDBA74" strokeWidth="4.5" strokeLinecap="round" />
          <circle cx="68" cy="55" r="7" fill="#FDBA74" />

          {/* Cute face cutout in hijab */}
          <circle cx="20" cy="46" r="23" fill="#FDBA74" />

          {/* Big twinkling eyes with long cheerful eyelashes */}
          <circle cx="11" cy="43" r="4.5" fill="#1F2937" />
          <circle cx="10" cy="41" r="1.5" fill="white" />
          <path d="M6 38 Q10 34 13 38" fill="none" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" /> {/* Eyelash */}

          <circle cx="29" cy="43" r="4.5" fill="#1F2937" />
          <circle cx="28" cy="41" r="1.5" fill="white" />
          <path d="M26 38 Q30 34 34 38" fill="none" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" /> {/* Eyelash */}

          {/* Smiling rosy expression */}
          <path d="M14 54 Q20 60 26 54 Z" fill="#BE123C" />
          <circle cx="6" cy="50" r="4" fill="#FDA4AF" />
          <circle cx="34" cy="50" r="4" fill="#FDA4AF" />

          {/* Friendly gold flower brooch on Tudung */}
          <circle cx="20" cy="74" r="4" fill="#FBBF24" />
          <circle cx="16" cy="74" r="2" fill="#F1F5F9" />
          <circle cx="24" cy="74" r="2" fill="#F1F5F9" />
          <circle cx="20" cy="70" r="2" fill="#F1F5F9" />
          <circle cx="20" cy="78" r="2" fill="#F1F5F9" />
        </g>
      </svg>
    </div>
  );
};

// 9. PrayingChildIllustration: Detailed illustration for reading & praying screens
export const PrayingChildIllustration: React.FC<{ className?: string }> = ({ className = 'h-40' }) => {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <svg viewBox="0 0 200 200" className="w-48 h-48 drop-shadow-md overflow-visible" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="purpleCloudGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#DDD6FE" />
            <stop offset="100%" stopColor="#F5F3FF" />
          </linearGradient>
        </defs>

        {/* Soft Purple Cloud Background frame */}
        <path 
          d="M 100 15 
             C 140 15, 160 30, 165 50 
             C 185 55, 185 85, 175 100 
             C 185 115, 180 145, 160 155 
             C 150 175, 110 185, 100 175 
             C 90 185, 50 175, 40 155 
             C 20 145, 15 115, 25 100 
             C 15 85, 15 55, 35 50 
             C 40 30, 60 15, 100 15 Z" 
          fill="url(#purpleCloudGrad)" 
          stroke="#C4B5FD" 
          strokeWidth="2.5" 
        />

        {/* Scattered glowing yellow stars inside background */}
        <g fill="#FBBF24" className="animate-pulse-soft">
          <path d="M 45 40 L 47 43 L 51 44 L 47 45 L 45 48 L 43 45 L 39 44 L 43 43 Z" />
          <path d="M 155 35 L 157 38 L 161 39 L 157 40 L 155 43 L 153 40 L 149 39 L 153 38 Z" />
          <path d="M 30 90 L 32 93 L 36 94 L 32 95 L 30 98 L 28 95 L 24 94 L 28 93 Z" />
          <path d="M 170 100 L 172 103 L 176 104 L 172 105 L 170 108 L 168 105 L 164 104 L 168 103 Z" />
          <path d="M 50 145 L 52 148 L 56 149 L 52 150 L 50 153 L 48 150 L 44 149 L 48 148 Z" />
          <path d="M 150 150 L 152 153 L 156 154 L 152 155 L 150 158 L 148 155 L 144 154 L 148 153 Z" />
        </g>

        {/* Peaceful Praying child centered */}
        <g transform="translate(100, 100)">
          {/* Hands raised in dua position */}
          <g transform="translate(15, 25) rotate(-12)">
            <rect x="-7" y="-12" width="14" height="24" rx="5" fill="#FDBA74" stroke="#1F2937" strokeWidth="2.5" />
            <line x1="-2" y1="-8" x2="-2" y2="4" stroke="#1F2937" strokeWidth="1.5" />
            <line x1="2" y1="-9" x2="2" y2="5" stroke="#1F2937" strokeWidth="1.5" />
          </g>
          <g transform="translate(-15, 25) rotate(12)">
            <rect x="-7" y="-12" width="14" height="24" rx="5" fill="#FDBA74" stroke="#1F2937" strokeWidth="2.5" />
            <line x1="2" y1="-8" x2="2" y2="4" stroke="#1F2937" strokeWidth="1.5" />
            <line x1="-2" y1="-9" x2="-2" y2="5" stroke="#1F2937" strokeWidth="1.5" />
          </g>

          {/* Body Baju Melayu (green) */}
          <path d="M-22 30 C-22 30, -25 80, -20 85 L20 85 C25 80, 22 30, 22 30 Z" fill="#10B981" stroke="#047857" strokeWidth="2.5" />
          <line x1="0" y1="30" x2="0" y2="55" stroke="#059669" strokeWidth="3" />

          {/* Neck */}
          <rect x="-5" y="16" width="10" height="15" fill="#FDBA74" />

          {/* Face */}
          <circle cx="0" cy="2" r="25" fill="#FDBA74" stroke="#1F2937" strokeWidth="2.5" />

          {/* Closed peaceful eyes */}
          <path d="M-12 2 C-9 5, -6 5, -3 2" fill="none" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" />
          <path d="M3 2 C6 5, 9 5, 12 2" fill="none" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" />

          {/* Cozy smile */}
          <path d="M-4 11 Q0 14 4 11" fill="none" stroke="#1F2937" strokeWidth="2.5" strokeLinecap="round" />

          {/* Rosy cheeks */}
          <circle cx="-15" cy="8" r="3" fill="#F472B6" opacity="0.65" />
          <circle cx="15" cy="8" r="3" fill="#F472B6" opacity="0.65" />

          {/* White Kopiah */}
          <path d="M-15 -18 C-15 -33, 15 -33, 15 -18 Z" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="2.5" />
          <line x1="-15" y1="-18" x2="15" y2="-18" stroke="#E5E7EB" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
};

// 10. EmotionChildIllustration: Specific child character emotional expressions matching the selected state
export const EmotionChildIllustration: React.FC<{ emotion: string; className?: string }> = ({ emotion, className = 'h-40' }) => {
  const getIllustration = () => {
    switch (emotion) {
      case 'gembira':
        return (
          <g transform="translate(100, 100)">
            {/* Soft yellow/cream circular background shape behind the child */}
            <circle cx="0" cy="4" r="70" fill="#FFFDF0" stroke="#FEF08A" strokeWidth="3" />
            
            {/* Aesthetic rolling green plant leaves and clouds at the bottom frame */}
            <g opacity="0.85">
              {/* Cute leaves at the bottom-left */}
              <path d="M -50 45 C -45 35, -35 45, -35 45 C -35 45, -25 35, -20 45" fill="none" stroke="#10B981" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M -45 52 C -40 42, -30 52, -30 52" fill="none" stroke="#10B981" strokeWidth="3.5" strokeLinecap="round" />
              {/* Cute leaves at the bottom-right */}
              <path d="M 50 45 C 45 35, 35 45, 35 45 C 35 45, 25 35, 20 45" fill="none" stroke="#10B981" strokeWidth="3.5" strokeLinecap="round" />
            </g>

            {/* Clouds at the bottom inside the frame */}
            <path d="M-60 55 C-50 45, -35 45, -25 52 C-15 42, 15 42, 25 52 C35 45, 50 45, 60 55 L65 72 L-65 72 Z" fill="#FFFFFF" opacity="0.95" />

            {/* Small yellow stars and sparkles around him */}
            <g fill="#FBBF24" className="animate-pulse-soft">
              {/* Large Star upper left */}
              <polygon points="-45,-45 -41,-38 -34,-37 -39,-32 -37,-25 -45,-29 -53,-25 -51,-32 -56,-37 -49,-38" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" />
              {/* Medium Star upper right */}
              <polygon points="40,-35 43,-29 49,-28 44,-24 46,-18 40,-21 34,-18 36,-24 31,-28 37,-29" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" />
              {/* Star lower left */}
              <polygon points="-52,15 -50,19 -46,20 -49,22 -48,26 -52,24 -56,26 -55,22 -58,20 -54,19" fill="#FBBF24" stroke="#D97706" strokeWidth="1" />
              {/* Playful sparkles */}
              <circle cx="52" cy="18" r="3.2" />
              <circle cx="-25" cy="-48" r="2" />
            </g>

            {/* Soft pink heart in the upper right quadrant */}
            <path d="M 50 -44 C 47 -48, 43 -44, 43 -40 C 43 -34, 50 -30, 50 -30 C 50 -30, 57 -34, 57 -40 C 57 -44, 53 -48, 50 -44 Z" fill="#FB7185" stroke="#E11D48" strokeWidth="1" className="animate-bounce-soft" />

            {/* Waving/Raised Arms (Left & Right) */}
            <g transform="translate(-18, 40) rotate(-40)">
              <rect x="-6" y="-30" width="12" height="30" rx="4.5" fill="#10B981" stroke="#1F2937" strokeWidth="2.5" />
              <circle cx="0" cy="-33" r="7.5" fill="#FDBA74" stroke="#1F2937" strokeWidth="2.5" />
              {/* Delicate waving fingers */}
              <path d="M -3 -40 L -3 -36 M 0 -41 L 0 -36 M 3 -40 L 3 -36 M -6 -38 L -4 -35 M 6 -38 L 4 -35" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
            </g>
            <g transform="translate(18, 40) rotate(40)">
              <rect x="-6" y="-30" width="12" height="30" rx="4.5" fill="#10B981" stroke="#1F2937" strokeWidth="2.5" />
              <circle cx="0" cy="-33" r="7.5" fill="#FDBA74" stroke="#1F2937" strokeWidth="2.5" />
              {/* Delicate waving fingers */}
              <path d="M -3 -40 L -3 -36 M 0 -41 L 0 -36 M 3 -40 L 3 -36 M -6 -38 L -4 -35 M 6 -38 L 4 -35" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
            </g>

            {/* Green Outfit Baju Melayu Body */}
            <path d="M-22 34 C-22 34, -25 78, -20 85 L20 85 C25 78, 22 34, 22 34 Z" fill="#10B981" stroke="#1F2937" strokeWidth="2.5" />
            <line x1="0" y1="34" x2="0" y2="58" stroke="#1F2937" strokeWidth="2.5" />
            {/* Pocket */}
            <path d="M -13 41 L -6 41 L -6 48 L -13 48 Z" fill="#10B981" stroke="#1F2937" strokeWidth="2" />
            {/* Shiny gold buttons */}
            <circle cx="0" cy="40" r="2" fill="#FBBF24" stroke="#1F2937" strokeWidth="1" />
            <circle cx="0" cy="48" r="2" fill="#FBBF24" stroke="#1F2937" strokeWidth="1" />

            {/* Neck */}
            <rect x="-5" y="22" width="10" height="15" fill="#FDBA74" stroke="#1F2937" strokeWidth="2.5" />

            {/* Ears */}
            <circle cx="-26" cy="8" r="6" fill="#FDBA74" stroke="#1F2937" strokeWidth="2.5" />
            <circle cx="26" cy="8" r="6" fill="#FDBA74" stroke="#1F2937" strokeWidth="2.5" />

            {/* Big round happy face */}
            <circle cx="0" cy="8" r="26" fill="#FDBA74" stroke="#1F2937" strokeWidth="2.5" />

            {/* Gorgeous hair showing under kopiah */}
            <path d="M-15 -10 C-12 -3, -8 -5, -4 -9 C0 -5, 8 -3, 15 -10 L15 -12 L-15 -12 Z" fill="#78350F" stroke="#1F2937" strokeWidth="1.5" />

            {/* Arched cute happy eyebrows */}
            <path d="M-15 0 C-11 -4, -6 -3, -4 0" fill="none" stroke="#1F2937" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M4 0 C6 -3, 11 -4, 15 0" fill="none" stroke="#1F2937" strokeWidth="2.5" strokeLinecap="round" />

            {/* Big cute eyes with shine */}
            <ellipse cx="-8.5" cy="8" rx="5" ry="6.5" fill="#1F2937" />
            <ellipse cx="8.5" cy="8" rx="5" ry="6.5" fill="#1F2937" />
            {/* Sparkle highlights */}
            <circle cx="-10" cy="5.5" r="1.8" fill="#FFFFFF" />
            <circle cx="-7" cy="10" r="0.8" fill="#FFFFFF" />
            <circle cx="7" cy="5.5" r="1.8" fill="#FFFFFF" />
            <circle cx="10" cy="10" r="0.8" fill="#FFFFFF" />

            {/* Wide happy smile (Open mouth showing clean white teeth and pink tongue) */}
            <path d="M-9 15 C-9 15, -10 26, 0 27 C10 26, 9 15, 9 15 Z" fill="#991B1B" stroke="#1F2937" strokeWidth="2.5" />
            {/* Tongue */}
            <path d="M-5 22 C-2 18, 2 18, 5 22 Q0 27 -5 22" fill="#F43F5E" />
            {/* Teeth */}
            <path d="M-7 16 C-4 18, 4 18, 7 16 Q0 15 -7 16" fill="#FFFFFF" />

            {/* Rosy cheeks */}
            <ellipse cx="-16" cy="14" rx="4.5" ry="3" fill="#FB7185" opacity="0.75" />
            <ellipse cx="16" cy="14" rx="4.5" ry="3" fill="#FB7185" opacity="0.75" />

            {/* White Copiah */}
            <path d="M-16 -12 C-16 -28, 16 -28, 16 -12 Z" fill="#FFFFFF" stroke="#1F2937" strokeWidth="2.5" />
            <line x1="-16" y1="-12" x2="16" y2="-12" stroke="#E5E7EB" strokeWidth="2" />
          </g>
        );
      case 'marah':
        return (
          <g transform="translate(100, 100)">
            {/* Soft peach/pink background shape */}
            <circle cx="0" cy="4" r="70" fill="#FFEAE6" stroke="#FECDD3" strokeWidth="3" />
            
            {/* Small steam puffs rising near head */}
            <g fill="#F1F5F9" opacity="0.9" className="animate-pulse">
              <circle cx="-42" cy="-35" r="9" />
              <circle cx="-34" cy="-40" r="7" />
              <circle cx="-48" cy="-30" r="6" />
              <circle cx="42" cy="-35" r="9" />
              <circle cx="34" cy="-40" r="7" />
              <circle cx="48" cy="-30" r="6" />
            </g>

            {/* Angry sparks */}
            <path d="M -52 -18 L -44 -10 M -44 -18 L -52 -10" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
            <path d="M 44 -18 L 52 -10 M 52 -18 L 44 -10" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />

            {/* Clenched hands (fists) */}
            <g transform="translate(-25, 42)">
              <circle cx="0" cy="0" r="7" fill="#FDBA74" stroke="#1F2937" strokeWidth="2.5" />
              <line x1="-3" y1="-3" x2="-3" y2="3" stroke="#1F2937" strokeWidth="1" />
              <line x1="1" y1="-3" x2="1" y2="3" stroke="#1F2937" strokeWidth="1" />
            </g>
            <g transform="translate(25, 42)">
              <circle cx="0" cy="0" r="7" fill="#FDBA74" stroke="#1F2937" strokeWidth="2.5" />
              <line x1="-1" y1="-3" x2="-1" y2="3" stroke="#1F2937" strokeWidth="1" />
              <line x1="3" y1="-3" x2="3" y2="3" stroke="#1F2937" strokeWidth="1" />
            </g>

            {/* Green Outfit */}
            <path d="M-18 36 L18 36 L14 74 L-14 74 Z" fill="#10B981" stroke="#047857" strokeWidth="2.5" />
            <line x1="0" y1="36" x2="0" y2="52" stroke="#059669" strokeWidth="3" />

            {/* Neck */}
            <rect x="-5" y="20" width="10" height="10" fill="#FDBA74" />

            {/* Face */}
            <circle cx="0" cy="6" r="25" fill="#FDBA74" stroke="#1F2937" strokeWidth="2.5" />

            {/* Angry eyebrows angled down to center */}
            <line x1="-14" y1="-3" x2="-3" y2="3" stroke="#1F2937" strokeWidth="4.5" strokeLinecap="round" />
            <line x1="14" y1="-3" x2="3" y2="3" stroke="#1F2937" strokeWidth="4.5" strokeLinecap="round" />

            {/* Furious wide eyes */}
            <circle cx="-8" cy="8" r="4.5" fill="#1F2937" />
            <circle cx="8" cy="8" r="4.5" fill="#1F2937" />
            <circle cx="-9" cy="6" r="1.5" fill="white" />
            <circle cx="7" cy="6" r="1.5" fill="white" />

            {/* Wide Open Mouth (Angry shouting) */}
            <path d="M-7 18 Q0 10 7 18 C7 25, -7 25, -7 18 Z" fill="#991B1B" stroke="#1F2937" strokeWidth="2" />
            <path d="M-4 15 Q0 17 4 15" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" />

            {/* Flush cheeks */}
            <circle cx="-16" cy="14" r="3" fill="#EF4444" opacity="0.6" />
            <circle cx="16" cy="14" r="3" fill="#EF4444" opacity="0.6" />

            {/* White Kopiah */}
            <path d="M-15 -14 C-15 -28, 15 -28, 15 -14 Z" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="2.5" />
            <line x1="-15" y1="-14" x2="15" y2="-14" stroke="#E5E7EB" strokeWidth="2" />
          </g>
        );
      case 'sedih':
        return (
          <g transform="translate(100, 100)">
            {/* Sad Blue Circle */}
            <circle cx="0" cy="0" r="68" fill="#DBEAFE" opacity="0.8" />
            {/* Left teardrop */}
            <path d="M-10 18 Q-12 36 -14 42" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" fill="none" />
            <circle cx="-14" cy="42" r="3" fill="#60A5FA" />
            
            {/* Blue outfit */}
            <path d="M-24 40 L24 40 L18 85 L-18 85 Z" fill="#2563EB" />
            {/* Face */}
            <circle cx="0" cy="6" r="28" fill="#FDBA74" />
            {/* Sad eyebrows tilted up center */}
            <path d="M-16 -5 Q-10 -10 -4 -3" fill="none" stroke="#1F2937" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M16 -5 Q10 -10 4 -3" fill="none" stroke="#1F2937" strokeWidth="3.5" strokeLinecap="round" />
            {/* Down looking eyes */}
            <ellipse cx="-9" cy="8" rx="4" ry="2.5" fill="#1F2937" />
            <ellipse cx="9" cy="8" rx="4" ry="2.5" fill="#1F2937" />
            {/* Tiny tears */}
            <circle cx="-10" cy="14" r="2" fill="#3B82F6" />
            {/* Sad downturned mouth */}
            <path d="M-8 23 Q0 16 8 23" fill="none" stroke="#1F2937" strokeWidth="3.5" strokeLinecap="round" />
            {/* Pale blush */}
            <circle cx="-18" cy="16" r="3.5" fill="#FDA4AF" />
            <circle cx="18" cy="16" r="3.5" fill="#FDA4AF" />
            {/* White kopiah */}
            <path d="M-15 -21 C-15 -35, 15 -35, 15 -21 Z" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="2" />
          </g>
        );
      case 'takut':
      case 'risau':
        return (
          <g transform="translate(100, 100)">
            {/* Scared purple glow */}
            <circle cx="0" cy="0" r="68" fill="#EDE9FE" opacity="0.8" />
            
            {/* Hands up to face shivering */}
            <circle cx="-10" cy="30" r="6" fill="#FDBA74" stroke="#1F2937" strokeWidth="1.5" />
            <circle cx="10" cy="30" r="6" fill="#FDBA74" stroke="#1F2937" strokeWidth="1.5" />
            
            {/* Outfit */}
            <path d="M-24 40 L24 40 L18 85 L-18 85 Z" fill="#6B21A8" />
            {/* Face */}
            <circle cx="0" cy="6" r="28" fill="#FDBA74" />
            {/* Wide eyes */}
            <circle cx="-9" cy="6" r="6" fill="white" stroke="#1F2937" strokeWidth="2" />
            <circle cx="9" cy="6" r="6" fill="white" stroke="#1F2937" strokeWidth="2" />
            <circle cx="-7" cy="6" r="2" fill="#1F2937" />
            <circle cx="7" cy="6" r="2" fill="#1F2937" />
            {/* Shivering wiggly mouth */}
            <path d="M-8 19 Q-4 22 0 19 Q4 16 8 19" fill="none" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" />
            {/* White kopiah */}
            <path d="M-15 -21 C-15 -35, 15 -35, 15 -21 Z" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="2" />
          </g>
        );
      default: // tenang & gembira
        return (
          <g transform="translate(100, 100)">
            {/* Bright happy gold aura */}
            <circle cx="0" cy="0" r="68" fill="#FEF9C3" opacity="0.85" />
            
            {/* Waving hand */}
            <path d="M42 40 Q55 25 65 15" stroke="#FDBA74" strokeWidth="4" strokeLinecap="round" />
            <circle cx="65" cy="15" r="6" fill="#FDBA74" />

            {/* Teal happy outfit */}
            <path d="M-24 40 L24 40 L18 85 L-18 85 Z" fill="#0D9488" />
            {/* Face */}
            <circle cx="0" cy="6" r="28" fill="#FDBA74" />
            {/* Smiling happy closed eyes */}
            <path d="M-12 5 C-10 1 -7 1 -5 5" fill="none" stroke="#1F2937" strokeWidth="3.2" strokeLinecap="round" />
            <path d="M5 5 C7 1 10 1 12 5" fill="none" stroke="#1F2937" strokeWidth="3.2" strokeLinecap="round" />
            {/* Cheerful grin */}
            <path d="M-6 13 Q0 21 6 13 Z" fill="#BE123C" />
            {/* Rosy cheeks */}
            <circle cx="-16" cy="12" r="4.5" fill="#F472B6" opacity="0.6" />
            <circle cx="16" cy="12" r="4.5" fill="#F472B6" opacity="0.6" />
            {/* White kopiah */}
            <path d="M-15 -21 C-15 -35, 15 -35, 15 -21 Z" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="2" />
          </g>
        );
    }
  };

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <svg viewBox="0 0 200 200" className="w-44 h-44 drop-shadow-md" xmlns="http://www.w3.org/2000/svg">
        {getIllustration()}
      </svg>
    </div>
  );
};

// 11. SuccessStarMosqueIllustration: The large, beautiful yellow star containing mosque silhouette for congrats screen
export const SuccessStarMosqueIllustration: React.FC<{ className?: string }> = ({ className = 'h-56' }) => {
  return (
    <div className={`flex justify-center items-center select-none ${className}`}>
      <svg viewBox="0 0 320 300" className="w-72 h-72 drop-shadow-md z-10 overflow-visible" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="starGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#FEF08A" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="tealRibbonGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#14B8A6" />
            <stop offset="100%" stopColor="#0F766E" />
          </linearGradient>
        </defs>

        {/* Ambient Ring Glow */}
        <circle cx="160" cy="130" r="115" fill="url(#starGlow)" className="animate-pulse-soft" />

        {/* Confetti Particles */}
        <g className="animate-pulse-soft">
          <rect x="40" y="50" width="8" height="8" fill="#F472B6" transform="rotate(15, 44, 54)" />
          <circle cx="270" cy="60" r="5" fill="#3B82F6" />
          <rect x="250" y="210" width="10" height="5" fill="#A78BFA" transform="rotate(-30, 255, 212)" />
          <polygon points="50,190 54,196 60,194 56,200 58,206 52,202 46,206 48,200 44,194 50,196" fill="#F59E0B" />
          <circle cx="70" cy="110" r="4" fill="#34D399" />
          <rect x="280" y="130" width="6" height="12" fill="#F43F5E" transform="rotate(45, 283, 136)" />
          <polygon points="120,40 123,45 128,43 125,48 127,53 122,50 117,53 119,48 116,43 121,45" fill="#FB7185" />
          <circle cx="210" cy="35" r="4.5" fill="#06B6D4" />
        </g>

        {/* The Huge childhood Gold Star */}
        <polygon 
          points="160,20 192,95 275,100 210,155 233,235 160,192 87,235 110,155 45,100 128,95" 
          fill="#FBBF24" 
          stroke="#D97706" 
          strokeWidth="5" 
          strokeLinejoin="round" 
        />

        {/* White Mosque Silhouette inside the Gold Star */}
        <g transform="translate(160, 136)">
          <path d="M-22 15 C-22 -15, 22 -15, 22 15 Z" fill="#FFFFFF" />
          <path d="M-3 -24 A 5 5 0 1 0 5 -16 A 6 6 0 1 1 -3 -24 Z" fill="#D97706" />
          <rect x="-30" y="15" width="60" height="25" fill="#FFFFFF" rx="2" />
          <path d="M-8 40 C-8 24, 8 24, 8 40 Z" fill="#FBBF24" />
          <line x1="-20" y1="15" x2="-20" y2="30" stroke="#E5E7EB" strokeWidth="1.5" />
          <circle cx="-20" cy="30" r="2.5" fill="#FBBF24" />
          <line x1="20" y1="15" x2="20" y2="30" stroke="#E5E7EB" strokeWidth="1.5" />
          <circle cx="20" cy="30" r="2.5" fill="#FBBF24" />
          <rect x="-42" y="-5" width="8" height="45" fill="#FFFFFF" rx="1.5" />
          <polygon points="-44,-5 -38,-15 -32,-5" fill="#FBBF24" />
          <rect x="34" y="-5" width="8" height="45" fill="#FFFFFF" rx="1.5" />
          <polygon points="32,-5 38,-15 44,-5" fill="#FBBF24" />
        </g>

        {/* Beautiful Teal Ribbon/Banner at bottom carrying "Tahniah!" */}
        <g transform="translate(160, 235)">
          <path d="M -90 10 L -100 -5 L -100 25 Z" fill="#0D5C56" />
          <path d="M 90 10 L 100 -5 L 100 25 Z" fill="#0D5C56" />
          <path 
            d="M -85 -10 
               L 85 -10 
               C 100 -10, 95 20, 85 20 
               L -85 20 
               C -95 20, -100 -10, -85 -10 Z" 
            fill="url(#tealRibbonGrad)" 
            stroke="#0D9488" 
            strokeWidth="2.5" 
          />
          <path d="M -72 5 L -70 8 L -66 8 L -69 11 L -68 15 L -72 13 L -76 15 L -75 11 L -78 8 L -74 8 Z" fill="#FBBF24" />
          <path d="M 72 5 L 74 8 L 78 8 L 75 11 L 76 15 L 72 13 L 68 15 L 69 11 L 66 8 L 70 8 Z" fill="#FBBF24" />
          <text 
            x="0" 
            y="9" 
            fill="white" 
            fontWeight="900" 
            fontSize="15" 
            fontFamily="sans-serif" 
            textAnchor="middle" 
            letterSpacing="2"
            className="select-none animate-pulse"
          >
            TAHNIAH!
          </text>
        </g>
      </svg>
    </div>
  );
};
