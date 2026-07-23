export interface FooterNavItem {
  label: string;
  href: string;
}

export interface FooterColumnData {
  title: string;
  items: readonly FooterNavItem[];
}

export interface FooterSocialLink {
  name: string;
  href: string;
}

export interface FooterContact {
  addressTitle: string;
  address: string;
  contactTitle: string;
  phone: string;
  phoneHref: string;
  email: string;
  emailHref: string;
}

export const footerContact: FooterContact = {
  addressTitle: 'Address:',
  address: '30 North Gould Street, Sheridan, WY 8280',
  contactTitle: 'Contact:',
  phone: '+1 (202) 555-0130',
  phoneHref: 'tel:+12025550130',
  email: 'hello@pixels71.com',
  emailHref: 'mailto:hello@pixels71.com',
};

export const footerSocialLinks: readonly FooterSocialLink[] = [
  { name: 'Facebook', href: '#' },
  { name: 'Instagram', href: '#' },
  { name: 'X', href: '#' },
  { name: 'LinkedIn', href: '#' },
  { name: 'YouTube', href: '#' },
];

export const footerColumns: readonly FooterColumnData[] = [
  {
    title: 'Products',
    items: [
      { label: 'Pricing', href: '/pricing' },
      { label: 'Keyword Generator', href: '/' },
      { label: 'API & Docs', href: '/project-details' },
      { label: 'Integrations', href: '/brandkit' },
      { label: 'Changelog', href: '/press' },
    ],
  },
  {
    title: 'Platform',
    items: [
      { label: 'Sign Up', href: '/signup' },
      { label: 'Login', href: '/login' },
      { label: 'Project Details', href: '/project-details' },
      { label: 'Download', href: '/download' },
      { label: 'Resources', href: '/resources' },
    ],
  },
  {
    title: 'Company',
    items: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Blog', href: '/blog' },
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  },
];

export const footerLegalLinks: readonly FooterNavItem[] = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
  { label: 'Cookie Settings', href: '#' },
];

export const footerCopyrightHolder = 'pixels71';
