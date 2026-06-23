import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageId } from '../types';
import { journalArticles } from '../data';
import { Sparkles, Calendar, BookOpen, X, ArrowRight } from 'lucide-react';
import LuxuryCard from '../components/LuxuryCard';

interface JournalProps {
  theme: 'gold' | 'lime'; // signature compatibility
  onNavigate: (pageId: PageId) => void;
}

export default function Journal({ onNavigate }: JournalProps) {
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

  // Strict Lime active colors
  const activeColor = 'text-[#ccff00]';

  // Find the selected article for expanded modal/drawer
  const activeArticle = journalArticles.find(art => art.id === selectedArticleId);

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

  return (
    <div className="w-full pt-20">
      {/* Magazine Cover Header */}
      <section className="py-24 bg-gradient-to-b from-[#040407] to-neutral-950 relative border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            variants={headingAnim}
            initial="hidden"
            animate="visible"
            className="flex items-center justify-center gap-2 mb-4"
          >
            <Sparkles className={`w-4 h-4 ${activeColor}`} />
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-neutral-500">
              The Chronicle
            </span>
          </motion.div>

          <motion.h1
            variants={headingAnim}
            initial="hidden"
            animate="visible"
            className="font-serif text-4xl sm:text-6xl lg:text-7xl tracking-normal text-white mb-6 uppercase"
          >
            Luxury Journal & <span className={`italic font-light ${activeColor}`}>Aesthetic</span> Insights
          </motion.h1>

          <motion.p
            variants={descAnim}
            initial="hidden"
            animate="visible"
            className="text-neutral-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed"
          >
            Melanie Helen and guest artisans comment on destination logistics, floral coordinates, spatial architecture trends, and custom linen selections.
          </motion.p>
        </div>
      </section>

      {/* Blog Cards Layout Grid */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {journalArticles.map((article, idx) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: idx * 0.15, duration: 0.8 }}
              >
                <LuxuryCard
                  bgImage={article.image}
                  category={article.category}
                  cursorText="Read"
                  className="h-[460px]"
                >
                  <div className="flex items-center gap-4 text-[10px] text-neutral-300 font-mono mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#ccff00]" />
                      <span>{article.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5 text-[#ccff00]" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl text-white group-hover:text-[#ccff00] transition-colors duration-500 mb-4 line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-neutral-300 text-xs leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>

                  <button
                    onClick={() => setSelectedArticleId(article.id)}
                    className={`inline-flex items-center gap-3 text-xs tracking-[0.2em] font-medium uppercase mt-6 cursor-pointer hover:font-bold transition-all ${activeColor}`}
                  >
                    Read article
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </LuxuryCard>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Slide-out Overlay Article Drawer Modal */}
      <AnimatePresence>
        {selectedArticleId && activeArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9900]"
          >
            {/* Dark glass backdrop layout */}
            <div 
              className="absolute inset-0 bg-neutral-950/80 backdrop-blur-xl"
              onClick={() => setSelectedArticleId(null)}
            />

            {/* Slider Drawer Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-2xl bg-[#08080b] border-l border-white/5 p-8 md:p-12 overflow-y-auto z-10 flex flex-col pt-24"
            >
              {/* Monogram logo & close */}
              <div className="flex items-center justify-between border-b border-white/5 pb-6 mb-8">
                <span className={`font-serif text-3xl font-semibold tracking-wider ${activeColor}`}>
                  CB
                </span>
                <button
                  onClick={() => setSelectedArticleId(null)}
                  className="p-2 border border-white/10 rounded-full hover:border-white text-neutral-400 hover:text-white transition-all cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Cover Art */}
              <div className="aspect-[16/9] w-full overflow-hidden rounded mb-8 border border-white/5 shadow-inner">
                <img
                  src={activeArticle.image}
                  alt={activeArticle.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Meta */}
              <div className="flex items-center gap-4 text-[10px] text-neutral-400 font-mono uppercase tracking-wider mb-3">
                <span className={`px-2 py-0.5 bg-[#ccff00]/10 rounded border border-[#ccff00]/25 text-[#ccff00]`}>{activeArticle.category}</span>
                <span>{activeArticle.date}</span>
                <span>{activeArticle.readTime}</span>
              </div>

              <h2 className="font-serif text-3xl md:text-4xl text-white font-medium mb-6">
                {activeArticle.title}
              </h2>

              {/* Multi-Paragraph content */}
              <div className="space-y-6 text-sm text-neutral-300 leading-relaxed font-sans">
                {activeArticle.content.map((para, pIdx) => (
                  <p key={pIdx}>
                    {para}
                  </p>
                ))}
              </div>

              {/* Bottom bio */}
              <div className="border-t border-white/5 pt-8 mt-12 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-[#ccff00]/30 animate-pulse">
                  <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200" alt="Melanie Helen" className="w-full h-full object-cover grayscale" />
                </div>
                <div>
                  <h5 className="text-white text-xs font-serif font-medium">Published by Melanie Helen</h5>
                  <p className="text-[10px] text-neutral-500 font-mono uppercase mt-0.5">Author & Founder of Cranberry Blue</p>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
