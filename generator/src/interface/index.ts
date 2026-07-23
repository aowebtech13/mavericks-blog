export interface MobileMenuSubItem {
  id: string;
  label: string;
  href: string;
}

export interface MobileMenuData {
  id: string;
  title: string;
  submenu: MobileMenuSubItem[];
}

export type TeamMember = {
  name: string;
  position: string;
  image: string;
  href: string;
};

/** Blog markdown (see `src/data/blog`) */
export interface BlogPost {
  slug: string;
  content: string;
  title: string;
  titleItalic?: string;
  author: string;
  authorImage: string;
  category?: string;
  publishDate: string;
  readTime: string;
  thumbnail: string;
  tags: string[];
  description?: string;
  showHomepage?: boolean;
  related?: string[];
  featured?: boolean;
  popular?: boolean;
  [key: string]: unknown;
}

export interface BlogCategory {
  label: string;
  count: number;
}

export interface BlogDateRecord {
  date: string;
  displayDate: string;
  count: number;
}
