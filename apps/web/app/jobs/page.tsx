'use client';

import { useMemo, useState } from 'react';
import { Briefcase } from 'lucide-react';
import { DEMO_JOBS, type DemoJob } from '@/lib/demo-data';
import { JobCard } from '@/components/jobs/job-card';
import { JobModal } from '@/components/jobs/job-modal';
import { JobFilters, DEFAULT_JOB_FILTERS, type JobFiltersState } from '@/components/jobs/job-filters';
import { PortalLinksWidget } from '@/components/jobs/portal-links-widget';

const CITY_ORDER = ['Berlin', 'Munich', 'Hamburg', 'Frankfurt', 'Cologne', 'Remote'];

export default function JobsPage() {
  const [filters, setFilters] = useState<JobFiltersState>(DEFAULT_JOB_FILTERS);
  const [activeJob, setActiveJob] = useState<DemoJob | null>(null);

  const cities = useMemo(() => {
    const present = new Set(DEMO_JOBS.map((j) => j.city));
    return CITY_ORDER.filter((city) => present.has(city));
  }, []);

  const jobs = useMemo(() => {
    return DEMO_JOBS.filter((job) => {
      if (filters.category && job.category !== filters.category) return false;
      if (filters.englishOnly && job.germanLevel !== 'english_only') return false;
      if (filters.city && job.city !== filters.city) return false;
      return true;
    }).sort((a, b) => a.postedAt.localeCompare(b.postedAt) * -1);
  }, [filters]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-6">
        <p className="flex items-center gap-1.5 text-sm text-zinc-500">
          <Briefcase className="h-4 w-4 text-emerald-400" />
          Work while you study
        </p>
        <h1 className="text-2xl font-semibold text-zinc-50 sm:text-3xl">Student Job Board</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Werkstudent and Minijob roles curated for international students in Germany.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm">
            <JobFilters filters={filters} onChange={setFilters} cities={cities} />
          </div>

          <p className="text-sm text-zinc-500">
            {jobs.length} job{jobs.length === 1 ? '' : 's'} found
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} onOpen={() => setActiveJob(job)} />
            ))}
          </div>

          {jobs.length === 0 && (
            <p className="py-12 text-center text-sm text-zinc-500">
              No jobs match those filters. Try clearing them.
            </p>
          )}
        </div>

        <aside>
          <PortalLinksWidget />
        </aside>
      </div>

      <JobModal job={activeJob} onClose={() => setActiveJob(null)} />
    </div>
  );
}
