import type { MobileMenuData } from '@/src/interface';

export const mobileMenuData: MobileMenuData[] = [
  {
    id: 'navigation',
    title: 'Menu',
    submenu: [
      { id: 'home', label: 'Home', href: 'https://blog.mavericksai.tech/blog' },
      { id: 'blog', label: 'Blog', href: 'https://blog.mavericksai.tech/blog' },
      { id: 'register', label: 'Register', href: '/register' },
      { id: 'stenographer-login', label: 'Stenographer Login', href: '/stenographer-login' },
    ],
  },
];
