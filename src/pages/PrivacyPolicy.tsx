import styles from './About.module.css';
import SEO from '../components/SEO';

export default function PrivacyPolicy() {
  return (
    <>
      <SEO
        title="Privacy Policy | Human Benchmark"
        description="Read the Human Benchmark privacy policy. Learn how we collect, use, and protect your data when you use our cognitive tests."
        canonical="https://humanbenchmark.in/privacy"
      />
      <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.heading}>Privacy Policy</h1>
        <p className={styles.text}>
          Last updated: {new Date().toLocaleDateString()}
        </p>
        <p className={styles.text}>
          At Human Benchmark (accessible from humanbenchmark.in), one of our main priorities is the privacy of our visitors. 
          This Privacy Policy document contains types of information that is collected and recorded by Human Benchmark and how we use it.
        </p>

        <h3 className={styles.subheading}>Information We Collect</h3>
        <p className={styles.text}>
          We collect information to provide better services to all our users. The types of personal information we collect include:
        </p>
        <ul className={styles.text} style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
          <li style={{ marginBottom: '0.5rem' }}><strong>Test Results:</strong> We collect your scores and performance data from the cognitive tests you take on our platform. This data is used anonymously to generate the global statistics and percentiles.</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>Account Information:</strong> If you choose to create an account to save your scores, we will collect your email address and a username.</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>Usage Data:</strong> We may collect information on how the service is accessed and used, including your computer's Internet Protocol address (IP address), browser type, browser version, and the pages of our service that you visit.</li>
        </ul>

        <h3 className={styles.subheading}>How We Use Your Information</h3>
        <p className={styles.text}>
          We use the collected data for various purposes:
        </p>
        <ul className={styles.text} style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
          <li style={{ marginBottom: '0.5rem' }}>To provide and maintain our service</li>
          <li style={{ marginBottom: '0.5rem' }}>To generate anonymous statistical benchmarks and percentiles</li>
          <li style={{ marginBottom: '0.5rem' }}>To notify you about changes to our service</li>
          <li style={{ marginBottom: '0.5rem' }}>To allow you to participate in interactive features of our service when you choose to do so</li>
          <li style={{ marginBottom: '0.5rem' }}>To provide customer support</li>
          <li style={{ marginBottom: '0.5rem' }}>To monitor the usage of our service and detect technical issues</li>
        </ul>

        <h3 className={styles.subheading}>Cookies</h3>
        <p className={styles.text}>
          Like any other website, Human Benchmark uses 'cookies'. These cookies are used to store information including visitors' preferences, 
          and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience 
          by customizing our web page content based on visitors' browser type and/or other information.
        </p>

        <h3 className={styles.subheading}>Contact Us</h3>
        <p className={styles.text}>
          If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at <a href="mailto:privacy@humanbenchmark.in" className={styles.link}>privacy@humanbenchmark.in</a>.
        </p>
      </div>
    </div>
    </>
  );
}
