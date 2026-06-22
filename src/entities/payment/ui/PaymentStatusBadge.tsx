import { Badge } from '../../../shared/ui/Badge/Badge';
import type { Payment } from '../model/types';

export function PaymentStatusBadge({ payment }: { payment: Payment }) {
  return <Badge status={payment.status} />;
}
