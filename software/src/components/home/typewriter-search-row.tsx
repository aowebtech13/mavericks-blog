'use client';

import Typewriter from '@/src/components/animation/typewriter';
import { KeywordTypewriterSearchIcon } from '@/src/components/shared/icon';
import { cn } from '@/src/utils/cn';
import { useState } from 'react';

export interface KeywordSearchTypewriterFormProps {
  /** Copy shown as the animated “placeholder” */
  placeholderText?: string;
  duration?: number;
  className?: string;
  role?: string;
  'aria-label'?: string;
}

const KeywordSearchTypewriterForm = ({
  placeholderText = 'Search',
  duration = 1,
  className,
  role = 'search',
  'aria-label': ariaLabel = 'Keyword search form',
}: KeywordSearchTypewriterFormProps) => {
  const [value, setValue] = useState('');
  const showPlaceholderTypewriter = value.length === 0;

  return (
    <form
      data-typewriter
      data-duration={String(duration)}
      className={cn(
        'border-stroke-1/11 relative z-20 flex size-full items-center justify-between rounded-full border bg-[#FAFCFF]/5 py-1 pr-1 backdrop-blur-[32px]',
        className,
      )}
      role={role}
      aria-label={ariaLabel}
      onSubmit={(e) => e.preventDefault()}
    >
      <label htmlFor="keyword" className="sr-only">
        Search keywords
      </label>
      <div className="relative min-w-0 flex-1 self-stretch">
        {showPlaceholderTypewriter ? (
          <div
            className="pointer-events-none absolute inset-0 z-1 flex items-center pl-4 select-none"
            aria-hidden
          >
            <Typewriter text={placeholderText} duration={duration} start="top 80%">
              <span className="font-inter-tight text-tagline-3 font-normal text-white/80" />
            </Typewriter>
          </div>
        ) : null}
        <input
          data-typewriter-text
          id="keyword"
          name="keyword"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={showPlaceholderTypewriter ? '' : placeholderText}
          aria-label="Enter keyword to search"
          className={cn(
            'font-inter-tight text-tagline-3 inline-block size-full min-w-0 bg-transparent pl-4 font-normal outline-none placeholder:text-white/80',
            showPlaceholderTypewriter ? 'text-transparent caret-white' : 'text-white',
          )}
        />
      </div>
      <KeywordTypewriterSearchIcon />
    </form>
  );
};

export default KeywordSearchTypewriterForm;
