import { useQuery } from '@tanstack/react-query';
import { listingApi } from '../../entities/listing';
import { categoryApi } from '../../entities/category';
import { useListingStore } from '../../app/store/listingStore';

export function useFilteredListings(page = 1) {
  const { filters, setListings } = useListingStore();
  return useQuery({
    queryKey: ['listings', filters, page],
    queryFn: async () => {
      const result = await listingApi.getMany(filters, page);
      setListings(result.data, result.total);
      return result;
    },
  });
}

export function useCategories() {
  return useQuery({ queryKey: ['categories'], queryFn: categoryApi.getMany });
}
