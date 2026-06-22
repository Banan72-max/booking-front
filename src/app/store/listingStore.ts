import { create } from 'zustand';
import type { Listing } from '../../entities/listing/model/types';

export interface FilterState {
  categoryId?: string;
  priceMax?: number;
  dateFrom?: string;
  dateTo?: string;
}

interface ListingState {
  listings: Listing[];
  totalCount: number;
  filters: FilterState;
  isLoading: boolean;
  setListings: (data: Listing[], total: number) => void;
  setFilter: (key: keyof FilterState, value: FilterState[keyof FilterState]) => void;
  resetFilters: () => void;
  setLoading: (loading: boolean) => void;
}

export const useListingStore = create<ListingState>((set) => ({
  listings: [],
  totalCount: 0,
  filters: {},
  isLoading: false,
  setListings: (data, total) => set({ listings: data, totalCount: total }),
  setFilter: (key, value) => set((state) => ({ filters: { ...state.filters, [key]: value } })),
  resetFilters: () => set({ filters: {} }),
  setLoading: (isLoading) => set({ isLoading }),
}));
