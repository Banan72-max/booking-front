import { axiosInstance } from '../../../shared/api/axiosInstance';
import type { Amenity } from '../model/types';

export const amenityApi = {
  getMany: () => axiosInstance.get<Amenity[]>('/api/amenities').then((r) => r.data),
  create: (dto: Omit<Amenity, 'id'>) => axiosInstance.post<Amenity>('/api/amenities', dto).then((r) => r.data),
  remove: (id: string) => axiosInstance.delete(`/api/amenities/${id}`),
};
