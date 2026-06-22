import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { reviewApi } from '../../entities/review';

export function useListingReviews(listingId: string) {
  return useQuery({
    queryKey: ['reviews', listingId],
    queryFn: () => reviewApi.getByListing(listingId),
    enabled: !!listingId,
  });
}

export function useCreateReview() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: reviewApi.create,
    onSuccess: (_data, vars) => {
      toast.success('Отзыв добавлен');
      qc.invalidateQueries({ queryKey: ['reviews', vars.listingId] });
    },
    onError: (e: any) => toast.error(e?.response?.data?.message ?? 'Не удалось оставить отзыв'),
  });
}

export function useDeleteReview() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => reviewApi.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['reviews'] }),
  });
}
