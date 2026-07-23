import RevealAnimation from '@/src/components/animation/reveal-animation';
import { TextReveal } from '@/src/components/animation/text-reveal-animation';
import Badge from '@/src/components/shared/ui/badge';
import TeamCard from '@/src/components/shared/ui/card/team-card';
import type { TeamMember } from '@/src/interface';

export interface HomeTeamProps {
  readonly members: TeamMember[];
}

const Team = ({ members }: HomeTeamProps) => (
  <section className="py-[80px] md:py-[120px] xl:py-[176px]" aria-labelledby="team-heading">
    <div className="main-container">
      <div className="space-y-[70px]">
        <div className="space-y-5 text-center">
          <RevealAnimation delay={0.1}>
            <Badge aria-label="Section subtitle: Team">Team</Badge>
          </RevealAnimation>
          <div className="space-y-4">
            <TextReveal>
              <h2
                id="team-heading"
                className="font-sora lg:text-sora-heading-2 md:text-sora-heading-3 text-sora-heading-4 font-normal text-white"
              >
                Meet the people behind Nexsas
              </h2>
            </TextReveal>
            <TextReveal delay={0.2}>
              <p className="text-tagline-2 font-inter-tight mx-auto max-w-[550px] font-normal text-white/60">
                Our team blends SEO, data, and product expertise so you get a tool that&apos;s built
                by people who live and breathe search—and care about your results.
              </p>
            </TextReveal>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-y-10 md:gap-x-6 md:gap-y-0" aria-label="Team members">
          {members.map((item, index) => (
            <RevealAnimation delay={(index + 1) * 0.1} key={item.href}>
              <div className="col-span-12 md:col-span-4">
                <TeamCard
                  name={item.name}
                  position={item.position}
                  image={item.image}
                  href={item.href}
                />
              </div>
            </RevealAnimation>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Team;
