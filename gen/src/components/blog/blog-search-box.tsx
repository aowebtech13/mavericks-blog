'use client';

import { CrossIcon, SearchIcon, DownArrowIcon } from '@/src/components/shared/icon';
import { useRouter, useSearchParams } from 'next/navigation';
import type { ComponentPropsWithoutRef } from 'react';
import { useEffect, useState } from 'react';

interface CategoryOption {
  label: string;
  slug: string;
}

interface BlogSearchBoxProps {
  defaultValue?: string;
  categories?: CategoryOption[];
  defaultCategory?: string;
}

const BlogSearchBox = (props: Readonly<BlogSearchBoxProps>) => {
  const { defaultValue = '', categories = [], defaultCategory = '' } = props;
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(defaultValue);
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    setSelectedCategory(defaultCategory);
  }, [defaultCategory]);

  const isShowingSearchResults = (defaultValue ?? '').trim().length > 0 || selectedCategory.length > 0;

  const handleSubmit: ComponentPropsWithoutRef<'form'>['onSubmit'] = (e) => {
    e.preventDefault();
    const q = value.trim();
    const params = new URLSearchParams();
    if (q) params.set('search', q);
    if (selectedCategory) params.set('category', selectedCategory);
    router.push(`/blog?${params.toString()}`);
  };

  const handleReset = () => {
    setValue('');
    setSelectedCategory('');
    router.push('/blog');
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setIsCategoryOpen(false);
    const q = value.trim();
    const params = new URLSearchParams();
    if (q) params.set('search', q);
    if (category) params.set('category', category);
    router.push(`/blog?${params.toString()}`);
  };

  return (
    <form className="block" onSubmit={handleSubmit}>
      <fieldset className="border-stroke-3/25 relative overflow-hidden rounded-lg border p-px">
        <div className="ai-kw-generator-border-animation size-[40px]" aria-hidden="true" />
        <div className="from-background-3 to-background-5 relative z-20 flex h-full w-full max-w-full flex-col justify-end overflow-hidden rounded-lg bg-radial-[52.78%_57.9%_at_3.87%_7.86%]">
          <div className="flex items-center gap-2 w-full">
            {categories.length > 0 && (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  className={`flex items-center gap-1.5 px-3 py-3 text-sm text-white/70 hover:text-white transition-colors ${
                    selectedCategory ? 'text-white' : ''
                  }`}
                  aria-label="Select category"
                  aria-expanded={isCategoryOpen}
                >
                  <span>{selectedCategory || 'All Categories'}</span>
                  <DownArrowIcon className={`size-4 transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} />
                </button>
                {isCategoryOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-background-13 border border-stroke-3/25 rounded-lg shadow-lg overflow-hidden z-50">
                    <button
                      type="button"
                      onClick={() => handleCategoryChange('')}
                      className={`w-full px-3 py-2 text-left text-sm transition-colors ${
                        !selectedCategory ? 'bg-background-7 text-background-13' : 'text-white/70 hover:bg-background-7 hover:text-white'
                      }`}
                    >
                      All Categories
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat.slug}
                        type="button"
                        onClick={() => handleCategoryChange(cat.label)}
                        className={`w-full px-3 py-2 text-left text-sm transition-colors ${
                          selectedCategory === cat.label ? 'bg-background-7 text-background-13' : 'text-white/70 hover:bg-background-7 hover:text-white'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search articles..."
                name="search"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="text-tagline-2 focus:border-stroke-3/30 placeholder:text-tagline-2 placeholder:font-system block w-full max-w-full py-3 pr-11 pl-4 text-white placeholder:font-normal placeholder:text-white/50 focus:outline-none bg-transparent"
              />
              <span className="absolute top-1/2 right-3 -translate-y-1/2">
                {isShowingSearchResults ? (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="cursor-pointer p-0.5 text-white/60 transition-colors hover:text-white"
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
          </div>
        </div>
      </fieldset>
    </form>
  );
};

export default BlogSearchBox;
