'use client';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import React, { cloneElement, isValidElement, useCallback, useRef } from 'react';

gsap.registerPlugin(SplitText, useGSAP, ScrollTrigger);

export type TextRevealProps = {
  children: React.ReactElement;
  /** Stagger between lines in seconds. */
  lineDelay?: number;
  /** Duration of each line’s tween in seconds. */
  duration?: number;
  /** Horizontal start offset in px (same as `data-line-offset-x`; default -90). */
  offsetX?: number;
  /** `left`: from positive x; `right`: from negative x when offsetX is negative. */
  direction?: 'left' | 'right';
  /** If true, play immediately without ScrollTrigger. */
  instant?: boolean;
  /** ScrollTrigger `start` when not instant. */
  start?: string;
  /** Delay before the staggered sequence. */
  delay?: number;
  /** Optional color applied at the end of the tween. */
  color?: string;
};

const wrapLinesInBlocks = (lineSpans: Element[]) => {
  lineSpans.forEach((line) => {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = ' display: block;';
    line.parentNode?.insertBefore(wrapper, line);
    wrapper.appendChild(line);
  });
};

export const TextReveal = ({
  children,
  lineDelay = 0.15,
  duration = 0.9,
  offsetX = -90,
  direction = 'right',
  instant = false,
  start = 'top 90%',
  delay = 0.1,
  color = '',
}: TextRevealProps) => {
  const scopeRef = useRef<HTMLElement | null>(null);
  const splitRef = useRef<SplitText | null>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const setRef = useCallback((el: HTMLElement | null) => {
    (scopeRef as { current: HTMLElement | null }).current = el;
  }, []);

  useGSAP(
    () => {
      const el = scopeRef.current;
      if (!el) return;

      const run = () => {
        if (!scopeRef.current) return;
        const targetEl = scopeRef.current;

        tweenRef.current?.kill();
        splitRef.current?.revert();

        const split = SplitText.create(targetEl, {
          type: 'lines',
          tag: 'span',
        });
        splitRef.current = split;

        const lineSpans = split.lines;
        if (!lineSpans?.length) return;

        wrapLinesInBlocks([...lineSpans]);

        const fromX = direction === 'left' ? -offsetX : offsetX;

        targetEl.style.opacity = '1';

        const tweenVars: gsap.TweenVars = {
          x: 0,
          opacity: 1,
          duration,
          delay,
          ease: 'power2.inOut',
          stagger: lineDelay,
        };

        if (color) {
          tweenVars.color = color;
        }

        if (!instant) {
          tweenVars.scrollTrigger = {
            trigger: targetEl,
            start,
            once: true,
          };
        }

        tweenRef.current = gsap.fromTo(
          lineSpans,
          { x: fromX, opacity: 0, display: 'block' },
          tweenVars
        );
      };

      if (document.fonts) {
        document.fonts.ready.then(run);
      } else {
        run();
      }

      return () => {
        tweenRef.current?.kill();
        splitRef.current?.revert();
      };
    },
    {
      scope: scopeRef,
      dependencies: [lineDelay, duration, offsetX, direction, instant, start, delay, color],
    }
  );

  if (!isValidElement(children)) {
    console.warn('TextReveal expects a single valid React element.');
    return null;
  }

  // eslint-disable-next-line react-hooks/refs -- ref callback forwarded to clone for useGSAP scope
  return cloneElement(children, {
    ref: setRef,
    'data-ns-split-text': true,
  } as React.HTMLAttributes<HTMLElement> & { ref: React.Ref<HTMLElement> });
};
