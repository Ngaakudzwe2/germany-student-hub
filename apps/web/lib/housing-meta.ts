import {
  Building2,
  Clock,
  GraduationCap,
  Home,
  LayoutGrid,
  type LucideIcon,
  User,
  Users,
  Warehouse,
} from 'lucide-react';
import type { ListingCategory } from './demo-data';

export const CATEGORY_LABELS: Record<ListingCategory, string> = {
  student_residence: 'Student Residence (Studentenwohnheim)',
  wg_room: 'WG Room (Shared Flat)',
  studio: 'Studio / 1-Room Flat',
  apartment: 'Apartment (2+ Rooms)',
  sublet: 'Sublet / Temporary',
  private_room: 'Private Room',
  micro_coliving: 'Micro-Apartment / Co-Living',
  house: 'House / Terraced House',
};

export const CATEGORY_SHORT_LABELS: Record<ListingCategory, string> = {
  student_residence: 'Student Residence',
  wg_room: 'WG Room',
  studio: 'Studio',
  apartment: 'Apartment',
  sublet: 'Sublet',
  private_room: 'Private Room',
  micro_coliving: 'Co-Living',
  house: 'House',
};

export const CATEGORY_ICON: Record<ListingCategory, LucideIcon> = {
  student_residence: GraduationCap,
  wg_room: Users,
  studio: Home,
  apartment: Building2,
  sublet: Clock,
  private_room: User,
  micro_coliving: LayoutGrid,
  house: Warehouse,
};

export interface CategoryGroup {
  id: string;
  label: string;
  categories: ListingCategory[];
}

export const CATEGORY_GROUPS: CategoryGroup[] = [
  {
    id: 'student-budget',
    label: 'Student & Budget Housing',
    categories: ['student_residence', 'wg_room', 'studio'],
  },
  {
    id: 'apartments-private',
    label: 'Apartments & Private Housing',
    categories: ['apartment', 'sublet', 'private_room'],
  },
  {
    id: 'specialized',
    label: 'Specialized Living',
    categories: ['micro_coliving', 'house'],
  },
];
