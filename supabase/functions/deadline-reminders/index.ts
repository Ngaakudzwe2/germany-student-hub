import { createClient } from 'jsr:@supabase/supabase-js@2';

const REMINDER_WINDOW_DAYS = 3;

interface DueTaskRow {
  id: string;
  user_id: string;
  task_templates: { title: string } | { title: string }[] | null;
}

Deno.serve(async () => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );

  const targetDate = new Date(Date.now() + REMINDER_WINDOW_DAYS * 86_400_000)
    .toISOString()
    .slice(0, 10);

  const { data: dueTasks, error: fetchError } = await supabase
    .from('user_tasks')
    .select('id, user_id, task_templates(title)')
    .eq('due_date', targetDate)
    .neq('status', 'completed')
    .returns<DueTaskRow[]>();

  if (fetchError) {
    return new Response(JSON.stringify({ error: fetchError.message }), { status: 500 });
  }

  if (!dueTasks || dueTasks.length === 0) {
    return new Response(JSON.stringify({ notified: 0 }));
  }

  const notifications = dueTasks.map((task) => {
    const template = Array.isArray(task.task_templates)
      ? task.task_templates[0]
      : task.task_templates;

    return {
      user_id: task.user_id,
      type: 'task_deadline',
      title: `${REMINDER_WINDOW_DAYS} days left: ${template?.title ?? 'Upcoming task'}`,
      body: 'Complete this task before the deadline.',
      related_id: task.id,
    };
  });

  // Single batch insert instead of one round trip per task.
  const { error: insertError } = await supabase.from('notifications').insert(notifications);

  if (insertError) {
    return new Response(JSON.stringify({ error: insertError.message }), { status: 500 });
  }

  // TODO: fan out to Expo push / web push here, batched by provider (e.g. Expo's
  // push API also accepts up to 100 messages per request).

  return new Response(JSON.stringify({ notified: notifications.length }));
});
