import RevealAnimation from '@/src/components/animation/reveal-animation';
import PrimaryLinkButton from '@/src/components/shared/ui/button/primary-link-button';

type LinkCard = {
  shapeClass: string;
  title: string;
  buttonText: string;
  href: string;
  delay: number;
};

const cards: LinkCard[] = [
  {
    shapeClass: 'ns-shape-40',
    title: 'Return to the homepage',
    buttonText: 'Go home',
    href: '/',
    delay: 0.1,
  },
  {
    shapeClass: 'ns-shape-42',
    title: 'Explore our services',
    buttonText: 'View services',
    href: '/services',
    delay: 0.12,
  },
  {
    shapeClass: 'ns-shape-44',
    title: 'Talk to our team',
    buttonText: 'Contact us',
    href: '/contact',
    delay: 0.14,
  },
  {
    shapeClass: 'ns-shape-46',
    title: 'Browse resources',
    buttonText: 'View blog',
    href: '/blog',
    delay: 0.16,
  },
];

const NotFoundHelpfulLinks = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-1 text-center">
        <RevealAnimation delay={0.1} instant>
          <h2 className="text-sora-heading-4 md:text-sora-heading-3 lg:text-sora-heading-2 font-sora font-normal text-white">
            Helpful Links
          </h2>
        </RevealAnimation>
        <RevealAnimation delay={0.2} instant>
          <p className="font-inter-tight text-tagline-2 font-normal text-white/50">
            Explore our services, resources, and contact us for any questions.
          </p>
        </RevealAnimation>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {cards.map(({ shapeClass, title, buttonText, href, delay }) => (
          <RevealAnimation key={title} delay={delay} instant>
            <div className="bg-background-5 flex flex-col justify-between space-y-14 rounded-lg p-6 md:p-8">
              <div className="space-y-6">
                <span className={`${shapeClass} inline-block text-4xl text-white`} aria-hidden />
                <h4 className="font-inter-tight text-tagline-2 block font-normal text-white/90">{title}</h4>
              </div>
              <div>
                <PrimaryLinkButton href={href} wrapperClassName="inline-block">
                  {buttonText}
                </PrimaryLinkButton>
              </div>
            </div>
          </RevealAnimation>
        ))}
      </div>
    </div>
  );
};

export default NotFoundHelpfulLinks;
