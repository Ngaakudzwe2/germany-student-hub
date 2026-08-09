import Link from 'next/link';
import { Building2, GraduationCap, Sparkles, Users } from 'lucide-react';

const FEATURES = [
  {
    icon: GraduationCap,
    title: 'Live Bureaucracy Tracker',
    description: 'Anmeldung, health insurance, visa extension — tracked in real time.',
    accent: 'from-emerald-500/15 to-cyan-500/15 text-emerald-300',
  },
  {
    icon: Building2,
    title: 'Accommodation Toolkit',
    description: 'Generate WG application letters and spot rental scams before they cost you.',
    accent: 'from-orange-500/15 to-amber-500/15 text-orange-300',
  },
  {
    icon: Users,
    title: 'Student Meetups',
    description: 'Find language exchanges, tech events, and WG-search meetups near you.',
    accent: 'from-indigo-500/15 to-violet-500/15 text-indigo-300',
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-20 text-center">
      <span className="mb-6 flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-zinc-400">
        <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
        Built for international students in Germany
      </span>

      <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">
        Settle into Germany,{' '}
        <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          together.
        </span>
      </h1>
      <p className="mt-4 max-w-md text-lg text-zinc-400">
        Track your Anmeldung, health insurance, and visa paperwork — then meet other
        international students nearby.
      </p>

      <div className="mt-8 flex gap-4">
        <Link
          href="/dashboard"
          className="rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-3 text-sm font-medium text-zinc-950 transition-opacity hover:opacity-90"
        >
          Go to Dashboard
        </Link>
        <Link
          href="/meetups"
          className="rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-zinc-200 transition-colors hover:bg-white/5"
        >
          Browse Meetups
        </Link>
      </div>

      <div className="mt-16 grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
        {FEATURES.map((feature) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.title}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left backdrop-blur-sm"
            >
              <div
                className={`mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br ${feature.accent}`}
              >
                <Icon className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-semibold text-zinc-100">{feature.title}</h3>
              <p className="mt-1 text-xs text-zinc-500">{feature.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
