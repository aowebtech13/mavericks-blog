import RevealAnimation from '@/src/components/animation/reveal-animation';
import { TextReveal } from '@/src/components/animation/text-reveal-animation';
import Badge from '@/src/components/shared/ui/badge';
import TeamCard from '@/src/components/shared/ui/card/team-card';
import type { TeamMember } from '@/src/data/team';

export interface AboutTeamProps {
  readonly members: TeamMember[];
}

const AboutTeam = ({ members }: AboutTeamProps) => (
  <section className="py-[80px] md:py-[120px] xl:py-[176px]" aria-labelledby="about-team-heading">
    <div className="main-container">
      <div className="space-y-[70px]">
        <div className="space-y-5 text-center">
          <RevealAnimation delay={0.1}>
            <Badge aria-label="Section subtitle: Team">Team</Badge>
          </RevealAnimation>
          <div className="space-y-2 md:space-y-4">
            <TextReveal>
              <h2
                id="about-team-heading"
                className="font-sora md:text-sora-heading-3 text-sora-heading-4 lg:text-sora-heading-2 font-normal text-white"
              >
                Meet the Team
              </h2>
            </TextReveal>
            <TextReveal delay={0.2}>
              <p className="text-tagline-2 font-inter-tight font-normal text-white/60">
                Our team is dedicated to providing the best possible service to our clients.
              </p>
            </TextReveal>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-y-10 md:gap-x-6 md:gap-y-8" aria-label="Team members">
          {members.map((member, index) => (
            <RevealAnimation delay={0.1 + index * 0.1} key={member.href}>
              <div className="col-span-12 md:col-span-4">
                <TeamCard
                  name={member.name}
                  position={member.position}
                  image={member.image}
                  href={member.href}
                />
              </div>
            </RevealAnimation>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default AboutTeam;
