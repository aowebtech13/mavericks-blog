import RevealAnimation from '@/src/components/animation/reveal-animation';
import { TextReveal } from '@/src/components/animation/text-reveal-animation';
import GlobeImage from '@/src/components/shared/globe-image';
import PrimaryLinkButton from '@/src/components/shared/ui/button/primary-link-button';

const CTA = () => {
  return (
    <section className="pb-[80px] max-md:pt-[80px] lg:pt-[100px] lg:pb-0 xl:pb-[146px]">
      <div className="main-container">
        <div className="relative grid h-full place-items-center lg:min-h-[662px] lg:place-items-end">
          <GlobeImage />

          <div className="relative z-10 mx-auto space-y-10 pb-9 md:top-[-2%] md:space-y-14 lg:top-[-15%] xl:top-0">
            <div className="space-y-3">
              <TextReveal>
                <h2 className="font-sora text-sora-heading-4 lg:text-sora-heading-3 xl:text-sora-heading-2 mx-auto max-w-[600px] text-center font-normal text-white md:w-[500px] lg:w-full">
                  Ready to transform your customer support?
                </h2>
              </TextReveal>
              <TextReveal delay={0.2}>
                <p className="text-tagline-2 mx-auto w-full max-w-[438px] text-center text-white/60">
                  Join the growing number of businesses delivering exceptional customer experiences
                  with AI.
                </p>
              </TextReveal>
            </div>
            <RevealAnimation delay={0.3}>
              <div className="text-center">
                <PrimaryLinkButton href="/contact">Get started</PrimaryLinkButton>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
