import { Crown } from 'lucide-react';
import { HubPlusPricing } from '@/components/premium/pricing-tiers';

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <div className="mb-8 text-center">
        <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500">
          <Crown className="h-6 w-6 text-zinc-950" />
        </span>
        <h1 className="text-2xl font-semibold text-zinc-50 sm:text-3xl">Hub+ Pass</h1>
        <p className="mt-2 text-sm text-zinc-400">
          One plan, everything unlocked. Start with a 7-day free trial, cancel anytime.
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
        <HubPlusPricing />
      </div>
    </div>
  );
}
