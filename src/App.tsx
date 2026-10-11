import React, { useState, useEffect, useCallback } from 'react';
import { ScrollProgressIndicator } from './components/ScrollProgressIndicator';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ShadowFoxDossierModal } from './components/ShadowFoxDossierModal';
import { ResumeModal } from './components/ResumeModal';
import { KeyboardShortcutsModal } from './components/KeyboardShortcutsModal';
import { ShortcutToast } from './components/ShortcutToast';

export default function App() {
  const [isDark, setIsDark] = useState<boolean>(true);
  const [dossierOpen, setDossierOpen] = useState<boolean>(false);
  const [resumeOpen, setResumeOpen] = useState<boolean>(false);
  const [shortcutsOpen, setShortcutsOpen] = useState<boolean>(false);

  // Quick toast feedback state
  const [toast, setToast] = useState<{ message: string; key: string } | null>(null);

  const showToast = (message: string, key: string) => {
    setToast({ message, key });
    setTimeout(() => {
      setToast((current) => (current?.key === key ? null : current));
    }, 1800);
  };

  // Theme toggle sync
  useEffect(() => {
    const savedTheme = localStorage.getItem('sf_theme');
    if (savedTheme === 'light') {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    } else {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const handleToggleTheme = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('sf_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('sf_theme', 'light');
      }
      return next;
    });
  }, []);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Do not trigger single-key navigation when typing inside form inputs
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable)
      ) {
        return;
      }

      // Do not trigger if modifier keys like Ctrl or Cmd are held down (e.g. Cmd+R, Ctrl+D)
      if (e.metaKey || e.ctrlKey || e.altKey) {
        return;
      }

      const key = e.key.toLowerCase();

      // 'm' -> Toggle dark/light theme
      if (key === 'm') {
        e.preventDefault();
        handleToggleTheme();
        showToast('Color theme switched', 'M');
        return;
      }

      // 'd' -> Toggle Architecture Dossier modal
      if (key === 'd') {
        e.preventDefault();
        setDossierOpen((prev) => {
          const next = !prev;
          if (next) {
            setResumeOpen(false);
            setShortcutsOpen(false);
            showToast('Architecture Dossier opened', 'D');
          }
          return next;
        });
        return;
      }

      // 'r' -> Toggle Resume modal
      if (key === 'r') {
        e.preventDefault();
        setResumeOpen((prev) => {
          const next = !prev;
          if (next) {
            setDossierOpen(false);
            setShortcutsOpen(false);
            showToast('Developer Resume opened', 'R');
          }
          return next;
        });
        return;
      }

      // 'p' -> Jump to Projects
      if (key === 'p') {
        e.preventDefault();
        const el = document.getElementById('projects');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          showToast('Navigated to Projects', 'P');
        }
        return;
      }

      // 's' -> Jump to Skills
      if (key === 's') {
        e.preventDefault();
        const el = document.getElementById('skills');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          showToast('Navigated to Skills Matrix', 'S');
        }
        return;
      }

      // 'c' -> Jump to Contact and focus form
      if (key === 'c') {
        e.preventDefault();
        const el = document.getElementById('contact');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          showToast('Navigated to Contact', 'C');
          const nameInput = document.getElementById('name') as HTMLInputElement | null;
          if (nameInput) {
            setTimeout(() => nameInput.focus(), 400);
          }
        }
        return;
      }

      // 'x' -> Cycle Custom Cursor Style (Reticle -> Neon Orb -> Diamond)
      if (key === 'x') {
        e.preventDefault();
        const current = localStorage.getItem('rajanya_cursor_style') || 'reticle';
        const styles: ('reticle' | 'neon-orb' | 'diamond')[] = ['reticle', 'neon-orb', 'diamond'];
        const labels: Record<string, string> = {
          'reticle': 'Cyber Reticle',
          'neon-orb': 'Neon Energy Orb',
          'diamond': 'Tech Diamond',
        };
        const nextIdx = (styles.indexOf(current as any) + 1) % styles.length;
        const nextStyle = styles[nextIdx];
        localStorage.setItem('rajanya_cursor_style', nextStyle);
        window.dispatchEvent(new CustomEvent('change-cursor-style', { detail: nextStyle }));
        showToast(`Cursor: ${labels[nextStyle]}`, 'X');
        return;
      }

      // '?' or '/' -> Toggle keyboard shortcuts help
      if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        e.preventDefault();
        setShortcutsOpen((prev) => !prev);
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleToggleTheme]);

  return (
    <div
      className={`min-h-screen w-full overflow-x-clip ${
        isDark ? 'bg-[#080c14] text-slate-100' : 'bg-slate-50 text-slate-900'
      } transition-colors duration-300 font-sans`}
    >
      {/* Unique Futuristic Custom Cursor (Crosshair Reticle & Particle Follower) */}
      <CustomCursor isDark={isDark} />

      {/* Navigation - Frozen (fixed) permanently at the top */}
      <Navbar
        onOpenDossier={() => setDossierOpen(true)}
        onOpenResume={() => setResumeOpen(true)}
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
      />

      {/* Slim Persistent Scroll Progress Indicator & Context Pill */}
      <ScrollProgressIndicator isDark={isDark} />

      {/* Main Content Area - pt-16 ensures content starts below 64px fixed header */}
      <main className="pt-16">
        {/* 1. Hero Section (Profile picture & bio) - Scrolls normally */}
        <Hero
          onOpenDossier={() => setDossierOpen(true)}
          onOpenResume={() => setResumeOpen(true)}
          isDark={isDark}
        />

        {/* 2. About Section */}
        <About isDark={isDark} />

        {/* 3. Skills & Tools Section */}
        <Skills isDark={isDark} />

        {/* 4. Projects Section */}
        <Projects isDark={isDark} />

        {/* 5. Contact Section with Robust Validation & Security */}
        <Contact isDark={isDark} />
      </main>

      {/* Footer */}
      <Footer
        onOpenDossier={() => setDossierOpen(true)}
        onOpenShortcuts={() => setShortcutsOpen(true)}
        isDark={isDark}
      />

      {/* Modals */}
      <ShadowFoxDossierModal
        isOpen={dossierOpen}
        onClose={() => setDossierOpen(false)}
      />

      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />

      <KeyboardShortcutsModal
        isOpen={shortcutsOpen}
        onClose={() => setShortcutsOpen(false)}
      />

      {/* Interactive feedback toast on key press */}
      <ShortcutToast
        message={toast?.message ?? null}
        shortcutKey={toast?.key ?? null}
      />
    </div>
  );
}
