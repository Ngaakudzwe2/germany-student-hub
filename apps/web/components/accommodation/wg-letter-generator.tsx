'use client';

import { useMemo, useState } from 'react';
import { Check, Copy, FileText, Wand2 } from 'lucide-react';

interface FormState {
  fullName: string;
  nationality: string;
  university: string;
  program: string;
  city: string;
  moveInDate: string;
  intro: string;
}

const INITIAL_STATE: FormState = {
  fullName: '',
  nationality: '',
  university: '',
  program: '',
  city: 'Berlin',
  moveInDate: '',
  intro: '',
};

const FIELDS: { key: keyof FormState; label: string; placeholder: string }[] = [
  { key: 'fullName', label: 'Full name', placeholder: 'Amara Okafor' },
  { key: 'nationality', label: 'Nationality', placeholder: 'Nigerian' },
  { key: 'university', label: 'University', placeholder: 'Technical University of Berlin' },
  { key: 'program', label: 'Study program', placeholder: 'M.Sc. Computer Science' },
  { key: 'city', label: 'City', placeholder: 'Berlin' },
  { key: 'moveInDate', label: 'Move-in date', placeholder: '1 October 2026' },
];

export function WgLetterGenerator() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [copied, setCopied] = useState(false);

  const letter = useMemo(() => buildLetter(form), [form]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setCopied(false);
  }

  async function copyLetter() {
    try {
      await navigator.clipboard.writeText(letter);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access can be blocked by the browser; the letter is still visible to copy manually.
    }
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm">
      <div className="mb-4 flex items-center gap-2">
        <Wand2 className="h-4 w-4 text-orange-400" />
        <h2 className="font-semibold text-zinc-50">WG Application Letter Generator</h2>
      </div>
      <p className="mb-5 text-sm text-zinc-500">
        Fill in your details to generate a pre-formatted German cover letter (Bewerbungsschreiben)
        for shared-flat applications.
      </p>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-3">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {FIELDS.map((field) => (
              <div key={field.key} className={field.key === 'university' ? 'sm:col-span-2' : ''}>
                <label className="mb-1 block text-xs font-medium text-zinc-500">
                  {field.label}
                </label>
                <input
                  type="text"
                  value={form[field.key]}
                  onChange={(e) => update(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-zinc-200 placeholder:text-zinc-600 focus:border-orange-400/40 focus:outline-none"
                />
              </div>
            ))}
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-zinc-500">
              Short intro (optional)
            </label>
            <textarea
              value={form.intro}
              onChange={(e) => update('intro', e.target.value)}
              rows={3}
              placeholder="I'm a quiet, tidy person who enjoys cooking and cycling."
              className="w-full resize-none rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-zinc-200 placeholder:text-zinc-600 focus:border-orange-400/40 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col rounded-xl border border-white/10 bg-zinc-950/60 p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs font-medium text-zinc-500">
              <FileText className="h-3.5 w-3.5" />
              Live preview
            </span>
            <button
              type="button"
              onClick={copyLetter}
              className="flex items-center gap-1.5 rounded-full border border-white/10 px-2.5 py-1 text-xs text-zinc-300 hover:border-white/20 hover:text-zinc-100"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  Copy
                </>
              )}
            </button>
          </div>
          <pre className="scrollbar-thin flex-1 overflow-y-auto text-xs leading-relaxed whitespace-pre-wrap text-zinc-300">
            {letter}
          </pre>
        </div>
      </div>
    </div>
  );
}

function buildLetter(form: FormState): string {
  const name = form.fullName || '[Your Name]';
  const nationality = form.nationality || '[Your Nationality]';
  const university = form.university || '[Your University]';
  const program = form.program || '[Your Study Program]';
  const city = form.city || '[City]';
  const moveInDate = form.moveInDate || '[Move-in Date]';
  const intro = form.intro || 'I am a reliable, tidy, and friendly flatmate.';

  return `Sehr geehrte Damen und Herren,

mein Name ist ${name}, ich komme aus ${nationality} und studiere ${program} an der ${university}. Ich suche ab dem ${moveInDate} ein WG-Zimmer in ${city}.

${intro}

Meine finanzielle Zuverlässigkeit kann ich durch ein Sperrkonto bzw. einen Einkommensnachweis belegen. Ich bin Nichtraucher/in und ein ruhiger, ordentlicher Mitbewohner/in.

Über eine Einladung zur Besichtigung würde ich mich sehr freuen.

Mit freundlichen Grüßen,
${name}`;
}
