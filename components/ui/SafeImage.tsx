"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface SafeImageProps {
  src: string | null | undefined;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
}

// Default placeholder image as SVG data URL (base64 encoded)
// Gray background with "No Image" text
const DEFAULT_IMAGE = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iI2YzZjRmNiIvPgogIDx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM5Y2EzYWYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPk5vIEltYWdlPC90ZXh0Pgo8L3N2Zz4=`;

export function SafeImage({
  src,
  alt,
  fill = false,
  width,
  height,
  className = "",
  sizes,
  priority = false,
  objectFit = "cover",
}: SafeImageProps) {
  // Normalize the source - handle empty strings, null, undefined
  const getNormalizedSrc = (source: string | null | undefined): string => {
    return source && source.trim() !== "" ? source : DEFAULT_IMAGE;
  };
  
  const [imageSrc, setImageSrc] = useState<string>(getNormalizedSrc(src));
  const [currentSrc, setCurrentSrc] = useState<string | null | undefined>(src);

  // Update image source when src prop changes
  useEffect(() => {
    if (src !== currentSrc) {
      setCurrentSrc(src);
      setImageSrc(getNormalizedSrc(src));
    }
  }, [src, currentSrc]);

  const handleError = () => {
    // Only fallback to default if we haven't already
    if (imageSrc !== DEFAULT_IMAGE) {
      setImageSrc(DEFAULT_IMAGE);
    }
  };

  const imageClassName = fill
    ? `object-${objectFit} ${className}`
    : className;

  // Use unoptimized for data URLs to avoid Next.js optimization issues
  const isDataUrl = imageSrc.startsWith("data:");

  if (fill) {
    return (
      <Image
        src={imageSrc}
        alt={alt}
        fill
        className={imageClassName}
        sizes={sizes}
        priority={priority}
        unoptimized={isDataUrl}
        onError={handleError}
      />
    );
  }

  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      className={imageClassName}
      sizes={sizes}
      priority={priority}
      unoptimized={isDataUrl}
      onError={handleError}
    />
  );
}
