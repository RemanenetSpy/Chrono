
import React, { useState, useEffect } from 'react';
import { Capsule } from '../types';

interface CapsuleCardProps {
  capsule: Capsule;
  onClick: () => void;
}

export const CapsuleCard: React.FC<CapsuleCardProps> = ({ capsule, onClick }) => {
  const [timeLeft, setTimeLeft] = useState<string>('');

  useEffect(() => {
    const updateTimer = () => {
      const now = Date.now();
      const diff = capsule.unlockAt - now;

      if (diff <= 0) {
        setTimeLeft('Available');
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      
      if (days > 0) setTimeLeft(`${days}d ${hours}h`);
      else setTimeLeft('Awaiting');
    };

    const interval = setInterval(updateTimer, 60000);
    updateTimer();
    return () => clearInterval(interval);
  }, [capsule.unlockAt]);

  const isUnlocked = Date.now() >= capsule.unlockAt;

  return (
    <div 
      onClick={onClick}
      className="group relative bg-white/60 backdrop-blur-sm border border-black/10 rounded-3xl sm:rounded-[40px] p-6 sm:p-10 hover:bg-white hover:shadow-2xl hover:shadow-black/10 transition-all duration-700 cursor-pointer shadow-lg shadow-black/5"
    >
      <div className="flex justify-between items-start mb-8 sm:mb-12">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#f2f2f0] flex items-center justify-center border border-black/5">
            <i className={`fa-solid ${isUnlocked ? 'fa-envelope-open' : 'fa-lock'} text-[#a68b36] text-base sm:text-lg`}></i>
          </div>
          <h3 className="serif text-2xl sm:text-3xl text-neutral-800 group-hover:text-black transition-colors leading-tight">
            {capsule.title}
          </h3>
        </div>
        <span className="text-[8px] sm:text-[10px] tracking-[0.2em] text-neutral-300 uppercase font-bold">
          {new Date(capsule.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
        </span>
      </div>
      
      <div className="flex items-center justify-between pt-6 sm:pt-8 border-t border-black/10">
        <div className="flex items-center gap-2 sm:gap-3">
          <i className="fa-regular fa-clock text-neutral-300 text-xs sm:text-sm"></i>
          <span className="serif text-base sm:text-lg italic text-neutral-400">
            {isUnlocked ? 'Available now' : `Unlocks ${new Date(capsule.unlockAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}`}
          </span>
        </div>
        <div className="flex items-center gap-4">
          {capsule.audioUrl && (
            <i className="fa-solid fa-microphone-lines text-neutral-300 text-xs sm:text-sm" title="Voice Echo Attached"></i>
          )}
          {capsule.imageUrl && (
            <i className="fa-regular fa-image text-neutral-300 text-xs sm:text-sm" title="Visual Attached"></i>
          )}
          <div className={`w-2 h-2 rounded-full ${isUnlocked ? 'bg-[#a68b36] shadow-[0_0_8px_rgba(166,139,54,0.4)]' : 'bg-neutral-200'}`}></div>
        </div>
      </div>
    </div>
  );
};
