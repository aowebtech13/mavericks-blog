import NotFoundHero from '@/src/components/not-found/not-found-hero';
import NotFoundHelpfulLinks from '@/src/components/not-found/not-found-helpful-links';

const NotFoundContent = () => {
  return (
    <section className="pt-29 pb-24 md:pb-29 lg:pt-39 lg:pb-36 xl:pb-39">
      <div className="main-container space-y-14 md:space-y-24 lg:space-y-36 xl:space-y-39">
        <NotFoundHero />
        <NotFoundHelpfulLinks />
      </div>
    </section>
  );
};

export default NotFoundContent;
