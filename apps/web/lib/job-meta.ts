import type { GermanLevel, JobCategory } from './demo-data';

export const JOB_CATEGORY_LABELS: Record<JobCategory, string> = {
  werkstudent: 'Werkstudent',
  minijob: 'Minijob (538€-Job)',
};

export const GERMAN_LEVEL_LABELS: Record<GermanLevel, string> = {
  A1: 'A1',
  A2: 'A2',
  B1: 'B1',
  B2: 'B2',
  C1: 'C1',
  english_only: 'English Only',
};

export interface JobPortalLink {
  label: string;
  href: string;
}

export const JOB_PORTAL_LINKS: JobPortalLink[] = [
  { label: 'StepStone Student', href: 'https://www.stepstone.de/' },
  { label: 'Zenjob', href: 'https://www.zenjob.com/de/' },
  { label: 'Indeed Germany', href: 'https://de.indeed.com/' },
  { label: 'Bundesagentur für Arbeit', href: 'https://www.arbeitsagentur.de/jobsuche/' },
];
