import RevealAnimation from '@/src/components/animation/reveal-animation';
import { SocialIcons, type SocialLink } from '@/src/components/shared/social-icons';
import Image from 'next/image';
import Link from 'next/link';

const DEFAULT_SOCIAL_LINKS: SocialLink[] = [
  { name: 'Facebook', href: '#' },
  { name: 'Instagram', href: '#' },
  { name: 'X', href: '#' },
  { name: 'LinkedIn', href: '#' },
  { name: 'YouTube', href: '#' },
];

export interface TeamDetailsHeroProps {
  name: string;
  position: string;
  image: string;
  excerpt?: string;
  email?: string;
  phone?: string;
  socialLinks?: SocialLink[];
}

const TeamDetailsHero = ({
  name,
  position,
  image,
  excerpt,
  email,
  phone,
  socialLinks = DEFAULT_SOCIAL_LINKS,
}: TeamDetailsHeroProps) => {
  const displayEmail = email ?? `${name.toLowerCase().replaceAll(' ', '.')}@company.com`;
  const displayPhone = phone ?? '+1 (368) 567 89 54';

  return (
    <section className="pt-28 md:pt-39">
      <div className="main-container">
        <RevealAnimation delay={0.1} instant>
          <div className="border-stroke-3/18 relative mx-auto w-full max-w-[850px] overflow-hidden rounded-2xl border">
            <RevealAnimation delay={0.4} direction="right" offset={100}>
              <div className="absolute -right-10 bottom-0">
                <figure className="size-[552px] overflow-hidden">
                  <Image
                    src="/images/gradient/opai-4.png"
                    alt=""
                    width={552}
                    height={552}
                    className="size-full object-contain"
                  />
                </figure>
              </div>
            </RevealAnimation>

            <div className="relative z-10 space-y-4">
              <div className="relative mx-auto h-[500px] w-full overflow-hidden rounded-2xl md:h-[600px] lg:h-[770px]">
                <Image
                  src={image}
                  alt={name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 850px) 100vw, 850px"
                  priority
                />
              </div>

              <div
                className="relative w-full max-w-full overflow-hidden p-6 lg:p-[42px]"
                aria-labelledby="team-member-heading"
              >
                <div className="flex flex-col items-center justify-between gap-x-4 gap-y-6 md:flex-row md:gap-y-0">
                  <div className="border-stroke-3/18 basis-1/2 space-y-4 border-b pb-4 md:border-r md:border-b-0 md:pr-6 md:pb-0">
                    <div className="space-y-1">
                      <RevealAnimation delay={0.2}>
                        <p
                          id="team-member-heading"
                          className="font-inter-tight text-tagline-3 font-normal text-white/50"
                        >
                          {position}
                        </p>
                      </RevealAnimation>
                      <RevealAnimation delay={0.3}>
                        <h2 className="font-sora text-sora-heading-5 font-normal text-white/90">
                          {name}
                        </h2>
                      </RevealAnimation>
                    </div>
                    {excerpt ? (
                      <RevealAnimation delay={0.4}>
                        <p className="font-inter-tight text-tagline-3 mr-5 font-normal text-white/60 lg:mr-0">
                          {excerpt}
                        </p>
                      </RevealAnimation>
                    ) : null}
                  </div>

                  <div className="w-full space-y-5.5 md:basis-1/2 md:pl-6">
                    <div className="space-y-2">
                      <RevealAnimation delay={0.3}>
                        <h2 className="font-sora text-sora-heading-5 font-normal text-white/90">
                          Contact information
                        </h2>
                      </RevealAnimation>
                      <RevealAnimation delay={0.4}>
                        <p className="font-inter-tight text-tagline-3 font-normal text-white/60">
                          <Link href={`mailto:${displayEmail}`} className="mb-1 block">
                            {displayEmail}
                          </Link>
                          <Link href={`tel:${displayPhone.replaceAll(/\D/g, '')}`}>
                            {displayPhone}
                          </Link>
                        </p>
                      </RevealAnimation>
                    </div>
                    <RevealAnimation delay={0.5}>
                      <SocialIcons links={socialLinks} iconClassName="stroke-white" />
                    </RevealAnimation>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </RevealAnimation>
      </div>
    </section>
  );
};

export default TeamDetailsHero;
