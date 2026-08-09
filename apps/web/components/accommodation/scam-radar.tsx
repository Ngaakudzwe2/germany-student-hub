'use client';

import { useState } from 'react';
import { AlertTriangle, ShieldCheck } from 'lucide-react';
import { SCAM_RED_FLAGS } from '@/lib/demo-data';

export function ScamRadar() {
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const percent = Math.round((checked.size / SCAM_RED_FLAGS.length) * 100);
  const barColor =
    percent < 40 ? 'from-rose-500 to-orange-500' : percent < 80 ? 'from-amber-500 to-yellow-400' : 'from-emerald-500 to-cyan-400';

  function toggle(id: string) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm">
      <div className="mb-1 flex items-center gap-2">
        {percent === 100 ? (
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
        ) : (
          <AlertTriangle className="h-4 w-4 text-amber-400" />
        )}
        <h2 className="font-semibold text-zinc-50">Scam Alert Radar</h2>
      </div>
      <p className="mb-4 text-sm text-zinc-500">
        Check off each red flag you understand — common tactics used against international
        students renting in Germany.
      </p>

      <div className="mb-5">
        <div className="mb-1.5 flex items-center justify-between text-xs text-zinc-500">
          <span>Safety awareness</span>
          <span>
            {checked.size}/{SCAM_RED_FLAGS.length}
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-white/5">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${barColor} transition-all duration-500`}
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      <ul className="space-y-2">
        {SCAM_RED_FLAGS.map((flag) => {
          const isChecked = checked.has(flag.id);
          return (
            <li key={flag.id}>
              <button
                type="button"
                onClick={() => toggle(flag.id)}
                className={`flex w-full items-start gap-3 rounded-xl border px-3 py-2.5 text-left transition-colors ${
                  isChecked
                    ? 'border-emerald-500/25 bg-emerald-500/5'
                    : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                }`}
              >
                <span
                  className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border text-[10px] ${
                    isChecked
                      ? 'border-emerald-400 bg-emerald-400 text-zinc-950'
                      : 'border-white/20 text-transparent'
                  }`}
                >
                  ✓
                </span>
                <span>
                  <span
                    className={`block text-sm font-medium ${isChecked ? 'text-emerald-300' : 'text-zinc-200'}`}
                  >
                    {flag.title}
                  </span>
                  <span className="text-xs text-zinc-500">{flag.description}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
