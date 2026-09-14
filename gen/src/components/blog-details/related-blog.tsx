import RevealAnimation from '@/src/components/animation/reveal-animation';
import { TextReveal } from '@/src/components/animation/text-reveal-animation';
import { BlogCard } from '@/src/components/shared/ui/card/blog-card';
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

const categoryLabel = (post: BlogPost) =>
  post.category?.trim() || post.tags?.[0] || 'Blog';

const RelatedBlog: FC<RelatedBlogProps> = ({ posts, currentSlug }) => {
  const related = pickThreeDeterministic(posts ?? [], currentSlug, (p) => p?.slug === currentSlug);

  if (related.length === 0) return null;

  return (
    <section className="pt-28 pb-39">
      <div className="main-container">
        <div className="mb-[70px] text-center">
          <TextReveal>
            <h3 className="lg:text-sora-heading-4 text-sora-heading-5 mb-1 font-normal text-white/90">
              Related articles
            </h3>
          </TextReveal>
          <TextReveal delay={0.1}>
            <p className="text-tagline-2 font-normal text-white/60">
              More deep dives on AI‑powered keyword research and SEO content.
            </p>
          </TextReveal>
        </div>
        <div className="grid grid-cols-12 gap-x-5 gap-y-8 xl:gap-x-8">
          {related.map((blogPost, index) => (
            <RevealAnimation
              key={blogPost.slug}
              delay={index * 0.1}
              className="col-span-12 md:col-span-6 lg:col-span-4"
            >
              <BlogCard
                title={blogPost.title}
                href={`/blog/${blogPost.slug}`}
                imageSrc={blogPost.thumbnail}
                imageAlt={blogPost.title}
                author={blogPost.author}
                authorImageSrc={blogPost.authorImage}
                date={blogPost.publishDate}
                category={categoryLabel(blogPost)}
              />
            </RevealAnimation>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedBlog;
