'use client';

import RevealAnimation from '@/src/components/animation/reveal-animation';
import { TextReveal } from '@/src/components/animation/text-reveal-animation';
import TestimonialCard from '@/src/components/home/testimonial-card';
import Badge from '@/src/components/shared/ui/badge';
import { cn } from '@/src/utils/cn';
import 'swiper/css';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const testimonials = [
  {
    description:
      'The smart keyword generator cut our research time by 60%. We now launch content briefs in hours instead of days. Our organic traffic is up 73% in the first quarter.',
    image: '/images/opai-avatar-img-17.png',
    name: 'Alexandra Morgan',
    position: 'Content Marketing Manager, ContentPro',
  },
  {
    description:
      'We were drowning in spreadsheets. This tool surfaces intent and competition in one place. Our click-through rates from search have improved by 40% since we switched.',
    image: '/images/opai-avatar-img-16.png',
    name: 'James Chen',
    position: 'Head of SEO, GrowthLabs',
  },
  {
    description:
      "Finally, keyword research that feels built for content teams. The suggestions are relevant and actionable. We've ranked for terms we never would have found manually.",
    image: '/images/opai-avatar-img-15.png',
    name: 'Sarah Mitchell',
    position: 'Senior Content Strategist, BrandVoice',
  },
  {
    description:
      "The AI understands context, not just search volume. We're targeting long-tail keywords that actually convert. Our cost per lead from organic search has dropped 35%.",
    image: '/images/opai-avatar-img-88.png',
    name: 'Marcus Webb',
    position: 'Digital Marketing Lead, ScaleUp',
  },
  {
    description:
      'We use it for every new campaign. Clustering and prioritization are spot-on. Our writers get clear briefs and our rankings have never been stronger.',
    image: '/images/opai-avatar-img-76.png',
    name: 'Elena Rodriguez',
    position: 'Content Director, NextGen Media',
  },
  {
    description:
      'As a small team, we needed to compete with bigger budgets. This tool levels the field. We discovered 500+ high-value keywords in our first month alone.',
    image: '/images/opai-avatar-img-75.png',
    name: 'David Park',
    position: 'Founder, StartupSEO',
  },
  {
    description:
      'Integration with our workflow was seamless. The API and export options save us hours. ROI showed up in the first 30 days with better rankings and more qualified traffic.',
    image: '/images/opai-avatar-img-74.png',
    name: 'Rachel Kim',
    position: 'Performance Marketing Manager, DataDrive',
  },
  {
    description:
      "We've tried plenty of keyword tools. This one stands out for clarity and speed. Our content calendar is now driven by real opportunity, not guesswork.",
    image: '/images/opai-avatar-img-70.png',
    name: 'Thomas Wright',
    position: 'VP Marketing, CloudFirst',
  },
] as const;

type TestimonialProps = {
  className?: string;
};

