'use client';

import { useEffect } from 'react';
import { Crown, X } from 'lucide-react';
import { HubPlusPricing } from './pricing-tiers';

interface HubPlusModalProps {
  open: boolean;
  onClose: () => void;
}

export function HubPlusModal({ open, onClose }: HubPlusModalProps) {
  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} aria-hidden />

      <div className="scrollbar-thin relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl shadow-black/60">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 rounded-full p-1.5 text-zinc-400 transition-colors hover:bg-white/10 hover:text-zinc-100"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="bg-gradient-to-b from-amber-500/10 to-transparent px-6 pt-8 pb-6 text-center">
          <span className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500">
            <Crown className="h-6 w-6 text-zinc-950" />
          </span>
          <h2 className="text-xl font-semibold text-zinc-50">Hub+ Pass</h2>
          <p className="mt-1 text-sm text-zinc-400">
            Unlock the full Germany Student Hub experience
          </p>
        </div>

        <div className="px-6 pb-6">
          <HubPlusPricing />
        </div>
      </div>
    </div>
  );
}
