'use client';

import { useState } from 'react';
import { Check, Sparkles } from 'lucide-react';
import { PRICING_TIERS, PRICING_VALUE_PROPS, type TierId } from '@/lib/pricing';

export function HubPlusPricing() {
  const [selectedTier, setSelectedTier] = useState<TierId>('monthly');
  const [checkoutState, setCheckoutState] = useState<'idle' | 'sandbox'>('idle');

  return (
    <div>
      <div className="mb-6 space-y-2.5">
        {PRICING_VALUE_PROPS.map((prop) => {
          const Icon = prop.icon;
          return (
            <div key={prop.text} className="flex items-start gap-3 text-sm text-zinc-300">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15">
                <Icon className="h-3 w-3 text-emerald-400" />
              </span>
              {prop.text}
            </div>
          );
        })}
      </div>

      {checkoutState === 'idle' ? (
        <>
          <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {PRICING_TIERS.map((tier) => (
              <TierCard
                key={tier.id}
                active={selectedTier === tier.id}
                onClick={() => setSelectedTier(tier.id)}
                eyebrow={tier.eyebrow}
                price={tier.price}
                cadence={tier.cadence}
                highlighted={tier.highlighted}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => setCheckoutState('sandbox')}
            className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 py-3 text-sm font-semibold text-zinc-950"
          >
            <Sparkles className="h-4 w-4" />
            Continue to Free Trial
          </button>
          <p className="mt-2 text-center text-[11px] text-zinc-600">
            Full unrestricted access for 7 days. No charge until the trial ends. Cancel anytime.
          </p>
        </>
      ) : (
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-5 text-center">
          <p className="mb-1 text-sm font-medium text-amber-300">Sandbox mode</p>
          <p className="text-sm text-zinc-400">
            This is a UI prototype — no charge was made. Connect a real Stripe account and a
            checkout API route to enable live payments here.
          </p>
          <button
            type="button"
            onClick={() => setCheckoutState('idle')}
            className="mt-4 rounded-full border border-white/10 px-4 py-1.5 text-xs font-medium text-zinc-300 hover:border-white/20"
          >
            Back to plans
          </button>
        </div>
      )}
    </div>
  );
}

function TierCard({
  active,
  onClick,
  eyebrow,
  price,
  cadence,
  highlighted = false,
}: {
  active: boolean;
  onClick: () => void;
  eyebrow: string;
  price: string;
  cadence: string;
  highlighted?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex flex-col items-center gap-1 rounded-xl border px-3 py-4 text-center transition-colors ${
        active
          ? 'border-amber-400/50 bg-amber-500/10'
          : 'border-white/10 bg-white/[0.02] hover:border-white/20'
      }`}
    >
      {highlighted && (
        <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-amber-400 px-2 py-0.5 text-[10px] font-semibold text-zinc-950">
          Most Popular
        </span>
      )}
      <span className="text-[11px] font-medium text-zinc-500">{eyebrow}</span>
      <span className="text-lg font-semibold text-zinc-50">{price}</span>
      <span className="text-[11px] text-zinc-500">{cadence}</span>
      {active && (
        <span className="absolute top-2 right-2 flex h-4 w-4 items-center justify-center rounded-full bg-amber-400">
          <Check className="h-2.5 w-2.5 text-zinc-950" />
        </span>
      )}
    </button>
  );
}
