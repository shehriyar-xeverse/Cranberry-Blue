import { motion } from 'motion/react';
import { PageId } from '../types';
import { images } from '../data';
import { Sparkles, Video, Compass } from 'lucide-react';
import LuxuryCard from '../components/LuxuryCard';

interface AboutProps {
  theme: 'gold' | 'lime'; // signature compatibility
  onNavigate: (pageId: PageId) => void;
}

export default function About({ onNavigate }: AboutProps) {
  const activeColor = 'text-[#ccff00]';
  const activeBg = 'bg-[#ccff00]';
  const activeBorder = 'border-[#ccff00]';

  // Global Animation Presets (Mandatory Rules)
  // Images: Left -> Right, x: -100px
  const imageAnim = {
    hidden: { x: -100, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { duration: 1.0, ease: [0.25, 1, 0.5, 1] } 
    }
  };

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

  const interviewQAs = [
    {
      q: "What defines a Cranberry Blue wedding or luxury event?",
      a: "It is an engineering composition, not a simple collection of decor. Everything must trace back to a unified design idea—from the tone of the strings down to the weave of the table linens. We don’t copy; we compile a fresh narrative."
    },
    {
      q: "How do you manage complex multi-day events overseas?",
      a: "By managing our supplier database with absolute discipline. Over fifteen years, we built exclusive relationships with Michelin-starred catering consultancies, historical takeovers, and elite aviation lines. This ensures we control logistical variables."
    },
    {
      q: "Why do you limit your bookings to ten per season?",
      a: "To guarantee my personal presence, technical focus, and emotional availability for every client. Hand-constructed luxury weddings require high-precision thinking; you cannot run fifty of these on a corporate assembly line."
    }
  ];

  return (
    <div className="w-full pt-20">
      {/* Narrative Editorial Header */}
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
              The Founder Profile
            </span>
          </motion.div>

          <motion.h1
            variants={headingAnim}
            initial="hidden"
            animate="visible"
            className="font-serif text-4xl sm:text-6xl lg:text-7xl tracking-normal text-white mb-6 uppercase"
          >
            Orchestrated By <span className={`italic font-light ${activeColor}`}>Melanie Helen</span>
          </motion.h1>

          <motion.p
            variants={descAnim}
            initial="hidden"
            animate="visible"
            className="text-neutral-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed"
          >
            Fifteen years at the leading edge of Britain's boutique design industry. Melanie Helen combines her design training and high-level logistics to mold elite spaces globally.
          </motion.p>
        </div>
      </section>

      {/* Narrative Section Interview Block */}
      <section className="py-24 bg-[#0a0a0f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Visual Portrait - Left (LEFT -> RIGHT ANIM) */}
            <motion.div
              variants={imageAnim}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative aspect-[3/4] w-full max-w-md mx-auto rounded overflow-hidden shadow-2xl border border-white/5 interactive-card"
              data-cursor-text="Melanie"
            >
              <img
                src={images.founderMelanie}
                alt="Melanie Helen headshot portrait"
                className="w-full h-full object-cover filter grayscale contrast-105 saturate-50 hover:grayscale-0 duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-neutral-950/20" />
            </motion.div>

            {/* Q&A Interview Area - Right */}
            <div className="flex flex-col">
              <span className="font-mono text-[10px] tracking-[0.25em] text-neutral-500 uppercase mb-4 block">
                MINUTES WITH MELANIE
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl text-white mb-10 leading-tight">
                Refining the <span className={`italic font-light ${activeColor}`}>Definition</span> of Custom Curation
              </h2>

              <div className="space-y-8">
                {interviewQAs.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: index * 0.15, duration: 0.8 }}
                    className="p-6 bg-neutral-900/20 hover:bg-neutral-900/40 border border-white/5 rounded-sm transition-all"
                  >
                    <h4 className={`font-serif text-lg font-medium ${activeColor} mb-3`}>
                      “ {item.q} ”
                    </h4>
                    <p className="text-sm text-neutral-400 leading-relaxed font-sans">
                      {item.a}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Cinematic Image Blocks Row */}
      <section className="py-24 bg-black border-t border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { img: images.heroDecor, title: 'Visual Rigor', icon: <Compass className="w-5 h-5" /> },
              { img: images.champagneLuxury, title: 'Sourcing Sovereignty', icon: <Sparkles className="w-5 h-5" /> },
              { img: images.brandPartner1, title: 'Absolute Discretion', icon: <Video className="w-5 h-5" /> }
            ].map((cell, cIdx) => (
              <LuxuryCard
                key={cIdx}
                bgImage={cell.img}
                cursorText="Glimpse"
                className="h-[340px]"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-1.5 rounded bg-[#ccff00]/10 ${activeColor}`}>
                    {cell.icon}
                  </div>
                  <h4 className="font-serif text-lg text-white font-medium">{cell.title}</h4>
                </div>
              </LuxuryCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section under About Page */}
      <section className="py-24 bg-gradient-to-b from-black to-neutral-950 text-center relative overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-neutral-500 mb-2 block">
            THE CONSULTATION CORRIDOR
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-white mb-6">Partner With Us</h2>
          <p className="text-xs text-neutral-400 max-w-md mx-auto mb-10 leading-relaxed">
            Let's coordinate an introductory discussion. Melanie Helen handles all high-society briefings worldwide under precise security.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => onNavigate('contact')}
              className={`px-8 py-4 text-xs font-semibold tracking-[0.25em] uppercase border ${activeBorder} ${activeBg} text-neutral-900 rounded-full hover:bg-white hover:text-black hover:border-white transition-all cursor-pointer`}
            >
              Request conversation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
