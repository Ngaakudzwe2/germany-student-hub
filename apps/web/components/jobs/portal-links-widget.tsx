import { ExternalLink, Compass } from 'lucide-react';
import { JOB_PORTAL_LINKS } from '@/lib/job-meta';

export function PortalLinksWidget() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm">
      <div className="mb-1 flex items-center gap-2">
        <Compass className="h-4 w-4 text-emerald-400" />
        <h2 className="font-semibold text-zinc-50">Official Job Portals</h2>
      </div>
      <p className="mb-4 text-sm text-zinc-500">
        Search the full German job market beyond our curated board.
      </p>
      <div className="flex flex-wrap gap-2">
        {JOB_PORTAL_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-zinc-300 hover:border-white/20 hover:text-zinc-100"
          >
            {link.label}
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        ))}
      </div>
    </div>
  );
}
