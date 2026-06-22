import { axiosInstance } from '../../../shared/api/axiosInstance';
import type { Payment } from '../model/types';

export const paymentApi = {
  getById: (id: string) => axiosInstance.get<Payment>(`/api/payments/${id}`).then((r) => r.data),
  create: (dto: { bookingId: string; method: 'CARD' | 'CASH' | 'ONLINE' }) =>
    axiosInstance.post<Payment>('/api/payments', dto).then((r) => r.data),
  updateStatus: (id: string, status: Payment['status']) =>
    axiosInstance.patch<Payment>(`/api/payments/${id}/status`, { status }).then((r) => r.data),
};
