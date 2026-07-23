import faqGradient from '@/public/images/gradient/opai-4.png';
import RevealAnimation from '@/src/components/animation/reveal-animation';
import { TextReveal } from '@/src/components/animation/text-reveal-animation';
import {
  Accordion,
  AccordionAction,
  AccordionContent,
  AccordionItem,
} from '@/src/components/shared/ui/accordion';
import Image from 'next/image';

const faqItems = [
  {
    value: '1',
    question: 'What is Nexsas?',
    answer:
      'Nexsas is an AI-powered keyword research tool that helps you discover high-impact keywords for your business or content. Enter a short description of your product or topic and get research-backed keyword clusters and SEO opportunities in minutes—no keyword expertise required.',
  },
  {
    value: '2',
    question: 'How does the AI keyword generator work?',
    answer:
      'You describe your business, product, or topic in a few sentences. Our AI analyzes search behavior and trends to suggest relevant keyword clusters, long-tail phrases, and opportunities. You can group keywords by theme and export them for your content or SEO strategy.',
  },
  {
    value: '3',
    question: 'Do I need SEO experience to use Nexsas?',
    answer:
      'No. Nexsas is built for everyone—content marketers, founders, and teams with or without SEO background. You describe what you do, and the tool surfaces keywords and themes you can use right away. Results are organized so you can apply them to pages, ads, or content without prior keyword knowledge.',
  },
  {
    value: '4',
    question: 'Can I export my keywords?',
    answer:
      'Yes. You can group keywords into themes and export them for your strategy. Use the clusters in your content calendar, SEO briefs, or paid campaigns. Export formats support common workflows so you can plug results directly into your existing tools.',
  },
  {
    value: '5',
    question: 'How accurate are the keyword suggestions?',
    answer:
      'Suggestions combine search-intent signals, topical relevance to your description, and competitive context. No tool can guarantee rankings, but Nexsas is tuned to surface phrases real searchers use so you can prioritize opportunities that match your goals and update lists as trends shift.',
  },
  {
    value: '6',
    question: 'Is there a free plan or trial?',
    answer:
      'You can explore core keyword generation and browsing features without a paid subscription. Paid tiers unlock higher limits, advanced clustering, and team or API options when you are ready to scale—upgrade or downgrade whenever your needs change.',
  },
];

const Faq = () => {
  return (
    <section
      className="relative overflow-hidden py-[80px] md:py-[120px] xl:py-[176px]"
      aria-labelledby="faq-section-heading"
    >
      <RevealAnimation delay={0.4} direction="right">
        <figure className="pointer-events-none absolute -top-[17%] -right-[14%] size-[500px] -rotate-10 select-none md:h-[500px] md:w-[700px]">
          <Image
            src={faqGradient}
            alt=""
            width={700}
            height={500}
            className="size-full object-cover"
          />
        </figure>
      </RevealAnimation>

      <div className="main-container relative z-10">
        <div className="space-y-13 lg:space-y-15 xl:space-y-19">
          <div className="space-y-5 text-center">
            <RevealAnimation delay={0.1}>
              <span
                className="font-inter-tight text-tagline-4 inline-block bg-(image:--color-gradient-23) bg-clip-text text-transparent"
                aria-label="Section subtitle: Frequently Asked Questions"
              >
                FAQ&apos;s
              </span>
            </RevealAnimation>
            <TextReveal delay={0.2}>
              <h2
                id="faq-section-heading"
                className="font-sora text-sora-heading-4 md:text-sora-heading-3 lg:text-sora-heading-2 text-center font-normal text-white"
              >
                Frequently Asked Questions
              </h2>
            </TextReveal>
          </div>

          <RevealAnimation delay={0.3}>
            <Accordion
              defaultOpen="1"
              type="single"
              className="relative z-10 mx-auto w-full max-w-[850px]"
            >
              {faqItems.map((item) => (
                <AccordionItem
                  key={item.value}
                  value={item.value}
                  className="border-stroke-3/11 bg-background-6 relative z-10 overflow-hidden border transition-all duration-300 ease-in-out data-[state=closed]:pb-0 data-[state=open]:pb-6"
                >
                  <AccordionAction className="rounded-md px-6 pt-6 transition-all duration-300 ease-in-out data-[state=closed]:pb-6 data-[state=open]:pb-4">
                    <span className="font-inter-tight text-tagline-1 text-left text-white/90">
                      {item.question}
                    </span>
                  </AccordionAction>
                  <AccordionContent contentClassName="text-tagline-2 px-6 font-inter-tight w-full max-w-[794px] cursor-text text-left text-white/50">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </RevealAnimation>
        </div>
      </div>
    </section>
  );
};

export default Faq;
