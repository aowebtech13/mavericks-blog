import RevealAnimation from '@/src/components/animation/reveal-animation';
import { footerCopyrightHolder, footerLegalLinks } from '@/src/data/footer';
import Link from 'next/link';

const FooterBottom = () => (
  <RevealAnimation delay={0.5} instant>
    <div className="border-stroke-1/10 flex flex-col items-start justify-between gap-2.5 border-y py-3.5 sm:flex-row sm:gap-0 sm:px-5 lg:py-5">
      <p className="text-tagline-4 font-normal text-white/50">
        &copy; {new Date().getFullYear()} {footerCopyrightHolder}. All rights reserved.
      </p>
      <ul className="flex flex-col items-start gap-2.5 sm:flex-row sm:gap-4 md:gap-6">
        {footerLegalLinks.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              className="footer-link font-inter-tight text-tagline-4 font-normal text-white/50 transition-colors duration-300 hover:text-white"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </RevealAnimation>
);

export default FooterBottom;
