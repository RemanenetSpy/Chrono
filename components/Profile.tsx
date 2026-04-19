
import React, { useState, useRef } from 'react';
import { UserProfile, Capsule } from '../types';
import { Button } from './Button';
import { encryptVault, decryptVault } from '../services/backupService';

interface ProfileProps {
  profile: UserProfile;
  capsules: Capsule[];
  onUpdate: (profile: UserProfile) => void;
  onImport: (profile: UserProfile, capsules: Capsule[]) => void;
  onClearData: () => void;
  onBack: () => void;
  onRequestPremium: (feature: string) => void;
}

export const Profile: React.FC<ProfileProps> = ({ profile, capsules, onUpdate, onImport, onClearData, onBack, onRequestPremium }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(profile.name);
  const [bio, setBio] = useState(profile.bio);
  
  const [backupMode, setBackupMode] = useState<'IDLE' | 'EXPORT' | 'IMPORT'>('IDLE');
  const [passphrase, setPassphrase] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [pendingVault, setPendingVault] = useState<{ profile: UserProfile, capsules: Capsule[] } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const lockedCount = capsules.filter(c => Date.now() < c.unlockAt).length;
  const unlockedCount = capsules.length - lockedCount;

  const handleExport = async () => {
    if (passphrase.length < 4) {
      setStatus("Security key must be at least 4 characters.");
      return;
    }
    try {
      setStatus("Sealing the vault...");
      const dataToStore = { profile, capsules };
      const encrypted = await encryptVault(JSON.stringify(dataToStore), passphrase);
      
      const blob = new Blob([encrypted], { type: 'application/octet-stream' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `chronos_vault_${new Date().toISOString().split('T')[0]}.chronosvault`;
      link.click();
      URL.revokeObjectURL(url);
      
      setStatus("Vault sealed and exported.");
      setBackupMode('IDLE');
      setPassphrase('');
    } catch (e) {
      console.error('Export failed:', e);
      setStatus("Failed to generate proprietary vault.");
    }
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!passphrase) {
      setStatus("Security key required before file selection.");
      e.target.value = '';
      return;
    }

    try {
      setStatus("Opening secure channel...");
      const text = (await file.text()).trim();
      
      await new Promise(r => setTimeout(r, 600));
      setStatus("Checking vault integrity...");
      
      await new Promise(r => setTimeout(r, 600));
      setStatus("Decrypting with your key...");
      
      const decrypted = await decryptVault(text, passphrase);
      
      await new Promise(r => setTimeout(r, 400));
      setStatus("Validating memory structures...");
      const data = JSON.parse(decrypted);

      if (!data || typeof data !== 'object') {
        throw new Error("Invalid vault data format.");
      }

      if (!Array.isArray(data.capsules)) {
        throw new Error("Vault is missing the capsule archive.");
      }

      setPendingVault({
        profile: data.profile || profile, // Use current profile if missing in vault
        capsules: data.capsules
      });
      setStatus("Vault verified. Merge required to finalize.");
    } catch (e: any) {
      console.error('Import failed:', e);
      if (e.message?.includes('Integrity') || e.message?.includes('tampered') || e.message?.includes('Incorrect security key')) {
        setStatus("Incorrect security key or tampered file.");
      } else if (e instanceof SyntaxError) {
        setStatus("Corrupted archive data (JSON error).");
      } else {
        setStatus(`Import failed: ${e.message || 'Unknown error'}`);
      }
      e.target.value = '';
    }
  };

  const confirmMerge = () => {
    if (!pendingVault) return;
    
    setStatus("Merging memories into local timeline...");
    
    // Use a small delay to allow UI to show merging state
    setTimeout(() => {
        onImport(pendingVault.profile, pendingVault.capsules);
        setPendingVault(null);
        setStatus("Successfully merged archive.");
    }, 1000);
  };

  const rejectVault = () => {
    setPendingVault(null);
    setStatus("Import discarded.");
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="fade-up space-y-12 max-w-3xl mx-auto pb-8">
      <div className="flex justify-between items-baseline border-b border-black/[0.03] pb-4">
        <h2 className="serif text-3xl md:text-4xl font-light text-neutral-800">Memoir</h2>
        <button onClick={onBack} className="text-neutral-400 hover:text-black transition-colors text-[8px] tracking-[0.4em] uppercase font-bold">Return</button>
      </div>

      <div className="space-y-12">
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-px h-16 bg-gradient-to-b from-black/10 to-transparent hidden md:block"></div>
            <div className="flex-1 space-y-4">
              {isEditing ? (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[8px] tracking-[0.3em] uppercase text-neutral-400 font-bold">Identity</label>
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-transparent border-b border-black/10 w-full py-2 text-2xl serif focus:outline-none focus:border-black transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[8px] tracking-[0.3em] uppercase text-neutral-400 font-bold">Personal Lore</label>
                    <textarea 
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="bg-transparent border border-black/5 w-full p-3 text-base serif italic text-neutral-600 focus:outline-none focus:border-black/10 h-20 resize-none"
                    />
                  </div>
                  <div className="flex gap-4">
                    <button onClick={() => { onUpdate({...profile, name, bio}); setIsEditing(false); }} className="text-[8px] tracking-widest uppercase font-black text-black">Save Memoir</button>
                    <button onClick={() => setIsEditing(false)} className="text-[8px] tracking-widest uppercase font-bold text-neutral-300">Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <h3 className="serif text-2xl text-neutral-800">{profile.name}</h3>
                    <p className="serif italic text-neutral-400 text-lg leading-relaxed font-light">"{profile.bio}"</p>
                  </div>
                  <button onClick={() => setIsEditing(true)} className="text-[7px] tracking-[0.4em] uppercase text-neutral-300 hover:text-black transition-colors font-bold">Rewrite identity</button>
                </>
              )}
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-3 gap-8 border-t border-black/[0.04] pt-8">
          <div className="space-y-1">
            <p className="text-[7px] tracking-[0.3em] uppercase text-neutral-400 font-bold">Sealed Entries</p>
            <p className="serif text-3xl font-light text-neutral-800">{capsules.length}</p>
          </div>
          <div className="space-y-1">
            <p className="text-[7px] tracking-[0.3em] uppercase text-neutral-400 font-bold">Awaiting Revealing</p>
            <p className="serif text-3xl font-light text-amber-700/60">{lockedCount}</p>
          </div>
          <div className="space-y-1">
            <p className="text-[7px] tracking-[0.3em] uppercase text-neutral-400 font-bold">Shared History</p>
            <p className="serif text-3xl font-light text-neutral-300">{unlockedCount}</p>
          </div>
        </section>

        <section className="pt-10 border-t border-black/[0.04] space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-px h-8 bg-black/5"></div>
            <h4 className="serif text-xl font-light italic text-neutral-700">Legacy & Continuity</h4>
          </div>
          
          <div className="bg-black/[0.01] p-6 border border-black/[0.03] space-y-6">
            {pendingVault ? (
              <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500 bg-white p-8 border border-black/5 shadow-sm">
                <div className="space-y-2 text-center">
                  <p className="text-[8px] tracking-[0.4em] uppercase text-amber-600 font-bold">Incoming Vault Detected</p>
                  <h3 className="serif text-2xl text-neutral-800">Archive belonging to "{pendingVault.profile?.name || 'Unknown'}"</h3>
                  <p className="serif italic text-neutral-400">Contains {pendingVault.capsules.length} chronological entries.</p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-black/[0.03]">
                  <button 
                    onClick={confirmMerge}
                    className="flex-1 py-4 bg-neutral-900 text-white text-[8px] tracking-[0.4em] uppercase font-bold hover:bg-black transition-all"
                  >
                    Merge Memories
                  </button>
                  <button 
                    onClick={rejectVault}
                    className="flex-1 py-4 border border-black/5 text-neutral-400 text-[8px] tracking-[0.4em] uppercase font-bold hover:text-black transition-all"
                  >
                    Reject Vault
                  </button>
                </div>
              </div>
            ) : backupMode === 'IDLE' ? (
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <button 
                  onClick={() => { 
                    if (!profile.isPremium) {
                      onRequestPremium('ChronosVault Export');
                      return;
                    }
                    setBackupMode('EXPORT'); 
                    setStatus(null); 
                  }}
                  className="w-full sm:flex-1 flex flex-col items-center justify-center py-8 px-4 bg-white border border-black/5 hover:border-black/10 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl transition-all duration-500 group relative outline-none focus:outline-none [-webkit-tap-highlight-color:transparent]"
                >
                  <div className="w-12 h-12 rounded-full bg-neutral-50 flex items-center justify-center mb-4 group-hover:bg-neutral-900 group-hover:scale-110 transition-all duration-500">
                    <i className="fa-solid fa-file-export text-neutral-400 group-hover:text-white transition-colors"></i>
                  </div>
                  <span className="text-[9px] tracking-[0.3em] uppercase font-bold text-neutral-500 group-hover:text-black transition-colors">Seal ChronosVault</span>
                  {!profile.isPremium && <i className="fa-solid fa-lock absolute top-5 right-5 text-[10px] text-amber-600/40 group-hover:text-amber-600 transition-colors"></i>}
                </button>
                <button 
                  onClick={() => { 
                    if (!profile.isPremium) {
                      onRequestPremium('ChronosVault Import');
                      return;
                    }
                    setBackupMode('IMPORT'); 
                    setStatus(null); 
                  }}
                  className="w-full sm:flex-1 flex flex-col items-center justify-center py-8 px-4 bg-white border border-black/5 hover:border-black/10 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl transition-all duration-500 group relative outline-none focus:outline-none [-webkit-tap-highlight-color:transparent]"
                >
                  <div className="w-12 h-12 rounded-full bg-neutral-50 flex items-center justify-center mb-4 group-hover:bg-neutral-900 group-hover:scale-110 transition-all duration-500">
                    <i className="fa-solid fa-file-import text-neutral-400 group-hover:text-white transition-colors"></i>
                  </div>
                  <span className="text-[9px] tracking-[0.3em] uppercase font-bold text-neutral-500 group-hover:text-black transition-colors">Restore Vault</span>
                  {!profile.isPremium && <i className="fa-solid fa-lock absolute top-5 right-5 text-[10px] text-amber-600/40 group-hover:text-amber-600 transition-colors"></i>}
                </button>
              </div>
            ) : (
              <div className="space-y-6 animate-in fade-in slide-in-from-top-2 duration-500">
                <div className="space-y-2">
                  <label className="text-[8px] tracking-[0.3em] uppercase text-neutral-400 font-bold">Security Passphrase</label>
                  <input 
                    id="vault-passphrase"
                    type="password"
                    value={passphrase}
                    onChange={(e) => setPassphrase(e.target.value)}
                    placeholder="Enter key to sign the vault..."
                    className={`w-full bg-white border border-black/5 px-4 py-3 serif italic focus:outline-none focus:border-black/10 text-lg transition-all duration-700 placeholder:text-[#433422]/50 ${passphrase ? 'text-[#1a1a1a]' : 'text-[#433422]/50'}`}
                  />
                  <p className="text-[6px] tracking-widest text-neutral-300 uppercase">Vaults are identity-locked to Chronos. They cannot be opened by standard software.</p>
                </div>
                
                <div className="flex justify-between items-center">
                  <button onClick={() => { setBackupMode('IDLE'); setStatus(null); }} className="text-[8px] tracking-widest uppercase text-neutral-300 font-bold hover:text-black transition-colors">Discard Action</button>
                  
                  {backupMode === 'EXPORT' ? (
                    <button 
                      onClick={handleExport}
                      className="text-[8px] tracking-[0.3em] uppercase font-black text-black border-b border-black pb-0.5"
                    >
                      Encrypt & Export
                    </button>
                  ) : (
                    <label className="cursor-pointer text-[8px] tracking-[0.3em] uppercase font-black text-black border-b border-black pb-0.5">
                      Select .chronosvault File
                      <input 
                        ref={fileInputRef}
                        type="file" 
                        accept=".chronosvault" 
                        className="hidden" 
                        onChange={handleImport} 
                      />
                    </label>
                  )}
                </div>
              </div>
            )}
            
            {status && (
              <p className="text-[8px] tracking-widest uppercase text-center text-amber-600 font-bold animate-pulse">
                {status}
              </p>
            )}
          </div>
        </section>

        <section className="pt-12 flex flex-col items-center border-t border-black/[0.02]">
           <button 
              onClick={onClearData}
              className="text-[7px] tracking-[0.4em] uppercase text-neutral-200 hover:text-red-400 transition-colors font-bold"
            >
              Burn the archive
            </button>
        </section>
      </div>
    </div>
  );
};
