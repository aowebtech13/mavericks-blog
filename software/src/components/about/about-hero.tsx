import asana from '@/public/images/icons/asana-with-gray-text.svg';
import discord from '@/public/images/icons/discord-with-gray-text.svg';
import dropbox from '@/public/images/icons/dropbox-with-gray-text.svg';
import hotjar from '@/public/images/icons/hotjar-with-gray-text.svg';
import lattice from '@/public/images/icons/lattice-with-gray-text.svg';
import notion from '@/public/images/icons/notion-with-gray-text.svg';
import outreach from '@/public/images/icons/outreach-with-gray-text.svg';
import scapic from '@/public/images/icons/scapic-with-gray-text.svg';
import spotify from '@/public/images/icons/spotify-with-gray-text.svg';
import squarespace from '@/public/images/icons/squarespace-with-gray-text.svg';
import heroImage from '@/public/images/opai-img-422.jpg';
import RevealAnimation from '@/src/components/animation/reveal-animation';
import { TextReveal } from '@/src/components/animation/text-reveal-animation';
import AvatarItem from '@/src/components/shared/ui/avatar-reveal/avatar-item';
import AvatarReveal from '@/src/components/shared/ui/avatar-reveal/avatar-reveal';
import Image from 'next/image';

const clientLogos: { src: typeof dropbox; alt: string }[] = [
  { src: dropbox, alt: 'Dropbox' },
  { src: spotify, alt: 'Spotify' },
  { src: hotjar, alt: 'Hotjar' },
  { src: notion, alt: 'Notion' },
  { src: asana, alt: 'Asana' },
  { src: discord, alt: 'Discord' },
  { src: scapic, alt: 'Scapic' },
  { src: lattice, alt: 'Lattice' },
  { src: outreach, alt: 'Outreach' },
  { src: squarespace, alt: 'Squarespace' },
];

const AboutHero = () => {
  return (
    <section className="overflow-hidden pt-28 pb-16 sm:pt-34 md:pb-24 lg:pt-36 lg:pb-28 xl:pt-39 xl:pb-33 2xl:pt-45 2xl:pb-39">
      <div className="main-container space-y-9 md:space-y-14">
        <div className="flex flex-col items-center justify-between gap-y-2 md:flex-row">
          <div className="space-y-0 md:max-w-[609px] md:space-y-1">
            <TextReveal>
              <h1 className="lg:text-sora-heading-2 md:text-sora-heading-3 text-sora-heading-4 text-white lg:tracking-[-2.4px]">
                Driving Smarter Futures with Nexsas
              </h1>
            </TextReveal>
            <TextReveal delay={0.2}>
              <p className="text-tagline-2 mx-auto max-w-full font-normal text-white/60 sm:max-w-[600px] lg:mx-0 lg:max-w-[400px]">
                Empowering businesses with cutting-edge AI solutions.
              </p>
            </TextReveal>
          </div>
          <div>
            <TextReveal delay={0.1} offsetX={90}>
              <h3 className="text-sora-heading-5 mb-4 text-white lg:tracking-[-0.72px]">
                Trusted by Teams Worldwide
              </h3>
            </TextReveal>
            <AvatarReveal className="flex -space-x-2.5" direction="right" offset={40} stagger={0.1}>
              <AvatarItem className="inline-block shrink-0">
                <Image
                  src="/images/opai-avatar-img-01.png"
                  alt="Avatar 1"
                  width={36}
                  height={36}
                  className="inline-block size-9 rounded-full ring-2 ring-white"
                />
              </AvatarItem>
              <AvatarItem className="inline-block shrink-0">
                <Image
                  src="/images/opai-avatar-img-02.png"
                  alt="Avatar 2"
                  width={36}
                  height={36}
                  className="inline-block size-9 rounded-full ring-2 ring-white"
                />
              </AvatarItem>
              <AvatarItem className="inline-block shrink-0">
                <Image
                  src="/images/opai-avatar-img-03.png"
                  alt="Avatar 3"
                  width={36}
                  height={36}
                  className="inline-block size-9 rounded-full ring-2 ring-white"
                />
              </AvatarItem>
              <AvatarItem className="inline-block shrink-0">
                <div className="text-tagline-4 inline-flex size-9 items-center justify-center rounded-full bg-[#0d0d1280] font-medium text-white/80 ring-2 ring-white backdrop-blur-[6px]">
                  99+
                </div>
              </AvatarItem>
            </AvatarReveal>
          </div>
        </div>

        <RevealAnimation delay={0.3} instant>
          <figure className="mt-4 h-[300px] w-full overflow-hidden rounded-xl md:h-[500px] lg:h-[700px]">
            <Image src={heroImage} alt="About Us" className="h-full w-full object-cover" priority />
          </figure>
        </RevealAnimation>

        <div>
          <RevealAnimation delay={0.2} instant>
            <p className="text-tagline-1 mt-12 font-normal text-white/60">
              Nexsas partners with startups, enterprises, and global brands to unlock AI-driven
              growth across industries. From advanced automation to creative generation tools, our
              technology accelerates workflows and transforms how teams build, operate, and
              innovate.
            </p>
          </RevealAnimation>
          <RevealAnimation delay={0.3} instant>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-6 pt-8 max-md:justify-center md:gap-x-16">
              {clientLogos.map(({ src, alt }) => (
                <figure key={alt} className="max-w-[110px] md:max-w-[160px]">
                  <Image src={src} alt={alt} className="h-full w-full object-cover" />
                </figure>
              ))}
            </div>
          </RevealAnimation>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
