'use client';

import {
  Calendar,
  CalendarPlus,
  Check,
  Download,
  ExternalLink,
  Languages,
  ListChecks,
  MapPin,
  Users,
} from 'lucide-react';
import { EVENT_TOPIC_LABELS, type DemoEvent } from '@/lib/demo-data';
import {
  EVENT_STATE_META,
  EVENT_TOPIC_ICON,
  avatarColor,
  downloadIcsFile,
  getEventState,
  googleCalendarUrl,
  googleMapsUrl,
} from '@/lib/event-meta';
import { Modal } from '@/components/ui/modal';
import { EventPhotoCarousel } from './event-photo-carousel';

interface EventDetailsModalProps {
  event: DemoEvent | null;
  attending: boolean;
  attendeeCount: number;
  onToggleRsvp: () => void;
  onClose: () => void;
}

export function EventDetailsModal({
  event,
  attending,
  attendeeCount,
  onToggleRsvp,
  onClose,
}: EventDetailsModalProps) {
  if (!event) return null;

  const state = getEventState(event.startsAt);
  const isPast = state === 'past';
  const photoIds = isPast ? event.recapPhotoIds : event.coverPhotoIds;
  const stateMeta = EVENT_STATE_META[state];
  const TopicIcon = EVENT_TOPIC_ICON[event.topic];
  const spotsLeft = event.capacity !== null ? event.capacity - attendeeCount : null;

  const dateLabel = new Date(event.startsAt).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
  const timeLabel = new Date(event.startsAt).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });

  return (
    <Modal
      open={!!event}
      onClose={onClose}
      title={event.title}
      subtitle={event.brandPartner ?? `${event.hostType}: ${event.hostName}`}
    >
      <div className="space-y-6">
        <EventPhotoCarousel
          photoIds={photoIds}
          isPast={isPast}
          heightClass="h-56 rounded-xl"
          imageWidth={900}
          sizes="512px"
        >
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

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
          <p className="flex items-center gap-1.5 text-zinc-400">
            <Calendar className="h-4 w-4 shrink-0 text-emerald-400" />
            {dateLabel} · {timeLabel}
          </p>
          <a
            href={googleMapsUrl(event)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-emerald-300 hover:underline"
          >
            <MapPin className="h-4 w-4 shrink-0" />
            {event.venue}
            <ExternalLink className="h-3 w-3 shrink-0" />
          </a>
        </div>

        <p className="text-sm text-zinc-400">{event.description}</p>

        <section>
          <h3 className="mb-2 flex items-center gap-2 text-sm font-medium text-zinc-200">
            <ListChecks className="h-4 w-4 text-emerald-400" />
            Agenda
          </h3>
          <ol className="space-y-2">
            {event.agenda.map((item) => (
              <li key={item.time} className="flex gap-3 text-sm text-zinc-400">
                <span className="w-16 shrink-0 font-mono text-xs text-zinc-500">{item.time}</span>
                {item.item}
              </li>
            ))}
          </ol>
        </section>

        <section>
          <h3 className="mb-2 flex items-center gap-2 text-sm font-medium text-zinc-200">
            <Languages className="h-4 w-4 text-emerald-400" />
            Languages spoken
          </h3>
          <div className="flex flex-wrap gap-2">
            {event.languages.map((lang) => (
              <span
                key={lang}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300"
              >
                {lang}
              </span>
            ))}
          </div>
        </section>

        <section>
          <h3 className="mb-2 flex items-center gap-2 text-sm font-medium text-zinc-200">
            <Users className="h-4 w-4 text-emerald-400" />
            Who&apos;s going ({attendeeCount})
          </h3>
          <div className="space-y-2">
            {event.attendees.map((attendee) => (
              <div
                key={attendee.initials}
                className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2"
              >
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white ${avatarColor(attendee.initials)}`}
                >
                  {attendee.initials}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm text-zinc-200">{attendee.name}</p>
                  <p className="truncate text-xs text-zinc-500">
                    {attendee.university} · {attendee.program}
                  </p>
                </div>
              </div>
            ))}
            {attendeeCount > event.attendees.length && (
              <p className="text-xs text-zinc-500">
                +{attendeeCount - event.attendees.length} more attending
              </p>
            )}
          </div>
        </section>

        <button
          type="button"
          onClick={onToggleRsvp}
          disabled={isPast || (!attending && spotsLeft === 0)}
          className={`flex w-full items-center justify-center gap-1.5 rounded-xl py-3 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
            attending
              ? 'bg-rose-500/15 text-rose-300 ring-1 ring-rose-500/30'
              : 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-zinc-950'
          }`}
        >
          {isPast ? (
            'Event Ended'
          ) : attending ? (
            <>
              <Check className="h-4 w-4" />
              Leave Event
            </>
          ) : spotsLeft === 0 ? (
            'Join Waitlist'
          ) : (
            'RSVP'
          )}
        </button>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => downloadIcsFile(event)}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-white/10 py-2.5 text-xs font-medium text-zinc-300 hover:border-white/20"
          >
            <Download className="h-3.5 w-3.5" />
            Download .ics
          </button>
          <a
            href={googleCalendarUrl(event)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-white/10 py-2.5 text-xs font-medium text-zinc-300 hover:border-white/20"
          >
            <CalendarPlus className="h-3.5 w-3.5" />
            Add to Google Calendar
          </a>
        </div>
      </div>
    </Modal>
  );
}
