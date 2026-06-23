import React, { useRef, useState, ReactNode } from 'react';
import { motion } from 'motion/react';

interface LuxuryCardProps {
  children?: ReactNode;
  bgImage?: string;
  category?: string;
  className?: string;
  onClick?: () => void;
  cursorText?: string;
  key?: React.Key;
}

export default function LuxuryCard({
  children,
  bgImage,
  category,
  className = '',
  onClick,
  cursorText
}: LuxuryCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Normalize coordinates from -1 to 1
    const normalizedX = (x / rect.width) * 2 - 1;
    const normalizedY = (y / rect.height) * 2 - 1;

    // Calculate maximum tilt (5 degrees max for sleek luxury styling)
    setRotateX(-normalizedY * 6);
    setRotateY(normalizedX * 6);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      onClick={onClick}
      className={`relative group rounded overflow-hidden bg-[#0a0a0c] border border-white/5 transition-all duration-500 cursor-pointer p-[1px] shadow-[0_4px_20px_rgba(204,255,0,0.02)] hover:shadow-[0_12px_44px_rgba(204,255,0,0.12)] hover:scale-[1.015] hover:-translate-y-1 ${className}`}
      style={{
        perspective: '1200px',
      }}
      data-cursor-text={cursorText}
    >
      {/* Moving single glowing gradient border tracing around the edge permanently */}
      <div className="absolute inset-0 z-0 pointer-events-none rounded overflow-hidden">
        {/* Animated active tracer glowing/blur overlay */}
        <div 
          className="absolute -inset-[300px] bg-[conic-gradient(from_0deg,transparent_60%,#ccff00_80%,transparent_100%)] animate-spin blur-[12px] opacity-30 transition-all duration-700"
          style={{ 
            animationDuration: isHovered ? '2.4s' : '5.0s',
            opacity: isHovered ? 0.65 : 0.3
          }}
        />
        {/* Animated active tracer sharp overlay */}
        <div 
          className="absolute -inset-[300px] bg-[conic-gradient(from_0deg,transparent_60%,#ccff00_80%,transparent_100%)] animate-spin transition-all duration-700"
          style={{ 
            animationDuration: isHovered ? '2.4s' : '5.0s',
            opacity: isHovered ? 1.0 : 0.6
          }}
        />
      </div>

      {/* 3D Tilted Inner Content Board */}
      <motion.div
        animate={{
          rotateX: rotateX,
          rotateY: rotateY,
        }}
        transition={{
          type: 'spring',
          stiffness: 140,
          damping: 18,
        }}
        className="relative w-full h-full rounded bg-[#030305] overflow-hidden flex flex-col justify-between"
      >
        {/* Image backplate */}
        {bgImage && (
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src={bgImage}
              alt="Editorial background"
              className="w-full h-full object-cover filter brightness-[0.55] group-hover:brightness-[0.65] scale-[1.01] group-hover:scale-105 duration-1000 ease-out"
              referrerPolicy="no-referrer"
            />
            {/* Ambient vignette overlay for supreme readability of content text in lime theme */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#010101] via-black/35 to-transparent" />
          </div>
        )}

        {/* Active glowing trace overlay */}
        <div 
          className={`absolute inset-0 z-10 bg-[#ccff00]/[0.01] group-hover:bg-[#ccff00]/[0.03] mix-blend-screen transition-all duration-700 pointer-events-none`} 
          style={{
            boxShadow: isHovered ? 'inset 0 0 30px rgba(204,255,0,0.08)' : 'inset 0 0 15px rgba(204,255,0,0.02)'
          }}
        />

        {/* Render container matching top left spacing */}
        <div className="relative z-20 w-full h-full p-6 sm:p-8 flex flex-col justify-between flex-grow">
          <div>
            {category && (
              <span className="font-mono text-[8px] tracking-[0.25em] text-[#ccff00] uppercase bg-[#ccff00]/10 border border-[#ccff00]/25 px-2.5 py-1 rounded-sm inline-block mb-4">
                {category}
              </span>
            )}
          </div>
          <div className="w-full mt-auto">
            {children}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
