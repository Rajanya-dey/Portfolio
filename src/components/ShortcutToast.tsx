import React from 'react';
import { Command } from 'lucide-react';

interface ShortcutToastProps {
  message: string | null;
  shortcutKey: string | null;
}

export const ShortcutToast: React.FC<ShortcutToastProps> = ({ message, shortcutKey }) => {
  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-neutral-900/95 border border-neutral-700/80 text-white shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 duration-200"
    >
      <Command className="w-3.5 h-3.5 text-emerald-400" />
      <span className="text-xs font-medium">{message}</span>
      {shortcutKey && (
        <kbd className="px-1.5 py-0.5 text-[10px] font-mono font-bold text-emerald-400 bg-neutral-950 border border-neutral-700 rounded">
          {shortcutKey}
        </kbd>
      )}
    </div>
  );
};
