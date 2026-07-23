import SignUp from '@/src/components/auth/sign-up';
import { generateMetadata } from '@/src/utils/generateMetaData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...generateMetadata(),
  title: 'Sign Up - AI KW Generator || maverisks',
};

const page = () => {
  return <SignUp />;
};

export default page;
