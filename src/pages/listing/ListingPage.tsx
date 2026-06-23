import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { listingApi } from '../../entities/listing';
import { BookingForm } from '../../widgets/booking-form/BookingForm';
import { ReviewList } from '../../widgets/review-list/ReviewList';
import { AmenityTag } from '../../entities/amenity';
import { formatPrice } from '../../shared/lib/formatPrice';
import { Spinner } from '../../shared/ui/Spinner/Spinner';

export function ListingPage() {
  const { id } = useParams<{ id: string }>();
  const { data: listing, isLoading } = useQuery({
    queryKey: ['listing', id],
    queryFn: () => listingApi.getById(id!),
    enabled: !!id,
  });

  if (isLoading || !listing) {
    return (
      <div className="flex justify-center py-16">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-6 px-4 py-8 lg:grid-cols-[2fr_1fr]">
      <div>
        {listing.photoUrl && (
          <img src={listing.photoUrl} alt={listing.title} className="mb-4 max-h-72 w-full rounded-xl object-cover" />
        )}
        <h1 className="mb-2 font-display text-2xl font-extrabold">{listing.title}</h1>
        <p className="mb-3 text-sm text-muted">{listing.description}</p>
        <div className="mb-4 flex flex-wrap gap-2">
          {listing.amenities?.map((a) => <AmenityTag key={a.amenity.id} amenity={a.amenity} />)}
        </div>
        <p className="mb-6 font-display text-xl font-bold text-primary-foreground">{formatPrice(listing.price)} / ночь</p>
        <ReviewList listingId={listing.id} listingOwnerId={listing.ownerId} />
      </div>
      <div>
        <BookingForm listing={listing} />
      </div>
    </div>
  );
}
