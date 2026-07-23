'use client';

import { cn } from '@/src/utils/cn';
import type { InputEvent, TextareaHTMLAttributes } from 'react';
import { useCallback } from 'react';

export interface AutoGrowTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const AutoGrowTextarea = ({ className, onInput, ...props }: AutoGrowTextareaProps) => {
  const handleInput = useCallback(
    (e: InputEvent<HTMLTextAreaElement>) => {
      const el = e.currentTarget;
      el.style.height = 'auto';
      el.style.height = `${el.scrollHeight}px`;
      onInput?.(e);
    },
    [onInput],
  );

  return (
    <textarea
      className={cn(className)}
      rows={1}
      onInput={handleInput}
      {...props}
    />
  );
};

export default AutoGrowTextarea;
