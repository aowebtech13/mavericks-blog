'use client';

import Image from 'next/image';
import { useState, type ComponentProps } from 'react';

const FALLBACK_IMAGE = '/images/gradient/opai-4.png';

type SafeImageProps = ComponentProps<typeof Image> & {
  /** Optional custom fallback src when the primary image fails to load. */
  fallbackSrc?: string;
};

/**
 * SafeImage wraps Next.js <Image> with an onError handler that falls back
 * to a local placeholder when the remote image cannot be loaded (e.g., 403/502).
 */
export default function SafeImage({
  src,
  fallbackSrc = FALLBACK_IMAGE,
  alt,
  ...rest
}: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState<string>(src as string);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallbackSrc);
    }
  };

  return (
    <Image
      src={imgSrc}
      alt={alt}
      onError={handleError}
      {...rest}
    />
  );
}

