'use client';

import LogoSquare from 'components/logo-square';
import { Menu } from 'lib/shopify/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MobileMenu from './mobile-menu';
import Search from './search';
const { SITE_NAME } = process.env;

export default async function Navbar({
  menu,
  children
}: {
  menu: Menu[];
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isHome = pathname === '/';

  return (
    <>
      {isHome ? (
        <>
          <nav className="absolute z-50 w-full p-4">
            <div className="flex w-full items-center justify-between">
              {menu.length ? (
                <ul className="hidden gap-6 text-sm md:flex md:flex-col md:items-start">
                  {menu.map((item: Menu) => (
                    <li key={item.title}>
                      <Link
                        href={item.path}
                        className="text-faded underline-offset-4 hover:text-secondary hover:underline"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
              <Search />
              {children}
            </div>
            <div className="block flex-none md:hidden">
              <MobileMenu menu={menu} />
            </div>
            <Link
              href="/"
              className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
              aria-label="Malgosia logo"
            >
              <LogoSquare />
            </Link>
          </nav>
        </>
      ) : (
        <nav className="relative flex items-center justify-between p-4 lg:px-6">
          <div className="block flex-none md:hidden">
            <MobileMenu menu={menu} />
          </div>
          <div className="flex w-full items-center justify-between">
            <Link
              href="/"
              className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
              aria-label="Malgosia logo"
            >
              <LogoSquare />
            </Link>
            {menu.length ? (
              <ul className="hidden gap-6 text-sm md:flex md:items-center">
                {menu.map((item: Menu) => (
                  <li key={item.title}>
                    <Link
                      href={item.path}
                      className="text-faded underline-offset-4 hover:text-secondary hover:underline"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
            <Search />
            {children}
          </div>
        </nav>
      )}
    </>
  );
}
