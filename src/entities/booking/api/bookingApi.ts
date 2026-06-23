import { axiosInstance } from '../../../shared/api/axiosInstance';
import type { Booking } from '../model/types';

export const bookingApi = {
  getMine: () => axiosInstance.get<Booking[]>('/api/bookings').then((r) => r.data),
  getById: (id: string) => axiosInstance.get<Booking>(`/api/bookings/${id}`).then((r) => r.data),
  create: (dto: { listingId: string; dateFrom: string; dateTo: string }) =>
    axiosInstance.post<Booking>('/api/bookings', dto).then((r) => r.data),
  update: (id: string, dto: { dateFrom?: string; dateTo?: string }) =>
    axiosInstance.patch<Booking>(`/api/bookings/${id}`, dto).then((r) => r.data),
  cancel: (id: string) => axiosInstance.delete<Booking>(`/api/bookings/${id}`).then((r) => r.data),
  getAllForAdmin: () => axiosInstance.get<Booking[]>('/api/bookings/admin/all').then((r) => r.data),
  hardDelete: (id: string) => axiosInstance.delete(`/api/bookings/${id}/admin`),
};
