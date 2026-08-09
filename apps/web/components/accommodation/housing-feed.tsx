'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { BedDouble, Calendar, Home, MapPin, ShieldCheck } from 'lucide-react';
import { DEMO_LISTINGS, type ListingType } from '@/lib/demo-data';
import { unsplashUrl } from '@/lib/event-meta';

const TYPE_LABELS: Record<ListingType, string> = {
  wg_room: 'WG Room',
  apartment: 'Apartment',
};

const LIVE_WINDOW_MINUTES = 15;

export function HousingFeed() {
  const [city, setCity] = useState<string | null>(null);
  const [type, setType] = useState<ListingType | null>(null);
  const [maxRent, setMaxRent] = useState<number>(1400);
  const [now] = useState(() => Date.now());

  const cities = useMemo(() => Array.from(new Set(DEMO_LISTINGS.map((l) => l.city))).sort(), []);

  const listings = useMemo(() => {
    return DEMO_LISTINGS.filter((listing) => {
      if (city && listing.city !== city) return false;
      if (type && listing.type !== type) return false;
      if (listing.rentEur > maxRent) return false;
      return true;
    }).sort((a, b) => b.listedAt.localeCompare(a.listedAt));
  }, [city, type, maxRent]);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm">
      <div className="mb-1 flex items-center gap-2">
        <Home className="h-4 w-4 text-orange-400" />
        <h2 className="font-semibold text-zinc-50">Housing Listings</h2>
        <span className="flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          Live
        </span>
      </div>
      <p className="mb-4 text-sm text-zinc-500">
        Filterable feed of shared flats (WG) and apartments — new listings appear as they&apos;re
        posted.
      </p>

      <div className="mb-5 flex flex-wrap items-center gap-2">
        <PillGroup
          options={cities}
          active={city}
          onSelect={setCity}
        />
        <PillGroup
          options={Object.keys(TYPE_LABELS) as ListingType[]}
          active={type}
          onSelect={(value) => setType(value as ListingType | null)}
          renderLabel={(v) => TYPE_LABELS[v as ListingType]}
        />
        <label className="ml-auto flex items-center gap-2 text-xs text-zinc-500">
          Max rent
          <input
            type="range"
            min={400}
            max={1400}
            step={50}
            value={maxRent}
            onChange={(e) => setMaxRent(Number(e.target.value))}
            className="accent-orange-400"
          />
          <span className="w-14 text-zinc-300">€{maxRent}</span>
        </label>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {listings.map((listing) => {
          const minutesAgo = Math.round((now - new Date(listing.listedAt).getTime()) / 60_000);
          const isJustListed = minutesAgo <= LIVE_WINDOW_MINUTES;

          return (
            <div
              key={listing.id}
              className="flex flex-col overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]"
            >
              <div className="relative h-32 w-full overflow-hidden">
                <Image
                  src={unsplashUrl(listing.coverPhotoId, 480)}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
                <span className="absolute top-2 left-2 rounded-full bg-black/40 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
                  {TYPE_LABELS[listing.type]}
                </span>
                {isJustListed && (
                  <span className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-semibold text-zinc-950">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-zinc-950" />
                    Just listed
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col gap-2 p-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-medium text-zinc-100">{listing.title}</h3>
                  {listing.verified && (
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  )}
                </div>
                <p className="flex items-center gap-1 text-xs text-zinc-500">
                  <MapPin className="h-3 w-3 shrink-0" />
                  {listing.district}, {listing.city}
                </p>
                <p className="flex items-center gap-1 text-xs text-zinc-500">
                  <BedDouble className="h-3 w-3 shrink-0" />
                  {listing.roomSizeSqm} m²
                  <span className="mx-1">·</span>
                  <Calendar className="h-3 w-3 shrink-0" />
                  from {new Date(listing.moveInDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                </p>
                <div className="mt-auto flex items-center justify-between pt-1">
                  <span className="text-sm font-semibold text-zinc-50">€{listing.rentEur}/mo</span>
                  <span className="text-[10px] text-zinc-600">
                    {minutesAgo < 60
                      ? `${minutesAgo}m ago`
                      : `${Math.round(minutesAgo / 60)}h ago`}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {listings.length === 0 && (
        <p className="mt-6 text-center text-sm text-zinc-500">
          No listings match those filters. Try raising the max rent.
        </p>
      )}
    </div>
  );
}

function PillGroup({
  options,
  active,
  onSelect,
  renderLabel,
}: {
  options: string[];
  active: string | null;
  onSelect: (value: string | null) => void;
  renderLabel?: (value: string) => string;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((option) => {
        const isActive = active === option;
        return (
          <button
            key={option}
            type="button"
            onClick={() => onSelect(isActive ? null : option)}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              isActive
                ? 'border-orange-400/40 bg-orange-500/15 text-orange-300'
                : 'border-white/10 text-zinc-400 hover:border-white/20 hover:text-zinc-200'
            }`}
          >
            {renderLabel ? renderLabel(option) : option}
          </button>
        );
      })}
    </div>
  );
}
