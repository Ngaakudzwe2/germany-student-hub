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
  {
    id: 'demo-task-tax-id',
    status: 'not_started',
    due_date: inDays(18),
    task_templates: {
      title: 'Tax Identification Number (Steuer-ID)',
      category: 'Tax ID',
      required_documents: ['Anmeldung certificate'],
    },
  },
];

export type VenueType = 'online' | 'in_person';

export interface EventAttendee {
  name: string;
  initials: string;
  university: string;
  program: string;
}

export interface AgendaItem {
  time: string;
  item: string;
}

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
  recapPhotoIds: string[];
  attendeeCount: number;
  attendees: EventAttendee[];
  agenda: AgendaItem[];
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
    recapPhotoIds: [
      '1529156069898-49953e39b3ac',
      '1541532713592-79a0317b6b77',
      '1543269664-76bc3997d9ea',
    ],
    attendeeCount: 24,
    attendees: [
      { name: 'Lena Fischer', initials: 'LF', university: 'TU Berlin', program: 'B.A. Linguistics' },
      { name: 'Jonas Meyer', initials: 'JM', university: 'Freie Universität Berlin', program: 'M.Sc. Data Science' },
      { name: 'Aisha Khan', initials: 'AK', university: 'TU Berlin', program: 'B.Sc. Computer Science' },
      { name: 'Sofia Rossi', initials: 'SR', university: 'Humboldt University', program: 'Erasmus Exchange' },
    ],
    agenda: [
      { time: '18:00', item: 'Doors open & name-tag mingling' },
      { time: '18:30', item: 'Speed language exchange rounds' },
      { time: '19:30', item: 'Free conversation over coffee' },
      { time: '20:00', item: "Wrap-up & next week's topic" },
    ],
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
    recapPhotoIds: [
      '1541532713592-79a0317b6b77',
      '1543269664-76bc3997d9ea',
      '1524368535928-5b5e00ddc76b',
    ],
    attendeeCount: 41,
    attendees: [
      { name: 'Karan Mehta', initials: 'KM', university: 'LMU Munich', program: 'M.Sc. Business Informatics' },
      { name: 'Priya Tandon', initials: 'PT', university: 'TU Munich', program: 'M.Sc. Mechanical Engineering' },
      { name: 'Niklas Vogel', initials: 'NV', university: 'LMU Munich', program: 'B.A. Economics' },
      { name: 'Hana Choi', initials: 'HC', university: 'TU Munich', program: 'M.Sc. Computer Science' },
    ],
    agenda: [
      { time: '17:30', item: 'Registration & networking' },
      { time: '18:00', item: 'Recruiter lightning intros' },
      { time: '18:45', item: 'Open networking with recruiters' },
      { time: '20:00', item: 'Closing remarks' },
    ],
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
    recapPhotoIds: [
      '1529156069898-49953e39b3ac',
      '1541532713592-79a0317b6b77',
      '1543269664-76bc3997d9ea',
    ],
    attendeeCount: 63,
    attendees: [
      { name: 'Daniel Cruz', initials: 'DC', university: 'TU Berlin', program: 'B.Sc. Computer Science' },
      { name: 'Yuki Watanabe', initials: 'YW', university: 'Freie Universität Berlin', program: 'M.Sc. Data Science' },
      { name: 'Ravi Shah', initials: 'RS', university: 'TU Berlin', program: 'B.Sc. Electrical Engineering' },
      { name: 'Ines Lund', initials: 'IL', university: 'HTW Berlin', program: 'B.Sc. Media Informatics' },
    ],
    agenda: [
      { time: 'Sat 09:00', item: 'Kickoff & team formation' },
      { time: 'Sat 10:00', item: 'Building begins' },
      { time: 'Sun 14:00', item: 'Project demos' },
      { time: 'Sun 16:00', item: 'Judging & prizes' },
    ],
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
    recapPhotoIds: [
      '1541532713592-79a0317b6b77',
      '1543269664-76bc3997d9ea',
      '1524368535928-5b5e00ddc76b',
    ],
    attendeeCount: 11,
    attendees: [
      { name: 'Marco Bianchi', initials: 'MB', university: 'Goethe University Frankfurt', program: 'M.Sc. Finance' },
      { name: 'Olamide Taiwo', initials: 'OT', university: 'Goethe University Frankfurt', program: 'B.A. International Business' },
      { name: 'Chloe Simmons', initials: 'CS', university: 'Frankfurt School of Finance', program: 'Exchange Student' },
    ],
    agenda: [
      { time: '11:00', item: 'Meet at Bockenheimer Warte' },
      { time: '11:15', item: 'Viewing #1' },
      { time: '12:00', item: 'Viewing #2' },
      { time: '12:45', item: 'Viewing #3 & wrap-up' },
    ],
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
    recapPhotoIds: [
      '1529156069898-49953e39b3ac',
      '1541532713592-79a0317b6b77',
      '1543269664-76bc3997d9ea',
    ],
    attendeeCount: 18,
    attendees: [
      { name: 'Sofia Alvarez', initials: 'SA', university: 'University of Cologne', program: 'M.A. Media Studies' },
      { name: 'Tobias Richter', initials: 'TR', university: 'University of Cologne', program: 'B.Sc. Biology' },
      { name: 'Elena Petrova', initials: 'EP', university: 'TH Köln', program: 'M.Sc. Engineering' },
    ],
    agenda: [
      { time: '08:00', item: 'Meet at Cologne Hbf' },
      { time: '08:30', item: 'Carpool departure' },
      { time: '09:30', item: 'Hike begins' },
      { time: '15:00', item: 'Return to Cologne' },
    ],
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
    recapPhotoIds: [
      '1541532713592-79a0317b6b77',
      '1543269664-76bc3997d9ea',
      '1524368535928-5b5e00ddc76b',
    ],
    attendeeCount: 9,
    attendees: [
      { name: 'Wei Zhang', initials: 'WZ', university: 'TU Munich', program: 'M.Sc. Mathematics' },
      { name: 'Felix Lang', initials: 'FL', university: 'TU Munich', program: 'B.Sc. Physics' },
    ],
    agenda: [
      { time: '16:00', item: 'Recap of eigenvalues' },
      { time: '16:45', item: 'Practice problems' },
      { time: '17:30', item: 'Q&A and vector spaces' },
      { time: '18:00', item: 'Wrap-up' },
    ],
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
    recapPhotoIds: [
      '1529156069898-49953e39b3ac',
      '1541532713592-79a0317b6b77',
      '1543269664-76bc3997d9ea',
    ],
    attendeeCount: 35,
    attendees: [
      { name: 'Fatima Zahra', initials: 'FZ', university: 'Humboldt University', program: 'M.A. Global History' },
      { name: 'Giulia Moretti', initials: 'GM', university: 'Humboldt University', program: 'Erasmus Exchange' },
      { name: 'Ahmed Bakr', initials: 'AB', university: 'Freie Universität Berlin', program: 'M.Sc. Public Policy' },
      { name: 'Noor Khan', initials: 'NK', university: 'TU Berlin', program: 'B.Sc. Architecture' },
    ],
    agenda: [
      { time: '18:00', item: 'Dish drop-off & setup' },
      { time: '18:30', item: 'Doors open, food served' },
      { time: '19:15', item: 'Cultural show & tell' },
      { time: '21:00', item: 'Wind down' },
    ],
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
    recapPhotoIds: [
      '1541532713592-79a0317b6b77',
      '1543269664-76bc3997d9ea',
      '1524368535928-5b5e00ddc76b',
    ],
    attendeeCount: 87,
    attendees: [
      { name: 'Erik Sørensen', initials: 'ES', university: 'University of Hamburg', program: 'Erasmus Exchange' },
      { name: 'Julia Braun', initials: 'JB', university: 'University of Hamburg', program: 'B.A. Media & Communication' },
      { name: 'Leo Tan', initials: 'LT', university: 'HAW Hamburg', program: 'B.Sc. Logistics' },
      { name: 'Priya Kapoor', initials: 'PK', university: 'TU Hamburg', program: 'M.Sc. Data Engineering' },
    ],
    agenda: [
      { time: '22:00', item: 'Doors open' },
      { time: '22:30', item: 'Welcome toast' },
      { time: '23:00', item: 'DJ set begins' },
      { time: '02:00', item: 'Last call' },
    ],
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
    recapPhotoIds: [
      '1529156069898-49953e39b3ac',
      '1541532713592-79a0317b6b77',
      '1543269664-76bc3997d9ea',
    ],
    attendeeCount: 14,
    attendees: [
      { name: 'Tomás Ribeiro', initials: 'TR', university: 'University of Cologne', program: 'M.Sc. Sports Science' },
      { name: 'Max Keller', initials: 'MK', university: 'TH Köln', program: 'B.Sc. Mechanical Engineering' },
    ],
    agenda: [
      { time: '10:00', item: 'Warm-up' },
      { time: '10:15', item: 'Match 1' },
      { time: '10:45', item: 'Match 2' },
      { time: '11:15', item: 'Cool down & snacks' },
    ],
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
    recapPhotoIds: [
      '1541532713592-79a0317b6b77',
      '1543269664-76bc3997d9ea',
      '1524368535928-5b5e00ddc76b',
    ],
    attendeeCount: 22,
    attendees: [
      { name: 'Clara Schmidt', initials: 'CS', university: 'TU Berlin', program: 'B.Sc. Industrial Engineering' },
      { name: 'Tariq Bello', initials: 'TB', university: 'TU Berlin', program: 'M.Sc. Renewable Energy' },
    ],
    agenda: [
      { time: '17:00', item: 'Intro & German CV norms' },
      { time: '17:20', item: 'Live CV teardown examples' },
      { time: '17:50', item: '1-on-1 feedback rounds' },
      { time: '18:30', item: 'Q&A' },
    ],
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
  description: string;
  amenities: string[];
  landlordName: string;
  landlordEmail: string;
  landlordPhone: string;
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
    description:
      'Bright room in a friendly 3-person WG, five minutes from Hermannplatz U-Bahn. Shared kitchen renovated last year, quiet courtyard-facing window.',
    amenities: ['WiFi included', 'Furnished', 'Washing machine', 'Bike storage', 'Courtyard view'],
    landlordName: 'Julia Hoffmann',
    landlordEmail: 'julia.hoffmann@example-wg.de',
    landlordPhone: '+49 30 1234 5678',
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
    description:
      'Newly renovated studio steps from Münchner Freiheit U-Bahn. Compact kitchenette, own bathroom, elevator building.',
    amenities: ['WiFi included', 'Furnished', 'Elevator', 'Dishwasher', 'Heating included'],
    landlordName: 'Schwabing Wohnbau GmbH',
    landlordEmail: 'vermietung@schwabing-wohnbau.example',
    landlordPhone: '+49 89 9876 5432',
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
    description:
      'Artsy WG in the heart of Ehrenfeld — three creatives and a cat. Big shared kitchen, regular flat dinners, close to nightlife.',
    amenities: ['WiFi included', 'Furnished', 'Shared garden', 'Bike storage'],
    landlordName: 'Marek Nowak',
    landlordEmail: 'marek.n@example-wg.de',
    landlordPhone: '+49 221 555 0192',
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
    description:
      'Bright 1-bedroom with a small balcony overlooking a quiet street, 8-minute walk to the Main river promenade.',
    amenities: ['WiFi included', 'Balcony', 'Furnished', 'Dishwasher', 'Underfloor heating'],
    landlordName: 'Sachsenhausen Immobilien',
    landlordEmail: 'kontakt@sachsenhausen-immo.example',
    landlordPhone: '+49 69 4567 8901',
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
    description:
      'Room in a lively 4-person student WG near Sternschanze park, right by bars and the Saturday flea market.',
    amenities: ['WiFi included', 'Bike storage', 'Washing machine', 'Shared rooftop terrace'],
    landlordName: 'Finn Lindqvist',
    landlordEmail: 'finn.l@example-wg.de',
    landlordPhone: '+49 40 333 7799',
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
    description:
      'Renovated 2-room apartment on a quiet side street in Mitte, walking distance to Museum Island and Hackescher Markt.',
    amenities: ['WiFi included', 'Furnished', 'Elevator', 'Dishwasher', 'Balcony'],
    landlordName: 'Berlin Mitte Wohnungen',
    landlordEmail: 'anfragen@mitte-wohnungen.example',
    landlordPhone: '+49 30 8765 4321',
  },
];

