import {
  Briefcase,
  Clock,
  Code2,
  GraduationCap,
  Home,
  Landmark,
  type LucideIcon,
  Martini,
  MessagesSquare,
  Radio,
  Sparkles,
  Trophy,
} from 'lucide-react';
import type { EventTopic } from '@repo/shared';
import type { DemoEvent } from './demo-data';

export const EVENT_TOPIC_ICON: Record<EventTopic, LucideIcon> = {
  language_exchange: MessagesSquare,
  career_networking: Briefcase,
  tech: Code2,
  wg_search: Home,
  nightlife: Martini,
  sports: Trophy,
  academic: GraduationCap,
  cultural: Landmark,
  other: Sparkles,
};

export const EVENT_TOPIC_BADGE: Record<EventTopic, string> = {
  language_exchange: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/20',
  career_networking: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/20',
  tech: 'bg-blue-500/15 text-blue-300 border-blue-500/20',
  wg_search: 'bg-orange-500/15 text-orange-300 border-orange-500/20',
  nightlife: 'bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-500/20',
  sports: 'bg-lime-500/15 text-lime-300 border-lime-500/20',
  academic: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/20',
  cultural: 'bg-rose-500/15 text-rose-300 border-rose-500/20',
  other: 'bg-zinc-500/15 text-zinc-300 border-zinc-500/20',
};

const AVATAR_COLORS = [
  'bg-emerald-500',
  'bg-cyan-500',
  'bg-indigo-500',
  'bg-fuchsia-500',
  'bg-amber-500',
  'bg-rose-500',
];

export function avatarColor(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}

export function unsplashUrl(photoId: string, width: number) {
  return `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=${width}&q=70`;
}

export type EventState = 'starting_soon' | 'live' | 'past' | 'upcoming';

const EVENT_DURATION_HOURS = 3;
const STARTING_SOON_WINDOW_HOURS = 2;
const HOUR_MS = 3_600_000;

export function getEventState(startsAt: string, now: number = Date.now()): EventState {
  const start = new Date(startsAt).getTime();
  const end = start + EVENT_DURATION_HOURS * HOUR_MS;

  if (now >= start && now < end) return 'live';
  if (now < start && start - now <= STARTING_SOON_WINDOW_HOURS * HOUR_MS) return 'starting_soon';
  if (now >= end) return 'past';
  return 'upcoming';
}

export const EVENT_STATE_META: Record<
  EventState,
  { label: string; icon: LucideIcon; classes: string }
> = {
  live: {
    label: 'Live Now',
    icon: Radio,
    classes: 'bg-red-500 text-white',
  },
  starting_soon: {
    label: 'Starting Soon',
    icon: Clock,
    classes: 'bg-amber-500 text-zinc-950',
  },
  past: {
    label: 'Past Event',
    icon: Clock,
    classes: 'bg-zinc-700 text-zinc-300',
  },
  upcoming: {
    label: '',
    icon: Clock,
    classes: '',
  },
};

export type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night';

export function getTimeOfDay(startsAt: string): TimeOfDay {
  const hour = new Date(startsAt).getHours();
  if (hour >= 5 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 17) return 'afternoon';
  if (hour >= 17 && hour < 21) return 'evening';
  return 'night';
}

export const TIME_OF_DAY_LABELS: Record<TimeOfDay, string> = {
  morning: 'Morning',
  afternoon: 'Afternoon',
  evening: 'Evening',
  night: 'Night',
};

function eventTimeRange(event: DemoEvent) {
  const start = new Date(event.startsAt);
  const end = new Date(start.getTime() + EVENT_DURATION_HOURS * HOUR_MS);
  return { start, end };
}

const icsDate = (d: Date) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

export function googleMapsUrl(event: DemoEvent): string {
  const query = encodeURIComponent(`${event.venue}, ${event.city}, Germany`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

export function googleCalendarUrl(event: DemoEvent): string {
  const { start, end } = eventTimeRange(event);
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${icsDate(start)}/${icsDate(end)}`,
    details: event.description,
    location: `${event.venue}, ${event.city}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function escapeIcsText(text: string): string {
  return text.replace(/[\\,;]/g, (match) => `\\${match}`).replace(/\n/g, '\\n');
}

export function buildIcsFile(event: DemoEvent): string {
  const { start, end } = eventTimeRange(event);
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Germany Student Hub//Meetups//EN',
    'BEGIN:VEVENT',
    `UID:${event.id}@germanystudenthub.example`,
    `DTSTAMP:${icsDate(new Date())}`,
    `DTSTART:${icsDate(start)}`,
    `DTEND:${icsDate(end)}`,
    `SUMMARY:${escapeIcsText(event.title)}`,
    `DESCRIPTION:${escapeIcsText(event.description)}`,
    `LOCATION:${escapeIcsText(`${event.venue}, ${event.city}`)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

export function downloadIcsFile(event: DemoEvent) {
  const blob = new Blob([buildIcsFile(event)], { type: 'text/calendar' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${event.title.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}.ics`;
  a.click();
  URL.revokeObjectURL(url);
}
