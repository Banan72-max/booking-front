import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { notificationApi } from '../../entities/notification';
import { useNotificationStore } from '../../app/store/notificationStore';

export function useNotifications() {
  const setNotifications = useNotificationStore((s) => s.setNotifications);
  return useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const data = await notificationApi.getMine();
      setNotifications(data);
      return data;
    },
  });
}

export function useMarkNotificationRead() {
  const qc = useQueryClient();
  const markAsRead = useNotificationStore((s) => s.markAsRead);
  return useMutation({
    mutationFn: (id: string) => notificationApi.markRead(id),
    onSuccess: (_d, id) => {
      markAsRead(id);
      qc.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
}

export function useMarkAllNotificationsRead() {
  const qc = useQueryClient();
  const markAllAsRead = useNotificationStore((s) => s.markAllAsRead);
  return useMutation({
    mutationFn: () => notificationApi.markAllRead(),
    onSuccess: () => {
      markAllAsRead();
      qc.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
}
