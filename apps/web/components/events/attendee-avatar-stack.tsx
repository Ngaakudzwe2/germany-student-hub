import { Users } from 'lucide-react';
import type { EventAttendee } from '@/lib/demo-data';
import { avatarColor } from '@/lib/event-meta';

interface AttendeeAvatarStackProps {
  attendees: EventAttendee[];
  totalCount: number;
  max?: number;
}

export function AttendeeAvatarStack({ attendees, totalCount, max = 4 }: AttendeeAvatarStackProps) {
  const visible = attendees.slice(0, max);
  const extra = Math.max(totalCount - visible.length, 0);

  return (
    <div className="flex items-center gap-2">
      <div className="flex -space-x-2">
        {visible.map((attendee) => (
          <span
            key={attendee.initials}
            className={`flex h-6 w-6 items-center justify-center rounded-full border-2 border-zinc-950 text-[9px] font-semibold text-white ${avatarColor(attendee.initials)}`}
          >
            {attendee.initials}
          </span>
        ))}
      </div>
      <span className="flex items-center gap-1 text-xs text-zinc-500">
        <Users className="h-3.5 w-3.5" />
        {extra > 0 ? `+${extra} attending` : `${totalCount} attending`}
      </span>
    </div>
  );
}