const Testimonial = ({ className }: TestimonialProps) => {
  return (
    <section
      className={cn('py-[80px] md:py-[120px] xl:py-[176px]', className)}
      aria-labelledby="testimonial-section-heading"
    >
      <div className="main-container">
        <div className="space-y-14">
          <div className="space-y-5 text-center">
            <RevealAnimation delay={0.1}>
              <Badge>Testimonials</Badge>
            </RevealAnimation>
            <TextReveal>
              <h2
                id="testimonial-section-heading"
                className="font-sora text-sora-heading-4 md:text-sora-heading-3 lg:text-sora-heading-2 font-normal text-white"
              >
                What Our Clients Say
              </h2>
            </TextReveal>
          </div>

          <RevealAnimation delay={0.3}>
            <div className="overflow-hidden">
              <Swiper
                className="ai-kw-generator-testimonial-swiper w-full"
                modules={[Navigation, Autoplay]}
                initialSlide={3}
                centeredSlides
                spaceBetween={0}
                speed={1400}
                loop
                loopPreventsSliding={false}
                allowTouchMove
                slidesPerView={1}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: true,
                }}
                breakpoints={{
                  480: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 0,
                  },
                }}
                navigation={{
                  prevEl: '.ai-kw-generator-testimonial-prev',
                  nextEl: '.ai-kw-generator-testimonial-next',
                }}
                onInit={(swiper) => {
                  const el = swiper.slides[swiper.activeIndex];
                  if (el instanceof HTMLElement) {
                    el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                    el.style.transform = 'scale(1)';
                    el.style.opacity = '1';
                    el.style.filter = 'blur(0)';
                  }
                }}
                onSlideChange={(swiper) => {
                  swiper.slides.forEach((slide) => {
                    if (slide instanceof HTMLElement) {
                      slide.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                      slide.style.transform = 'scale(0.8)';
                      slide.style.opacity = '0.3';
                      slide.style.filter = 'blur(3px)';
                    }
                  });
                }}
                onSlideChangeTransitionStart={(swiper) => {
                  const el = swiper.slides[swiper.activeIndex];
                  if (el instanceof HTMLElement) {
                    el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                    el.style.transform = 'scale(1)';
                    el.style.opacity = '1';
                    el.style.filter = 'blur(0)';
                  }
                }}
              >
                {testimonials.map((item) => (
                  <SwiperSlide key={item.name}>
                    <div className="flex origin-center items-center justify-center py-4">
                      <TestimonialCard {...item} />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </RevealAnimation>

          <RevealAnimation delay={0.4}>
            <div
              className="flex items-center justify-center gap-x-2"
              aria-label="Testimonial navigation"
            >
              <button
                type="button"
                className="ai-kw-generator-testimonial-prev hover:border-stroke-1/21 bg-background-4 flex size-11 cursor-pointer items-center justify-center rounded-full border border-transparent fill-white transition-colors duration-300 ease-in-out disabled:fill-[#FAFCFF]/20"
                aria-label="Previous testimonial"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="13"
                  height="8"
                  viewBox="0 0 13 8"
                  aria-hidden
                >
                  <path d="M0.146446 4.03324C-0.0488157 3.83798 -0.0488157 3.5214 0.146446 3.32613L3.32843 0.144154C3.52369 -0.0511086 3.84027 -0.0511086 4.03553 0.144154C4.2308 0.339416 4.2308 0.655998 4.03553 0.85126L1.20711 3.67969L4.03553 6.50811C4.2308 6.70338 4.2308 7.01996 4.03553 7.21522C3.84027 7.41048 3.52369 7.41048 3.32843 7.21522L0.146446 4.03324ZM12.5 3.67969V4.17969H0.5V3.67969V3.17969H12.5V3.67969Z" />
                </svg>
              </button>
              <button
                type="button"
                className="ai-kw-generator-testimonial-next hover:border-stroke-1/21 bg-background-4 flex size-11 cursor-pointer items-center justify-center rounded-full border border-transparent fill-white transition-colors duration-300 ease-in-out disabled:fill-[#FAFCFF]/20"
                aria-label="Next testimonial"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="13"
                  height="8"
                  viewBox="0 0 13 8"
                  aria-hidden
                >
                  <path d="M12.3536 4.03324C12.5488 3.83798 12.5488 3.5214 12.3536 3.32613L9.17157 0.144154C8.97631 -0.0511086 8.65973 -0.0511086 8.46447 0.144154C8.2692 0.339416 8.2692 0.655998 8.46447 0.85126L11.2929 3.67969L8.46447 6.50811C8.2692 6.70338 8.2692 7.01996 8.46447 7.21522C8.65973 7.41048 8.97631 7.41048 9.17157 7.21522L12.3536 4.03324ZM0 3.67969V4.17969H12V3.67969V3.17969H0V3.67969Z" />
                </svg>
              </button>
            </div>
          </RevealAnimation>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
