import React, { useState, useEffect } from 'react';
import { Menu, X, FileText, ShieldCheck, Sun, Moon } from 'lucide-react';
import { DEVELOPER_PROFILE } from '../data/portfolioData';

interface NavbarProps {
  onOpenDossier: () => void;
  onOpenResume: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenDossier,
  onOpenResume,
  isDark,
  onToggleTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');

  const navLinks = [
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Security', href: '#security-architecture', id: 'security-architecture' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const viewportMiddle = scrollTop + window.innerHeight * 0.35;
      const sectionIds = ['hero', 'about', 'skills', 'projects', 'security-architecture', 'contact'];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (viewportMiddle >= top && viewportMiddle < top + height) {
            setActiveSection(id);
            break;
          } else if (viewportMiddle >= top) {
            setActiveSection(id);
          }
        }
      }
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full border-b backdrop-blur-xl transition-colors duration-300 ${
        isDark
          ? 'bg-[#080c14]/95 border-slate-800/90 text-white'
          : 'bg-white/95 border-slate-200 text-slate-900 shadow-sm'
      }`}
    >
      <div className="w-full max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 h-16 flex items-center justify-between">
        
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className={`text-lg font-extrabold tracking-tight transition-colors whitespace-nowrap flex items-center gap-2 ${
            isDark ? 'hover:text-emerald-400' : 'hover:text-emerald-600'
          }`}
        >
          <span className={`w-2.5 h-2.5 rounded-full animate-pulse ${
            isDark ? 'bg-emerald-400' : 'bg-emerald-600'
          }`} />
          <span>{DEVELOPER_PROFILE.name}</span>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav
          className={`hidden md:flex items-center gap-7 text-sm font-semibold ${
            isDark ? 'text-slate-300' : 'text-slate-700'
          }`}
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.label}
                href={link.href}
                className={`transition-colors py-1 relative ${
                  isActive
                    ? isDark
                      ? 'text-emerald-400 font-bold'
                      : 'text-emerald-700 font-bold'
                    : isDark
                    ? 'hover:text-emerald-400'
                    : 'hover:text-emerald-700'
                }`}
              >
                {link.label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-emerald-400 rounded-full"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenDossier}
            className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap cursor-pointer ${
              isDark
                ? 'text-emerald-400 border-emerald-500/30 hover:bg-emerald-950/40 hover:border-emerald-500/60'
                : 'text-emerald-800 border-emerald-300 hover:bg-emerald-50 hover:border-emerald-400 bg-white shadow-xs'
            }`}
            title="Open ShadowFox Internship Architecture Dossier (Press 'D')"
          >
            <ShieldCheck className={`w-3.5 h-3.5 ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`} />
            <span>Architecture Report</span>
            <kbd className={`hidden lg:inline-block ml-1 px-1.5 py-0.2 text-[10px] font-mono border rounded ${
              isDark
                ? 'text-emerald-300 bg-emerald-950/60 border-emerald-500/30'
                : 'text-emerald-800 bg-emerald-100/70 border-emerald-300'
            }`}>
              D
            </kbd>
          </button>

          <button
            onClick={onOpenResume}
            className={`hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap cursor-pointer ${
              isDark
                ? 'text-slate-200 bg-slate-900 border-slate-700 hover:bg-slate-800'
                : 'text-slate-800 bg-slate-100 border-slate-300 hover:bg-slate-200'
            }`}
            title="View Developer Resume (Press 'R')"
          >
            <FileText className="w-3.5 h-3.5 text-emerald-400" />
            <span>Resume</span>
            <kbd className="ml-1 px-1.5 py-0.2 text-[10px] font-mono text-slate-400 bg-slate-950 border border-slate-700 rounded">
              R
            </kbd>
          </button>

          <button
            onClick={onToggleTheme}
            aria-label="Toggle theme mode (Press 'M')"
            title="Toggle theme (Press 'M')"
            className={`relative p-2 rounded-lg border transition-colors flex items-center gap-1 cursor-pointer ${
              isDark
                ? 'text-slate-300 hover:text-white border-slate-800 hover:bg-slate-900'
                : 'text-slate-700 hover:text-slate-950 border-slate-300 hover:bg-slate-100'
            }`}
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            <kbd className="hidden sm:inline-block px-1 text-[9px] font-mono text-slate-400 bg-slate-900/60 border border-slate-700/80 rounded">
              M
            </kbd>
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            className={`md:hidden p-2 rounded-lg border transition-colors ${
              isDark
                ? 'text-slate-300 hover:text-white border-slate-800 hover:bg-slate-900'
                : 'text-slate-700 hover:text-slate-950 border-slate-300 hover:bg-slate-100'
            }`}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden border-b px-4 py-4 space-y-3 ${
            isDark ? 'bg-[#080c14] border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isDark
                    ? 'text-slate-300 hover:text-emerald-400 hover:bg-slate-900'
                    : 'text-slate-700 hover:text-emerald-600 hover:bg-slate-100'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDossier();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-emerald-400 border border-emerald-500/40 rounded-lg bg-emerald-950/20"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Architecture Report [D]</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-200 bg-slate-900 border border-slate-700 rounded-lg"
            >
              <FileText className="w-4 h-4" />
              <span>View Full Resume [R]</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
