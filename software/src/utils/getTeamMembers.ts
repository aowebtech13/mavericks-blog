import { TeamMember } from '@/src/interface';
import getMarkDownData from '@/src/utils/getMarkDownData';

export function getTeamMembers(limit?: number): TeamMember[] {
  const all = getMarkDownData<{
    slug: string;
    content: string;
    title?: string;
    position?: string;
    image?: string;
  }>('src/data/team', false, 'title').map((item) => ({
    name: typeof item.title === 'string' ? item.title : '',
    position: typeof item.position === 'string' ? item.position : '',
    image: typeof item.image === 'string' ? item.image : '',
    href: `/team/${item.slug}`,
  }));

  if (limit === undefined) {
    return all;
  }

  const n = Math.max(0, Math.floor(limit));
  return all.slice(0, n);
}
