import { axiosInstance } from '../../../shared/api/axiosInstance';
import type { User } from '../model/types';

export const userApi = {
  getById: (id: string) => axiosInstance.get<User>(`/api/users/${id}`).then((r) => r.data),
  getMany: (page = 1, pageSize = 20) =>
    axiosInstance
      .get<{ data: User[]; total: number }>('/api/users', { params: { page, pageSize } })
      .then((r) => r.data),
  update: (id: string, dto: Partial<Pick<User, 'name' | 'avatar'>>) =>
    axiosInstance.patch<User>(`/api/users/${id}`, dto).then((r) => r.data),
  remove: (id: string) => axiosInstance.delete(`/api/users/${id}`),
  setBanned: (id: string, isBanned: boolean) =>
    axiosInstance.patch<User>(`/api/users/${id}/ban`, { isBanned }).then((r) => r.data),
};
