'use client';

import Typewriter from '@/src/components/animation/typewriter';
import AutoGrowTextarea from '@/src/components/home/auto-grow-textarea';
import { cn } from '@/src/utils/cn';
import { useState } from 'react';

const HeroPromptField = () => {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');

  return (
    <div className="relative w-full">
      {!focused && !value ? (
        <div className="pointer-events-none absolute top-0 left-0 z-1 w-full select-none" aria-hidden>
          <Typewriter text="Describe your product or service" duration={2} start="top 90%">
            <span className="font-inter-tight text-tagline-3 block w-full font-normal text-white/60" />
          </Typewriter>
        </div>
      ) : null}
      <AutoGrowTextarea
        name="prompt"
        id="prompt"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder=""
        aria-label="Product or service description input"
        aria-describedby="prompt-description"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={cn(
          'placeholder:font-inter-tight placeholder:text-tagline-3 font-inter-tight text-tagline-3 w-full resize-none overflow-hidden bg-transparent font-normal outline-none',
          !focused && !value
            ? 'text-transparent caret-white'
            : 'text-white/80 placeholder:font-normal placeholder:text-white/60',
        )}
      />
    </div>
  );
};

export default HeroPromptField;
