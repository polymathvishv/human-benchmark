import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import styles from './GameFaqSection.module.css';

interface FaqItem {
  question: string;
  answer: string;
}

interface GameFaqSectionProps {
  faqs: FaqItem[];
  gameTitle: string;
}

/**
 * Collapsible FAQ section rendered below game content.
 *
 * - Each question is a clickable accordion item.
 * - The first FAQ is open by default (Google recommends visible FAQ content).
 * - Uses semantic `<details>/<summary>` pattern for accessibility.
 * - Pairs with FAQPage JSON-LD in GamePageLayout for rich-snippet eligibility.
 */
export default function GameFaqSection({ faqs, gameTitle }: GameFaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!faqs || faqs.length === 0) return null;

  return (
    <section className={styles.faqSection}>
      <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
      <p className={styles.faqSubtitle}>
        Common questions about the {gameTitle}
      </p>
      <div className={styles.faqList}>
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`${styles.faqItem} ${isOpen ? styles.faqItemOpen : ''}`}
            >
              <button
                className={styles.faqQuestion}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
              >
                <span>{faq.question}</span>
                <ChevronDown
                  size={18}
                  className={`${styles.faqChevron} ${isOpen ? styles.faqChevronOpen : ''}`}
                />
              </button>
              <div
                className={`${styles.faqAnswer} ${isOpen ? styles.faqAnswerOpen : ''}`}
                role="region"
              >
                <p>{faq.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
