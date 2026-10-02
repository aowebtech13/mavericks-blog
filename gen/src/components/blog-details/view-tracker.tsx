'use client';

import { trackPostView } from '@/src/services/posts';
import { useEffect, useRef, useState } from 'react';

export interface ViewTrackerProps {
  slug: string;
  /** Server-rendered count, shown immediately to avoid a flash of zero. */
  initialViews?: number;
  className?: string;
}

const formatViews = (count: number): string =>
  new Intl.NumberFormat('en-US').format(Math.max(0, count));

/**
 * Records a real page view once per post per browser session and renders the
 * live view count.
 *
 * This must stay a client component: tracking on the server would count
 * metadata generation, prefetching and crawlers as real readership.
 */
const ViewTracker: React.FC<ViewTrackerProps> = ({
  slug,
  initialViews = 0,
  className,
}) => {
  const [views, setViews] = useState(initialViews);
  // Guards against React 18 StrictMode double-invoked effects in dev.
  const firedRef = useRef(false);

  useEffect(() => {
    if (firedRef.current) return;
    firedRef.current = true;

    // Session-level guard: navigating back to the post in the same session
    // should not inflate the counter. The backend de-duplicates too, this just
    // saves a round trip.
    const storageKey = `viewed:${slug}`;
    try {
      if (window.sessionStorage.getItem(storageKey)) return;
      window.sessionStorage.setItem(storageKey, '1');
    } catch {
      // Private browsing / storage disabled — fall through and let the
      // server-side de-duplication handle it.
    }

    let cancelled = false;

    trackPostView(slug)
      .then((count) => {
        if (!cancelled) setViews(count);
      })
      .catch(() => {
        // Tracking is non-critical — keep the server-rendered value.
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  return (
    <span className={className} data-testid="post-view-count">
      {formatViews(views)} {views === 1 ? 'view' : 'views'}
    </span>
  );
};

export default ViewTracker;
