import RevealAnimation from '@/src/components/animation/reveal-animation';
import { TextReveal } from '@/src/components/animation/text-reveal-animation';
import TeamCard from '@/src/components/shared/ui/card/team-card';
import { TeamMember } from '@/src/interface';

export interface TeamProps {
  readonly members: TeamMember[];
}

const Team = ({ members }: TeamProps) => (
  <section
    className="pt-[120px] pb-[70px] md:pt-[150px] md:pb-[110px] lg:pt-[200px] xl:pb-[156px] 2xl:pt-[252px]"
    aria-labelledby="team-heading"
  >
    <div className="main-container">
      <div className="space-y-14 md:space-y-[70px]">
        <div className="space-y-1 text-center">
          <TextReveal>
            <h1
              id="team-heading"
              className="font-sora lg:text-sora-heading-2 text-sora-heading-3 xl:text-sora-heading-1 font-normal text-white"
            >
              Meet Our Experts
            </h1>
          </TextReveal>
          <RevealAnimation delay={0.2}>
            <p className="text-tagline-2 font-inter-tight font-normal text-white/60">
              Our team is dedicated to providing the best possible service to our clients.
            </p>
          </RevealAnimation>
        </div>

        <div
          className="team-cards-grid grid grid-cols-12 gap-y-10 md:gap-x-6 md:gap-y-8"
          aria-label="Team members"
        >
          {members.map((member, index) => (
            <RevealAnimation delay={(index + 1) * 0.1} key={member.href}>
              <div className="col-span-12 md:col-span-4">
                <TeamCard
                  key={member.href}
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

export default Team;
