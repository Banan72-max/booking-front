import { Link } from 'react-router-dom';
import type { Listing } from '../model/types';
import { formatPrice } from '../../../shared/lib/formatPrice';
import { ROUTES } from '../../../shared/config/routes';

export function ListingCard({ listing }: { listing: Listing }) {
  return (
    <Link
      to={ROUTES.LISTING(listing.id)}
      className="block overflow-hidden rounded-xl border border-border bg-surface-2 transition-all duration-150 hover:border-primary"
    >
      {listing.photoUrl && <img src={listing.photoUrl} alt={listing.title} className="h-36 w-full object-cover" />}
      <div className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-display text-sm font-bold">{listing.title}</h3>
          {listing.category && (
            <span className="text-xs text-muted">
              {listing.category.icon} {listing.category.name}
            </span>
          )}
        </div>
        <p className="mb-3 line-clamp-2 text-xs text-muted">{listing.description}</p>
        <div className="flex items-center justify-between">
          <span className="font-display text-sm font-bold text-primary-foreground">{formatPrice(listing.price)}</span>
          {listing.averageRating != null && (
            <span className="text-xs text-muted">⭐ {listing.averageRating.toFixed(1)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
