'use client';

import logo from '@/public/images/logo.svg';
import mainLogo from '@/public/images/logo/main-logo-dark.svg';
import RevealAnimation from '@/src/components/animation/reveal-animation';
import MobileMenu from '@/src/components/shared/layout/mobile-menu/mobile-menu';
import PrimaryLinkButton from '@/src/components/shared/ui/button/primary-link-button';
import { MobileMenuProvider } from '@/src/context/MobileMenuContext';
import { useNavbarScroll } from '@/src/hooks/useScrollHeader';
import { cn } from '@/src/utils/cn';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import MobileMenuButton from './mobile-menu-button';

const Navbar = () => {
  const { isScrolled } = useNavbarScroll(150);
  const [menuDropdownId, setMenuDropdownId] = useState<string | null>(null);

  const handleMenuHover = (dropdownId?: string | null) => {
    setMenuDropdownId(dropdownId || null);
  };

  return (
    <MobileMenuProvider>
      <header
        onMouseLeave={() => handleMenuHover(null)}
        className={cn(
          'lp:max-w-[1290px]! fixed top-5 left-1/2 z-50 mx-auto w-full max-w-[350px] -translate-x-1/2 rounded-[20px] transition-all duration-500 ease-in-out min-[425px]:max-w-[375px] min-[500px]:max-w-[450px] sm:max-w-[540px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px]',
          isScrolled && 'top-2!'
        )}
      >
        <RevealAnimation direction="up" offset={100} delay={0.1} instant>
          <div className="bg-background-13/60 flex items-center justify-between rounded-[20px] px-1.5 py-2.5 backdrop-blur-[25px] xl:py-0">
            <div>
              <Link href="/blog">
                <span className="sr-only">Blog</span>
                <figure className="hidden lg:block lg:max-w-[198px]">
                  <Image src={mainLogo} alt="Nexsas" className="h-auto w-full" priority />
                </figure>
                <figure className="block max-w-[44px] lg:hidden">
                  <Image src={logo} alt="Nexsas" className="block w-full" priority />
                </figure>
              </Link>
            </div>
            <nav className="hidden items-center xl:flex">
              <ul className="flex items-center">
                <li className="py-2.5">
                  <Link
                    href="/blog"
                    className="text-tagline-3 font-ibm-plex-mono flex items-center gap-1 rounded-full border border-transparent px-4 py-2 font-normal text-white/60 transition-all duration-200 hover:text-white"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </nav>
            <MobileMenuButton />
          </div>
        </RevealAnimation>
      </header>
      <MobileMenu menuData={[]} />
    </MobileMenuProvider>
  );
};

export default Navbar;
