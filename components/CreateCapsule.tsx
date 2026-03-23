
import React, { useState, useRef } from 'react';
import { Capsule, UserProfile } from '../types';
import { Button } from './Button';
import { TIME_OPTIONS } from '../constants';
import { analytics } from '../services/analytics';

interface CreateCapsuleProps {
  capsules: Capsule[];
  profile: UserProfile;
  onSave: (capsule: Capsule) => void;
  onCancel: () => void;
  onRequestPremium: (feature: string) => void;
}

const MOON_DURATION = 30 * 24 * 60 * 60 * 1000;
const MOON_LIMIT = 3;

export const CreateCapsule: React.FC<CreateCapsuleProps> = ({ capsules, profile, onSave, onCancel, onRequestPremium }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [unlockDuration, setUnlockDuration] = useState(TIME_OPTIONS[1].value);
  const [image, setImage] = useState<string | null>(null);
  const [audio, setAudio] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const [appNotice, setAppNotice] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;
    
    const selectedOption = TIME_OPTIONS.find(opt => opt.value === unlockDuration);
    analytics.sealCapsule(selectedOption?.label || 'Custom');

    const now = Date.now();
    onSave({
      id: Math.random().toString(36).substr(2, 9),
      title,
      content,
      imageUrl: image || undefined,
      audioUrl: audio || undefined,
      createdAt: now,
      unlockAt: now + unlockDuration,
      isUnlocked: false,
      sender: 'Me',
      theme: 'minimal',
    });
  };

  const handleCancel = () => {
    if (title.trim() || content.trim() || image || audio) {
      if (window.confirm('Discard your draft? Your words will be lost to the void.')) {
        onCancel();
      }
    } else {
      onCancel();
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = () => {
          setAudio(reader.result as string);
        };
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Error accessing microphone:", err);
      alert("Could not access microphone. Please check permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleOptionClick = (opt: typeof TIME_OPTIONS[0]) => {
    // Logic for "A Moon" (30 days)
    if (opt.value === MOON_DURATION) {
      const moonCount = capsules.filter(c => c.unlockAt - c.createdAt === MOON_DURATION).length;
      if (moonCount < MOON_LIMIT || profile.isPremium) {
        setUnlockDuration(opt.value);
        setAppNotice(null);
      } else {
        onRequestPremium('Unlimited Moon Capsules');
      }
      return;
    }

    // Logic for other public options
    if (opt.isPublic || profile.isPremium) {
      setUnlockDuration(opt.value);
      setAppNotice(null);
    } else {
      // For Year, Decade
      onRequestPremium(`${opt.label} Horizon`);
    }
  };

  return (
    <div className="fade-up pb-8 max-w-2xl mx-auto">
      <div className="flex justify-between items-baseline mb-8 border-b border-black/[0.03] pb-4">
        <h2 className="serif text-3xl md:text-4xl font-light text-neutral-800">Compose</h2>
        <button onClick={handleCancel} className="text-neutral-400 hover:text-black transition-colors text-[8px] tracking-[0.3em] uppercase font-bold">Discard Entry</button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-2">
          <label className="text-[8px] tracking-[0.3em] uppercase text-neutral-400 font-bold">Subject</label>
          <input 
            id="capsule-title"
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="A title for your future self..."
            className={`w-full bg-transparent border-b border-black/10 py-2 text-xl md:text-2xl serif focus:outline-none focus:border-black transition-all duration-700 placeholder:text-[#433422]/50 ${title ? 'text-[#1a1a1a]' : 'text-[#433422]/50'}`}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-[8px] tracking-[0.3em] uppercase text-neutral-400 font-bold">The Message</label>
          <textarea 
            id="capsule-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Speak across time..."
            className={`w-full bg-transparent border-none py-1 text-base md:text-lg serif italic leading-relaxed focus:outline-none min-h-[250px] resize-none transition-all duration-700 placeholder:text-[#433422]/50 ${content ? 'text-[#1a1a1a]' : 'text-[#433422]/50'}`}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6 border-y border-black/[0.03]">
          <div className="space-y-3 relative">
            <p className="text-[8px] tracking-[0.3em] uppercase text-neutral-400 font-bold">Time Horizon</p>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {TIME_OPTIONS.map((opt) => {
                const isMoon = opt.value === MOON_DURATION;
                const moonCount = capsules.filter(c => c.unlockAt - c.createdAt === MOON_DURATION).length;
                const moonDisabled = isMoon && moonCount >= MOON_LIMIT && !profile.isPremium;
                const isPremiumLocked = !opt.isPublic && !profile.isPremium;
                const isDisabled = moonDisabled || isPremiumLocked;
                
                return (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => handleOptionClick(opt)}
                    className={`text-[8px] font-bold tracking-widest transition-all uppercase relative group/opt ${
                      unlockDuration === opt.value && !isDisabled
                        ? 'text-black border-b border-black pb-0.5' 
                        : isDisabled
                          ? 'text-neutral-200 cursor-help' 
                          : 'text-neutral-300 hover:text-neutral-500'
                    }`}
                  >
                    {opt.label}
                    {isDisabled && (
                      <i className="fa-solid fa-lock text-[6px] ml-1 opacity-40 group-hover/opt:opacity-100 transition-opacity text-amber-600"></i>
                    )}
                  </button>
                );
              })}
            </div>
            {appNotice && (
              <div className="absolute -bottom-6 left-0 animate-in fade-in slide-in-from-top-1 duration-500">
                <p className="text-[7px] tracking-[0.1em] text-amber-600 font-bold uppercase italic max-w-[250px]">
                  {appNotice}
                </p>
              </div>
            )}
          </div>
          
          <div className="space-y-3">
             <p className="text-[8px] tracking-[0.3em] uppercase text-neutral-400 font-bold">Context</p>
             <div className="flex flex-col gap-4">
               <div>
                 <input 
                    type="file" 
                    accept="image/*" 
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => setImage(reader.result as string);
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="hidden" 
                    id="file-upload"
                  />
                  <label 
                    htmlFor="file-upload" 
                    className={`inline-block text-[8px] tracking-widest font-bold uppercase cursor-pointer transition-all ${image ? 'text-amber-600 border-b border-amber-600 pb-0.5' : 'text-neutral-400 border-b border-neutral-100 hover:text-black hover:border-black pb-0.5'}`}
                  >
                    <i className="fa-regular fa-image mr-2"></i>
                    {image ? 'Visual Attached' : 'Add visual echo'}
                  </label>
               </div>
               
               <div>
                 {audio ? (
                   <div className="flex items-center gap-3">
                     <span className="text-[8px] tracking-widest font-bold uppercase text-amber-600 border-b border-amber-600 pb-0.5">
                       <i className="fa-solid fa-microphone-lines mr-2"></i>
                       Voice Attached
                     </span>
                     <button 
                       type="button" 
                       onClick={() => setAudio(null)}
                       className="text-neutral-400 hover:text-red-500 transition-colors"
                     >
                       <i className="fa-solid fa-xmark text-xs"></i>
                     </button>
                   </div>
                 ) : (
                   <button
                     type="button"
                     onClick={isRecording ? stopRecording : startRecording}
                     className={`inline-block text-[8px] tracking-widest font-bold uppercase cursor-pointer transition-all ${isRecording ? 'text-red-500 animate-pulse' : 'text-neutral-400 border-b border-neutral-100 hover:text-black hover:border-black pb-0.5'}`}
                   >
                     <i className={`fa-solid ${isRecording ? 'fa-stop' : 'fa-microphone'} mr-2`}></i>
                     {isRecording ? 'Recording...' : 'Add voice echo'}
                   </button>
                 )}
               </div>
             </div>
          </div>
        </div>

        <div className="flex justify-center pt-4">
           <button 
            type="submit" 
            className="group flex flex-col items-center gap-3 transition-all"
          >
            <div className="w-14 h-14 rounded-full border border-black/5 flex items-center justify-center group-hover:bg-black group-hover:scale-110 transition-all duration-700 shadow-lg shadow-black/5">
              <i className="fa-solid fa-feather-pointed text-neutral-300 group-hover:text-white transition-colors text-xs"></i>
            </div>
            <span className="text-[7px] tracking-[0.4em] uppercase text-neutral-400 group-hover:text-black transition-colors font-bold">Seal this moment</span>
          </button>
        </div>
      </form>
    </div>
  );
};
