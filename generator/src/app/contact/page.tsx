import Contact from '@/src/components/contact/contact';
import GetInTouch from '@/src/components/contact/get-in-touch';
import { generateMetadata } from '@/src/utils/generateMetaData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...generateMetadata(),
  title: 'Contact Us - AI Keyword Generator || maverisks',
};

const page = () => {
  return (
    <>
      <Contact />
      <GetInTouch />
    </>
  );
};

export default page;
