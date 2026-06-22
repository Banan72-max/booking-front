import type { Notification } from '../model/types';
import { formatDate } from '../../../shared/lib/formatDate';
import { cn } from '../../../shared/lib/cn';

export function NotificationItem({ notification, onRead }: { notification: Notification; onRead?: (id: string) => void }) {
  return (
    <button
      onClick={() => onRead?.(notification.id)}
      className={cn(
        'w-full rounded-lg border border-border p-3 text-left text-sm transition-all',
        notification.isRead ? 'bg-surface-2 text-muted' : 'bg-primary/10 text-white',
      )}
    >
      <p>{notification.message}</p>
      <p className="mt-1 text-[11px] text-muted/70">{formatDate(notification.createdAt)}</p>
    </button>
  );
}
