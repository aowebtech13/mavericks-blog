'use client';

import { CrossIcon, SearchIcon, DownArrowIcon } from '@/src/components/shared/icon';
import { COUNTRIES, getCountryByCode, type Country } from '@/src/data/countries';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
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
  defaultCountry?: string;
}

const BlogSearchBox = (props: Readonly<BlogSearchBoxProps>) => {
  const { defaultValue = '', categories = [], defaultCategory = '', defaultCountry = '' } = props;
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(defaultValue);
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(defaultCountry);
  const [isCountryOpen, setIsCountryOpen] = useState(false);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    setSelectedCategory(defaultCategory);
  }, [defaultCategory]);

  useEffect(() => {
    setSelectedCountry(defaultCountry);
  }, [defaultCountry]);

  // Filter categories based on search input
  const filteredCategories = categories.filter((cat) =>
    cat.label.toLowerCase().includes(value.toLowerCase())
  );

  const isShowingSearchResults = (defaultValue ?? '').trim().length > 0 || selectedCategory.length > 0 || selectedCountry.length > 0;

  const handleSubmit: ComponentPropsWithoutRef<'form'>['onSubmit'] = (e) => {
    e.preventDefault();
    const q = value.trim();
    const params = new URLSearchParams();
    if (q) params.set('search', q);
    if (selectedCategory) params.set('category', selectedCategory);
    if (selectedCountry) params.set('country', selectedCountry);
    router.push(`/blog?${params.toString()}`);
  };

  const handleReset = () => {
    setValue('');
    setSelectedCategory('');
    setSelectedCountry('');
    router.push('/blog');
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setIsCategoryOpen(false);
    const q = value.trim();
    const params = new URLSearchParams();
    if (q) params.set('search', q);
    if (category) params.set('category', category);
    if (selectedCountry) params.set('country', selectedCountry);
    router.push(`/blog?${params.toString()}`);
  };

  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
    setIsCountryOpen(false);
    const q = value.trim();
    const params = new URLSearchParams();
    if (q) params.set('search', q);
    if (selectedCategory) params.set('category', selectedCategory);
    if (country) params.set('country', country);
    router.push(`/blog?${params.toString()}`);
  };

  const selectedCountryObj: Country | undefined = getCountryByCode(selectedCountry);

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
                    {filteredCategories.map((cat) => (
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
                    {filteredCategories.length === 0 && categories.length > 0 && (
                      <div className="w-full px-3 py-2 text-left text-sm text-white/40">
                        No categories match "{value}"
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsCountryOpen(!isCountryOpen)}
                className={`flex items-center gap-1.5 px-3 py-3 text-sm text-white/70 hover:text-white transition-colors ${
                  selectedCountry ? 'text-white' : ''
                }`}
                aria-label="Select country"
                aria-expanded={isCountryOpen}
              >
                <span>
                  {selectedCountryObj ? (
                    <span className="relative inline-flex size-4 overflow-hidden rounded-sm">
                      <Image
                        src={selectedCountryObj.flag}
                        alt={selectedCountryObj.name}
                        fill
                        sizes="16px"
                        className="object-cover"
                        unoptimized
                      />
                    </span>
                  ) : (
                    <span className="flex size-4 items-center justify-center rounded-sm bg-white/10 text-[8px] font-bold">
                      All
                    </span>
                  )}
                </span>
                <span className="max-w-[140px] truncate">
                  {selectedCountryObj?.name ?? 'All Countries'}
                </span>
                <DownArrowIcon className={`size-4 transition-transform ${isCountryOpen ? 'rotate-180' : ''}`} />
              </button>
              {isCountryOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 max-h-72 overflow-y-auto bg-background-13 border border-stroke-3/25 rounded-lg shadow-lg z-50">
                  <button
                    type="button"
                    onClick={() => handleCountryChange('')}
                    className={`w-full px-3 py-2 text-left text-sm transition-colors ${
                      !selectedCountry ? 'bg-background-7 text-background-13' : 'text-white/70 hover:bg-background-7 hover:text-white'
                    }`}
                  >
                    <span className="flex size-4 items-center justify-center rounded-sm bg-white/10 text-[8px] font-bold">
                      All
                    </span>
                    <span>All Countries</span>
                  </button>
                  {COUNTRIES.map((country) => (
                    <button
                      key={country.code}
                      type="button"
                      onClick={() => handleCountryChange(country.code)}
                      className={`w-full px-3 py-2 text-left text-sm transition-colors ${
                        selectedCountry === country.code ? 'bg-background-7 text-background-13' : 'text-white/70 hover:bg-background-7 hover:text-white'
                      }`}
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
                    </button>
                  ))}
                </div>
              )}
            </div>
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
