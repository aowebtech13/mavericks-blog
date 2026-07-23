'use client';

import imgLeft from '@/public/images/opai-img-423.jpg';
import imgRight from '@/public/images/opai-img-424.jpg';
import NumberAnimation from '@/src/components/animation/number-animation';
import RevealAnimation from '@/src/components/animation/reveal-animation';
import { TextReveal } from '@/src/components/animation/text-reveal-animation';
import Image from 'next/image';

const AboutWhoWeAre = () => {
  return (
    <section
      className="overflow-hidden py-[80px] md:py-[120px] xl:py-[156px]"
      aria-labelledby="who-we-are-heading"
    >
      <div className="main-container">
        <div className="space-y-13 lg:space-y-15 xl:space-y-19">
          <div className="space-y-4 text-center">
            <TextReveal>
              <h2
                id="who-we-are-heading"
                className="font-sora text-sora-heading-4 md:text-sora-heading-3 lg:text-sora-heading-2 mx-auto max-w-[582px] font-normal text-white"
              >
                Who We Are
              </h2>
            </TextReveal>
            <TextReveal delay={0.2}>
              <p className="font-inter-tight text-tagline-3 md:text-tagline-2 mx-auto max-w-[450px] font-normal text-white/60">
                At Nexsas, we believe AI should be accessible, intuitive, and impactful.
              </p>
            </TextReveal>
          </div>

          <div className="grid grid-cols-12 gap-y-6 md:gap-x-6">
            <div className="col-span-12 lg:col-span-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <RevealAnimation direction="left" instant>
                  <div className="overflow-hidden rounded-2xl bg-white">
                    <figure className="relative h-[320px] w-full">
                      <Image
                        src={imgLeft}
                        alt="Who We Are"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </figure>
                    <div className="relative z-10 space-y-0.5 p-6">
                      <h3 className="font-inter-tight text-it-heading-3 flex items-center font-medium text-black">
                        <NumberAnimation
                          number={25}
                          speed={2000}
                          interval={200}
                          rooms={2}
                          heightSpaceRatio={2.1}
                        />
                        +
                      </h3>
                      <p className="font-inter-tight text-tagline-2 text-background-13/60 font-normal">
                        Years in business market.
                      </p>
                    </div>
                  </div>
                </RevealAnimation>
                <RevealAnimation delay={0.2} instant>
                  <div className="bg-stroke-1/11 relative h-[270px] w-full max-w-[413px] self-end overflow-hidden rounded-2xl p-px">
                    <div className="ai-kw-generator-border-animation size-[40px]" aria-hidden />
                    <div className="from-background-3 to-background-5 relative z-20 flex h-[268px] w-full max-w-[412px] flex-col justify-end overflow-hidden rounded-2xl bg-radial-[52.78%_57.9%_at_3.87%_7.86%] px-8 py-12">
                      <div className="relative z-10">
                        <span
                          className="ns-shape-30 mb-2 inline-block text-[58px] text-white"
                          aria-hidden
                        />
                        <div className="space-y-1">
                          <h3 className="font-space-grotesk text-sg-heading-6 text-white">
                            Open Source
                          </h3>
                          <p className="font-inter-tight text-tagline-2 font-normal text-white/60">
                            We believe AI tools should be transparent and built for everyone.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </RevealAnimation>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <RevealAnimation instant>
                  <div className="overflow-hidden rounded-2xl bg-white">
                    <figure className="relative h-[240px] w-full lg:h-[271px] xl:h-[297px]">
                      <Image
                        src={imgRight}
                        alt="Who We Are"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </figure>
                    <div className="relative z-10 space-y-0.5 p-6">
                      <h3 className="font-inter-tight text-it-heading-3 flex items-center font-medium text-black">
                        <NumberAnimation
                          number={300}
                          speed={2000}
                          interval={200}
                          rooms={3}
                          heightSpaceRatio={2.1}
                        />
                        +
                      </h3>
                      <p className="font-inter-tight text-tagline-2 text-background-13/60 font-normal">
                        Products and SaaS launched all around the globe.
                      </p>
                    </div>
                  </div>
                </RevealAnimation>
                <RevealAnimation direction="right" delay={0.2} instant>
                  <div className="bg-stroke-1/11 relative h-[270px] w-full max-w-[413px] self-end overflow-hidden rounded-2xl p-px lg:self-start">
                    <div className="ai-kw-generator-border-animation size-[40px]" aria-hidden />
                    <div className="from-background-3 to-background-5 relative z-20 flex h-[268px] w-full max-w-[412px] flex-col justify-end overflow-hidden rounded-2xl bg-radial-[52.78%_57.9%_at_3.87%_7.86%] px-8 py-12">
                      <div className="relative z-10">
                        <span
                          className="ns-shape-31 mb-2 inline-block text-[58px] text-white"
                          aria-hidden
                        />
                        <div className="space-y-1">
                          <h3 className="font-space-grotesk text-sg-heading-6 text-white">
                            Experts
                          </h3>
                          <p className="font-inter-tight text-tagline-2 font-normal text-white/60">
                            We are a small team of 50+ experts and professionals.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </RevealAnimation>
              </div>
            </div>

            <RevealAnimation delay={0.1} instant>
              <div className="col-span-12 md:col-span-6">
                <div className="bg-stroke-1/11 relative h-[344px] w-full max-w-full overflow-hidden rounded-2xl p-px xl:h-[294px]">
                  <div className="ai-kw-generator-border-animation size-[40px]" aria-hidden />
                  <div className="from-background-3 to-background-5 relative z-20 flex h-full w-full max-w-full flex-col justify-end overflow-hidden rounded-2xl bg-radial-[52.78%_57.9%_at_3.87%_7.86%] px-8 py-12">
                    <div className="relative z-10">
                      <span className="ns-shape-37 text-[36px] text-white" aria-hidden />
                      <div className="relative z-10 space-y-2 text-center">
                        <h3 className="font-inter-tight text-background-7 text-sora-heading-4 font-normal">
                          Vision
                        </h3>
                        <p className="text-tagline-2 font-normal text-white/60">
                          Our mission is to empower every business by providing innovative AI tools
                          that enable them to reach their full potential. We believe that with the
                          right technology, companies can achieve remarkable results.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </RevealAnimation>

            <RevealAnimation delay={0.2} instant>
              <div className="col-span-12 md:col-span-6">
                <div className="bg-stroke-1/11 relative h-[344px] w-full max-w-full overflow-hidden rounded-2xl p-px xl:h-[294px]">
                  <div className="ai-kw-generator-border-animation size-[40px]" aria-hidden />
                  <div className="from-background-3 to-background-5 relative z-20 flex h-full w-full max-w-full flex-col justify-end overflow-hidden rounded-2xl bg-radial-[52.78%_57.9%_at_3.87%_7.86%] px-8 py-12">
                    <div className="relative z-10">
                      <span className="ns-shape-38 text-[36px] text-white" aria-hidden />
                      <div className="relative z-10 space-y-2 text-center">
                        <h3 className="font-inter-tight text-background-7 text-sora-heading-4 font-normal">
                          Mission
                        </h3>
                        <p className="text-tagline-2 font-normal text-white/60">
                          Our goal is to develop artificial intelligence solutions that are not only
                          intuitive and powerful but also specifically designed to address
                          real-world challenges. We aim to harness the latest advancements in
                          technology to create tools that drive growth.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutWhoWeAre;
