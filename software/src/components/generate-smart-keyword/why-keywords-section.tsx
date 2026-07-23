import RevealAnimation from '@/src/components/animation/reveal-animation';
import { TextReveal } from '@/src/components/animation/text-reveal-animation';
import imgKeywordTool from '@/public/images/opai-img-426.jpg';
import imgWhyKeywords from '@/public/images/opai-img-425.jpg';
import Image from 'next/image';

const whyParagraphs = [
  'You need keywords because they are the exact words and phrases people type into Google.',
  'When you know the keywords people use to search for things related to your website or business, you can create pages and content that answer real searches and attract interested visitors.',
  'Google finds those words in your titles, headings, and content and is more likely to rank your page higher and send traffic to your website.',
  'The same words also power paid search ads, letting you show ads to people already searching for what you offer.',
  'Keywords link your content to the audience seeking it. They form the connection between users, search engines, and your website.',
] as const;

const toolParagraphs = [
  'A keyword tool is a software or online service that helps you find and analyze keywords for your website or business.',
  'It provides insights into keyword popularity, search volume, and competition levels, helping you make informed decisions about which keywords to target.',
  'Many keyword tools offer features like keyword suggestions, keyword grouping, and keyword clustering, making it easier to manage and optimize your keyword strategy.',
  'Some keyword tools even integrate with other SEO tools and platforms, allowing you to streamline your workflow and improve your SEO efforts.',
  'Keywords link your content to the audience seeking it. They form the connection between users, search engines, and your website.',
] as const;

const bodyClass =
  'font-inter-tight text-tagline-3 md:text-tagline-2 font-normal text-white/60';

const WhyKeywordsSection = () => {
  return (
    <section className="py-[80px] md:py-[120px] xl:py-[176px]" aria-labelledby="why-keywords-heading">
      <div className="main-container space-y-30 lg:space-y-39 xl:space-y-47 2xl:space-y-64">
        <div className="grid grid-cols-12 items-center gap-y-10 md:gap-x-8 lg:gap-x-18 xl:gap-x-25">
          <div className="col-span-12 lg:col-span-6">
            <div className="space-y-4 text-left md:space-y-6">
              <TextReveal>
                <h2
                  id="why-keywords-heading"
                  className="font-sora text-sora-heading-4 md:text-sora-heading-3 lg:text-sora-heading-2 font-normal text-white"
                >
                  Why you need keywords
                </h2>
              </TextReveal>
              <div className="space-y-2 md:space-y-4">
                {whyParagraphs.map((text, i) => (
                  <RevealAnimation key={text} delay={0.05 * (i + 2)}>
                    <p className={bodyClass}>{text}</p>
                  </RevealAnimation>
                ))}
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-6">
            <RevealAnimation delay={0.2}>
              <figure className="relative h-[442px] overflow-hidden rounded-2xl">
                <Image
                  src={imgWhyKeywords}
                  alt="Person engaging with keyword research"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </figure>
            </RevealAnimation>
          </div>
        </div>

        <div className="grid grid-cols-12 items-center gap-y-10 md:gap-x-8 lg:gap-x-18 xl:gap-x-25">
          <div className="col-span-12 lg:col-span-6">
            <RevealAnimation delay={0.2}>
              <figure className="relative h-[442px] overflow-hidden rounded-2xl">
                <Image
                  src={imgKeywordTool}
                  alt="Person engaging with keyword research"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </figure>
            </RevealAnimation>
          </div>

          <div className="col-span-12 lg:col-span-6">
            <div className="space-y-4 text-left md:space-y-6">
              <TextReveal>
                <h2 className="font-sora text-sora-heading-4 md:text-sora-heading-3 lg:text-sora-heading-2 font-normal text-white">
                  What is a keyword tool?
                </h2>
              </TextReveal>
              <div className="space-y-2 md:space-y-4">
                {toolParagraphs.map((text, i) => (
                  <RevealAnimation key={text} delay={0.05 * (i + 2)}>
                    <p className={bodyClass}>{text}</p>
                  </RevealAnimation>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyKeywordsSection;
