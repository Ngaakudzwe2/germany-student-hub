export type TaskStatus =
  | 'not_started'
  | 'in_progress'
  | 'pending_document'
  | 'completed';

export interface TaskTemplate {
  id: string;
  category: string;
  title: string;
  description: string | null;
  typicalDeadlineDaysAfterArrival: number | null;
  orderIndex: number;
  requiredDocuments: string[];
}

export interface UserTask {
  id: string;
  userId: string;
  templateId: string;
  status: TaskStatus;
  dueDate: string | null;
  completedAt: string | null;
  notes: string | null;
}

export type NotificationType = 'task_deadline' | 'event_reminder' | 'new_message';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  body: string | null;
  relatedId: string | null;
  readAt: string | null;
  createdAt: string;
}

export type EventTopic =
  | 'language_exchange'
  | 'career_networking'
  | 'tech'
  | 'wg_search'
  | 'nightlife'
  | 'sports'
  | 'academic'
  | 'cultural'
  | 'other';

export interface EventSummary {
  id: string;
  title: string;
  city: string;
  universityId: string | null;
  topic: EventTopic;
  languages: string[];
  startsAt: string;
  coverImageUrl: string | null;
  attendeeCount: number;
  capacity: number | null;
  hostId: string;
}
