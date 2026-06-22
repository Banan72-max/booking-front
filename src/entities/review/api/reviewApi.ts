import { axiosInstance } from '../../../shared/api/axiosInstance';
import type { Review } from '../model/types';

export const reviewApi = {
  getByListing: (listingId: string) =>
    axiosInstance.get<Review[]>('/api/reviews', { params: { listingId } }).then((r) => r.data),
  create: (dto: { listingId: string; rating: number; comment: string }) =>
    axiosInstance.post<Review>('/api/reviews', dto).then((r) => r.data),
  update: (id: string, dto: Partial<{ rating: number; comment: string }>) =>
    axiosInstance.patch<Review>(`/api/reviews/${id}`, dto).then((r) => r.data),
  remove: (id: string) => axiosInstance.delete(`/api/reviews/${id}`),
};
