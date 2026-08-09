import Link from 'next/link';
import { Bell, Building2, GraduationCap, LayoutDashboard, Users } from 'lucide-react';
import { HubPlusTrigger } from '@/components/premium/hub-plus-trigger';

const LINKS = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/accommodation', label: 'Accommodation', icon: Building2 },
  { href: '/meetups', label: 'Meetups', icon: Users },
];

export function Nav() {
  return (
    <nav className="sticky top-0 z-40 border-b border-white/10 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold text-zinc-50">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500">
            <GraduationCap className="h-4 w-4 text-zinc-950" />
          </span>
          <span className="hidden sm:inline">Settle In</span>
        </Link>

        <div className="flex items-center gap-1">
          {LINKS.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-zinc-400 transition-colors hover:bg-white/5 hover:text-zinc-100"
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{link.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <HubPlusTrigger />
          <button
            type="button"
            className="relative flex h-9 w-9 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-white/5 hover:text-zinc-100"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </button>
        </div>
      </div>
    </nav>
  );
}
