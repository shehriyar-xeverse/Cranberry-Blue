import { motion } from 'motion/react';
import { PageId } from '../types';
import { images } from '../data';
import { Sparkles, Terminal, ShieldAlert, Cpu } from 'lucide-react';
import LuxuryCard from '../components/LuxuryCard';

interface EventsProps {
  theme: 'gold' | 'lime'; // signature compatibility
  onNavigate: (pageId: PageId) => void;
}

export default function Events({ onNavigate }: EventsProps) {
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

  const services = [
    {
      icon: <Terminal className={`w-5 h-5 ${activeColor}`} />,
      title: 'Spatial Coordinates & Set Mapping',
      desc: 'We construct full physical scaffolding and projection rigs. This allows classic architecture to blend seamlessly with dynamic graphics and immersive ambient mapping.'
    },
    {
      icon: <ShieldAlert className={`w-5 h-5 ${activeColor}`} />,
      title: 'Discreet Secure Corridors',
      desc: 'Vetted teams manage secure drop zones, state affairs entry lanes, and biometric checkpoints for sovereign and VIP guests under tight privacy guarantees.'
    },
    {
      icon: <Cpu className={`w-5 h-5 ${activeColor}`} />,
      title: 'Bespoke Lighting Scenography',
      desc: 'Sleek, low-frequency quiet lasers, color temperature controls, and ambient dark drapes that completely recreate the indoor skyline on request.'
    }
  ];

  return (
    <div className="w-full pt-20">
      {/* Immersive Header */}
      <section className="py-24 bg-gradient-to-b from-[#020204] to-[#0a0a0f] relative border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            variants={headingAnim}
            initial="hidden"
            animate="visible"
            className="flex items-center justify-center gap-2 mb-4"
          >
            <Sparkles className={`w-4 h-4 ${activeColor}`} />
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-neutral-500">
              Creative Agency Curation
            </span>
          </motion.div>

          <motion.h1
            variants={headingAnim}
            initial="hidden"
            animate="visible"
            className="font-serif text-4xl sm:text-6xl lg:text-7xl tracking-normal text-white mb-6 uppercase"
          >
            High-Impact <span className={`italic font-light ${activeColor}`}>Corporate</span> & Private Events
          </motion.h1>

          <motion.p
            variants={descAnim}
            initial="hidden"
            animate="visible"
            className="text-neutral-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed"
          >
            Concept development, spatial layout design, and full-production management. We create luxury corporate environments, private award afterparties, and milestones.
          </motion.p>
        </div>
      </section>

      {/* Main Focus: Immersive Design Bento */}
      <section className="py-24 bg-[#050508]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Visual Block (LEFT -> RIGHT animation) */}
            <motion.div
              variants={imageAnim}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative aspect-[16/10] sm:aspect-[4/3] rounded overflow-hidden shadow-2xl border border-white/5 interactive-card"
              data-cursor-text="Glitz"
            >
              <img
                src={images.corporateLuxury}
                alt="Elite stage setup"
                className="w-full h-full object-cover filter brightness-90 hover:scale-105 duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-neutral-950/40" />
              <div className="absolute top-6 left-6 p-4 bg-black/60 rounded border border-white/5">
                <span className="font-mono text-[9px] tracking-wider text-neutral-300">ZENITH GROUP GALA</span>
              </div>
            </motion.div>

            {/* Narrative Area */}
            <div>
              <span className="font-mono text-[10px] tracking-[0.25em] text-neutral-500 uppercase">
                SCENE DIRECTION
              </span>
              <h3 className="font-serif text-2xl sm:text-4xl text-white mt-1 mb-6">
                Interactive Scenic Craft
              </h3>
              <div className="space-y-6 text-neutral-400 text-xs sm:text-sm leading-relaxed">
                <p>
                  Events must do more than keep schedule; they must construct a cohesive world. For our corporate clients, we translate brand targets into tactile design components—combining quiet hydraulics, dynamic screens, and ambient soundscapes.
                </p>
                <p>
                  We manage client lists with extreme security benchmarks. From private chateaux takeovers to high-altitude tower events, we coordinate all variables to guarantee standard delivery.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Services Breakdown Blocks Grid */}
      <section className="py-24 bg-[#010101] border-t border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="font-mono text-[9px] tracking-[0.25em] text-neutral-500 uppercase">
              EXPERTISE SEGMENTS
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl text-white mt-1">Full-Production Capabilities</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((serv, sIdx) => (
              <motion.div
                key={sIdx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: sIdx * 0.15, duration: 0.8 }}
                className="p-8 bg-neutral-900/30 hover:bg-neutral-900/50 border border-white/5 hover:border-white/10 rounded-sm interactive-card text-left transition-all"
              >
                <div className="mb-6 p-3 bg-white/5 rounded-full w-fit">
                  {serv.icon}
                </div>
                <h4 className="font-serif text-lg text-white mb-4">{serv.title}</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">{serv.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mini Portfolio Preview (Corporate) */}
      <section className="py-24 bg-[#050508]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-neutral-500 mb-2 block">
            HISTORIC MILESTONES
          </span>
          <h3 className="font-serif text-3xl sm:text-5xl text-white mb-16">
            Corporate & Gala <span className={`italic font-light ${activeColor}`}>Highlights</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                img: images.glamEvents,
                title: 'The Crimson Awards Afterparty',
                desc: 'Created an underground velvet-walled lounge lounge with panoramic laser mappings and bespoke craft bars.',
                venue: 'BFI Southbank, London'
              },
              {
                img: images.corporateLuxury,
                title: 'Zenith Technology Summit',
                desc: 'Rebuilt empty industrial terminals into fully soundproofed auditoriums and VIP discussion lounge areas.',
                venue: 'Battersea Power Station'
              }
            ].map((port, pIdx) => (
              <motion.div
                key={pIdx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: pIdx * 0.1, duration: 0.7 }}
              >
                <LuxuryCard
                  bgImage={port.img}
                  onClick={() => onNavigate('portfolio')}
                  cursorText="Explore"
                  category={port.venue}
                  className="h-[380px]"
                >
                  <h4 className="font-serif text-xl text-white group-hover:text-[#ccff00] transition-colors">{port.title}</h4>
                  <p className="text-xs text-neutral-300 leading-relaxed mt-2 line-clamp-3">{port.desc}</p>
                </LuxuryCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Weddings and Corporate Events */}
      <section className="py-24 bg-black text-center relative overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-neutral-500 mb-2 block">
            CUSTOM BRIEFINGS
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-white mb-6">Propose Your Concept</h2>
          <p className="text-xs text-neutral-400 max-w-md mx-auto mb-10 leading-relaxed">
            Send us your core parameters. Vetted producers reply with full concept layouts within 48 hours.
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className={`px-10 py-5 text-xs font-semibold tracking-[0.25em] uppercase border ${activeBorder} ${activeBg} text-neutral-900 rounded-full hover:bg-white hover:text-black hover:border-white transition-all cursor-pointer`}
          >
            Submit RFP
          </button>
        </div>
      </section>
    </div>
  );
}
