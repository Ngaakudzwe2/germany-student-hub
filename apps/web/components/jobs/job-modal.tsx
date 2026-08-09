'use client';

import { ExternalLink, Clock, ListChecks, MapPin, Sparkles } from 'lucide-react';
import Image from 'next/image';
import type { DemoJob } from '@/lib/demo-data';
import { GERMAN_LEVEL_LABELS, JOB_CATEGORY_LABELS } from '@/lib/job-meta';
import { avatarColor, unsplashUrl } from '@/lib/event-meta';
import { Modal } from '@/components/ui/modal';

interface JobModalProps {
  job: DemoJob | null;
  onClose: () => void;
  onUseInGenerator: (job: DemoJob) => void;
}

export function JobModal({ job, onClose, onUseInGenerator }: JobModalProps) {
  if (!job) return null;

  return (
    <Modal open={!!job} onClose={onClose} title={job.title} subtitle={job.company}>
      <div className="space-y-6">
        <div className="relative h-32 w-full overflow-hidden rounded-xl">
          <Image
            src={unsplashUrl(job.heroPhotoId, 640)}
            alt=""
            fill
            sizes="512px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        <div className="flex items-center gap-3">
          <span
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-semibold text-white ${avatarColor(job.company)}`}
          >
            {job.companyInitial}
          </span>
          <div className="min-w-0">
            <p className="font-medium text-zinc-100">{job.company}</p>
            <p className="flex items-center gap-1 text-xs text-zinc-500">
              <MapPin className="h-3 w-3" />
              {job.city}
              {job.remote ? ' · Remote' : ''}
              <span className="mx-0.5">·</span>
              <Clock className="h-3 w-3" />
              {job.hoursPerWeek}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="rounded-lg border border-white/10 bg-white/[0.03] py-2">
            <p className="text-sm font-semibold text-zinc-50">
              €{job.hourlyRateMin}
              {job.hourlyRateMax !== job.hourlyRateMin ? `–${job.hourlyRateMax}` : ''}
            </p>
            <p className="text-[10px] text-zinc-500">per hour</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.03] py-2">
            <p className="text-sm font-semibold text-zinc-50">
              {GERMAN_LEVEL_LABELS[job.germanLevel]}
            </p>
            <p className="text-[10px] text-zinc-500">German level</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.03] py-2">
            <p className="text-sm font-semibold text-zinc-50">{JOB_CATEGORY_LABELS[job.category]}</p>
            <p className="text-[10px] text-zinc-500">contract type</p>
          </div>
        </div>

        <section>
          <h3 className="mb-2 text-sm font-medium text-zinc-200">About the role</h3>
          <p className="text-sm text-zinc-400">{job.description}</p>
        </section>

        <section>
          <h3 className="mb-2 flex items-center gap-2 text-sm font-medium text-zinc-200">
            <ListChecks className="h-4 w-4 text-emerald-400" />
            Requirements
          </h3>
          <ul className="space-y-1.5">
            {job.requirements.map((req) => (
              <li key={req} className="flex items-start gap-2 text-sm text-zinc-400">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-zinc-600" />
                {req}
              </li>
            ))}
          </ul>
        </section>

        <div className="flex gap-2">
          <a
            href={job.applicationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 py-3 text-sm font-semibold text-zinc-950 transition-opacity hover:opacity-90"
          >
            <ExternalLink className="h-4 w-4" />
            Apply Now
          </a>
          <button
            type="button"
            onClick={() => onUseInGenerator(job)}
            className="flex items-center justify-center gap-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm font-medium text-amber-300"
          >
            <Sparkles className="h-4 w-4" />
            <span className="hidden sm:inline">Use in AI Builder</span>
          </button>
        </div>
        <p className="-mt-4 text-center text-[11px] text-zinc-600">
          Opens the employer&apos;s application portal in a new tab.
        </p>
      </div>
    </Modal>
  );
}
