import React, { useState } from 'react';
import { Button } from './Button';

interface PremiumModalProps {
  onClose: () => void;
  onUpgrade: () => void;
  featureName: string;
}

export const PremiumModal: React.FC<PremiumModalProps> = ({ onClose, onUpgrade, featureName }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpgrade = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          origin: window.location.origin,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to initialize checkout');
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred during checkout');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-[#fdfbf7] p-8 max-w-md w-full border border-black/10 shadow-2xl relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-black transition-colors"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        <div className="text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-full bg-amber-100/50 flex items-center justify-center border border-amber-200/50">
            <i className="fa-solid fa-key text-amber-600 text-xl"></i>
          </div>
          
          <div className="space-y-2">
            <h3 className="serif text-2xl text-neutral-900">Unlock {featureName}</h3>
            <p className="text-sm text-neutral-500 leading-relaxed">
              Upgrade to Chronos Premium to access long-term horizons, unlimited Moon capsules, and secure import/export functionality.
            </p>
          </div>

          <div className="py-6 border-y border-black/5 space-y-4 text-left">
            <div className="flex items-center gap-3">
              <i className="fa-solid fa-check text-amber-600 text-xs"></i>
              <span className="text-sm text-neutral-700">Year & Decade Time Horizons</span>
            </div>
            <div className="flex items-center gap-3">
              <i className="fa-solid fa-check text-amber-600 text-xs"></i>
              <span className="text-sm text-neutral-700">Unlimited Monthly Capsules</span>
            </div>
            <div className="flex items-center gap-3">
              <i className="fa-solid fa-check text-amber-600 text-xs"></i>
              <span className="text-sm text-neutral-700">ChronosVault Import & Export</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-end justify-center gap-1">
              <span className="text-3xl serif text-neutral-900">$39</span>
              <span className="text-xs text-neutral-400 uppercase tracking-widest font-bold mb-1">Lifetime</span>
            </div>
            
            <button 
              onClick={handleUpgrade}
              disabled={loading}
              className="w-full py-4 bg-neutral-900 text-white text-[8px] tracking-[0.4em] uppercase font-bold hover:bg-black transition-all disabled:opacity-50"
            >
              {loading ? 'Initializing...' : 'Unlock Premium'}
            </button>

            {error && (
              <p className="text-xs text-red-500 mt-2">{error}</p>
            )}
            <p className="text-[9px] text-neutral-400">
              If you have already purchased, <button onClick={onUpgrade} className="underline text-neutral-600">click here to restore</button> (Demo mode).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
