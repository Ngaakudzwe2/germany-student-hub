'use client';

import { useState } from 'react';
import { Calendar, MapPin, Navigation, Zap } from 'lucide-react';
import type { DemoEvent } from '@/lib/demo-data';
import { EVENT_STATE_META, EVENT_TOPIC_BADGE, EVENT_TOPIC_ICON, getEventState } from '@/lib/event-meta';
import { EVENT_TOPIC_LABELS } from '@/lib/demo-data';
import { useToast } from '@/components/ui/toast';
import { EventPhotoCarousel } from './event-photo-carousel';
import { AttendeeAvatarStack } from './attendee-avatar-stack';
import { EventDetailsModal } from './event-details-modal';

const LOW_SPOTS_THRESHOLD = 8;

export function EventCard({ event }: { event: DemoEvent }) {
  const [attending, setAttending] = useState(false);
  const [attendeeCount, setAttendeeCount] = useState(event.attendeeCount);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [now] = useState(() => Date.now());
  const { showToast } = useToast();

  const state = getEventState(event.startsAt, now);
  const isPast = state === 'past';
  const photoIds = isPast ? event.recapPhotoIds : event.coverPhotoIds;

  const date = new Date(event.startsAt);
  const dateLabel = date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
  const spotsLeft = event.capacity !== null ? event.capacity - attendeeCount : null;
  const TopicIcon = EVENT_TOPIC_ICON[event.topic];
  const stateMeta = EVENT_STATE_META[state];

  function toggleRsvp() {
    const next = !attending;
    setAttending(next);
    setAttendeeCount((count) => count + (next ? 1 : -1));
    showToast(
      next ? `You're attending ${event.title} 🎉` : `RSVP cancelled for ${event.title}`,
      next ? 'success' : 'info'
    );
  }

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        aria-label={`View details for ${event.title}`}
        onClick={() => setDetailsOpen(true)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setDetailsOpen(true);
          }
        }}
        className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm transition-colors hover:border-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60"
      >
        <EventPhotoCarousel photoIds={photoIds} isPast={isPast}>
          <span className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-black/40 px-2 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
            <TopicIcon className="h-3 w-3" />
            {EVENT_TOPIC_LABELS[event.topic]}
          </span>

          {stateMeta.label && (
            <span
              className={`absolute top-3 right-3 flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-semibold ${stateMeta.classes}`}
            >
              {state === 'live' && (
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
              )}
              <stateMeta.icon className="h-3 w-3" />
              {stateMeta.label}
            </span>
          )}
        </EventPhotoCarousel>

        <div className="flex flex-1 flex-col gap-3 p-4">
          <div>
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-zinc-50">{event.title}</h3>
              {spotsLeft !== null && spotsLeft > 0 && spotsLeft <= LOW_SPOTS_THRESHOLD && (
                <span className="flex shrink-0 items-center gap-1 rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-semibold text-amber-300">
                  <Zap className="h-2.5 w-2.5" />
                  {spotsLeft} spots left
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-zinc-400">{event.description}</p>
          </div>

          <div className="space-y-1.5 text-xs text-zinc-500">
            <p className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 shrink-0" />
              {dateLabel} · {event.languages.join(' · ')}
            </p>
            <p className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              {event.venue}
              <span className="mx-0.5 text-zinc-700">·</span>
              <Navigation className="h-3 w-3 shrink-0" />
              {event.distanceKm.toFixed(1)} km away
            </p>
          </div>

          <span
            className={`w-fit rounded-full border px-2 py-0.5 text-[11px] font-medium ${EVENT_TOPIC_BADGE[event.topic]}`}
          >
            {event.brandPartner ?? `${event.hostType}: ${event.hostName}`}
          </span>

          <div className="mt-auto flex items-center justify-between gap-3 pt-2">
            <AttendeeAvatarStack attendees={event.attendees} totalCount={attendeeCount} />

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleRsvp();
              }}
              disabled={isPast || (!attending && spotsLeft === 0)}
              className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
                attending
                  ? 'bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/30'
                  : 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-zinc-950'
              }`}
            >
              {isPast ? 'Event Ended' : attending ? 'Attending' : spotsLeft === 0 ? 'Waitlist' : 'RSVP'}
            </button>
          </div>
        </div>
      </div>

      <EventDetailsModal
        event={detailsOpen ? event : null}
        attending={attending}
        attendeeCount={attendeeCount}
        onToggleRsvp={toggleRsvp}
        onClose={() => setDetailsOpen(false)}
      />
    </>
  );
}
