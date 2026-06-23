import { ActiveTheme } from '../types';
import { Sparkles, Zap } from 'lucide-react';

interface ThemeSelectorProps {
  currentTheme: ActiveTheme;
  onChangeTheme: (theme: ActiveTheme) => void;
}

export default function ThemeSelector({ currentTheme, onChangeTheme }: ThemeSelectorProps) {
  return (
    <div className="flex items-center gap-1.5 p-1 bg-black/50 backdrop-blur-xl border border-white/5 rounded-full shadow-2xl">
      <button
        onClick={() => onChangeTheme('gold')}
        className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-medium tracking-[0.1em] uppercase transition-all duration-300 cursor-pointer ${
          currentTheme === 'gold'
            ? 'bg-neutral-900 text-[#d4af37] border-white/10 border shadow-inner'
            : 'text-neutral-400 hover:text-white'
        }`}
        title="Classic Luxury (Gold)"
      >
        <Sparkles className="w-3 h-3" />
        <span className="hidden sm:inline">Classic</span>
      </button>

      <button
        onClick={() => onChangeTheme('lime')}
        className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-medium tracking-[0.1em] uppercase transition-all duration-300 cursor-pointer ${
          currentTheme === 'lime'
            ? 'bg-neutral-900 text-[#ccff00] border-white/10 border shadow-inner'
            : 'text-neutral-400 hover:text-white'
        }`}
        title="Avant-Garde (Lime)"
      >
        <Zap className="w-3 h-3" />
        <span className="hidden sm:inline">Avant-Garde</span>
      </button>
    </div>
  );
}
