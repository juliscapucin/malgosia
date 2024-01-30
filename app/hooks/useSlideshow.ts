'use client';

import { useEffect, useRef, useState } from 'react';

export default function useSlideshow(imageCount: number, delay: number) {
  const [slideIndex, setSlideIndex] = useState(1);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () => setSlideIndex((prevIndex) => (prevIndex === imageCount - 1 ? 0 : prevIndex + 1)),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [slideIndex]);

  return slideIndex;
}
