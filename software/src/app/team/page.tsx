import Faq from '@/src/components/generate-smart-keyword/faq';
import Testimonial from '@/src/components/home/testimonial';
import CTA from '@/src/components/shared/cta';
import Team from '@/src/components/team/team';
import { generateMetadata } from '@/src/utils/generateMetaData';
import { getTeamMembers } from '@/src/utils/getTeamMembers';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  ...generateMetadata(),
  title: 'Team - AI Keyword Generator || Nexsas',
};

const TeamPage = () => {
  const members = getTeamMembers();
  return (
    <>
      <Team members={members} />
      <Testimonial className="py-[70px] md:py-[110px] xl:py-[156px]" />
      <Faq />
      <CTA />
    </>
  );
};

export default TeamPage;
