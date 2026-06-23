import { useEffect, useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ActiveTheme } from '../types';

interface PageTransitionProps {
  children: ReactNode;
  pageKey: string;
  theme: ActiveTheme;
}

export default function PageTransition({ children, pageKey, theme }: PageTransitionProps) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);

  useEffect(() => {
    // When the key changes, trigger route loading transition
    setIsTransitioning(true);

    // Scroll back to absolute top of page instantly on route switch
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });

    const loadTimer = setTimeout(() => {
      setDisplayChildren(children);
      setIsTransitioning(false);
    }, 600); // Luxury slide timing duration

    return () => clearTimeout(loadTimer);
  }, [pageKey, children]);

  return (
    <div className="relative min-h-screen">
      {/* Route-level Micro Loading Progress Bar */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ scaleX: 0, transformOrigin: 'left' }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 1, opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="fixed top-0 left-0 right-0 h-[2px] z-[9999]"
            style={{
              backgroundColor: theme === 'gold' ? '#d4af37' : '#ccff00',
              boxShadow: theme === 'lime' ? '0 0 8px #ccff00' : 'none',
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key={pageKey + (isTransitioning ? '-transitioning' : '-ready')}
          initial={{ opacity: 0, scale: 0.98, y: 15 }}
          animate={{ 
            opacity: isTransitioning ? 0 : 1, 
            scale: isTransitioning ? 0.98 : 1,
            y: isTransitioning ? 15 : 0,
            transition: { 
              duration: 0.8, 
              ease: [0.16, 1, 0.3, 1], // Custom Awwwards power cubic-bezier
              staggerChildren: 0.1
            }
          }}
          exit={{ 
            opacity: 0, 
            scale: 0.98, 
            y: -15,
            transition: { duration: 0.4, ease: 'easeIn' }
          }}
          className="w-full min-h-screen"
        >
          {displayChildren}
        </motion.div>
      </AnimatePresence>

      {/* Screen swipe overlay on route swap */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[9990] bg-black/40 backdrop-blur-md flex items-center justify-center"
          >
            {/* Minimal cinematic loader spinner matching current theme */}
            <div className="flex flex-col items-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
                className="w-8 h-8 rounded-full border-2 border-t-transparent"
                style={{
                  borderColor: theme === 'gold' ? 'rgba(212,175,55,0.2)' : 'rgba(204,255,0,0.2)',
                  borderTopColor: theme === 'gold' ? '#d4af37' : '#ccff00',
                }}
              />
              <span className="font-mono text-[9px] tracking-[0.25em] text-white/40 mt-4 uppercase">
                Bridging Journeys...
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
