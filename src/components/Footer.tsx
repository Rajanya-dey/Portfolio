import React, { useState, useEffect } from 'react';
import { ShieldCheck, ArrowUp, Github, Linkedin, Crosshair } from 'lucide-react';
import { DEVELOPER_PROFILE } from '../data/portfolioData';

interface FooterProps {
  onOpenDossier: () => void;
  onOpenShortcuts?: () => void;
  isDark?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDossier, onOpenShortcuts, isDark = true }) => {
  const [cursorStyle, setCursorStyle] = useState<string>(() => {
    return localStorage.getItem('rajanya_cursor_style') || 'reticle';
  });

  useEffect(() => {
    const handleStyleChange = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) setCursorStyle(customEvent.detail);
    };
    window.addEventListener('change-cursor-style', handleStyleChange as EventListener);
    return () => window.removeEventListener('change-cursor-style', handleStyleChange as EventListener);
  }, []);

  const handleCycleCursor = () => {
    const styles = ['reticle', 'neon-orb', 'diamond'];
    const nextIdx = (styles.indexOf(cursorStyle) + 1) % styles.length;
    const nextStyle = styles[nextIdx];
    setCursorStyle(nextStyle);
    localStorage.setItem('rajanya_cursor_style', nextStyle);
    window.dispatchEvent(new CustomEvent('change-cursor-style', { detail: nextStyle }));
  };

  const cursorLabels: Record<string, string> = {
    'reticle': 'Reticle',
    'neon-orb': 'Neon Orb',
    'diamond': 'Diamond',
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className={`border-t py-12 text-xs transition-colors duration-300 ${
        isDark ? 'border-slate-800 bg-[#080c14] text-slate-400' : 'border-slate-200 bg-white text-slate-600'
      }`}
    >
      <div className="w-full max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <span className={`text-base font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {DEVELOPER_PROFILE.name}
            </span>
            <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
              <span className={`font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>Full Stack MERN Developer</span>
              <span aria-hidden="true" className={isDark ? 'text-slate-600' : 'text-slate-400'}>
                ·
              </span>
              <span className={isDark ? 'text-slate-300' : 'text-slate-600'}>
                Kolkata, India
              </span>
              <span aria-hidden="true" className={isDark ? 'text-slate-600' : 'text-slate-400'}>
                ·
              </span>
              <span className={`font-bold ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>
                Internal SIH '24 Finalist
              </span>
            </div>
          </div>

          <div
            className={`flex flex-wrap items-center gap-5 font-medium ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}
          >
            <a href="#about" className={`transition-colors ${isDark ? 'hover:text-emerald-400' : 'hover:text-emerald-700'}`}>
              About
            </a>
            <a href="#skills" className={`transition-colors ${isDark ? 'hover:text-emerald-400' : 'hover:text-emerald-700'}`}>
              Skills
            </a>
            <a href="#projects" className={`transition-colors ${isDark ? 'hover:text-emerald-400' : 'hover:text-emerald-700'}`}>
              Projects
            </a>
            <a href="#security-architecture" className={`transition-colors ${isDark ? 'hover:text-emerald-400' : 'hover:text-emerald-700'}`}>
              Security
            </a>
            <a href="#contact" className={`transition-colors ${isDark ? 'hover:text-emerald-400' : 'hover:text-emerald-700'}`}>
              Contact
            </a>
            <a
              href="https://github.com/Rajanya-dey"
              target="_blank"
              rel="noreferrer"
              className={`hover:underline inline-flex items-center gap-1 font-mono font-bold ${
                isDark ? 'text-emerald-400' : 'text-emerald-700'
              }`}
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <a
              href={DEVELOPER_PROFILE.linkedin}
              target="_blank"
              rel="noreferrer"
              className={`hover:underline inline-flex items-center gap-1 font-mono font-bold ${
                isDark ? 'text-cyan-400' : 'text-cyan-700'
              }`}
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
            <button
              onClick={onOpenDossier}
              className="text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1 font-mono font-semibold cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Dossier [D]</span>
            </button>
            {onOpenShortcuts && (
              <button
                onClick={onOpenShortcuts}
                className="hover:text-emerald-400 inline-flex items-center gap-1 font-mono cursor-pointer"
                title="View keyboard navigation shortcuts"
              >
                <span>Shortcuts</span>
                <kbd
                  className={`px-1 text-[10px] rounded font-bold ${
                    isDark
                      ? 'bg-slate-900 border border-slate-700 text-emerald-400'
                      : 'bg-slate-100 border border-slate-300 text-emerald-600'
                  }`}
                >
                  ?
                </kbd>
              </button>
            )}
            <button
              onClick={handleCycleCursor}
              className={`hover:text-emerald-400 inline-flex items-center gap-1.5 font-mono cursor-pointer transition-colors px-2 py-0.5 rounded border ${
                isDark
                  ? 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-emerald-500/50 hover:text-emerald-300'
                  : 'bg-slate-100 border-slate-300 text-slate-700 hover:border-emerald-500/50 hover:text-emerald-700'
              }`}
              title="Click or press 'X' to cycle custom cursor style"
            >
              <Crosshair className="w-3.5 h-3.5 text-emerald-400" />
              <span>Cursor: {cursorLabels[cursorStyle] || 'Reticle'}</span>
              <kbd
                className={`px-1 text-[9px] rounded font-bold ${
                  isDark
                    ? 'bg-slate-800 border border-slate-700 text-emerald-400'
                    : 'bg-white border border-slate-300 text-emerald-600'
                }`}
              >
                X
              </kbd>
            </button>
          </div>
        </div>

        <div
          className={`pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono ${
            isDark ? 'border-slate-800/80 text-slate-400' : 'border-slate-200 text-slate-500'
          }`}
        >
          <div>
            © {new Date().getFullYear()} {DEVELOPER_PROFILE.name} · MSIT Kolkata · ShadowFox Full Stack Evaluation.
          </div>

          <div className="flex items-center gap-4">
            <span className="text-emerald-400 font-semibold">WCAG AA Compliant</span>
            <span aria-hidden="true" className={isDark ? 'text-slate-700' : 'text-slate-300'}>
              ·
            </span>
            <button
              onClick={scrollToTop}
              className={`flex items-center gap-1 transition-colors cursor-pointer ${
                isDark ? 'text-slate-300 hover:text-white' : 'text-slate-700 hover:text-slate-950'
              }`}
              title="Return to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3 h-3 text-emerald-400" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
