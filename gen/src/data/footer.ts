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
  address: 'Lagos, Nigeria',
  contactTitle: 'Contact:',
  phone: '+234 803 615 8520',
  phoneHref: 'tel:++234 803 615 8520',
  email: 'support@mages.mavericksai.tech',
  emailHref: 'mailto:support@mages.mavericksai.tech',
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
    title: 'Blog',
    items: [
      { label: 'All Posts', href: '/blog' },
      { label: 'Featured', href: '/blog' },
      { label: 'Recent', href: '/blog' },
    ],
  },
  {
    title: 'Company',
    items: [
    
      { label: 'Privacy Policy', href: 'https://www.mavericksai.tech/contact' },
      { label: 'Terms of Service', href: 'https://www.mavericksai.tech/contact' },
    ],
  },
];

export const footerLegalLinks: readonly FooterNavItem[] = [
  { label: 'Privacy Policy', href: 'https://www.mavericksai.tech/contact' },
  { label: 'Terms of Service', href: 'https://www.mavericksai.tech/contact' },

];

export const footerCopyrightHolder = 'MavericksAi';
