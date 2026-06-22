import type { Category } from '../model/types';

export function CategoryBadge({ category }: { category: Category }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-2 px-3 py-1 text-xs">
      <span>{category.icon}</span>
      <span>{category.name}</span>
    </span>
  );
}
