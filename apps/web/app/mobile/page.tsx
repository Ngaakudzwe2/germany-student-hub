import Image from 'next/image';
import { AlertTriangle, Building2, Calendar, CheckCircle2, ExternalLink, MapPin, Users } from 'lucide-react';
import { DEMO_EVENTS, DEMO_LISTINGS, DEMO_TASKS, DEMO_USER_NAME } from '@/lib/demo-data';
import { unsplashUrl } from '@/lib/event-meta';
import { getTaskDetail } from '@/lib/task-meta';

export default function MobilePreviewPage() {
  const nextTask = DEMO_TASKS.find((t) => t.status !== 'completed') ?? DEMO_TASKS[0];
  const listing = DEMO_LISTINGS[0];
  const event = [...DEMO_EVENTS].sort((a, b) => a.startsAt.localeCompare(b.startsAt))[0];
  const taskDetail = nextTask ? getTaskDetail(nextTask.task_templates.category) : null;

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <p className="mb-4 text-center text-xs text-zinc-500">
        Mobile Preview — responsive web simulation of key phone workflows, not a native Expo build
      </p>

      <div className="relative mx-auto w-[320px] rounded-[2.5rem] border-[10px] border-zinc-800 bg-zinc-950 shadow-2xl shadow-black/60">
        <div className="absolute top-0 left-1/2 z-10 h-5 w-28 -translate-x-1/2 rounded-b-2xl bg-zinc-800" />

        <div className="scrollbar-thin h-[640px] overflow-y-auto rounded-[1.75rem] bg-zinc-950 px-4 pt-9 pb-6">
          <p className="text-xs text-zinc-500">Hi, {DEMO_USER_NAME.split(' ')[0]} 👋</p>
          <h1 className="mb-4 text-lg font-semibold text-zinc-50">Settle In</h1>

          {nextTask && taskDetail && (
            <section className="mb-4 rounded-xl border border-white/10 bg-white/[0.03] p-3">
              <p className="mb-1 flex items-center gap-1.5 text-[11px] font-medium tracking-wide text-amber-400 uppercase">
                <AlertTriangle className="h-3 w-3" />
                Next up
              </p>
              <p className="text-sm font-medium text-zinc-100">
                {nextTask.task_templates.title}
              </p>
              <p className="mt-0.5 text-xs text-zinc-500">{taskDetail.location}</p>
              {taskDetail.officialLinks[0] && (
                <a
                  href={taskDetail.officialLinks[0].href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 py-2 text-xs font-medium text-zinc-950"
                >
                  {taskDetail.officialLinks[0].label}
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </section>
          )}

          <section className="mb-4">
            <p className="mb-2 flex items-center gap-1.5 text-xs font-medium text-zinc-400">
              <Building2 className="h-3.5 w-3.5" />
              New in Housing
            </p>
            {listing && (
              <div className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]">
                <div className="relative h-24 w-full">
                  <Image
                    src={unsplashUrl(listing.coverPhotoId, 400)}
                    alt=""
                    fill
                    sizes="280px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                </div>
                <div className="p-2.5">
                  <p className="text-xs font-medium text-zinc-100">{listing.title}</p>
                  <p className="flex items-center gap-1 text-[11px] text-zinc-500">
                    <MapPin className="h-3 w-3" />
                    {listing.district}, {listing.city} · €{listing.rentEur}/mo
                  </p>
                </div>
              </div>
            )}
          </section>

          <section>
            <p className="mb-2 flex items-center gap-1.5 text-xs font-medium text-zinc-400">
              <Users className="h-3.5 w-3.5" />
              Next Meetup
            </p>
            {event && (
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                <p className="text-xs font-medium text-zinc-100">{event.title}</p>
                <p className="mt-0.5 flex items-center gap-1 text-[11px] text-zinc-500">
                  <Calendar className="h-3 w-3" />
                  {new Date(event.startsAt).toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                  })}{' '}
                  · {event.city}
                </p>
                <button
                  type="button"
                  className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 py-2 text-xs font-medium text-white"
                >
                  <CheckCircle2 className="h-3 w-3" />
                  RSVP
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
