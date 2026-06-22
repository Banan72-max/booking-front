import { cn } from '../../lib/cn';

export function Spinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = { sm: 'h-4 w-4', md: 'h-6 w-6', lg: 'h-9 w-9' };
  return (
    <span
      className={cn('inline-block animate-spin rounded-full border-2 border-primary border-t-transparent', sizes[size])}
      aria-label="Загрузка"
    />
  );
}
