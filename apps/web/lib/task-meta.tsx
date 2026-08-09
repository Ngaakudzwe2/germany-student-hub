import {
  Building2,
  CheckCircle2,
  Circle,
  Clock,
  FileWarning,
  HeartPulse,
  Landmark,
  Stamp,
  TrainFront,
  type LucideIcon,
} from 'lucide-react';
import type { TaskStatus } from '@repo/shared';

export const CATEGORY_ICON: Record<string, LucideIcon> = {
  Anmeldung: Building2,
  'Health Insurance': HeartPulse,
  'Blocked Account': Landmark,
  'Visa Extension': Stamp,
  Transport: TrainFront,
};

export const DEFAULT_CATEGORY_ICON: LucideIcon = Circle;

interface StatusMeta {
  label: string;
  icon: LucideIcon;
  text: string;
  bg: string;
  border: string;
}

export const STATUS_META: Record<TaskStatus, StatusMeta> = {
  not_started: {
    label: 'Not Started',
    icon: Circle,
    text: 'text-zinc-400',
    bg: 'bg-white/5',
    border: 'border-white/10',
  },
  in_progress: {
    label: 'In Progress',
    icon: Clock,
    text: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
  },
  pending_document: {
    label: 'Pending Document',
    icon: FileWarning,
    text: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
  },
  completed: {
    label: 'Completed',
    icon: CheckCircle2,
    text: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
  },
};

export const STATUS_ORDER: TaskStatus[] = [
  'not_started',
  'in_progress',
  'pending_document',
  'completed',
];

export interface OfficialLink {
  label: string;
  href: string;
}

export interface TaskDetail {
  location: string;
  steps: string[];
  phrases: { de: string; en: string }[];
  appointmentLabel: string;
  officialLinks: OfficialLink[];
}

const TASK_DETAILS: Record<string, TaskDetail> = {
  Anmeldung: {
    location: "Bürgeramt (Citizens' Registration Office)",
    steps: [
      "Book an appointment online at your local Bürgeramt — slots fill up fast, so book as soon as you have an address.",
      'Gather your passport, rental contract, and Wohnungsgeberbestätigung (landlord confirmation).',
      'Attend the appointment and receive your Meldebescheinigung (registration certificate).',
      "Keep the certificate safe — you'll need it for your bank account, visa, and phone contract.",
    ],
    phrases: [
      { de: 'Ich möchte mich anmelden.', en: 'I would like to register my address.' },
      { de: 'Haben Sie einen freien Termin?', en: 'Do you have an available appointment?' },
      { de: 'Hier ist meine Wohnungsgeberbestätigung.', en: 'Here is my landlord confirmation.' },
    ],
    appointmentLabel: 'Book your city registration appointment',
    officialLinks: [
      { label: 'Berlin — service.berlin.de', href: 'https://service.berlin.de/dienstleistung/120686/' },
      {
        label: 'Munich — stadt.muenchen.de',
        href: 'https://stadt.muenchen.de/infos/anmeldung-des-wohnsitzes.html',
      },
      { label: 'Hamburg — Serviceportal', href: 'https://serviceportal.hamburg.de/HamburgGateway/' },
    ],
  },
  'Health Insurance': {
    location: 'Public provider (TK, AOK, Barmer) or a private insurer',
    steps: [
      'Decide between public (gesetzlich) and private (privat) insurance — most students choose public.',
      'Apply online or in a branch with your passport and university admission letter.',
      'Receive your insurance confirmation (Versicherungsbescheinigung) — required for enrollment.',
      'Your health insurance card (Gesundheitskarte) arrives by mail within a few weeks.',
    ],
    phrases: [
      { de: 'Ich brauche eine Krankenversicherung.', en: 'I need health insurance.' },
      { de: 'Ich bin Student/Studentin.', en: 'I am a student.' },
    ],
    appointmentLabel: 'Compare insurance providers',
    officialLinks: [
      { label: 'TK (Techniker Krankenkasse)', href: 'https://www.tk.de/' },
      { label: 'Barmer', href: 'https://www.barmer.de/' },
      { label: 'AOK', href: 'https://www.aok.de/' },
    ],
  },
  'Blocked Account': {
    location: 'Online via a Sperrkonto provider (Expatrio, Fintiba, Deutsche Bank)',
    steps: [
      'Open a blocked account online before or shortly after arrival.',
      "Transfer the required annual amount (check the current threshold on the provider's site).",
      'Download the blocked account confirmation letter for your visa file.',
      'Once your visa is approved, a monthly amount unlocks automatically for withdrawal.',
    ],
    phrases: [{ de: 'Ich habe ein Sperrkonto eröffnet.', en: 'I have opened a blocked account.' }],
    appointmentLabel: 'Open a blocked account',
    officialLinks: [
      { label: 'Fintiba', href: 'https://www.fintiba.com/' },
      { label: 'Expatrio', href: 'https://www.expatrio.com/' },
    ],
  },
  'Visa Extension': {
    location: "Ausländerbehörde / Landesamt für Einwanderung (Immigration Office)",
    steps: [
      'Book your appointment 6–8 weeks before your current visa expires — slots are limited.',
      'Prepare your passport, Anmeldung certificate, health insurance proof, and blocked account statement.',
      'Attend the appointment and pay the residence permit fee.',
      'Collect your eAT card (electronic residence permit) when it arrives by mail.',
    ],
    phrases: [
      {
        de: 'Ich möchte meinen Aufenthaltstitel verlängern.',
        en: 'I would like to extend my residence permit.',
      },
      { de: 'Wann ist mein Termin?', en: 'When is my appointment?' },
    ],
    appointmentLabel: 'Book your residence permit appointment',
    officialLinks: [
      { label: 'Berlin — Landesamt für Einwanderung', href: 'https://www.berlin.de/einwanderung/' },
    ],
  },
  Transport: {
    location: 'University student services office or the DB/transit app',
    steps: [
      'Check whether your semester fee already includes a Semesterticket.',
      'If not, buy a Deutschlandticket or regional pass through the transit app.',
      'Carry your student ID — some tickets require it for validation on the spot.',
    ],
    phrases: [{ de: 'Ein Semesterticket, bitte.', en: 'A semester ticket, please.' }],
    appointmentLabel: 'Buy transport ticket',
    officialLinks: [],
  },
};

const FALLBACK_DETAIL: TaskDetail = {
  location: 'Local authority office',
  steps: ['Detailed instructions for this task are coming soon.'],
  phrases: [],
  appointmentLabel: 'Find appointment',
  officialLinks: [],
};

export function getTaskDetail(category: string): TaskDetail {
  return TASK_DETAILS[category] ?? FALLBACK_DETAIL;
}
