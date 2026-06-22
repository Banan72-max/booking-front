import { useState } from 'react';
import { cn } from '../../lib/cn';

export interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  error?: string;
  placeholder?: string;
}

export function Select({ options, value, onChange, label, error, placeholder }: SelectProps) {
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.value === value);

  return (
    <div className="relative flex flex-col gap-1">
      {label && <label className="text-xs font-semibold text-muted">{label}</label>}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          'flex items-center justify-between rounded-lg border bg-surface-2 px-3 py-2 text-left text-sm outline-none transition-all focus:ring-2 focus:ring-primary',
          error ? 'border-destructive' : 'border-border',
        )}
      >
        <span className={selected ? 'text-white' : 'text-muted'}>{selected?.label ?? placeholder ?? 'Выберите...'}</span>
        <span className="text-muted">▾</span>
      </button>
      {open && (
        <ul className="absolute z-10 mt-[60px] w-full overflow-hidden rounded-lg border border-border bg-surface-2 shadow-lg">
          {options.map((o) => (
            <li key={o.value}>
              <button
                type="button"
                onClick={() => {
                  onChange(o.value);
                  setOpen(false);
                }}
                className="block w-full px-3 py-2 text-left text-sm hover:bg-primary/10"
              >
                {o.label}
              </button>
            </li>
          ))}
        </ul>
      )}
      {error && <span className="text-xs text-destructive">{error}</span>}
    </div>
  );
}
