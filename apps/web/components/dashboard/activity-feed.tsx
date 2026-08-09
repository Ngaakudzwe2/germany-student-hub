import { CheckCircle2, PartyPopper, Zap, type LucideIcon } from 'lucide-react';
import type { TaskStatus } from '@repo/shared';

interface FeedTask {
  id: string;
  status: TaskStatus;
  due_date: string | null;
  task_templates: { title: string } | null;
}

interface ActivityItem {
  id: string;
  icon: LucideIcon;
  text: string;
  time: string;
  accent: string;
}

export function ActivityFeed({ tasks }: { tasks: FeedTask[] }) {
  const items = buildItems(tasks);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        </span>
        <h2 className="text-sm font-medium text-zinc-200">Live Updates</h2>
      </div>
      <ul className="scrollbar-thin max-h-56 space-y-1 overflow-y-auto p-2">
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <li
              key={item.id}
              className="animate-ticker-in flex items-start gap-3 rounded-lg px-2 py-2 text-sm hover:bg-white/5"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${item.accent}`} />
              <div className="min-w-0">
                <p className="text-zinc-300">{item.text}</p>
                <p className="text-xs text-zinc-500">{item.time}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function buildItems(tasks: FeedTask[]): ActivityItem[] {
  const items: ActivityItem[] = [];

  for (const task of tasks) {
    if (task.status === 'completed' || !task.due_date) continue;
    const daysLeft = Math.ceil((new Date(task.due_date).getTime() - Date.now()) / 86_400_000);
    if (daysLeft >= 0 && daysLeft <= 5) {
      items.push({
        id: `deadline-${task.id}`,
        icon: Zap,
        text: `${daysLeft === 0 ? 'Due today' : `${daysLeft} day${daysLeft === 1 ? '' : 's'} left`} to submit ${task.task_templates?.title ?? 'your task'}.`,
        time: 'Just now',
        accent: 'text-amber-400',
      });
    }
  }

  items.push(
    {
      id: 'meetup-berlin',
      icon: PartyPopper,
      text: 'New student meetup added in Berlin: Language Café this Friday.',
      time: '12m ago',
      accent: 'text-indigo-400',
    },
    {
      id: 'community-progress',
      icon: CheckCircle2,
      text: '3 students in Munich completed their Anmeldung this week.',
      time: '1h ago',
      accent: 'text-emerald-400',
    },
  );

  return items;
}
