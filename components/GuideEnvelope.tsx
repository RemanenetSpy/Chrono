import React, { useState } from 'react';

interface GuideEnvelopeProps {
  onClose: () => void;
}

export const GuideEnvelope: React.FC<GuideEnvelopeProps> = ({ onClose }) => {
  const [view, setView] = useState<'manifesto' | 'letter'>('manifesto');
  const [senderName, setSenderName] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message) return;

    const dateStr = new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
    const structuredBody = `From the Desk of: ${senderName || 'A Time Traveler'}\nDate: ${dateStr}\n\nDear Archivist,\n\n${message}\n\n---\nDispatched via Chronos Vault App`;

    const encodedSubject = encodeURIComponent(`[Chronos Protocol] ${subject || 'A Message from the Vault'}`);
    const encodedBody = encodeURIComponent(structuredBody);
    
    // Create an anchor element to bypass iframe sandbox restrictions
    const mailtoLink = `mailto:chronosvaults@gmail.com?subject=${encodedSubject}&body=${encodedBody}`;
    const anchor = document.createElement('a');
    anchor.href = mailtoLink;
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    
    // Smooth transition back after dispatching
    setTimeout(() => {
      setView('manifesto');
      setMessage('');
      setSubject('');
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center bg-[#fdfbf7]/80 backdrop-blur-sm p-4 sm:p-6 opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]">
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
      
      <div className="bg-[#fdfbf7] border border-black/5 p-8 sm:p-12 max-w-xl w-full shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] relative opacity-0 animate-[slideUp_0.7s_ease-out_0.2s_forwards] overflow-y-auto max-h-[90vh] rounded-sm transition-all duration-700">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-neutral-400 hover:text-black transition-colors outline-none focus:outline-none [-webkit-tap-highlight-color:transparent]"
        >
          <i className="fa-solid fa-xmark text-lg"></i>
        </button>
        
        {view === 'manifesto' ? (
          <div className="animate-[fadeIn_0.5s_ease-out_forwards]">
            <div className="flex flex-col items-center mb-8">
              <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center mb-4 text-neutral-800 bg-white shadow-sm">
                <i className="fa-regular fa-envelope text-xl"></i>
              </div>
              <h2 className="serif text-3xl font-light text-neutral-900 tracking-wide text-center">The Manifesto</h2>
              <div className="w-8 h-px bg-black/20 mt-4"></div>
            </div>

            <div className="space-y-6 serif text-neutral-600 leading-relaxed font-light">
              <p>
                Chronos is a sanctuary for your present thoughts, designed to be read exclusively by your future self. We act as custodians of time, holding onto the fragments you seal away until their designated hour arrives.
              </p>
              
              <div className="bg-white p-6 border border-black/[0.02] shadow-sm rounded-lg space-y-4">
                <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-900 font-sans">The Application</h3>
                <ol className="list-decimal list-inside space-y-3 font-sans text-sm font-normal text-neutral-500">
                  <li><strong className="font-bold text-neutral-800">Draft:</strong> Pour your current state of mind into a letter. Attach an image or a voice echo if words are not enough.</li>
                  <li><strong className="font-bold text-neutral-800">Seal:</strong> Choose a time horizon. Once sealed, a capsule cannot be prematurely opened.</li>
                  <li><strong className="font-bold text-neutral-800">Wait:</strong> Trust time. Let the archive securely hold your memory until you are ready to receive it again.</li>
                </ol>
              </div>

              <div className="pt-6 border-t border-black/5">
                <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-900 font-sans mb-4 flex items-center gap-2">
                  <i className="fa-solid fa-feather-pointed"></i> Correspondence & Support
                </h3>
                <p className="mb-6 font-serif italic text-sm">
                  Whether you have found a tear in the fabric of the app (a bug), wish to request a new feature, or simply need support with your archive—we await your letter.
                </p>
                <div className="flex flex-col items-center">
                  <button 
                    onClick={() => setView('letter')}
                    className="group flex flex-col items-center gap-3 transition-all relative z-10 outline-none focus:outline-none [-webkit-tap-highlight-color:transparent]"
                  >
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center group-hover:bg-black group-hover:scale-105 transition-all duration-700 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-black/[0.02]">
                      <i className="fa-solid fa-pen-nib text-neutral-400 group-hover:text-white transition-colors text-lg"></i>
                    </div>
                    <span className="text-[8px] tracking-[0.3em] uppercase text-neutral-500 group-hover:text-black transition-colors font-bold font-sans">Write to the Archivist</span>
                  </button>
                  <p className="mt-4 text-[7px] tracking-[0.3em] uppercase text-neutral-300 font-bold font-sans select-all">
                    Direct Address: chronosvaults@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleDispatch} className="animate-[fadeIn_0.5s_ease-out_forwards] flex flex-col h-full">
            <div className="flex items-center justify-between mb-8 border-b border-black/[0.03] pb-4">
              <button 
                type="button" 
                onClick={() => setView('manifesto')}
                className="text-[8px] tracking-[0.3em] uppercase text-neutral-400 hover:text-black transition-colors font-bold flex items-center gap-2 focus:outline-none"
              >
                <i className="fa-solid fa-arrow-left"></i> Return
              </button>
              <h2 className="serif text-xl font-light text-neutral-800">Draft Dispatch</h2>
            </div>

            <div className="space-y-6 flex-grow">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="space-y-1 flex-1">
                  <label className="text-[7px] tracking-[0.3em] uppercase text-neutral-400 font-bold font-sans">Sender Identity</label>
                  <input 
                    type="text" 
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="Anonymous Time Traveler"
                    className="w-full bg-transparent border-b border-black/10 py-2 text-base serif focus:outline-none focus:border-black transition-all duration-500 placeholder:text-neutral-300 text-neutral-800"
                  />
                </div>
                <div className="space-y-1 flex-1">
                  <label className="text-[7px] tracking-[0.3em] uppercase text-neutral-400 font-bold font-sans">Subject of Dispatch</label>
                  <input 
                    type="text" 
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Support, Bug Report, Idea..."
                    className="w-full bg-transparent border-b border-black/10 py-2 text-base serif focus:outline-none focus:border-black transition-all duration-500 placeholder:text-neutral-300 text-neutral-800"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[7px] tracking-[0.3em] uppercase text-neutral-400 font-bold font-sans flex items-center gap-2">
                  <i className="fa-regular fa-envelope"></i> Letter Contents
                </label>
                <div className="bg-white p-6 border border-black/5 shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)] min-h-[250px] relative">
                  <p className="serif italic text-neutral-400 mb-6 pb-4 border-b border-black/[0.03]">Dear Archivist,</p>
                  <textarea 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Speak your mind... your words will be formatted into a formal letter upon dispatch."
                    className="w-full bg-transparent border-none py-1 text-base serif italic leading-relaxed focus:outline-none min-h-[150px] resize-none text-neutral-700 placeholder:text-neutral-300/50"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center pt-8 mt-4 border-t border-black/5">
              <button 
                type="submit" 
                className="group flex flex-col items-center gap-3 transition-all relative z-10 outline-none focus:outline-none [-webkit-tap-highlight-color:transparent]"
              >
                <div className="w-14 h-14 bg-neutral-900 rounded-full flex items-center justify-center group-hover:bg-black group-hover:scale-105 transition-all duration-700 shadow-lg shadow-black/10">
                  <i className="fa-regular fa-paper-plane text-white text-base group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-500"></i>
                </div>
                <span className="text-[8px] tracking-[0.3em] uppercase text-neutral-500 group-hover:text-black transition-colors font-bold font-sans">Seal & Dispatch Letter</span>
              </button>
            </div>
            
            <p className="text-center mt-6 text-[7px] tracking-widest uppercase text-neutral-300 font-sans">
              This action opens your secure mail client
            </p>
          </form>
        )}
        
      </div>
    </div>
  );
}
