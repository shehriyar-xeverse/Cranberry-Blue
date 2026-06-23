import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageId } from '../types';
import { portfolioItems } from '../data';
import { Sparkles, MapPin, ListFilter, ArrowRight } from 'lucide-react';
import LuxuryCard from '../components/LuxuryCard';

interface PortfolioProps {
  theme: 'gold' | 'lime'; // signature compatibility
  onNavigate: (pageId: PageId) => void;
}

export default function Portfolio({ onNavigate }: PortfolioProps) {
  const [filter, setFilter] = useState<'All' | 'Weddings' | 'Events'>('All');

  // Strict Lime theme variables
  const activeColor = 'text-[#ccff00]';
  const activeBg = 'bg-[#ccff00]';
  const activeBorder = 'border-[#ccff00]';

  // Global Animation Presets (Mandatory Rules)
  // Headings: Top -> Down, y: -80px
  const headingAnim = {
    hidden: { y: -80, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } 
    }
  };

  // Descriptions: Right -> Left, x: 100px
  const descAnim = {
    hidden: { x: 100, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1, 
      transition: { duration: 0.9, ease: [0.25, 1, 0.5, 1] } 
    }
  };

  const filteredItems = filter === 'All' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === filter);

  return (
    <div className="w-full pt-20">
      {/* Narrative Header */}
      <section className="py-24 bg-gradient-to-b from-[#030305] to-[#010101] relative border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            variants={headingAnim}
            initial="hidden"
            animate="visible"
            className="flex items-center justify-center gap-2 mb-4"
          >
            <Sparkles className={`w-4 h-4 ${activeColor}`} />
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-neutral-500">
              The Vault
            </span>
          </motion.div>

          <motion.h1
            variants={headingAnim}
            initial="hidden"
            animate="visible"
            className="font-serif text-4xl sm:text-6xl lg:text-7xl tracking-normal text-white mb-6 uppercase"
          >
            Sought-After <span className={`italic font-light ${activeColor}`}>Compositions</span>
          </motion.h1>

          <motion.p
            variants={descAnim}
            initial="hidden"
            animate="visible"
            className="text-neutral-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed"
          >
            Review our historic orchestrations. High-society weddings, immersive corporate activations, and royal galas, styled globally and documented with editorial rigor.
          </motion.p>
        </div>
      </section>

      {/* Interactive Category Filter Menu */}
      <section className="py-8 bg-neutral-950/45 border-b border-white/5 sticky top-[64px] sm:top-[72px] z-35 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ListFilter className={`w-4 h-4 ${activeColor}`} />
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-neutral-500">
              CURATED FILTERS:
            </span>
          </div>

          <div className="flex gap-2">
            {(['All', 'Weddings', 'Events'] as const).map((catName) => {
              const worksActive = filter === catName;
              return (
                <button
                  key={catName}
                  onClick={() => setFilter(catName)}
                  className={`px-4 py-2 rounded-full text-[10px] font-medium tracking-[0.15em] uppercase transition-all duration-300 pointer-events-auto cursor-pointer border ${
                    worksActive
                      ? 'border-[#ccff00] text-[#ccff00] bg-[#ccff00]/10 shadow-[0_0_10px_rgba(204,255,0,0.15)]'
                      : 'border-white/5 text-neutral-400 hover:text-white hover:border-white/10'
                  }`}
                >
                  {catName}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Masonry / Bento Grid Container */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                >
                  <LuxuryCard
                    bgImage={item.image}
                    category={item.category}
                    cursorText="Inspect"
                    className="h-[430px]"
                  >
                    <div className="flex items-center gap-1 text-neutral-400 mb-2">
                      <MapPin className="w-3.5 h-3.5 text-[#ccff00]" />
                      <span className="font-mono text-[9px] tracking-wider uppercase">{item.location}</span>
                    </div>

                    <h3 className="font-serif text-xl text-white group-hover:text-[#ccff00] transition-colors duration-500">
                      {item.title}
                    </h3>
                    <p className={`font-serif text-xs italic ${activeColor} mt-1`}>
                      {item.subtitle}
                    </p>
                    
                    <p className="text-neutral-300 text-xs leading-relaxed mt-3 line-clamp-3">
                      {item.description}
                    </p>

                    <button 
                      onClick={() => onNavigate('contact')}
                      className={`inline-flex items-center gap-2 text-[9px] tracking-[0.2em] font-medium uppercase mt-5 p-1 hover:font-bold transition-all ${activeColor}`}
                    >
                      Commission style
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </LuxuryCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

        </div>
      </section>

      {/* Absolute Bottom CTA */}
      <section className="py-24 bg-gradient-to-t from-neutral-950 to-black text-center relative overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-neutral-500 mb-2 block">
            THE COMMISSION CORRIDOR
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-white mb-6">Inspired by These Visions?</h2>
          <p className="text-xs text-neutral-400 max-w-md mx-auto mb-10 leading-relaxed">
            Every event we construct is 100% custom. Let’s adapt these standards to your location and sovereign goals.
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className={`px-10 py-5 text-xs font-semibold tracking-[0.25em] uppercase border ${activeBorder} ${activeBg} text-neutral-900 rounded-full hover:bg-white hover:text-black hover:border-white transition-all cursor-pointer`}
          >
            Start your brief
          </button>
        </div>
      </section>
    </div>
  );
}
