'use client';

import { useMemo, useState } from 'react';
import { CalendarPlus, SlidersHorizontal, Users } from 'lucide-react';
import { Search } from 'lucide-react';
import { DEMO_EVENTS } from '@/lib/demo-data';
import { EventCard } from '@/components/events/event-card';
import {
  DEFAULT_FILTERS,
  FilterSheet,
  countActiveFilters,
  type Filters,
} from '@/components/events/filter-sheet';
import { getTimeOfDay } from '@/lib/event-meta';

const DAY_MS = 86_400_000;

export default function MeetupsPage() {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [now] = useState(() => Date.now());

  const cities = useMemo(() => uniqueSorted(DEMO_EVENTS.map((e) => e.city)), []);
  const activeCount = countActiveFilters(filters);

  const events = useMemo(() => {
    const query = filters.search.trim().toLowerCase();

    return DEMO_EVENTS.filter((event) => {
      if (filters.city && event.city !== filters.city) return false;
      if (filters.topic && event.topic !== filters.topic) return false;
      if (filters.timeOfDay && getTimeOfDay(event.startsAt) !== filters.timeOfDay) return false;
      if (filters.venueType !== 'any' && event.venueType !== filters.venueType) return false;
      if (event.distanceKm > filters.maxDistanceKm) return false;

      const eventDate = new Date(event.startsAt);
      const daysAway = (eventDate.getTime() - now) / DAY_MS;

      if (filters.customDate) {
        const sameDay = eventDate.toISOString().slice(0, 10) === filters.customDate;
        if (!sameDay) return false;
      } else if (filters.dateChip) {
        if (filters.dateChip === 'upcoming' && daysAway < 0) return false;
        if (filters.dateChip === 'starting_soon' && !(daysAway >= 0 && daysAway * 24 <= 2)) {
          return false;
        }
        if (filters.dateChip === 'today' && !isSameCalendarDay(eventDate, new Date(now))) {
          return false;
        }
        if (
          filters.dateChip === 'tomorrow' &&
          !isSameCalendarDay(eventDate, new Date(now + DAY_MS))
        ) {
          return false;
        }
        if (filters.dateChip === 'weekend' && !(isWeekendDay(eventDate) && daysAway >= 0 && daysAway <= 7)) {
          return false;
        }
        if (filters.dateChip === 'next_week' && !(daysAway >= 7 && daysAway <= 14)) {
          return false;
        }
      }

      if (query) {
        const haystack =
          `${event.title} ${event.description} ${event.hostName} ${event.city}`.toLowerCase();
        if (!haystack.includes(query)) return false;
      }

      return true;
    }).sort((a, b) => a.startsAt.localeCompare(b.startsAt));
  }, [filters, now]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="flex items-center gap-1.5 text-sm text-zinc-500">
            <Users className="h-4 w-4 text-indigo-400" />
            Community
          </p>
          <h1 className="text-2xl font-semibold text-zinc-50 sm:text-3xl">Meetups</h1>
        </div>
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-5 py-2.5 text-sm font-medium text-white"
        >
          <CalendarPlus className="h-4 w-4" />
          Create Event
        </button>
      </div>

      <div className="mb-6 flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            placeholder="Search events, topics, or hosts…"
            className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-2.5 pr-4 pl-10 text-sm text-zinc-200 placeholder:text-zinc-600 focus:border-indigo-400/40 focus:outline-none"
          />
        </div>
        <button
          type="button"
          onClick={() => setSheetOpen(true)}
          className="relative flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-zinc-200 hover:border-white/20"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {activeCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500 text-[10px] font-semibold text-white">
              {activeCount}
            </span>
          )}
        </button>
      </div>

      <p className="mb-4 text-sm text-zinc-500">
        {events.length} event{events.length === 1 ? '' : 's'} found
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {events.length === 0 && (
        <p className="mt-12 text-center text-sm text-zinc-500">
          No events match those filters. Try clearing them.
        </p>
      )}

      <FilterSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        filters={filters}
        onChange={setFilters}
        cities={cities}
      />
    </div>
  );
}

function uniqueSorted(values: string[]) {
  return Array.from(new Set(values)).sort();
}

function isSameCalendarDay(a: Date, b: Date) {
  return a.toDateString() === b.toDateString();
}

function isWeekendDay(date: Date) {
  const day = date.getDay();
  return day === 0 || day === 6;
}
