import React, { useEffect, useState, useRef, useCallback } from 'react';

export type CursorStyle = 'reticle' | 'neon-orb' | 'diamond';

interface CustomCursorProps {
  isDark?: boolean;
}

interface ClickRipple {
  id: number;
  x: number;
  y: number;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ isDark = true }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isPointer, setIsPointer] = useState<boolean>(false);
  const [isText, setIsText] = useState<boolean>(false);
  const [isClicking, setIsClicking] = useState<boolean>(false);
  const [ripples, setRipples] = useState<ClickRipple[]>([]);
  const [cursorStyle, setCursorStyle] = useState<CursorStyle>(() => {
    const saved = localStorage.getItem('rajanya_cursor_style');
    return (saved as CursorStyle) || 'reticle';
  });

  // Position refs for high-performance direct animation without React re-render lag
  const mousePos = useRef<{ x: number; y: number }>({ x: -100, y: -100 });
  const followerPos = useRef<{ x: number; y: number }>({ x: -100, y: -100 });
  const dotRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);

  // Check if device has fine pointer (mouse/trackpad), not touch only
  const [isFinePointer, setIsFinePointer] = useState<boolean>(false);

  useEffect(() => {
    const checkPointer = () => {
      const fine = window.matchMedia('(pointer: fine)').matches;
      setIsFinePointer(fine);
    };
    checkPointer();
    window.addEventListener('resize', checkPointer);
    return () => window.removeEventListener('resize', checkPointer);
  }, []);

  // Sync cursor style to localStorage
  const handleSelectStyle = (style: CursorStyle) => {
    setCursorStyle(style);
    localStorage.setItem('rajanya_cursor_style', style);
  };

  // Listen to custom event if other components want to switch cursor style
  useEffect(() => {
    const handleStyleChange = (e: Event) => {
      const customEvent = e as CustomEvent<CursorStyle>;
      if (customEvent.detail) {
        setCursorStyle(customEvent.detail);
      }
    };
    window.addEventListener('change-cursor-style', handleStyleChange as EventListener);
    return () => window.removeEventListener('change-cursor-style', handleStyleChange as EventListener);
  }, []);

  // Update target element detection (pointer, text, etc.)
  const handleMouseMove = useCallback((e: MouseEvent) => {
    mousePos.current = { x: e.clientX, y: e.clientY };
    if (!isVisible) setIsVisible(true);

    // Fast target interrogation
    const target = e.target as HTMLElement | null;
    if (target) {
      const isInteractive = Boolean(
        target.closest('a, button, [role="button"], input[type="submit"], input[type="button"], select, [data-cursor="pointer"], .cursor-pointer')
      );
      const isTextInput = Boolean(
        target.closest('input[type="text"], input[type="email"], textarea, [contenteditable="true"]')
      );

      setIsPointer(isInteractive);
      setIsText(isTextInput);
    }
  }, [isVisible]);

  const handleMouseDown = useCallback((e: MouseEvent) => {
    setIsClicking(true);
    const newRipple: ClickRipple = {
      id: Date.now() + Math.random(),
      x: e.clientX,
      y: e.clientY,
    };
    setRipples((prev) => [...prev.slice(-3), newRipple]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsClicking(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsVisible(true);
  }, []);

  // Setup RAF lerp loop for ultra-smooth trailing reticle
  useEffect(() => {
    if (!isFinePointer) return;

    // Add class to body to hide default system arrow
    document.body.classList.add('custom-cursor-active');

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const animate = () => {
      // 0ms instant positioning for dot (instant feedback, no lag)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
      }

      // Smooth lerp for trailing reticle follower
      followerPos.current.x = lerp(followerPos.current.x, mousePos.current.x, 0.2);
      followerPos.current.y = lerp(followerPos.current.y, mousePos.current.y, 0.2);

      if (followerRef.current) {
        followerRef.current.style.transform = `translate3d(${followerPos.current.x}px, ${followerPos.current.y}px, 0)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isFinePointer, handleMouseMove, handleMouseDown, handleMouseUp, handleMouseLeave, handleMouseEnter]);

  if (!isFinePointer) {
    return null; // Don't render on mobile or touchscreens
  }

  // Determine size & styling classes based on hover state and cursor style
  const isReticle = cursorStyle === 'reticle';
  const isNeonOrb = cursorStyle === 'neon-orb';
  const isDiamond = cursorStyle === 'diamond';

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[9999] overflow-hidden transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* 1. Instant Precision Center Beacon (Follows mouse exactly) */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -ml-[4px] -mt-[4px] pointer-events-none will-change-transform z-[10000]"
      >
        <div
          className={`rounded-full transition-transform duration-150 ${
            isClicking ? 'scale-75' : isPointer ? 'scale-125' : 'scale-100'
          } ${
            isDark
              ? 'bg-emerald-400 shadow-[0_0_10px_#10b981,0_0_4px_#34d399]'
              : 'bg-emerald-600 shadow-[0_0_8px_#059669]'
          } w-2 h-2`}
        >
          {/* Micro center point */}
          <div className="w-1 h-1 bg-white rounded-full mx-auto my-auto opacity-90" />
        </div>
      </div>

      {/* 2. Fluid Trailing Reticle / HUD Follower */}
      <div
        ref={followerRef}
        className="fixed top-0 left-0 pointer-events-none will-change-transform z-[9999]"
      >
        <div
          className={`-translate-x-1/2 -translate-y-1/2 transition-all duration-200 ease-out flex items-center justify-center ${
            isClicking
              ? 'scale-75'
              : isPointer
              ? 'scale-150'
              : isText
              ? 'scale-90'
              : 'scale-100'
          }`}
        >
          {/* RETICLE STYLE: Futuristic Sci-Fi Crosshair Reticle */}
          {isReticle && (
            <div
              className={`relative transition-all duration-300 ${
                isPointer
                  ? 'w-11 h-11 border-2 border-emerald-400 bg-emerald-400/10 shadow-[0_0_20px_rgba(16,185,129,0.35)] rounded-full rotate-45'
                  : isText
                  ? 'w-7 h-10 border border-teal-400/60 bg-transparent rounded-sm'
                  : 'w-8 h-8 border border-emerald-400/60 rounded-full bg-emerald-500/5'
              }`}
            >
              {/* Tactical Crosshair Marks at Cardinal Points */}
              {!isText && (
                <>
                  {/* Top tick */}
                  <span
                    className={`absolute -top-1 left-1/2 -translate-x-1/2 w-[2px] transition-all duration-200 ${
                      isPointer ? 'h-2 bg-emerald-400' : 'h-1.5 bg-emerald-400/70'
                    }`}
                  />
                  {/* Bottom tick */}
                  <span
                    className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-[2px] transition-all duration-200 ${
                      isPointer ? 'h-2 bg-emerald-400' : 'h-1.5 bg-emerald-400/70'
                    }`}
                  />
                  {/* Left tick */}
                  <span
                    className={`absolute top-1/2 -left-1 -translate-y-1/2 h-[2px] transition-all duration-200 ${
                      isPointer ? 'w-2 bg-emerald-400' : 'w-1.5 bg-emerald-400/70'
                    }`}
                  />
                  {/* Right tick */}
                  <span
                    className={`absolute top-1/2 -right-1 -translate-y-1/2 h-[2px] transition-all duration-200 ${
                      isPointer ? 'w-2 bg-emerald-400' : 'w-1.5 bg-emerald-400/70'
                    }`}
                  />
                </>
              )}

              {/* Target lock corner accents when hovering interactive buttons */}
              {isPointer && (
                <>
                  <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-cyan-400" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-cyan-400" />
                  <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-cyan-400" />
                  <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-cyan-400" />
                </>
              )}

              {/* Text beam indicators when over inputs */}
              {isText && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[1.5px] h-5 bg-teal-400 animate-pulse" />
                </div>
              )}
            </div>
          )}

          {/* NEON ORB STYLE: Radiant Energy Ring */}
          {isNeonOrb && (
            <div
              className={`relative rounded-full transition-all duration-300 ${
                isPointer
                  ? 'w-12 h-12 border-2 border-teal-400 bg-teal-400/15 shadow-[0_0_24px_rgba(45,212,191,0.5)]'
                  : 'w-8 h-8 border border-teal-400/70 bg-teal-500/10 shadow-[0_0_12px_rgba(45,212,191,0.3)]'
              }`}
            >
              <div className="absolute inset-1 rounded-full border border-teal-300/30 animate-spin" style={{ animationDuration: '8s' }} />
            </div>
          )}

          {/* DIAMOND STYLE: Sharp Cyber-Diamond */}
          {isDiamond && (
            <div
              className={`relative rotate-45 transition-all duration-300 ${
                isPointer
                  ? 'w-10 h-10 border-2 border-cyan-400 bg-cyan-400/15 shadow-[0_0_20px_rgba(6,182,212,0.4)]'
                  : 'w-7 h-7 border border-cyan-400/70 bg-cyan-500/5'
              }`}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-cyan-400 rounded-xs" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. Click Ripples / Shockwaves */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="fixed pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-400/80 animate-ping"
          style={{
            left: `${ripple.x}px`,
            top: `${ripple.y}px`,
            width: '40px',
            height: '40px',
            animationDuration: '500ms',
          }}
        />
      ))}
    </div>
  );
};
