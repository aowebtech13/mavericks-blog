import NotFoundContent from '@/src/components/not-found/not-found-content';
import { generateMetadata } from '@/src/utils/generateMetaData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...generateMetadata(),
  title: '404 - AI KW Generator || Nexsas',
};

const page = () => {
  return <NotFoundContent />;
};

export default page;
