
import React, { useState, useEffect } from 'react';
import { Capsule, ViewState, UserProfile } from './types';
import { CapsuleCard } from './components/CapsuleCard';
import { CreateCapsule } from './components/CreateCapsule';
import { CapsuleDetail } from './components/CapsuleDetail';
import { Profile } from './components/Profile';
import { Button } from './components/Button';

const DEFAULT_PROFILE: UserProfile = {
  name: 'L. Van-Tassel',
  bio: 'Capturing the fragments of today for the clarity of tomorrow.',
  joinedDate: Date.now(),
};

const App: React.FC = () => {
  const [capsules, setCapsules] = useState<Capsule[]>([]);
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [currentView, setCurrentView] = useState<ViewState>('VAULT');
  const [selectedCapsuleId, setSelectedCapsuleId] = useState<string | null>(null);

  useEffect(() => {
    const savedCapsules = localStorage.getItem('chronos_capsules');
    const savedProfile = localStorage.getItem('chronos_profile');
    if (savedCapsules) setCapsules(JSON.parse(savedCapsules));
    if (savedProfile) setProfile(JSON.parse(savedProfile));
  }, []);

  useEffect(() => {
    localStorage.setItem('chronos_capsules', JSON.stringify(capsules));
  }, [capsules]);

  useEffect(() => {
    localStorage.setItem('chronos_profile', JSON.stringify(profile));
  }, [profile]);

  const handleSaveCapsule = (newCapsule: Capsule) => {
    setCapsules([newCapsule, ...capsules]);
    setCurrentView('VAULT');
  };

  const handleUpdateCapsule = (updated: Capsule) => {
    setCapsules(capsules.map(c => c.id === updated.id ? updated : c));
  };

  const handleDeleteCapsule = (id: string) => {
    setCapsules(capsules.filter(c => c.id !== id));
    setCurrentView('VAULT');
  };

  return (
    <div className="min-h-screen flex flex-col text-neutral-900 bg-[#fdfbf7]">
      {/* Subtle Atmospheric Depth Line */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-200/40 to-transparent pointer-events-none z-50"></div>

      {/* Navigation */}
      <nav className="p-8 md:p-10 flex justify-between items-center max-w-7xl mx-auto w-full border-b border-black/[0.03]">
        <div 
          className="cursor-pointer group" 
          onClick={() => setCurrentView('VAULT')}
        >
          <h1 className="text-2xl tracking-[0.3em] font-light uppercase">
            Chronos
            <span className="block h-px w-0 group-hover:w-full bg-black transition-all duration-1000 mt-2"></span>
          </h1>
        </div>

        <div className="flex gap-10 items-center">
          <button 
            onClick={() => setCurrentView('PROFILE')}
            className={`text-[9px] tracking-[0.4em] uppercase transition-all font-bold ${currentView === 'PROFILE' ? 'text-black' : 'text-neutral-300 hover:text-neutral-500'}`}
          >
            Memoir
          </button>
          <button 
            onClick={() => setCurrentView('CREATE')}
            className="w-9 h-9 flex items-center justify-center border border-black/5 rounded-full hover:bg-black hover:text-white transition-all duration-700 shadow-sm"
          >
            <i className="fa-solid fa-plus text-[10px]"></i>
          </button>
        </div>
      </nav>

      <main className="flex-grow max-w-7xl mx-auto px-8 md:px-10 py-12 w-full">
        {currentView === 'VAULT' && (
          <div className="fade-up">
            <header className="mb-16">
              <p className="serif italic text-2xl text-neutral-400 max-w-xl leading-relaxed font-light">
                "We are but time-travelers, leaving marks on a shore the tide has yet to reach."
              </p>
            </header>

            {capsules.length === 0 ? (
              <div className="py-32 text-center border-y border-black/[0.03] flex flex-col items-center">
                <h3 className="serif text-3xl mb-4 text-neutral-300 font-light italic">The chronicle is silent.</h3>
                <p className="text-neutral-400 text-[9px] tracking-[0.5em] uppercase mb-10 font-bold">Will you write today?</p>
                <Button variant="outline" onClick={() => setCurrentView('CREATE')}>Compose Entry</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 border-t border-l border-black/[0.04]">
                {capsules.map((capsule) => (
                  <CapsuleCard 
                    key={capsule.id} 
                    capsule={capsule} 
                    onClick={() => {
                      setSelectedCapsuleId(capsule.id);
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
            onSave={handleSaveCapsule} 
            onCancel={() => setCurrentView('VAULT')} 
          />
        )}

        {currentView === 'DETAIL' && selectedCapsuleId && (
          <CapsuleDetail 
            capsule={capsules.find(c => c.id === selectedCapsuleId)!} 
            onClose={() => setCurrentView('VAULT')} 
            onUpdate={handleUpdateCapsule}
            onDelete={handleDeleteCapsule}
          />
        )}

        {currentView === 'PROFILE' && (
          <Profile 
            profile={profile}
            capsules={capsules}
            onUpdate={setProfile}
            onClearData={() => {
              localStorage.clear();
              window.location.reload();
            }}
            onBack={() => setCurrentView('VAULT')}
          />
        )}
      </main>

      <footer className="w-full py-16 flex flex-col items-center gap-3 border-t border-black/[0.01] opacity-30 hover:opacity-100 transition-opacity duration-1000 mt-12">
        <p className="text-[8px] tracking-[0.6em] uppercase text-neutral-400 font-black">
          Curating Continuity
        </p>
        <p className="text-[7px] tracking-[0.3em] uppercase text-neutral-300 font-bold">
          Released under MIT License
        </p>
      </footer>
    </div>
  );
};

export default App;
