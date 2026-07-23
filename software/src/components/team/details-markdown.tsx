import RevealAnimation from '@/src/components/animation/reveal-animation';
import ReactMarkdown from 'react-markdown';
import rehypeSlug from 'rehype-slug';

export interface TeamDetailsMarkdownProps {
  readonly content: string;
}

const TeamDetailsMarkdown = ({ content }: TeamDetailsMarkdownProps) => (
  <section className="pb-20 md:pb-30 lg:pb-44">
    <div className="main-container">
      <RevealAnimation delay={0.1}>
        <div className="team-details">
          <ReactMarkdown rehypePlugins={[[rehypeSlug]]}>{content}</ReactMarkdown>
        </div>
      </RevealAnimation>
    </div>
  </section>
);

export default TeamDetailsMarkdown;
