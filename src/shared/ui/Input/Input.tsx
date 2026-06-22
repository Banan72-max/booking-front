import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ label, error, className, ...props }, ref) => {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-xs font-semibold text-muted">{label}</label>}
      <input
        ref={ref}
        className={cn(
          'rounded-lg border bg-surface-2 px-3 py-2 text-sm text-white outline-none transition-all placeholder:text-muted focus:ring-2 focus:ring-primary',
          error ? 'border-destructive' : 'border-border',
          className,
        )}
        {...props}
      />
      {error && <span className="text-xs text-destructive">{error}</span>}
    </div>
  );
});
Input.displayName = 'Input';
