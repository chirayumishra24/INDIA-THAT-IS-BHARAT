'use client';

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ZoomIn, X, RotateCcw, Plus, Minus, Move } from 'lucide-react';

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
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle body scroll locking & keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      } else if (e.key === '+' || e.key === '=') {
        setScale(prev => Math.min(prev + 0.3, 3.5));
      } else if (e.key === '-') {
        setScale(prev => Math.max(prev - 0.3, 0.6));
      } else if (e.key === '0') {
        handleResetZoom();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleOpen = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setScale(1);
    setPosition({ x: 0, y: 0 });
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale(prev => Math.min(prev + 0.3, 3.5));
  };

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale(prev => Math.max(prev - 0.3, 0.6));
  };

  const handleResetZoom = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  // Dragging / panning logic for high zoom
  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale <= 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || scale <= 1) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const modalContent = isOpen && mounted ? (
    <div 
      className="fixed inset-0 z-[99999] bg-black/92 backdrop-blur-md flex flex-col justify-between p-3 sm:p-6 select-none animate-in fade-in duration-200"
      onClick={handleClose}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{ isolation: 'isolate' }}
    >
      {/* Prominent Floating Top-Right Cross Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleClose();
        }}
        className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/80 hover:bg-red-600 border-2 border-white/40 hover:border-white text-white shadow-2xl transition-all duration-200 flex items-center justify-center hover:scale-110 active:scale-95 group focus:outline-none focus:ring-4 focus:ring-red-500/50"
        title="Close Preview (ESC)"
        aria-label="Close image preview"
      >
        <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
      </button>

      {/* Top Controls Bar */}
      <div 
        className="w-full max-w-6xl mx-auto flex items-center justify-between gap-4 text-white z-20 shrink-0 pb-2 pr-14 sm:pr-16 border-b border-white/10"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-200 truncate">
          <ZoomIn className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="truncate">{alt}</span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {scale > 1 && (
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-gray-400 bg-white/10 px-2 py-1 rounded-lg">
              <Move className="w-3 h-3" />
              <span>Drag to Pan</span>
            </span>
          )}

          <button
            onClick={handleZoomOut}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all active:scale-95"
            title="Zoom Out (-)"
          >
            <Minus className="w-4 h-4" />
          </button>
          
          <span className="text-xs font-mono px-2 text-amber-300 font-bold min-w-[50px] text-center">
            {Math.round(scale * 100)}%
          </span>

          <button
            onClick={handleZoomIn}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all active:scale-95"
            title="Zoom In (+)"
          >
            <Plus className="w-4 h-4" />
          </button>

          <button
            onClick={handleResetZoom}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all active:scale-95"
            title="Reset Zoom (0)"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Zoomed Image Stage */}
      <div 
        className={`flex-1 w-full max-w-7xl mx-auto flex items-center justify-center overflow-hidden my-auto p-2 ${
          scale > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'
        }`}
        onMouseDown={handleMouseDown}
        onClick={e => e.stopPropagation()}
      >
        <img
          src={src}
          alt={alt}
          style={{ 
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transition: isDragging ? 'none' : 'transform 0.15s ease-out'
          }}
          className="max-h-[75vh] max-w-full object-contain rounded-xl shadow-2xl pointer-events-auto select-none"
          draggable={false}
        />
      </div>

      {/* Bottom Caption Bar */}
      {(caption || alt) && (
        <div 
          className="w-full max-w-3xl mx-auto bg-[#1B2A4A]/95 backdrop-blur-md text-center p-3 rounded-2xl border border-amber-500/40 text-white text-xs sm:text-sm font-serif z-20 shrink-0 shadow-2xl"
          onClick={e => e.stopPropagation()}
        >
          <span className="text-amber-300 font-semibold mr-1.5">✦</span>
          <span>{caption || alt}</span>
        </div>
      )}
    </div>
  ) : null;

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

      {/* Render via Portal to document.body */}
      {modalContent && typeof document !== 'undefined' ? createPortal(modalContent, document.body) : null}
    </>
  );
};
