import { axiosInstance } from '../../../shared/api/axiosInstance';
import type { Listing, ListingFilters } from '../model/types';

type ListingDto = { title: string; description: string; price: number; categoryId: string; photoUrl?: string };

export const listingApi = {
  getMany: (filters: ListingFilters, page = 1, pageSize = 12) =>
    axiosInstance
      .get<{ data: Listing[]; total: number }>('/api/listings', { params: { ...filters, page, pageSize } })
      .then((r) => r.data),
  getById: (id: string) => axiosInstance.get<Listing>(`/api/listings/${id}`).then((r) => r.data),
  getMine: () => axiosInstance.get<Listing[]>('/api/listings/mine').then((r) => r.data),
  create: (dto: ListingDto) => axiosInstance.post<Listing>('/api/listings', dto).then((r) => r.data),
  update: (id: string, dto: Partial<ListingDto>) =>
    axiosInstance.patch<Listing>(`/api/listings/${id}`, dto).then((r) => r.data),
  remove: (id: string) => axiosInstance.delete(`/api/listings/${id}`),
};
