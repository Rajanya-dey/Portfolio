import React, { useEffect } from 'react';
import { X, Command, Keyboard } from 'lucide-react';

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const shortcuts = [
    { key: 'M', label: 'Toggle Color Theme', description: 'Switch between Dark and Light mode' },
    { key: 'D', label: 'Architecture Dossier', description: 'Open ShadowFox evaluation & architecture report' },
    { key: 'R', label: 'Developer Resume', description: 'View and print full-stack curriculum vitae' },
    { key: 'P', label: 'Jump to Projects', description: 'Smooth scroll to production works' },
    { key: 'S', label: 'Jump to Skills', description: 'Smooth scroll to capability matrix' },
    { key: 'C', label: 'Jump to Contact', description: 'Smooth scroll to validated contact form' },
    { key: 'X', label: 'Cycle Custom Cursor', description: 'Switch between Cyber Reticle, Neon Orb, and Tech Diamond' },
    { key: '?', label: 'Shortcuts Cheatsheet', description: 'Toggle this developer navigation guide' },
    { key: 'Esc', label: 'Close Active Modal', description: 'Dismiss any open dialog or drawer' },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/85 backdrop-blur-md flex items-center justify-center p-4"
    >
      <div className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950/60">
          <div className="flex items-center gap-2 text-white font-semibold text-sm">
            <Keyboard className="w-4 h-4 text-emerald-400" />
            <span>Developer Keyboard Shortcuts</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close shortcuts"
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg border border-neutral-800 hover:bg-neutral-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Shortcuts List */}
        <div className="p-6 space-y-3">
          <p className="text-xs text-neutral-400 mb-4">
            Designed for engineers who navigate with their hands on the home row. Press any key directly from anywhere on the page (ignored when typing in form inputs).
          </p>

          <div className="divide-y divide-neutral-800/80">
            {shortcuts.map((sc) => (
              <div
                key={sc.key}
                className="py-2.5 flex items-center justify-between gap-4 text-xs"
              >
                <div>
                  <span className="font-semibold text-white block">{sc.label}</span>
                  <span className="text-neutral-400 text-[11px]">{sc.description}</span>
                </div>
                <kbd className="px-2.5 py-1 text-xs font-mono font-bold text-emerald-400 bg-neutral-950 border border-neutral-700/80 rounded-md shadow-sm shrink-0">
                  {sc.key}
                </kbd>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-neutral-800 bg-neutral-950/60 flex items-center justify-between text-xs text-neutral-400 font-mono">
          <span>Global Keybinding Engine</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 font-sans font-medium text-neutral-200 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
