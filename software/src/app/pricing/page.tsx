import Pricing from '@/src/components/home/pricing';
import TrustedCompany from '@/src/components/shared/trusted-company';
import CTA from '@/src/components/shared/cta';
import { generateMetadata } from '@/src/utils/generateMetaData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...generateMetadata(),
  title: 'Pricing - AI Keyword Generator || Nexsas',
};

const Page = () => {
  return (
    <>
      <Pricing className="pt-[120px] pb-20 md:pt-[150px] md:pb-30 lg:pt-[200px] lg:pb-36 2xl:pt-[252px] 2xl:pb-39" />
      <TrustedCompany />
      <CTA />
    </>
  );
};

export default Page;
