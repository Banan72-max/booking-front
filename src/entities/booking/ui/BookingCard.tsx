import type { Booking } from '../model/types';
import { formatDate } from '../../../shared/lib/formatDate';
import { formatPrice } from '../../../shared/lib/formatPrice';
import { Badge } from '../../../shared/ui/Badge/Badge';

export function BookingCard({ booking, onCancel }: { booking: Booking; onCancel?: (id: string) => void }) {
  return (
    <div className="rounded-xl border border-border bg-surface-2 p-4">
      <div className="mb-2 flex items-center justify-between">
        <h4 className="font-display text-sm font-bold">{booking.listing?.title ?? 'Объект'}</h4>
        <Badge status={booking.status} />
      </div>
      <p className="text-xs text-muted">
        {formatDate(booking.dateFrom)} → {formatDate(booking.dateTo)}
      </p>
      <div className="mt-2 flex items-center justify-between">
        <span className="text-sm font-semibold">{formatPrice(booking.totalPrice)}</span>
        {onCancel && booking.status === 'PENDING' && (
          <button
            onClick={() => onCancel(booking.id)}
            className="text-xs text-destructive hover:underline"
          >
            Отменить
          </button>
        )}
      </div>
    </div>
  );
}
