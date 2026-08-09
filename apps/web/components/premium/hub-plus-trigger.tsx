'use client';

import { useState } from 'react';
import { Crown } from 'lucide-react';
import { HubPlusModal } from './hub-plus-modal';

export function HubPlusTrigger() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-gradient-to-r from-amber-500/15 to-orange-500/15 px-3 py-1.5 text-xs font-semibold text-amber-300 transition-colors hover:border-amber-500/50"
      >
        <Crown className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Hub+</span>
      </button>
      <HubPlusModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
