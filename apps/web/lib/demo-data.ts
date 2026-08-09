import type { EventTopic, TaskStatus } from '@repo/shared';

const DAY_MS = 86_400_000;
const inDays = (n: number) => new Date(Date.now() + n * DAY_MS).toISOString().slice(0, 10);

export const DEMO_USER_NAME = 'Amara Okafor';

export interface DemoTask {
  id: string;
  status: TaskStatus;
  due_date: string | null;
  task_templates: {
    title: string;
    category: string;
    required_documents: string[];
  };
}

export const DEMO_TASKS: DemoTask[] = [
  {
    id: 'demo-task-anmeldung',
    status: 'in_progress',
    due_date: inDays(2),
    task_templates: {
      title: 'City Registration (Anmeldung)',
      category: 'Anmeldung',
      required_documents: ['Passport', 'Rental contract (Wohnungsgeberbestätigung)'],
    },
  },
  {
    id: 'demo-task-health-insurance',
    status: 'completed',
    due_date: inDays(-10),
    task_templates: {
      title: 'Set Up Health Insurance',
      category: 'Health Insurance',
      required_documents: ['Passport', 'University admission letter'],
    },
  },
  {
    id: 'demo-task-blocked-account',
    status: 'pending_document',
    due_date: inDays(5),
    task_templates: {
      title: 'Open a Blocked Account',
      category: 'Blocked Account',
      required_documents: ['Passport', 'Visa application'],
    },
  },
  {
    id: 'demo-task-visa-extension',
    status: 'not_started',
    due_date: inDays(45),
    task_templates: {
      title: 'Visa Extension / Residence Permit',
      category: 'Visa Extension',
      required_documents: [
        'Passport',
        'Anmeldung certificate',
        'Health insurance proof',
        'Blocked account proof',
      ],
    },
  },
  {
    id: 'demo-task-transport',
    status: 'not_started',
    due_date: inDays(9),
    task_templates: {
      title: 'Public Transport Ticket',
      category: 'Transport',
      required_documents: ['Student ID'],
    },
  },
];

export type VenueType = 'online' | 'in_person';

export interface DemoEvent {
  id: string;
  title: string;
  description: string;
  city: string;
  universityName: string;
  topic: EventTopic;
  languages: string[];
  startsAt: string;
  emoji: string;
  coverPhotoIds: string[];
  attendeeCount: number;
  attendeeInitials: string[];
  capacity: number | null;
  hostName: string;
  hostType: string;
  venue: string;
  venueType: VenueType;
  distanceKm: number;
  brandPartner?: string;
}

export const EVENT_TOPIC_LABELS: Record<EventTopic, string> = {
  language_exchange: 'Language Exchange',
  career_networking: 'Career & Networking',
  tech: 'Tech',
  wg_search: 'WG Search',
  nightlife: 'Nightlife',
  sports: 'Sports',
  academic: 'Academic',
  cultural: 'Culture',
  other: 'Other',
};

