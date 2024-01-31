import { HeroCarouselWrapper } from 'components';
import Footer from 'components/layout/footer';
import { Suspense } from 'react';

export const runtime = 'edge';

export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website'
  }
};

export default async function HomePage() {
  return (
    <Suspense>
      <HeroCarouselWrapper />
      <Suspense>
        <Footer />
      </Suspense>
    </Suspense>
  );
}
