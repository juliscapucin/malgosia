import Cart from 'components/cart';
import OpenCart from 'components/cart/open-cart';
import { getMenu } from 'lib/shopify';
import { Suspense } from 'react';
import Navbar from './navbar';

export default async function NavbarWrapper() {
  const menu = await getMenu('header-menu');

  return (
    <Navbar menu={menu}>
      <Suspense fallback={<OpenCart />}>
        <Cart />
      </Suspense>
    </Navbar>
  );
}
