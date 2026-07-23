import opaiNoise322 from '@/public/images/opai-img-322.svg';
import opaiCircle323 from '@/public/images/opai-img-323.svg';
import opaiGradient324 from '@/public/images/opai-img-324.svg';
import RevealAnimation from '@/src/components/animation/reveal-animation';
import { TextReveal } from '@/src/components/animation/text-reveal-animation';
import KeywordIconCard from '@/src/components/home/keyword-icon-card';
import KeywordSearchTypewriterForm from '@/src/components/home/typewriter-search-row';
import {
  KeywordCardFiveIcon,
  KeywordCardSevenIcon,
  KeywordCardTwoIcon,
  KeywordDecorIcon,
  KeywordWorkflowEmailIcon,
  KeywordWorkflowPushIcon,
  KeywordWorkflowSmsIcon,
  KeywordWorkflowTriggerIcon,
} from '@/src/components/shared/icon';
import ProgressiveBlur from '@/src/components/shared/progressive-blur';
import PrimaryLinkButton from '@/src/components/shared/ui/button/primary-link-button';
import Image from 'next/image';
import type { ReactNode } from 'react';

const workflowItems: { title: string; icon: ReactNode }[] = [
  {
    title: 'Workflow trigger',
    icon: <KeywordWorkflowTriggerIcon />,
  },
  {
    title: 'Email',
    icon: <KeywordWorkflowEmailIcon />,
  },
  {
    title: 'SMS',
    icon: <KeywordWorkflowSmsIcon />,
  },
  {
    title: 'Push Notification',
    icon: <KeywordWorkflowPushIcon />,
  },
];

