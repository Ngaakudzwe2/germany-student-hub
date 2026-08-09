import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MapPin, Users } from 'lucide-react';
import { DEMO_EVENTS } from '@/lib/demo-data';
import { unsplashUrl } from '@/lib/event-meta';

export function UpcomingMeetups({ limit = 3 }: { limit?: number }) {
  const events = [...DEMO_EVENTS]
    .sort((a, b) => a.startsAt.localeCompare(b.startsAt))
    .slice(0, limit);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <h2 className="flex items-center gap-2 text-sm font-medium text-zinc-200">
          <Users className="h-4 w-4 text-indigo-400" />
          Upcoming Meetups
        </h2>
        <Link
          href="/meetups"
          className="flex items-center gap-1 text-xs text-indigo-300 hover:text-indigo-200"
        >
          View all
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      <ul className="space-y-1 p-2">
        {events.map((event) => {
          const dateLabel = new Date(event.startsAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          });
          return (
            <li key={event.id}>
              <Link
                href="/meetups"
                className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-white/5"
              >
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={unsplashUrl(event.coverPhotoIds[0] ?? event.coverPhotoIds[1] ?? '', 96)}
                    alt=""
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-zinc-100">{event.title}</p>
                  <p className="flex items-center gap-1 truncate text-xs text-zinc-500">
                    <MapPin className="h-3 w-3 shrink-0" />
                    {event.city} · {dateLabel}
                  </p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
