import { MobileMenuData } from '../interface';

export const mobileMenuData: MobileMenuData[] = [
  {
    id: 'blog',
    title: 'Blog',
    submenu: [
      { id: 'all-posts', label: 'All Posts', href: '/blog' },
      { id: 'featured', label: 'Featured', href: '/blog' },
      { id: 'recent', label: 'Recent', href: '/blog' },
    ],
  },
];
