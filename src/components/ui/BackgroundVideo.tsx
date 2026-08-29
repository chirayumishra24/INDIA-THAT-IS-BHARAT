'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Play, Pause, Volume2, VolumeX, Sparkles, Waves, Flame, Sun, Shield, Settings2 } from 'lucide-react';

type AnimationTheme = 'golden-bharat' | 'sacred-rivers' | 'royal-maurya';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  maxOpacity: number;
  fadeSpeed: number;
  color: string;
  pulseOffset: number;
}

export const BackgroundVideo: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // States
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [videoOpacity, setVideoOpacity] = useState<number>(0.45);
  const [showVideo, setShowVideo] = useState(true);
  const [theme, setTheme] = useState<AnimationTheme>('golden-bharat');
  const [particleDensity, setParticleDensity] = useState<'low' | 'medium' | 'high'>('medium');
  const [isExpandedControls, setIsExpandedControls] = useState(false);

  // Mouse interaction
  const mousePosRef = useRef<{ x: number; y: number; active: boolean }>({ x: -1000, y: -1000, active: false });

  // Handle Video Autoplay
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(err => {
        console.log('Video autoplay prevented:', err);
      });
    }
  }, []);

  const togglePlay = () => {
    if (videoRef.current && showVideo) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
    setIsPlaying(prev => !prev);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
    setIsMuted(prev => !prev);
  };

  // Canvas Animation Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Color palettes by theme
    const colorPalettes: Record<AnimationTheme, string[]> = {
      'golden-bharat': [
        'rgba(245, 158, 11, ', // Amber
        'rgba(234, 88, 12, ',  // Orange
        'rgba(251, 191, 36, ', // Yellow/Gold
        'rgba(217, 119, 6, ',  // Deep Ochre
        'rgba(254, 243, 199, ' // Pale Golden Silk
      ],
      'sacred-rivers': [
        'rgba(14, 165, 233, ', // Sky Blue
        'rgba(20, 184, 166, ', // Teal
        'rgba(56, 189, 248, ', // Light Ocean
        'rgba(245, 158, 11, ', // Golden Sand
        'rgba(224, 242, 254, ' // Mist
      ],
      'royal-maurya': [
        'rgba(147, 51, 234, ', // Royal Purple
        'rgba(245, 158, 11, ', // Saffron Gold
        'rgba(99, 102, 241, ', // Indigo
        'rgba(251, 146, 60, ', // Warm Coral
        'rgba(253, 230, 138, ' // Starlight
      ]
    };

    // Particle count
    const particleCount = particleDensity === 'low' ? 35 : particleDensity === 'medium' ? 65 : 100;
    const currentColors = colorPalettes[theme];

    const createParticle = (): Particle => {
      const colorBase = currentColors[Math.floor(Math.random() * currentColors.length)];
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.8 + 1.0,
        speedY: -(Math.random() * 0.45 + 0.15),
        speedX: (Math.random() - 0.5) * 0.35,
        opacity: Math.random() * 0.6 + 0.2,
        maxOpacity: Math.random() * 0.5 + 0.4,
        fadeSpeed: Math.random() * 0.01 + 0.004,
        color: colorBase,
        pulseOffset: Math.random() * Math.PI * 2
      };
    };

    const particles: Particle[] = Array.from({ length: particleCount }, () => createParticle());

    let time = 0;
    let chakraAngle = 0;

    // Mouse handlers
    const onMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY, active: true };
    };
    const onMouseLeave = () => {
      mousePosRef.current.active = false;
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    const drawAshokaChakra = (cx: number, cy: number, radius: number, alpha: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(chakraAngle);
      ctx.strokeStyle = `rgba(217, 119, 6, ${alpha})`;
      ctx.lineWidth = 1.2;

      // Outer ring
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.stroke();

      // Inner hub
      ctx.beginPath();
      ctx.arc(0, 0, radius * 0.18, 0, Math.PI * 2);
      ctx.stroke();

      // 24 Spokes of Ashoka Chakra
      const spokes = 24;
      for (let i = 0; i < spokes; i++) {
        const angle = (i * Math.PI * 2) / spokes;
        ctx.beginPath();
        ctx.moveTo(Math.cos(angle) * (radius * 0.18), Math.sin(angle) * (radius * 0.18));
        ctx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
        ctx.stroke();
      }

      ctx.restore();
    };

    const drawHarmonicRiverWave = (layerIdx: number, baseHeight: number, waveAmplitude: number, speed: number, alpha: number) => {
      ctx.save();
      ctx.beginPath();

      const waveLength = 0.003;
      const waveShift = time * speed + layerIdx * 1.5;

      ctx.moveTo(0, height);
      for (let x = 0; x <= width; x += 15) {
        const y = baseHeight + 
                  Math.sin(x * waveLength + waveShift) * waveAmplitude + 
                  Math.cos(x * 0.0015 - time * 0.008) * (waveAmplitude * 0.5);
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.closePath();

      const grad = ctx.createLinearGradient(0, baseHeight - waveAmplitude, 0, height);
      if (theme === 'sacred-rivers') {
        grad.addColorStop(0, `rgba(20, 184, 166, ${alpha * 0.5})`);
        grad.addColorStop(0.6, `rgba(14, 165, 233, ${alpha * 0.3})`);
        grad.addColorStop(1, `rgba(255, 255, 255, 0.0)`);
      } else if (theme === 'royal-maurya') {
        grad.addColorStop(0, `rgba(147, 51, 234, ${alpha * 0.4})`);
        grad.addColorStop(0.6, `rgba(245, 158, 11, ${alpha * 0.2})`);
        grad.addColorStop(1, `rgba(255, 255, 255, 0.0)`);
      } else {
        grad.addColorStop(0, `rgba(245, 158, 11, ${alpha * 0.35})`);
        grad.addColorStop(0.5, `rgba(234, 88, 12, ${alpha * 0.2})`);
        grad.addColorStop(1, `rgba(255, 255, 255, 0.0)`);
      }

      ctx.fillStyle = grad;
      ctx.fill();
      ctx.restore();
    };

    const render = () => {
      if (!isPlaying) {
        animationFrameRef.current = requestAnimationFrame(render);
        return;
      }

      time += 0.015;
      chakraAngle += 0.0015;

      ctx.clearRect(0, 0, width, height);

      // 1. Soft Dynamic Gradient Mesh in Background
      const bgGrad = ctx.createRadialGradient(
        width * 0.5 + Math.sin(time * 0.4) * 80,
        height * 0.4 + Math.cos(time * 0.3) * 60,
        40,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.7
      );

      if (theme === 'sacred-rivers') {
        bgGrad.addColorStop(0, 'rgba(224, 242, 254, 0.3)');
        bgGrad.addColorStop(0.5, 'rgba(204, 251, 241, 0.15)');
        bgGrad.addColorStop(1, 'rgba(250, 246, 238, 0.05)');
      } else if (theme === 'royal-maurya') {
        bgGrad.addColorStop(0, 'rgba(243, 232, 255, 0.3)');
        bgGrad.addColorStop(0.5, 'rgba(254, 243, 199, 0.15)');
        bgGrad.addColorStop(1, 'rgba(250, 246, 238, 0.05)');
      } else {
        bgGrad.addColorStop(0, 'rgba(254, 243, 199, 0.35)');
        bgGrad.addColorStop(0.5, 'rgba(255, 237, 213, 0.2)');
        bgGrad.addColorStop(1, 'rgba(250, 246, 238, 0.05)');
      }
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Rotating Subtle Ancient Sacred Geometries (Ashoka Chakra) in corners
      drawAshokaChakra(width * 0.9, height * 0.22, 140, 0.08);
      drawAshokaChakra(width * 0.08, height * 0.75, 110, 0.06);

      // 3. Flowing Civilizational River Waves at bottom
      drawHarmonicRiverWave(1, height * 0.78, 30, 0.8, 0.25);
      drawHarmonicRiverWave(2, height * 0.84, 22, 1.1, 0.35);
      drawHarmonicRiverWave(3, height * 0.90, 18, 0.6, 0.45);

      // 4. Interactive Mouse Aura / Ripple
      if (mousePosRef.current.active) {
        const mouseGrad = ctx.createRadialGradient(
          mousePosRef.current.x,
          mousePosRef.current.y,
          0,
          mousePosRef.current.x,
          mousePosRef.current.y,
          160
        );
        mouseGrad.addColorStop(0, 'rgba(245, 158, 11, 0.15)');
        mouseGrad.addColorStop(0.5, 'rgba(251, 191, 36, 0.05)');
        mouseGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = mouseGrad;
        ctx.beginPath();
        ctx.arc(mousePosRef.current.x, mousePosRef.current.y, 160, 0, Math.PI * 2);
        ctx.fill();
      }

      // 5. Constellation Filaments between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            const lineAlpha = (1 - dist / 100) * 0.15;
            ctx.strokeStyle = `rgba(217, 119, 6, ${lineAlpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // 6. Draw & Update Embers / Stardust Particles
      particles.forEach(p => {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(time + p.pulseOffset) * 0.2;

        // Pulse opacity
        p.opacity += Math.sin(time * 2 + p.pulseOffset) * p.fadeSpeed;
        if (p.opacity > p.maxOpacity) p.opacity = p.maxOpacity;
        if (p.opacity < 0.1) p.opacity = 0.1;

        // Wrap around borders
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Interactive mouse push/pull
        if (mousePosRef.current.active) {
          const mdx = mousePosRef.current.x - p.x;
          const mdy = mousePosRef.current.y - p.y;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mDist < 120 && mDist > 5) {
            const force = (120 - mDist) / 120;
            p.x -= (mdx / mDist) * force * 1.5;
            p.y -= (mdy / mDist) * force * 1.5;
          }
        }

        // Particle Glow
        ctx.beginPath();
        const pGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2.2);
        pGrad.addColorStop(0, `${p.color}${p.opacity})`);
        pGrad.addColorStop(0.5, `${p.color}${p.opacity * 0.4})`);
        pGrad.addColorStop(1, `${p.color}0)`);

        ctx.fillStyle = pGrad;
        ctx.arc(p.x, p.y, p.size * 2.2, 0, Math.PI * 2);
        ctx.fill();

        // Particle Core
        ctx.beginPath();
        ctx.fillStyle = `${p.color}${Math.min(1, p.opacity + 0.3)})`;
        ctx.arc(p.x, p.y, p.size * 0.7, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [isPlaying, theme, particleDensity]);

  return (
    <>
      {/* 1. Base Ambient Video Layer */}
      {showVideo && (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none" aria-hidden="true">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover transition-opacity duration-1000"
            style={{ opacity: videoOpacity }}
          >
            <source src="/videos/bharat_ambient_bg.mp4" type="video/mp4" />
          </video>
        </div>
      )}

      {/* 2. Interactive High-FPS Canvas Particle & Sacred Geometry Layer */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0 select-none transition-opacity duration-700"
      />

      {/* 3. Soft Parchment Vignette Filter for Maximum UI Readability */}
      <div className="fixed inset-0 bg-gradient-to-b from-white/30 via-[#FAF6EE]/20 to-white/40 pointer-events-none z-0 backdrop-blur-[0.5px]" />

      {/* 4. Floating Ambient Master Controls Widget in Bottom Left */}
      <div className="fixed bottom-4 left-4 z-40 flex flex-col gap-2">
        {/* Expanded Settings Popup */}
        {isExpandedControls && (
          <div className="bg-[#1B2A4A]/95 backdrop-blur-xl border border-amber-400/40 rounded-2xl p-3 shadow-2xl text-white text-xs space-y-3 w-64 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="font-bold text-amber-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Background Atmosphere
              </span>
              <button
                onClick={() => setIsExpandedControls(false)}
                className="text-gray-400 hover:text-white text-xs font-bold"
              >
                ✕
              </button>
            </div>

            {/* Atmosphere Theme Presets */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-wider text-amber-200/80 font-bold">VFX Theme</label>
              <div className="grid grid-cols-3 gap-1">
                <button
                  onClick={() => setTheme('golden-bharat')}
                  className={`px-2 py-1.5 rounded-xl text-[10px] font-bold flex flex-col items-center gap-1 transition-all ${
                    theme === 'golden-bharat'
                      ? 'bg-amber-500 text-black shadow-md'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  <Flame className="w-3 h-3" />
                  Golden
                </button>
                <button
                  onClick={() => setTheme('sacred-rivers')}
                  className={`px-2 py-1.5 rounded-xl text-[10px] font-bold flex flex-col items-center gap-1 transition-all ${
                    theme === 'sacred-rivers'
                      ? 'bg-teal-500 text-black shadow-md'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  <Waves className="w-3 h-3" />
                  Rivers
                </button>
                <button
                  onClick={() => setTheme('royal-maurya')}
                  className={`px-2 py-1.5 rounded-xl text-[10px] font-bold flex flex-col items-center gap-1 transition-all ${
                    theme === 'royal-maurya'
                      ? 'bg-purple-500 text-white shadow-md'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  <Shield className="w-3 h-3" />
                  Royal
                </button>
              </div>
            </div>

            {/* Particle Density */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-wider text-amber-200/80 font-bold">Particle Density</label>
              <div className="grid grid-cols-3 gap-1">
                {(['low', 'medium', 'high'] as const).map(d => (
                  <button
                    key={d}
                    onClick={() => setParticleDensity(d)}
                    className={`px-2 py-1 rounded-lg text-[10px] font-bold capitalize transition-all ${
                      particleDensity === d
                        ? 'bg-amber-400 text-black'
                        : 'bg-white/10 text-gray-300 hover:bg-white/20'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Video Opacity Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-gray-300">
                <span>Video Layer</span>
                <span className="text-amber-300 font-bold">{showVideo ? `${Math.round(videoOpacity * 100)}%` : 'Off'}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowVideo(prev => !prev)}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    showVideo ? 'bg-amber-500/30 text-amber-300' : 'bg-red-500/30 text-red-300'
                  }`}
                >
                  {showVideo ? 'On' : 'Off'}
                </button>
                <input
                  type="range"
                  min="0.1"
                  max="0.9"
                  step="0.05"
                  value={videoOpacity}
                  disabled={!showVideo}
                  onChange={e => setVideoOpacity(parseFloat(e.target.value))}
                  className="w-full accent-amber-400 h-1.5 bg-white/20 rounded-lg cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}

        {/* Floating Quick Pill */}
        <div className="flex items-center gap-1.5 bg-[#1B2A4A]/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-amber-400/40 text-white text-[11px] shadow-2xl transition-all">
          <button
            onClick={togglePlay}
            className="p-1 rounded-full hover:bg-white/20 transition-colors"
            title={isPlaying ? 'Pause Dynamic Atmosphere' : 'Resume Atmosphere'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 text-amber-300" /> : <Play className="w-3.5 h-3.5 text-amber-300" />}
          </button>

          <button
            onClick={toggleMute}
            className="p-1 rounded-full hover:bg-white/20 transition-colors"
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-gray-400" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
          </button>

          <div className="h-3 w-px bg-white/20 mx-0.5" />

          {/* Quick Theme Badge */}
          <button
            onClick={() => {
              setTheme(prev => 
                prev === 'golden-bharat' ? 'sacred-rivers' : prev === 'sacred-rivers' ? 'royal-maurya' : 'golden-bharat'
              );
            }}
            className="px-2 py-0.5 rounded-full bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 text-[10px] font-bold flex items-center gap-1 transition-all"
            title="Cycle Atmosphere Theme"
          >
            {theme === 'golden-bharat' ? '✨ Golden' : theme === 'sacred-rivers' ? '🌊 Rivers' : '👑 Royal'}
          </button>

          {/* Settings Toggle */}
          <button
            onClick={() => setIsExpandedControls(prev => !prev)}
            className="p-1 rounded-full hover:bg-white/20 text-gray-300 hover:text-white transition-colors"
            title="Atmosphere Settings"
          >
            <Settings2 className="w-3.5 h-3.5 text-amber-300" />
          </button>
        </div>
      </div>
    </>
  );
};
