import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './Button';
import { motion } from 'motion/react';

const DoomscrollingLanding: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col text-neutral-900 bg-[#fdfbf7] selection:bg-neutral-900 selection:text-[#fdfbf7]">
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-200/40 to-transparent pointer-events-none z-50"></div>

      <main className="flex-grow flex items-center justify-center px-6 py-16 md:py-24 w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto w-full"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.1] mb-8">
            Your brain has 50 open tabs. <br className="hidden md:block" />
            <span className="serif italic text-neutral-500">Melatonin won't close them.</span>
          </h1>

          <p className="text-lg md:text-xl text-neutral-600 font-light leading-relaxed mb-12 max-w-xl">
            Going from 12 hours of screen time straight into a dark, silent room guarantees a cortisol spike. You don't need a sleep supplement; you need a physical place for your brain to land.
          </p>

          <div className="space-y-8 text-base md:text-lg text-neutral-800 font-light leading-relaxed mb-16 max-w-xl">
            <p>
              We've all been trapped in the 3 AM loop. You try to fix your productivity by day, but by night, your brain is so exhausted that it defaults to doomscrolling just to numb the noise. App blockers don't work because you just bypass them. Willpower fails when you are tired.
            </p>
            
            <p>
              Instead of a chemical knockout or punishing yourself with more restrictions, try a psychological hard reset.
            </p>
            
            <p>
              Chronos is a strictly local-first, zero-knowledge digital vault. It bypasses the cloud entirely. It exists to do one thing: force you to write exactly <em className="serif italic">one</em> sentence before bed to seal the day. That tiny bit of intentional friction acts as a temporal anchor. It tells your nervous system the day is actually over.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <Button 
              onClick={() => navigate('/')}
              className="w-full sm:w-auto text-sm tracking-[0.2em] uppercase py-4 px-8"
            >
              Build Your First Anchor &rarr;
            </Button>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default DoomscrollingLanding;
