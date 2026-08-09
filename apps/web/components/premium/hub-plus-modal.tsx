'use client';

import { useEffect, useState } from 'react';
import { Check, Crown, MessageCircle, ShieldCheck, Sparkles, Users, X } from 'lucide-react';

const VALUE_PROPS = [
  { icon: Users, text: 'See all event attendees & student profiles' },
  { icon: ShieldCheck, text: 'Get high-priority waitlist access for housing & official appointments' },
  { icon: MessageCircle, text: 'Send direct messages to students & alumni' },
];

type TierId = 'trial' | 'weekly' | 'periodic';
type BillingPeriod = 'monthly' | 'yearly';

interface HubPlusModalProps {
  open: boolean;
  onClose: () => void;
}

export function HubPlusModal({ open, onClose }: HubPlusModalProps) {
  const [selectedTier, setSelectedTier] = useState<TierId>('weekly');
  const [billing, setBilling] = useState<BillingPeriod>('monthly');
  const [checkoutState, setCheckoutState] = useState<'idle' | 'sandbox'>('idle');

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
          <div className="mb-6 space-y-2.5">
            {VALUE_PROPS.map((prop) => (
              <div key={prop.text} className="flex items-start gap-3 text-sm text-zinc-300">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15">
                  <Check className="h-3 w-3 text-emerald-400" />
                </span>
                {prop.text}
              </div>
            ))}
          </div>

          {checkoutState === 'idle' ? (
            <>
              <div className="mb-3 flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setBilling('monthly')}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    billing === 'monthly' ? 'bg-white/10 text-zinc-100' : 'text-zinc-500'
                  }`}
                >
                  Monthly
                </button>
                <button
                  type="button"
                  onClick={() => setBilling('yearly')}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    billing === 'yearly' ? 'bg-white/10 text-zinc-100' : 'text-zinc-500'
                  }`}
                >
                  Yearly
                  <span className="rounded-full bg-emerald-500/15 px-1.5 py-0.5 text-[10px] text-emerald-400">
                    Save 44%
                  </span>
                </button>
              </div>

              <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <TierCard
                  active={selectedTier === 'trial'}
                  onClick={() => setSelectedTier('trial')}
                  eyebrow="Not sure yet?"
                  price="Free"
                  cadence="7-day trial"
                />
                <TierCard
                  active={selectedTier === 'weekly'}
                  onClick={() => setSelectedTier('weekly')}
                  eyebrow="Most Popular"
                  highlighted
                  price="€4.99"
                  cadence="/ week"
                />
                <TierCard
                  active={selectedTier === 'periodic'}
                  onClick={() => setSelectedTier('periodic')}
                  eyebrow={billing === 'yearly' ? 'Best value' : 'Flexible'}
                  price={billing === 'yearly' ? '€99.99' : '€14.99'}
                  cadence={billing === 'yearly' ? '/ year' : '/ month'}
                />
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
                No charge for 7 days. Cancel anytime.
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
                onClick={onClose}
                className="mt-4 rounded-full border border-white/10 px-4 py-1.5 text-xs font-medium text-zinc-300 hover:border-white/20"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
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
    </button>
  );
}
