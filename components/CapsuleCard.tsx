
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
      className="group relative border-b border-r border-black/[0.04] p-8 hover:bg-white transition-all duration-700 cursor-pointer bg-transparent"
    >
      <div className="flex justify-between items-start mb-16">
        <span className="text-[9px] tracking-[0.3em] text-neutral-400 uppercase font-bold">
          Entry No. {capsule.id.slice(0, 4)}
        </span>
        <div className={`w-1.5 h-1.5 rounded-full ${isUnlocked ? 'bg-amber-600' : 'bg-neutral-200'}`}></div>
      </div>
      
      <div className="space-y-3">
        <h3 className="serif text-2xl text-neutral-800 group-hover:text-black transition-colors leading-snug">
          {capsule.title}
        </h3>
        <p className="text-[10px] text-neutral-400 flex items-center gap-2 tracking-[0.1em] font-medium uppercase">
          {new Date(capsule.createdAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
      </div>

      <div className="mt-10 flex items-center justify-between">
        <span className="text-[9px] text-neutral-400 tracking-[0.2em] uppercase italic font-bold">
          {isUnlocked ? 'Revealed' : 'Sealed'}
        </span>
        <span className="serif text-sm italic text-neutral-500">
          {timeLeft}
        </span>
      </div>
    </div>
  );
};
