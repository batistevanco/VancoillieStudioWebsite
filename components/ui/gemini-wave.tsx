"use client";

import React, { useEffect, useRef } from "react";

export type ThemeType = "websites" | "apps" | "software";

interface Particle {
  x: number;             // Current 3D X coordinate
  y: number;             // Current 3D Y coordinate
  z: number;             // Current 3D Z coordinate
  baseX: number;         // Original 3D X
  baseY: number;         // Original 3D Y
  baseZ: number;         // Original 3D Z
  angleOffset: number;   // Winding phase
  radiusSpeed: number;   // Floating speed
  sparklePhase: number;  // Twinkle phase
  isStar: boolean;       // Render as a 4-point magical star
  r: number;             // Current Red channel
  g: number;             // Current Green channel
  b: number;             // Current Blue channel
  targetR: number;       // Target Red channel
  targetG: number;       // Target Green channel
  targetB: number;       // Target Blue channel
  baseSize: number;      // Size factor
}

interface GeminiWaveProps {
  theme?: ThemeType;
}

// Curated theme-specific magical color generator
const getThemeColor = (theme: ThemeType): { r: number; g: number; b: number } => {
  const rand = Math.random();
  if (theme === "websites") {
    if (rand < 0.45) return { r: 217, g: 119, b: 6 };     // Amber / Golden Dust
    if (rand < 0.82) return { r: 245, g: 158, b: 11 };    // Warm Gold Leaf
    return { r: 255, g: 255, b: 255 };                    // Shimmering White
  } else if (theme === "apps") {
    if (rand < 0.45) return { r: 14, g: 165, b: 233 };    // Sky Blue / Cyan
    if (rand < 0.82) return { r: 16, g: 185, b: 129 };    // Emerald / Fresh Mint
    return { r: 255, g: 255, b: 255 };                    // Shimmering White
  } else {
    if (rand < 0.45) return { r: 124, g: 58, b: 237 };    // Royal Purple / Violet
    if (rand < 0.82) return { r: 244, g: 63, b: 94 };     // Rose Gold / Soft Coral
    return { r: 255, g: 255, b: 255 };                    // Shimmering White
  }
};

