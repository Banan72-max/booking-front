import { useState } from 'react';
import { useAuthStore } from '../../app/store/authStore';
import { useCreateBooking } from '../../features/booking-crud';
import { DatePicker } from '../../shared/ui/DatePicker/DatePicker';
import { Button } from '../../shared/ui/Button/Button';
import type { Listing } from '../../entities/listing';

export function BookingForm({ listing }: { listing: Listing }) {
  const { isAuthenticated, user } = useAuthStore();
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const { mutate, isPending } = useCreateBooking();

  const isOwnListing = user?.id === listing.ownerId;

  if (isOwnListing) {
    return <p className="text-sm text-muted">Нельзя забронировать собственный объект.</p>;
  }

  if (!isAuthenticated) {
    return <p className="text-sm text-muted">Войдите, чтобы забронировать этот объект.</p>;
  }

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface-2 p-4">
      <DatePicker label="Заезд" value={dateFrom} onChange={setDateFrom} minDate={new Date().toISOString().slice(0, 10)} />
      <DatePicker label="Выезд" value={dateTo} onChange={setDateTo} minDate={dateFrom} />
      <Button
        isLoading={isPending}
        disabled={!dateFrom || !dateTo}
        onClick={() => mutate({ listingId: listing.id, dateFrom, dateTo })}
      >
        Забронировать
      </Button>
    </div>
  );
}
