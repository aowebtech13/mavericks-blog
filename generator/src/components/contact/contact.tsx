'use client';
import contactGradient from '@/public/images/gradient/opai-4.png';
import RevealAnimation from '@/src/components/animation/reveal-animation';
import { TextReveal } from '@/src/components/animation/text-reveal-animation';
import ContactMap from '@/src/components/contact/contact-map';
import PrimarySubmitButton from '@/src/components/shared/ui/button/primary-submit-button';
import Image from 'next/image';

const Contact = () => {
  return (
    <section className="relative overflow-hidden py-20 md:py-24 lg:py-28 xl:py-36 2xl:py-44">
      <div className="main-container relative z-20 space-y-10 md:space-y-19">
        <div className="space-y-3 text-center md:space-y-5">
          <div className="space-y-1.5 md:space-y-3">
            <TextReveal>
              <h2 className="text-sora-heading-4 md:text-sora-heading-3 lg:text-sora-heading-2 text-center font-normal tracking-[-2.4px] text-white max-md:leading-[1.1]">
                We&apos;d love to hear from you.
              </h2>
            </TextReveal>
            <TextReveal delay={0.2}>
              <p className="font-inter-tight text-tagline-2 font-normal text-white/50">
                Whether you&apos;re ready to start a project or have questions, our team is here to
                help.
              </p>
            </TextReveal>
          </div>
        </div>

        <RevealAnimation delay={0.01} offset={10} instant>
          <div className="border-stroke-3/25 to-background-5 from-background-6 relative mx-auto flex flex-col gap-7 overflow-hidden rounded-xl border-2 bg-radial-[52.78%_57.9%_at_3.87%_7.86%] p-3 md:p-10.5 lg:flex-row xl:gap-[42px]">
            <div className="pointer-events-none absolute -right-10 -bottom-10 z-0 size-[400px] rotate-10">
              <Image src={contactGradient} alt="" className="h-full w-full object-cover" priority />
            </div>

            <figure className="relative z-1 h-[300px] min-h-[300px] w-full overflow-hidden rounded-2xl lg:h-[527px] lg:min-h-[527px] lg:w-[420px] xl:w-[655px]">
              <ContactMap />
            </figure>

            <div className="relative z-10 flex flex-1 flex-col gap-7">
              <form
                className="flex flex-1 flex-col gap-3"
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <div className="bg-background-5 focus-within:border-stroke-3/40 border-stroke-3/25 flex items-center gap-1 rounded-2xl border px-4 py-4 pl-7 focus-within:border focus-within:outline-none">
                  <input
                    type="text"
                    id="full-name"
                    name="fullName"
                    placeholder="Full name"
                    className="font-inter-tight text-tagline-5 w-full bg-transparent font-normal text-white/80 placeholder:text-white/50 focus:outline-none"
                  />
                </div>
                <div className="bg-background-5 focus-within:border-stroke-3/40 border-stroke-3/25 flex items-center gap-1 rounded-2xl border px-4 py-4 pl-7 focus-within:border focus-within:outline-none">
                  <input
                    type="email"
                    id="email-address"
                    name="email"
                    placeholder="Email address"
                    className="font-inter-tight text-tagline-5 w-full bg-transparent font-normal text-white/80 placeholder:text-white/50 focus:outline-none"
                  />
                </div>
                <div className="flex gap-3">
                  <div className="bg-background-5 focus-within:border-stroke-3/40 border-stroke-3/25 flex flex-1 items-center gap-1 rounded-2xl border px-4 py-4 pl-7 focus-within:border focus-within:outline-none">
                    <input
                      type="text"
                      id="company-name"
                      name="company"
                      placeholder="Company name"
                      className="font-inter-tight text-tagline-5 w-full bg-transparent font-normal text-white/80 placeholder:text-white/50 focus:outline-none"
                    />
                  </div>
                  <div className="bg-background-5 focus-within:border-stroke-3/40 border-stroke-3/25 flex flex-1 items-center gap-1 rounded-2xl border px-4 py-4 pl-7 focus-within:border focus-within:outline-none">
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="Phone"
                      className="font-inter-tight text-tagline-5 w-full bg-transparent font-normal text-white/80 placeholder:text-white/50 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="bg-background-5 focus-within:border-stroke-3/40 border-stroke-3/25 flex items-center gap-1 rounded-2xl border px-4 py-4 pl-7 focus-within:border focus-within:outline-none">
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="Subject"
                    className="font-inter-tight text-tagline-5 w-full bg-transparent font-normal text-white/80 placeholder:text-white/50 focus:outline-none"
                  />
                </div>
                <div className="bg-background-5 focus-within:border-stroke-3/40 border-stroke-3/25 flex flex-1 flex-col gap-4 rounded-2xl border px-4 py-4 pl-7 focus-within:border focus-within:outline-none">
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Your message"
                    rows={6}
                    className="font-inter-tight text-tagline-5 flex-1 resize-none bg-transparent font-normal text-white/80 placeholder:text-white/50 focus:outline-none"
                  />
                </div>
                <div className="pt-4">
                  <PrimarySubmitButton className="mx-auto w-full md:mx-0 md:w-auto">
                    Contact us today
                  </PrimarySubmitButton>
                </div>
              </form>
            </div>
          </div>
        </RevealAnimation>
      </div>
    </section>
  );
};

export default Contact;
