import { useState } from 'react';
import { useCreatePayment } from '../../features/payment-flow';
import { Button } from '../../shared/ui/Button/Button';
import { Select } from '../../shared/ui/Select/Select';
import type { Booking } from '../../entities/booking';

export function PaymentWidget({ booking }: { booking: Booking }) {
  const [method, setMethod] = useState<'CARD' | 'CASH' | 'ONLINE'>('CARD');
  const { mutate, isPending } = useCreatePayment();

  if (booking.payment) {
    return <p className="text-xs text-muted">Платёж: {booking.payment.status}</p>;
  }

  return (
    <div className="flex items-end gap-2">
      <Select
        label="Способ оплаты"
        value={method}
        onChange={(v) => setMethod(v as typeof method)}
        options={[
          { label: 'Карта', value: 'CARD' },
          { label: 'Наличные', value: 'CASH' },
          { label: 'Онлайн', value: 'ONLINE' },
        ]}
      />
      <Button size="sm" isLoading={isPending} onClick={() => mutate({ bookingId: booking.id, method })}>
        Оплатить
      </Button>
    </div>
  );
}
