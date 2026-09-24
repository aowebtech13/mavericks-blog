import RevealAnimation from '@/src/components/animation/reveal-animation';
import { BlogCard } from '@/src/components/shared/ui/card/blog-card';
import {
  PaginationNextIcon,
  PaginationPrevIcon,
} from '@/src/components/shared/icon';
import { PaginationItem } from '@/src/components/shared/ui/pagination/pagination-item';
import { PaginationWrapper } from '@/src/components/shared/ui/pagination/pagination-wrapper';
import type { BlogPost } from '@/src/interface';
import type { FC } from 'react';

interface RecentPostsProps {
  posts: BlogPost[];
  totalPages: number;
  currentPage: number;
}

const categoryLabel = (post: BlogPost) => post.category?.trim() || post.tags?.[0] || 'Blog';

const buildRecentUrl = (page: number): string =>
  page > 1 ? `/blog/recent?page=${page}` : '/blog/recent';

const RecentPosts: FC<RecentPostsProps> = ({
  posts,
  totalPages,
  currentPage,
}) => {
  if (posts.length === 0) {
    return (
      <section aria-label="Recent posts">
        <div className="main-container">
          <RevealAnimation>
            <div className="border-stroke-3/25 from-background-3 to-background-5 rounded-lg border bg-radial-[52.78%_57.9%_at_3.87%_7.86%] px-8 py-10.5 text-center">
              <p className="font-system text-tagline-3 text-white/70">
                No recent posts available at the moment. Check back soon.
              </p>
            </div>
          </RevealAnimation>
        </div>
      </section>
    );
  }

  return (
    <section aria-label="Recent posts">
      <div className="main-container">
        <RevealAnimation delay={0.1}>
          <div className="w-full flex-auto space-y-39 pb-28 lg:pb-39">
            <div className="space-y-14">
              <div className="grid grid-cols-12 gap-x-5 gap-y-[70px] 2xl:gap-x-8">
                {posts.map((post, index) => (
                  <RevealAnimation
                    key={post.slug}
                    delay={0.1 + (index % 2) * 0.1}
                    className="col-span-12 md:col-span-6"
                  >
                    <BlogCard
                      title={post.title}
                      href={`/blog/${post.slug}`}
                      imageSrc={post.thumbnail}
                      imageAlt={post.title}
                      author={post.author}
                      authorImageSrc={post.authorImage}
                      date={post.publishDate}
                      category={categoryLabel(post)}
                    />
                  </RevealAnimation>
                ))}
              </div>

              {totalPages > 1 && (
                <PaginationWrapper>
                  <PaginationItem
                    href={currentPage > 1 ? buildRecentUrl(currentPage - 1) : undefined}
                    disabled={currentPage <= 1}
                  >
                    <PaginationPrevIcon />
                  </PaginationItem>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem
                      key={page}
                      href={buildRecentUrl(page)}
                      active={page === currentPage}
                    >
                      {page}
                    </PaginationItem>
                  ))}

                  <PaginationItem
                    href={currentPage < totalPages ? buildRecentUrl(currentPage + 1) : undefined}
                    disabled={currentPage >= totalPages}
                  >
                    <PaginationNextIcon />
                  </PaginationItem>
                </PaginationWrapper>
              )}
            </div>
          </div>
        </RevealAnimation>
      </div>
    </section>
  );
};

export default RecentPosts;