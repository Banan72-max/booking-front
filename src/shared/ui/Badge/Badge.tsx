import { cn } from '../../lib/cn';

const COLORS: Record<string, string> = {
  PENDING: 'bg-yellow-500/15 text-yellow-400',
  CONFIRMED: 'bg-green-500/15 text-green-400',
  CANCELLED: 'bg-red-500/15 text-red-400',
  COMPLETED: 'bg-blue-500/15 text-blue-400',
  FAILED: 'bg-red-500/15 text-red-400',
  REFUNDED: 'bg-blue-500/15 text-blue-400',
};

export function Badge({ status }: { status: string }) {
  return (
    <span className={cn('rounded-full px-2 py-0.5 text-[11px] font-semibold', COLORS[status] ?? 'bg-surface text-muted')}>
      {status}
    </span>
  );
}
