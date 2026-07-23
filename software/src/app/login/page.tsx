import Login from '@/src/components/auth/login';
import { generateMetadata } from '@/src/utils/generateMetaData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...generateMetadata(),
  title: 'Login - AI KW Generator || Nexsas',
};

const page = () => {
  return <Login />;
};

export default page;
