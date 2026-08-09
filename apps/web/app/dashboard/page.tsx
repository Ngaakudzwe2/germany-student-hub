import { createServerSupabase } from '@/lib/supabase/server';
import { DEMO_MODE } from '@/lib/demo-mode';
import { DEMO_TASKS, DEMO_USER_NAME } from '@/lib/demo-data';
import { DashboardClient, type DashboardTask } from '@/components/dashboard/dashboard-client';

export default async function DashboardPage() {
  if (DEMO_MODE) {
    return <DashboardClient initialTasks={DEMO_TASKS} userName={DEMO_USER_NAME} demoMode />;
  }

  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <p className="text-zinc-400">Sign in to see your relocation checklist.</p>
      </div>
    );
  }

  const { data: rawTasks } = await supabase
    .from('user_tasks')
    .select('id, status, due_date, task_templates(title, category, required_documents)')
    .eq('user_id', user.id)
    .order('due_date', { ascending: true });

  // Supabase infers embedded relations as arrays without generated DB types;
  // this schema guarantees one template per task (FK + unique constraint).
  const tasks: DashboardTask[] = (rawTasks ?? []).map((task) => ({
    ...task,
    task_templates: Array.isArray(task.task_templates)
      ? (task.task_templates[0] ?? null)
      : task.task_templates,
  }));

  return <DashboardClient initialTasks={tasks} userName={user.email ?? 'there'} />;
}
