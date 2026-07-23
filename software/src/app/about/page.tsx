import AboutHero from '@/src/components/about/about-hero';
import AboutTeam from '@/src/components/about/about-team';
import AboutWhoWeAre from '@/src/components/about/about-who-we-are';
import Testimonial from '@/src/components/home/testimonial';
import CTA from '@/src/components/shared/cta';
import { generateMetadata } from '@/src/utils/generateMetaData';
import { getTeamMembers } from '@/src/utils/getTeamMembers';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...generateMetadata(),
  title: 'About us - AI Keyword Generator || Nexsas',
};

const page = () => {
  const aboutTeamMembers = getTeamMembers(6);
  return (
    <>
      <AboutHero />
      <AboutWhoWeAre />
      <Testimonial className="py-[70px] md:py-[110px] xl:py-[156px]" />
      <AboutTeam members={aboutTeamMembers} />
      <CTA />
    </>
  );
};

export default page;
