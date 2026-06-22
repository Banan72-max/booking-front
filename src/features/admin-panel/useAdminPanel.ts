import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { userApi } from '../../entities/user';
import { categoryApi } from '../../entities/category';

export function useAdminUsers(page = 1) {
  return useQuery({ queryKey: ['admin', 'users', page], queryFn: () => userApi.getMany(page) });
}

export function useAdminCategories() {
  return useQuery({ queryKey: ['admin', 'categories'], queryFn: categoryApi.getMany });
}

export function useDeleteUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => userApi.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'users'] }),
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
