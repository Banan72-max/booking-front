import { useListingStore } from '../../app/store/listingStore';
import { useCategories } from '../../features/search-filter';
import { Select } from '../../shared/ui/Select/Select';
import { Input } from '../../shared/ui/Input/Input';
import { Button } from '../../shared/ui/Button/Button';

export function SearchFilters() {
  const { filters, setFilter, resetFilters } = useListingStore();
  const { data: categories = [] } = useCategories();

  return (
    <div className="flex flex-wrap items-end gap-3 rounded-xl border border-border bg-surface-2 p-4">
      <Select
        label="Категория"
        placeholder="Все категории"
        value={filters.categoryId ?? ''}
        onChange={(v) => setFilter('categoryId', v || undefined)}
        options={categories.map((c) => ({ label: `${c.icon} ${c.name}`, value: c.id }))}
      />
      <Input
        label="Цена до"
        type="number"
        value={filters.priceMax ?? ''}
        onChange={(e) => setFilter('priceMax', e.target.value ? Number(e.target.value) : undefined)}
      />
      <Input
        label="Заезд"
        type="date"
        value={filters.dateFrom ?? ''}
        onChange={(e) => setFilter('dateFrom', e.target.value || undefined)}
      />
      <Input
        label="Выезд"
        type="date"
        value={filters.dateTo ?? ''}
        onChange={(e) => setFilter('dateTo', e.target.value || undefined)}
      />
      <Button variant="ghost" size="sm" onClick={resetFilters}>
        Сбросить
      </Button>
    </div>
  );
}
