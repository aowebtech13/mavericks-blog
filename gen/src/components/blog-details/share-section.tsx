'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { SocialIcons } from '@/src/components/shared/social-icons';

export interface ShareSectionProps {
  title?: string;
  description?: string;
  imageUrl?: string;
  shareLabel?: string;
  copyLabel?: string;
  copyCopiedLabel?: string;
}

const ShareSection = ({
  title = 'Share this post',
  description = '',
  imageUrl = '',
  shareLabel = 'Share this post',
  copyLabel = 'Copy link',
  copyCopiedLabel = 'Copied!',
}: ShareSectionProps) => {
  const pathname = usePathname();
  const [shareUrl, setShareUrl] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShareUrl(`${window.location.origin}${pathname}`);
    }
  }, [pathname]);

  // Build a short, engaging share text that includes the title + excerpt.
  const shareText = [title, description].filter(Boolean).join(' — ');

  const shareLinks = [
    {
      name: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareUrl
      )}`,
    },
    {
      name: 'X',
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        shareUrl
      )}&text=${encodeURIComponent(shareText)}`,
    },
    {
      name: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        shareUrl
      )}`,
    },
    {
      name: 'WhatsApp',
      href: `https://api.whatsapp.com/send?text=${encodeURIComponent(
        `${shareText} ${shareUrl}`
      )}`,
    },
    {
      name: 'Telegram',
      href: `https://t.me/share/url?url=${encodeURIComponent(
        shareUrl
      )}&text=${encodeURIComponent(shareText)}`,
    },
  ];

  const handleCopyLink = async () => {
    if (!shareUrl) return;
    try {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = shareUrl;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Silently ignore clipboard failures
    }
  };

  return (
    <div>
      <p className="text-tagline-2 mb-4 font-normal text-white/80">{shareLabel}</p>
      <div className="flex flex-wrap items-center gap-3">
        <SocialIcons
          links={shareLinks}
          iconClassName="stroke-white [stroke-opacity:0.6]"
        />
        <button
          type="button"
          onClick={handleCopyLink}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-xs font-medium text-white/80 transition-colors hover:border-white/30 hover:bg-white/5"
          aria-label={copied ? copyCopiedLabel : copyLabel}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-3.5"
          >
            <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
            <path d="M4 16c0 1.1.9 2 2 2h10" />
          </svg>
          {copied ? copyCopiedLabel : copyLabel}
        </button>
      </div>
      <hr className="border-t-stroke-3/25 my-6 h-px border-t" />
    </div>
  );
};

export default ShareSection;