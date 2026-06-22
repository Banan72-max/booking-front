export interface Review {
  id: string;
  userId: string;
  listingId: string;
  rating: number;
  comment: string;
  user?: { id: string; name: string };
  createdAt: string;
}
