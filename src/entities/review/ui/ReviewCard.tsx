import type { Review } from '../model/types';
import { formatDate } from '../../../shared/lib/formatDate';

export function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="rounded-lg border border-border bg-surface-2 p-3">
      <div className="mb-1 flex items-center justify-between">
        <span className="text-sm font-semibold">{review.user?.name ?? 'Пользователь'}</span>
        <span className="text-xs text-muted">{'⭐'.repeat(review.rating)}</span>
      </div>
      <p className="text-sm text-muted">{review.comment}</p>
      <p className="mt-1 text-[11px] text-muted/70">{formatDate(review.createdAt)}</p>
    </div>
  );
}
