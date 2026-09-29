import SafeImage from '@/src/components/shared/ui/safe-image';
import Link from 'next/link';
import type { BlogPost } from '@/src/interface';
import type { FC } from 'react';

interface RelatedBlogProps {
  posts: BlogPost[];
  currentSlug: string;
}

function pickThreeDeterministic(
  items: BlogPost[],
  seed: string,
  exclude: (p: BlogPost) => boolean
): BlogPost[] {
  const filtered = items?.filter((p) => !exclude(p)) ?? [];
  if (filtered.length === 0) return [];
  const hash = (s: string) => [...s].reduce((acc, c) => acc + (c.codePointAt(0) ?? 0), 0);
  const shuffled = [...filtered].sort((a, b) => {
    const ha = hash(seed + (a?.slug ?? ''));
    const hb = hash(seed + (b?.slug ?? ''));
    return ha - hb;
  });
  return shuffled.slice(0, 3);
}

function formatDate(dateStr: string | undefined): string {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

const RelatedBlog: FC<RelatedBlogProps> = ({ posts, currentSlug }) => {
  const related = pickThreeDeterministic(posts ?? [], currentSlug, (p) => p?.slug === currentSlug);

  if (related.length === 0) return null;

  return (
    <section className="pt-28 pb-39">
      <div className="main-container">
        <p className="lg:text-sora-heading-5 text-sora-heading-6 mb-6 font-normal text-white/90">
          Related articles
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((post) => (
            <article key={post.slug} className="h-full">
              <Link
                href={`/blog/${post.slug}`}
                className="border-stroke-3/25 group flex h-full items-center gap-x-3.5 rounded-md border p-2 transition-colors hover:border-stroke-3/50"
              >
                <figure className="h-[90px] w-[110px] shrink-0 overflow-hidden rounded-md">
                  <SafeImage
                    src={post.thumbnail}
                    alt={post.title}
                    width={110}
                    height={90}
                    className="h-full w-full object-cover transition-all duration-500 ease-in-out group-hover:scale-104 group-hover:rotate-1"
                  />
                </figure>
                <div className="space-y-1">
                  <p className="text-tagline-3 line-clamp-2 font-normal text-white/80">{post.title}</p>
                  <p className="text-tagline-4 font-normal text-white/50">{formatDate(post.publishDate)}</p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedBlog;
