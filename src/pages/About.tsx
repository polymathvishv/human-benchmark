import styles from './About.module.css';
import SEO from '../components/SEO';

export default function About() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://humanbenchmark.in/about"
    },
    "name": "About Human Benchmark",
    "description": "Learn about the science behind Human Benchmark and our mission to help people understand their cognitive strengths."
  };

  return (
    <>
      <SEO
        title="About Human Benchmark - Brain & Cognitive Benchmarks"
        description={schema.description}
        keywords="about human benchmark, human benchmark test, humanbenchmark, human bench mark, human benchmarks, cognitive test science, brain performance benchmarks"
        canonical="https://humanbenchmark.in/about"
        jsonLd={schema}
      />
      <div className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.heading}>Welcome to Human Benchmark</h2>
        <p className={styles.text}>
          Human Benchmark is a comprehensive suite of cognitive tests designed to measure your brain's performance. 
          From reaction time to visual memory, our tools provide accurate insights into your cognitive abilities.
        </p>
        <p className={styles.text}>
          Our mission is to help people understand their cognitive strengths and weaknesses, track their performance over time, 
          and learn more about the science behind human performance. Whether you're a competitive gamer looking to improve your reflexes, 
          a student aiming to understand your working memory, or just someone curious about how your brain compares to others, 
          we provide the tools to measure and analyze your mental capabilities.
        </p>
        
        <h3 className={styles.subheading}>The Science Behind the Tests</h3>
        <p className={styles.text}>
          Each of our tests is grounded in established cognitive science and neuropsychological research. 
          We utilize models like Baddeley's Working Memory Model and Fitts's Law to explain not just what your score is, 
          but why it matters and how the underlying neural mechanisms function. 
          By standardizing these tests for the web, we've created one of the largest datasets of human cognitive performance in the world.
        </p>
        
        <h3 className={styles.subheading}>Our Data</h3>
        <p className={styles.text}>
          The percentiles and statistics shown on this site are derived from millions of test results collected globally. 
          We continuously refine our benchmarks to ensure they remain accurate and representative of the diverse hardware 
          and environments our users experience.
        </p>
        
        <div className={styles.contactCard}>
          <h4 className={styles.contactHeading}>Get in Touch</h4>
          <p className={styles.text}>
            Have questions, feedback, or suggestions for new tests? We'd love to hear from you. 
            Contact us at <a href="mailto:contact@humanbenchmark.in" className={styles.link}>contact@humanbenchmark.in</a>.
          </p>
        </div>
        </div>
      </div>
    </>
  );
}
