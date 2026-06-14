'use client';

import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import KeyboardShortcutsHelp from './KeyboardShortcutsHelp';

export default function GlobalShortcuts() {
  const router = useRouter();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInput =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable;

      if (isInput) return;

      if (e.key === 'h' && !e.metaKey && !e.ctrlKey && !e.altKey) {
        const modal = document.querySelector('[data-shortcuts-modal]');
        if (modal) return;
        e.preventDefault();
        router.push('/');
      }
    },
    [router]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return <KeyboardShortcutsHelp />;
}
