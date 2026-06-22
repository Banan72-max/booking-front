import type { Listing } from '../../listing/model/types';
import type { Payment } from '../../payment/model/types';

export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';

export interface Booking {
  id: string;
  userId: string;
  listingId: string;
  listing?: Listing;
  payment?: Payment | null;
  dateFrom: string;
  dateTo: string;
  status: BookingStatus;
  totalPrice: number;
  createdAt: string;
}
