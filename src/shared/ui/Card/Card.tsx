import { HTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

export function Card({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-xl border border-border bg-surface-2 p-4 transition-all duration-150 hover:border-primary/50',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
