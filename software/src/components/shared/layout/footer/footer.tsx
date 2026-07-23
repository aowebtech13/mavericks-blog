import RevealAnimation from '@/src/components/animation/reveal-animation';
import { footerColumns } from '@/src/data/footer';
import FooterBottom from './footer-bottom';
import FooterBrand from './footer-brand';
import FooterLinkColumn from './footer-link-column';

const Footer = () => (
  <footer className="bg-background-5 pt-[80px] pb-7 lg:pt-[120px] xl:pt-[176px]">
    <div className="main-container">
      <RevealAnimation delay={0.1}>
        <div className="bg-background-6 border-stroke-1/10 space-y-16 rounded-[30px] border p-9">
          <div className="grid grid-cols-12 gap-6">
            <FooterBrand />
            <div className="col-span-12 grid grid-cols-12 gap-y-8 sm:gap-8 md:col-span-8">
              {footerColumns.map((column, index) => (
                <RevealAnimation delay={0.2 + index * 0.1} key={column.title}>
                  <FooterLinkColumn key={column.title} title={column.title} items={column.items} />
                </RevealAnimation>
              ))}
            </div>
          </div>
          <FooterBottom />
        </div>
      </RevealAnimation>
    </div>
  </footer>
);

export default Footer;
