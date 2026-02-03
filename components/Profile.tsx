
import React, { useState } from 'react';
import { UserProfile, Capsule } from '../types';
import { Button } from './Button';

interface ProfileProps {
  profile: UserProfile;
  capsules: Capsule[];
  onUpdate: (profile: UserProfile) => void;
  onClearData: () => void;
  onBack: () => void;
}

export const Profile: React.FC<ProfileProps> = ({ profile, capsules, onUpdate, onClearData, onBack }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(profile.name);
  const [bio, setBio] = useState(profile.bio);

  const lockedCount = capsules.filter(c => Date.now() < c.unlockAt).length;
  const unlockedCount = capsules.length - lockedCount;

  return (
    <div className="fade-up space-y-32 max-w-3xl mx-auto">
      <div className="flex justify-between items-baseline">
        <h2 className="serif text-6xl font-light">Memoir</h2>
        <button onClick={onBack} className="text-neutral-400 hover:text-black transition-colors text-[10px] tracking-[0.4em] uppercase font-bold">Return</button>
      </div>

      <div className="space-y-24">
        <section className="space-y-12">
          <div className="flex flex-col md:flex-row gap-16">
            <div className="w-px h-32 bg-gradient-to-b from-black/20 to-transparent hidden md:block"></div>
            <div className="flex-1 space-y-8">
              {isEditing ? (
                <div className="space-y-8">
                  <div className="space-y-2">
                    <label className="text-[9px] tracking-[0.3em] uppercase text-neutral-400 font-bold">Identity</label>
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-transparent border-b border-black/10 w-full py-4 text-4xl serif focus:outline-none focus:border-black transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] tracking-[0.3em] uppercase text-neutral-400 font-bold">Personal Lore</label>
                    <textarea 
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="bg-transparent border border-black/5 w-full p-6 text-lg serif italic text-neutral-600 focus:outline-none focus:border-black/10 h-32 resize-none"
                    />
                  </div>
                  <div className="flex gap-8">
                    <button onClick={() => { onUpdate({...profile, name, bio}); setIsEditing(false); }} className="text-[10px] tracking-widest uppercase font-black text-black">Save Memoir</button>
                    <button onClick={() => setIsEditing(false)} className="text-[10px] tracking-widest uppercase font-bold text-neutral-300">Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    <h3 className="serif text-5xl text-neutral-800">{profile.name}</h3>
                    <p className="serif italic text-neutral-400 text-2xl leading-relaxed font-light">"{profile.bio}"</p>
                  </div>
                  <button onClick={() => setIsEditing(true)} className="text-[9px] tracking-[0.4em] uppercase text-neutral-300 hover:text-black transition-colors font-bold">Rewrite identity</button>
                </>
              )}
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-3 gap-20 border-t border-black/[0.04] pt-20">
          <div className="space-y-3">
            <p className="text-[9px] tracking-[0.3em] uppercase text-neutral-400 font-bold">Sealed Entries</p>
            <p className="serif text-5xl font-light">{capsules.length}</p>
          </div>
          <div className="space-y-3">
            <p className="text-[9px] tracking-[0.3em] uppercase text-neutral-400 font-bold">Awaiting Revealing</p>
            <p className="serif text-5xl font-light text-amber-700/60">{lockedCount}</p>
          </div>
          <div className="space-y-3">
            <p className="text-[9px] tracking-[0.3em] uppercase text-neutral-400 font-bold">Shared History</p>
            <p className="serif text-5xl font-light text-neutral-300">{unlockedCount}</p>
          </div>
        </section>

        <section className="pt-32 flex flex-col items-center border-t border-black/[0.02]">
           <button 
              onClick={onClearData}
              className="text-[9px] tracking-[0.4em] uppercase text-neutral-200 hover:text-red-400 transition-colors font-bold"
            >
              Burn the archive
            </button>
        </section>
      </div>
    </div>
  );
};
