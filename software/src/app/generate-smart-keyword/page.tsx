import Faq from '@/src/components/generate-smart-keyword/faq';
import GenerateSmartKeywordHero from '@/src/components/generate-smart-keyword/generate-smart-keyword-hero';
import WhyKeywordsSection from '@/src/components/generate-smart-keyword/why-keywords-section';
import Testimonial from '@/src/components/home/testimonial';
import CTA from '@/src/components/shared/cta';
import { generateMetadata } from '@/src/utils/generateMetaData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...generateMetadata(),
  title: 'Generate Smart Keyword - AI KW Generator || Nexsas',
};

const Page = () => {
  return (
    <>
      <GenerateSmartKeywordHero />
      <WhyKeywordsSection />
      <Testimonial className="py-[70px] md:py-[110px] xl:py-[156px]" />
      <Faq />
      <CTA />
    </>
  );
};

export default Page;
