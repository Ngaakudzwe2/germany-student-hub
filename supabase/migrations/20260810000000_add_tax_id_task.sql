-- Adds the Tax ID (Steuer-ID) task, surfaced alongside the original 5-task checklist.

insert into task_templates (category, title, description, typical_deadline_days_after_arrival, order_index, required_documents)
values (
  'Tax ID',
  'Tax Identification Number (Steuer-ID)',
  'Automatically mailed after Anmeldung is processed; request a duplicate via BZSt if it never arrives.',
  30,
  6,
  array['Anmeldung certificate']
);
