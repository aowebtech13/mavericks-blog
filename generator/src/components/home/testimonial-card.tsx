import Image, { type StaticImageData } from 'next/image';

export interface TestimonialCardProps {
  description: string;
  image: StaticImageData | string;
  name: string;
  position: string;
}

const TestimonialCard = ({ description, image, name, position }: TestimonialCardProps) => {
  const authorId = `testimonial-author-${name.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div className="bg-stroke-1/11 relative h-[350px] w-full max-w-[414px] overflow-hidden rounded-2xl p-px xl:h-[381px]">
      <div className="ai-kw-generator-border-animation size-[40px]" aria-hidden />

      <div
        className="from-background-3 to-background-5 relative z-20 h-[348px] w-full max-w-[412px] space-y-12 rounded-2xl bg-radial-[52.78%_57.9%_at_3.87%_7.86%] px-8 py-8 xl:h-[379px] xl:px-11 xl:py-[82px]"
        aria-labelledby={authorId}
      >
        <p className="text-tagline-2 font-inter-tight text-center font-normal text-white/60">
          {description}
        </p>

        <div className="space-y-1 text-center">
          <figure className="mx-auto size-12 overflow-hidden rounded-full" aria-label={`Profile of ${name}`}>
            <Image
              src={image}
              alt={`${name}, ${position}`}
              width={48}
              height={48}
              className="size-full object-cover"
            />
          </figure>
          <div>
            <h3 id={authorId} className="font-inter-tight text-tagline-2 font-semibold text-white">
              {name}
            </h3>
            <p className="font-inter-tight text-tagline-3 font-normal text-white/60">{position}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
