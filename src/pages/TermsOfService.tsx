import styles from './About.module.css';
import privacyStyles from './PrivacyPolicy.module.css';
import SEO from '../components/SEO';

export default function TermsOfService() {
  return (
    <>
      <SEO
        title="Terms of Service | Human Benchmark"
        description="Read the Human Benchmark Terms of Service. Understand the rules, limitations, and user agreement for using our cognitive tests and platform."
        canonical="https://humanbenchmark.in/terms"
      />
      <div className={styles.container}>
        <div className={styles.content}>

          <h1 className={styles.heading}>Terms of Service</h1>
          <p className={privacyStyles.lastUpdated}>Last updated: August 2025</p>
          <p className={styles.text}>
            Please read these Terms of Service (&quot;Terms&quot;) carefully before using the Human Benchmark
            website located at{' '}
            <a href="https://humanbenchmark.in" className={styles.link}>humanbenchmark.in</a>{' '}
            (the &quot;Service&quot;). By accessing or using our Service, you agree to be bound by these Terms.
            If you disagree with any part of these Terms, please do not use our Service.
          </p>

          <h2 className={styles.subheading}>1. Acceptance of Terms</h2>
          <p className={styles.text}>
            By accessing and using Human Benchmark, you accept and agree to be bound by these Terms of
            Service and our{' '}
            <a href="/privacy" className={styles.link}>Privacy Policy</a>, incorporated herein by
            reference. These Terms apply to all visitors, users, and others who access or use the Service.
          </p>

          <h2 className={styles.subheading}>2. Description of Service</h2>
          <p className={styles.text}>
            Human Benchmark provides free, browser-based cognitive performance tests including (but not
            limited to) reaction time tests, memory tests, typing speed tests, and aim training. The
            platform also provides educational articles about cognitive science, global leaderboards,
            and optional user accounts for score tracking. The tests and content are provided for
            educational and entertainment purposes only.
          </p>

          <h2 className={styles.subheading}>3. User Accounts</h2>
          <p className={styles.text}>
            You may use many features of Human Benchmark without creating an account. If you choose to
            create an account:
          </p>
          <ul className={privacyStyles.list}>
            <li>You must provide a valid email address and choose a username.</li>
            <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
            <li>You are responsible for all activities that occur under your account.</li>
            <li>You must notify us immediately of any unauthorised use of your account.</li>
            <li>You must be at least 13 years of age to create an account.</li>
          </ul>
          <p className={styles.text}>
            We reserve the right to suspend or terminate accounts that violate these Terms or that
            contain inappropriate usernames.
          </p>

          <h2 className={styles.subheading}>4. Acceptable Use</h2>
          <p className={styles.text}>
            You agree to use Human Benchmark only for lawful purposes and in a way that does not
            infringe upon the rights of others. You agree not to:
          </p>
          <ul className={privacyStyles.list}>
            <li>Use automated tools, bots, scripts, or other mechanisms to submit false test results or manipulate leaderboards.</li>
            <li>Attempt to probe, scan, or test the vulnerability of our systems or networks.</li>
            <li>Engage in any conduct that restricts or inhibits any other user from using the Service.</li>
            <li>Transmit any content that is unlawful, harmful, threatening, abusive, defamatory, or otherwise objectionable.</li>
            <li>Attempt to gain unauthorised access to any portion or feature of the Service.</li>
            <li>Use the Service for any commercial purpose without our express written consent.</li>
            <li>Reverse-engineer, decompile, or disassemble any portion of the Service.</li>
          </ul>

          <h2 className={styles.subheading}>5. Intellectual Property</h2>
          <p className={styles.text}>
            The Service and its original content, features, and functionality — including the test
            designs, scoring algorithms, visual design, logos, and articles — are and will remain the
            exclusive property of Human Benchmark and its creator, Vishv Kamani. The Service is protected
            by copyright, trademark, and other applicable laws.
          </p>
          <p className={styles.text}>
            Our content may not be reproduced, distributed, modified, or used to create derivative works
            without our explicit written permission. You are, however, permitted to share links to our
            content and reference our statistics with appropriate attribution.
          </p>

          <h2 className={styles.subheading}>6. User-Submitted Content</h2>
          <p className={styles.text}>
            By submitting test results or contact form messages to our platform, you grant Human Benchmark
            a non-exclusive, worldwide, royalty-free licence to use, store, and analyse this data for
            the purposes described in our Privacy Policy. You represent that you own or have the right
            to submit any content you provide.
          </p>

          <h2 className={styles.subheading}>7. Third-Party Services</h2>
          <p className={styles.text}>
            Our Service uses or links to third-party services, including:
          </p>
          <ul className={privacyStyles.list}>
            <li><strong>Google Firebase</strong> — for authentication and database services.</li>
            <li><strong>Google Analytics</strong> — for usage analytics.</li>
            <li><strong>Google AdSense</strong> — for displaying advertisements.</li>
          </ul>
          <p className={styles.text}>
            These services are governed by their own terms and privacy policies. We are not responsible
            for the practices of third-party services. Links to external sites in our science articles
            are provided for reference only — we do not endorse and are not responsible for third-party
            content.
          </p>

          <h2 className={styles.subheading}>8. Disclaimers</h2>
          <p className={styles.text}>
            THE SERVICE IS PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS WITHOUT ANY WARRANTIES
            OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY,
            FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
          </p>
          <p className={styles.text}>
            The tests on Human Benchmark are for <strong>educational and entertainment purposes only</strong>.
            They are not validated clinical or medical instruments and must not be used for any clinical,
            diagnostic, employment screening, or similar purpose. Scores on this platform do not
            constitute a medical or psychological diagnosis of any kind.
          </p>
          <p className={styles.text}>
            We do not guarantee that the Service will be uninterrupted, error-free, or free from viruses
            or other harmful components. We do not warrant the accuracy or completeness of any content
            on the Service.
          </p>

          <h2 className={styles.subheading}>9. Limitation of Liability</h2>
          <p className={styles.text}>
            TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL HUMAN BENCHMARK, ITS
            CREATOR, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR
            PUNITIVE DAMAGES ARISING FROM YOUR USE OF OR INABILITY TO USE THE SERVICE, EVEN IF WE HAVE
            BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
          </p>
          <p className={styles.text}>
            Our total liability to you for any claim arising out of or relating to these Terms or the
            Service is limited to the amount you paid us in the past twelve months (which, given the
            Service is free, will typically be zero).
          </p>

          <h2 className={styles.subheading}>10. Termination</h2>
          <p className={styles.text}>
            We reserve the right to suspend or terminate your access to the Service at any time, with
            or without notice, for conduct that we believe violates these Terms or is harmful to other
            users, us, or third parties, or for any other reason at our sole discretion.
          </p>

          <h2 className={styles.subheading}>11. Governing Law</h2>
          <p className={styles.text}>
            These Terms shall be governed by and construed in accordance with the laws of India.
            Any disputes arising from these Terms or your use of the Service will be subject to the
            exclusive jurisdiction of the courts of India.
          </p>

          <h2 className={styles.subheading}>12. Changes to Terms</h2>
          <p className={styles.text}>
            We reserve the right to modify these Terms at any time. When we make changes, we will
            update the &quot;Last updated&quot; date above. Your continued use of the Service after any changes
            constitutes your acceptance of the new Terms. We encourage you to review these Terms
            periodically.
          </p>

          <h2 className={styles.subheading}>13. Contact Us</h2>
          <p className={styles.text}>
            If you have any questions about these Terms of Service, please contact us:
          </p>
          <div className={styles.contactCard}>
            <p className={styles.text} style={{ margin: 0 }}>
              <strong>General contact:</strong>{' '}
              <a href="mailto:contact@humanbenchmark.in" className={styles.link}>contact@humanbenchmark.in</a>
              <br />
              <strong>Technical support:</strong>{' '}
              <a href="mailto:support@humanbenchmark.in" className={styles.link}>support@humanbenchmark.in</a>
              <br />
              <strong>Business enquiries:</strong>{' '}
              <a href="mailto:business@humanbenchmark.in" className={styles.link}>business@humanbenchmark.in</a>
              <br />
              <strong>Website:</strong>{' '}
              <a href="https://humanbenchmark.in" className={styles.link}>humanbenchmark.in</a>
            </p>
          </div>

        </div>
      </div>
    </>
  );
}
