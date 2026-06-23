import { motion } from 'motion/react';
import { PageId } from '../types';
import { images } from '../data';
import { Sparkles, MapPin, Award, CheckCircle } from 'lucide-react';
import LuxuryCard from '../components/LuxuryCard';

interface WeddingsProps {
  theme: 'gold' | 'lime'; // signature compatibility
  onNavigate: (pageId: PageId) => void;
}

export default function Weddings({ onNavigate }: WeddingsProps) {
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

  const steps = [
    {
      num: '01',
      title: 'Grand Venue Selection',
      tagline: 'Chateaux, Palaces & Private Sanctuaries',
      desc: 'Through our vetted connections with stately properties across Britain, France, and Italy, we negotiate private takeovers of heritage chateaux, ancient abbeys, and private islands.'
    },
    {
      num: '02',
      title: 'Bespoke Creative Design',
      tagline: 'Visual Masterminding & Spatial Scenography',
      desc: 'We construct full-scale 3D wireframe simulations, detailing lighting temperatures, floating floral structures, and bespoke linen drapes to test sensory density before build day.'
    },
    {
      num: '03',
      title: 'Elite Supplier Curation',
      tagline: 'Michelin Chefs & Multi-Disciplinary Artisans',
      desc: 'We source world-renowned pastry chefs, couture gown builders, multi-grammy award performers, and family-owned linens weavers to compile a cohesive, bespoke supply chain.'
    },
    {
      num: '04',
      title: 'Rigorous Technical Command',
      tagline: 'Minute-by-Minute Logistics Execution',
      desc: 'A secure operations corridor manages executive flight arrivals, private charter logistics, coordinate backups, and discrete VIP security protocols for perfect safety.'
    }
  ];

  return (
    <div className="w-full pt-20">
      {/* Editorial Header Block */}
      <section className="py-24 bg-gradient-to-b from-[#040407] to-[#010101] relative border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            variants={headingAnim}
            initial="hidden"
            animate="visible"
            className="flex items-center justify-center gap-2 mb-4"
          >
            <Sparkles className={`w-4 h-4 ${activeColor}`} />
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-neutral-500">
              Couture Weddings
            </span>
          </motion.div>
          
          <motion.h1
            variants={headingAnim}
            initial="hidden"
            animate="visible"
            className="font-serif text-4xl sm:text-6xl lg:text-7xl tracking-normal text-white mb-6 uppercase"
          >
            Bespoke <span className={`italic font-light ${activeColor}`}>Nuptial</span> Engineering
          </motion.h1>

          <motion.p
            variants={descAnim}
            initial="hidden"
            animate="visible"
            className="text-neutral-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed"
          >
            We curate high-society luxury weddings worldwide. From major estate rentals in Oxfordshire to cliffside ceremonies on the Amalfi Coast, every movement is treated as a historic chapter.
          </motion.p>
        </div>
      </section>

      {/* Main Focus: Immersive Process Section */}
      <section className="py-24 bg-[#0a0a0f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Split Left - Visual layout */}
            <div className="space-y-12 lg:sticky lg:top-32">
              <motion.div
                variants={imageAnim}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="relative aspect-[4/5] rounded overflow-hidden shadow-2xl border border-white/5 interactive-card"
                data-cursor-text="Estates"
              >
                <img
                  src={images.heroWedding}
                  alt="Elite wedding banquet"
                  className="w-full h-full object-cover filter brightness-90 hover:scale-105 duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-6 left-6 flex items-center gap-2 text-white">
                  <MapPin className={`w-4 h-4 ${activeColor}`} />
                  <span className="font-mono text-xs tracking-wider">Blenheim Palace, Oxfordshire</span>
                </div>
              </motion.div>

              <div className="p-8 bg-neutral-950/80 rounded border border-white/5">
                <h3 className="font-serif text-lg text-white mb-3">Sovereign Standard</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  We limit our output to ten weddings per calendar year. This preserves our team’s emotional availability, engineering focus, and access to premium supplier schedules.
                </p>
                <div className="h-[1px] bg-white/5 my-6" />
                <div className="flex items-center gap-4">
                  <Award className={`w-5 h-5 ${activeColor}`} />
                  <span className="text-[10px] uppercase tracking-widest font-mono text-neutral-300">Certified Vogue Elite Planner</span>
                </div>
              </div>
            </div>

            {/* Split Right - The Process steps */}
            <div className="space-y-8">
              <div className="mb-12">
                <span className="font-mono text-[9px] tracking-[0.25em] text-neutral-500 uppercase">
                  THE GOLDEN TIMELINE
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-white mt-1">Our Orchestration Paradigm</h2>
              </div>

               {steps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: idx * 0.15, duration: 0.8 }}
                  className="p-8 bg-neutral-900/30 hover:bg-neutral-900/50 border border-white/5 rounded transition-all group interactive-card"
                >
                  <div className="flex items-start justify-between">
                    <span className={`font-mono text-lg font-bold ${activeColor}`}>
                      {step.num}
                    </span>
                    <CheckCircle className="w-5 h-5 text-neutral-700 group-hover:text-[#ccff00] transition-colors" />
                  </div>
                  <h4 className="font-serif text-xl text-white mt-3">{step.title}</h4>
                  <p className="font-mono text-[10px] tracking-wider text-neutral-500 uppercase mt-0.5">{step.tagline}</p>
                  <p className="text-xs text-neutral-400 mt-4 leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* Mini Portfolio Preview Section */}
      <section className="py-24 bg-[#050508] border-t border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-neutral-500 mb-2 block">
            VISUAL METAPHORS
          </span>
          <h3 className="font-serif text-3xl sm:text-5xl text-white mb-16">
            Sought-After <span className={`italic font-light ${activeColor}`}>Nuance</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { img: images.champagneLuxury, title: 'Champagne Towers', desc: 'Pre-ordered vintage collections served with physical synchronized choreography.' },
              { img: images.heroDecor, title: 'Floating Flora', desc: 'Overhead cloud styling of hand-preserved ivory standard callas.' },
              { img: images.champagneLuxury, title: 'Bespoke Pavilions', desc: 'Custom soundproofed tents constructed in historic hillsides.' },
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
                  cursorText="Browse"
                  className="h-[340px]"
                >
                  <h4 className="font-serif text-lg text-white group-hover:text-[#ccff00] transition-colors">{port.title}</h4>
                  <p className="text-xs text-neutral-300 leading-relaxed mt-2 line-clamp-3">{port.desc}</p>
                </LuxuryCard>
              </motion.div>
            ))}
          </div>

          <button
            onClick={() => onNavigate('portfolio')}
            className={`px-8 py-4 text-xs font-semibold tracking-[0.2em] uppercase border ${activeBorder} mt-16 rounded-full hover:bg-white hover:text-black hover:border-white transition-all cursor-pointer`}
          >
            Filter wedding gallery
          </button>
        </div>
      </section>

      {/* CTA weddings page */}
      <section className="py-24 bg-black text-center relative overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-neutral-500 mb-2 block">
            SECURE CONSULTATION
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-white mb-6">Let's Design Your Chapter</h2>
          <p className="text-xs text-neutral-400 max-w-md mx-auto mb-10 leading-relaxed">
            Contact us for standard rates and availability. We manage worldwide, sovereign execution seamlessly.
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className={`px-10 py-5 text-xs font-semibold tracking-[0.25em] uppercase border ${activeBorder} ${activeBg} text-neutral-900 rounded-full hover:bg-white hover:text-black hover:border-white transition-all cursor-pointer`}
          >
            Connect of affairs
          </button>
        </div>
      </section>
    </div>
  );
}
