import type { JobCategory } from '@/lib/demo-data';
import { JOB_CATEGORY_LABELS } from '@/lib/job-meta';

export interface JobFiltersState {
  category: JobCategory | null;
  englishOnly: boolean;
  city: string | null;
  minHourlyRate: number;
}

export const DEFAULT_JOB_FILTERS: JobFiltersState = {
  category: null,
  englishOnly: false,
  city: null,
  minHourlyRate: 14,
};

interface JobFiltersProps {
  filters: JobFiltersState;
  onChange: (filters: JobFiltersState) => void;
  cities: string[];
}

export function JobFilters({ filters, onChange, cities }: JobFiltersProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="w-24 shrink-0 text-xs font-medium text-zinc-500">Category</span>
        {(Object.keys(JOB_CATEGORY_LABELS) as JobCategory[]).map((category) => (
          <Pill
            key={category}
            active={filters.category === category}
            onClick={() =>
              onChange({ ...filters, category: filters.category === category ? null : category })
            }
          >
            {JOB_CATEGORY_LABELS[category]}
          </Pill>
        ))}
        <Pill
          active={filters.englishOnly}
          onClick={() => onChange({ ...filters, englishOnly: !filters.englishOnly })}
        >
          English-Speaking / No German Required
        </Pill>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="w-24 shrink-0 text-xs font-medium text-zinc-500">City</span>
        {cities.map((city) => (
          <Pill
            key={city}
            active={filters.city === city}
            onClick={() => onChange({ ...filters, city: filters.city === city ? null : city })}
          >
            {city}
          </Pill>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <span className="w-24 shrink-0 text-xs font-medium text-zinc-500">Hourly pay</span>
        <input
          type="range"
          min={14}
          max={22}
          step={1}
          value={filters.minHourlyRate}
          onChange={(e) => onChange({ ...filters, minHourlyRate: Number(e.target.value) })}
          className="max-w-xs flex-1 accent-emerald-400"
        />
        <span className="w-16 text-xs text-zinc-300">€{filters.minHourlyRate}+/hr</span>
      </div>
    </div>
  );
}

function Pill({
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
          ? 'border-emerald-400/40 bg-emerald-500/15 text-emerald-300'
          : 'border-white/10 text-zinc-400 hover:border-white/20 hover:text-zinc-200'
      }`}
    >
      {children}
    </button>
  );
}
