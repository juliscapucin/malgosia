'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useSlideshow } from 'app/hooks';
import clsx from 'clsx';
import { Product } from 'lib/shopify/types';

export function HeroCarouselImage({
  active,
  label,
  ...props
}: {
  isInteractive?: boolean;
  active?: boolean;
  label?: {
    title: string;
    amount: string;
    currencyCode: string;
    position?: 'bottom' | 'center';
  };
} & React.ComponentProps<typeof Image>) {
  return (
    <div
      className={clsx('group flex h-full w-full items-center justify-center overflow-hidden', {
        relative: label,
        'border-2 border-blue-600': active,
        'border-neutral-200 dark:border-neutral-800': !active
      })}
    >
      {props.src ? (
        // eslint-disable-next-line jsx-a11y/alt-text -- `alt` is inherited from `props`, which is being enforced with TypeScript
        <Image className={clsx('relative h-full w-full object-contain')} {...props} />
      ) : null}
    </div>
  );
}

function HeroCarouselItem({
  item,
  priority,
  slideIndex
}: {
  item: Product;
  priority?: boolean;
  slideIndex: number;
}) {
  return (
    <Link
      className="relative h-full w-full min-w-full"
      href={`/product/${item.handle}`}
      style={{ transform: `translate3d(${-slideIndex * 100}%, 0, 0)` }}
    >
      <HeroCarouselImage
        src={item.featuredImage.url}
        fill
        sizes={'100vw'}
        priority={priority}
        alt={item.title}
        label={{
          position: 'center',
          title: item.title as string,
          amount: item.priceRange.maxVariantPrice.amount,
          currencyCode: item.priceRange.maxVariantPrice.currencyCode
        }}
      />
    </Link>
  );
}

export function HeroCarousel({ items }: { items: Product[] }) {
  if (!items[0] || !items[1] || !items[2]) return null;
  const [firstProduct, secondProduct, thirdProduct] = items;

  const slideIndex = useSlideshow(items.length, 2000);

  return (
    <section className="relative flex h-screen w-screen gap-1 overflow-x-clip">
      <HeroCarouselItem item={firstProduct} slideIndex={slideIndex} priority={true} />
      <HeroCarouselItem item={secondProduct} slideIndex={slideIndex} priority={true} />
      <HeroCarouselItem item={thirdProduct} slideIndex={slideIndex} />
    </section>
  );
}
