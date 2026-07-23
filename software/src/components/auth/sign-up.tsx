'use client';

import sideImage from '@/public/images/opai-img-235.jpg';
import globeBg from '@/public/images/opai-img-43.png';
import RevealAnimation from '@/src/components/animation/reveal-animation';
import { TextReveal } from '@/src/components/animation/text-reveal-animation';
import PrimarySubmitButton from '@/src/components/shared/ui/button/primary-submit-button';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import { useId, useRef, useState, type SubmitEvent } from 'react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const inputClassName =
  'focus-within:border-stroke-3/10 bg-background-5 placeholder:text-tagline-3 text-tagline-3 border-stroke-3/25 w-full rounded-2xl border px-4.5 py-3 text-white/90 placeholder:text-white/50 focus-within:border focus-within:outline-none';

const SignUp = () => {
  const globeRef = useRef<HTMLElement>(null);
  const formId = useId();
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  useGSAP(
    () => {
      const initGlobeImageAnimation = () => {
        const globeImage = globeRef.current;

        if (!globeImage) return;

        gsap.to(globeImage, {
          opacity: 1,
          y: -50,
          duration: 1,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: globeImage,
            start: 'top 80%',
            end: 'bottom 20%',
          },
        });
      };

      initGlobeImageAnimation();
    },
    { scope: globeRef }
  );

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const password = (form.elements.namedItem('password') as HTMLInputElement)?.value;
    const confirmPassword = (form.elements.namedItem('confirm-password') as HTMLInputElement)
      ?.value;

    if (password !== confirmPassword) {
      setPasswordMismatch(true);
      return;
    }

    setPasswordMismatch(false);
  };

  return (
    <section className="relative grid h-full place-items-end pt-36 pb-20 md:min-h-[552px] md:pt-44 md:pb-24 lg:pt-55 lg:pb-28 xl:pb-36 2xl:pb-44">
      <figure
        ref={globeRef}
        className="globe-image absolute top-5 left-0 h-full w-full mix-blend-lighten"
      >
        <Image
          src={globeBg}
          alt=""
          fill
          className="size-full object-contain md:object-contain"
          sizes="100vw"
          priority
        />
      </figure>
      <div className="main-container">
        <div className="relative z-10 mx-auto">
          <div className="bg-background-4 space-y-10 rounded-2xl p-2 pt-14 md:space-y-14 lg:space-y-18">
            <div className="space-y-3 text-center">
              <TextReveal>
                <h1 className="md:text-sora-heading-3 text-sora-heading-4 lg:text-sora-heading-2 text-center font-normal tracking-[-2.4px] text-white max-md:leading-[1.1]">
                  Let&apos;s get started
                </h1>
              </TextReveal>
              <TextReveal delay={0.2}>
                <p className="font-inter-tight text-tagline-2 mx-auto max-w-[320px] font-normal text-white/50">
                  Access your dashboard and continue building AI-driven solutions for your business.
                </p>
              </TextReveal>
            </div>
            <RevealAnimation delay={0.01} instant>
              <div className="mx-auto grid max-w-[950px] grid-cols-1 gap-2 md:grid-cols-2">
                <RevealAnimation delay={0.1} instant>
                  <form
                    id={formId}
                    className="bg-background-6 w-full space-y-6 overflow-hidden rounded-2xl p-8"
                    onSubmit={handleSubmit}
                  >
                    <div className="relative z-10">
                      <fieldset className="mb-6 space-y-4">
                        <label
                          htmlFor={`${formId}-name`}
                          className="text-inter-tight text-tagline-2 inline-block font-normal text-white/90"
                        >
                          Your Name
                        </label>
                        <input
                          type="text"
                          id={`${formId}-name`}
                          name="name"
                          autoComplete="name"
                          placeholder="Enter your name"
                          className={inputClassName}
                          required
                          aria-label="Your name"
                        />
                      </fieldset>

                      <fieldset className="mb-6 space-y-2">
                        <label
                          htmlFor={`${formId}-email`}
                          className="text-inter-tight text-tagline-2 inline-block font-normal text-white/90"
                        >
                          Your email
                        </label>
                        <input
                          type="email"
                          id={`${formId}-email`}
                          name="email"
                          autoComplete="email"
                          placeholder="Enter your email"
                          className={inputClassName}
                          required
                          aria-label="Your email"
                        />
                      </fieldset>

                      <fieldset className="mb-4 space-y-2">
                        <label
                          htmlFor={`${formId}-password`}
                          className="text-inter-tight text-tagline-2 inline-block font-normal text-white/90"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          id={`${formId}-password`}
                          name="password"
                          autoComplete="new-password"
                          placeholder="Enter your password"
                          className={inputClassName}
                          required
                          minLength={8}
                          aria-label="Password"
                          aria-invalid={passwordMismatch}
                          onChange={() => setPasswordMismatch(false)}
                        />
                      </fieldset>

                      <fieldset className="mb-4 space-y-2">
                        <label
                          htmlFor={`${formId}-confirm-password`}
                          className="text-inter-tight text-tagline-2 inline-block font-normal text-white/90"
                        >
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          id={`${formId}-confirm-password`}
                          name="confirm-password"
                          autoComplete="new-password"
                          placeholder="Confirm your password"
                          className={inputClassName}
                          required
                          minLength={8}
                          aria-label="Confirm password"
                          aria-invalid={passwordMismatch}
                          aria-describedby={
                            passwordMismatch ? `${formId}-password-error` : undefined
                          }
                          onChange={() => setPasswordMismatch(false)}
                        />
                        {passwordMismatch ? (
                          <p
                            id={`${formId}-password-error`}
                            className="text-tagline-3 text-red-400"
                            role="alert"
                          >
                            Passwords do not match.
                          </p>
                        ) : null}
                      </fieldset>

                      <div className="mb-7 flex items-center justify-between gap-4">
                        <label className="flex cursor-pointer items-center gap-1.5">
                          <input
                            type="checkbox"
                            name="remember"
                            className="peer sr-only"
                            aria-label="Remember me"
                          />
                          <span className="border-stroke-1/11 peer-checked:border-primary-500 relative size-5 cursor-pointer rounded-full border after:absolute after:top-1/2 after:left-1/2 after:size-3 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:bg-white/50 after:opacity-0 peer-checked:after:opacity-100" />
                          <span className="text-tagline-2 font-medium text-white/90 select-none">
                            Remember me
                          </span>
                        </label>

                        <Link
                          href="#"
                          className="text-tagline-2 font-normal text-white/60 underline underline-offset-2 transition-colors duration-300 ease-in-out hover:text-white/90"
                        >
                          Forgot password?
                        </Link>
                      </div>

                      <div>
                        <PrimarySubmitButton className="w-full">Sign up</PrimarySubmitButton>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <p className="text-tagline-4 relative px-2 text-center font-normal text-white/90 before:absolute before:top-1/2 before:left-[26%] before:block before:h-px before:w-[43px] before:-translate-y-1/2 before:bg-[linear-gradient(270deg,rgba(210,223,240,0.40)_0%,rgba(210,223,240,0.00)_78.71%)] before:content-[''] after:absolute after:top-1/2 after:right-[26%] after:block after:h-px after:w-[43px] after:-translate-y-1/2 after:rotate-180 after:bg-[linear-gradient(270deg,rgba(210,223,240,0.40)_0%,rgba(210,223,240,0.00)_78.71%)] after:content-[''] sm:before:left-[35%] sm:after:right-[35%]">
                        Or
                      </p>

                      <div className="space-y-4 md:space-y-6">
                        <Link
                          href="#"
                          className="bg-background-5 hover:bg-stroke-3/25 group flex w-full items-center justify-center gap-2 rounded-2xl border border-transparent px-8 py-3 transition-all duration-300 ease-in-out"
                        >
                          <span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              aria-hidden
                            >
                              <path
                                d="M21.7541 12.2199C21.7541 11.4182 21.6878 10.8332 21.5441 10.2266H12.2031V13.8449H17.6861C17.5756 14.744 16.9786 16.0982 15.6521 17.0082L15.6335 17.1293L18.5869 19.3715L18.7915 19.3916C20.6708 17.6907 21.7541 15.1882 21.7541 12.2199Z"
                                fill="#4285F4"
                              />
                              <path
                                d="M12.2002 21.7514C14.8864 21.7514 17.1415 20.8847 18.7886 19.3897L15.6492 17.0063C14.8091 17.5805 13.6815 17.9813 12.2002 17.9813C9.56932 17.9813 7.33635 16.2805 6.54036 13.9297L6.42369 13.9394L3.35266 16.2686L3.3125 16.378C4.94853 19.563 8.30907 21.7514 12.2002 21.7514Z"
                                fill="#34A853"
                              />
                              <path
                                d="M6.53907 13.9306C6.32904 13.3239 6.20749 12.6739 6.20749 12.0023C6.20749 11.3305 6.32904 10.6806 6.52802 10.0739L6.52246 9.94471L3.41294 7.57812L3.3112 7.62555C2.63691 8.94723 2.25 10.4314 2.25 12.0023C2.25 13.5731 2.63691 15.0572 3.3112 16.3789L6.53907 13.9306Z"
                                fill="#FBBC05"
                              />
                              <path
                                d="M12.2003 6.01997C14.0685 6.01997 15.3286 6.8108 16.0472 7.47168L18.855 4.785C17.1306 3.21417 14.8865 2.25 12.2003 2.25C8.3091 2.25 4.94854 4.43832 3.3125 7.62329L6.52933 10.0717C7.33638 7.72083 9.56936 6.01997 12.2003 6.01997Z"
                                fill="#EB4335"
                              />
                            </svg>
                          </span>
                          <span className="text-tagline-3 font-normal text-white/90">
                            Continue with Google
                          </span>
                        </Link>
                        <Link
                          href="#"
                          className="bg-background-5 hover:bg-stroke-3/25 group flex w-full items-center justify-center gap-2 rounded-2xl border border-transparent px-8 py-3 transition-all duration-300 ease-in-out"
                        >
                          <span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              aria-hidden
                            >
                              <path
                                d="M22.5 12.0642C22.5 6.22974 17.799 1.5 12 1.5C6.20101 1.5 1.5 6.22974 1.5 12.0642C1.5 17.337 5.33968 21.7075 10.3594 22.5V15.1179H7.69336V12.0642H10.3594V9.73675C10.3594 7.08911 11.927 5.62663 14.3254 5.62663C15.4738 5.62663 16.6758 5.83296 16.6758 5.83296V8.43274H15.3518C14.0475 8.43274 13.6406 9.24713 13.6406 10.0834V12.0642H16.5527L16.0872 15.1179H13.6406V22.5C18.6603 21.7075 22.5 17.337 22.5 12.0642Z"
                                fill="#0C63D4"
                              />
                            </svg>
                          </span>
                          <span className="text-tagline-3 font-normal text-white/90">
                            Continue with facebook
                          </span>
                        </Link>
                      </div>
                    </div>
                  </form>
                </RevealAnimation>

                <RevealAnimation delay={0.1} instant>
                  <figure className="overflow-hidden rounded-lg">
                    <Image
                      src={sideImage}
                      alt=""
                      width={sideImage.width}
                      height={sideImage.height}
                      className="size-full object-cover"
                      sizes="(max-width: 768px) 100vw, 475px"
                    />
                  </figure>
                </RevealAnimation>
              </div>
            </RevealAnimation>
          </div>

          <RevealAnimation delay={0.1} instant>
            <p className="text-tagline-3 pt-7 text-center font-normal text-white/90">
              Already have an account?{' '}
              <Link href="/login" className="text-opai-blue hover:underline">
                Log in
              </Link>
            </p>
          </RevealAnimation>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
