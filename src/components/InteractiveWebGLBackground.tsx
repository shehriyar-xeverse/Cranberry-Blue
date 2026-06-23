import { useEffect, useRef } from 'react';
import { ActiveTheme } from '../types';

interface BackgroundProps {
  theme: ActiveTheme;
}

export default function InteractiveWebGLBackground({ theme }: BackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Track mouse coordinates
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = window.innerHeight - e.clientY; // Flip y for shader space
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Try WebGL first
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext | null;

    if (!gl) {
      console.warn("WebGL not supported, falling back to gorgeous Canvas2D fluid mesh.");
      // Canvas 2D Fallback
      let animationId: number;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      resize();
      window.addEventListener('resize', resize);

      const colorPalettes = {
        gold: {
          bg: '#050508',
          accent1: 'rgba(212, 175, 55, 0.04)',
          accent2: 'rgba(30, 20, 40, 0.12)',
        },
        lime: {
          bg: '#030303',
          accent1: 'rgba(204, 255, 0, 0.03)',
          accent2: 'rgba(10, 40, 10, 0.08)',
        }
      };

      let time = 0;
      const draw = () => {
        time += 0.005;
        const width = canvas.width;
        const height = canvas.height;

        // Smooth mouse damping
        mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
        mouseRef.current.y += ((window.innerHeight - mouseRef.current.targetY) - mouseRef.current.y) * 0.05;

        ctx.fillStyle = colorPalettes[theme].bg;
        ctx.fillRect(0, 0, width, height);

        // Gradient 1 (Fluid center)
        const activeThemeObj = colorPalettes[theme];
        const pulseX = mouseRef.current.x + Math.sin(time) * 150;
        const pulseY = mouseRef.current.y + Math.cos(time) * 150;

        const grad1 = ctx.createRadialGradient(pulseX, pulseY, 50, pulseX, pulseY, 600);
        grad1.addColorStop(0, activeThemeObj.accent1);
        grad1.addColorStop(1, 'transparent');
        ctx.fillStyle = grad1;
        ctx.fillRect(0, 0, width, height);

        // Gradient 2 (Theme color ambient lights)
        const grad2 = ctx.createRadialGradient(width - pulseX, height - pulseY, 100, width - pulseX, height - pulseY, width * 0.8);
        grad2.addColorStop(0, activeThemeObj.accent2);
        grad2.addColorStop(1, 'transparent');
        ctx.fillStyle = grad2;
        ctx.fillRect(0, 0, width, height);

        // Soft visual overlay line grids
        ctx.strokeStyle = theme === 'gold' ? 'rgba(212, 175, 55, 0.015)' : 'rgba(204, 255, 0, 0.01)';
        ctx.lineWidth = 1;
        const gridGap = 80;
        for (let x = 0; x < width; x += gridGap) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }
        for (let y = 0; y < height; y += gridGap) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }

        animationId = requestAnimationFrame(draw);
      };
      draw();

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', resize);
        cancelAnimationFrame(animationId);
      };
    }

    // WebGL implementation
    const resizeGL = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resizeGL();
    window.addEventListener('resize', resizeGL);

    // Vertex Shader Source
    const vsSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    // Fragment Shader Source (Complex fluid noise distortion with mouse response & theme adaptation)
    const fsSource = `
      precision highp float;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec2 u_mouse;
      uniform float u_theme; // 0.0 = Gold, 1.0 = Lime

      // Helper Simplex / Cosine fluid noise
      float noise(vec2 p) {
        return sin(p.x * 0.25 + u_time * 0.2) * cos(p.y * 0.25 - u_time * 0.15);
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);

        // Normalize mouse coordinates
        vec2 m = (u_mouse * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);

        // Mouse distance for reactive displacement
        float distToMouse = distance(p, m);
        float mouseDisplacement = smoothstep(1.2, 0.0, distToMouse) * 0.45;

        // Warp space coordinates to generate fluid motion
        p += mouseDisplacement * normalize(p - m + 0.01);
        
        vec2 pWarp = p;
        pWarp.x += noise(p * 2.1) * 0.5;
        pWarp.y += noise(p * 1.8 + vec2(1.2)) * 0.5;

        float n = noise(pWarp * 1.4);

        // Theme-derived base colors
        vec3 colGoldBase = vec3(0.04, 0.04, 0.06);     // Dark luxurious obsidian charcoal
        vec3 colGoldAccent = vec3(0.83, 0.68, 0.22);   // Champagne #d4af37

        vec3 colLimeBase = vec3(0.01, 0.01, 0.02);     // Pitch black
        vec3 colLimeAccent = vec3(0.80, 1.0, 0.0);     // Neon lime #ccff00

        // Interpolate background depending on theme variable
        vec3 baseColor = mix(colGoldBase, colLimeBase, u_theme);
        vec3 accentColor = mix(colGoldAccent, colLimeAccent, u_theme);

        // Calculate glowing bands
        float glowTerm = sin(pWarp.x * 2.0 + pWarp.y * 1.5 + u_time * 0.5);
        glowTerm = smoothstep(0.4, 1.0, glowTerm);

        // Final composite color with soft depth and noise shading
        vec3 finalColor = baseColor + accentColor * (n * 0.06 + glowTerm * 0.04);
        
        // Darken edges for elegant vignette effect
        float vignette = uv.x * uv.y * (1.0 - uv.x) * (1.0 - uv.y);
        vignette = clamp(pow(16.0 * vignette, 0.3), 0.0, 1.0);
        finalColor *= mix(0.5, 1.0, vignette);

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    // Shader Compile Utility
    const createShader = (glContext: WebGLRenderingContext, type: number, source: string) => {
      const shader = glContext.createShader(type);
      if (!shader) return null;
      glContext.shaderSource(shader, source);
      glContext.compileShader(shader);
      if (!glContext.getShaderParameter(shader, glContext.COMPILE_STATUS)) {
        console.error(glContext.getShaderInfoLog(shader));
        glContext.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = createShader(gl, gl.VERTEX_SHADER, vsSource);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Create 2D full-screen quad vertices
    const vertices = new Float32Array([
      -1, -1, 
       1, -1, 
      -1,  1, 
      -1,  1, 
       1, -1, 
       1,  1
    ]);

    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLoc = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const resolutionLoc = gl.getUniformLocation(program, "u_resolution");
    const timeLoc = gl.getUniformLocation(program, "u_time");
    const mouseLoc = gl.getUniformLocation(program, "u_mouse");
    const themeLoc = gl.getUniformLocation(program, "u_theme");

    let startTime = Date.now();
    let animationId: number;

    const render = () => {
      // Damped mouse tracking
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      const elapsed = (Date.now() - startTime) / 1000.0;

      gl.uniform2f(resolutionLoc, canvas.width, canvas.height);
      gl.uniform1f(timeLoc, elapsed);
      gl.uniform2f(mouseLoc, mouseRef.current.x, mouseRef.current.y);
      gl.uniform1f(themeLoc, theme === 'lime' ? 1.0 : 0.0);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resizeGL);
      cancelAnimationFrame(animationId);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(vertexBuffer);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none transition-opacity duration-1000"
      style={{ opacity: 0.95 }}
    />
  );
}
