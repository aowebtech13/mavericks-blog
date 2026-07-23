import Image from 'next/image';

import asana from '@/public/images/icons/asana-with-white-text.svg';
import discord from '@/public/images/icons/discord-with-white-text.svg';
import dropbox from '@/public/images/icons/dropbox-with-white-text.svg';
import hotjar from '@/public/images/icons/hotjar-with-white-text.svg';
import lattice from '@/public/images/icons/lattice-with-white-text.svg';
import notion from '@/public/images/icons/notion-with-white-text.svg';
import outreach from '@/public/images/icons/outreach-with-white-text.svg';
import scapic from '@/public/images/icons/scapic-with-white-text.svg';
import spotify from '@/public/images/icons/spotify-with-white-text.svg';
import squarespace from '@/public/images/icons/squarespace-with-white-text.svg';
import RevealAnimation from '@/src/components/animation/reveal-animation';

const clients: { src: typeof scapic; alt: string }[] = [
  { src: scapic, alt: 'Scapic' },
  { src: lattice, alt: 'Lattice' },
  { src: discord, alt: 'Discord' },
  { src: notion, alt: 'Notion' },
  { src: dropbox, alt: 'Dropbox' },
  { src: hotjar, alt: 'Hotjar' },
  { src: spotify, alt: 'Spotify' },
  { src: outreach, alt: 'Outreach' },
  { src: asana, alt: 'Asana' },
  { src: squarespace, alt: 'Squarespace' },
];

const HeroClients = () => (
  <RevealAnimation delay={0.5}>
    <div
      className="relative z-10 mx-auto flex max-w-[650px] flex-col flex-wrap items-center justify-center gap-x-14 gap-y-4 sm:flex-row md:gap-y-7 lg:max-w-[814px]"
      aria-label="Trusted clients and partners"
    >
      {clients.map(({ src, alt }) => (
        <figure key={alt} className="h-[45px] shrink-0 scale-85">
          <Image src={src} alt={alt} className="h-[45px] w-auto" height={45} width={120} />
        </figure>
      ))}
    </div>
  </RevealAnimation>
);

export default HeroClients;
