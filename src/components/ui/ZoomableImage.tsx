'use client';

import React, { useState } from 'react';
import { ZoomIn, X, RotateCcw, Plus, Minus } from 'lucide-react';

interface ZoomableImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  caption?: string;
  badgePosition?: 'top-right' | 'bottom-right' | 'center';
  containerClassName?: string;
}

export const ZoomableImage: React.FC<ZoomableImageProps> = ({
  src,
  alt = 'Image preview',
  className = '',
  caption,
  badgePosition = 'top-right',
  containerClassName = '',
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scale, setScale] = useState(1);

  const handleOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale(1);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setScale(1);
  };

  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale(prev => Math.min(prev + 0.3, 3));
  };

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale(prev => Math.max(prev - 0.3, 0.6));
  };

  const handleResetZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale(1);
  };

  return (
    <>
      <div 
        className={`relative group cursor-zoom-in inline-block overflow-hidden ${containerClassName}`}
        onClick={handleOpen}
        title="Click to Zoom Image"
      >
        <img
          src={src}
          alt={alt}
          className={`transition-transform duration-300 group-hover:scale-[1.02] ${className}`}
          {...props}
        />

        {/* Hover Zoom Badge */}
        <div className={`absolute pointer-events-none transition-all duration-200 opacity-0 group-hover:opacity-100 ${
          badgePosition === 'top-right' ? 'top-3 right-3' : 
          badgePosition === 'bottom-right' ? 'bottom-3 right-3' : 
          'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
        }`}>
          <div className="bg-[#1B2A4A]/90 backdrop-blur-md text-amber-300 border border-amber-400/40 text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1.5">
            <ZoomIn className="w-3.5 h-3.5" />
            <span>Click to Zoom</span>
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex flex-col items-center justify-between p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={handleClose}
        >
          {/* Top Controls Bar */}
          <div className="w-full max-w-5xl flex items-center justify-between gap-4 text-white z-10 shrink-0" onClick={e => e.stopPropagation()}>
            <div className="text-xs sm:text-sm font-medium text-gray-300 truncate max-w-md">
              {alt}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleZoomOut}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors"
                title="Zoom Out"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono px-2 text-amber-300 font-bold">
                {Math.round(scale * 100)}%
              </span>
              <button
                onClick={handleZoomIn}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors"
                title="Zoom In"
              >
                <Plus className="w-4 h-4" />
              </button>
              <button
                onClick={handleResetZoom}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors"
                title="Reset Zoom"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={handleClose}
                className="p-2 rounded-xl bg-red-600/80 hover:bg-red-600 text-white transition-colors ml-2"
                title="Close (ESC)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Centered Zoomable Canvas */}
          <div className="flex-1 w-full max-w-6xl flex items-center justify-center overflow-auto my-auto p-2 select-none" onClick={e => e.stopPropagation()}>
            <img
              src={src}
              alt={alt}
              style={{ transform: `scale(${scale})` }}
              className="max-h-[80vh] max-w-full object-contain rounded-xl shadow-2xl transition-transform duration-200"
            />
          </div>

          {/* Bottom Caption Bar */}
          {(caption || alt) && (
            <div className="w-full max-w-3xl bg-[#1B2A4A]/90 backdrop-blur-md text-center p-3 rounded-xl border border-amber-500/30 text-white text-xs sm:text-sm font-serif z-10 shrink-0 shadow-lg" onClick={e => e.stopPropagation()}>
              <span className="text-amber-300 font-semibold mr-1.5">✦</span>
              <span>{caption || alt}</span>
            </div>
          )}
        </div>
      )}
    </>
  );
};
