
import React, { useState, useEffect } from 'react';
import { Capsule, ViewState, UserProfile } from './types';
import { CapsuleCard } from './components/CapsuleCard';
import { CreateCapsule } from './components/CreateCapsule';
import { CapsuleDetail } from './components/CapsuleDetail';
import { Profile } from './components/Profile';
import { Button } from './components/Button';
import { analytics } from './services/analytics';
import { encryptCapsuleData, decryptCapsuleData } from './utils/encryption';

const DEFAULT_PROFILE: UserProfile = {
  name: 'L. Van-Tassel',
  bio: 'Capturing the fragments of today for the clarity of tomorrow.',
  joinedDate: Date.now(),
};

const MainApp: React.FC = () => {
  const [capsules, setCapsules] = useState<Capsule[]>([]);
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [currentView, setCurrentView] = useState<ViewState>('VAULT');
  const [selectedCapsuleId, setSelectedCapsuleId] = useState<string | null>(null);
  const [premiumModalFeature, setPremiumModalFeature] = useState<string | null>(null);

  useEffect(() => {
    const savedCapsules = localStorage.getItem('chronos_capsules');
    const savedProfile = localStorage.getItem('chronos_profile');
    if (savedCapsules) {
      try {
        const parsed = JSON.parse(savedCapsules);
        const decryptedCapsules = parsed.map((cap: any) => decryptCapsuleData(cap));
        setCapsules(decryptedCapsules);
      } catch (e) {
        console.error("Failed to parse saved capsules", e);
      }
    }
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile);
        if (parsed) {
          setProfile(parsed);
        }
      } catch (e) {
        console.error("Failed to parse saved profile", e);
      }
    }
    
    analytics.viewVault();
  }, []);

  useEffect(() => {
    const encryptedCapsules = capsules.map(cap => encryptCapsuleData(cap));
    localStorage.setItem('chronos_capsules', JSON.stringify(encryptedCapsules));
  }, [capsules]);

  useEffect(() => {
    localStorage.setItem('chronos_profile', JSON.stringify(profile));
  }, [profile]);

  const navigateTo = (view: ViewState) => {
    setCurrentView(view);
    switch(view) {
      case 'VAULT': analytics.viewVault(); break;
      case 'CREATE': analytics.viewCompose(); break;
      case 'PROFILE': analytics.viewMemoir(); break;
    }
  };

  const handleSaveCapsule = (newCapsule: Capsule) => {
    setCapsules([newCapsule, ...capsules]);
    navigateTo('VAULT');
  };

  const handleUpdateCapsule = (updated: Capsule) => {
    setCapsules(capsules.map(c => c.id === updated.id ? updated : c));
  };

  const handleDeleteCapsule = (id: string) => {
    setCapsules(capsules.filter(c => c.id !== id));
    navigateTo('VAULT');
  };

  const handleImportData = (newProfile: UserProfile, newCapsules: Capsule[]) => {
    setProfile(newProfile);
    
    setCapsules(prev => {
      const merged = [...prev];
      newCapsules.forEach(cap => {
        if (!merged.find(existing => existing.id === cap.id)) {
          merged.push(cap);
        }
      });
      // Sort by creation date descending
      return merged.sort((a, b) => b.createdAt - a.createdAt);
    });
    
    navigateTo('VAULT');
  };

  const handleClearData = () => {
    if (window.confirm('This will permanently erase all entries and your memoir. Are you absolutely certain you wish to burn the archive?')) {
      analytics.burnArchive();
      localStorage.clear();
      window.location.reload();
    }
  };

  const handleRequestPremium = (feature: string) => {
    setPremiumModalFeature(feature);
  };

  return (
    <div className="min-h-screen flex flex-col text-neutral-900 bg-[#fdfbf7]">
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-200/40 to-transparent pointer-events-none z-50"></div>

      <nav className="p-6 md:p-8 flex justify-between items-center max-w-7xl mx-auto w-full border-b border-black/[0.03]">
        <div 
          className="cursor-pointer group" 
          onClick={() => navigateTo('VAULT')}
        >
          <h1 className="text-xl md:text-2xl tracking-[0.3em] font-light uppercase">
            Chronos
            <span className="block h-px w-0 group-hover:w-full bg-black transition-all duration-1000 mt-1"></span>
          </h1>
        </div>

        <div className="flex gap-8 items-center">
          <button 
            onClick={() => navigateTo('PROFILE')}
            className={`text-[8px] tracking-[0.4em] uppercase transition-all font-bold ${currentView === 'PROFILE' ? 'text-black' : 'text-neutral-300 hover:text-neutral-500'}`}
          >
            Memoir
          </button>
          <button 
            onClick={() => navigateTo('CREATE')}
            className="w-8 h-8 flex items-center justify-center border border-black/5 rounded-full hover:bg-black hover:text-white transition-all duration-700 shadow-sm"
          >
            <i className="fa-solid fa-plus text-[9px]"></i>
          </button>
        </div>
      </nav>

      <main className="flex-grow max-w-7xl mx-auto px-6 md:px-8 py-8 md:py-10 w-full">
        {currentView === 'VAULT' && (
          <div className="fade-up">
            <header className="mb-8 md:mb-10">
              <p className="serif italic text-xl md:text-2xl text-neutral-500 max-w-xl leading-relaxed font-light">
                "We are but time-travelers, leaving marks on a shore the tide has yet to reach."
              </p>
            </header>

            {capsules.length === 0 ? (
              <div className="py-20 text-center border-y border-black/[0.03] flex flex-col items-center">
                <h3 className="serif text-2xl mb-3 text-neutral-400 font-light italic">The chronicle is silent.</h3>
                <p className="text-neutral-400 text-[8px] tracking-[0.5em] uppercase mb-8 font-bold">Will you write today?</p>
                <Button variant="outline" onClick={() => navigateTo('CREATE')}>Compose Entry</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 border-t border-l border-black/[0.04]">
                {capsules.map((capsule) => (
                  <CapsuleCard 
                    key={capsule.id} 
                    capsule={capsule} 
                    onClick={() => {
                      setSelectedCapsuleId(capsule.id);
                      analytics.viewDetail(capsule.id);
                      setCurrentView('DETAIL');
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {currentView === 'CREATE' && (
          <CreateCapsule 
            capsules={capsules}
            profile={profile}
            onSave={handleSaveCapsule} 
            onCancel={() => navigateTo('VAULT')} 
            onRequestPremium={handleRequestPremium}
          />
        )}

        {currentView === 'DETAIL' && selectedCapsuleId && (
          <CapsuleDetail 
            capsule={capsules.find(c => c.id === selectedCapsuleId)!} 
            onClose={() => navigateTo('VAULT')} 
            onUpdate={handleUpdateCapsule}
            onDelete={handleDeleteCapsule}
          />
        )}

        {currentView === 'PROFILE' && (
          <Profile 
            profile={profile}
            capsules={capsules}
            onUpdate={setProfile}
            onImport={handleImportData}
            onClearData={handleClearData}
            onBack={() => navigateTo('VAULT')}
            onRequestPremium={handleRequestPremium}
          />
        )}
      </main>

      <footer className="w-full py-8 md:py-10 flex flex-col items-center gap-2 border-t border-black/[0.01] opacity-30 hover:opacity-100 transition-opacity duration-1000 mt-6">
        <p className="text-[7px] tracking-[0.6em] uppercase text-neutral-400 font-black">
          Curating Continuity
        </p>
        <p className="text-[6px] tracking-[0.3em] uppercase text-neutral-300 font-bold">
          Released under MIT License
        </p>
      </footer>

      {premiumModalFeature && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#fdfbf7]/80 backdrop-blur-sm p-6">
          <div className="bg-white border border-black/10 p-8 max-w-md w-full shadow-2xl animate-in fade-in zoom-in-95 duration-300">
            <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mb-6">
              <i className="fa-solid fa-lock text-neutral-400"></i>
            </div>
            <h3 className="serif text-3xl font-light mb-3 text-neutral-900">Coming Soon</h3>
            <p className="text-neutral-500 font-light leading-relaxed mb-8">
              The <span className="font-medium text-neutral-800">{premiumModalFeature}</span> feature will be available in the upcoming native app. Join the waitlist to be notified the exact second the locks engage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="/waitlist.html" 
                className="flex-1 bg-neutral-900 text-[#fdfbf7] text-[10px] tracking-[0.2em] uppercase py-4 px-6 text-center hover:bg-neutral-800 transition-colors font-bold no-underline"
              >
                Join Waitlist
              </a>
              <button 
                onClick={() => setPremiumModalFeature(null)}
                className="flex-1 border border-black/10 text-neutral-500 text-[10px] tracking-[0.2em] uppercase py-4 px-6 text-center hover:text-black hover:border-black/30 transition-colors font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainApp;
