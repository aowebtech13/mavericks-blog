'use client';

import HoverBgTransform from '@/src/components/shared/hover-bg-transform';
import {
  ExploreCompanyIcon,
  ExplorePricingAndAccountIcon,
  ExploreProductIcon,
  ExploreResourcesIcon,
} from '@/src/components/shared/icon/menu-icon';
import { cn } from '@/src/utils/cn';
import Link from 'next/link';
import type { ComponentType } from 'react';

type ExploreItem = {
  label: string;
  href: string;
};

type ExploreSection = {
  title: string;
  items: ExploreItem[];
  cta: {
    href: string;
    icon: ComponentType<{ className?: string }>;
    title: string;
    description: string;
  };
};

const exploreSections: ExploreSection[] = [
  {
    title: 'Company',
    items: [
      { label: 'About', href: '/about' },
      { label: 'Team', href: '/team' },
      { label: 'Careers', href: '#' },
    ],
    cta: {
      href: '/about',
      icon: ExploreCompanyIcon,
      title: 'Company',
      description: 'Discover our mission',
    },
  },
  {
    title: 'Product',
    items: [
      { label: 'Generate Smart Keyword', href: '/generate-smart-keyword' },
      { label: 'Integrations', href: '#' },
      { label: 'Process', href: '#' },
      { label: 'Press', href: '#' },
    ],
    cta: {
      href: '#',
      icon: ExploreProductIcon,
      title: 'Product',
      description: "Discover what's possible",
    },
  },
  {
    title: 'Resources',
    items: [
      { label: 'Blog', href: '/blog' },
      { label: 'FAQ', href: '#' },
      { label: 'Tutorials', href: '#' },
    ],
    cta: {
      href: '/blog',
      icon: ExploreResourcesIcon,
      title: 'Resources',
      description: 'Browse helpful content',
    },
  },
  {
    title: 'Pricing & Account',
    items: [
      { label: 'Plans', href: '/pricing' },
      { label: 'Login', href: '/login' },
      { label: 'Sign Up', href: '/signup' },
    ],
    cta: {
      href: '/pricing',
      icon: ExplorePricingAndAccountIcon,
      title: 'Pricing & Account',
      description: 'View subscription plans',
    },
  },
];

const ExploreMenu = ({
  menuDropdownId,
  setMenuDropdownId,
}: {
  menuDropdownId: string | null;
  setMenuDropdownId: (id: string | null) => void;
}) => {
  const handleClose = () => setMenuDropdownId(null);

  return (
    <div>
      <div
        className={cn(
          'pointer-events-none fixed top-full left-1/2 z-40 h-3 w-full -translate-x-1/2 bg-transparent opacity-0 lg:w-[1290px]',
          menuDropdownId === 'explore-mega-menu'
            ? 'pointer-events-auto! opacity-100'
            : 'pointer-events-none opacity-0'
        )}
      />
      <div
        id="explore-mega-menu"
        className={cn(
          'border-stroke-3/20 bg-background-14 pointer-events-none fixed top-full left-1/2 z-50 mt-2 w-full -translate-x-1/2 rounded-[20px] border px-6 pt-3 pb-6 opacity-0 transition-all duration-300 lg:w-[1290px]',
          menuDropdownId === 'explore-mega-menu'
            ? 'pointer-events-auto! translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-2.5 opacity-0'
        )}
      >
        <div className="grid grid-cols-12 gap-x-6 gap-y-6">
          {exploreSections.map(({ title, items, cta }) => (
            <div className="col-span-3" key={title}>
              <div className="flex h-full flex-col">
                <p className="text-tagline-2 text-background-7 font-sora p-3 font-normal">
                  {title}
                </p>
                <ul className="my-8">
                  {items.map(({ label, href }) => (
                    <li key={label}>
                      <Link href={href} onClick={handleClose} className="group relative block p-3">
                        <HoverBgTransform className="group-hover:opacity-100" />
                        <span className="text-tagline-3 font-sora relative z-10 font-normal text-white">
                          {label}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href={cta.href}
                  onClick={handleClose}
                  className="border-stroke-3/40 hover:border-stroke-3/60 shadow-14 mt-auto flex items-start gap-2 rounded-xl border p-3 transition-all duration-300"
                >
                  <div className="border-stroke-3/70 mt-1 flex size-7 shrink-0 items-center justify-center rounded-lg border p-1">
                    <cta.icon className="stroke-background-7" />
                  </div>
                  <div>
                    <p className="text-tagline-2 font-sora font-normal text-white">{cta.title}</p>
                    <p className="text-tagline-3 font-inter-tight font-normal text-white/60">
                      {cta.description}
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExploreMenu;
