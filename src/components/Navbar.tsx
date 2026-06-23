import { useState, useEffect } from 'react';
import { PageId } from '../types';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  currentPage: PageId;
  setCurrentPage: (pageId: PageId) => void;
  theme: 'gold' | 'lime'; // kept for prop compatibility
  onChangeTheme: (theme: 'gold' | 'lime') => void;
}

export default function Navbar({
  currentPage,
  setCurrentPage,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Shrink and darken navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'weddings', label: 'Weddings' },
    { id: 'events', label: 'Events' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'journal', label: 'Journal' },
    { id: 'about', label: 'About' },
    { id: 'brochures', label: 'Brochures' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (pageId: PageId) => {
    setCurrentPage(pageId);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 will-change-transform ${
          isScrolled
            ? 'bg-neutral-950/90 backdrop-blur-xl py-3 border-b border-white/5 shadow-xl'
            : 'bg-transparent py-5 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand Identity / Monogram logo on Left */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <div 
              className="font-serif text-xl sm:text-2xl font-bold tracking-wider rounded-lg flex items-center justify-center text-[#ccff00]"
              style={{
                textShadow: '0 0 15px rgba(204,255,0,0.4)',
              }}
            >
              CB
            </div>
            <div className="h-4 w-[1px] bg-white/20" />
            <span className="font-serif text-xs sm:text-sm tracking-[0.25em] uppercase text-white font-semibold group-hover:text-[#ccff00] transition-colors">
              CRANBERRY BLUE
            </span>
          </div>

          {/* Nav Links - Optimised for desktop and tablet sizes */}
          <nav className="hidden md:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-2.5 lg:px-3.5 py-1.5 text-[10px] lg:text-xs font-medium tracking-[0.15em] uppercase transition-all duration-300 cursor-pointer ${
                    isActive 
                      ? 'text-[#ccff00] font-semibold' 
                      : 'text-neutral-300 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {/* Dynamic Underline */}
                  {isActive && (
                    <motion.div
                      layoutId="navActiveLine"
                      className="absolute bottom-0 left-2.5 lg:left-3.5 right-2.5 lg:right-3.5 h-[1.5px] bg-[#ccff00]"
                      style={{ boxShadow: '0 0 10px #ccff00' }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right inquiry actions */}
          <div className="hidden md:flex items-center">
            <button
              onClick={() => handleNavClick('contact')}
              className="flex items-center gap-1 px-3.5 py-1.5 text-[9px] lg:text-[10px] tracking-[0.2em] font-medium uppercase border border-[#ccff00]/30 text-[#ccff00] bg-transparent rounded-full hover:bg-[#ccff00]/10 transition-all duration-300 cursor-pointer"
              style={{
                boxShadow: '0 0 10px rgba(204,255,0,0.05)',
              }}
            >
              Inquire
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

          {/* Mobile/Tablet hamburger Trigger */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 text-neutral-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile drawer Menu Overlay: Slides from RIGHT */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Dark background modal shadow overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 bottom-0 w-[80vw] sm:w-[350px] z-50 bg-neutral-950/98 border-l border-white/5 backdrop-blur-3xl flex flex-col pt-24 px-8 pb-10"
            >
              {/* Ambient loading particle glow */}
              <div 
                className="absolute -top-[20%] -left-[20%] rounded-full w-[80vw] h-[80vw] blur-[120px] opacity-10 pointer-events-none bg-[#ccff00]"
              />

              <div className="flex flex-col h-full justify-between relative z-10">
                
                {/* Navigation list */}
                <div className="flex flex-col gap-4 py-4">
                  <span className="font-mono text-[8px] tracking-[0.25em] text-neutral-500 uppercase mb-2">
                    EXPLORE CRANBERRY BLUE
                  </span>
                  {navItems.map((item, index) => {
                    const isActive = currentPage === item.id;
                    return (
                      <motion.button
                        key={item.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ 
                          opacity: 1, 
                          x: 0,
                          transition: { delay: index * 0.04, duration: 0.3 }
                        }}
                        onClick={() => handleNavClick(item.id)}
                        className={`text-left font-serif text-2xl font-medium tracking-wide transition-all ${
                          isActive 
                            ? 'text-[#ccff00] drop-shadow-[0_0_10px_rgba(204,255,0,0.3)]' 
                            : 'text-neutral-400 hover:text-neutral-100'
                        }`}
                      >
                        {item.label}
                      </motion.button>
                    );
                  })}
                </div>

                {/* Mobile CTA Contacts details */}
                <div className="border-t border-white/5 pt-6 flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-[8px] font-mono tracking-[0.2em] text-neutral-500 uppercase">
                      Elegance Beckons
                    </span>
                    <p className="text-xs text-neutral-400">
                      london@cranberryblue.co.uk
                    </p>
                    <p className="text-xs text-neutral-400">
                      +44 (0) 207 433 3444
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleNavClick('contact')}
                      className="w-full text-center py-3 text-xs tracking-[0.2em] font-medium uppercase border border-[#ccff00]/30 text-[#ccff00] bg-transparent rounded-full hover:bg-[#ccff00]/10 transition-all cursor-pointer"
                    >
                      Schedule Consultation
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
