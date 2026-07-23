import Hero from '@/src/components/home/hero';
import HowItWorks from '@/src/components/home/how-it-works';
import KeywordSection from '@/src/components/home/keyword-section';
import Pricing from '@/src/components/home/pricing';
import RealResult from '@/src/components/home/real-result';
import Team from '@/src/components/home/team';
import Testimonial from '@/src/components/home/testimonial';
import CTA from '@/src/components/shared/cta';
import { generateMetadata } from '@/src/utils/generateMetaData';
import { getTeamMembers } from '@/src/utils/getTeamMembers';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...generateMetadata(),
  title: 'AI Keyword Generator || Nexsas',
};

const Page = () => {
  const featuredTeam = getTeamMembers(3);
  return (
    <>
      <Hero />
      <KeywordSection />
      <HowItWorks />
      <RealResult />
      <Team members={featuredTeam} />
      <Pricing />
      <Testimonial />
      <CTA />
    </>
  );
};

export default Page;
