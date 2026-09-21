import React from 'react';

export const HokiBanner: React.FC = () => {
  return (
    <div className="w-full bg-[#120202] rounded-t-xl overflow-hidden border border-[#230a0a] shadow-xs relative">
      <div className="w-full h-36 bg-gradient-to-r from-[#1f0303] via-[#350707] to-[#1a0202] flex items-center justify-between px-5 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(239,68,68,0.25),transparent_70%)]" />

        {/* Brand Text */}
        <div className="relative z-10">
          <h2 className="text-[26px] font-black tracking-wider text-[#ff2e2e] drop-shadow-[0_2px_8px_rgba(255,46,46,0.5)] font-sans">
            HOKIUNITED
          </h2>
        </div>

        {/* Chinese God of Wealth (Cai Shen) Vector Character */}
        <div className="relative z-10 w-20 h-24 flex items-center justify-center shrink-0">
          <svg
            viewBox="0 0 100 120"
            className="w-full h-full drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]"
          >
            {/* Hat / Crown with extending wings */}
            <path
              d="M15 35 Q50 15 85 35 L80 45 Q50 30 20 45 Z"
              fill="#c51f1f"
            />
            {/* Hat wings */}
            <rect x="2" y="28" width="18" height="8" rx="3" fill="#991515" />
            <circle cx="2" cy="32" r="4" fill="#fbbf24" />
            <rect x="80" y="28" width="18" height="8" rx="3" fill="#991515" />
            <circle cx="98" cy="32" r="4" fill="#fbbf24" />

            {/* Hat center gold jewel */}
            <circle cx="50" cy="32" r="7" fill="#f59e0b" stroke="#78350f" strokeWidth="1" />
            <circle cx="50" cy="32" r="4" fill="#fde68a" />

            {/* Head / Face */}
            <circle cx="50" cy="55" r="22" fill="#fed7aa" />

            {/* Cheeks */}
            <circle cx="37" cy="58" r="4" fill="#fca5a5" opacity="0.6" />
            <circle cx="63" cy="58" r="4" fill="#fca5a5" opacity="0.6" />

            {/* Eyes (happy curved arcs) */}
            <path
              d="M36 50 Q41 46 44 50"
              stroke="#451a03"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M56 50 Q59 46 64 50"
              stroke="#451a03"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />

            {/* Smile */}
            <path
              d="M44 60 Q50 67 56 60"
              stroke="#991b1b"
              strokeWidth="2"
              strokeLinecap="round"
              fill="#ef4444"
            />

            {/* Traditional Beard */}
            <path
              d="M45 65 Q50 78 55 65"
              stroke="#1f2937"
              strokeWidth="2"
              fill="#1f2937"
            />

            {/* Red Robe Body */}
            <path
              d="M25 75 Q50 70 75 75 L85 115 Q50 120 15 115 Z"
              fill="#dc2626"
            />
            {/* Robe collar gold trim */}
            <path
              d="M42 75 L50 95 L58 75"
              stroke="#f59e0b"
              strokeWidth="3"
              fill="none"
            />

            {/* Gold Ingot (Yuanbao) held in hands */}
            <path
              d="M38 92 Q50 85 62 92 L66 102 Q50 108 34 102 Z"
              fill="#fbbf24"
              stroke="#d97706"
              strokeWidth="1.5"
            />
            <ellipse cx="50" cy="93" rx="10" ry="4" fill="#fef08a" />
          </svg>
        </div>
      </div>
    </div>
  );
};
