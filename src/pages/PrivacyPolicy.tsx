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
            Last updated: August 2026
          </p>
          <p className={styles.text}>
            At Human Benchmark (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), accessible from{' '}
            <a href="https://humanbenchmark.in" className={styles.link}>humanbenchmark.in</a>, your
            privacy is important to us. This Privacy Policy explains what information we collect, how
            we use it, and the choices you have regarding your data, cookies, and advertising preferences.
            By using our site, you agree to the practices described in this document.
          </p>

          <h2 className={styles.subheading}>1. Information We Collect</h2>

          <h3 className={privacyStyles.subSubHeading}>a) Information You Provide Directly</h3>
          <p className={styles.text}>
            When you create an account or contact us, we may collect:
          </p>
          <ul className={privacyStyles.list}>
            <li><strong>Email address</strong> — used to identify your account and communicate with you.</li>
            <li><strong>Username</strong> — a display name of your choice for global leaderboards and multiplayer battles.</li>
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
            <li>IP address (used for security, anti-cheat detection, analytics, and inferring your country for leaderboards)</li>
            <li>Browser type and version</li>
            <li>Operating system and device category (desktop vs mobile)</li>
            <li>Pages visited, time spent, and referring URL</li>
            <li>Timestamps of test completions</li>
          </ul>

          <h2 className={styles.subheading} id="cookies">2. Cookies and Tracking Technologies</h2>
          <p className={styles.text}>
            Human Benchmark uses cookies and similar tracking technologies (such as local and session browser storage) to operate and
            improve the service. We provide an interactive Cookie Consent banner allowing you to choose
            whether to accept advertising cookies. We categorize our technologies as follows:
          </p>
          <ul className={privacyStyles.list}>
            <li><strong>Essential cookies:</strong> Required to keep you authenticated, store your theme preferences, and remember your session state. These cannot be disabled without breaking core platform features.</li>
            <li><strong>Analytics cookies (Google Analytics):</strong> We use Google Analytics to understand aggregate visitor patterns, popular tests, and site performance. This data is aggregated and anonymized. You can opt out at any time via the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className={styles.link}>Google Analytics Opt-out Browser Add-on</a>.</li>
            <li><strong>Advertising cookies (Google AdSense):</strong> We partner with Google AdSense to serve advertisements. Google and its third-party advertising vendors use cookies to serve ads based on your prior visits to our website and other websites on the Internet. AdSense scripts are only loaded after you give consent via our Cookie Banner. You may manage or opt out of personalized advertising at any time by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className={styles.link}>Google Ads Settings</a> or <a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer" className={styles.link}>AboutAds.info</a>.</li>
            <li><strong>Preference &amp; State storage:</strong> We store your local high scores, sound toggles, temporary geolocation data (to show flags on leaderboards), and user preferences locally in your browser storage.</li>
          </ul>
          <p className={styles.text}>
            Most browsers allow you to control cookies through their settings. However, disabling certain
            cookies may limit your ability to use some features of our site. For comprehensive information about
            how Google processes data on partner websites, please review:{' '}
            <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className={styles.link}>
              How Google uses information from sites or apps that use our services
            </a>.
          </p>

          <h2 className={styles.subheading}>3. Advertising &amp; Third-Party Vendors</h2>
          <p className={styles.text}>
            Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits
            to your website or other websites. Google&apos;s use of advertising cookies enables it and its
            partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet.
          </p>
          <p className={styles.text}>
            Users may opt out of personalized advertising by visiting{' '}
            <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer" className={styles.link}>
              Google Ads Settings
            </a>. Alternatively, users can opt out of a third-party vendor&apos;s use of cookies for personalized advertising by visiting{' '}
            <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className={styles.link}>
              www.aboutads.info
            </a>{' '}
            or the{' '}
            <a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer" className={styles.link}>
              Network Advertising Initiative Opt-Out Page
            </a>.
          </p>

          <h2 className={styles.subheading}>4. How We Use Your Information</h2>
          <p className={styles.text}>We use the information we collect to:</p>
          <ul className={privacyStyles.list}>
            <li>Provide, operate, and maintain our cognitive tests and benchmarks</li>
            <li>Generate anonymous global statistical distributions and percentile curves</li>
            <li>Process and sync your high scores across devices when logged in</li>
            <li>Enable real-time multiplayer room battles and leaderboard rankings</li>
            <li>Respond to your feedback, bug reports, and enquiries</li>
            <li>Detect and prevent bot abuse, script cheating, and security threats</li>
            <li>Comply with applicable legal requirements</li>
          </ul>

          <h2 className={styles.subheading}>5. Data Sharing and Service Providers</h2>
          <p className={styles.text}>
            We do not sell, rent, or trade your personal data. We only share information with trusted service providers who adhere to strict data security standards:
          </p>
          <ul className={privacyStyles.list}>
            <li><strong>Database &amp; Authentication:</strong> We use Supabase (PostgreSQL with Row Level Security) to securely manage user authentication and high-score databases.</li>
            <li><strong>Geolocation Services:</strong> We use third-party IP geolocation APIs to temporarily process your IP address to infer your country for leaderboards. They do not store this data.</li>
            <li><strong>Analytics:</strong> Google Analytics (aggregated web traffic analysis) and PostHog (feature analytics).</li>
            <li><strong>Advertising partners:</strong> Google AdSense as an authorized third-party ad network (subject to your consent).</li>
            <li><strong>Legal Compliance:</strong> We may disclose information if required by law or legal process.</li>
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
            via Supabase with Row Level Security, and restricted access to backend systems. However, no method of transmission
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
