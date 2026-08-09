import { Clock, MapPin } from 'lucide-react';
import type { DemoJob } from '@/lib/demo-data';
import { GERMAN_LEVEL_LABELS, JOB_CATEGORY_LABELS } from '@/lib/job-meta';
import { avatarColor } from '@/lib/event-meta';

export function JobCard({ job, onOpen }: { job: DemoJob; onOpen: () => void }) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onOpen()}
      className="flex cursor-pointer flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm transition-colors hover:border-white/20 hover:bg-white/[0.06]"
    >
      <div className="flex items-start gap-3">
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-semibold text-white ${avatarColor(job.company)}`}
        >
          {job.companyInitial}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-medium text-zinc-100">{job.title}</h3>
          <p className="truncate text-sm text-zinc-500">{job.company}</p>
        </div>
        <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-medium text-zinc-300">
          {JOB_CATEGORY_LABELS[job.category]}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-500">
        <span className="font-medium text-zinc-300">
          €{job.hourlyRateMin}
          {job.hourlyRateMax !== job.hourlyRateMin ? `–${job.hourlyRateMax}` : ''}/hr
        </span>
        <span className="flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          {job.city}
          {job.remote ? ' · Remote' : ''}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {job.hoursPerWeek}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        <span
          className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
            job.germanLevel === 'english_only'
              ? 'bg-indigo-500/15 text-indigo-300'
              : 'bg-emerald-500/15 text-emerald-300'
          }`}
        >
          {GERMAN_LEVEL_LABELS[job.germanLevel]}
        </span>
        {job.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] text-zinc-400"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
