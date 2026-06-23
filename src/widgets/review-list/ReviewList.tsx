import { useState, FormEvent } from 'react';
import { useListingReviews, useCreateReview, useDeleteReview } from '../../features/review-crud';
import { useAuthStore } from '../../app/store/authStore';
import { ReviewCard } from '../../entities/review';
import { Button } from '../../shared/ui/Button/Button';

export function ReviewList({ listingId, listingOwnerId }: { listingId: string; listingOwnerId?: string }) {
  const { data: reviews = [] } = useListingReviews(listingId);
  const { user, isAuthenticated } = useAuthStore();
  const { mutate, isPending } = useCreateReview();
  const { mutate: deleteReview } = useDeleteReview();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    mutate({ listingId, rating, comment });
    setComment('');
  }

  const canDelete = (authorId: string) =>
    !!user && (user.id === authorId || user.id === listingOwnerId || user.role === 'ADMIN');

  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-display text-sm font-bold">Отзывы ({reviews.length})</h3>
      {reviews.map((r) => (
        <ReviewCard key={r.id} review={r} onDelete={canDelete(r.userId) ? () => deleteReview(r.id) : undefined} />
      ))}
      {isAuthenticated && (
        <form onSubmit={onSubmit} className="flex flex-col gap-2 rounded-lg border border-border bg-surface-2 p-3">
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="rounded-md border border-border bg-surface px-2 py-1 text-sm"
          >
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>
                {'⭐'.repeat(n)}
              </option>
            ))}
          </select>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Ваш отзыв..."
            required
            className="rounded-md border border-border bg-surface px-2 py-1 text-sm"
          />
          <Button type="submit" size="sm" isLoading={isPending}>
            Оставить отзыв
          </Button>
        </form>
      )}
    </div>
  );
}
