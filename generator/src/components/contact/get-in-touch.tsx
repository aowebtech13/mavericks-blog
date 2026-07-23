import contactMap from '@/public/images/opai-img-16.jpg';
import RevealAnimation from '@/src/components/animation/reveal-animation';
import { TextReveal } from '@/src/components/animation/text-reveal-animation';
import { footerContact } from '@/src/data/footer';
import Image from 'next/image';

const GetInTouch = () => {
  return (
    <section className="relative overflow-hidden pt-10 pb-20 md:pt-13 md:pb-24 lg:pt-18 lg:pb-28 xl:pt-20 xl:pb-36 2xl:pb-44">
      <div className="main-container space-y-10 md:space-y-19">
        <div className="space-y-1.5 text-center md:space-y-3">
          <TextReveal>
            <h2 className="text-sora-heading-4 md:text-sora-heading-3 lg:text-sora-heading-2 text-center font-normal tracking-[-2.4px] text-white max-md:leading-[1.1]">
              Get in touch
            </h2>
          </TextReveal>
          <TextReveal delay={0.2}>
            <p className="font-inter-tight text-tagline-2 font-normal text-white/50">
              We&apos;d love to hear from you.
            </p>
          </TextReveal>
        </div>

        <RevealAnimation delay={0.1}>
          <div className="bg-background-4 grid grid-cols-12 gap-2 rounded-2xl p-2">
            <RevealAnimation delay={0.1}>
              <div className="bg-background-5 col-span-12 space-y-6 rounded-2xl p-8 md:col-span-6 lg:col-span-4">
                <span className="block w-7.5" aria-hidden>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={36}
                    height={36}
                    viewBox="0 0 36 36"
                    fill="none"
                  >
                    <path
                      d="M6 6H30C31.65 6 33 7.35 33 9V27C33 28.65 31.65 30 30 30H6C4.35 30 3 28.65 3 27V9C3 7.35 4.35 6 6 6Z"
                      stroke="#F8F9FA"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M33 9L18 19.5L3 9"
                      stroke="#F8F9FA"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <div className="space-y-1">
                  <h4 className="text-sora-heading-6 text-white/90">Email</h4>
                  <a
                    href={footerContact.emailHref}
                    className="text-tagline-2 font-normal text-white/50 hover:text-white/70"
                  >
                    {footerContact.email}
                  </a>
                </div>
              </div>
            </RevealAnimation>

            <RevealAnimation delay={0.2}>
              <div className="bg-background-5 col-span-12 space-y-6 rounded-2xl p-8 md:col-span-6 lg:col-span-4">
                <span className="block w-7.5" aria-hidden>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={36}
                    height={36}
                    viewBox="0 0 36 36"
                    fill="none"
                  >
                    <path
                      d="M22.418 5.625C24.3251 6.13791 26.064 7.14294 27.4605 8.53941C28.857 9.93589 29.862 11.6748 30.3749 13.5819"
                      stroke="#F8F9FA"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M21.2539 9.97266C22.3982 10.2804 23.4415 10.8834 24.2794 11.7213C25.1173 12.5592 25.7203 13.6025 26.0281 14.7468"
                      stroke="#F8F9FA"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M13.0045 17.5536C14.1714 19.9393 16.1053 21.8644 18.4964 23.0205C18.6713 23.1034 18.8648 23.1393 19.0578 23.1247C19.2509 23.1101 19.4368 23.0455 19.5973 22.9372L23.1179 20.5896C23.2736 20.4857 23.4528 20.4224 23.6391 20.4053C23.8255 20.3881 24.0132 20.4178 24.1852 20.4915L30.7717 23.3143C30.9954 23.4093 31.1822 23.5745 31.3039 23.7849C31.4256 23.9954 31.4756 24.2397 31.4464 24.481C31.2382 26.11 30.4434 27.6073 29.2108 28.6925C27.9782 29.7776 26.3923 30.3763 24.75 30.3764C19.6777 30.3764 14.8132 28.3615 11.2266 24.7748C7.63995 21.1882 5.625 16.3237 5.625 11.2514C5.62509 9.60916 6.22377 8.02325 7.30896 6.79062C8.39414 5.55799 9.89141 4.76318 11.5204 4.555C11.7618 4.52579 12.006 4.57581 12.2165 4.69751C12.4269 4.81921 12.5921 5.00601 12.6871 5.22975L15.5124 11.8219C15.5854 11.9925 15.6152 12.1784 15.599 12.3632C15.5829 12.548 15.5212 12.7259 15.4197 12.8812L13.0802 16.4558C12.9737 16.6166 12.9107 16.8023 12.8975 16.9947C12.8842 17.1871 12.9211 17.3797 13.0045 17.5536V17.5536Z"
                      stroke="#F8F9FA"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <div className="space-y-1">
                  <h4 className="text-sora-heading-6 text-white/90">Phone</h4>
                  <a
                    href={footerContact.phoneHref}
                    className="text-tagline-2 font-normal text-white/50 hover:text-white/70"
                  >
                    {footerContact.phone}
                  </a>
                </div>
              </div>
            </RevealAnimation>

            <RevealAnimation delay={0.3}>
              <div className="bg-background-5 col-span-12 space-y-6 rounded-2xl p-8 md:col-span-6 lg:col-span-4">
                <span className="block w-7.5" aria-hidden>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={36}
                    height={36}
                    viewBox="0 0 36 36"
                    fill="none"
                  >
                    <path
                      d="M18 19.125C20.4853 19.125 22.5 17.1103 22.5 14.625C22.5 12.1397 20.4853 10.125 18 10.125C15.5147 10.125 13.5 12.1397 13.5 14.625C13.5 17.1103 15.5147 19.125 18 19.125Z"
                      stroke="#F8F9FA"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M29.25 14.625C29.25 24.75 18 32.625 18 32.625C18 32.625 6.75 24.75 6.75 14.625C6.75 11.6413 7.93526 8.77983 10.045 6.67005C12.1548 4.56026 15.0163 3.375 18 3.375C20.9837 3.375 23.8452 4.56026 25.955 6.67005C28.0647 8.77983 29.25 11.6413 29.25 14.625V14.625Z"
                      stroke="#F8F9FA"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <div className="space-y-1">
                  <h4 className="text-sora-heading-6 text-white/90">Address</h4>
                  <p className="text-tagline-2 font-normal text-white/50">
                    {footerContact.address}
                  </p>
                </div>
              </div>
            </RevealAnimation>

            <RevealAnimation delay={0.4}>
              <figure className="col-span-12 max-h-[472px] overflow-hidden rounded-2xl">
                <Image
                  src={contactMap}
                  alt="contact map"
                  width={1200}
                  height={472}
                  className="h-full w-full object-cover"
                  sizes="(max-width: 768px) 100vw, 1200px"
                />
              </figure>
            </RevealAnimation>
          </div>
        </RevealAnimation>
      </div>
    </section>
  );
};

export default GetInTouch;
