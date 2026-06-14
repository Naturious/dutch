'use client';

import { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';

interface ShortcutGroup {
  title: string;
  shortcuts: { keys: string[]; description: string }[];
}

function getPageShortcuts(pathname: string): ShortcutGroup | null {
  switch (pathname) {
    case '/de-of-het':
      return {
        title: 'De of Het',
        shortcuts: [
          { keys: ['1', '←'], description: 'Kies "de"' },
          { keys: ['2', '→'], description: 'Kies "het"' },
        ],
      };
    case '/inversie':
      return {
        title: 'Inversie',
        shortcuts: [
          { keys: ['1', '2', '3', '4'], description: 'Kies optie' },
          { keys: ['Enter'], description: 'Volgende' },
        ],
      };
    case '/zinnen-bouwen':
      return {
        title: 'Zinnen Bouwen',
        shortcuts: [{ keys: ['Enter'], description: 'Controleer / Volgende' }],
      };
    case '/werkwoord-vervoegen':
      return {
        title: 'Werkwoord Vervoegen',
        shortcuts: [{ keys: ['Enter'], description: 'Controleer / Volgende' }],
      };
    case '/voltooid-deelwoord':
      return {
        title: 'Voltooid Deelwoord',
        shortcuts: [{ keys: ['Enter'], description: 'Controleer / Volgende' }],
      };
    case '/scheidbare-werkwoorden':
      return {
        title: 'Scheidbare Werkwoorden',
        shortcuts: [{ keys: ['Enter'], description: 'Controleer / Volgende' }],
      };
    default:
      return null;
  }
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-block bg-slate-100 border border-slate-300 rounded px-2 py-0.5 font-mono text-sm text-slate-700">
      {children}
    </kbd>
  );
}

export default function KeyboardShortcutsHelp() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInput =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable;

      if (e.key === 'Escape' && open) {
        setOpen(false);
        return;
      }

      if (e.key === '?' && !isInput) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    },
    [open]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!open) return null;

  const pageShortcuts = getPageShortcuts(pathname);

  const globalShortcuts: ShortcutGroup = {
    title: 'Globaal',
    shortcuts: [
      { keys: ['?'], description: 'Sneltoetsen tonen/verbergen' },
      { keys: ['h'], description: 'Ga naar home' },
    ],
  };

  const groups = [globalShortcuts, ...(pageShortcuts ? [pageShortcuts] : [])];

  return (
    <div
      data-shortcuts-modal
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 transition-opacity"
      onClick={() => setOpen(false)}
    >
      <div
        className="bg-white rounded-xl border border-slate-200 shadow-xl w-full max-w-md mx-4 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-slate-800">Sneltoetsen</h2>
          <button
            onClick={() => setOpen(false)}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-5">
          {groups.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">
                {group.title}
              </h3>
              <div className="space-y-2">
                {group.shortcuts.map((shortcut, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-sm text-slate-700">{shortcut.description}</span>
                    <div className="flex items-center gap-1">
                      {shortcut.keys.map((key, j) => (
                        <span key={j} className="flex items-center gap-1">
                          {j > 0 && <span className="text-xs text-slate-400">/</span>}
                          <Kbd>{key}</Kbd>
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-5 text-xs text-slate-400 text-center">
          Druk op <Kbd>?</Kbd> of <Kbd>Esc</Kbd> om te sluiten
        </p>
      </div>
    </div>
  );
}
