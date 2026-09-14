import RevealAnimation from '@/src/components/animation/reveal-animation';
import { SocialIcons } from '@/src/components/shared/social-icons';
import { footerContact, footerSocialLinks } from '@/src/data/footer';
import Image from 'next/image';
import Link from 'next/link';

const FooterBrand = () => (
  <RevealAnimation delay={0.1}>
    <div className="col-span-12 md:col-span-4">
      <div className="space-y-8">
        <Link href="/" className="-ml-3.5 block">
          <span className="sr-only">MavericksAi </span>
          <figure className="h-[44px] w-[240px]">
            <Image
              src="/images/logo/logo-dark.png"
              alt="logo"
              width={240}
              height={44}
              className="h-auto w-full"
            />
          </figure>
        </Link>
        <div className="space-y-6">
          <div>
            <p className="text-tagline-2 text-background-11 mb-1 font-semibold">
              {footerContact.addressTitle}
            </p>
            <p className="text-tagline-3 font-normal text-white/50">{footerContact.address}</p>
          </div>
          <div>
            <p className="text-tagline-2 text-background-11 mb-1 font-semibold">
              {footerContact.contactTitle}
            </p>
          
            <br />
            <a
              href={footerContact.emailHref}
              className="text-tagline-3 font-normal text-white/50 hover:underline"
            >
              {footerContact.email}
            </a>
          </div>
        </div>
        <div>
          <SocialIcons links={footerSocialLinks} />
        </div>
      </div>
    </div>
  </RevealAnimation>
);

export default FooterBrand;
