'use client';

import { cn } from '@/src/utils/cn';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { HTMLAttributes, ReactNode } from 'react';
import { Children, forwardRef, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export interface StackCardWrapperProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Matches `data-stack-style`: card motion preset */
  stackStyle?: 'scale' | 'rotate';
  /** Matches `data-scale-value`; used when `stackStyle` is `scale` */
  scaleValue?: number;
  /** Matches `data-stack-card-markers`: show ScrollTrigger markers */
  stackCardMarkers?: boolean;
}

export const StackCardWrapper = forwardRef<HTMLDivElement, StackCardWrapperProps>(
  (
    {
      className,
      children,
      stackStyle = 'scale',
      scaleValue = 0.9,
      stackCardMarkers = false,
      ...props
    },
    ref,
  ) => {
    const localRef = useRef<HTMLDivElement>(null);
    const itemCount = Children.count(children);

    const setRefs = (node: HTMLDivElement | null) => {
      localRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    };

    useGSAP(
      () => {
        const wrapper = localRef.current;
        if (!wrapper) return;

        const cardItems = wrapper.querySelectorAll<HTMLElement>('[data-stack-card-item]');
        if (cardItems.length === 0) return;

        const ctx = gsap.context(() => {
          cardItems.forEach((item, i) => {
            let animationProps: gsap.TweenVars = {};
            if (stackStyle === 'rotate') {
              let rotation = 0;
              if (i % 2 === 1) {
                rotation = Math.floor(i / 2) % 2 === 0 ? 4 : -4;
              }
              animationProps = {
                rotation,
                transformOrigin: 'top center',
              };
            } else {
              let scale = 1;
              if (i !== cardItems.length - 1) {
                scale = scaleValue + 0.025 * i;
              }
              animationProps = {
                scale,
                transformOrigin: 'top center',
              };
            }

            gsap.to(item, {
              ...animationProps,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: item,
                start: `top ${150 + 10 * i}`,
                end: 'bottom 550',
                endTrigger: wrapper,
                scrub: 1,
                pin: item,
                pinSpacing: false,
                invalidateOnRefresh: true,
                markers: stackCardMarkers
                  ? {
                      indent: 100 * i,
                      startColor: '#0ae448',
                      endColor: '#fec5fb',
                      fontSize: '14px',
                    }
                  : false,
                id: `stack-card-${i + 1}`,
              },
            });
          });
        }, wrapper);

        return () => ctx.revert();
      },
      {
        scope: localRef,
        dependencies: [stackStyle, scaleValue, stackCardMarkers, itemCount],
      },
    );

    return (
      <div
        ref={setRefs}
        className={cn(className)}
        {...props}
        data-stack-card-wrapper
        data-stack-style={stackStyle}
        data-scale-value={scaleValue}
        {...(stackCardMarkers ? { 'data-stack-card-markers': 'true' } : {})}
      >
        {children}
      </div>
    );
  },
);

StackCardWrapper.displayName = 'StackCardWrapper';
