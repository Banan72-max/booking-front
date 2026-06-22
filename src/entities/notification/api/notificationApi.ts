import { axiosInstance } from '../../../shared/api/axiosInstance';
import type { Notification } from '../model/types';

export const notificationApi = {
  getMine: () => axiosInstance.get<Notification[]>('/api/notifications').then((r) => r.data),
  markRead: (id: string) => axiosInstance.patch<Notification>(`/api/notifications/${id}/read`).then((r) => r.data),
  markAllRead: () => axiosInstance.patch('/api/notifications/read-all'),
  remove: (id: string) => axiosInstance.delete(`/api/notifications/${id}`),
};
