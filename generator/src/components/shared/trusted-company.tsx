import RevealAnimation from '@/src/components/animation/reveal-animation';
import { TextReveal } from '@/src/components/animation/text-reveal-animation';
import { cn } from '@/src/utils/cn';

/** Matches `shared/trusted-company.htm` (pricing.html). */
const trustedCompanies = [
  {
    shapeClass: 'ns-shape-30',
    title: 'FinTech corp',
    content: 'Smart chatbots and voice assistants to elevate customer experiences.',
  },
  {
    shapeClass: 'ns-shape-31',
    title: 'Healthify',
    content: 'Harnessing data‑driven insights empowers organizations to make smarter decisions.',
  },
  {
    shapeClass: 'ns-shape-32',
    title: 'RetailNova',
    content: 'Streamline tasks and increase efficiency with AI‑powered workflows.',
  },
  {
    shapeClass: 'ns-shape-33',
    title: 'EduTech labs',
    content: 'Deliver customized product and content suggestions.',
  },
  {
    shapeClass: 'ns-shape-34',
    title: 'LogiChain',
    content: 'Protect your business with real‑time threat detection.',
  },
  {
    shapeClass: 'ns-shape-35',
    title: 'SmartHome AI',
    content: 'Smart chatbots and voice assistants to elevate customer experiences.',
  },
] as const;

const TrustedCompany = () => {
  return (
    <section
      className="py-[80px] md:py-[120px] xl:py-[176px]"
      aria-labelledby="trusted-company-section-heading"
    >
      <div className="main-container">
        <div className="space-y-13 lg:space-y-15 xl:space-y-19">
          <div className="space-y-1 text-center lg:space-y-4">
            <TextReveal>
              <h2
                id="trusted-company-section-heading"
                className="font-sora text-sora-heading-4 md:text-sora-heading-3 lg:text-sora-heading-2 text-center font-normal text-white"
              >
                Trusted by leading companies worldwide
              </h2>
            </TextReveal>
            <TextReveal delay={0.2}>
              <p className="text-tagline-2 w-full text-center text-white/60">
                Join the growing list of companies transforming their operations with Nexsas.
              </p>
            </TextReveal>
          </div>

          <div className="grid grid-cols-12 justify-items-center gap-y-6 md:gap-x-6">
            {trustedCompanies.map(({ shapeClass, title, content }, index) => (
              <RevealAnimation key={title} delay={0.1 * ((index % 3) + 1)}>
                <div className="col-span-12 md:col-span-6 lg:col-span-4">
                  <div className="bg-stroke-1/11 relative h-[322px] w-full max-w-[414px] overflow-hidden rounded-2xl p-px xl:h-[242px]">
                    <div className="ai-kw-generator-border-animation size-[40px]" aria-hidden />

                    <div
                      className="from-background-3 to-background-5 relative z-20 h-full w-full max-w-[412px] space-y-12 rounded-2xl bg-radial-[52.78%_57.9%_at_3.87%_7.86%] px-8 py-12"
                      aria-labelledby={`trusted-company-${index}`}
                    >
                      <div className="flex h-full flex-col items-start justify-between text-left">
                        <div
                          className={cn(shapeClass, 'block text-[40px] text-white/80')}
                          aria-hidden
                        />
                        <div className="space-y-1 pt-3">
                          <h3
                            id={`trusted-company-${index}`}
                            className="font-space-grotesk text-sg-heading-6 font-normal text-white"
                          >
                            {title}
                          </h3>
                          <p className="font-inter-tight text-tagline-2 font-normal text-white/60">
                            {content}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedCompany;
