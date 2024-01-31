'use client';

import Image from 'next/image';
import Link from 'next/link';

import clsx from 'clsx';

import { useSlideshow } from 'hooks';
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
        'border-faded border-2': active,
        'border-faded': !active
      })}
    >
      {props.src ? (
        // eslint-disable-next-line jsx-a11y/alt-text -- `alt` is inherited from `props`, which is being enforced with TypeScript
        <Image className={clsx('relative h-full w-full object-contain')} {...props} />
      ) : null}
    </div>
  );
}

function HeroCarouselItem({ item, priority }: { item: Product; priority?: boolean }) {
  return (
    <Link className="relative h-full w-full min-w-full" href={`/product/${item.handle}`}>
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

  const slideIndex = useSlideshow(items.length, 4000);

  return (
    <section className="relative h-screen w-screen overflow-x-clip">
      <div
        className={clsx(
          'relative flex h-screen w-screen gap-2 px-1',
          slideIndex > 0 && 'transition-transform duration-500 ease-in-out'
        )}
        style={{ transform: `translate3d(${-slideIndex * 100}%, 0, 0)` }}
      >
        <HeroCarouselItem item={firstProduct} priority={true} />
        <HeroCarouselItem item={secondProduct} priority={true} />
        <HeroCarouselItem item={thirdProduct} />
        <HeroCarouselItem item={firstProduct} />
      </div>
    </section>
  );
}
