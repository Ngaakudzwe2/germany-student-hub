'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Calendar, Check, MapPin, Navigation, Users, Zap } from 'lucide-react';
import type { DemoEvent } from '@/lib/demo-data';
import {
  EVENT_STATE_META,
  EVENT_TOPIC_BADGE,
  EVENT_TOPIC_ICON,
  avatarColor,
  getEventState,
  unsplashUrl,
} from '@/lib/event-meta';
import { EVENT_TOPIC_LABELS } from '@/lib/demo-data';

const CAROUSEL_INTERVAL_MS = 4000;
const LOW_SPOTS_THRESHOLD = 8;

export function EventCard({ event }: { event: DemoEvent }) {
  const [attending, setAttending] = useState(false);
  const [attendeeCount, setAttendeeCount] = useState(event.attendeeCount);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [now] = useState(() => Date.now());

  useEffect(() => {
    if (event.coverPhotoIds.length <= 1) return;
    const id = setInterval(() => {
      setPhotoIndex((i) => (i + 1) % event.coverPhotoIds.length);
    }, CAROUSEL_INTERVAL_MS);
    return () => clearInterval(id);
  }, [event.coverPhotoIds.length]);

  const date = new Date(event.startsAt);
  const dateLabel = date.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
  const spotsLeft = event.capacity !== null ? event.capacity - attendeeCount : null;
  const TopicIcon = EVENT_TOPIC_ICON[event.topic];
  const visibleAvatars = event.attendeeInitials.slice(0, 4);
  const extraCount = Math.max(attendeeCount - visibleAvatars.length, 0);
  const state = getEventState(event.startsAt, now);
  const stateMeta = EVENT_STATE_META[state];

  function toggleRsvp() {
    setAttending((prev) => {
      const next = !prev;
      setAttendeeCount((count) => count + (next ? 1 : -1));
      return next;
    });
  }

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm transition-colors hover:border-white/20">
      <div className="relative h-40 w-full overflow-hidden">
        {event.coverPhotoIds.map((photoId, i) => (
          <Image
            key={photoId}
            src={unsplashUrl(photoId, 640)}
            alt=""
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-opacity duration-700 ease-in-out"
            style={{ opacity: i === photoIndex ? 1 : 0 }}
            priority={i === 0}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/40" />

        <span className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-black/40 px-2 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
          <TopicIcon className="h-3 w-3" />
          {EVENT_TOPIC_LABELS[event.topic]}
        </span>

        {stateMeta.label && (
          <span
            className={`absolute top-3 right-3 flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-semibold ${stateMeta.classes}`}
          >
            {state === 'live' && <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />}
            <stateMeta.icon className="h-3 w-3" />
            {stateMeta.label}
          </span>
        )}

        {event.coverPhotoIds.length > 1 && (
          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1">
            {event.coverPhotoIds.map((photoId, i) => (
              <span
                key={photoId}
                className={`h-1 rounded-full transition-all ${
                  i === photoIndex ? 'w-4 bg-white' : 'w-1 bg-white/40'
                }`}
              />
            ))}
          </div>
        )}
      </div>

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
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {visibleAvatars.map((initials) => (
                <span
                  key={initials}
                  className={`flex h-6 w-6 items-center justify-center rounded-full border-2 border-zinc-950 text-[9px] font-semibold text-white ${avatarColor(initials)}`}
                >
                  {initials}
                </span>
              ))}
            </div>
            <span className="flex items-center gap-1 text-xs text-zinc-500">
              <Users className="h-3.5 w-3.5" />
              {extraCount > 0 ? `+${extraCount} attending` : `${attendeeCount} attending`}
            </span>
          </div>

          <button
            type="button"
            onClick={toggleRsvp}
            disabled={!attending && spotsLeft === 0}
            className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
              attending
                ? 'bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/30'
                : 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-zinc-950'
            }`}
          >
            {attending ? (
              <>
                <Check className="h-3.5 w-3.5" />
                Attending
              </>
            ) : spotsLeft === 0 ? (
              'Waitlist'
            ) : (
              'RSVP'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
