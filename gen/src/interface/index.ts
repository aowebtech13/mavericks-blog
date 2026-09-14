export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  thumbnail: string;
  author: string;
  authorImage: string;
  publishDate: string;
  readTime: string;
  category?: string;
  tags?: string[];
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

export interface MobileSubmenuItem {
  id: string;
  label: string;
  href: string;
}

export interface MobileMenuData {
  id: string;
  title: string;
  submenu: MobileSubmenuItem[];
}
