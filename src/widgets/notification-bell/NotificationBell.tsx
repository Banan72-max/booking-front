import { useState } from 'react';
import { useNotifications, useMarkNotificationRead, useMarkAllNotificationsRead } from '../../features/notification-read';
import { useNotificationStore } from '../../app/store/notificationStore';
import { NotificationItem } from '../../entities/notification';
import { Button } from '../../shared/ui/Button/Button';

export function NotificationBell() {
  const [open, setOpen] = useState(false);
  useNotifications();
  const { notifications, unreadCount } = useNotificationStore();
  const { mutate: markRead } = useMarkNotificationRead();
  const { mutate: markAllRead } = useMarkAllNotificationsRead();

  return (
    <div className="relative">
      <button onClick={() => setOpen((o) => !o)} className="relative text-lg">
        🔔
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px]">
            {unreadCount}
          </span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 z-30 mt-2 w-72 rounded-xl border border-border bg-surface-2 p-3 shadow-xl">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-semibold text-muted">Уведомления</span>
            <Button variant="ghost" size="sm" onClick={() => markAllRead()}>
              Прочитать всё
            </Button>
          </div>
          <div className="flex max-h-80 flex-col gap-2 overflow-y-auto">
            {notifications.length === 0 && <p className="text-xs text-muted">Пусто</p>}
            {notifications.map((n) => (
              <NotificationItem key={n.id} notification={n} onRead={(id) => markRead(id)} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
