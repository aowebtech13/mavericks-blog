import RevealAnimation from '@/src/components/animation/reveal-animation';
import { TextReveal } from '@/src/components/animation/text-reveal-animation';
import BlogPagination from '@/src/components/blog/blog-pagination';
import BlogSidebar from '@/src/components/blog/blog-sidebar';
import { BlogCard } from '@/src/components/shared/ui/card/blog-card';
import type { BlogCategory, BlogDateRecord, BlogPost } from '@/src/interface';
import type { FC } from 'react';

interface FeaturedArticlesProps {
  posts: BlogPost[];
  allPosts: BlogPost[];
  totalPages: number;
  currentPage: number;
  categories: BlogCategory[];
  dateRecords: BlogDateRecord[];
  currentCategory: string | null;
  currentSearch: string | null;
  currentDate: string | null;
}

const categoryLabel = (post: BlogPost) => post.category?.trim() || post.tags?.[0] || 'Blog';

const FeaturedArticles: FC<FeaturedArticlesProps> = ({
  posts,
  allPosts,
  totalPages,
  currentPage,
  categories,
  dateRecords,
  currentCategory,
  currentSearch,
  currentDate,
}) => {
  return (
    <section aria-label="Blog listing">
      <div className="main-container">
        <div className="mb-18 space-y-3 text-left">
          <TextReveal>
            <h2 className="lg:text-sora-heading-2 md:text-sora-heading-3 text-sora-heading-4 font-normal text-white/90">
              Featured articles
            </h2>
          </TextReveal>
          <TextReveal delay={0.1}>
            <p className="text-tagline-2 font-normal text-white/60">
              Level up your SEO, content strategy, and AI workflows.
            </p>
          </TextReveal>
        </div>
        <div className="flex flex-col items-start gap-y-12 lg:flex-row lg:gap-x-10 xl:gap-x-14 2xl:gap-x-18">
          <BlogSidebar
            posts={allPosts}
            categories={categories}
            dateRecords={dateRecords}
            currentCategory={currentCategory}
            currentSearch={currentSearch}
            currentDate={currentDate}
          />

          <RevealAnimation delay={0.2}>
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
                <BlogPagination
                  totalPages={totalPages}
                  currentPage={currentPage}
                  currentCategory={currentCategory}
                  currentSearch={currentSearch}
                  currentDate={currentDate}
                  pageParam="page"
                />
              </div>
            </div>
          </RevealAnimation>
        </div>
      </div>
    </section>
  );
};

export default FeaturedArticles;
