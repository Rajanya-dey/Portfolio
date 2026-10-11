import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronUp, Compass, Check } from 'lucide-react';

interface ScrollProgressIndicatorProps {
  isDark?: boolean;
}

interface SectionInfo {
  id: string;
  label: string;
  shortLabel: string;
}

const SECTIONS: SectionInfo[] = [
  { id: 'hero', label: 'Introduction', shortLabel: 'Intro' },
  { id: 'about', label: 'About Rajanya', shortLabel: 'About' },
  { id: 'skills', label: 'Skills & Tech Matrix', shortLabel: 'Skills' },
  { id: 'projects', label: 'Featured Projects', shortLabel: 'Projects' },
  { id: 'contact', label: 'Contact & Security', shortLabel: 'Contact' },
];

export const ScrollProgressIndicator: React.FC<ScrollProgressIndicatorProps> = ({ isDark = true }) => {
  const [progress, setProgress] = useState<number>(0);
  const [activeSection, setActiveSection] = useState<SectionInfo>(SECTIONS[0]);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [hoveredPercent, setHoveredPercent] = useState<number | null>(null);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [hoverPositionX, setHoverPositionX] = useState<number>(0);
  const [isPillExpanded, setIsPillExpanded] = useState<boolean>(false);
  const barRef = useRef<HTMLDivElement>(null);

  // Compute scroll progress & current active section in viewport
  const updateScrollData = useCallback(() => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    const rawProgress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    const clampedProgress = Math.min(Math.max(rawProgress, 0), 100);
    setProgress(clampedProgress);
    setIsScrolled(scrollTop > 60);

    // Determine active section based on current scroll position
    const viewportMiddle = scrollTop + window.innerHeight * 0.35;
    let current = SECTIONS[0];

    for (const sec of SECTIONS) {
      const el = document.getElementById(sec.id);
      if (el) {
        const top = el.offsetTop;
        const height = el.offsetHeight;
        if (viewportMiddle >= top && viewportMiddle < top + height) {
          current = sec;
          break;
        } else if (viewportMiddle >= top) {
          current = sec;
        }
      }
    }
    setActiveSection(current);
  }, []);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateScrollData();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    // Initial check
    updateScrollData();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [updateScrollData]);

  // Click on progress bar to seek / navigate
  const handleBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!barRef.current) return;
    const rect = barRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = Math.min(Math.max(clickX / rect.width, 0), 1);
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const targetScroll = percent * docHeight;

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    });
  };

  // Hover preview calculations
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!barRef.current) return;
    const rect = barRef.current.getBoundingClientRect();
    const hoverX = Math.min(Math.max(e.clientX - rect.left, 0), rect.width);
    const percent = (hoverX / rect.width) * 100;
    setHoveredPercent(Math.round(percent));
    setHoverPositionX(e.clientX);

    // Approximate section for hover position
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const targetY = (percent / 100) * docHeight + window.innerHeight * 0.35;
    let previewSec = SECTIONS[0].shortLabel;

    for (const sec of SECTIONS) {
      const el = document.getElementById(sec.id);
      if (el) {
        const top = el.offsetTop;
        const height = el.offsetHeight;
        if (targetY >= top && targetY < top + height) {
          previewSec = sec.shortLabel;
          break;
        } else if (targetY >= top) {
          previewSec = sec.shortLabel;
        }
      }
    }
    setHoveredSection(previewSec);
  };

  const handleMouseLeave = () => {
    setHoveredPercent(null);
    setHoveredSection(null);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsPillExpanded(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsPillExpanded(false);
  };

  return (
    <>
      {/* Slim Persistent Progress Bar Container at the Top of Viewport */}
      <aside
        ref={barRef}
        role="progressbar"
        aria-label="Reading scroll progress"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        onClick={handleBarClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="fixed top-0 left-0 right-0 z-[100] h-2 group cursor-pointer select-none"
        title={`Page progress: ${Math.round(progress)}% - Click to seek`}
      >
        {/* Track Background */}
        <div
          className={`w-full h-[3px] group-hover:h-[6px] transition-all duration-200 relative ${
            isDark ? 'bg-slate-900/90' : 'bg-slate-200/90'
          }`}
        >
          {/* Active Fill Bar with glowing gradient */}
          <div
            className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 relative transition-all duration-75 ease-out shadow-[0_0_14px_rgba(16,185,129,0.9)]"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(to right, #10b981, #2dd4bf, #22d3ee)',
            }}
          >
            {/* Glowing Leading Dot Pulse */}
            {progress > 0 && progress < 99.5 && (
              <span
                aria-hidden="true"
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2.5 h-2.5 group-hover:w-3.5 group-hover:h-3.5 rounded-full bg-emerald-200 shadow-[0_0_8px_#34d399,0_0_16px_#10b981] transition-all"
              />
            )}
          </div>
        </div>

        {/* Hover Seek Tooltip */}
        {hoveredPercent !== null && (
          <div
            className="fixed top-3 -translate-x-1/2 pointer-events-none transition-opacity duration-150 z-[110]"
            style={{ left: `${hoverPositionX}px` }}
          >
            <div
              className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-medium shadow-xl border flex items-center gap-1.5 backdrop-blur-md ${
                isDark
                  ? 'bg-slate-900/95 border-emerald-500/40 text-emerald-300'
                  : 'bg-white/95 border-emerald-500/40 text-emerald-800'
              }`}
            >
              <span>{hoveredSection}</span>
              <span className="opacity-40">•</span>
              <span className="font-bold">{hoveredPercent}%</span>
            </div>
          </div>
        )}
      </aside>

      {/* Persistent Navigation Context Badge (Floats at top viewport below fixed header when scrolled) */}
      <div
        className={`fixed top-[72px] right-4 sm:right-6 z-[60] transition-all duration-300 ${
          isScrolled
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-3 pointer-events-none'
        }`}
      >
        <div className="relative">
          {/* Compact Pill */}
          <div
            className={`flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-full text-xs font-medium border shadow-lg backdrop-blur-md transition-colors ${
              isDark
                ? 'bg-slate-900/90 border-slate-700/80 text-slate-200 shadow-slate-950/60'
                : 'bg-white/90 border-slate-300/80 text-slate-800 shadow-slate-200'
            }`}
          >
            {/* Section Indicator Dot */}
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>

            {/* Current Active Section */}
            <button
              onClick={() => setIsPillExpanded((prev) => !prev)}
              className="font-semibold hover:text-emerald-400 transition-colors flex items-center gap-1 cursor-pointer"
              title="Click to switch sections"
            >
              <span className="max-w-[110px] sm:max-w-none truncate">{activeSection.shortLabel}</span>
              <span className="text-[10px] font-mono px-1 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                {Math.round(progress)}%
              </span>
            </button>

            {/* Back to top micro-button */}
            <button
              onClick={scrollToTop}
              className={`p-1 rounded-full hover:bg-emerald-500/20 text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer ${
                progress > 25 ? 'opacity-100' : 'opacity-40 pointer-events-none'
              }`}
              title="Scroll to top"
              aria-label="Scroll to top"
            >
              <ChevronUp className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Jump Dropdown Menu */}
          {isPillExpanded && (
            <div
              className={`absolute right-0 mt-2 w-52 rounded-xl border p-1.5 shadow-2xl backdrop-blur-xl z-50 transition-all ${
                isDark
                  ? 'bg-slate-900/95 border-slate-700 text-slate-100'
                  : 'bg-white/95 border-slate-200 text-slate-900'
              }`}
            >
              <div className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center justify-between border-b border-slate-800/40 mb-1">
                <span className="flex items-center gap-1">
                  <Compass className="w-3 h-3 text-emerald-400" />
                  <span>Navigation Landmarks</span>
                </span>
                <span className="text-emerald-400">{Math.round(progress)}%</span>
              </div>

              <div className="space-y-0.5">
                {SECTIONS.map((sec) => {
                  const isCurrent = sec.id === activeSection.id;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => scrollToSection(sec.id)}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium text-left transition-colors cursor-pointer ${
                        isCurrent
                          ? 'bg-emerald-500/15 text-emerald-400 font-bold'
                          : isDark
                          ? 'hover:bg-slate-800 text-slate-300 hover:text-white'
                          : 'hover:bg-slate-100 text-slate-700 hover:text-slate-950'
                      }`}
                    >
                      <span>{sec.label}</span>
                      {isCurrent && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                    </button>
                  );
                })}
              </div>

              <div className="mt-1 pt-1 border-t border-slate-800/40">
                <button
                  onClick={scrollToTop}
                  className={`w-full flex items-center justify-center gap-1 py-1 rounded-md text-[11px] font-mono text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10 transition-colors cursor-pointer`}
                >
                  <ChevronUp className="w-3 h-3" />
                  <span>Return to Top</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
