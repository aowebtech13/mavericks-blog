
import { generateMetadata } from '@/src/utils/generateMetaData';
import { getTeamMembers } from '@/src/utils/getTeamMembers';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...generateMetadata(),
  title: 'AI Keyword Generator || Mavericks',
};

const Page = () => {
  const featuredTeam = getTeamMembers(3);
  return (
    <>
     
    </>
  );
};

export default Page;
