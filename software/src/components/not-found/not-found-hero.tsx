import notFoundHeroImage from '@/public/images/gradient/opai-4.png';
import RevealAnimation from '@/src/components/animation/reveal-animation';
import PrimaryLinkButton from '@/src/components/shared/ui/button/primary-link-button';
import Image from 'next/image';

const NotFoundHero = () => {
  return (
    <div className="from-background-5 to-background-6 border-stroke-3/25 relative w-full overflow-hidden rounded-2xl border bg-radial-[52.78%_57.9%_at_3.87%_7.86%] p-8 py-20 md:py-28 lg:py-32 xl:py-39">
      <RevealAnimation direction="right" offset={80} delay={0.4} instant>
        <div className="absolute -right-35 -bottom-20 size-[400px] rotate-122">
          <Image
            src={notFoundHeroImage}
            alt="Not Found gradient img "
            className="h-full w-full object-cover"
            priority
          />
        </div>
      </RevealAnimation>
      <div className="relative z-10 space-y-6 text-center md:space-y-10 lg:space-y-14">
        <div className="space-y-6">
          <RevealAnimation delay={0.1} instant>
            <h2 className="font-sora text-[100px] leading-[120%] font-normal text-white md:text-[150px] lg:text-[175px] xl:text-[200px]">
              404
            </h2>
          </RevealAnimation>
          <div className="space-y-1">
            <RevealAnimation delay={0.2} instant>
              <h3 className="font-sora text-sora-heading-4 md:text-sora-heading-3 lg:text-sora-heading-2 mx-auto max-w-[300px] font-normal text-white/90">
                Oops! Page Not Found
              </h3>
            </RevealAnimation>
            <RevealAnimation delay={0.3} instant>
              <p className="font-inter-tight text-tagline-2 mx-auto max-w-[300px] text-white/50">
                The page doesn&apos;t exist or was moved. Don&apos;t worry, we&apos;ll guide you
                back.
              </p>
            </RevealAnimation>
          </div>
        </div>
        <RevealAnimation delay={0.4} instant>
          <div className="inline-block">
            <PrimaryLinkButton href="/" wrapperClassName="inline-block">
              Go back home
            </PrimaryLinkButton>
          </div>
        </RevealAnimation>
      </div>
    </div>
  );
};

export default NotFoundHero;
