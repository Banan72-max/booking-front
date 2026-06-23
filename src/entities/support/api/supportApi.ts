import { axiosInstance } from '../../../shared/api/axiosInstance';
import type { SupportMessage } from '../model/types';

export const supportApi = {
  getThread: (userId?: string) =>
    axiosInstance.get<SupportMessage[]>('/api/support', { params: userId ? { userId } : undefined }).then((r) => r.data),
  getThreads: () => axiosInstance.get<SupportMessage[]>('/api/support/threads').then((r) => r.data),
  send: (dto: { message: string; userId?: string }) =>
    axiosInstance.post<SupportMessage>('/api/support', dto).then((r) => r.data),
};
