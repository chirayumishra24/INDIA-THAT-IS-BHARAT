'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Eye, EyeOff } from 'lucide-react';

export const BackgroundVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [opacity, setOpacity] = useState<number>(0.85);
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(err => {
        console.log('Video autoplay prevented by browser:', err);
      });
    }
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <>
      {/* Background Video Layer */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none" aria-hidden="true">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover transition-opacity duration-700"
          style={{ opacity }}
        >
          <source src="/videos/bharat_ambient_bg.mp4" type="video/mp4" />
        </video>

        {/* Soft Vignette Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/30 pointer-events-none" />
      </div>

      {/* Subtle Floating Ambient Video Controls in bottom left */}
      <div className="fixed bottom-4 left-4 z-40 flex items-center gap-1.5 bg-[#1B2A4A]/85 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-amber-400/30 text-white text-[11px] shadow-lg transition-all">
        <button
          onClick={togglePlay}
          className="p-1 rounded-full hover:bg-white/20 transition-colors"
          title={isPlaying ? 'Pause Background Video' : 'Play Background Video'}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5 text-amber-300" /> : <Play className="w-3.5 h-3.5 text-amber-300" />}
        </button>

        <button
          onClick={toggleMute}
          className="p-1 rounded-full hover:bg-white/20 transition-colors"
          title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5 text-gray-300" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
        </button>

        <div className="h-3 w-px bg-white/20 mx-0.5" />

        <button
          onClick={() => setOpacity(prev => prev === 0 ? 0.35 : prev === 0.35 ? 0.6 : 0)}
          className="px-1.5 py-0.5 text-[10px] font-semibold text-amber-200 hover:text-white transition-colors"
          title="Adjust Background Video Visibility"
        >
          {opacity === 0 ? 'Video: Off' : opacity === 0.35 ? 'Video: Ambient' : 'Video: Vivid'}
        </button>
      </div>
    </>
  );
};
