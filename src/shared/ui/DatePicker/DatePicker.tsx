import { cn } from '../../lib/cn';

interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
  minDate?: string;
  maxDate?: string;
  label?: string;
  disabledDates?: string[];
}

export function DatePicker({ value, onChange, minDate, maxDate, label, disabledDates = [] }: DatePickerProps) {
  const isDisabled = disabledDates.includes(value);
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-xs font-semibold text-muted">{label}</label>}
      <input
        type="date"
        value={value}
        min={minDate}
        max={maxDate}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          'rounded-lg border border-border bg-surface-2 px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-primary',
          isDisabled && 'border-destructive',
        )}
      />
      {isDisabled && <span className="text-xs text-destructive">Дата уже занята</span>}
    </div>
  );
}
