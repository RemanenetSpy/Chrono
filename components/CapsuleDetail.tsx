
import React, { useState, useEffect } from 'react';
import { Capsule } from '../types';
import { Button } from './Button';

interface CapsuleDetailProps {
  capsule: Capsule;
  onClose: () => void;
  onUpdate: (updatedCapsule: Capsule) => void;
  onDelete?: (id: string) => void;
}

export const CapsuleDetail: React.FC<CapsuleDetailProps> = ({ capsule, onClose, onUpdate, onDelete }) => {
  const [isUnlocked, setIsUnlocked] = useState(Date.now() >= capsule.unlockAt);
  const [reflectionText, setReflectionText] = useState(capsule.reflection || '');
  const [isEditingReflection, setIsEditingReflection] = useState(!capsule.reflection);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      if (now >= capsule.unlockAt) setIsUnlocked(true);
    }, 1000);
    return () => clearInterval(timer);
  }, [capsule.unlockAt]);

  const handleSaveReflection = () => {
    if (!reflectionText.trim()) return;
    onUpdate({ ...capsule, hasReflection: true, reflection: reflectionText });
    setIsEditingReflection(false);
  };

  return (
    <div className="fade-up max-w-2xl mx-auto pb-40">
      <div className="flex justify-between items-center mb-24 border-b border-black/[0.04] pb-8">
        <button onClick={onClose} className="text-neutral-400 hover:text-black transition-colors text-[10px] tracking-[0.4em] uppercase font-bold">
          <i className="fa-solid fa-arrow-left-long mr-3"></i> The Vault
        </button>
        <div className="text-[9px] tracking-[0.4em] uppercase text-neutral-300 font-bold">
          No. {capsule.id.slice(0, 4)}
        </div>
      </div>

      {!isUnlocked ? (
        <div className="py-40 text-center space-y-12">
          <div className="w-24 h-24 border border-black/[0.03] rounded-full flex items-center justify-center mx-auto shadow-xl shadow-black/5">
            <i className="fa-solid fa-hourglass-start text-neutral-200 animate-pulse"></i>
          </div>
          <div className="space-y-4">
            <h3 className="serif text-4xl font-light">Still Sealed</h3>
            <p className="serif italic text-neutral-400 text-xl leading-relaxed">
              This message is drifting in the stream. It will arrive on:
              <span className="block text-neutral-900 mt-2 font-normal not-italic">{new Date(capsule.unlockAt).toLocaleString(undefined, { dateStyle: 'long', timeStyle: 'short' })}</span>
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-24 animate-in fade-in duration-1000">
          <div className="space-y-8">
            <h2 className="serif text-5xl leading-tight">{capsule.title}</h2>
            <div className="flex gap-8 text-[9px] tracking-[0.3em] uppercase text-neutral-400 font-bold">
              <span>Sealed: {new Date(capsule.createdAt).toLocaleDateString()}</span>
              <span>•</span>
              <span>Revealed: {new Date(capsule.unlockAt).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="space-y-16">
            <p className="serif text-2xl leading-relaxed italic text-neutral-800 whitespace-pre-wrap">
              "{capsule.content}"
            </p>

            {capsule.imageUrl && (
              <div className="paper-shadow border border-black/5 p-2 bg-white">
                <img src={capsule.imageUrl} className="w-full grayscale-[0.5] hover:grayscale-0 transition-all duration-1000" alt="Memory" />
              </div>
            )}
          </div>

          <div className="pt-24 border-t border-black/[0.04] space-y-12">
            <div className="flex items-center gap-6">
              <div className="w-px h-12 bg-amber-200"></div>
              <h4 className="serif text-3xl font-light italic">Reflections</h4>
            </div>

            {isEditingReflection ? (
              <div className="space-y-8">
                <textarea
                  value={reflectionText}
                  onChange={(e) => setReflectionText(e.target.value)}
                  placeholder="What does this memory mean to you now?"
                  className="w-full bg-transparent border-none py-2 text-xl serif italic leading-relaxed focus:outline-none min-h-[150px] resize-none placeholder:text-neutral-200"
                />
                <button onClick={handleSaveReflection} className="text-[10px] tracking-[0.3em] uppercase font-black text-black border-b border-black pb-1">
                  Commit Reflection
                </button>
              </div>
            ) : (
              <p className="serif text-xl italic text-neutral-500 leading-relaxed border-l-2 border-amber-50/50 pl-8">
                "{capsule.reflection}"
              </p>
            )}
          </div>

          <div className="pt-24 flex justify-between items-center opacity-20 hover:opacity-100 transition-all duration-1000">
            <button 
              onClick={() => { if(confirm('Erase this memory forever?')) onDelete?.(capsule.id); }}
              className="text-[9px] tracking-[0.3em] uppercase text-red-400 font-bold"
            >
              Burn this record
            </button>
            <span className="text-[8px] tracking-[0.4em] uppercase text-neutral-300 font-bold">Private Archive System</span>
          </div>
        </div>
      )}
    </div>
  );
};
