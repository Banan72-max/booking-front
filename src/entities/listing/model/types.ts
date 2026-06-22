import type { Category } from '../../category/model/types';
import type { Amenity } from '../../amenity/model/types';

export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  isActive: boolean;
  ownerId: string;
  categoryId: string;
  category?: Category;
  amenities?: { amenity: Amenity }[];
  averageRating?: number | null;
  reviewsCount?: number;
  createdAt: string;
}

export interface ListingFilters {
  categoryId?: string;
  priceMax?: number;
  dateFrom?: string;
  dateTo?: string;
}
