import { MobileMenuData } from '../interface';

export const mobileMenuData: MobileMenuData[] = [
  {
    id: 'navigation',
    title: 'Menu',
    submenu: [
      { id: 'home', label: 'Home', href: '/' },
      { id: 'blog', label: 'Blog', href: '/blog' },
      { id: 'register', label: 'Register', href: '/register' },
      { id: 'stenographer-login', label: 'Stenographer Login', href: '/stenographer-login' },
    ],
  },
];
