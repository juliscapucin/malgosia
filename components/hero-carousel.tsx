import clsx from 'clsx';
import { getCollectionProducts } from 'lib/shopify';
import type { Product } from 'lib/shopify/types';
import Image from 'next/image';
import Link from 'next/link';

export function HeroCarouselImage({
  isInteractive = true,
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
      className={clsx(
        'group flex h-full w-full items-center justify-center overflow-hidden border bg-white hover:border-blue-600 dark:bg-black',
        {
          relative: label,
          'border-2 border-blue-600': active,
          'border-neutral-200 dark:border-neutral-800': !active
        }
      )}
    >
      {props.src ? (
        // eslint-disable-next-line jsx-a11y/alt-text -- `alt` is inherited from `props`, which is being enforced with TypeScript
        <Image
          className={clsx('relative h-full w-full object-contain', {
            'transition duration-300 ease-in-out group-hover:scale-105': isInteractive
          })}
          {...props}
        />
      ) : null}
    </div>
  );
}

function HeroCarouselItem({ item, priority }: { item: Product; priority?: boolean }) {
  return (
    <Link className="relative block aspect-square h-full w-full" href={`/product/${item.handle}`}>
      <HeroCarouselImage
        src={item.featuredImage.url}
        fill
        sizes={'(min-width: 768px) 66vw, 100vw'}
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

export async function HeroCarousel() {
  // Collections that start with `hidden-*` are hidden from the search page.
  const homepageItems = await getCollectionProducts({
    collection: 'hidden-homepage-featured-items'
  });

  if (!homepageItems[0] || !homepageItems[1] || !homepageItems[2]) return null;

  const [firstProduct, secondProduct, thirdProduct] = homepageItems;

  return (
    <section className="flex">
      <HeroCarouselItem item={firstProduct} priority={true} />
      <HeroCarouselItem item={secondProduct} priority={true} />
      <HeroCarouselItem item={thirdProduct} />
    </section>
  );
}
