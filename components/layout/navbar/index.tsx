import Cart from 'components/cart';
import OpenCart from 'components/cart/open-cart';
import LogoSquare from 'components/logo-square';
import { getMenu } from 'lib/shopify';
import { Menu } from 'lib/shopify/types';
import Link from 'next/link';
import { Suspense } from 'react';
import MobileMenu from './mobile-menu';
import Search from './search';
const { SITE_NAME } = process.env;

export default async function Navbar() {
  const menu = await getMenu('header-menu');
  const mainMenu = await getMenu('main-menu');

  return (
    <nav className="relative flex items-center justify-between p-4 lg:px-6">
      <div className="block flex-none md:hidden">
        <MobileMenu menu={menu} />
      </div>
      <div className="flex w-full items-center justify-between">
        <Link href="/" className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6">
          <LogoSquare />
        </Link>
        {menu.length ? (
          <ul className="hidden gap-6 text-sm md:flex md:items-center">
            {menu.map((item: Menu) => (
              <li key={item.title}>
                <Link
                  href={item.path}
                  className="text-neutral-50 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-50"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
        <Search />
        <Suspense fallback={<OpenCart />}>
          <Cart />
        </Suspense>
      </div>
    </nav>
  );
}
