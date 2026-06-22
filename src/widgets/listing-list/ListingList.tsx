import { useFilteredListings } from '../../features/search-filter';
import { ListingCard } from '../../entities/listing';
import { Spinner } from '../../shared/ui/Spinner/Spinner';

export function ListingList() {
  const { data, isLoading } = useFilteredListings();

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!data?.data.length) {
    return <p className="py-10 text-center text-sm text-muted">Объекты не найдены</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {data.data.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
}
