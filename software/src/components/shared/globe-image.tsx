'use client';

import globeImageSrc from '@/public/images/opai-img-43.png';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const GlobeImage = () => {
  const globeRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = globeRef.current;
      if (!el) return;

      gsap.to(el, {
        opacity: 1,
        y: -50,
        duration: 1,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          end: 'bottom 20%',
        },
      });
    },
    { scope: globeRef }
  );

  return (
    <figure
      ref={globeRef}
      className="globe-image absolute top-[-22%] left-0 w-full mix-blend-lighten md:top-[-46%] md:max-w-full lg:top-0"
    >
      <Image
        src={globeImageSrc}
        alt=""
        width={1200}
        height={800}
        className="size-full object-contain md:object-cover"
        priority={false}
      />
    </figure>
  );
};

export default GlobeImage;
