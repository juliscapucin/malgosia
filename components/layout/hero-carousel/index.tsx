import { getCollectionProducts } from 'lib/shopify';
import { HeroCarousel } from './hero-carousel';

export async function HeroCarouselWrapper() {
  // Collections that start with `hidden-*` are hidden from the search page.
  const homepageItems = await getCollectionProducts({
    collection: 'hidden-homepage-featured-items'
  });

  return (
    <section className="relative flex h-screen w-screen gap-1 overflow-x-clip">
      <HeroCarousel items={homepageItems} />
    </section>
  );
}
