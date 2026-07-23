'use client';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const DURATION_MS = 2000;

interface ShuffledTitleProps {
  /** Text to animate (shuffle then reveal). Default: "Nexsas" */
  text?: string;
  /** Optional className for the wrapper div */
  className?: string;
  /** Optional className for the h2 */
  headingClassName?: string;
}

const ShuffledTitle = ({
  text = ' Nexsas ',
  className,
  headingClassName,
}: ShuffledTitleProps) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const element = titleRef.current;
      const spanElement = spanRef.current;
      if (!element) return;

      element.style.whiteSpace = 'nowrap';

      const textNode = spanElement || element;
      const originalText = textNode.textContent ?? text;
      let startTime: number | null = null;

      const animate = (currentTime: number) => {
        startTime ??= currentTime;
        const progress = Math.min((currentTime - startTime) / DURATION_MS, 1);
        const revealed = Math.floor(progress * originalText.length);

        const animatedText = originalText
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' ';
            return i < revealed ? originalText[i] : CHARS[Math.floor(Math.random() * 26)];
          })
          .join('');

        if (spanElement) {
          spanElement.textContent = animatedText;
        } else {
          element.textContent = animatedText;
        }

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else if (spanElement) {
          spanElement.textContent = originalText;
        } else {
          element.textContent = originalText;
        }
      };

      const shuffle = () => {
        startTime = null;
        requestAnimationFrame(animate);
      };

      const scrollTrigger = ScrollTrigger.create({
        trigger: element,
        start: 'top 100%',
        onEnter: shuffle,
        once: true,
      });

      return () => {
        scrollTrigger.kill();
      };
    },
    { scope: titleRef, dependencies: [text] }
  );

  return (
    <div className={className}>
      <h2
        ref={titleRef}
        className={
          headingClassName ??
          'footer-title text-it-heading-4 font-inter-tight pl-7 text-center font-bold tracking-[30.48px] uppercase sm:text-[60px] sm:leading-[120px] md:tracking-[50.48px] lg:text-[80px] lg:tracking-[70.48px] xl:text-[112px] xl:leading-[168px] 2xl:tracking-[100.48px]'
        }
        aria-hidden
      >
        <span ref={spanRef}>{text}</span>
      </h2>
    </div>
  );
};

export default ShuffledTitle;
