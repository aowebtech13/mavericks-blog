'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { SocialIcons } from '@/src/components/shared/social-icons';

export interface ShareSectionProps {
  title?: string;
}

const ShareSection = ({ title = 'Share this post' }: ShareSectionProps) => {
  const pathname = usePathname();
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShareUrl(`${window.location.origin}${pathname}`);
    }
  }, [pathname]);

  const shareLinks = [
    {
      name: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: 'X',
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`,
    },
    {
      name: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: 'WhatsApp',
      href: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} ${shareUrl}`)}`,
    },
    {
      name: 'Telegram',
      href: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`,
    },
  ];

  return (
    <div>
      <p className="text-tagline-2 mb-4 font-normal text-white/80">{title}</p>
      <SocialIcons
        links={shareLinks}
        iconClassName="stroke-white [stroke-opacity:0.6]"
      />
      <hr className="border-t-stroke-3/25 my-6 h-px border-t" />
    </div>
  );
};

export default ShareSection;