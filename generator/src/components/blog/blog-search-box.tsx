'use client';

import { CrossIcon, SearchIcon } from '@/src/components/shared/icon';
import { useRouter } from 'next/navigation';
import type { ComponentPropsWithoutRef } from 'react';
import { useEffect, useState } from 'react';

interface BlogSearchBoxProps {
  defaultValue?: string;
}

const BlogSearchBox = (props: Readonly<BlogSearchBoxProps>) => {
  const { defaultValue = '' } = props;
  const router = useRouter();
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const isShowingSearchResults = (defaultValue ?? '').trim().length > 0;

  const handleSubmit: ComponentPropsWithoutRef<'form'>['onSubmit'] = (e) => {
    e.preventDefault();
    const q = value.trim();
    if (q) {
      router.push(`/blog?search=${encodeURIComponent(q)}`);
    } else {
      router.push('/blog');
    }
  };

  const handleReset = () => {
    setValue('');
    router.push('/blog');
  };

  return (
    <form className="block" onSubmit={handleSubmit}>
      <fieldset className="border-stroke-3/25 relative overflow-hidden rounded-lg border p-px">
        <div className="ai-kw-generator-border-animation size-[40px]" aria-hidden="true" />
        <div className="from-background-3 to-background-5 relative z-20 flex h-full w-full max-w-full flex-col justify-end overflow-hidden rounded-lg bg-radial-[52.78%_57.9%_at_3.87%_7.86%]">
          <input
            type="text"
            placeholder="Search"
            name="search"
            required
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="text-tagline-2 focus:border-stroke-3/30 placeholder:text-tagline-2 placeholder:font-inter-tight block w-full max-w-full py-3 pr-11 pl-[18px] text-white placeholder:font-normal placeholder:text-white/50 focus:outline-none"
          />
          <span className="absolute top-[55%] right-4 inline-block -translate-y-1/2">
            {isShowingSearchResults ? (
              <button
                type="button"
                onClick={handleReset}
                className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer p-0.5 text-white/60 transition-colors hover:text-white"
                aria-label="Clear search"
              >
                <CrossIcon className="size-5 fill-white" />
              </button>
            ) : (
              <button type="submit" className="cursor-pointer" aria-label="Search">
                <SearchIcon />
              </button>
            )}
          </span>
        </div>
      </fieldset>
    </form>
  );
};

export default BlogSearchBox;
