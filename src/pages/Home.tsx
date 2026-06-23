import { useState } from 'react';
import { motion } from 'motion/react';
import { PageId } from '../types';
import { images, trustedBrands, testimonials } from '../data';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, Instagram } from 'lucide-react';
import LuxuryCard from '../components/LuxuryCard';

interface HomeProps {
  theme: 'gold' | 'lime'; // mapped for signature compatibility
  onNavigate: (pageId: PageId) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Locked strictly on Lime theme colors
  const activeColor = 'text-[#ccff00]';
  const activeBorder = 'border-[#ccff00]';
  const activeBg = 'bg-[#ccff00]';

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

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="w-full">
      {/* 1. HERO SECTION */}
      <section className="relative h-screen min-h-[600px] w-full flex items-center justify-center overflow-hidden pt-20">
        {/* Parallax Atmospheric Zoom Image Background */}
        <div className="absolute inset-0 z-0">
          <motion.div 
            initial={{ scale: 1.15, opacity: 0 }}
            animate={{ 
              scale: 1.0, 
              opacity: 0.55,
              transition: { duration: 2.2, ease: [0.16, 1, 0.3, 1] } 
            }}
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${images.heroDecor})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/80" />
        </div>

        {/* Ambient Overlay lines and lights */}
        <div className="absolute inset-0 pointer-events-none flex justify-between px-10 md:px-24 border-x border-white/5 mx-auto max-w-7xl">
          <div className="w-[1px] h-full bg-white/5" />
          <div className="w-[1px] h-full bg-white/5" />
          <div className="w-[1px] h-full bg-white/5" />
        </div>

        {/* Hero Text content */}
        <div className="relative z-10 text-center max-w-4xl px-4 flex flex-col items-center">
          {/* CB Monogram Logo in Hero */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="mb-8"
          >
            <span className={`font-serif text-5xl md:text-6xl font-hairline tracking-[0.2em] block ${activeColor}`}>
              CB
            </span>
            <div className="w-8 h-[1px] bg-white/20 mx-auto mt-2" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.7 }}
            className="font-serif text-5xl sm:text-7xl lg:text-9xl tracking-[0.2em] leading-tight text-white mb-6 uppercase"
          >
            URATING <span className={`italic font-light ${activeColor}`}>EMOTIONS</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.6, y: 0 }}
            transition={{ duration: 1.0, delay: 1.0 }}
            className="text-xs sm:text-sm tracking-[0.4em] font-mono uppercase text-neutral-300 max-w-lg mb-10"
          >
            luxury wedding & event planning
          </motion.p>

      
        </div>

        {/* Scroll hint Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
          <span className="font-mono text-[9px] tracking-[0.3em] font-medium uppercase text-neutral-500 mb-1.5">
            Scroll To Enter
          </span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-[#ccff00]/30 to-transparent" />
        </div>
      </section>

      {/* 2. ABOUT TEASER INTRO */}
      <section className="py-24 md:py-32 bg-[#050508] relative border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Image (LEFT -> RIGHT, hidden-to-visible on Scroll) */}
            <motion.div
              variants={imageAnim}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="relative aspect-[4/5] md:aspect-[3/4] w-full max-w-md mx-auto overflow-hidden rounded-sm group interactive-card"
              data-cursor-text="Melanie"
            >
              {/* live animated margin borders */}
              <div className="absolute inset-0 p-1 rounded z-10 border border-white/10 group-hover:border-[#ccff00]/80 duration-500 pointer-events-none" />
              <img
                src={images.founderMelanie}
                alt="Melanie Helen Founder of Cranberry Blue"
                className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-6 left-6 right-6 p-6 bg-black/70 backdrop-blur-md rounded border border-white/5">
                <span className={`font-serif text-sm italic ${activeColor}`}>Melanie Helen</span>
                <p className="text-[10px] tracking-widest font-mono text-neutral-400 uppercase mt-1">Founder & Executive Director</p>
              </div>
            </motion.div>

            {/* Text elements */}
            <div className="flex flex-col">
              <motion.div
                variants={headingAnim}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex items-center gap-2 mb-4"
              >
                <Sparkles className={`w-4 h-4 ${activeColor}`} />
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-neutral-500">
                  ESTABLISHED EXCELLENCE
                </span>
              </motion.div>

              <motion.h3
                variants={headingAnim}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-normal text-white leading-tight mb-8"
              >
                Orchestrating <span className={`italic font-light ${activeColor}`}>Timeless</span> Splendor
              </motion.h3>

              <motion.div
                variants={descAnim}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-6 text-neutral-400 text-sm md:text-base leading-relaxed"
              >
                <p>
                  As one of Britain’s most celebrated boutique planners, Cranberry Blue commands a reputation for styling weddings and elite private gatherings that are conceptually magnificent and logistical masterpieces.
                </p>
                <p>
                  Founded by Melanie Helen, we curate high-society events worldwide from our London Mayfair base, aligning customized artistic set pieces with world-renowned caterers, musicians, and floral suppliers.
                </p>
                <button
                  onClick={() => onNavigate('about')}
                  className={`inline-flex items-center gap-3 text-xs tracking-[0.2em] font-medium uppercase mt-4 cursor-pointer hover:font-bold transition-all ${activeColor}`}
                >
                  Melanie’s profile
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. PHILOSOPHY SECTION */}
      <section className="py-24 bg-[#010101]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span 
            variants={headingAnim}
            initial="hidden"
            whileInView="visible"
            className="font-mono text-[10px] tracking-[0.3em] uppercase text-neutral-500 mb-4 block"
          >
            OUR SOVEREIGN MANIFESTO
          </motion.span>
          <motion.h3 
            variants={headingAnim}
            initial="hidden"
            whileInView="visible"
            className="font-serif text-3xl sm:text-5xl tracking-tight text-white mb-16"
          >
            The Cranberry <span className={`italic font-light ${activeColor}`}>Aesthetic</span>
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                num: 'I',
                title: 'Bespoke Blueprinting',
                desc: 'A blank canvas approach. We reject ready-made templates, ensuring every chandeliers height, flower pedigree, and cocktail pairing is engineered from zero.'
              },
              {
                num: 'II',
                title: 'Masterful Architecture',
                desc: 'Integrating advanced floral systems and structures to mold historic ballrooms or empty landscapes into comfortable, breathtaking sanctuaries.'
              },
              {
                num: 'III',
                title: 'Seamless Discretion',
                desc: 'Orchestrating high-security events for sovereign families, elite athletics, and business titans with flawless confidentiality guarantees.'
              }
            ].map((phil, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: idx * 0.15, duration: 0.8 }}
                className="p-8 bg-neutral-900/40 border border-white/5 rounded-sm flex flex-col items-center hover:border-white/10 group interactive-card transition-all"
              >
                <span className={`font-serif text-4xl block font-light mb-6 transition-colors duration-500 ${activeColor}`}>
                  {phil.num}
                </span>
                <h4 className="font-serif text-lg text-white mb-4">{phil.title}</h4>
                <p className="text-xs text-neutral-400 leading-relaxed text-center">{phil.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SERVICES PREVIEW BENTO - INTEGRATED WITH 3D LUXURY CARDS */}
      <section className="py-24 bg-[#0a0a0f] border-t border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
            <div>
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-neutral-500 mb-2 block">
                BEYOND TYPICAL PLANNING
              </span>
              <h3 className="font-serif text-3xl sm:text-5xl text-white">
                Sovereign <span className={`italic font-light ${activeColor}`}>Portfolios</span>
              </h3>
            </div>
            <button
              onClick={() => onNavigate('portfolio')}
              className={`text-xs tracking-[0.2em] font-medium uppercase mt-4 md:mt-0 cursor-pointer ${activeColor} flex items-center gap-2`}
            >
              Filter portfolios
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Weddings Card */}
            <LuxuryCard 
              bgImage={images.heroWedding}
              category="Elite Wedding service"
              onClick={() => onNavigate('weddings')}
              cursorText="Weddings"
              className="aspect-[16/10] min-h-[300px]"
            >
              <h4 className="font-serif text-2xl sm:text-3xl text-white mt-1 group-hover:text-[#ccff00] transition-colors">High-Society Nuptials</h4>
              <p className="text-xs text-neutral-300 mt-2 max-w-sm leading-relaxed">
                Bespoke scheduling, international concierge integration, and elite mastercraft styling worldwide.
              </p>
            </LuxuryCard>

            {/* Corporate/Private Events Card */}
            <LuxuryCard 
              bgImage={images.corporateLuxury}
              category="Corporate & Social design"
              onClick={() => onNavigate('events')}
              cursorText="Events"
              className="aspect-[16/10] min-h-[300px]"
            >
              <h4 className="font-serif text-2xl sm:text-3xl text-white mt-1 group-hover:text-[#ccff00] transition-colors">Brand Experiences</h4>
              <p className="text-xs text-neutral-300 mt-2 max-w-sm leading-relaxed">
                Immersive product launches, red carpets, and milestone balls curated with spatial precision.
              </p>
            </LuxuryCard>
          </div>
        </div>
      </section>

      {/* 5. TRUSTED PARTNER BRANDS GRID */}
      <section className="py-16 bg-[#030303] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-mono text-[9px] tracking-[0.25em] text-neutral-500 uppercase mb-8">
            As featured and certified by
          </p>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center opacity-65 hover:opacity-100 transition-opacity">
            {trustedBrands.map((brand, bIdx) => (
              <div key={bIdx} className="flex flex-col items-center p-3 border border-white/5 rounded bg-neutral-900/20">
                <span className="font-serif text-sm tracking-widest text-[#ccff00] font-medium whitespace-nowrap">
                  {brand.name}
                </span>
                <span className="text-[7px] font-mono tracking-widest text-neutral-500 uppercase mt-1">
                  {brand.country}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. INTERACTIVE TESTIMONIALS SLIDER */}
      <section className="py-24 bg-gradient-to-b from-[#050508] to-neutral-950 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-neutral-500 mb-4 block">
            PATRON CRITIQUES
          </span>

          <ChevronLeft className={`w-8 h-8 absolute left-0 top-1/2 -translate-y-1/2 ${activeColor} cursor-pointer hidden md:block opacity-40 hover:opacity-100`} onClick={prevTestimonial} />
          <ChevronRight className={`w-8 h-8 absolute right-0 top-1/2 -translate-y-1/2 ${activeColor} cursor-pointer hidden md:block opacity-40 hover:opacity-100`} onClick={nextTestimonial} />

          <div className="min-h-[220px] flex items-center justify-center">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-3xl"
            >
              <p className="font-serif text-xl sm:text-2xl lg:text-3xl font-light italic leading-relaxed text-neutral-100">
                "{testimonials[currentTestimonial].quote}"
              </p>
              
              <div className="mt-8">
                <h5 className={`font-serif text-lg font-medium ${activeColor}`}>
                  {testimonials[currentTestimonial].author}
                </h5>
                <p className="text-[10px] tracking-widest font-mono text-neutral-500 uppercase mt-1">
                  {testimonials[currentTestimonial].role} — {testimonials[currentTestimonial].venue}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-1.5 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentTestimonial(i)}
                className={`w-1.5 h-1.5 rounded-full cursor-pointer transition-all ${
                  currentTestimonial === i ? 'bg-[#ccff00] w-5' : 'bg-white/20'
                }`}
              />
            ))}
          </div>

        </div>
      </section>

      {/* 7. INSTAGRAM EDITORIAL PREVIEW */}
      <section className="py-24 bg-black border-t border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center mb-16">
            <Instagram className={`w-6 h-6 mb-4 ${activeColor}`} />
            <span className="font-mono text-[9px] tracking-[0.25em] text-neutral-500 uppercase">
              JOURNAL AND INSPIRATION
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-white mt-1">
              Curated @CranberryBlueWeddings
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { img: images.champagneLuxury, tag: 'champagne' },
              { img: images.heroDecor, tag: 'decor' },
              { img: images.heroWedding, tag: 'romance' },
              { img: images.champagneLuxury, tag: 'linens' }
            ].map((post, idx) => (
              <div 
                key={idx} 
                className="relative group aspect-square overflow-hidden border border-white/5 rounded interactive-card"
                data-cursor-text="@Cranberry"
              >
                <div className="absolute inset-0 bg-neutral-950/75 opacity-0 group-hover:opacity-100 transition-all z-10 flex flex-col items-center justify-center p-4">
                  <Instagram className={`w-5 h-5 mb-2 ${activeColor}`} />
                  <span className="font-mono text-[10px] tracking-widest text-[#ccff00] uppercase">#{post.tag}</span>
                  <p className="text-[9px] text-neutral-400 mt-1">View Story</p>
                </div>
                <img
                  src={post.img}
                  alt={`Lifestyle inspiration ${post.tag}`}
                  className="w-full h-full object-cover brightness-90 group-hover:scale-105 duration-1000"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CONTACT CTA */}
      <section className="py-24 md:py-32 bg-[#050508] text-center relative overflow-hidden">
        {/* Glow behind layout */}
        <div 
          className="absolute rounded-full w-[50vw] h-[50vw] blur-[200px] opacity-10 pointer-events-none -bottom-1/2 left-1/4 bg-[#ccff00]"
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-neutral-500 mb-4 block">
            AWAITED CONSULTATION
          </span>
          <h3 className="font-serif text-4xl sm:text-6xl text-white tracking-tight mb-8">
            Create Your <span className={`italic font-light ${activeColor}`}>Timeless</span> Chapter
          </h3>
          <p className="text-sm text-neutral-400 max-w-lg mx-auto mb-10 leading-relaxed">
            Our schedules are highly curated. We accept a select volume of weddings and private galas each season to ensure absolute structural devotion. 
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className={`px-10 py-5 text-xs font-semibold tracking-[0.25em] uppercase border ${activeBorder} bg-[#ccff00] text-neutral-900 rounded-full hover:bg-white hover:text-black hover:border-white transition-all cursor-pointer`}
          >
            Inquire now
          </button>
        </div>
      </section>
    </div>
  );
}