export const DEMO_EVENTS: DemoEvent[] = [
  {
    id: 'demo-event-language-cafe',
    title: 'Berlin Language Café',
    description: 'Weekly German-English tandem meetup over coffee. All levels welcome.',
    city: 'Berlin',
    universityName: 'TU Berlin',
    topic: 'language_exchange',
    languages: ['English', 'German'],
    startsAt: inDaysISO(3),
    emoji: '☕',
    coverPhotoIds: [
      '1521017432531-fbd92d768814',
      '1543007630-9710e4a00a20',
      '1517457373958-b7bdd4587205',
    ],
    attendeeCount: 24,
    attendeeInitials: ['LF', 'JM', 'AK', 'SR'],
    capacity: 30,
    hostName: 'Lena Fischer',
    hostType: 'Hosted by Local Student',
    venue: 'Café Kotti, Kottbusser Tor',
    venueType: 'in_person',
    distanceKm: 1.2,
  },
  {
    id: 'demo-event-career-mixer',
    title: 'Tech Career Mixer',
    description: 'Meet recruiters from Munich startups and practice your elevator pitch.',
    city: 'Munich',
    universityName: 'LMU Munich',
    topic: 'career_networking',
    languages: ['English'],
    startsAt: inDaysISO(6),
    emoji: '💼',
    coverPhotoIds: [
      '1515187029135-18ee286d815b',
      '1556761175-5973dc0f32e7',
      '1573164713988-8665fc963095',
    ],
    attendeeCount: 41,
    attendeeInitials: ['KM', 'PT', 'NV', 'HC'],
    capacity: 50,
    hostName: 'Karan Mehta',
    hostType: 'Hosted by Career Services',
    venue: 'WERK1 Munich, Ohlmüllerstraße 4',
    venueType: 'in_person',
    distanceKm: 6.4,
    brandPartner: 'Career Services × LMU Alumni Network',
  },
  {
    id: 'demo-event-hackathon',
    title: 'Beginner-Friendly Hackathon',
    description: 'Build a weekend project in a team, mentors from local startups on hand.',
    city: 'Berlin',
    universityName: 'TU Berlin',
    topic: 'tech',
    languages: ['English'],
    startsAt: inDaysISO(20),
    emoji: '💻',
    coverPhotoIds: [
      '1522071820081-009f0129c71c',
      '1517694712202-14dd9538aa97',
      '1531482615713-2afd69097998',
    ],
    attendeeCount: 63,
    attendeeInitials: ['DC', 'YW', 'RS', 'IL'],
    capacity: 80,
    hostName: 'Berlin Student Devs',
    hostType: 'Hosted by Student Club',
    venue: 'Factory Berlin Görlitzer Park',
    venueType: 'in_person',
    distanceKm: 3.8,
    brandPartner: 'Berlin Student Devs × Factory Berlin',
  },
  {
    id: 'demo-event-wg-viewing',
    title: 'Group WG Viewing Day',
    description: 'Tour 3 shared flats near campus together and split viewing slots.',
    city: 'Frankfurt',
    universityName: 'Goethe University Frankfurt',
    topic: 'wg_search',
    languages: ['English', 'German'],
    startsAt: inDaysISO(5),
    emoji: '🏠',
    coverPhotoIds: [
      '1543269865-cbf427effbad',
      '1502672023488-70e25813eb80',
      '1493246507139-91e8fad9978e',
    ],
    attendeeCount: 11,
    attendeeInitials: ['MB', 'OT', 'CS'],
    capacity: 15,
    hostName: 'International Office Frankfurt',
    hostType: 'Hosted by University',
    venue: 'Meet at Bockenheimer Warte U-Bahn',
    venueType: 'in_person',
    distanceKm: 2.1,
  },
  {
    id: 'demo-event-hiking-trip',
    title: 'Eifel National Park Hiking Trip',
    description: 'Day hike with a group of international students, carpool from campus.',
    city: 'Cologne',
    universityName: 'University of Cologne',
    topic: 'sports',
    languages: ['English', 'Spanish'],
    startsAt: inDaysISO(9),
    emoji: '🥾',
    coverPhotoIds: [
      '1551632811-561732d1e306',
      '1533240332313-0db49b459ad6',
      '1521737604893-d14cc237f11d',
    ],
    attendeeCount: 18,
    attendeeInitials: ['SA', 'TR', 'EP'],
    capacity: 20,
    hostName: 'Sofia Alvarez',
    hostType: 'Hosted by Local Student',
    venue: 'Cologne Hbf, Gleis 3 meeting point',
    venueType: 'in_person',
    distanceKm: 18.5,
  },
  {
    id: 'demo-event-study-group',
    title: 'Linear Algebra Study Group',
    description: 'Exam prep session covering eigenvalues and vector spaces.',
    city: 'Munich',
    universityName: 'TU Munich',
    topic: 'academic',
    languages: ['English', 'German'],
    startsAt: inDaysISO(2),
    emoji: '📐',
    coverPhotoIds: [
      '1516450360452-9312f5e86fc7',
      '1522202176988-66273c2fd55f',
      '1523240795612-9a054b0db644',
    ],
    attendeeCount: 9,
    attendeeInitials: ['WZ', 'FL'],
    capacity: 15,
    hostName: 'Wei Zhang',
    hostType: 'Hosted by Local Student',
    venue: 'TUM Library, Room 2.104',
    venueType: 'in_person',
    distanceKm: 0.6,
  },
  {
    id: 'demo-event-cultural-potluck',
    title: 'International Potluck Night',
    description: 'Bring a dish from your home country and share your culture.',
    city: 'Berlin',
    universityName: 'Humboldt University',
    topic: 'cultural',
    languages: ['English', 'German', 'French'],
    startsAt: inDaysISO(12),
    emoji: '🍲',
    coverPhotoIds: [
      '1529543544282-ea669407fca3',
      '1529333166437-7750a6dd5a70',
      '1414235077428-338989a2e8c0',
    ],
    attendeeCount: 35,
    attendeeInitials: ['FZ', 'GM', 'AB', 'NK'],
    capacity: 40,
    hostName: 'Fatima Zahra',
    hostType: 'Hosted by Local Student',
    venue: 'Humboldt Mensa Nord',
    venueType: 'in_person',
    distanceKm: 4.3,
  },
  {
    id: 'demo-event-club-night',
    title: 'Erasmus Welcome Party',
    description: 'Kick off the semester with music, drinks, and new faces.',
    city: 'Hamburg',
    universityName: 'University of Hamburg',
    topic: 'nightlife',
    languages: ['English'],
    startsAt: inDaysISO(4),
    emoji: '🎉',
    coverPhotoIds: [
      '1470229722913-7c0e2dbbafd3',
      '1470225620780-dba8ba36b745',
      '1533174072545-7a4b6ad7a6c3',
    ],
    attendeeCount: 87,
    attendeeInitials: ['ES', 'JB', 'LT', 'PK'],
    capacity: 120,
    hostName: 'Erasmus Student Network Hamburg',
    hostType: 'Hosted by Student Network',
    venue: 'Uebel & Gefährlich, Feldstraße',
    venueType: 'in_person',
    distanceKm: 5.9,
    brandPartner: 'Erasmus Student Network × Uebel & Gefährlich',
  },
  {
    id: 'demo-event-football',
    title: 'Sunday Five-a-Side Football',
    description: 'Casual weekly kickabout, all skill levels, boots not required.',
    city: 'Cologne',
    universityName: 'University of Cologne',
    topic: 'sports',
    languages: ['English', 'German'],
    startsAt: inDaysISO(1),
    emoji: '⚽',
    coverPhotoIds: [
      '1431324155629-1a6deb1dec8d',
      '1553778263-73a83bab9b0c',
      '1552667466-07770ae110d0',
    ],
    attendeeCount: 14,
    attendeeInitials: ['TR', 'MK'],
    capacity: 20,
    hostName: 'Tomás Ribeiro',
    hostType: 'Hosted by Local Student',
    venue: 'Kleiner Grüngürtel Sportplatz',
    venueType: 'in_person',
    distanceKm: 2.9,
  },
  {
    id: 'demo-event-resume-workshop',
    title: 'German CV & Cover Letter Workshop',
    description: 'Learn what German recruiters actually look for, bring your draft CV.',
    city: 'Berlin',
    universityName: 'TU Berlin',
    topic: 'career_networking',
    languages: ['English', 'German'],
    startsAt: inDaysISO(15),
    emoji: '📄',
    coverPhotoIds: [
      '1524995997946-a1c2e315a42f',
      '1524178232363-1fb2b075b655',
      '1475721027785-f74eccf877e2',
    ],
    attendeeCount: 22,
    attendeeInitials: ['CS', 'TB'],
    capacity: 25,
    hostName: 'Career Services TU Berlin',
    hostType: 'Hosted by University',
    venue: 'Online via Zoom',
    venueType: 'online',
    distanceKm: 1.7,
  },
];

