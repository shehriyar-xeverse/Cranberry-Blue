import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface GlobalLoaderProps {
  theme: 'gold' | 'lime'; // kept in signature for compatibility if any
  isInitialLoadComplete: boolean;
  onInitialLoadComplete: () => void;
}

export default function GlobalLoader({
  isInitialLoadComplete,
  onInitialLoadComplete,
}: GlobalLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(1); // 1 = entry, 2 = pulse logo, 3 = active loader, 4 = motto, 5 = reveal ready

  // Initial loader progress simulation with cinematic timings
  useEffect(() => {
    if (isInitialLoadComplete) return;

    // Transitions across cinematic stages
    const timer1 = setTimeout(() => setStage(2), 850);
    const timer2 = setTimeout(() => setStage(3), 1800);
    const timer3 = setTimeout(() => setStage(4), 2800);
    const timer4 = setTimeout(() => {
      setStage(5);
      onInitialLoadComplete();
    }, 4200);

    const intv = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(intv);
          return 100;
        }
        const step = Math.random() * 3 + 1.2;
        return Math.min(100, prev + step);
      });
    }, 40);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearInterval(intv);
    };
  }, [isInitialLoadComplete, onInitialLoadComplete]);

  return (
    <AnimatePresence>
      {!isInitialLoadComplete && (
        <motion.div
          id="global-portal-loader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.05,
            filter: 'blur(15px)',
            transition: { duration: 1.3, ease: [0.25, 1, 0.5, 1] }
          }}
          className="fixed inset-0 z-[9999] bg-[#010101] flex flex-col items-center justify-center select-none text-white overflow-hidden"
        >
          {/* Subtle noise background texture */}
          <div className="absolute inset-0 noise-overlay h-full w-full opacity-[0.03]" />

          {/* Glowing ambient background lights (LIME ONLY) */}
          <motion.div 
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.12, 0.22, 0.12],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="absolute rounded-full w-[60vw] h-[60vw] blur-[150px] pointer-events-none bg-[#ccff00]/15"
            style={{
              top: '20%',
              left: '20%',
            }}
          />

          {/* Logo Reveal Core */}
          <div className="relative flex flex-col items-center justify-center max-w-sm px-6 text-center">
            {/* Monogram reveal */}
            <motion.div
              initial={{ scale: 0.75, opacity: 0 }}
              animate={{ 
                scale: stage >= 2 ? [1, 1.04, 1] : 1,
                opacity: 1, 
              }}
              transition={{ 
                scale: stage >= 2 ? { duration: 2, repeat: Infinity, ease: 'easeInOut' } : { duration: 1 },
                default: { duration: 1.2, ease: [0.25, 1, 0.5, 1] }
              }}
              className="mb-4"
            >
              <span 
                className="font-serif text-8xl md:text-9xl font-semibold tracking-wider block leading-none text-[#ccff00]"
                style={{
                  textShadow: '0 0 35px rgba(204, 255, 0, 0.45)',
                }}
              >
                CB
              </span>
            </motion.div>

            {/* Brand full name slide, elegant serif font */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: stage >= 2 ? 1 : 0 }}
              transition={{ duration: 0.8 }}
              className="font-serif text-lg tracking-[0.55em] font-medium uppercase text-center mb-8 whitespace-nowrap text-neutral-300"
            >
              CRANBERRY BLUE
            </motion.h1>

            {/* Progress status line indicator */}
            <div className="w-56 h-[1.5px] bg-white/5 overflow-hidden relative rounded mb-6">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-[#ccff00]"
                style={{
                  boxShadow: '0 0 10px #ccff00',
                }}
              />
            </div>

            {/* Brand Storytelling Stage motto text (Subtle Fade Transitions) */}
            <div className="h-6 relative w-72 flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                {stage === 2 && (
                  <motion.p
                    key="stage2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 0.5, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="font-mono text-[9px] tracking-[0.25em] uppercase text-neutral-400 absolute"
                  >
                    ORCHESTRATING GRANDEUR
                  </motion.p>
                )}
                {stage === 3 && (
                  <motion.p
                    key="stage3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 0.7, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="font-mono text-[9px] tracking-[0.25em] uppercase text-[#ccff00] absolute"
                  >
                    PREPARING CINEMATIC EXPERIENCE...
                  </motion.p>
                )}
                {stage === 4 && (
                  <motion.p
                    key="stage4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="font-serif text-[11px] tracking-[0.2em] font-medium italic text-[#ccff00] absolute"
                  >
                    “Crafting Luxury Experiences”
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Reading progress ticker */}
            <span className="font-mono text-[8.5px] tracking-[0.2em] mt-8 uppercase text-neutral-600">
              EST. LONDON | {Math.floor(progress)}%
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
