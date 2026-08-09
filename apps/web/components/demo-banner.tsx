import { Sparkles } from 'lucide-react';
import { DEMO_MODE } from '@/lib/demo-mode';

export function DemoBanner() {
  if (!DEMO_MODE) return null;

  return (
    <div className="flex items-center justify-center gap-2 border-b border-white/10 bg-gradient-to-r from-emerald-500/15 via-cyan-500/15 to-indigo-500/15 px-4 py-1.5 text-center text-xs font-medium text-zinc-200">
      <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
      Demo Mode — sample data, sign-in bypassed, changes aren&apos;t saved.
    </div>
  );
}
