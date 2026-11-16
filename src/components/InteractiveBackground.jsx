import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

function createParticles(count) {
  return Array.from({ length: count }, () => ({
    x: Math.random(),
    y: Math.random(),
    r: Math.random() * 2.4 + 0.8,
    vx: (Math.random() - 0.5) * 0.25,
    vy: (Math.random() - 0.5) * 0.25,
    alpha: Math.random() * 0.5 + 0.2,
  }));
}

export default function InteractiveBackground() {
  const canvasRef = useRef(null);
  const pointerRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const particlesRef = useRef([]);
  const animationRef = useRef(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

    if (reducedMotion || isTouchDevice) {
      return undefined;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const particleCount = window.innerWidth < 768 ? 32 : 72;
    particlesRef.current = createParticles(particleCount);

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * ratio;
      canvas.height = window.innerHeight * ratio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const animate = () => {
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);

      const pointer = pointerRef.current;
      const particles = particlesRef.current;

      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > 1) p.vx *= -1;
        if (p.y < 0 || p.y > 1) p.vy *= -1;

        const dx = pointer.x - p.x * width;
        const dy = pointer.y - p.y * height;
        const distSq = dx * dx + dy * dy;

        if (distSq < 18000) {
          const force = (18000 - distSq) / 18000;
          const angle = Math.atan2(dy, dx);
          p.x += Math.cos(angle) * 0.003 * force;
          p.y += Math.sin(angle) * 0.003 * force;
        }

        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
        ctx.arc(p.x * width, p.y * height, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i += 1) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j += 1) {
          const b = particles[j];
          const dx = a.x * width - b.x * width;
          const dy = a.y * height - b.y * height;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(148, 163, 184, ${0.18 - dist / 700})`;
            ctx.lineWidth = 0.7;
            ctx.moveTo(a.x * width, a.y * height);
            ctx.lineTo(b.x * width, b.y * height);
            ctx.stroke();
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    const onPointerMove = (event) => {
      pointerRef.current.tx = event.clientX;
      pointerRef.current.ty = event.clientY;
    };

    const onScroll = () => {
      const scrollY = window.scrollY || 0;
      document.documentElement.style.setProperty('--scroll-shift', `${scrollY * 0.08}px`);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('scroll', onScroll, { passive: true });
    resize();
    animate();

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  useEffect(() => {
    const pointer = pointerRef.current;
    let frame = 0;

    const ease = () => {
      pointer.x += (pointer.tx - pointer.x) * 0.08;
      pointer.y += (pointer.ty - pointer.y) * 0.08;
      frame = requestAnimationFrame(ease);
    };

    frame = requestAnimationFrame(ease);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#0A0E1A]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(239,28,38,0.20),transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.18),transparent_35%)]" />

      <motion.div
        className="absolute -left-8 top-16 h-80 w-80 rounded-full bg-red-500/20 blur-3xl"
        animate={{ x: [0, 80, -20, 0], y: [0, 30, -20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-0 top-1/3 h-[28rem] w-[28rem] rounded-full bg-indigo-500/20 blur-3xl"
        animate={{ x: [0, -60, 20, 0], y: [0, -40, 25, 0] }}
        transition={{ duration: 21, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-20 left-1/4 h-64 w-64 rounded-full bg-rose-500/10 blur-3xl"
        animate={{ x: [0, 50, -10, 0], y: [0, 24, -10, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />

      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-80" />

      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(circle at center, black 30%, transparent 100%)',
        }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,rgba(10,14,26,0.64)_55%,rgba(10,14,26,0.9)_100%)]" />
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.8) 0.7px, transparent 1px)',
          backgroundSize: '10px 10px',
          mixBlendMode: 'screen',
        }}
      />
      <div className="film-grain absolute inset-0 opacity-[0.08]" />
    </div>
  );
}
