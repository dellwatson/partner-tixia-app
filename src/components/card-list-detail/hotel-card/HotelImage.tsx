import type { HotelImageProps } from './types';

export function HotelImage({ src, alt, className = '' }: HotelImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className="h-full w-full rounded-t-md md:rounded-t-none md:rounded-l-md object-cover"
      loading="lazy"
    />
  );
}