function inDaysISO(n: number) {
  return new Date(Date.now() + n * DAY_MS).toISOString();
}

const minutesAgoISO = (n: number) => new Date(Date.now() - n * 60_000).toISOString();

export type ListingType = 'wg_room' | 'apartment';

export interface DemoListing {
  id: string;
  title: string;
  type: ListingType;
  city: string;
  district: string;
  rentEur: number;
  roomSizeSqm: number;
  moveInDate: string;
  coverPhotoId: string;
  listedAt: string;
  verified: boolean;
}

export const DEMO_LISTINGS: DemoListing[] = [
  {
    id: 'demo-listing-neukoelln-wg',
    title: 'Sunny WG room near Hermannplatz',
    type: 'wg_room',
    city: 'Berlin',
    district: 'Neukölln',
    rentEur: 620,
    roomSizeSqm: 16,
    moveInDate: inDays(14),
    coverPhotoId: '1484154218962-a197022b5858',
    listedAt: minutesAgoISO(6),
    verified: true,
  },
  {
    id: 'demo-listing-schwabing-studio',
    title: 'Compact studio in Schwabing',
    type: 'apartment',
    city: 'Munich',
    district: 'Schwabing',
    rentEur: 980,
    roomSizeSqm: 28,
    moveInDate: inDays(30),
    coverPhotoId: '1502672260266-1c1ef2d93688',
    listedAt: minutesAgoISO(42),
    verified: true,
  },
  {
    id: 'demo-listing-ehrenfeld-wg',
    title: 'Creative WG in Ehrenfeld, 4 flatmates',
    type: 'wg_room',
    city: 'Cologne',
    district: 'Ehrenfeld',
    rentEur: 540,
    roomSizeSqm: 14,
    moveInDate: inDays(7),
    coverPhotoId: '1560448204-e02f11c3d0e2',
    listedAt: minutesAgoISO(130),
    verified: false,
  },
  {
    id: 'demo-listing-sachsenhausen-apt',
    title: '1-bedroom apartment near the Main river',
    type: 'apartment',
    city: 'Frankfurt',
    district: 'Sachsenhausen',
    rentEur: 1150,
    roomSizeSqm: 42,
    moveInDate: inDays(21),
    coverPhotoId: '1493809842364-78817add7ffb',
    listedAt: minutesAgoISO(300),
    verified: true,
  },
  {
    id: 'demo-listing-sternschanze-wg',
    title: 'WG room in Sternschanze, bike storage included',
    type: 'wg_room',
    city: 'Hamburg',
    district: 'Sternschanze',
    rentEur: 590,
    roomSizeSqm: 15,
    moveInDate: inDays(10),
    coverPhotoId: '1493663284031-b7e3aefcae8e',
    listedAt: minutesAgoISO(900),
    verified: false,
  },
  {
    id: 'demo-listing-mitte-apt',
    title: 'Renovated 2-room apartment in Mitte',
    type: 'apartment',
    city: 'Berlin',
    district: 'Mitte',
    rentEur: 1350,
    roomSizeSqm: 55,
    moveInDate: inDays(45),
    coverPhotoId: '1522708323590-d24dbb6b0267',
    listedAt: minutesAgoISO(1440),
    verified: true,
  },
];

