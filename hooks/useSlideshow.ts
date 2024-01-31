'use client';

import { useEffect, useRef, useState } from 'react';

export default function useSlideshow(imageCount: number, delay: number) {
  const [slideIndex, setSlideIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();

    timeoutRef.current = setTimeout(
      () => setSlideIndex((prevIndex) => (prevIndex === imageCount ? 0 : prevIndex + 1)),
      slideIndex > 0 && slideIndex < imageCount ? delay * 2 : delay
    );

    return () => {
      resetTimeout();
    };
  }, [slideIndex]);

  return slideIndex;
}
