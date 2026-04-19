import React from 'react';
import { KeyIcon } from './KeyIcon';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'compact' | 'splash';
}

export const Logo: React.FC<LogoProps> = ({ className = '', variant = 'full' }) => {
  const isCompact = variant === 'compact';
  const isSplash = variant === 'splash';
  
  return (
    <div className={`flex ${isCompact ? 'flex-row items-center gap-3' : 'flex-col items-center'} ${className}`}>
      <svg 
        viewBox="0 0 100 100" 
        xmlns="http://www.w3.org/2000/svg"
        className={`${isCompact ? "w-8 h-8" : (isSplash ? "w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 mb-6 sm:mb-10" : "w-24 h-24 mb-6")}`}
      >
        {/* Outer wavy seal effect (approximated with circles for clean vector look) */}
        {isSplash && (
          <circle cx="50" cy="50" r="49" fill="none" stroke="#1a1a1a" strokeWidth="0.5" opacity="0.5" />
        )}
        <circle cx="50" cy="50" r="46" fill="none" stroke="#1a1a1a" strokeWidth="1" />
        <circle cx="50" cy="50" r="42" fill="none" stroke="#1a1a1a" strokeWidth="0.5" strokeDasharray="1 2" />

        <g className="origin-[50px_50px] animate-[flip_10s_ease-in-out_infinite]">
          <path d="M35 30 L65 30 L50 50 Z" fill="none" stroke="#1a1a1a" strokeWidth="1.2" />
          <path d="M35 70 L65 70 L50 50 Z" fill="none" stroke="#1a1a1a" strokeWidth="1.2" />
          
          <rect x="49.5" y="50" width="1" height="20" fill="#1a1a1a">
            <animate attributeName="height" from="0" to="20" dur="2s" repeatCount="indefinite" />
          </rect>
        </g>
      </svg>
      
      <div className={`text-[#1a1a1a] ${isCompact ? 'flex items-center tracking-[0.3em]' : 'flex items-center justify-center gap-2 sm:gap-4 md:gap-6 w-full'}`}>
        <span className={`serif ${isCompact ? 'text-xl font-bold uppercase' : (isSplash ? 'text-2xl sm:text-4xl md:text-5xl tracking-wide' : 'text-2xl tracking-wide')} text-[#1a1a1a]`}>
          {isCompact ? 'CHRONOS' : 'Chronos'}
        </span>
        
        {!isCompact && (
          <>
            <div className="flex flex-col items-center justify-center text-[#1a1a1a] opacity-80">
              <KeyIcon className={`${isSplash ? "h-8 sm:h-10 w-auto animate-key-turn" : "h-7 w-auto"}`} />
            </div>
            <span className={`serif ${isSplash ? 'text-xl sm:text-3xl md:text-4xl tracking-wide' : 'text-xl tracking-wide'} text-[#1a1a1a] whitespace-nowrap`}>
              Letters to The Future
            </span>
          </>
        )}
      </div>
    </div>
  );
};
