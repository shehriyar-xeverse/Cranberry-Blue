import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hoverText, setHoverText] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mousePos = useRef({ x: -100, y: -100 });
  const dotPos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Disable custom cursor on touch/tablet devices
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch || window.innerWidth < 1024) {
      return;
    }

    setIsVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const closestClickable = target.closest('a, button, [role="button"], .interactive-card, input, select, textarea');
      const hasPointerCursor = window.getComputedStyle(target).cursor === 'pointer';

      if (closestClickable || hasPointerCursor) {
        setIsHovered(true);
        const viewPrompt = target.closest('[data-cursor-text]');
        if (viewPrompt) {
          setHoverText(viewPrompt.getAttribute('data-cursor-text'));
        } else {
          setHoverText(null);
        }
      } else {
        setIsHovered(false);
        setHoverText(null);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', handleHover, { passive: true });

    let animationFrameId: number;

    const tick = () => {
      // Interpolation for ultra smooth lag
      const easeDot = 0.35;
      const easeRing = 0.12;

      dotPos.current.x += (mousePos.current.x - dotPos.current.x) * easeDot;
      dotPos.current.y += (mousePos.current.y - dotPos.current.y) * easeDot;

      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * easeRing;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * easeRing;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', handleHover);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Primary Dot (with Hardware Acceleration and Glowing Lime Highlight) */}
      <div
        ref={dotRef}
        id="custom-primary-cursor"
        className="fixed top-0 left-0 w-2 h-2 bg-[#ccff00] rounded-full pointer-events-none z-[10000] transition-all duration-200"
        style={{
          transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)',
          boxShadow: '0 0 10px rgba(204, 255, 0, 0.8)',
        }}
      />

      {/* Lagging Follower Circle (with Hardware Acceleration and Glowing Lime Highlight) */}
      <div
        ref={ringRef}
        id="custom-secondary-cursor"
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] flex items-center justify-center transition-[width,height,background-color,border-color] duration-300"
        style={{
          transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)',
          width: hoverText ? '85px' : isHovered ? '60px' : '32px',
          height: hoverText ? '85px' : isHovered ? '60px' : '32px',
          border: '1.5px solid rgba(204, 255, 0, 0.6)',
          backgroundColor: isHovered ? 'rgba(204, 255, 0, 0.08)' : 'rgba(0, 0, 0, 0.2)',
          boxShadow: isHovered ? '0 0 15px rgba(204, 255, 0, 0.25)' : 'none',
        }}
      >
        {hoverText && (
          <span className="text-[10px] tracking-[0.2em] font-mono font-semibold text-[#ccff00] uppercase">
            {hoverText}
          </span>
        )}
      </div>
    </>
  );
}
