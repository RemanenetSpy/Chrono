import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { Capsule } from '../types';

interface ShareCardProps {
  capsule: Capsule;
  onClose: () => void;
}

export const ShareCard: React.FC<ShareCardProps> = ({ capsule, onClose }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const formattedDate = new Date(capsule.unlockAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 3, // High resolution
        backgroundColor: '#1A1A1A',
        logging: false,
        useCORS: true,
      });
      
      const image = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.download = `chronos-sealed-${capsule.id.substring(0, 8)}.png`;
      link.href = image;
      link.click();
    } catch (err) {
      console.error('Failed to generate image', err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 fade-up">
      <div className="bg-[#fdfbf7] p-6 md:p-8 max-w-md w-full shadow-2xl relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-800 transition-colors"
        >
          <i className="fa-solid fa-xmark text-xl"></i>
        </button>

        <div className="text-center mb-6">
          <h3 className="serif text-2xl font-medium text-neutral-900">Share the Void</h3>
        </div>

        {/* The Card to be captured */}
        <div 
          ref={cardRef}
          className="w-full aspect-square flex flex-col justify-between p-8 relative overflow-hidden"
          style={{ backgroundColor: '#1A1A1A' }}
        >
          {/* Subtle noise overlay for texture */}
          <div 
            className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
            style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }}
          ></div>

          {/* Top Section */}
          <div className="flex justify-between items-start relative z-10">
            <div className="w-12 h-px bg-white/20 mt-3"></div>
            <div className="w-12 h-px bg-white/20 mt-3"></div>
          </div>

          {/* Center Content */}
          <div className="text-center relative z-10 flex flex-col items-center justify-center flex-grow">
            <p 
              className="text-white/90 text-2xl md:text-3xl leading-relaxed mb-10 max-w-[280px] mx-auto"
              style={{ fontFamily: 'var(--f-spectral)' }}
            >
              "A piece of the present has been entrusted to the future."
            </p>

            <div className="flex flex-col items-center gap-2">
              <div className="text-white/40 text-xs uppercase tracking-[0.2em] font-sans">Release Date</div>
              <div className="text-white/80 text-lg" style={{ fontFamily: 'var(--f-spectral)' }}>
                {formattedDate}
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2 px-4 py-1.5 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm">
              <span className="text-white/60 text-xs uppercase tracking-widest font-sans">Status:</span>
              <span className="text-white/90 text-sm font-medium tracking-wide">Sealed 🛡️</span>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-end relative z-10">
            <div className="uppercase tracking-[0.3em] text-white/30 text-[10px] font-light">
              Chronos
            </div>
            <div className="text-white/30 text-[10px] font-mono tracking-wider">
              chronos-snowy.vercel.app
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="w-full bg-[#1a1a1a] text-white py-3 px-6 hover:bg-black transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isDownloading ? (
              <i className="fa-solid fa-circle-notch fa-spin"></i>
            ) : (
              <i className="fa-solid fa-download"></i>
            )}
            <span className="uppercase tracking-widest text-xs font-medium">
              {isDownloading ? 'Forging...' : 'Extract Artifact'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
