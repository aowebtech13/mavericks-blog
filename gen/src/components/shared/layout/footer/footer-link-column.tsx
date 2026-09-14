import type { FooterNavItem } from '@/src/data/footer';
import Link from 'next/link';
import { forwardRef } from 'react';

interface FooterLinkColumnProps {
  title: string;
  items: readonly FooterNavItem[];
}

const FooterLinkColumn = forwardRef<HTMLDivElement, FooterLinkColumnProps>(
  function FooterLinkColumn({ title, items }, ref) {
    return (
      <div ref={ref} className="col-span-12 sm:col-span-4">
        <div className="space-y-2 text-left md:text-right">
          <p className="text-tagline-2 font-semibold text-white/90">{title}</p>
          <ul>
            {items.map((item) => (
              <li key={item.label} className="py-2">
                <Link
                  href={item.href}
                  className="text-tagline-3 footer-link inline-block font-normal text-white/50 transition-colors duration-500 hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  },
);

export default FooterLinkColumn;
