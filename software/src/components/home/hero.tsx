'use client';

import gradientCorner from '@/public/images/gradient/opai-22.png';
import heroGrid from '@/public/images/opai-img-316.svg';
import RevealAnimation from '@/src/components/animation/reveal-animation';
import { TextReveal } from '@/src/components/animation/text-reveal-animation';
import HeroClients from '@/src/components/home/hero-clients';
import HeroFileUpload from '@/src/components/home/hero-file-upload';
import HeroMicButton from '@/src/components/home/hero-mic-button';
import HeroPromptField from '@/src/components/home/hero-prompt-field';
import { cn } from '@/src/utils/cn';
import Image from 'next/image';

const Hero = () => (
  <section className="relative pt-[120px] md:pt-[150px] lg:pt-[200px] 2xl:pt-[252px]">
    <figure className="absolute top-0 left-0 h-[470px] w-full" aria-hidden>
      <Image src={heroGrid} alt="" fill className="object-cover" priority sizes="100vw" />
    </figure>

    <div className="main-container">
      <div className="relative z-10 space-y-8 pb-[50px] md:space-y-[65px] md:pb-[140px] lg:pb-[176px]">
        <div className="space-y-3">
          <TextReveal>
            <h1
              className="font-sora text-sora-heading-3 md:text-sora-heading-2 lg:text-sora-heading-1 mx-auto max-w-[708px] text-center font-normal text-white/90"
              itemProp="headline"
            >
              AI keyword generator that drives results
            </h1>
          </TextReveal>
          <TextReveal delay={0.2}>
            <p
              className="font-inter-tight text-tagline-2 mx-auto max-w-[300px] text-center font-normal text-white/60 md:max-w-[494px]"
              itemProp="description"
            >
              Effortlessly discover high-impact keywords tailored to your niche—rank faster,
              smarter, and with less effort.
            </p>
          </TextReveal>
        </div>

        <div className="mx-auto w-full max-w-[600px] space-y-4 overflow-hidden lg:max-w-[708px]">
          <RevealAnimation delay={0.3} instant>
            <div className="relative mx-auto min-h-[229px] w-full overflow-hidden rounded-2xl p-px">
              <div className="ai-kw-generator-border-animation size-[90px]" />

              <form
                id="hero-keyword-form"
                className="border-stroke-3/25 from-background-3 to-background-5 relative inset-0 z-20 min-h-[227px] w-full max-w-[706px] rounded-2xl border bg-radial-[47.49%_64.27%_at_3.87%_7.86%] p-4 pb-[60px]"
                role="search"
                aria-label="AI keyword generator search form"
                onSubmit={(e) => e.preventDefault()}
              >
                <label htmlFor="prompt" className="sr-only">
                  Describe your product or service to generate keywords
                </label>

                <HeroPromptField />

                <span id="prompt-description" className="sr-only">
                  Enter a description of your product or service to generate relevant keywords
                </span>

                <RevealAnimation delay={0.4} instant direction="right" offset={100}>
                  <figure className="pointer-events-none absolute right-[-115px] bottom-[-126px] size-[292px] rotate-32 overflow-hidden select-none">
                    <Image
                      src={gradientCorner}
                      alt=""
                      width={292}
                      height={292}
                      className="size-full object-cover"
                    />
                  </figure>
                </RevealAnimation>
              </form>

              <div className="absolute bottom-4 z-20 w-full px-4">
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-x-2.5">
                    <HeroMicButton />
                    <HeroFileUpload />
                  </div>

                  <button
                    type="submit"
                    form="hero-keyword-form"
                    className="bg-background-7 group flex h-9 w-15 cursor-pointer items-center justify-center rounded-full"
                    aria-label="Submit keyword search"
                  >
                    <span className="relative size-5 overflow-hidden">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        aria-hidden
                        className="absolute top-1/2 translate-x-0 -translate-y-1/2 transition-transform duration-400 ease-in-out group-hover:translate-x-full"
                      >
                        <path
                          d="M4.16797 10H15.8346"
                          stroke="#191D2A"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M10 4.16406L15.8333 9.9974L10 15.8307"
                          stroke="#191D2A"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        aria-hidden
                        className="absolute top-1/2 -translate-x-full -translate-y-1/2 transition-transform duration-400 ease-in-out group-hover:translate-x-0"
                      >
                        <path
                          d="M4.16797 10H15.8346"
                          stroke="#191D2A"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M10 4.16406L15.8333 9.9974L10 15.8307"
                          stroke="#191D2A"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </RevealAnimation>

          <RevealAnimation delay={0.4} instant>
            <div
              className="mx-auto flex w-full max-w-[708px] gap-x-2.5"
              aria-label="Example keyword suggestions"
            >
              <label
                className={cn(
                  'keyword-suggestion bg-background-4 hover:bg-background-2/20 has-checked:bg-background-3',
                  'flex h-6 cursor-pointer items-center justify-center rounded-full px-4 py-[3px] transition-colors duration-300 ease-in-out'
                )}
              >
                <input
                  type="checkbox"
                  className="peer sr-only"
                  aria-label="Select keyword: keywords for food delivery app"
                />
                <span className="font-inter-tight text-tagline-4 font-normal text-white/30 transition-colors duration-300 ease-in-out peer-checked:text-white">
                  keywords for food delivery app
                </span>
              </label>
              <label
                className={cn(
                  'keyword-suggestion bg-background-4 hover:bg-background-2/20 has-checked:bg-background-3',
                  'flex h-6 cursor-pointer items-center justify-center rounded-full px-4 py-[3px] transition-colors duration-300 ease-in-out'
                )}
              >
                <input
                  type="checkbox"
                  className="peer sr-only"
                  aria-label="Select keyword: Ideas for Saas"
                />
                <span className="font-inter-tight text-tagline-4 font-normal text-white/30 transition-colors duration-300 ease-in-out peer-checked:text-white">
                  Ideas for Saas
                </span>
              </label>
            </div>
          </RevealAnimation>
        </div>
      </div>

      <HeroClients />
    </div>

    <figure className="absolute bottom-[80px] left-0 h-[470px] w-full rotate-180" aria-hidden>
      <Image src={heroGrid} alt="" fill className="object-cover" sizes="100vw" />
    </figure>
  </section>
);

export default Hero;
