import { SearchFilters } from '../../widgets/search-filters/SearchFilters';
import { ListingList } from '../../widgets/listing-list/ListingList';

export function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-1 font-display text-2xl font-extrabold">Найдите своё идеальное место</h1>
      <p className="mb-6 text-sm text-muted">Бронируйте квартиры, дома и коворкинги онлайн.</p>
      <div className="mb-6">
        <SearchFilters />
      </div>
      <ListingList />
    </div>
  );
}