export function GeminiWave({ theme = "websites" }: GeminiWaveProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, active: false });
  const particlesRef = useRef<Particle[]>([]);
  const currentThemeRef = useRef<ThemeType>(theme);

  // Sync theme changes to particles target colors for smooth morph transitions
  useEffect(() => {
    currentThemeRef.current = theme;
    if (particlesRef.current.length > 0) {
      particlesRef.current.forEach((p) => {
        const target = getThemeColor(theme);
        p.targetR = target.r;
        p.targetG = target.g;
        p.targetB = target.b;
      });
    }
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const numParticles = 1600;

    // Initialize particles list if it hasn't been built yet
    if (particlesRef.current.length === 0) {
      const tempParticles: Particle[] = [];
      for (let i = 0; i < numParticles; i++) {
        const isStream = i < numParticles * 0.45;
        
        let bx = 0;
        let by = 0;
        let bz = 0;
        let isStar = Math.random() < 0.06; // 6% magical twinkling stars
        let baseSize = 0.5 + Math.random() * 0.9;

        if (isStream) {
          const t = ((i / (numParticles * 0.45)) - 0.5) * 1200;
          const angle = t * 0.0035;
          const radius = 130 + Math.sin(t * 0.004) * 60;
          bx = t;
          by = Math.sin(angle) * radius;
          bz = Math.cos(angle) * radius;
          baseSize = 0.7 + Math.random() * 1.1;
        } else {
          bx = (Math.random() - 0.5) * 1400;
          by = (Math.random() - 0.5) * 900;
          bz = (Math.random() - 0.5) * 500;
        }

        const startColor = getThemeColor(currentThemeRef.current);

        tempParticles.push({
          x: bx,
          y: by,
          z: bz,
          baseX: bx,
          baseY: by,
          baseZ: bz,
          angleOffset: Math.random() * Math.PI * 2,
          radiusSpeed: 0.2 + Math.random() * 0.5,
          sparklePhase: Math.random() * Math.PI * 2,
          isStar,
          r: startColor.r,
          g: startColor.g,
          b: startColor.b,
          targetR: startColor.r,
          targetG: startColor.g,
          targetB: startColor.b,
          baseSize,
        });
      }
      particlesRef.current = tempParticles;
    }

    const perspective = 800;
    const cameraZ = 450;
    const rotX = 0.28;
    const rotZ = -0.45;
    let rotY = 0;
    let time = 0;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "source-over";

      rotY = time * 0.018;
      time += 0.005;

      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      const particles = particlesRef.current;

      for (let i = 0; i < numParticles; i++) {
        const p = particles[i];

        // Smooth color morph interpolation
        p.r += (p.targetR - p.r) * 0.05;
        p.g += (p.targetG - p.g) * 0.05;
        p.b += (p.targetB - p.b) * 0.05;

        // Magical drift animation
        let px = p.baseX + Math.sin(time * 0.8 * p.radiusSpeed + p.angleOffset) * 12;
        let py = p.baseY + Math.cos(time * 0.6 * p.radiusSpeed + p.angleOffset) * 12;
        let pz = p.baseZ + Math.sin(time * 0.4 * p.radiusSpeed + p.angleOffset) * 8;

        // Apply 3D Rotations
        // Yaw Y
        const cosY = Math.cos(rotY);
        const sinY = Math.sin(rotY);
        let rx = px * cosY - pz * sinY;
        let rz = px * sinY + pz * cosY;
        let ry = py;

        // Pitch X
        const cosX = Math.cos(rotX);
        const sinX = Math.sin(rotX);
        const tempY = ry * cosX - rz * sinX;
        rz = ry * sinX + rz * cosX;
        ry = tempY;

        // Roll Z
        const cosZ = Math.cos(rotZ);
        const sinZ = Math.sin(rotZ);
        const tempX = rx * cosZ - ry * sinZ;
        ry = rx * sinZ + ry * cosZ;
        rx = tempX;

        const finalZ = rz + cameraZ;
        if (finalZ <= 30) continue;

        const scale = perspective / finalZ;
        let sx = rx * scale + width / 2;
        let sy = ry * scale + height / 2;

        // Magical Wand interaction
        if (mouse.active) {
          const dx = sx - mouse.x;
          const dy = sy - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 180 && dist > 0) {
            const influence = Math.pow(1 - dist / 180, 1.8);
            sx -= (dx / dist) * influence * 15;
            sy -= (dy / dist) * influence * 15;

            const swirlAngle = Math.atan2(dy, dx) + Math.PI / 2;
            sx += Math.cos(swirlAngle) * influence * 18;
            sy += Math.sin(swirlAngle) * influence * 18;
          }
        }

        const size = Math.max(0.2, p.baseSize * scale * 0.55);

        // Twinkle & fade math
        const twinkle = 0.25 + 0.75 * Math.sin(time * 5 * p.radiusSpeed + p.sparklePhase);
        const edgeFade = Math.max(0, 1 - Math.abs(p.baseX) / 850);
        const depthOpacity = Math.max(0.1, Math.min(1.0, 1.25 - finalZ / 1000));
        
        const isWhite = Math.round(p.r) === 255 && Math.round(p.g) === 255 && Math.round(p.b) === 255;
        const baseOpacity = isWhite ? 0.85 : 0.58;
        const finalOpacity = twinkle * edgeFade * depthOpacity * baseOpacity;

        if (finalOpacity <= 0.05) continue;

        // Draw particle
        ctx.fillStyle = `rgba(${Math.round(p.r)}, ${Math.round(p.g)}, ${Math.round(p.b)}, ${finalOpacity})`;

        if (p.isStar && size > 1.2) {
          const starSize = size * 2.8;
          ctx.beginPath();
          ctx.moveTo(sx, sy - starSize);
          ctx.lineTo(sx + starSize * 0.25, sy - starSize * 0.25);
          ctx.lineTo(sx + starSize, sy);
          ctx.lineTo(sx + starSize * 0.25, sy + starSize * 0.25);
          ctx.lineTo(sx, sy + starSize);
          ctx.lineTo(sx - starSize * 0.25, sy + starSize * 0.25);
          ctx.lineTo(sx - starSize, sy);
          ctx.lineTo(sx - starSize * 0.25, sy - starSize * 0.25);
          ctx.closePath();
          ctx.fill();

          ctx.fillStyle = `rgba(255, 255, 255, ${finalOpacity * 0.95})`;
          ctx.beginPath();
          ctx.arc(sx, sy, size * 0.7, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(sx, sy, size, 0, Math.PI * 2);
          ctx.fill();

          if (p.baseSize > 1.2 && i % 8 === 0) {
            ctx.fillStyle = `rgba(${Math.round(p.r)}, ${Math.round(p.g)}, ${Math.round(p.b)}, ${finalOpacity * 0.14})`;
            ctx.beginPath();
            ctx.arc(sx, sy, size * 3.2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full pointer-events-none"
    />
  );
}
