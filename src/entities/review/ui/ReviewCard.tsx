import type { Review } from '../model/types';
import { formatDate } from '../../../shared/lib/formatDate';

interface ReviewCardProps {
  review: Review;
  /** Передаётся, если текущий пользователь может удалить этот отзыв (автор/владелец объекта/админ). */
  onDelete?: (id: string) => void;
}

export function ReviewCard({ review, onDelete }: ReviewCardProps) {
  return (
    <div className="rounded-lg border border-border bg-surface-2 p-3">
      <div className="mb-1 flex items-center justify-between">
        <span className="text-sm font-semibold">{review.user?.name ?? 'Пользователь'}</span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted">{'⭐'.repeat(review.rating)}</span>
          {onDelete && (
            <button
              onClick={() => onDelete(review.id)}
              className="text-xs text-destructive hover:underline"
              title="Удалить отзыв"
            >
              Удалить
            </button>
          )}
        </div>
      </div>
      <p className="text-sm text-muted">{review.comment}</p>
      <p className="mt-1 text-[11px] text-muted/70">{formatDate(review.createdAt)}</p>
    </div>
  );
}
