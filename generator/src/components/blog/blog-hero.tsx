import { TextReveal } from '@/src/components/animation/text-reveal-animation';

const BlogHero = () => {
  return (
    <section
      className="relative overflow-hidden pt-32 pb-18 xl:pt-40 2xl:pt-50"
      data-opai-animate
      data-delay="0.07"
      data-offset="0"
      data-scale="0.9"
    >
      <div className="main-container relative z-10">
        <div className="mb-20 text-center xl:mb-28">
          <TextReveal>
            <h1 className="xl:text-sora-heading-2 lg:text-sora-heading-3 text-sora-heading-4 inline-block font-normal text-white/90">
              Insights, tips, and trends <br className="hidden lg:block" />
              from Nexsas
            </h1>
          </TextReveal>
          <TextReveal delay={0.2}>
            <p className="text-tagline-2 mx-auto mt-3 mb-14 max-w-xl font-normal text-white/60">
              At NexSas, we share practical insights and real-world tips to help you make the most
              of AI in your business.
            </p>
          </TextReveal>
        </div>
      </div>
    </section>
  );
};

export default BlogHero;
