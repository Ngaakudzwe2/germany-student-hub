'use client';

import { useMemo, useState } from 'react';
import { Check, Copy, Crown, Download, FileText, Printer, Sparkles } from 'lucide-react';
import type { DemoJob } from '@/lib/demo-data';
import { buildCV, buildCoverLetter, buildPitch, type CareerBuilderInput } from '@/lib/ai-generator';
import { useToast } from '@/components/ui/toast';
import { HubPlusModal } from '@/components/premium/hub-plus-modal';

type Tab = 'cv' | 'cover-letter' | 'pitch';

const TABS: { id: Tab; label: string }[] = [
  { id: 'cv', label: 'CV' },
  { id: 'cover-letter', label: 'Cover Letter' },
  { id: 'pitch', label: 'Pitch' },
];

const EMPTY_INPUT: CareerBuilderInput = {
  fullName: '',
  targetJobTitle: '',
  targetCompany: '',
  yearsExperience: '',
  experience: '',
  skills: '',
  jobDescription: '',
};

interface AiCareerBuilderProps {
  prefillJob: DemoJob | null;
}

export function AiCareerBuilder({ prefillJob }: AiCareerBuilderProps) {
  const [input, setInput] = useState<CareerBuilderInput>(EMPTY_INPUT);
  const [tab, setTab] = useState<Tab>('cv');
  const [copied, setCopied] = useState(false);
  const [purchaseState, setPurchaseState] = useState<'idle' | 'sandbox'>('idle');
  const [hubPlusOpen, setHubPlusOpen] = useState(false);
  const { showToast } = useToast();
  const [appliedJobId, setAppliedJobId] = useState<string | null>(null);

  // Adjust state during render when a new job is passed in, rather than in an
  // effect — see https://react.dev/learn/you-might-not-need-an-effect
  if (prefillJob && prefillJob.id !== appliedJobId) {
    setAppliedJobId(prefillJob.id);
    setInput((prev) => ({
      ...prev,
      targetJobTitle: prefillJob.title,
      targetCompany: prefillJob.company,
      jobDescription: prefillJob.description,
      skills: prev.skills || prefillJob.tags.join(', '),
    }));
  }

  const outputs = useMemo(
    () => ({
      cv: buildCV(input),
      'cover-letter': buildCoverLetter(input),
      pitch: buildPitch(input),
    }),
    [input]
  );

  function update<K extends keyof CareerBuilderInput>(key: K, value: CareerBuilderInput[K]) {
    setInput((prev) => ({ ...prev, [key]: value }));
  }

  async function copyOutput() {
    try {
      await navigator.clipboard.writeText(outputs[tab]);
      setCopied(true);
      showToast('Copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast("Couldn't copy — select the text manually", 'info');
    }
  }

  function downloadMarkdown() {
    const blob = new Blob([outputs.cv], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${input.fullName || 'cv'}-cv.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm">
      <div className="mb-1 flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-amber-400" />
        <h2 className="font-semibold text-zinc-50">AI CV & Cover Letter Builder</h2>
      </div>
      <p className="mb-5 text-sm text-zinc-500">
        Generate a tailored CV, German cover letter (Bewerbungsschreiben), and a short recruiter
        outreach pitch from your experience and a target job.
      </p>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-3">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Field label="Full name">
              <input
                type="text"
                value={input.fullName}
                onChange={(e) => update('fullName', e.target.value)}
                placeholder="Amara Okafor"
                className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-zinc-200 placeholder:text-zinc-600 focus:border-amber-400/40 focus:outline-none"
              />
            </Field>
            <Field label="Years of experience">
              <input
                type="text"
                value={input.yearsExperience}
                onChange={(e) => update('yearsExperience', e.target.value)}
                placeholder="Entry-level / 2 years"
                className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-zinc-200 placeholder:text-zinc-600 focus:border-amber-400/40 focus:outline-none"
              />
            </Field>
            <Field label="Target job title">
              <input
                type="text"
                value={input.targetJobTitle}
                onChange={(e) => update('targetJobTitle', e.target.value)}
                placeholder="Werkstudent Software Engineer"
                className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-zinc-200 placeholder:text-zinc-600 focus:border-amber-400/40 focus:outline-none"
              />
            </Field>
            <Field label="Target company">
              <input
                type="text"
                value={input.targetCompany}
                onChange={(e) => update('targetCompany', e.target.value)}
                placeholder="TechFlow GmbH"
                className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-zinc-200 placeholder:text-zinc-600 focus:border-amber-400/40 focus:outline-none"
              />
            </Field>
          </div>

          <Field label="Key skills (comma separated)">
            <input
              type="text"
              value={input.skills}
              onChange={(e) => update('skills', e.target.value)}
              placeholder="React, TypeScript, SQL, German (B1)"
              className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-zinc-200 placeholder:text-zinc-600 focus:border-amber-400/40 focus:outline-none"
            />
          </Field>

          <Field label="Work experience">
            <textarea
              value={input.experience}
              onChange={(e) => update('experience', e.target.value)}
              rows={3}
              placeholder="Built and shipped features for a 3-person startup team, focused on frontend performance."
              className="w-full resize-none rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-zinc-200 placeholder:text-zinc-600 focus:border-amber-400/40 focus:outline-none"
            />
          </Field>

          <Field label="Job description (paste from listing)">
            <textarea
              value={input.jobDescription}
              onChange={(e) => update('jobDescription', e.target.value)}
              rows={3}
              placeholder="Paste the job posting text here for a more tailored result…"
              className="w-full resize-none rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-zinc-200 placeholder:text-zinc-600 focus:border-amber-400/40 focus:outline-none"
            />
          </Field>
        </div>

        <div className="flex flex-col rounded-xl border border-white/10 bg-zinc-950/60 p-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex gap-1">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTab(t.id)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    tab === t.id ? 'bg-white/10 text-zinc-100' : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-1">
              {tab === 'cv' && (
                <>
                  <IconButton onClick={downloadMarkdown} label="Download .md">
                    <Download className="h-3.5 w-3.5" />
                  </IconButton>
                  <IconButton onClick={() => window.print()} label="Print / Save as PDF">
                    <Printer className="h-3.5 w-3.5" />
                  </IconButton>
                </>
              )}
              <IconButton onClick={copyOutput} label="Copy">
                {copied ? (
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </IconButton>
            </div>
          </div>

          <pre
            id={tab === 'cv' ? 'print-area' : undefined}
            className="scrollbar-thin min-h-64 flex-1 overflow-y-auto text-xs leading-relaxed whitespace-pre-wrap text-zinc-300"
          >
            {outputs[tab]}
          </pre>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
        <div className="flex items-center gap-2 text-sm text-zinc-300">
          <FileText className="h-4 w-4 text-amber-400 shrink-0" />
          Free to try. Unlock unlimited generations with Hub+, or pay per document.
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setPurchaseState('sandbox')}
            className="rounded-full border border-white/10 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:border-white/20"
          >
            Buy this document — €2.99
          </button>
          <button
            type="button"
            onClick={() => setHubPlusOpen(true)}
            className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-3 py-1.5 text-xs font-semibold text-zinc-950"
          >
            <Crown className="h-3.5 w-3.5" />
            Hub+ — €9.99/mo
          </button>
        </div>
      </div>

      {purchaseState === 'sandbox' && (
        <p className="mt-2 text-center text-[11px] text-zinc-600">
          Sandbox mode — no charge was made. Connect Stripe to enable real per-document purchases.
        </p>
      )}

      <HubPlusModal open={hubPlusOpen} onClose={() => setHubPlusOpen(false)} />
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-zinc-500">{label}</label>
      {children}
    </div>
  );
}

function IconButton({
  onClick,
  label,
  children,
}: {
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="rounded-md p-1.5 text-zinc-500 transition-colors hover:bg-white/10 hover:text-zinc-200"
    >
      {children}
    </button>
  );
}
