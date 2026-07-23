'use client';

import { cn } from '@/src/utils/cn';
import gsap from 'gsap';
import { useLayoutEffect, useRef, useState } from 'react';

export interface HeroFileUploadProps {
  className?: string;
}

const HeroFileUpload = ({ className }: HeroFileUploadProps) => {
  const [fileLabel, setFileLabel] = useState<string | null>(null);
  const [layoutExpanded, setLayoutExpanded] = useState(false);

  const labelRef = useRef<HTMLLabelElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const iconRef = useRef<SVGSVGElement>(null);
  const nameWrapperRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!fileLabel || !layoutExpanded) return;

    const container = labelRef.current;
    const wrapper = nameWrapperRef.current;
    if (!container || !wrapper) return;

    gsap.killTweensOf([container, wrapper, iconRef.current].filter(Boolean));

    gsap.fromTo(
      container,
      { width: 36 },
      { width: container.offsetWidth, duration: 0.3, ease: 'linear' }
    );
    gsap.fromTo(
      wrapper,
      { opacity: 0, x: -10 },
      { opacity: 1, x: 0, duration: 0.3, ease: 'power3.out' }
    );
  }, [fileLabel, layoutExpanded]);

  useLayoutEffect(
    () => () =>
      gsap.killTweensOf(
        [labelRef.current, nameWrapperRef.current, iconRef.current].filter(Boolean)
      ),
    []
  );

  return (
    <label
      ref={labelRef}
      className={cn(
        'flex cursor-pointer items-center justify-center rounded-full bg-white/10 px-2 hover:bg-white/20',
        layoutExpanded ? 'h-9 min-w-fit' : 'size-9 min-w-9',
        className
      )}
      aria-label="Link or attach"
    >
      <input
        ref={inputRef}
        type="file"
        className="peer sr-only"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          setFileLabel(file.name);
          setLayoutExpanded(true);
        }}
      />

      <svg
        ref={iconRef}
        className={cn(fileLabel && 'hidden')}
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="16"
        viewBox="0 0 15 16"
        fill="none"
        aria-hidden
      >
        <path
          d="M9.87454 4.25L3.36612 10.8665C3.1317 11.1009 3 11.4189 3 11.7504C3 12.0819 3.1317 12.3998 3.36612 12.6343C3.60054 12.8687 3.91848 13.0004 4.25 13.0004C4.58152 13.0004 4.89946 12.8687 5.13388 12.6343L12.8923 4.76777C13.1245 4.53562 13.3086 4.26002 13.4342 3.95671C13.5599 3.65339 13.6245 3.3283 13.6245 3C13.6245 2.6717 13.5599 2.34661 13.4342 2.04329C13.3086 1.73998 13.1245 1.46438 12.8923 1.23223C12.6602 1.00009 12.3846 0.815938 12.0813 0.690301C11.7779 0.564665 11.4528 0.5 11.1245 0.5C10.7962 0.5 10.4711 0.564664 10.1678 0.690301C9.86452 0.815938 9.58892 1.00009 9.35678 1.23223L1.59835 9.09873C0.895088 9.80199 0.5 10.7558 0.5 11.7504C0.5 12.7449 0.895088 13.6988 1.59835 14.402C2.30161 15.1053 3.25544 15.5004 4.25 15.5004C5.24456 15.5004 6.19839 15.1053 6.90165 14.402L13.312 8"
          className="stroke-white"
          strokeOpacity={0.6}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <div
        ref={nameWrapperRef}
        className={cn('items-center gap-1.5 px-2', fileLabel ? 'flex' : 'hidden')}
      >
        <span className="font-inter-tight text-tagline-4 max-w-[120px] truncate font-normal text-white/80">
          {fileLabel}
        </span>
        <button
          type="button"
          className="flex size-4 items-center justify-center rounded-full transition-colors duration-200 ease-in-out hover:bg-white/20"
          aria-label="Remove file"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();

            const container = labelRef.current;
            const wrapper = nameWrapperRef.current;
            const icon = iconRef.current;
            const input = inputRef.current;
            if (!container || !wrapper || !input) return;

            gsap.killTweensOf([container, wrapper, icon].filter(Boolean));

            gsap.to(wrapper, {
              opacity: 0,
              x: -10,
              duration: 0.3,
              ease: 'power3.in',
              onComplete: () => {
                input.value = '';
                setFileLabel(null);

                gsap.to(container, {
                  width: 36,
                  duration: 0.3,
                  ease: 'power3.out',
                  onComplete: () => {
                    setLayoutExpanded(false);
                    gsap.set(container, { clearProps: 'width' });
                  },
                });

                if (icon) {
                  gsap.fromTo(
                    icon,
                    { opacity: 0, scale: 0.8 },
                    { opacity: 1, scale: 1, duration: 0.3, ease: 'power3.out' }
                  );
                }
              },
            });
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            aria-hidden
          >
            <path
              d="M7.5 2.5L2.5 7.5M2.5 2.5L7.5 7.5"
              stroke="white"
              strokeOpacity={0.8}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </label>
  );
};

export default HeroFileUpload;
