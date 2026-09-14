import { PaginationNextIcon, PaginationPrevIcon } from '@/src/components/shared/icon';
import { PaginationItem } from '@/src/components/shared/ui/pagination/pagination-item';
import { PaginationWrapper } from '@/src/components/shared/ui/pagination/pagination-wrapper';

export type BlogPaginationPageParam = 'page' | 'popularPage';

function buildPageUrl(
  targetPage: number,
  currentCategory: string | null,
  currentSearch: string | null,
  currentDate: string | null,
  pageParam: BlogPaginationPageParam,
  otherPage: number
): string {
  const params = new URLSearchParams();
  if (currentCategory) params.set('category', currentCategory);
  else if (currentSearch) params.set('search', currentSearch);
  else if (currentDate) params.set('date', currentDate);

  const mainPage = pageParam === 'page' ? targetPage : otherPage;
  const popularPage = pageParam === 'popularPage' ? targetPage : otherPage;

  if (mainPage > 1) params.set('page', String(mainPage));
  if (popularPage > 1) params.set('popularPage', String(popularPage));

  const q = params.toString();
  return q ? `/blog?${q}` : '/blog';
}

export interface BlogPaginationProps {
  totalPages: number;
  currentPage: number;
  currentCategory: string | null;
  currentSearch: string | null;
  currentDate: string | null;
  pageParam?: BlogPaginationPageParam;
  /** The other paginator&apos;s current page (e.g. popular when this is main). */
  otherPage?: number;
}

const BlogPagination = ({
  totalPages,
  currentPage,
  currentCategory,
  currentSearch,
  currentDate,
  pageParam = 'page',
  otherPage = 1,
}: BlogPaginationProps) => {
  if (totalPages <= 1) return null;

  const prevUrl = buildPageUrl(
    currentPage - 1,
    currentCategory,
    currentSearch,
    currentDate,
    pageParam,
    otherPage
  );
  const nextUrl = buildPageUrl(
    currentPage + 1,
    currentCategory,
    currentSearch,
    currentDate,
    pageParam,
    otherPage
  );

  const maxVisible = 5;
  let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  const end = Math.min(totalPages, start + maxVisible - 1);
  if (end - start + 1 < maxVisible) start = Math.max(1, end - maxVisible + 1);
  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  return (
    <PaginationWrapper>
      <PaginationItem href={currentPage > 1 ? prevUrl : undefined} disabled={currentPage <= 1}>
        <PaginationPrevIcon />
      </PaginationItem>

      {pages.map((page) => (
        <PaginationItem
          key={page}
          href={buildPageUrl(
            page,
            currentCategory,
            currentSearch,
            currentDate,
            pageParam,
            otherPage
          )}
          active={page === currentPage}
        >
          {page}
        </PaginationItem>
      ))}

      <PaginationItem
        href={currentPage < totalPages ? nextUrl : undefined}
        disabled={currentPage >= totalPages}
      >
        <PaginationNextIcon />
      </PaginationItem>
    </PaginationWrapper>
  );
};

export default BlogPagination;