export type JobCategory = 'werkstudent' | 'minijob';
export type GermanLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'english_only';

export interface DemoJob {
  id: string;
  title: string;
  company: string;
  companyInitial: string;
  category: JobCategory;
  city: string;
  remote: boolean;
  hourlyRateMin: number;
  hourlyRateMax: number;
  germanLevel: GermanLevel;
  hoursPerWeek: string;
  tags: string[];
  description: string;
  requirements: string[];
  postedAt: string;
  heroPhotoId: string;
}

const hoursAgoISO = (n: number) => new Date(Date.now() - n * 3_600_000).toISOString();

export const DEMO_JOBS: DemoJob[] = [
  {
    id: 'demo-job-swe-werkstudent-berlin',
    title: 'Werkstudent Software Engineer',
    company: 'TechFlow GmbH',
    companyInitial: 'TF',
    category: 'werkstudent',
    city: 'Berlin',
    remote: false,
    hourlyRateMin: 18,
    hourlyRateMax: 22,
    germanLevel: 'B1',
    hoursPerWeek: 'Up to 20 hrs/week',
    tags: ['Tech', 'React', 'Hybrid'],
    description:
      'Join our product engineering team building the next generation of our B2B SaaS platform. Work alongside senior engineers on real features shipping to production, with flexible hours around your semester schedule.',
    requirements: [
      'Enrolled at a German university (Werkstudent visa requirement)',
      'Experience with React or a similar frontend framework',
      'Conversational German (B1) for team stand-ups',
    ],
    postedAt: hoursAgoISO(3),
    heroPhotoId: '1522071820081-009f0129c71c',
  },
  {
    id: 'demo-job-barista-minijob-munich',
    title: 'Barista (Minijob)',
    company: 'Café Glück',
    companyInitial: 'CG',
    category: 'minijob',
    city: 'Munich',
    remote: false,
    hourlyRateMin: 14,
    hourlyRateMax: 14,
    germanLevel: 'A2',
    hoursPerWeek: 'Up to 10 hrs/week',
    tags: ['Hospitality', 'Weekend shifts'],
    description:
      'Cozy neighborhood café looking for a friendly barista for weekend and evening shifts. Training provided — no prior barista experience required, just a great attitude with customers.',
    requirements: [
      'Basic German for taking orders (A2)',
      'Available Saturday and Sunday mornings',
      'Food handling certificate (we can help you get one)',
    ],
    postedAt: hoursAgoISO(20),
    heroPhotoId: '1521017432531-fbd92d768814',
  },
  {
    id: 'demo-job-marketing-werkstudent-hamburg',
    title: 'Werkstudent Marketing & Social Media',
    company: 'NordMedia',
    companyInitial: 'NM',
    category: 'werkstudent',
    city: 'Hamburg',
    remote: false,
    hourlyRateMin: 16,
    hourlyRateMax: 19,
    germanLevel: 'B2',
    hoursPerWeek: 'Up to 20 hrs/week',
    tags: ['Marketing', 'Social Media'],
    description:
      'Support our content and social media team creating campaigns for regional clients. Great fit for marketing or communications students who want real portfolio work.',
    requirements: [
      'Enrolled at a German university',
      'Strong written German (B2) for client-facing copy',
      'Familiarity with Instagram/TikTok content creation',
    ],
    postedAt: hoursAgoISO(48),
    heroPhotoId: '1497366216548-37526070297c',
  },
  {
    id: 'demo-job-warehouse-minijob-cologne',
    title: 'Warehouse Assistant (Minijob)',
    company: 'LogistikPlus',
    companyInitial: 'LP',
    category: 'minijob',
    city: 'Cologne',
    remote: false,
    hourlyRateMin: 13,
    hourlyRateMax: 13,
    germanLevel: 'A1',
    hoursPerWeek: 'Up to 12 hrs/week',
    tags: ['Warehouse', 'Flexible hours'],
    description:
      'Pick-and-pack work in a modern, climate-controlled warehouse near Cologne. Flexible shift scheduling around exams — just give us your availability each week.',
    requirements: [
      'Basic German instructions understanding (A1)',
      'Able to stand and lift up to 10kg',
      'Reliable and punctual',
    ],
    postedAt: hoursAgoISO(72),
    heroPhotoId: '1553413077-190dd305871c',
  },
  {
    id: 'demo-job-data-analyst-remote',
    title: 'Werkstudent Data Analyst',
    company: 'DataWorks AG',
    companyInitial: 'DW',
    category: 'werkstudent',
    city: 'Remote',
    remote: true,
    hourlyRateMin: 20,
    hourlyRateMax: 24,
    germanLevel: 'english_only',
    hoursPerWeek: 'Up to 20 hrs/week',
    tags: ['Data', 'SQL', 'Remote', 'English Only'],
    description:
      'Fully remote role analyzing product usage data for our international engineering team. Team operates entirely in English — perfect if you\'re still building your German.',
    requirements: [
      'Enrolled at a German university',
      'Comfortable with SQL and spreadsheet analysis',
      'No German required — team language is English',
    ],
    postedAt: hoursAgoISO(6),
    heroPhotoId: '1499951360447-b19be8fe80f5',
  },
  {
    id: 'demo-job-tutor-minijob-frankfurt',
    title: 'English Tutor (Minijob)',
    company: 'LernZeit',
    companyInitial: 'LZ',
    category: 'minijob',
    city: 'Frankfurt',
    remote: false,
    hourlyRateMin: 15,
    hourlyRateMax: 18,
    germanLevel: 'english_only',
    hoursPerWeek: 'Up to 8 hrs/week',
    tags: ['Tutoring', 'Education', 'English Only'],
    description:
      'Tutor secondary school students in conversational English, 1-on-1 or small groups. Sessions held at our Frankfurt learning center or online.',
    requirements: [
      'Native or near-native English fluency',
      'No German required for this role',
      'Patient, encouraging teaching style',
    ],
    postedAt: hoursAgoISO(30),
    heroPhotoId: '1524995997946-a1c2e315a42f',
  },
  {
    id: 'demo-job-ux-werkstudent-berlin',
    title: 'Werkstudent UX/UI Designer',
    company: 'PixelForge',
    companyInitial: 'PF',
    category: 'werkstudent',
    city: 'Berlin',
    remote: false,
    hourlyRateMin: 19,
    hourlyRateMax: 23,
    germanLevel: 'B1',
    hoursPerWeek: 'Up to 20 hrs/week',
    tags: ['Design', 'Figma', 'Hybrid'],
    description:
      'Work directly with our product design lead on user research, wireframes, and high-fidelity prototypes for a fast-growing fintech app.',
    requirements: [
      'Enrolled at a German university',
      'Portfolio showing UX process work',
      'Comfortable in Figma',
    ],
    postedAt: hoursAgoISO(15),
    heroPhotoId: '1517694712202-14dd9538aa97',
  },
  {
    id: 'demo-job-delivery-minijob-munich',
    title: 'Delivery Rider (Minijob)',
    company: 'QuickBite',
    companyInitial: 'QB',
    category: 'minijob',
    city: 'Munich',
    remote: false,
    hourlyRateMin: 13,
    hourlyRateMax: 15,
    germanLevel: 'A2',
    hoursPerWeek: 'Flexible, self-scheduled',
    tags: ['Delivery', 'Flexible', 'Bike'],
    description:
      'Deliver food orders around central Munich on your own bike or e-bike (rental available). Fully flexible shift app — work as much or as little as you want.',
    requirements: [
      'Own bike or willingness to rent one',
      'Basic German for reading addresses/instructions (A2)',
      'Smartphone for the delivery app',
    ],
    postedAt: hoursAgoISO(10),
    heroPhotoId: '1571771894821-ce9b6c11b08e',
  },
  {
    id: 'demo-job-support-werkstudent-remote',
    title: 'Werkstudent Customer Support (English)',
    company: 'CloudNest',
    companyInitial: 'CN',
    category: 'werkstudent',
    city: 'Remote',
    remote: true,
    hourlyRateMin: 17,
    hourlyRateMax: 20,
    germanLevel: 'english_only',
    hoursPerWeek: 'Up to 20 hrs/week',
    tags: ['Customer Support', 'Remote', 'English Only'],
    description:
      'Help English-speaking customers via chat and email for our cloud storage product. Fully remote, async-friendly team spanning multiple time zones.',
    requirements: [
      'Enrolled at a German university',
      'Excellent written English',
      'No German required — support queue is English-only',
    ],
    postedAt: hoursAgoISO(1),
    heroPhotoId: '1532094349884-543bc11b234d',
  },
  {
    id: 'demo-job-reception-minijob-hamburg',
    title: 'Front Desk Assistant (Minijob)',
    company: 'Hotel Elbblick',
    companyInitial: 'HE',
    category: 'minijob',
    city: 'Hamburg',
    remote: false,
    hourlyRateMin: 14,
    hourlyRateMax: 14,
    germanLevel: 'B1',
    hoursPerWeek: 'Up to 10 hrs/week',
    tags: ['Hospitality', 'Reception'],
    description:
      'Weekend front desk coverage at a boutique hotel near the harbor — check-ins, guest questions, and light admin work.',
    requirements: [
      'Conversational German and English (B1+)',
      'Available Friday–Sunday',
      'Comfortable with guest-facing work',
    ],
    postedAt: hoursAgoISO(55),
    heroPhotoId: '1445019980597-93fa8acb246c',
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
