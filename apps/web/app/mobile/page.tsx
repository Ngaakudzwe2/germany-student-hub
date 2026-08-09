'use client';

import { useState } from 'react';
import { OnboardingFlow } from '@/components/mobile/onboarding-flow';
import { AppPreviewScreen } from '@/components/mobile/app-preview-screen';

export default function MobilePreviewPage() {
  const [view, setView] = useState<'onboarding' | 'app'>('onboarding');

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <p className="mb-4 text-center text-xs text-zinc-500">
        Mobile Preview — responsive web simulation of key phone workflows, not a native Expo build
      </p>

      <div className="relative mx-auto w-[320px] rounded-[2.5rem] border-[10px] border-zinc-800 bg-zinc-950 shadow-2xl shadow-black/60">
        <div className="absolute top-0 left-1/2 z-10 h-5 w-28 -translate-x-1/2 rounded-b-2xl bg-zinc-800" />

        <div className="scrollbar-thin h-[640px] overflow-y-auto rounded-[1.75rem] bg-zinc-950 px-4 pt-9 pb-6">
          {view === 'onboarding' ? (
            <OnboardingFlow onComplete={() => setView('app')} />
          ) : (
            <AppPreviewScreen />
          )}
        </div>
      </div>

      {view === 'app' && (
        <button
          type="button"
          onClick={() => setView('onboarding')}
          className="mx-auto mt-4 block text-xs text-zinc-500 hover:text-zinc-300"
        >
          ← Restart onboarding
        </button>
      )}
    </div>
  );
}
