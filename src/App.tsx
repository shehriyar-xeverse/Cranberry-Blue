import { useState, useEffect } from 'react';
import { PageId, ActiveTheme } from './types';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import InteractiveWebGLBackground from './components/InteractiveWebGLBackground';
import FloatingParticles from './components/FloatingParticles';
import GlobalLoader from './components/GlobalLoader';
import PageTransition from './components/PageTransition';

// Page imports
import Home from './pages/Home';
import Weddings from './pages/Weddings';
import Events from './pages/Events';
import Portfolio from './pages/Portfolio';
import Journal from './pages/Journal';
import About from './pages/About';
import Brochures from './pages/Brochures';
import Contact from './pages/Contact';

export default function App() {
  const [theme] = useState<ActiveTheme>('lime');
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [isInitialLoadComplete, setIsInitialLoadComplete] = useState(false);

  // Synchronize top-level HTML element class for custom scrollbar hover effects
  useEffect(() => {
    const rootClassList = document.documentElement.classList;
    rootClassList.remove('theme-gold', 'theme-lime');
    rootClassList.add('theme-lime');
  }, []);

  // Render active page dynamically
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home theme={theme} onNavigate={setCurrentPage} />;
      case 'weddings':
        return <Weddings theme={theme} onNavigate={setCurrentPage} />;
      case 'events':
        return <Events theme={theme} onNavigate={setCurrentPage} />;
      case 'portfolio':
        return <Portfolio theme={theme} onNavigate={setCurrentPage} />;
      case 'journal':
        return <Journal theme={theme} onNavigate={setCurrentPage} />;
      case 'about':
        return <About theme={theme} onNavigate={setCurrentPage} />;
      case 'brochures':
        return <Brochures theme={theme} onNavigate={setCurrentPage} />;
      case 'contact':
        return <Contact theme={theme} onNavigate={setCurrentPage} />;
      default:
        return <Home theme={theme} onNavigate={setCurrentPage} />;
    }
  };

  const activeColor = 'text-[#ccff00]';

  return (
    <div className="min-h-screen text-neutral-200 selection:bg-neutral-800 selection:text-white transition-colors duration-1000 bg-[#010101]">
      {/* 1. Global Cinematic Loader Overlay */}
      <GlobalLoader
        theme={theme}
        isInitialLoadComplete={isInitialLoadComplete}
        onInitialLoadComplete={() => setIsInitialLoadComplete(true)}
      />

      {/* 2. Custom Dual-Ring Follower Cursor (Desktop Checked Only) */}
      <CustomCursor />

      {/* 3. Mouse-Reactive WebGL Fluid Noise Background */}
      <InteractiveWebGLBackground theme={theme} />

      {/* 4. Falling Lime Dust Cinematic Particles Background - Global Layer */}
      <FloatingParticles />

      {/* Analog Grain Film Texture Overlay */}
      <div className="noise-overlay" />

      {/* 5. Glass Overlay Sticky Coordinates Navigation */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        theme={theme}
        onChangeTheme={() => {}}
      />

      {/* 6. Main Component Route Portal Container */}
      <main className="relative w-full min-h-screen pb-16 overflow-hidden">
        <PageTransition pageKey={currentPage} theme={theme}>
          {renderPage()}
        </PageTransition>
      </main>

      {/* 7. High-End Gilded Editorial Footer */}
      <footer className="relative z-10 bg-neutral-950 border-t border-white/5 py-16 md:py-20 text-neutral-400 text-xs mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            
            {/* Column 1: Monogram & Bio */}
            <div className="space-y-4">
              <div 
                onClick={() => setCurrentPage('home')}
                className="flex items-center gap-2.5 cursor-pointer select-none group"
              >
                <span className={`font-serif text-2xl font-bold tracking-wider ${activeColor}`}>
                  CB
                </span>
                <span className="font-serif text-xs tracking-[0.25em] text-white uppercase font-medium">
                  CRANBERRY BLUE
                </span>
              </div>
              <p className="text-[11px] leading-relaxed text-neutral-500">
                Designers and masterbuilders of high-society bespoke weddings, sovereign milestones, and immersive brand experiences globally from our offices in Mayfair, London.
              </p>
            </div>

            {/* Column 2: Navigation Map */}
            <div className="space-y-4">
              <h5 className="font-mono text-[9px] tracking-[0.25em] text-neutral-400 uppercase font-medium">
                DIRECTORY
              </h5>
              <ul className="grid grid-cols-2 gap-2.5">
                {[
                  { id: 'home', label: 'Home' },
                  { id: 'weddings', label: 'Weddings' },
                  { id: 'events', label: 'Events' },
                  { id: 'portfolio', label: 'Portfolio' },
                  { id: 'journal', label: 'Journal' },
                  { id: 'about', label: 'About' },
                  { id: 'brochures', label: 'Brochures' },
                  { id: 'contact', label: 'Contact' },
                ].map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => setCurrentPage(link.id as PageId)}
                      className={`hover:text-white cursor-pointer transition-colors text-[11px] ${
                        currentPage === link.id ? activeColor + ' font-medium' : 'text-neutral-500'
                      }`}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Contact Details */}
            <div className="space-y-4">
              <h5 className="font-mono text-[9px] tracking-[0.25em] text-neutral-400 uppercase font-medium">
                ESTATE PORTALS
              </h5>
              <div className="space-y-2 text-[11px] text-neutral-500">
                <p className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-700" />
                  london@cranberryblue.co.uk
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-700" />
                  +44 (0) 207 433 3444
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-700" />
                  Mayfair Office, London, W1J
                </p>
              </div>
            </div>

            {/* Column 4: Branding Statement */}
            <div className="space-y-4">
              <h5 className="font-mono text-[9px] tracking-[0.25em] text-neutral-400 uppercase font-medium">
                COMMISSION
              </h5>
              <p className="text-[11px] leading-relaxed text-neutral-500">
                Placement is strictly limited each season to preserve engineering focus. Request early security dates to ensure standard supplier scheduling.
              </p>
              <button
                onClick={() => setCurrentPage('contact')}
                className="inline-flex items-center gap-1.5 border border-white/10 px-4 py-2 rounded-full text-[10px] tracking-wider uppercase hover:border-white transition-all text-neutral-300 font-medium cursor-pointer"
              >
                Inquire Coordinates
              </button>
            </div>

          </div>

          <div className="border-t border-white/5 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-neutral-600">
            <p>© 2026 Cranberry Blue Luxury Event Design. All Sovereign Rights Reserved.</p>
            <div className="flex gap-6">
              <button onClick={() => setCurrentPage('about')} className="hover:text-neutral-400 transition-colors">Melanie Helen</button>
              <button onClick={() => setCurrentPage('brochures')} className="hover:text-neutral-400 transition-colors">Instant Brochures</button>
              <a href="#" className="hover:text-neutral-400 transition-colors">Discretion Agreement</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
