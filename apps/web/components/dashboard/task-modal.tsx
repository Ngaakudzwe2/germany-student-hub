'use client';

import { useRef, useState } from 'react';
import { Check, Copy, ExternalLink, FileText, Languages, ListChecks, MapPin, Upload, X } from 'lucide-react';
import type { TaskStatus } from '@repo/shared';
import { Modal } from '@/components/ui/modal';
import { getTaskDetail, STATUS_META, STATUS_ORDER } from '@/lib/task-meta';
import { useToast } from '@/components/ui/toast';

interface TaskModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  category: string;
  status: TaskStatus;
  requiredDocuments: string[];
  onStatusChange: (status: TaskStatus) => void;
}

export function TaskModal({
  open,
  onClose,
  title,
  category,
  status,
  requiredDocuments,
  onStatusChange,
}: TaskModalProps) {
  const detail = getTaskDetail(category);
  const [files, setFiles] = useState<string[]>([]);
  const [copiedPhrase, setCopiedPhrase] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { showToast } = useToast();

  function handleFilesSelected(fileList: FileList | null) {
    if (!fileList) return;
    setFiles((prev) => [...prev, ...Array.from(fileList).map((f) => f.name)]);
  }

  async function copyPhrase(phrase: string) {
    try {
      await navigator.clipboard.writeText(phrase);
      setCopiedPhrase(phrase);
      showToast('Phrase copied to clipboard');
      setTimeout(() => setCopiedPhrase((prev) => (prev === phrase ? null : prev)), 2000);
    } catch {
      showToast("Couldn't copy — select the text manually", 'info');
    }
  }

  return (
    <Modal open={open} onClose={onClose} title={title} subtitle={category}>
      <div className="space-y-6">
        <div className="flex flex-wrap gap-2">
          {STATUS_ORDER.map((value) => {
            const meta = STATUS_META[value];
            const Icon = meta.icon;
            const active = value === status;
            return (
              <button
                key={value}
                type="button"
                onClick={() => onStatusChange(value)}
                className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                  active
                    ? `${meta.bg} ${meta.border} ${meta.text}`
                    : 'border-white/10 text-zinc-500 hover:border-white/20 hover:text-zinc-300'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {meta.label}
              </button>
            );
          })}
        </div>

        <section>
          <h3 className="mb-2 flex items-center gap-2 text-sm font-medium text-zinc-200">
            <MapPin className="h-4 w-4 text-emerald-400" />
            Where to go
          </h3>
          <p className="mb-2 text-sm text-zinc-400">{detail.location}</p>
          {detail.officialLinks.length > 0 && (
            <>
              <p className="mb-1.5 text-xs font-medium text-zinc-500">
                {detail.appointmentLabel} — official portals:
              </p>
              <div className="flex flex-wrap gap-2">
                {detail.officialLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 px-3 py-1.5 text-xs font-medium text-zinc-950"
                  >
                    {link.label}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
            </>
          )}
        </section>

        <section>
          <h3 className="mb-2 flex items-center gap-2 text-sm font-medium text-zinc-200">
            <ListChecks className="h-4 w-4 text-emerald-400" />
            Step-by-step
          </h3>
          <ol className="space-y-2">
            {detail.steps.map((step, i) => (
              <li key={step} className="flex gap-3 text-sm text-zinc-400">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/5 text-[11px] font-medium text-zinc-300">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </section>

        {requiredDocuments.length > 0 && (
          <section>
            <h3 className="mb-2 flex items-center gap-2 text-sm font-medium text-zinc-200">
              <FileText className="h-4 w-4 text-emerald-400" />
              Required documents
            </h3>
            <ul className="flex flex-wrap gap-2">
              {requiredDocuments.map((doc) => (
                <li
                  key={doc}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300"
                >
                  {doc}
                </li>
              ))}
            </ul>
          </section>
        )}

        {detail.phrases.length > 0 && (
          <section>
            <h3 className="mb-2 flex items-center gap-2 text-sm font-medium text-zinc-200">
              <Languages className="h-4 w-4 text-emerald-400" />
              German phrase cheat sheet
            </h3>
            <div className="space-y-2">
              {detail.phrases.map((phrase) => (
                <div
                  key={phrase.de}
                  className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-zinc-100">{phrase.de}</p>
                    <p className="text-xs text-zinc-500">{phrase.en}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyPhrase(phrase.de)}
                    className="shrink-0 rounded-md p-1.5 text-zinc-500 transition-colors hover:bg-white/10 hover:text-zinc-200"
                    aria-label={`Copy "${phrase.de}"`}
                  >
                    {copiedPhrase === phrase.de ? (
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        <section>
          <h3 className="mb-2 flex items-center gap-2 text-sm font-medium text-zinc-200">
            <Upload className="h-4 w-4 text-emerald-400" />
            Upload documents
          </h3>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex w-full flex-col items-center gap-1.5 rounded-xl border border-dashed border-white/15 bg-white/[0.02] px-4 py-6 text-center transition-colors hover:border-emerald-400/40 hover:bg-white/[0.04]"
          >
            <Upload className="h-5 w-5 text-zinc-500" />
            <span className="text-sm text-zinc-400">Click to attach a file, or drag it here</span>
            <span className="text-xs text-zinc-600">Simulated — files aren&apos;t actually uploaded</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={(e) => handleFilesSelected(e.target.files)}
          />
          {files.length > 0 && (
            <ul className="mt-3 space-y-1.5">
              {files.map((name, i) => (
                <li
                  key={`${name}-${i}`}
                  className="flex items-center justify-between gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-zinc-300"
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <FileText className="h-3.5 w-3.5 shrink-0 text-zinc-500" />
                    <span className="truncate">{name}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setFiles((prev) => prev.filter((_, idx) => idx !== i))}
                    className="shrink-0 text-zinc-500 hover:text-zinc-200"
                    aria-label={`Remove ${name}`}
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </Modal>
  );
}
