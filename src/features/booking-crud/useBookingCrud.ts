import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { bookingApi } from '../../entities/booking';
import { useBookingStore } from '../../app/store/bookingStore';

export function useMyBookings() {
  const setBookings = useBookingStore((s) => s.setBookings);
  return useQuery({
    queryKey: ['bookings', 'mine'],
    queryFn: async () => {
      const data = await bookingApi.getMine();
      setBookings(data);
      return data;
    },
  });
}

export function useCreateBooking() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: bookingApi.create,
    onSuccess: () => {
      toast.success('Бронирование создано');
      qc.invalidateQueries({ queryKey: ['bookings'] });
    },
    onError: (e: any) => toast.error(e?.response?.data?.message ?? 'Не удалось создать бронирование'),
  });
}

export function useCancelBooking() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => bookingApi.cancel(id),
    onSuccess: () => {
      toast.success('Бронирование отменено');
      qc.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
}
