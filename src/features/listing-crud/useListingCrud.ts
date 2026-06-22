import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { listingApi } from '../../entities/listing';

export function useCreateListing() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: listingApi.create,
    onSuccess: () => {
      toast.success('Объект создан');
      qc.invalidateQueries({ queryKey: ['listings'] });
    },
  });
}

export function useUpdateListing() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: Parameters<typeof listingApi.update>[1] }) =>
      listingApi.update(id, dto),
    onSuccess: () => {
      toast.success('Объект обновлён');
      qc.invalidateQueries({ queryKey: ['listings'] });
    },
  });
}

export function useDeleteListing() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => listingApi.remove(id),
    onSuccess: () => {
      toast.success('Объект деактивирован');
      qc.invalidateQueries({ queryKey: ['listings'] });
    },
  });
}
