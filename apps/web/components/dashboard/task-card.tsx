'use client';

import { ChevronRight } from 'lucide-react';
import type { TaskStatus } from '@repo/shared';
import { CATEGORY_ICON, DEFAULT_CATEGORY_ICON, STATUS_META } from '@/lib/task-meta';

interface TaskCardProps {
  title: string;
  category: string;
  status: TaskStatus;
  dueDate: string | null;
  documentCount: number;
  onStatusChange: (status: TaskStatus) => void;
  onOpen: () => void;
}

export function TaskCard({
  title,
  category,
  status,
  dueDate,
  documentCount,
  onStatusChange,
  onOpen,
}: TaskCardProps) {
  const CategoryIcon = CATEGORY_ICON[category] ?? DEFAULT_CATEGORY_ICON;
  const statusMeta = STATUS_META[status];
  const StatusIcon = statusMeta.icon;
  const urgent = isUrgent(dueDate) && status !== 'completed';

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onOpen()}
      className="group flex cursor-pointer items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm transition-colors hover:border-white/20 hover:bg-white/[0.06]"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-emerald-500/15 to-cyan-500/15">
        <CategoryIcon className="h-5 w-5 text-emerald-300" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate font-medium text-zinc-100">{title}</p>
          {urgent && (
            <span className="shrink-0 rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-medium tracking-wide text-amber-400 uppercase">
              Due soon
            </span>
          )}
        </div>
        <p className="truncate text-sm text-zinc-500">
          {category}
          {dueDate ? ` · Due ${dueDate}` : ''}
          {documentCount > 0 ? ` · ${documentCount} document${documentCount === 1 ? '' : 's'}` : ''}
        </p>
      </div>

      <div
        className={`hidden items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium sm:flex ${statusMeta.bg} ${statusMeta.border} ${statusMeta.text}`}
      >
        <StatusIcon className="h-3.5 w-3.5" />
        {statusMeta.label}
      </div>

      <select
        value={status}
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => onStatusChange(e.target.value as TaskStatus)}
        className="shrink-0 rounded-lg border border-white/10 bg-zinc-900 px-2 py-1.5 text-xs text-zinc-300 focus:border-emerald-400/50 focus:outline-none"
      >
        {Object.entries(STATUS_META).map(([value, meta]) => (
          <option key={value} value={value}>
            {meta.label}
          </option>
        ))}
      </select>

      <ChevronRight className="hidden h-4 w-4 shrink-0 text-zinc-600 transition-transform group-hover:translate-x-0.5 sm:block" />
    </div>
  );
}

function isUrgent(dueDate: string | null) {
  if (!dueDate) return false;
  const daysLeft = (new Date(dueDate).getTime() - Date.now()) / 86_400_000;
  return daysLeft <= 3 && daysLeft >= 0;
}
