'use client';

import { COUNTRIES, type Country } from '@/src/data/countries';
import { cn } from '@/src/utils/cn';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

interface CountryDropdownProps {
  /** Base URL the dropdown navigates to when a country is selected. */
  basePath?: string;
  /** Optional override for the currently selected country (controlled). */
  currentCountry?: string | null;
  /** Optional className applied to the trigger button. */
  className?: string;
}

const CountryDropdown = ({
  basePath = '/blog',
  currentCountry: controlledCountry,
  className,
}: CountryDropdownProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync from URL params when not controlled
  useEffect(() => {
    if (controlledCountry !== undefined) {
      setSelectedCountry(controlledCountry);
      return;
    }
    const countryParam = searchParams.get('country');
    setSelectedCountry(countryParam ? countryParam.toUpperCase() : null);
  }, [controlledCountry, searchParams]);

  // Close on outside click
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const selected: Country | undefined = COUNTRIES.find(
    (c) => c.code === selectedCountry,
  );

  const buildUrl = (code: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (code) {
      params.set('country', code);
    } else {
      params.delete('country');
    }
    // Reset pagination when filtering
    params.delete('page');
    const qs = params.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  };

  const handleSelect = (code: string | null) => {
    setSelectedCountry(code);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Filter by country"
        aria-expanded={isOpen}
        className={cn(
          'flex items-center gap-2 rounded-md border border-stroke-3/25 bg-background-3/40 px-3 py-2 text-sm text-white/80 transition-all duration-200 hover:bg-background-7',
          isOpen && 'border-stroke-3/60 bg-background-7',
        )}
      >
        {selected ? (
          <>
            <span className="relative inline-flex size-4 overflow-hidden rounded-sm">
              <Image
                src={selected.flag}
                alt={selected.name}
                fill
                sizes="16px"
                className="object-cover"
                unoptimized
              />
            </span>
            <span className="max-w-[140px] truncate">{selected.name}</span>
          </>
        ) : (
          <>
            <span className="flex size-4 items-center justify-center rounded-sm bg-white/10 text-[8px] font-bold">
              All
            </span>
            <span>All countries</span>
          </>
        )}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={12}
          height={12}
          viewBox="0 0 12 12"
          fill="none"
          className={cn('ml-auto transition-transform', isOpen && 'rotate-180')}
        >
          <path
            d="M2.5 4.5L6 8L9.5 4.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 max-h-72 overflow-y-auto rounded-lg border border-stroke-3/25 bg-background-13 shadow-lg">
          <Link
            href={buildUrl(null)}
            onClick={() => handleSelect(null)}
            className={cn(
              'flex w-full items-center gap-2 px-3 py-2 text-sm transition-colors',
              !selectedCountry
                ? 'bg-background-7 text-background-13'
                : 'text-white/70 hover:bg-background-7 hover:text-white',
            )}
          >
            <span className="flex size-4 items-center justify-center rounded-sm bg-white/10 text-[8px] font-bold">
              All
            </span>
            <span>All countries</span>
          </Link>
          {COUNTRIES.map((country) => (
            <Link
              key={country.code}
              href={buildUrl(country.code)}
              onClick={() => handleSelect(country.code)}
              className={cn(
                'flex w-full items-center gap-2 px-3 py-2 text-sm transition-colors',
                selectedCountry === country.code
                  ? 'bg-background-7 text-background-13'
                  : 'text-white/70 hover:bg-background-7 hover:text-white',
              )}
            >
              <span className="relative inline-flex size-4 overflow-hidden rounded-sm">
                <Image
                  src={country.flag}
                  alt={country.name}
                  fill
                  sizes="16px"
                  className="object-cover"
                  unoptimized
                />
              </span>
              <span className="truncate">{country.name}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CountryDropdown;