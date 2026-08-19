import { useState, type FormEvent } from 'react';
import styles from './Contact.module.css';
import SEO from '../components/SEO';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

const SUBJECTS = [
  'General Question',
  'Bug Report',
  'Feature Suggestion',
  'Test Result Issue',
  'Account Help',
  'Science Article Feedback',
  'Business / Partnership',
  'Other',
];

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [message, setMessage] = useState('');
  const [formState, setFormState] = useState<FormState>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = 'Please enter your name.';
    if (!email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!message.trim()) newErrors.message = 'Please enter a message.';
    else if (message.trim().length < 20) newErrors.message = 'Message must be at least 20 characters.';
    return newErrors;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setFormState('submitting');

    // Build mailto link — sends to the actual email address
    const mailtoSubject = encodeURIComponent(`[Human Benchmark] ${subject} - from ${name}`);
    const mailtoBody = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`
    );
    const mailtoHref = `mailto:contact@humanbenchmark.in?subject=${mailtoSubject}&body=${mailtoBody}`;

    // Open the email client
    window.location.href = mailtoHref;

    // Show success after a short delay
    setTimeout(() => setFormState('success'), 800);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setSubject(SUBJECTS[0]);
    setMessage('');
    setFormState('idle');
    setErrors({});
  };

  return (
    <>
      <SEO
        title="Contact Human Benchmark"
        description="Get in touch with the Human Benchmark team. Report bugs, suggest new cognitive tests, or send feedback. We respond within 24–48 hours."
        canonical="https://humanbenchmark.in/contact"
      />
      <div className={styles.container}>
        <div className={styles.content}>

          <div className={styles.header}>
            <div className={styles.iconContainer}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
            <h1 className={styles.heading}>Contact Us</h1>
            <p className={styles.text}>
              Have a question, found a bug, or want to suggest a new test? Fill out the form below
              and we'll get back to you within 24–48 hours.
            </p>
          </div>

          {formState === 'success' ? (
            <div className={styles.successCard}>
              <div className={styles.successIcon}>✓</div>
              <h2 className={styles.successHeading}>Message Sent!</h2>
              <p className={styles.successText}>
                Your email client should have opened. We've received your details and will respond
                to <strong>{email}</strong> within 24–48 hours.
              </p>
              <p className={styles.successText} style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: 0 }}>
                Need urgent help? Email us directly at{' '}
                <a href="mailto:support@humanbenchmark.in" className={styles.inlineLink}>
                  support@humanbenchmark.in
                </a>.
              </p>
              <button className={styles.resetButton} onClick={handleReset}>
                Send Another Message
              </button>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit} noValidate>

              {/* Name */}
              <div className={styles.fieldGroup}>
                <label htmlFor="contact-name" className={styles.label}>
                  Your Name <span className={styles.required}>*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                  placeholder="e.g. Jane Doe"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  disabled={formState === 'submitting'}
                  autoComplete="name"
                />
                {errors.name && <p className={styles.errorText}>{errors.name}</p>}
              </div>

              {/* Email */}
              <div className={styles.fieldGroup}>
                <label htmlFor="contact-email" className={styles.label}>
                  Your Email <span className={styles.required}>*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                  placeholder="e.g. jane@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  disabled={formState === 'submitting'}
                  autoComplete="email"
                />
                {errors.email && <p className={styles.errorText}>{errors.email}</p>}
              </div>

              {/* Subject */}
              <div className={styles.fieldGroup}>
                <label htmlFor="contact-subject" className={styles.label}>Subject</label>
                <select
                  id="contact-subject"
                  className={styles.select}
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  disabled={formState === 'submitting'}
                >
                  {SUBJECTS.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div className={styles.fieldGroup}>
                <label htmlFor="contact-message" className={styles.label}>
                  Message <span className={styles.required}>*</span>
                </label>
                <textarea
                  id="contact-message"
                  className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
                  placeholder="Describe your question or feedback in detail..."
                  rows={6}
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  disabled={formState === 'submitting'}
                />
                <div className={styles.charCount}>{message.length} characters</div>
                {errors.message && <p className={styles.errorText}>{errors.message}</p>}
              </div>

              <button
                type="submit"
                className={styles.submitButton}
                disabled={formState === 'submitting'}
              >
                {formState === 'submitting' ? (
                  <>
                    <span className={styles.spinner} aria-hidden="true" />
                    Sending…
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                    </svg>
                    Send Message
                  </>
                )}
              </button>

              <p className={styles.directEmail}>
                Or email us directly:{' '}
                <a href="mailto:contact@humanbenchmark.in" className={styles.inlineLink}>
                  contact@humanbenchmark.in
                </a>
              </p>

            </form>
          )}

        </div>

        {/* ── Contact Cards ── */}
        <div className={styles.contactCards}>
          <div className={styles.contactCard}>
            <div className={styles.contactCardIcon}>✉️</div>
            <div>
              <h3 className={styles.contactCardTitle}>General Enquiries</h3>
              <p className={styles.contactCardDesc}>Questions about tests, features, or general feedback.</p>
              <a href="mailto:contact@humanbenchmark.in" className={styles.inlineLink}>contact@humanbenchmark.in</a>
            </div>
          </div>
          <div className={styles.contactCard}>
            <div className={styles.contactCardIcon}>🛠️</div>
            <div>
              <h3 className={styles.contactCardTitle}>Technical Support</h3>
              <p className={styles.contactCardDesc}>Bug reports, account issues, and test result problems.</p>
              <a href="mailto:support@humanbenchmark.in" className={styles.inlineLink}>support@humanbenchmark.in</a>
            </div>
          </div>
          <div className={styles.contactCard}>
            <div className={styles.contactCardIcon}>💼</div>
            <div>
              <h3 className={styles.contactCardTitle}>Business & Partnerships</h3>
              <p className={styles.contactCardDesc}>Sponsorships, collaborations, and press enquiries.</p>
              <a href="mailto:business@humanbenchmark.in" className={styles.inlineLink}>business@humanbenchmark.in</a>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
