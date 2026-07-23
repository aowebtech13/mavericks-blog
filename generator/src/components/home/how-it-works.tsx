'use client';

import gradientCorner from '@/public/images/gradient/opai-22.png';
import opaiImg507 from '@/public/images/opai-img-507.png';
import opaiImg508 from '@/public/images/opai-img-508.png';
import opaiImg509 from '@/public/images/opai-img-509.png';
import opaiNoise322 from '@/public/images/opai-img-322.svg';
import opaiCircle323 from '@/public/images/opai-img-323.svg';
import opaiGradient324 from '@/public/images/opai-img-324.svg';
import RevealAnimation from '@/src/components/animation/reveal-animation';
import { TextReveal } from '@/src/components/animation/text-reveal-animation';
import Badge from '@/src/components/shared/ui/badge';
import { StackCardItem } from '@/src/components/shared/ui/stack-card/stack-card-item';
import { StackCardWrapper } from '@/src/components/shared/ui/stack-card/stack-card-wrapper';
import Image from 'next/image';

const HowItWorks = () => (
  <section className="py-[80px] md:py-[120px] xl:py-[176px]" aria-labelledby="how-it-works-heading">
    <div className="main-container">
      <div className="space-y-15 md:space-y-25">
        <div className="space-y-5 text-center">
          <RevealAnimation delay={0.1}>
            <Badge aria-label="Section subtitle: How Nexsas works">How Nexsas works</Badge>
          </RevealAnimation>
          <div className="space-y-4">
            <TextReveal>
              <h2
                id="how-it-works-heading"
                className="font-sora text-sora-heading-4 md:text-sora-heading-3 lg:text-sora-heading-2 mx-auto max-w-[582px] text-center font-normal text-white"
              >
                From idea to actionable keywords in minutes
              </h2>
            </TextReveal>
            <TextReveal delay={0.2}>
              <p className="text-tagline-3 md:text-tagline-2 font-inter-tight mx-auto max-w-[650px] text-center font-normal text-white/60 xl:max-w-[872px]">
                Enter a quick description of your business or product and our AI does the rest—no
                keyword expertise required. In moments, you&apos;ll receive research-backed keyword
                clusters and actionable opportunities to enhance your SEO strategy and boost real
                results.
              </p>
            </TextReveal>
          </div>
        </div>

        <StackCardWrapper
          className="space-y-8"
          stackStyle="rotate"
          aria-label="How Nexsas works feature cards"
        >
          <StackCardItem
            className="bg-background-5 border-stroke-1/11 relative mx-auto h-[300px] w-full max-w-[300px] overflow-hidden rounded-2xl border p-px sm:max-w-[350px] md:h-[400px] md:max-w-[600px] lg:h-[457px] lg:max-w-[650px]"
            aria-labelledby="card-heading-1"
          >
            <div className="ai-kw-generator-border-animation size-[100px]" aria-hidden />
            <div className="bg-background-5 relative z-20 flex h-full w-full flex-col items-center justify-between rounded-2xl p-5 md:p-8 lg:p-[42px]">
              <figure className="h-auto w-full">
                <Image
                  src={opaiImg507}
                  alt=""
                  className="size-full object-cover"
                  width={650}
                  height={340}
                />
              </figure>
              <div className="space-y-2 text-center">
                <h3
                  id="card-heading-1"
                  className="font-inter-tight text-it-heading-6 md:text-it-heading-5 text-white"
                >
                  Plan, cluster & export
                </h3>
                <p className="font-inter-tight text-tagline-3 md:text-tagline-2 font-normal text-white/60">
                  Group keywords into themes and export them into your strategy.
                </p>
              </div>
            </div>
          </StackCardItem>

          <StackCardItem
            className="bg-background-5 border-stroke-1/11 relative mx-auto h-[300px] w-full max-w-[300px] overflow-hidden rounded-2xl border p-px sm:max-w-[350px] md:h-[400px] md:max-w-[600px] lg:h-[457px] lg:max-w-[650px]"
            aria-labelledby="card-heading-2"
          >
            <div className="ai-kw-generator-border-animation size-[100px]" aria-hidden />
            <div className="bg-background-5 relative z-20 flex h-full w-full flex-col items-center justify-between rounded-2xl p-5 md:p-8 lg:p-[42px]">
              <figure className="h-auto w-full">
                <Image
                  src={opaiImg508}
                  alt=""
                  className="size-full object-cover"
                  width={650}
                  height={340}
                />
              </figure>
              <div className="space-y-2 text-center">
                <h3
                  id="card-heading-2"
                  className="font-inter-tight text-it-heading-6 md:text-it-heading-5 text-white"
                >
                  Optimize your strategy
                </h3>
                <p className="font-inter-tight text-tagline-3 md:text-tagline-2 font-normal text-white/60">
                  Optimize your strategy with our AI-powered tools and insights.
                </p>
              </div>
            </div>
          </StackCardItem>

          <StackCardItem
            className="bg-background-5 border-stroke-1/11 relative mx-auto h-[300px] w-full max-w-[300px] overflow-hidden rounded-2xl border p-px sm:max-w-[350px] md:h-[400px] md:max-w-[600px] lg:h-[457px] lg:max-w-[650px]"
            aria-labelledby="card-heading-3"
          >
            <div className="ai-kw-generator-border-animation size-[100px]" aria-hidden />
            <div className="bg-background-5 relative z-20 flex h-full w-full flex-col items-center justify-between rounded-2xl p-5 md:p-8 lg:p-[42px]">
              <figure className="h-auto w-[300px]">
                <Image
                  src={opaiImg509}
                  alt=""
                  className="size-full object-contain"
                  width={300}
                  height={280}
                />
              </figure>
              <div className="space-y-2 text-center">
                <h3
                  id="card-heading-3"
                  className="font-inter-tight text-it-heading-6 md:text-it-heading-5 text-white"
                >
                  Generate keywords
                </h3>
                <p className="font-inter-tight text-tagline-3 md:text-tagline-2 font-normal text-white/60">
                  Generate keywords with our AI-powered tools and insights.
                </p>
              </div>
            </div>
          </StackCardItem>

          <StackCardItem
            className="bg-stroke-1/11 relative mx-auto h-[300px] max-w-[300px] overflow-hidden rounded-2xl p-px sm:max-w-[350px] md:h-[400px] md:max-w-[600px] lg:h-[457px] lg:max-w-[650px]"
            aria-label="Keyword input interface"
          >
            <div className="ai-kw-generator-border-animation size-[100px]" aria-hidden />
            <div
              className="relative z-20 flex h-[455px] w-full max-w-[798px] items-center justify-center rounded-2xl"
              style={{
                background:
                  'radial-gradient(49.42% 64.27% at 3.87% 7.86%, #252a32 0%, #11141d 100%)',
              }}
            >
              <div className="relative mx-auto h-[360px] w-full max-w-[280px] md:max-w-[499px]">
                <div className="mb-10 text-center md:mb-[99px]">
                  <h3
                    id="keyword-input-heading"
                    className="font-space-grotesk md:text-sg-heading-5 text-sg-heading-6 font-normal text-white/90"
                  >
                    Enter Your Topic or URL
                  </h3>
                  <p className="font-inter-tight text-tagline-3 font-normal text-white/60">
                    Start with a keyword, service, or existing page.
                  </p>
                </div>

                <div className="border-stroke-1/11 bg-background-6 relative z-20 h-[54px] w-full overflow-hidden rounded-full border p-2">
                  <form
                    className="border-stroke-1/11 relative z-20 flex size-full h-[38px] items-center justify-between rounded-full border bg-[#FAFCFF]/5 py-1 pr-1 backdrop-blur-[32px]"
                    aria-label="Keyword search form"
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <label htmlFor="how-it-works-keyword" className="sr-only">
                      Search keywords
                    </label>
                    <input
                      type="text"
                      name="keyword"
                      id="how-it-works-keyword"
                      placeholder="Enter your topic or URL"
                      aria-label="Enter keyword to search"
                      className="font-inter-tight text-tagline-3 inline-block size-full pl-4 font-normal text-white outline-none placeholder:text-white/80"
                    />
                    <span className="flex size-[30px] items-center justify-center" aria-hidden>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        height="17"
                        viewBox="0 0 17 17"
                        fill="none"
                        aria-hidden
                      >
                        <ellipse
                          cx="7.20446"
                          cy="7.19982"
                          rx="6.70446"
                          ry="6.69982"
                          stroke="white"
                          strokeLinecap="square"
                        />
                        <path
                          d="M11.7695 12.1406L15.5673 15.9259"
                          stroke="white"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </form>

                  <figure
                    className="pointer-events-none absolute top-1/2 left-0 -translate-y-1/2 select-none"
                    aria-hidden
                  >
                    <Image
                      src={opaiGradient324}
                      alt=""
                      className="size-full"
                      width={400}
                      height={54}
                      loading="lazy"
                    />
                  </figure>
                </div>

                <figure
                  className="pointer-events-none absolute top-1/2 left-[28%] z-10 h-[331px] w-[344px] -translate-y-1/2 select-none"
                  aria-hidden
                >
                  <Image
                    src={opaiNoise322}
                    alt=""
                    className="size-full"
                    width={344}
                    height={331}
                    loading="lazy"
                  />
                </figure>

                <figure
                  className="pointer-events-none absolute top-1/2 left-[-73px] z-5 size-[358px] -translate-y-1/2 overflow-hidden rounded-full select-none"
                  aria-hidden
                >
                  <Image
                    src={opaiCircle323}
                    alt=""
                    className="size-full"
                    width={358}
                    height={358}
                    loading="lazy"
                  />
                </figure>
              </div>

              <figure
                className="pointer-events-none absolute right-[-139px] bottom-[-157px] h-[480px] w-[350px] rotate-28 select-none"
                aria-hidden
              >
                <Image
                  src={gradientCorner}
                  alt=""
                  width={350}
                  height={480}
                  className="size-full"
                  loading="lazy"
                />
              </figure>
            </div>
          </StackCardItem>
        </StackCardWrapper>
      </div>
    </div>
  </section>
);

export default HowItWorks;
