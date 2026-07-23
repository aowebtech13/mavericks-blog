import RevealAnimation from '@/src/components/animation/reveal-animation';
import { SocialIcons } from '@/src/components/shared/social-icons';
import { footerSocialLinks } from '@/src/data/footer';
import Image from 'next/image';
import type { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeSlug from 'rehype-slug';

export interface BlogDetailsContentProps {
  blog: { data: Record<string, unknown>; content: string };
}

const formatDisplayDate = (dateStr: string) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
};

const BlogDetailsContent: FC<BlogDetailsContentProps> = ({ blog }) => {
  const data = blog?.data ?? {};
  const title = (data?.title as string) ?? '';
  const author = (data?.author as string) ?? '';
  const authorImage = (data?.authorImage as string) ?? '';
  const publishDate = (data?.publishDate as string) ?? '';
  const readTime = (data?.readTime as string) ?? '';
  const thumbnail = (data?.thumbnail as string) ?? '';

  return (
    <section className="pt-32 xl:pt-40 2xl:pt-50">
      <div className="main-container">
        <div className="mx-auto mb-28 w-full max-w-[1050px] flex-auto space-y-[70px]">
          <div className="space-y-12 lg:space-y-20">
            <RevealAnimation delay={0.1}>
              <figure className="h-[600px] overflow-hidden rounded-lg">
                <Image
                  src={thumbnail}
                  alt={title || 'blog'}
                  width={1200}
                  height={640}
                  className="w-full object-cover"
                />
              </figure>
            </RevealAnimation>
            <RevealAnimation delay={0.2}>
              <div className="blog-details-markdown">
                <ReactMarkdown rehypePlugins={[[rehypeSlug]]}>{blog?.content ?? ''}</ReactMarkdown>
              </div>
            </RevealAnimation>
          </div>

          <RevealAnimation delay={0.3}>
            <div>
              <p className="text-tagline-2 mb-4 font-normal text-white/80">Share this post</p>
              <SocialIcons
                links={footerSocialLinks}
                iconClassName="stroke-white [stroke-opacity:0.6]"
              />
              <hr className="border-t-stroke-3/25 my-6 h-px border-t" />
              <div className="flex items-center gap-3">
                <figure className="size-12 overflow-hidden rounded-full">
                  <Image
                    src={authorImage}
                    alt={author}
                    width={48}
                    height={48}
                    className="size-full object-cover"
                  />
                </figure>
                <div>
                  <p className="text-tagline-2 font-medium text-white/80">{author}</p>
                  <p className="flex items-center gap-2">
                    <span className="text-tagline-3 font-normal text-white/60">
                      {formatDisplayDate(publishDate)}
                    </span>
                    <span className="block size-1.5 rounded-full bg-white/60" />
                    <span className="text-tagline-3 font-normal text-white/60">{readTime}</span>
                  </p>
                </div>
              </div>
            </div>
          </RevealAnimation>
        </div>
      </div>
    </section>
  );
};

export default BlogDetailsContent;
