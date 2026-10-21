import Markdown from 'react-markdown';
import styles from './PortfolioChatbot.module.css';

export default function AnswerContent({ content }: { content: string }) {
  return (
    <div className={styles.prose}>
      <Markdown skipHtml allowedElements={['p', 'strong', 'em', 'ul', 'ol', 'li', 'a', 'br', 'code', 'pre', 'blockquote', 'h1', 'h2', 'h3', 'h4', 'hr']}
        components={{
          h1: ({ children }) => <h3>{children}</h3>,
          h2: ({ children }) => <h3>{children}</h3>,
          h3: ({ children }) => <h3>{children}</h3>,
          h4: ({ children }) => <h4>{children}</h4>,
          a: ({ href, children }) => <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>,
        }}>
        {content}
      </Markdown>
    </div>
  );
}
