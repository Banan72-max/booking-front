import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { userApi } from '../../entities/user';
import { categoryApi } from '../../entities/category';
import { listingApi } from '../../entities/listing';
import { bookingApi } from '../../entities/booking';

export function useAdminUsers(page = 1) {
  return useQuery({ queryKey: ['admin', 'users', page], queryFn: () => userApi.getMany(page) });
}

export function useAdminCategories() {
  return useQuery({ queryKey: ['admin', 'categories'], queryFn: categoryApi.getMany });
}

export function useBanUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, isBanned }: { id: string; isBanned: boolean }) => userApi.setBanned(id, isBanned),
    onSuccess: (_data, vars) => {
      toast.success(vars.isBanned ? 'Пользователь забанен' : 'Пользователь разбанен');
      qc.invalidateQueries({ queryKey: ['admin', 'users'] });
    },
    onError: (e: any) => toast.error(e?.response?.data?.message ?? 'Не удалось изменить статус'),
  });
}

export function useCreateCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: categoryApi.create,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'categories'] }),
  });
}

export function useDeleteCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => categoryApi.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'categories'] }),
  });
}

export function useAdminListings(page = 1) {
  return useQuery({
    queryKey: ['admin', 'listings', page],
    queryFn: () => listingApi.getMany({}, page, 50),
  });
}

export function useDeactivateListing() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => listingApi.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'listings'] }),
  });
}

export function useAdminBookings() {
  return useQuery({ queryKey: ['admin', 'bookings'], queryFn: bookingApi.getAllForAdmin });
}

export function useHardDeleteBooking() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => bookingApi.hardDelete(id),
    onSuccess: () => {
      toast.success('Бронирование удалено');
      qc.invalidateQueries({ queryKey: ['admin', 'bookings'] });
    },
  });
}