export interface DemoGuide {
  id: string;
  title: string;
  summary: string;
  items: string[];
}

export const DEMO_ACCOMMODATION_GUIDES: DemoGuide[] = [
  {
    id: 'wg-profile',
    title: 'WG Application Profile Checklist',
    summary: 'What to include so your shared-flat (WG) application gets noticed.',
    items: [
      'A short intro paragraph: who you are, your program, and move-in date',
      'Proof of enrollment or admission letter',
      'Proof of income or blocked account statement',
      'SCHUFA credit report (or explain why you don’t have one yet as a new arrival)',
      'A friendly photo — WGs often screen for "who would I want as a flatmate"',
    ],
  },
  {
    id: 'schufa-explainer',
    title: 'What Is a SCHUFA and Do You Need One?',
    summary: 'Germany’s credit-check system, explained for newcomers with no credit history.',
    items: [
      'SCHUFA is a credit score report landlords use to assess financial reliability',
      'New arrivals usually don’t have one yet — that’s normal, say so upfront',
      'A blocked account statement or guarantor letter can substitute for it',
      'You can request a free SCHUFA-Bonitätsauskunft once you have a German address',
    ],
  },
  {
    id: 'proof-of-income',
    title: 'Proof of Income Templates',
    summary: 'Documents landlords accept as evidence you can pay rent.',
    items: [
      'Blocked account (Sperrkonto) confirmation letter',
      'Scholarship or stipend award letter',
      'Parental guarantee letter (Bürgschaft) with a notarized income statement',
      'Employer contract, if you already have a part-time job offer',
    ],
  },
];

export interface ScamFlag {
  id: string;
  title: string;
  description: string;
}

export const SCAM_RED_FLAGS: ScamFlag[] = [
  {
    id: 'deposit-before-viewing',
    title: 'Deposit before viewing',
    description:
      'Never wire a deposit before viewing the apartment in person or via a live video call.',
  },
  {
    id: 'landlord-abroad',
    title: '"Landlord is abroad"',
    description: 'Be wary of landlords who are conveniently unreachable in person and can’t meet.',
  },
  {
    id: 'unverifiable-address',
    title: 'Unverifiable address',
    description:
      'Verify the address exists and matches the building in photos — a reverse image search helps.',
  },
  {
    id: 'unusual-payment',
    title: 'Unusual payment methods',
    description: 'Legitimate landlords don’t ask for payment via gift cards, crypto, or wire-only.',
  },
  {
    id: 'no-wohnungsgeberbestaetigung',
    title: 'No Wohnungsgeberbestätigung',
    description:
      'A real landlord will provide this confirmation — you need it for your Anmeldung anyway.',
  },
  {
    id: 'below-market-price',
    title: 'Price far below market rate',
    description: 'Too-good-to-be-true rent in a popular area is the most common scam bait.',
  },
];
