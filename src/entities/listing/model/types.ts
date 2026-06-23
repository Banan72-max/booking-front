import type { Category } from '../../category/model/types';
import type { Amenity } from '../../amenity/model/types';

export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  photoUrl?: string | null;
  isActive: boolean;
  ownerId: string;
  /** Владелец объекта — присутствует только при include на бэкенде (детали объекта, админ-бронирования). */
  owner?: { id: string; name: string; email: string };
  categoryId: string;
  category?: Category;
  amenities?: { amenity: Amenity }[];
  averageRating?: number | null;
  reviewsCount?: number;
  createdAt: string;
  /** Активные бронирования (только даты) — для блокировки занятых дат в DatePicker. */
  bookings?: { dateFrom: string; dateTo: string }[];
}

export interface ListingFilters {
  categoryId?: string;
  priceMax?: number;
  dateFrom?: string;
  dateTo?: string;
}
