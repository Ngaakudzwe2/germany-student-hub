'use client';

import { Globe2, LayoutGrid, MapPin, Video } from 'lucide-react';
import type { EventTopic } from '@repo/shared';
import { EVENT_TOPIC_LABELS } from '@/lib/demo-data';
import { TIME_OF_DAY_LABELS, type TimeOfDay } from '@/lib/event-meta';
import { SlideOver } from '@/components/ui/slide-over';
import type { VenueType } from '@/lib/demo-data';

export type DateChip = 'upcoming' | 'starting_soon' | 'today' | 'tomorrow' | 'weekend' | 'next_week';

const DATE_CHIP_LABELS: Record<DateChip, string> = {
  upcoming: 'Upcoming',
  starting_soon: 'Starting soon',
  today: 'Today',
  tomorrow: 'Tomorrow',
  weekend: 'Weekend',
  next_week: 'Next week',
};

export interface Filters {
  search: string;
  city: string | null;
  topic: EventTopic | null;
  timeOfDay: TimeOfDay | null;
  venueType: VenueType | 'any';
  maxDistanceKm: number;
  dateChip: DateChip | null;
  customDate: string | null;
}

export const DEFAULT_FILTERS: Filters = {
  search: '',
  city: null,
  topic: null,
  timeOfDay: null,
  venueType: 'any',
  maxDistanceKm: 50,
  dateChip: null,
  customDate: null,
};

export function countActiveFilters(filters: Filters): number {
  let count = 0;
  if (filters.city) count++;
  if (filters.topic) count++;
  if (filters.timeOfDay) count++;
  if (filters.venueType !== 'any') count++;
  if (filters.maxDistanceKm < 50) count++;
  if (filters.dateChip) count++;
  if (filters.customDate) count++;
  return count;
}

interface FilterSheetProps {
  open: boolean;
  onClose: () => void;
  filters: Filters;
  onChange: (filters: Filters) => void;
  cities: string[];
}

export function FilterSheet({ open, onClose, filters, onChange, cities }: FilterSheetProps) {
  const activeCount = countActiveFilters(filters);

  return (
    <SlideOver
      open={open}
      onClose={onClose}
      title="Filters"
      footer={
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onChange(DEFAULT_FILTERS)}
            className="flex-1 rounded-full border border-white/10 py-2.5 text-sm font-medium text-zinc-300 hover:border-white/20"
          >
            Clear all
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 py-2.5 text-sm font-medium text-white"
          >
            Show results
          </button>
        </div>
      }
    >
      <div className="space-y-6">
        <FilterSection label="City">
          <div className="flex flex-wrap gap-2">
            {cities.map((city) => (
              <PillButton
                key={city}
                active={filters.city === city}
                onClick={() => onChange({ ...filters, city: filters.city === city ? null : city })}
              >
                {city}
              </PillButton>
            ))}
          </div>
        </FilterSection>

        <FilterSection label="Category">
          <div className="flex flex-wrap gap-2">
            {(Object.keys(EVENT_TOPIC_LABELS) as EventTopic[]).map((topic) => (
              <PillButton
                key={topic}
                active={filters.topic === topic}
                onClick={() =>
                  onChange({ ...filters, topic: filters.topic === topic ? null : topic })
                }
              >
                {EVENT_TOPIC_LABELS[topic]}
              </PillButton>
            ))}
          </div>
        </FilterSection>

        <FilterSection label="Time of Day">
          <div className="flex flex-wrap gap-2">
            {(Object.keys(TIME_OF_DAY_LABELS) as TimeOfDay[]).map((tod) => (
              <PillButton
                key={tod}
                active={filters.timeOfDay === tod}
                onClick={() =>
                  onChange({ ...filters, timeOfDay: filters.timeOfDay === tod ? null : tod })
                }
              >
                {TIME_OF_DAY_LABELS[tod]}
              </PillButton>
            ))}
          </div>
        </FilterSection>

        <FilterSection label="Venue Type">
          <div className="grid grid-cols-3 gap-2">
            <VenueCard
              icon={LayoutGrid}
              label="Any Venue"
              active={filters.venueType === 'any'}
              onClick={() => onChange({ ...filters, venueType: 'any' })}
            />
            <VenueCard
              icon={Video}
              label="Online"
              active={filters.venueType === 'online'}
              onClick={() => onChange({ ...filters, venueType: 'online' })}
            />
            <VenueCard
              icon={MapPin}
              label="In-person"
              active={filters.venueType === 'in_person'}
              onClick={() => onChange({ ...filters, venueType: 'in_person' })}
            />
          </div>
        </FilterSection>

        <FilterSection label="Distance">
          <div className="flex items-center gap-3">
            <Globe2 className="h-4 w-4 shrink-0 text-zinc-500" />
            <input
              type="range"
              min={1}
              max={50}
              step={1}
              value={filters.maxDistanceKm}
              onChange={(e) => onChange({ ...filters, maxDistanceKm: Number(e.target.value) })}
              className="flex-1 accent-indigo-400"
            />
            <span className="w-14 shrink-0 text-right text-sm text-zinc-300">
              {filters.maxDistanceKm >= 50 ? '50+ km' : `${filters.maxDistanceKm} km`}
            </span>
          </div>
        </FilterSection>

        <FilterSection label="Date">
          <div className="flex flex-wrap gap-2">
            {(Object.keys(DATE_CHIP_LABELS) as DateChip[]).map((chip) => (
              <PillButton
                key={chip}
                active={filters.dateChip === chip}
                onClick={() =>
                  onChange({
                    ...filters,
                    dateChip: filters.dateChip === chip ? null : chip,
                    customDate: null,
                  })
                }
              >
                {DATE_CHIP_LABELS[chip]}
              </PillButton>
            ))}
          </div>
          <div className="mt-3">
            <label className="mb-1 block text-xs text-zinc-500">Custom date</label>
            <input
              type="date"
              value={filters.customDate ?? ''}
              onChange={(e) =>
                onChange({
                  ...filters,
                  customDate: e.target.value || null,
                  dateChip: null,
                })
              }
              className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-zinc-200 focus:border-indigo-400/40 focus:outline-none"
            />
          </div>
        </FilterSection>
      </div>

      {activeCount > 0 && (
        <p className="mt-6 text-center text-xs text-zinc-600">{activeCount} filter{activeCount === 1 ? '' : 's'} active</p>
      )}
    </SlideOver>
  );
}

function FilterSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 text-xs font-medium text-zinc-500">{label}</p>
      {children}
    </div>
  );
}

function PillButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
        active
          ? 'border-indigo-400/40 bg-indigo-500/15 text-indigo-300'
          : 'border-white/10 text-zinc-400 hover:border-white/20 hover:text-zinc-200'
      }`}
    >
      {children}
    </button>
  );
}

function VenueCard({
  icon: Icon,
  label,
  active,
  onClick,
}: {
  icon: typeof Video;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-center gap-1.5 rounded-xl border px-2 py-3 text-center transition-colors ${
        active
          ? 'border-indigo-400/40 bg-indigo-500/10 text-indigo-300'
          : 'border-white/10 text-zinc-400 hover:border-white/20 hover:text-zinc-200'
      }`}
    >
      <Icon className="h-4 w-4" />
      <span className="text-[11px] font-medium">{label}</span>
    </button>
  );
}
