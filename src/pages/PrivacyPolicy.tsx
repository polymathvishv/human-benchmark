import styles from './About.module.css';
import privacyStyles from './PrivacyPolicy.module.css';
import SEO from '../components/SEO';

export default function PrivacyPolicy() {
  return (
    <>
      <SEO
        title="Privacy Policy | Human Benchmark"
        description="Read the Human Benchmark privacy policy. Learn how we collect, use, and protect your data, including our use of Google AdSense and advertising cookies."
        canonical="https://humanbenchmark.in/privacy"
      />
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.heading}>Privacy Policy</h1>
          <p className={privacyStyles.lastUpdated}>
            Last updated: August 2025
          </p>
          <p className={styles.text}>
            At Human Benchmark (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), accessible from{' '}
            <a href="https://humanbenchmark.in" className={styles.link}>humanbenchmark.in</a>, your
            privacy is important to us. This Privacy Policy explains what information we collect, how
            we use it, and the choices you have. By using our site, you agree to the practices
            described in this document.
          </p>

          <h2 className={styles.subheading}>1. Information We Collect</h2>

          <h3 className={privacyStyles.subSubHeading}>a) Information You Provide Directly</h3>
          <p className={styles.text}>
            When you create an account or contact us, we may collect:
          </p>
          <ul className={privacyStyles.list}>
            <li><strong>Email address</strong> — used to identify your account and communicate with you.</li>
            <li><strong>Username</strong> — a display name of your choice for leaderboards.</li>
            <li><strong>Contact form submissions</strong> — the content of messages you send us via our contact form.</li>
          </ul>

          <h3 className={privacyStyles.subSubHeading}>b) Test Results and Performance Data</h3>
          <p className={styles.text}>
            We collect the scores and performance data from the cognitive tests you take. This data is
            used to compute global statistics, generate percentile rankings, and improve the accuracy
            of our benchmarks. Results are associated with your account if you are logged in, or stored
            anonymously if you are not.
          </p>

          <h3 className={privacyStyles.subSubHeading}>c) Automatically Collected Data</h3>
          <p className={styles.text}>
            When you visit our website, we automatically collect certain technical information, including:
          </p>
          <ul className={privacyStyles.list}>
            <li>IP address (used for security and analytics, not personally identified)</li>
            <li>Browser type and version</li>
            <li>Operating system and device type</li>
            <li>Pages visited and time spent on each page</li>
            <li>Referring website (where you came from)</li>
            <li>Timestamps of visits</li>
          </ul>

          <h2 className={styles.subheading}>2. Cookies and Tracking Technologies</h2>
          <p className={styles.text}>
            Human Benchmark uses cookies — small text files stored on your device — to operate and
            improve the service. We use the following categories of cookies:
          </p>
          <ul className={privacyStyles.list}>
            <li><strong>Essential cookies:</strong> Required to keep you logged in and remember your session preferences. These cannot be disabled without breaking core site functionality.</li>
            <li><strong>Analytics cookies (Google Analytics):</strong> We use Google Analytics to understand how visitors use our site. Google Analytics collects data such as pages visited, time on site, and general location (city-level). This data is aggregated and anonymous. You can opt out via the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className={styles.link}>Google Analytics Opt-out Browser Add-on</a>.</li>
            <li><strong>Advertising cookies (Google AdSense):</strong> We use Google AdSense to display advertisements on our site. Google AdSense and its advertising partners may use cookies to serve ads based on your prior visits to our website and other websites. Google's use of advertising cookies enables it and its partners to serve ads based on your visit to our site and/or other sites on the Internet. You may opt out of personalised advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className={styles.link}>Google Ads Settings</a>. You can also opt out of a third-party vendor's use of cookies for personalised advertising by visiting <a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer" className={styles.link}>aboutads.info</a>.</li>
            <li><strong>Preference cookies:</strong> Store your preferences such as high scores cached locally and display settings.</li>
          </ul>
          <p className={styles.text}>
            Most browsers allow you to control cookies through their settings. However, disabling certain
            cookies may limit your ability to use some features of our site. For more information about
            how Google uses data from partner sites, see:{' '}
            <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className={styles.link}>
              How Google uses data when you use our partners&apos; sites or apps
            </a>.
          </p>

          <h2 className={styles.subheading}>3. Advertising</h2>
          <p className={styles.text}>
            Third-party vendors, including Google, use cookies to serve ads on our site. Google's use
            of the DART cookie enables it to serve ads to our users based on their visit to our site
            and other sites on the Internet. Users may opt out of the use of the DART cookie by visiting
            the{' '}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className={styles.link}>
              Google ad and content network Privacy Policy
            </a>.
          </p>
          <p className={styles.text}>
            Our advertising partners (including Google AdSense) may collect and use information about
            your visits to our site and other websites in order to provide advertisements about goods
            and services that may be of interest to you. If you would like more information about this
            practice and to know your choices about not having this information used by advertising
            companies, please visit the{' '}
            <a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer" className={styles.link}>
              Network Advertising Initiative opt-out page
            </a>.
          </p>

          <h2 className={styles.subheading}>4. How We Use Your Information</h2>
          <p className={styles.text}>We use the information we collect to:</p>
          <ul className={privacyStyles.list}>
            <li>Provide, operate, and maintain our website and services</li>
            <li>Generate anonymous global statistics, percentiles, and leaderboards</li>
            <li>Process and store your personal high scores (if you have an account)</li>
            <li>Respond to your enquiries and support requests</li>
            <li>Send you service-related communications (account-related emails only — no marketing without consent)</li>
            <li>Monitor and analyse usage to improve site performance and content</li>
            <li>Detect and prevent abuse, fraud, and security threats</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2 className={styles.subheading}>5. Data Sharing and Disclosure</h2>
          <p className={styles.text}>
            We do not sell your personal data. We may share information in the following limited circumstances:
          </p>
          <ul className={privacyStyles.list}>
            <li><strong>Service providers:</strong> We use Firebase (Google) for authentication and database services, and Google Analytics for usage analytics. These providers process data on our behalf under strict data processing agreements.</li>
            <li><strong>Advertising partners:</strong> Google AdSense operates as a third-party advertising partner on our site (see Section 3 above).</li>
            <li><strong>Legal requirements:</strong> We may disclose information if required by law, court order, or to protect our legal rights.</li>
            <li><strong>Aggregated data:</strong> We may share non-identifiable, aggregated statistics (e.g., "the global median reaction time is 273 ms") publicly.</li>
          </ul>

          <h2 className={styles.subheading}>6. Data Retention</h2>
          <p className={styles.text}>
            We retain your personal data for as long as your account is active or as needed to provide
            you with the service. If you request deletion of your account, we will delete your personal
            data within 30 days, except where we are required by law to retain certain records.
            Anonymised test result data (not linked to your identity) may be retained indefinitely
            as part of our global statistical dataset.
          </p>

          <h2 className={styles.subheading}>7. Children's Privacy</h2>
          <p className={styles.text}>
            Our service is not directed to children under the age of 13. We do not knowingly collect
            personally identifiable information from anyone under 13. If you are a parent or guardian
            and you are aware that your child has provided us with personal data, please contact us
            immediately. If we become aware that we have collected personal data from a child without
            verification of parental consent, we will take steps to remove that information from our servers.
          </p>

          <h2 className={styles.subheading}>8. Your Rights</h2>
          <p className={styles.text}>
            Depending on your location, you may have the following rights regarding your personal data:
          </p>
          <ul className={privacyStyles.list}>
            <li><strong>Right to access:</strong> Request a copy of the personal data we hold about you.</li>
            <li><strong>Right to rectification:</strong> Request correction of inaccurate data.</li>
            <li><strong>Right to erasure:</strong> Request deletion of your personal data ("right to be forgotten").</li>
            <li><strong>Right to data portability:</strong> Request your data in a machine-readable format.</li>
            <li><strong>Right to object:</strong> Object to certain types of processing, including direct marketing.</li>
          </ul>
          <p className={styles.text}>
            To exercise any of these rights, please contact us at{' '}
            <a href="mailto:support@humanbenchmark.in" className={styles.link}>support@humanbenchmark.in</a>.
            We will respond to all legitimate requests within 30 days.
          </p>

          <h2 className={styles.subheading}>9. Third-Party Links</h2>
          <p className={styles.text}>
            Our website may contain links to third-party websites (for example, links in science articles
            to external research). These sites have their own privacy policies, and we are not responsible
            for their content or privacy practices. We encourage you to review the privacy policy of
            every website you visit.
          </p>

          <h2 className={styles.subheading}>10. Security</h2>
          <p className={styles.text}>
            We take reasonable technical and organisational measures to protect your personal data against
            unauthorised access, loss, or misuse. These include HTTPS encryption, secure authentication
            via Firebase, and restricted access to backend systems. However, no method of transmission
            over the internet is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h2 className={styles.subheading}>11. Changes to This Policy</h2>
          <p className={styles.text}>
            We may update this Privacy Policy from time to time. When we make material changes, we will
            update the "Last updated" date at the top of this page. We encourage you to review this page
            periodically. Continued use of our service after changes constitutes acceptance of the
            updated policy.
          </p>

          <h2 className={styles.subheading}>12. Contact Us</h2>
          <p className={styles.text}>
            If you have any questions, concerns, or requests regarding this Privacy Policy or how we
            handle your data, please contact us:
          </p>
          <div className={styles.contactCard}>
            <p className={styles.text} style={{ margin: 0 }}>
              <strong>Privacy &amp; Data requests:</strong>{' '}
              <a href="mailto:support@humanbenchmark.in" className={styles.link}>support@humanbenchmark.in</a>
              <br />
              <strong>General contact:</strong>{' '}
              <a href="mailto:contact@humanbenchmark.in" className={styles.link}>contact@humanbenchmark.in</a>
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
