import { useEffect, useRef } from 'react';

export default function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      fadeSpeed: number;
      contrastMode: boolean;
    }> = [];

    const isMobile = window.innerWidth < 768;
    const maxParticles = isMobile ? 18 : 55;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    // Initial seeding: distribute across full viewport height to guarantee full-page coverage instantly
    for (let i = 0; i < maxParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedY: Math.random() * 0.7 + 0.3,
        speedX: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.4 + 0.25,
        fadeSpeed: Math.random() * 0.003 + 0.001,
        contrastMode: false,
      });
    }

    let frameCount = 0;

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frameCount++;

      // Dynamic Contrast Resolution: sample exactly one particle coordinate per frame
      // to evaluate actual background element luminance with zero layout layout thrashing.
      if (particles.length > 0) {
        const sampleParticle = particles[frameCount % particles.length];
        const el = document.elementFromPoint(sampleParticle.x, sampleParticle.y);
        if (el) {
          const style = window.getComputedStyle(el);
          const bg = style.backgroundColor;
          const match = bg.match(/\d+/g);
          if (match && match.length >= 3) {
            const r = parseInt(match[0], 10);
            const g = parseInt(match[1], 10);
            const b = parseInt(match[2], 10);
            const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

            // Trigger contrastMode on light overlays, medium gray elements or lit fields
            sampleParticle.contrastMode = luminance > 55;
          }
        }
      }

      // Continuous loop production with top-only origin
      if (particles.length < maxParticles) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * -30, // Fresh particles source at top of viewport only
          size: Math.random() * 2 + 0.8,
          speedY: Math.random() * 0.7 + 0.3,
          speedX: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.45 + 0.2,
          fadeSpeed: Math.random() * 0.003 + 0.001,
          contrastMode: false,
        });
      }

      particles.forEach((p, idx) => {
        // Continuous downward drift + subtle horizontal sway
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.y * 0.004) * 0.12;

        const currentOpacity = p.contrastMode ? Math.min(1.0, p.opacity * 2.2) : p.opacity;
        const currentSize = p.contrastMode ? p.size * 1.3 : p.size;

        // 1. Shadow backing silhouette: Provides deep dark contrast on light grays or overlays
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentSize * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 0, 0, ${p.contrastMode ? 0.85 : 0.4})`;
        ctx.fill();

        // 2. Cinematic Lime glowing dust core: Radial gradient with Soft blur / bloom effect
        ctx.beginPath();
        const radGrd = ctx.createRadialGradient(
          p.x, p.y, 0,
          p.x, p.y, currentSize * 3.8
        );
        const limeColor = p.contrastMode
          ? `rgba(180, 255, 0, ${currentOpacity})`
          : `rgba(204, 255, 0, ${currentOpacity})`;

        radGrd.addColorStop(0, limeColor);
        radGrd.addColorStop(0.3, `rgba(204, 255, 0, ${currentOpacity * 0.5})`);
        radGrd.addColorStop(1, 'transparent');

        ctx.fillStyle = radGrd;
        ctx.arc(p.x, p.y, currentSize * 3.8, 0, Math.PI * 2);
        ctx.fill();

        // Loop recycling: Reset to supreme top of viewport upon exit
        if (p.y > canvas.height || p.x < 0 || p.x > canvas.width) {
          particles[idx] = {
            x: Math.random() * canvas.width,
            y: Math.random() * -30, // top of viewport only
            size: Math.random() * 2 + 0.8,
            speedY: Math.random() * 0.7 + 0.3,
            speedX: (Math.random() - 0.5) * 0.3,
            opacity: Math.random() * 0.45 + 0.2,
            fadeSpeed: Math.random() * 0.003 + 0.001,
            contrastMode: false,
          };
        }
      });

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    drawParticles();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[8] select-none"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
