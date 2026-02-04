
import React, { useState } from 'react';
import { Capsule } from '../types';
import { Button } from './Button';
import { TIME_OPTIONS } from '../constants';

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
    <div className="fade-up pb-12 max-w-2xl mx-auto">
      <div className="flex justify-between items-baseline mb-12 border-b border-black/[0.03] pb-6">
        <h2 className="serif text-4xl font-light text-neutral-800">Compose</h2>
        <button onClick={onCancel} className="text-neutral-400 hover:text-black transition-colors text-[9px] tracking-[0.3em] uppercase font-bold">Discard Entry</button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        <div className="space-y-3">
          <label className="text-[9px] tracking-[0.3em] uppercase text-neutral-400 font-bold">Subject</label>
          <input 
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="A title for your future self..."
            className="w-full bg-transparent border-b border-black/10 py-3 text-2xl serif focus:outline-none focus:border-black transition-all placeholder:text-neutral-200"
            required
          />
        </div>

        <div className="space-y-3">
          <label className="text-[9px] tracking-[0.3em] uppercase text-neutral-400 font-bold">The Message</label>
          <textarea 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Speak across time..."
            className="w-full bg-transparent border-none py-2 text-lg serif italic leading-relaxed focus:outline-none min-h-[300px] resize-none placeholder:text-neutral-200"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 py-8 border-y border-black/[0.03]">
          <div className="space-y-4">
            <p className="text-[9px] tracking-[0.3em] uppercase text-neutral-400 font-bold">Time Horizon</p>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {TIME_OPTIONS.map((opt) => (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() => setUnlockDuration(opt.value)}
                  className={`text-[9px] font-bold tracking-widest transition-all uppercase ${
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
          
          <div className="space-y-4">
             <p className="text-[9px] tracking-[0.3em] uppercase text-neutral-400 font-bold">Visual Context</p>
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
                className={`inline-block text-[9px] tracking-widest font-bold uppercase cursor-pointer transition-all ${image ? 'text-amber-600 border-b border-amber-600 pb-0.5' : 'text-neutral-400 border-b border-neutral-100 hover:text-black hover:border-black pb-0.5'}`}
              >
                {image ? 'Memory Attached' : 'Add visual echo'}
              </label>
          </div>
        </div>

        <div className="flex justify-center pt-8">
           <button 
            type="submit" 
            className="group flex flex-col items-center gap-4 transition-all"
          >
            <div className="w-16 h-16 rounded-full border border-black/5 flex items-center justify-center group-hover:bg-black group-hover:scale-110 transition-all duration-700 shadow-lg shadow-black/5">
              <i className="fa-solid fa-feather-pointed text-neutral-300 group-hover:text-white transition-colors text-sm"></i>
            </div>
            <span className="text-[8px] tracking-[0.4em] uppercase text-neutral-400 group-hover:text-black transition-colors font-bold">Seal this moment</span>
          </button>
        </div>
      </form>
    </div>
  );
};
