import type { Metadata } from 'next';

export const DEFAULT_URL = 'https://next-saas-next.vercel.app/';
export const DEFAULT_TITLE = 'maverisks - Software, SaaS & Startup Tailwind Template';
export const DEFAULT_DESCRIPTION =
  'maverisks - the ultimate collection of 42+ premium Nextjs templates for SaaS businesses and startups. Built with Tailwind CSS, featuring responsive design, authentication flows, pricing pages, and modern UI components. Perfect for web applications and digital products.';
export const DEFAULT_IMAGE_URL =
  'https://images.prismic.io/staticmania/aPD-K55xUNkB2D2X_og-image.jpg';

const defaultMetadata: Metadata = {
  metadataBase: new URL(DEFAULT_URL),
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  openGraph: {
    type: 'website',
    siteName: 'maverisks',
    url: DEFAULT_URL,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [{ url: DEFAULT_IMAGE_URL, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_IMAGE_URL],
  },
};

export interface ArticleMetadataOptions {
  type?: 'website' | 'article' | 'profile' | 'book' | string;
  authors?: string[];
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
  locale?: string;
}

const generateMetadata = (
  title?: string,
  description?: string,
  canonicaUrl?: string,
  imageUrl?: string,
  options?: ArticleMetadataOptions,
): Metadata => {
  const ogImages = imageUrl
    ? [{ url: imageUrl, width: 1200, height: 630 }]
    : defaultMetadata.openGraph?.images;

  const og: Record<string, unknown> = {
    ...defaultMetadata.openGraph,
    title: title ?? defaultMetadata.openGraph?.title,
    description: description ?? defaultMetadata.openGraph?.description,
    url: canonicaUrl ?? defaultMetadata.openGraph?.url,
    images: ogImages,
  };

  if (options?.type) {
    og.type = options.type;
  }
  if (options?.locale) {
    og.locale = options.locale;
  }
  if (options?.authors) {
    og.authors = options.authors;
  }
  if (options?.publishedTime || options?.modifiedTime || options?.tags || options?.authors) {
    og.article = {
      ...(options.publishedTime ? { publishedTime: options.publishedTime } : {}),
      ...(options.modifiedTime ? { modifiedTime: options.modifiedTime } : {}),
      ...(options.authors ? { authors: options.authors } : {}),
      ...(options.tags ? { tags: options.tags } : {}),
    };
  }

  return {
    ...defaultMetadata,
    title: title ?? defaultMetadata.title,
    description: description ?? defaultMetadata.description,
    alternates: {
      canonical: canonicaUrl,
    },
    openGraph: og as NonNullable<Metadata['openGraph']>,
    twitter: {
      ...defaultMetadata.twitter,
      title: title ?? defaultMetadata.twitter?.title,
      description: description ?? defaultMetadata.twitter?.description,
      images: imageUrl ? [imageUrl] : defaultMetadata.twitter?.images,
    },
  };
};

export { defaultMetadata, generateMetadata };
