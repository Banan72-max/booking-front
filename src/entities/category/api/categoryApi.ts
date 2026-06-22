import { axiosInstance } from '../../../shared/api/axiosInstance';
import type { Category } from '../model/types';

export const categoryApi = {
  getMany: () => axiosInstance.get<Category[]>('/api/categories').then((r) => r.data),
  create: (dto: Omit<Category, 'id'>) => axiosInstance.post<Category>('/api/categories', dto).then((r) => r.data),
  update: (id: string, dto: Partial<Omit<Category, 'id'>>) =>
    axiosInstance.patch<Category>(`/api/categories/${id}`, dto).then((r) => r.data),
  remove: (id: string) => axiosInstance.delete(`/api/categories/${id}`),
};
