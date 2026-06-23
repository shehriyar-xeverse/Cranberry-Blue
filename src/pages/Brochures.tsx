import { useState, ChangeEvent, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageId } from '../types';
import { Sparkles, CheckSquare, Square, Download, Send, CheckCircle2 } from 'lucide-react';

interface BrochuresProps {
  theme: 'gold' | 'lime'; // signature compatibility
  onNavigate: (pageId: PageId) => void;
}

export default function Brochures({ onNavigate }: BrochuresProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    emailAddress: '',
    eventLocation: '',
    interestWeddings: false,
    interestEvents: false,
    interestConsultation: false,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const activeColor = 'text-[#ccff00]';
  const activeBg = 'bg-[#ccff00]';
  const activeBorder = 'border-[#ccff00]';

  // Global Animation Presets (Mandatory Rules)
  // Images/Visuals: Left -> Right
  const imageAnim = {
    hidden: { x: -120, opacity: 0 },
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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleCheckbox = (key: 'interestWeddings' | 'interestEvents' | 'interestConsultation') => {
    setFormData(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.emailAddress) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500); // Luxury simulated latency
  };

  return (
    <div className="w-full pt-20">
      {/* Magazine Cover Header */}
      <section className="py-24 bg-gradient-to-b from-[#030305] to-black relative border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            variants={headingAnim}
            initial="hidden"
            animate="visible"
            className="flex items-center justify-center gap-2 mb-4"
          >
            <Sparkles className={`w-4 h-4 ${activeColor}`} />
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-neutral-500">
              The Digital Suite
            </span>
          </motion.div>

          <motion.h1
            variants={headingAnim}
            initial="hidden"
            animate="visible"
            className="font-serif text-4xl sm:text-6xl lg:text-7xl tracking-normal text-white mb-6 uppercase"
          >
            Commission Our <span className={`italic font-light ${activeColor}`}>Brochures</span>
          </motion.h1>

          <motion.p
            variants={descAnim}
            initial="hidden"
            animate="visible"
            className="text-neutral-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed"
          >
            Download our curated guidelines on international venue limits, custom floral engineering, private aviation coordinates, and season pricing benchmarks.
          </motion.p>
        </div>
      </section>

      {/* Modern Glass Card Form Layout */}
      <section className="py-24 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual Teaser Column (LEFT -> RIGHT ANIM) */}
            <motion.div
              variants={imageAnim}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-5 hidden lg:flex flex-col gap-6"
            >
              <div className="p-8 bg-neutral-900/40 border border-white/5 rounded relative shadow-2xl overflow-hidden group interactive-card" data-cursor-text="Vault">
                <div className="absolute top-0 right-0 w-32 h-32 blur-[40px] opacity-10 rounded-full bg-[#ccff00]" />
                
                <span className="font-serif text-4xl block font-light text-white mb-6">CB</span>
                
                <h3 className="font-serif text-lg text-white mb-3">Sovereign Compendium</h3>
                <p className="text-[11px] text-neutral-400 leading-relaxed">
                  Contains over 40 pages of customized event photography, floorplans of Blenheim Palace, chateaux takeover schedules, and certified Michelin catering options.
                </p>
                <div className="h-[1.5px] bg-white/5 my-6" />
                <span className="text-[9px] font-mono tracking-[0.25em] text-neutral-500 uppercase block">Released June 2026</span>
              </div>
              
              <div className="flex items-center gap-4 text-[#ccff00] px-4 font-mono text-[10px] tracking-widest uppercase opacity-60">
                <Download className="w-4 h-4" />
                <span>Instant PDF Vault Link</span>
              </div>
            </motion.div>

            {/* Form Column */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="brochures-form"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    onSubmit={handleSubmit}
                    className="p-8 md:p-10 bg-neutral-900/25 border border-white/5 rounded shadow-2xl relative overflow-hidden backdrop-blur-xl"
                  >
                    {/* Glowing Accent Ring on Form */}
                    <div className={`absolute top-0 left-0 right-0 h-[1.5px] ${activeBg} opacity-[0.25]`} />

                    <h3 className="font-serif text-2xl text-white mb-8">Access Digital Vault</h3>

                    {/* Animated Label Inputs */}
                    <div className="space-y-6">
                      <div className="relative group">
                        <input
                          type="text"
                          name="fullName"
                          required
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className="peer w-full px-4 py-4 pt-6 bg-black/40 border border-white/5 rounded text-sm text-white focus:outline-none focus:border-white transition-all focus:ring-0 placeholder-transparent"
                          id="fullNameInput"
                          placeholder="Your Full Name"
                        />
                        <label 
                          htmlFor="fullNameInput"
                          className="absolute left-4 top-1 tracking-wider text-[9px] font-mono text-neutral-500 uppercase transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:top-5 peer-focus:top-1 peer-focus:text-[9px] peer-focus:text-neutral-400 select-nonepointer-events-none"
                        >
                          Your Name / Title
                        </label>
                      </div>

                      <div className="relative group">
                        <input
                          type="email"
                          name="emailAddress"
                          required
                          value={formData.emailAddress}
                          onChange={handleInputChange}
                          className="peer w-full px-4 py-4 pt-6 bg-black/40 border border-white/5 rounded text-sm text-white focus:outline-none focus:border-white transition-all focus:ring-0 placeholder-transparent"
                          id="emailAddressInput"
                          placeholder="Patron Email Address"
                        />
                        <label 
                          htmlFor="emailAddressInput"
                          className="absolute left-4 top-1 tracking-wider text-[9px] font-mono text-neutral-500 uppercase transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:top-5 peer-focus:top-1 peer-focus:text-[9px] peer-focus:text-neutral-400 select-none pointer-events-none"
                        >
                          Patron Email
                        </label>
                      </div>

                      <div className="relative group">
                        <input
                          type="text"
                          name="eventLocation"
                          value={formData.eventLocation}
                          onChange={handleInputChange}
                          className="peer w-full px-4 py-4 pt-6 bg-black/40 border border-white/5 rounded text-sm text-white focus:outline-none focus:border-white transition-all focus:ring-0 placeholder-transparent"
                          id="eventLocationInput"
                          placeholder="Event Location Coordinates"
                        />
                        <label 
                          htmlFor="eventLocationInput"
                          className="absolute left-4 top-1 tracking-wider text-[9px] font-mono text-neutral-500 uppercase transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:top-5 peer-focus:top-1 peer-focus:text-[9px] peer-focus:text-neutral-400 select-none pointer-events-none"
                        >
                          Preferred Venue Location (Optional)
                        </label>
                      </div>
                    </div>

                    {/* Checkboxes */}
                    <div className="mt-8 space-y-4">
                      <span className="font-mono text-[9px] tracking-[0.25em] text-neutral-500 uppercase mb-2 block">
                        CHOOSE SEGMENTS:
                      </span>

                      <button
                        type="button"
                        onClick={() => toggleCheckbox('interestWeddings')}
                        className="flex items-center gap-3 text-xs text-neutral-300 w-full text-left py-2.5 cursor-pointer hover:text-white transition-colors border-b border-white/5"
                      >
                        {formData.interestWeddings ? (
                          <CheckSquare className={`w-4 h-4 ${activeColor}`} />
                        ) : (
                          <Square className="w-4 h-4 text-neutral-600" />
                        )}
                        <span className="font-serif">The Couture Wedding Blueprint (PDF)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => toggleCheckbox('interestEvents')}
                        className="flex items-center gap-3 text-xs text-neutral-300 w-full text-left py-2.5 cursor-pointer hover:text-white transition-colors border-b border-white/5"
                      >
                        {formData.interestEvents ? (
                          <CheckSquare className={`w-4 h-4 ${activeColor}`} />
                        ) : (
                          <Square className="w-4 h-4 text-neutral-600" />
                        )}
                        <span className="font-serif">High-Impact Brand Experiences & Galas (PDF)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => toggleCheckbox('interestConsultation')}
                        className="flex items-center gap-3 text-xs text-neutral-300 w-full text-left py-2.5 cursor-pointer hover:text-white transition-colors"
                      >
                        {formData.interestConsultation ? (
                          <CheckSquare className={`w-4 h-4 ${activeColor}`} />
                        ) : (
                          <Square className="w-4 h-4 text-neutral-600" />
                        )}
                        <span className="font-serif">Schedule Secret Consultation (Call)</span>
                      </button>
                    </div>

                    {/* Submit with Glow */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 mt-10 rounded-full border text-xs tracking-[0.25em] font-medium uppercase font-mono transition-all duration-300 relative overflow-hidden group cursor-pointer border-[#ccff00]/40 text-[#ccff00] bg-[#ccff00]/5 hover:bg-[#ccff00]/15"
                      style={{
                        boxShadow: '0 0 25px rgba(204,255,0,0.1)'
                      }}
                    >
                      {/* Swipe light overlay effect */}
                      <div className="absolute inset-x-0 top-0 bottom-0 scale-x-0 bg-white/5 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                      <span className="relative flex items-center justify-center gap-2">
                        {isSubmitting ? 'Verifying coordinates...' : 'Acquire Vault Assets'}
                        <Send className="w-3.5 h-3.5" />
                      </span>
                    </button>
                  </motion.form>
                ) : (
                  // Elegant acquisition success
                  <motion.div
                    key="brochures-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-10 bg-neutral-900/30 border border-[#ccff00]/30 text-center rounded relative overflow-hidden"
                  >
                    <div className="absolute -top-[10%] -left-[10%] w-64 h-64 blur-[80px] opacity-10 bg-[#ccff00] rounded-full" />
                    
                    <CheckCircle2 className={`w-12 h-12 mx-auto ${activeColor} mb-6`} />

                    <h3 className="font-serif text-3xl text-white mb-4">Secured Verification</h3>
                    
                    <p className="text-xs text-neutral-400 max-w-sm mx-auto leading-relaxed mb-8">
                      Thank you, <span className="text-white font-medium">{formData.fullName}</span>. An automated vault link has been dispatched to <span className="text-white font-medium">{formData.emailAddress}</span> with bespoke schedules.
                    </p>

                    <div className="flex flex-col gap-2 max-w-xs mx-auto">
                      <button
                        onClick={() => setIsSubmitted(false)}
                        className="py-3.5 rounded-full border border-white/10 text-xs tracking-[0.2em] font-mono text-white/60 hover:text-white hover:border-white transition-all cursor-pointer"
                      >
                        Request Another Section
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
}
