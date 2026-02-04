
import React, { useState } from 'react';
import { Capsule } from '../types';
import { Button } from './Button';
import { TIME_OPTIONS } from '../constants';
import { analytics } from '../services/analytics';

interface CreateCapsuleProps {
  onSave: (capsule: Capsule) => void;
  onCancel: () => void;
}

export const CreateCapsule: React.FC<CreateCapsuleProps> = ({ onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [unlockDuration, setUnlockDuration] = useState(TIME_OPTIONS[1].value);
  const [image, setImage] = useState<string | null>(null);

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
      createdAt: now,
      unlockAt: now + unlockDuration,
      isUnlocked: false,
      sender: 'Me',
      theme: 'minimal',
    });
  };

  return (
    <div className="fade-up pb-8 max-w-2xl mx-auto">
      <div className="flex justify-between items-baseline mb-8 border-b border-black/[0.03] pb-4">
        <h2 className="serif text-3xl md:text-4xl font-light text-neutral-800">Compose</h2>
        <button onClick={onCancel} className="text-neutral-400 hover:text-black transition-colors text-[8px] tracking-[0.3em] uppercase font-bold">Discard Entry</button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-2">
          <label className="text-[8px] tracking-[0.3em] uppercase text-neutral-400 font-bold">Subject</label>
          <input 
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="A title for your future self..."
            className="w-full bg-transparent border-b border-black/10 py-2 text-xl md:text-2xl serif focus:outline-none focus:border-black transition-all placeholder:text-neutral-200"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-[8px] tracking-[0.3em] uppercase text-neutral-400 font-bold">The Message</label>
          <textarea 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Speak across time..."
            className="w-full bg-transparent border-none py-1 text-base md:text-lg serif italic leading-relaxed focus:outline-none min-h-[250px] resize-none placeholder:text-neutral-200"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6 border-y border-black/[0.03]">
          <div className="space-y-3">
            <p className="text-[8px] tracking-[0.3em] uppercase text-neutral-400 font-bold">Time Horizon</p>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {TIME_OPTIONS.map((opt) => (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() => setUnlockDuration(opt.value)}
                  className={`text-[8px] font-bold tracking-widest transition-all uppercase ${
                    unlockDuration === opt.value 
                      ? 'text-black border-b border-black pb-0.5' 
                      : 'text-neutral-300 hover:text-neutral-500'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="space-y-3">
             <p className="text-[8px] tracking-[0.3em] uppercase text-neutral-400 font-bold">Visual Context</p>
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
                {image ? 'Memory Attached' : 'Add visual echo'}
              </label>
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
