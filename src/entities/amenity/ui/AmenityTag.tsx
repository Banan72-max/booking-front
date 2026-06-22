import type { Amenity } from '../model/types';

export function AmenityTag({ amenity }: { amenity: Amenity }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs text-muted">
      <span>{amenity.icon}</span>
      <span>{amenity.name}</span>
    </span>
  );
}
