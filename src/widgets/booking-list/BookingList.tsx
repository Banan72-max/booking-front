import { useMyBookings, useCancelBooking } from '../../features/booking-crud';
import { BookingCard } from '../../entities/booking';
import { Spinner } from '../../shared/ui/Spinner/Spinner';

export function BookingList() {
  const { data: bookings = [], isLoading } = useMyBookings();
  const { mutate: cancel } = useCancelBooking();

  if (isLoading) {
    return (
      <div className="flex justify-center py-6">
        <Spinner />
      </div>
    );
  }

  if (!bookings.length) {
    return <p className="text-sm text-muted">У вас пока нет бронирований.</p>;
  }

  return (
    <div className="flex flex-col gap-3">
      {bookings.map((b) => (
        <BookingCard key={b.id} booking={b} onCancel={(id) => cancel(id)} />
      ))}
    </div>
  );
}