const KeywordSection = () => (
  <section
    className="py-[80px] md:py-[120px] xl:py-[176px]"
    aria-labelledby="keyword-section-heading"
  >
    <div className="main-container">
      <div className="space-y-14 lg:space-y-28">
        <div className="space-y-10 lg:space-y-19">
          <div className="space-y-6 text-center">
            <RevealAnimation delay={0.1}>
              <span className="inline-block size-14">
                <KeywordDecorIcon />
              </span>
            </RevealAnimation>
            <div className="space-y-4">
              <TextReveal>
                <h2
                  id="keyword-section-heading"
                  className="font-sora text-sora-heading-4 md:text-sora-heading-3 lg:text-sora-heading-2 mx-auto max-w-[600px] text-center text-white lg:max-w-[776px]"
                >
                  Smarter, faster, and more accurate keyword Research
                </h2>
              </TextReveal>
              <TextReveal delay={0.2}>
                <p className="font-inter-tight text-tagline-2 mx-auto max-w-[550px] text-center font-normal text-white/60 lg:max-w-[794px]">
                  Discover high-impact, relevant keywords in seconds with our AI-powered research
                  tool. Uncover valuable search terms for your niche, improve your SEO strategy, and
                  stay ahead of the competition—no expertise required.
                </p>
              </TextReveal>
            </div>
          </div>

          <div
            className="grid grid-cols-8 items-center justify-center gap-8 md:gap-4"
            aria-label="Keyword research feature cards"
          >
            <RevealAnimation delay={0.1}>
              <div
                className="col-span-8 md:col-span-4 lg:col-span-3"
                data-opai-animate
                data-delay="0.1"
              >
                <div
                  className="bg-background-6 border-stroke-1/11 relative flex h-[357px] w-full items-center justify-center overflow-hidden rounded-2xl border"
                  aria-label="Keyword search interface"
                >
                  <div className="border-stroke-1/11 bg-background-6 relative z-20 h-[54px] w-[300px] overflow-hidden rounded-full border p-2 sm:w-[312px]">
                    <KeywordSearchTypewriterForm />
                    <figure className="absolute top-1/2 left-0 -translate-y-1/2" aria-hidden>
                      <Image
                        src={opaiGradient324}
                        alt=""
                        className="size-full"
                        width={312}
                        height={54}
                      />
                    </figure>
                  </div>
                  <figure
                    className="absolute top-1/2 left-1/2 z-10 h-[331px] w-[344px] -translate-x-1/2 -translate-y-1/2"
                    aria-hidden
                  >
                    <Image
                      src={opaiNoise322}
                      alt=""
                      role="presentation"
                      className="size-full"
                      width={344}
                      height={331}
                    />
                  </figure>
                  <figure
                    className="absolute top-1/2 left-[-44px] z-5 size-[358px] -translate-y-1/2 overflow-hidden rounded-full"
                    aria-hidden
                  >
                    <Image
                      src={opaiCircle323}
                      alt=""
                      role="presentation"
                      className="size-full"
                      width={358}
                      height={358}
                    />
                  </figure>
                </div>
              </div>
            </RevealAnimation>

            <div className="col-span-8 flex flex-col items-center justify-center gap-y-4 md:col-span-4 lg:col-span-2">
              <RevealAnimation delay={0.2}>
                <div
                  className="relative flex h-[171px] w-full items-center justify-center overflow-hidden rounded-2xl bg-[url('/images/opai-img-317.png')] bg-cover bg-center bg-no-repeat"
                  aria-label="Keyword research visualization"
                >
                  <KeywordCardTwoIcon />
                </div>
              </RevealAnimation>

              <RevealAnimation delay={0.3}>
                <div
                  className="bg-background-6 border-stroke-1/11 relative h-[171px] w-full rounded-2xl border"
                  aria-label="Keyword input interface"
                >
                  <div
                    className="bg-background-13/60 border-stroke-1/11 absolute top-1/2 left-1/2 z-30 w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-lg border p-4 backdrop-blur-md lg:w-[200px] xl:w-[250px]"
                    aria-label="Add your keyword"
                  >
                    <RevealAnimation delay={0.4}>
                      <span className="font-inter-tight text-tagline-3 text-white">
                        Add your keyword{' '}
                        <span className="ml-1" aria-hidden>
                          +
                        </span>
                      </span>
                    </RevealAnimation>
                  </div>
                  <RevealAnimation delay={0.5}>
                    <div
                      className="bg-background-13/60 border-stroke-1/11 absolute bottom-[25%] left-1/2 z-20 h-[37px] w-[214px] -translate-x-1/2 rounded-lg border backdrop-blur-md lg:w-[180px] xl:w-[214px]"
                      aria-hidden
                    />
                  </RevealAnimation>
                  <RevealAnimation delay={0.6}>
                    <div
                      className="bg-background-13/60 border-stroke-1/11 absolute bottom-[17%] left-1/2 z-10 h-[37px] w-[186px] -translate-x-1/2 rounded-lg border backdrop-blur-md lg:w-[150px] xl:w-[186px]"
                      aria-hidden
                    />
                  </RevealAnimation>
                </div>
              </RevealAnimation>
            </div>

            <RevealAnimation delay={0.4}>
              <div className="col-span-8 md:col-span-4 lg:col-span-3">
                <div
                  className="bg-background-13 border-stroke-1/11 flex h-[357px] w-full items-center justify-center overflow-hidden rounded-2xl border"
                  aria-label="Workflow notification options"
                >
                  <div className="relative">
                    <div
                      className="absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 space-y-2"
                      aria-label="Notification channels"
                    >
                      {workflowItems.map(({ title, icon }) => (
                        <RevealAnimation key={title}>
                          <div className="border-stroke-1/11 bg-background-13/60 flex w-[225px] items-center gap-x-3 rounded-xl border p-1.5">
                            <span
                              className="flex size-10 items-center justify-center rounded-md bg-white/5"
                              aria-hidden
                            >
                              {icon}
                            </span>
                            <p className="font-inter-tight text-tagline-3 font-normal text-white/80">
                              {title}
                            </p>
                          </div>
                        </RevealAnimation>
                      ))}
                    </div>
                    <figure
                      className="absolute top-1/2 left-1/2 z-10 h-[331px] w-[344px] -translate-x-1/2 -translate-y-1/2"
                      aria-hidden
                    >
                      <Image
                        src={opaiNoise322}
                        alt=""
                        className="size-full"
                        width={344}
                        height={331}
                      />
                    </figure>
                    <figure
                      className="absolute top-1/2 left-[-248px] z-5 size-[358px] -translate-y-1/2 overflow-hidden rounded-full"
                      aria-hidden
                    >
                      <Image
                        src={opaiCircle323}
                        alt=""
                        className="size-full"
                        width={358}
                        height={358}
                      />
                    </figure>
                  </div>
                </div>
              </div>
            </RevealAnimation>

            <RevealAnimation delay={0.4}>
              <div className="col-span-8 md:col-span-4 lg:col-span-2">
                <figure
                  className="relative h-[357px] w-full overflow-hidden rounded-2xl"
                  aria-label="User avatar or profile image"
                >
                  <Image
                    src="/images/opai-avatar-img-155.png"
                    alt="User profile avatar"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                  <div
                    className="absolute inset-0 h-full w-full bg-[linear-gradient(180deg,rgba(0,0,0,0.00)_0%,rgba(0,0,0,0.50)_100%)]"
                    aria-hidden
                  />
                  <ProgressiveBlur intensity={130} position="bottom" className="h-[180px]" />
                </figure>
              </div>
            </RevealAnimation>

            <RevealAnimation delay={0.5}>
              <div className="col-span-8 md:col-span-2 lg:col-span-1">
                <div className="border-stroke-1/11 relative flex h-[357px] w-full items-center justify-center overflow-hidden rounded-2xl border">
                  <figure
                    className="absolute top-1/2 left-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl md:max-w-[296px]"
                    aria-hidden
                  >
                    <Image
                      src="/images/opai-img-318.png"
                      alt=""
                      fill
                      className="object-cover"
                      sizes="200px"
                    />
                  </figure>
                  <KeywordCardFiveIcon />
                </div>
              </div>
            </RevealAnimation>

            <RevealAnimation delay={0.6}>
              <div className="col-span-8 md:col-span-4">
                <div
                  className="border-stroke-1/11 relative h-[357px] w-full rounded-2xl border"
                  aria-label="Keyword research dashboard preview"
                >
                  <figure className="border-stroke-1/11 absolute top-[50px] left-[100px] w-full max-w-[205px] overflow-hidden rounded-2xl border md:left-[50px] md:max-w-[260px] lg:max-w-[296px]">
                    <Image
                      src="/images/opai-img-319.png"
                      alt="Keyword research analytics dashboard"
                      width={296}
                      height={200}
                      className="size-full"
                    />
                  </figure>
                  <figure className="border-stroke-1/11 absolute right-[80px] bottom-[50px] w-full max-w-[225px] overflow-hidden rounded-2xl border md:right-[65px] md:max-w-[280px] lg:right-[50px]">
                    <Image
                      src="/images/opai-img-320.png"
                      alt="Keyword performance metrics"
                      width={280}
                      height={200}
                      className="size-full"
                    />
                  </figure>
                </div>
              </div>
            </RevealAnimation>

            <RevealAnimation delay={0.7}>
              <div className="col-span-8 md:col-span-2 lg:col-span-1">
                <div
                  className="border-stroke-1/11 relative flex h-[357px] w-full items-center justify-center rounded-2xl border"
                  aria-label="Keyword research network visualization"
                >
                  <figure
                    className="pointer-events-none absolute top-1/2 left-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl select-none md:max-w-[296px]"
                    aria-hidden
                  >
                    <Image
                      src="/images/opai-img-321.png"
                      alt=""
                      fill
                      className="object-cover"
                      sizes="200px"
                    />
                  </figure>
                  <KeywordCardSevenIcon />
                </div>
              </div>
            </RevealAnimation>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-8 lg:flex-nowrap lg:justify-center lg:gap-y-0">
          <RevealAnimation delay={0.1}>
            <KeywordIconCard
              title="Save Time"
              description="Let AI handle competitive research and trend analysis."
              iconShape="ns-shape-1"
            />
          </RevealAnimation>
          <RevealAnimation delay={0.2}>
            <KeywordIconCard
              title="Precision Targeting"
              description="Find long-tail and intent-driven keywords with ease."
              iconShape="ns-shape-2"
            />
          </RevealAnimation>

          <RevealAnimation delay={0.3}>
            <KeywordIconCard
              title="Stay Updated"
              description="Real-time insights keep your strategy ahead of the curve."
              iconShape="ns-shape-3"
            />
          </RevealAnimation>

          <RevealAnimation delay={0.4}>
            <KeywordIconCard
              title="Better Content Fit"
              description="Get keyword clusters that match real user searches."
              iconShape="ns-shape-4"
            />
          </RevealAnimation>
        </div>

        <RevealAnimation delay={0.5}>
          <div className="text-center">
            <PrimaryLinkButton href="/generate-smart-keyword" wrapperClassName="inline-block ">
              Generate smart keywords
            </PrimaryLinkButton>
          </div>
        </RevealAnimation>
      </div>
    </div>
  </section>
);

export default KeywordSection;
