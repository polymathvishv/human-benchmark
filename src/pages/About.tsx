import styles from './About.module.css';
import SEO from '../components/SEO';

export default function About() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "https://humanbenchmark.in/about"
        },
        "name": "About Human Benchmark",
        "description": "Learn about the science behind Human Benchmark and our mission to help people understand their cognitive strengths through reaction time, memory, and typing tests."
      },
      {
        "@type": "Person",
        "@id": "https://humanbenchmark.in/about#creator",
        "name": "Vishv Kamani",
        "url": "https://www.linkedin.com/in/vishvkamani/",
        "sameAs": ["https://www.linkedin.com/in/vishvkamani/"],
        "jobTitle": "Founder & Developer",
        "worksFor": {
          "@type": "WebSite",
          "name": "Human Benchmark",
          "url": "https://humanbenchmark.in"
        }
      }
    ]
  };

  return (
    <>
      <SEO
        title="About Human Benchmark - Brain & Cognitive Benchmarks"
        description="Learn about Human Benchmark, the free platform for testing reaction time, memory, typing speed, and other cognitive abilities. Created by Vishv Kamani."
        canonical="https://humanbenchmark.in/about"
        jsonLd={schema}
      />
      <div className={styles.container}>
        <div className={styles.content}>

          <h1 className={styles.heading}>About Human Benchmark</h1>
          <p className={styles.text}>
            Human Benchmark is a free, browser-based platform dedicated to measuring and understanding
            the full spectrum of human cognitive performance. From the speed of a visual reflex to the
            depth of short-term working memory, our tests are carefully designed to give you accurate,
            meaningful scores you can actually learn from — not just numbers on a screen.
          </p>
          <p className={styles.text}>
            The platform was born from a simple question: <em>how do you know how fast your brain really is?</em>
            Anecdotal comparisons don't cut it. Self-reported estimates are wildly inaccurate. The only way
            to get a true picture of your cognitive abilities is to measure them — rigorously, repeatably,
            and in a way that allows you to compare against a real global dataset.
          </p>

          <h2 className={styles.subheading}>Our Mission</h2>
          <p className={styles.text}>
            Our mission is threefold: to make high-quality cognitive benchmarking accessible to everyone
            for free; to build the world's largest, most diverse dataset of human cognitive performance;
            and to educate people about the neuroscience behind the abilities they're testing. We believe
            that understanding your brain is the first step to improving it.
          </p>
          <p className={styles.text}>
            Whether you're a competitive gamer looking to sharpen your reflexes, a student studying how
            working memory affects learning, an athlete monitoring your mental performance across a season,
            or simply someone curious about how your mind compares to the global average — Human Benchmark
            provides the tools and the context to make that comparison meaningful.
          </p>

          <h2 className={styles.subheading}>The Tests: What We Measure and Why</h2>
          <p className={styles.text}>
            Every test on the platform corresponds to a well-established domain of cognitive or motor science.
            Here's a brief breakdown of what each measurement actually tells you about your brain:
          </p>

          <div className={styles.testGrid}>
            <div className={styles.testCard}>
              <h3 className={styles.testCardTitle}>⚡ Reaction Time</h3>
              <p className={styles.testCardText}>
                Measures the time between a visual stimulus appearing and your physical response. This is
                dominated by neural conduction velocity and attentional readiness. The global median hovers
                around 273 ms — top performers consistently achieve sub-200 ms.
              </p>
            </div>
            <div className={styles.testCard}>
              <h3 className={styles.testCardTitle}>🧩 Sequence Memory</h3>
              <p className={styles.testCardText}>
                Tests the visuospatial sketchpad component of Baddeley's Working Memory Model. Your brain
                must encode, retain, and replay an increasingly long ordered sequence — a direct measure of
                short-term memory capacity and procedural recall.
              </p>
            </div>
            <div className={styles.testCard}>
              <h3 className={styles.testCardTitle}>🎯 Aim Trainer</h3>
              <p className={styles.testCardText}>
                Quantifies motor precision and speed simultaneously using Fitts's Law — the foundational model
                for predicting the time required to rapidly move to a target area. Your score reflects both
                fine motor control and visuomotor integration.
              </p>
            </div>
            <div className={styles.testCard}>
              <h3 className={styles.testCardTitle}>🔢 Number Memory</h3>
              <p className={styles.testCardText}>
                Tests your digit span — one of the oldest and most replicated measures in cognitive psychology.
                The average adult can reliably hold 7 ± 2 items in working memory. This test finds your
                personal ceiling.
              </p>
            </div>
            <div className={styles.testCard}>
              <h3 className={styles.testCardTitle}>💬 Verbal Memory</h3>
              <p className={styles.testCardText}>
                Measures semantic memory and recognition. Unlike recall tasks, recognition memory shows how
                much your brain implicitly stores beyond what you can consciously retrieve — a core component
                of language and long-term learning.
              </p>
            </div>
            <div className={styles.testCard}>
              <h3 className={styles.testCardTitle}>🐒 Chimp Test</h3>
              <p className={styles.testCardText}>
                Adapted from Kyoto University research showing young chimpanzees outperform adult humans at
                photographic number recall. Tests eidetic spatial memory under time pressure — an area where
                human cognition trades raw speed for language and abstract reasoning.
              </p>
            </div>
            <div className={styles.testCard}>
              <h3 className={styles.testCardTitle}>👁 Visual Memory</h3>
              <p className={styles.testCardText}>
                Evaluates spatial pattern recognition and the capacity of visual short-term memory (VSTM).
                Research shows most people can hold 3–5 objects in VSTM at once. This test progressively
                challenges that limit.
              </p>
            </div>
            <div className={styles.testCard}>
              <h3 className={styles.testCardTitle}>⌨️ Typing Speed</h3>
              <p className={styles.testCardText}>
                Measures words per minute (WPM) and accuracy on a standardized passage. Beyond productivity,
                typing speed is a well-validated proxy for working memory utilization and motor sequence
                automation.
              </p>
            </div>
          </div>

          <h2 className={styles.subheading}>How Scores and Percentiles Work</h2>
          <p className={styles.text}>
            Every score on Human Benchmark is placed on a percentile curve built from real test data
            collected globally. When you see that your reaction time puts you in the 80th percentile,
            it means your score is faster than 80% of all recorded attempts across all devices and
            locations. The data pool is global, diverse, and continuously growing.
          </p>
          <p className={styles.text}>
            We make no adjustments for age, device type, or geography in the global percentile — your
            raw score is compared to the raw population. This keeps the benchmark honest. However, we
            do note that hardware latency (monitor refresh rate, mouse response time, internet connection
            for networked tests) can influence certain scores, which is why we publish our methodology
            openly.
          </p>
          <p className={styles.text}>
            Scores are designed to be repeatable and comparable over time. If you create a free account,
            you can track your personal best scores across sessions and watch your performance improve.
            Users who practice consistently show measurable improvement — particularly in reaction time,
            aim accuracy, and typing speed.
          </p>

          <h2 className={styles.subheading}>Meet the Creator</h2>
          <div className={styles.creatorCard}>
            <div className={styles.creatorInfo}>
              <h3 className={styles.creatorName}>Vishv Kamani</h3>
              <p className={styles.creatorRole}>Founder & Developer</p>
              <p className={styles.text}>
                Human Benchmark was designed, built, and is maintained entirely by Vishv Kamani — a
                developer passionate about the intersection of web technology and cognitive science.
                The vision was to create a platform that takes the rigour of psychometric research and
                makes it freely accessible to anyone with a browser, without registration walls or
                paywalls.
              </p>
              <p className={styles.text}>
                The platform's scope continues to expand. New cognitive tests and features are regularly
                added based on user feedback, published research, and emerging areas of cognitive
                science. If you have ideas, feedback, or want to connect, Vishv is always happy to hear
                from the community.
              </p>
              <div className={styles.creatorLinks}>
                <a
                  href="https://www.linkedin.com/in/vishvkamani/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.linkedinButton}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  Connect on LinkedIn
                </a>
                <a
                  href="mailto:vishv@humanbenchmark.in"
                  className={styles.emailButton}
                >
                  vishv@humanbenchmark.in
                </a>
              </div>
            </div>
          </div>

          <h2 className={styles.subheading}>The Science Library</h2>
          <p className={styles.text}>
            Beyond the tests themselves, Human Benchmark features a growing library of long-form science
            articles that explore the research underlying each cognitive domain. These articles cover
            everything from the neuroscience of reaction time to the evolutionary origins of working
            memory, drawing on peer-reviewed research and written to be accessible to a general audience.
          </p>
          <p className={styles.text}>
            The science library is an ongoing project. Articles are continually added, updated, and refined
            to reflect current research. If you notice a factual inaccuracy or have a topic you'd like us
            to cover, please don't hesitate to reach out.
          </p>

          <h2 className={styles.subheading}>Important Disclaimer</h2>
          <p className={styles.text}>
            The tests and content on Human Benchmark are designed for <strong>educational and entertainment
            purposes only</strong>. They are not clinical assessments and should not be used for medical
            diagnosis, clinical decision-making, or as a substitute for professional neuropsychological
            evaluation. Scores on this platform do not diagnose or rule out any cognitive condition.
          </p>
          <p className={styles.text}>
            If you have concerns about your cognitive health, please consult a qualified healthcare
            professional.
          </p>

          <div className={styles.contactCard}>
            <h3 className={styles.contactHeading}>Get in Touch</h3>
            <p className={styles.text}>
              Have questions, feedback, or suggestions for new tests? We&apos;d love to hear from you.
              Visit our <a href="/contact" className={styles.link}>Contact page</a> or reach us at:
            </p>
            <div className={styles.emailList}>
              <div className={styles.emailRow}>
                <span className={styles.emailLabel}>General</span>
                <a href="mailto:contact@humanbenchmark.in" className={styles.link}>contact@humanbenchmark.in</a>
              </div>
              <div className={styles.emailRow}>
                <span className={styles.emailLabel}>Support</span>
                <a href="mailto:support@humanbenchmark.in" className={styles.link}>support@humanbenchmark.in</a>
              </div>
              <div className={styles.emailRow}>
                <span className={styles.emailLabel}>Business</span>
                <a href="mailto:business@humanbenchmark.in" className={styles.link}>business@humanbenchmark.in</a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
