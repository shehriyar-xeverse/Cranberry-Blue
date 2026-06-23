import { useState, ChangeEvent, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageId } from '../types';
import { Sparkles, Mail, Phone, MapPin, Send, MessageSquare, Check } from 'lucide-react';

interface ContactProps {
  theme: 'gold' | 'lime'; // signature compatibility
  onNavigate: (pageId: PageId) => void;
}

export default function Contact({ onNavigate }: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
    }, 1500); // simulated luxury delay
  };

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
              The Consultation Hub
            </span>
          </motion.div>

          <motion.h1
            variants={headingAnim}
            initial="hidden"
            animate="visible"
            className="font-serif text-4xl sm:text-6xl lg:text-7xl tracking-normal text-white mb-6 uppercase"
          >
            Secure Your <span className={`italic font-light ${activeColor}`}>Placement</span>
          </motion.h1>

          <motion.p
            variants={descAnim}
            initial="hidden"
            animate="visible"
            className="text-neutral-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed"
          >
            Initiate a private correspondence. Melanie Helen and our executive producers are available for secured calls and physical appointments at our Mayfair offices.
          </motion.p>
        </div>
      </section>

      {/* Main Grid: Form + Info Panel */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Info Panel Column - Left (LEFT -> RIGHT ANIMATION) */}
            <motion.div
              variants={imageAnim}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-5 space-y-8"
            >
              <div>
                <span className="font-mono text-[10px] tracking-[0.25em] text-neutral-500 uppercase mb-2 block">
                  DIRECTORY DETAILS
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-white">Mayfair Operations</h3>
              </div>

              {/* Physical details block */}
              <div className="p-8 bg-neutral-900/20 border border-white/5 rounded-sm space-y-6">
                
                <div className="flex gap-4 items-start">
                  <div className={`p-2 bg-white/5 rounded ${activeColor}`}>
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-serif text-white text-sm">London HQ Office</h5>
                    <p className="text-xs text-neutral-400 leading-normal mt-1">
                      Berkeley Square, Mayfair, London, W1J 6BD
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className={`p-2 bg-white/5 rounded ${activeColor}`}>
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-serif text-white text-sm">Direct Enquiries</h5>
                    <p className="text-xs text-neutral-400 leading-normal mt-1">
                      enquiries@cranberryblue.co.uk
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className={`p-2 bg-white/5 rounded ${activeColor}`}>
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-serif text-white text-sm">Secure Line</h5>
                    <p className="text-xs text-neutral-400 leading-normal mt-1">
                      +44 (0) 207 433 3444
                    </p>
                  </div>
                </div>

              </div>

              {/* WhatsApp + Email style integration buttons */}
              <div className="space-y-4">
                <span className="font-mono text-[9px] tracking-[0.25em] text-neutral-500 uppercase block">
                  FAST CONCIERGE CHANNELS:
                </span>

                <a
                  href="https://wa.me/442074333444"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-5 bg-neutral-900/40 border border-white/5 rounded hover:border-[#ccff00]/40 hover:bg-neutral-900/60 transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-5 h-5 text-emerald-400" />
                    <div>
                      <h5 className="text-white text-xs font-serif">Instant WhatsApp Concierge</h5>
                      <p className="text-[10px] text-neutral-500 font-mono">Response within 15 Min</p>
                    </div>
                  </div>
                  <Send className="w-4 h-4 text-neutral-600" />
                </a>

                <a
                  href="mailto:enquiries@cranberryblue.co.uk"
                  className="flex items-center justify-between p-5 bg-neutral-900/40 border border-white/5 rounded hover:border-[#ccff00]/40 hover:bg-neutral-900/60 transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-[#ccff00]" />
                    <div>
                      <h5 className="text-white text-xs font-serif">Secure Encryption Envelopes</h5>
                      <p className="text-[10px] text-neutral-500 font-mono">Direct to Melanie Helen</p>
                    </div>
                  </div>
                  <Send className="w-4 h-4 text-neutral-600" />
                </a>
              </div>
            </motion.div>

            {/* Inquiry Form Column - Right */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                {!isSent ? (
                  <motion.form
                    key="contact-form-block"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    onSubmit={handleSubmit}
                    className="p-8 md:p-10 bg-neutral-900/35 border border-white/5 rounded-sm relative overflow-hidden flex flex-col"
                  >
                    <div className={`absolute top-0 left-0 right-0 h-[1px] ${activeBg} opacity-[0.2]`} />

                    <h3 className="font-serif text-2xl text-white mb-8">Initiate Proposal</h3>

                    {/* Form Input Items */}
                    <div className="space-y-6">
                      <div className="relative group">
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="peer w-full px-4 py-4 pt-6 bg-black/40 border border-white/5 rounded text-sm text-white focus:outline-none focus:border-white transition-all focus:ring-0 placeholder-transparent"
                          id="contactName"
                          placeholder="Name"
                        />
                        <label 
                          htmlFor="contactName"
                          className="absolute left-4 top-1 tracking-wider text-[9px] font-mono text-neutral-500 uppercase transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:top-5 peer-focus:top-1 peer-focus:text-[9px] peer-focus:text-neutral-400 select-none pointer-events-none"
                        >
                          Name / Title
                        </label>
                      </div>

                      <div className="relative group">
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="peer w-full px-4 py-4 pt-6 bg-black/40 border border-white/5 rounded text-sm text-white focus:outline-none focus:border-white transition-all focus:ring-0 placeholder-transparent"
                          id="contactEmail"
                          placeholder="Email"
                        />
                        <label 
                          htmlFor="contactEmail"
                          className="absolute left-4 top-1 tracking-wider text-[9px] font-mono text-neutral-500 uppercase transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:top-5 peer-focus:top-1 peer-focus:text-[9px] peer-focus:text-neutral-400 select-none pointer-events-none"
                        >
                          Email Coordinates
                        </label>
                      </div>

                      <div className="relative group">
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="peer w-full px-4 py-4 pt-6 bg-black/40 border border-white/5 rounded text-sm text-white focus:outline-none focus:border-white transition-all focus:ring-0 placeholder-transparent"
                          id="contactPhone"
                          placeholder="Phone"
                        />
                        <label 
                          htmlFor="contactPhone"
                          className="absolute left-4 top-1 tracking-wider text-[9px] font-mono text-neutral-500 uppercase transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:top-5 peer-focus:top-1 peer-focus:text-[9px] peer-focus:text-neutral-400 select-none pointer-events-none"
                        >
                          Contact Number
                        </label>
                      </div>

                      <div className="relative group">
                        <input
                          type="text"
                          name="eventDate"
                          value={formData.eventDate}
                          onChange={handleInputChange}
                          className="peer w-full px-4 py-4 pt-6 bg-black/40 border border-white/5 rounded text-sm text-white focus:outline-none focus:border-white transition-all focus:ring-0 placeholder-transparent"
                          id="contactDate"
                          placeholder="Event Date"
                        />
                        <label 
                          htmlFor="contactDate"
                          className="absolute left-4 top-1 tracking-wider text-[9px] font-mono text-neutral-500 uppercase transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:top-5 peer-focus:top-1 peer-focus:text-[9px] peer-focus:text-neutral-400 select-none pointer-events-none"
                        >
                          Desired Event Date (Optional)
                        </label>
                      </div>

                      <div className="relative group">
                        <textarea
                          name="notes"
                          rows={4}
                          value={formData.notes}
                          onChange={handleInputChange}
                          className="peer w-full px-4 py-4 pt-6 bg-black/40 border border-white/5 rounded text-sm text-white focus:outline-none focus:border-white transition-all focus:ring-0 placeholder-transparent min-h-[140px] resize-none"
                          id="contactNotes"
                          placeholder="Event Notes"
                        />
                        <label 
                          htmlFor="contactNotes"
                          className="absolute left-4 top-1 tracking-wider text-[9px] font-mono text-neutral-500 uppercase transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-5 peer-focus:top-1 peer-focus:text-[9px] peer-focus:text-neutral-400 select-none pointer-events-none"
                        >
                          Sovereign Brief Requirements
                        </label>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 mt-8 rounded-full border text-xs tracking-[0.25em] font-medium font-mono uppercase transition-all duration-300 relative overflow-hidden group cursor-pointer border-[#ccff00]/40 text-[#ccff00] bg-[#ccff00]/5 hover:bg-[#ccff00]/15"
                      style={{
                        boxShadow: '0 0 25px rgba(204,255,0,0.1)'
                      }}
                    >
                      <span className="relative flex items-center justify-center gap-2">
                        {isSubmitting ? 'Transmitting coordinates...' : 'Transmit Inquiry'}
                        <Send className="w-3.5 h-3.5" />
                      </span>
                    </button>
                  </motion.form>
                ) : (
                  // Success layout
                  <motion.div
                    key="contact-success-block"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-10 bg-neutral-900/30 border border-[#ccff00]/20 text-center rounded relative overflow-hidden"
                  >
                    <div className="absolute -top-[10%] -left-[10%] w-64 h-64 blur-[80px] opacity-10 bg-[#ccff00] rounded-full" />
                    
                    <div className={`w-12 h-12 rounded-full border border-current flex items-center justify-center mx-auto mb-6 ${activeColor}`}>
                      <Check className="w-6 h-6" />
                    </div>

                    <h3 className="font-serif text-3xl text-white mb-4">Transmission Secured</h3>
                    <p className="text-xs text-neutral-400 leading-relaxed mb-8 max-w-sm mx-auto">
                      Thank you, <span className="text-white font-medium">{formData.name}</span>. Your details have been parsed securely and securely forwarded to Melanie Helen. We will initiate contact within 24 hours.
                    </p>

                    <button
                      onClick={() => setIsSent(false)}
                      className="px-6 py-3 rounded-full border border-white/10 text-[10px] tracking-widest font-mono text-neutral-400 hover:text-white hover:border-white transition-all cursor-pointer"
                    >
                      Transcribe Another Brief
                    </button>
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
