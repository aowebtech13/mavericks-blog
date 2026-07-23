import CTA from '@/src/components/shared/cta';
import TeamDetailsHero from '@/src/components/team/details-hero';
import TeamDetailsMarkdown from '@/src/components/team/details-markdown';
import { generateMetadata as buildMetadata } from '@/src/utils/generateMetaData';
import getMarkDownContent from '@/src/utils/getMarkDownContent';
import getMarkDownData from '@/src/utils/getMarkDownData';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const items = getMarkDownData('src/data/team');
  return items?.map((item) => ({ slug: item?.slug })) ?? [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const member = getMarkDownContent('src/data/team', slug);
    const data = member?.data as Record<string, unknown>;
    const title = typeof data?.title === 'string' ? data.title : 'Team';
    const description = typeof data?.position === 'string' ? data.position : undefined;
    const imageUrl = typeof data?.image === 'string' ? data.image : undefined;
    return buildMetadata(
      `${title} - AI Keyword Generator || Nexsas`,
      description,
      `/team/${slug}`,
      imageUrl
    );
  } catch {
    return buildMetadata(
      'Team Details - AI Keyword Generator || Nexsas',
      undefined,
      `/team/${slug}`
    );
  }
}

const TeamDetailPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  let member;
  try {
    member = getMarkDownContent('src/data/team', slug);
  } catch {
    notFound();
  }

  const data = member?.data as Record<string, unknown>;
  const name = typeof data?.title === 'string' ? data.title : '';
  const position = typeof data?.position === 'string' ? data.position : '';
  const image = typeof data?.image === 'string' ? data.image : '';
  const excerpt = typeof data?.excerpt === 'string' ? data.excerpt : undefined;
  const email = typeof data?.email === 'string' ? data.email : undefined;
  const phone = typeof data?.phone === 'string' ? data.phone : undefined;

  return (
    <>
      <TeamDetailsHero
        name={name}
        position={position}
        image={image}
        excerpt={excerpt}
        email={email}
        phone={phone}
      />
      <TeamDetailsMarkdown content={member?.content ?? ''} />
      <CTA />
    </>
  );
};

export default TeamDetailPage;
