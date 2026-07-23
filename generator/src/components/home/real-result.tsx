import RevealAnimation from '@/src/components/animation/reveal-animation';
import { TextReveal } from '@/src/components/animation/text-reveal-animation';
import ResultCard from '@/src/components/shared/ui/card/result-card';
import { cn } from '@/src/utils/cn';

interface RealResultAudience {
  shapeClass: string;
  title: string;
  content: string;
}

const realResultAudiences: RealResultAudience[] = [
  {
    shapeClass: 'ns-shape-30',
    title: 'SEO Specialists',
    content:
      'SEO Specialists are experts who optimize websites to rank higher on search engines and attract the right audience.',
  },
  {
    shapeClass: 'ns-shape-32',
    title: 'Content Marketers',
    content:
      'Content marketers create valuable content that ranks and converts, from blog posts to landing pages.',
  },
  {
    shapeClass: 'ns-shape-34',
    title: 'Digital Agencies',
    content:
      'Agencies use keyword insights to deliver measurable SEO and content results for their clients.',
  },
  {
    shapeClass: 'ns-shape-36',
    title: 'E‑commerce Brands',
    content:
      'E‑commerce teams use keyword data to optimize product pages and category listings for search.',
  },
  {
    shapeClass: 'ns-shape-38',
    title: 'Startup Founders',
    content:
      'Founders get research-backed keywords fast so they can focus on building product and growth.',
  },
];

const RealResult = () => (
  <section
    className="py-[80px] md:py-[120px] xl:py-[176px]"
    aria-labelledby="real-result-section-heading"
  >
    <div className="main-container">
      <div className="space-y-13 lg:space-y-15 xl:space-y-19">
        <TextReveal>
          <h2
            id="real-result-section-heading"
            className="font-sora text-sora-heading-4 md:text-sora-heading-3 lg:text-sora-heading-2 mx-auto max-w-[582px] text-center font-normal text-white"
          >
            Real Results, Real Fast
          </h2>
        </TextReveal>

        <div className="grid grid-cols-12 justify-items-center gap-y-6 md:gap-x-6">
          {realResultAudiences.map(({ shapeClass, title, content }, index) => (
            <RevealAnimation key={title} delay={(index + 1) * 0.1}>
              <div className={cn('col-span-12 md:col-span-6', index < 3 && 'lg:col-span-4')}>
                <ResultCard shapeClass={shapeClass} title={title} content={content} />
              </div>
            </RevealAnimation>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default RealResult;
