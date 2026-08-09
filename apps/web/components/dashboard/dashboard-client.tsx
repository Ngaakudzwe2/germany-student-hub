'use client';

import { useMemo, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { AlertTriangle, CheckCircle2, Clock, ListTodo, Sparkles } from 'lucide-react';
import type { TaskStatus } from '@repo/shared';
import { createBrowserSupabase } from '@/lib/supabase/client';
import { ProgressRing } from './progress-ring';
import { ActivityFeed } from './activity-feed';
import { UpcomingMeetups } from './upcoming-meetups';
import { TaskCard } from './task-card';
import { TaskModal } from './task-modal';

export interface DashboardTask {
  id: string;
  status: TaskStatus;
  due_date: string | null;
  task_templates: { title: string; category: string; required_documents: string[] } | null;
}

interface DashboardClientProps {
  initialTasks: DashboardTask[];
  userName: string;
  demoMode?: boolean;
}

export function DashboardClient({ initialTasks, userName, demoMode = false }: DashboardClientProps) {
  const [tasks, setTasks] = useState(initialTasks);
  const [openTaskId, setOpenTaskId] = useState<string | null>(null);
  const supabase = createBrowserSupabase();

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: TaskStatus }) => {
      const { error } = await supabase.from('user_tasks').update({ status }).eq('id', id);
      if (error) throw error;
    },
  });

  function handleStatusChange(id: string, status: TaskStatus) {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, status } : task)));
    if (!demoMode) {
      updateStatus.mutate({ id, status });
    }
  }

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === 'completed').length;
    const inProgress = tasks.filter(
      (t) => t.status === 'in_progress' || t.status === 'pending_document'
    ).length;
    const urgent = tasks.filter(
      (t) => t.status !== 'completed' && isUrgent(t.due_date)
    ).length;
    const percent = total === 0 ? 0 : (completed / total) * 100;
    return { total, completed, inProgress, urgent, percent };
  }, [tasks]);

  const openTask = tasks.find((t) => t.id === openTaskId) ?? null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="flex items-center gap-1.5 text-sm text-zinc-500">
            <Sparkles className="h-4 w-4 text-emerald-400" />
            Welcome back
          </p>
          <h1 className="text-2xl font-semibold text-zinc-50 sm:text-3xl">
            Hi, {userName.split(' ')[0]} 👋
          </h1>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="flex items-center gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm lg:col-span-1">
          <ProgressRing percent={stats.percent} />
          <div>
            <p className="text-lg font-semibold text-zinc-50">
              {stats.completed} of {stats.total} steps done
            </p>
            <p className="text-sm text-zinc-500">Relocation checklist progress</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 lg:col-span-2">
          <StatCard
            icon={CheckCircle2}
            iconClass="text-emerald-400"
            label="Completed"
            value={stats.completed}
          />
          <StatCard icon={Clock} iconClass="text-cyan-400" label="Active" value={stats.inProgress} />
          <StatCard
            icon={AlertTriangle}
            iconClass="text-amber-400"
            label="Urgent"
            value={stats.urgent}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <section className="space-y-3 lg:col-span-2">
          <h2 className="flex items-center gap-2 text-sm font-medium text-zinc-400">
            <ListTodo className="h-4 w-4" />
            Relocation Checklist
          </h2>
          {tasks.length === 0 ? (
            <p className="text-sm text-zinc-500">
              No tasks yet. Your relocation checklist will appear here once seeded.
            </p>
          ) : (
            tasks.map((task) => (
              <TaskCard
                key={task.id}
                title={task.task_templates?.title ?? 'Untitled task'}
                category={task.task_templates?.category ?? ''}
                status={task.status}
                dueDate={task.due_date}
                documentCount={task.task_templates?.required_documents.length ?? 0}
                onStatusChange={(status) => handleStatusChange(task.id, status)}
                onOpen={() => setOpenTaskId(task.id)}
              />
            ))
          )}
        </section>

        <aside className="space-y-6">
          <ActivityFeed tasks={tasks} />
          <UpcomingMeetups />
        </aside>
      </div>

      {openTask && (
        <TaskModal
          open={!!openTask}
          onClose={() => setOpenTaskId(null)}
          title={openTask.task_templates?.title ?? 'Task'}
          category={openTask.task_templates?.category ?? ''}
          status={openTask.status}
          requiredDocuments={openTask.task_templates?.required_documents ?? []}
          onStatusChange={(status) => handleStatusChange(openTask.id, status)}
        />
      )}
    </div>
  );
}

function StatCard({
  icon: Icon,
  iconClass,
  label,
  value,
}: {
  icon: typeof CheckCircle2;
  iconClass: string;
  label: string;
  value: number;
}) {
  return (
    <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm">
      <Icon className={`h-5 w-5 ${iconClass}`} />
      <div className="mt-3">
        <p className="text-2xl font-semibold text-zinc-50">{value}</p>
        <p className="text-xs text-zinc-500">{label}</p>
      </div>
    </div>
  );
}

function isUrgent(dueDate: string | null) {
  if (!dueDate) return false;
  const daysLeft = (new Date(dueDate).getTime() - Date.now()) / 86_400_000;
  return daysLeft <= 3 && daysLeft >= 0;
}
