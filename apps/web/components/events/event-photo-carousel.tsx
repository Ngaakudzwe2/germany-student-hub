'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { unsplashUrl } from '@/lib/event-meta';

const CAROUSEL_INTERVAL_MS = 4000;

interface EventPhotoCarouselProps {
  photoIds: string[];
  isPast?: boolean;
  heightClass?: string;
  imageWidth?: number;
  sizes?: string;
  children?: React.ReactNode;
}

export function EventPhotoCarousel({
  photoIds,
  isPast = false,
  heightClass = 'h-40',
  imageWidth = 640,
  sizes = '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw',
  children,
}: EventPhotoCarouselProps) {
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    if (photoIds.length <= 1) return;
    const id = setInterval(() => {
      setPhotoIndex((i) => (i + 1) % photoIds.length);
    }, CAROUSEL_INTERVAL_MS);
    return () => clearInterval(id);
  }, [photoIds.length]);

  return (
    <div className={`relative w-full overflow-hidden ${heightClass}`}>
      {photoIds.map((photoId, i) => (
        <Image
          key={photoId}
          src={unsplashUrl(photoId, imageWidth)}
          alt=""
          fill
          sizes={sizes}
          className={`object-cover transition-opacity duration-700 ease-in-out ${isPast ? 'grayscale-[35%]' : ''}`}
          style={{ opacity: i === photoIndex ? 1 : 0 }}
          priority={i === 0}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/40" />

      {children}

      {isPast && (
        <span className="absolute bottom-2 left-3 rounded-full bg-black/40 px-2 py-0.5 text-[10px] text-white/80 backdrop-blur-sm">
          Recap photos
        </span>
      )}

      {photoIds.length > 1 && (
        <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1">
          {photoIds.map((photoId, i) => (
            <span
              key={photoId}
              className={`h-1 rounded-full transition-all ${
                i === photoIndex ? 'w-4 bg-white' : 'w-1 bg-white/40'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
