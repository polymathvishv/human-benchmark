import styles from './GameInfo.module.css';

export default function MobileTypingInfo() {
  return (
    <div className={styles.infoSection}>
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>What is the Mobile Typing Test?</h2>
        <p className={styles.text}>
          Typing on a smartphone touchscreen is a fundamentally different skill than typing on a physical keyboard. 
          Without tactile feedback (the physical feeling of keys), your brain relies more heavily on muscle memory 
          and autocorrect anticipation.
        </p>
        <p className={styles.text}>
          This test simulates a real-world messaging environment. Unlike traditional typing tests that present a giant wall 
          of text, this test measures how quickly and accurately you can process and reply to short, natural messages over a 45-second sprint.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>How Your Score is Calculated</h2>
        <div className={styles.grid2}>
          <div className={styles.box}>
            <div className={styles.boxTitle}>Words Per Minute (WPM)</div>
            <p className={styles.factText}>
              Following standard typing metrics, one "word" is calculated as exactly 5 characters typed correctly. 
              Your final WPM is your total correct characters divided by 5, then scaled to a 60-second minute.
            </p>
          </div>
          <div className={styles.box}>
            <div className={styles.boxTitle}>Accuracy</div>
            <p className={styles.factText}>
              Your accuracy is the percentage of correct keystrokes out of your total keystrokes. 
              Because touchscreen keyboards are prone to "fat-finger" errors, achieving 95%+ accuracy on mobile is highly impressive.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Mobile vs Desktop Speeds</h2>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Percentile</th>
                <th>Desktop WPM</th>
                <th>Mobile WPM</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Average (50th)</td>
                <td>52 WPM</td>
                <td>38 WPM</td>
              </tr>
              <tr>
                <td>Good (75th)</td>
                <td>65 WPM</td>
                <td>50 WPM</td>
              </tr>
              <tr>
                <td>Excellent (95th)</td>
                <td>90 WPM</td>
                <td>70 WPM</td>
              </tr>
              <tr>
                <td>Elite (99th)</td>
                <td>120+ WPM</td>
                <td>85+ WPM</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className={styles.text} style={{ fontSize: '0.875rem', color: '#6b7280' }}>
          *Note: While desktop typists can exceed 150 WPM using 10 fingers, mobile typists using two thumbs physically cap out much earlier. 
          The current world record for smartphone typing on a standard QWERTY keyboard is around 130 WPM.
        </p>
      </section>
      
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Tips to Improve Mobile Typing</h2>
        <div className={styles.grid2}>
          <div className={styles.box}>
            <div className={styles.boxTitle}>1. Two Thumbs Are Better Than One</div>
            <p className={styles.factText}>
              Studies show that two-thumb typing is significantly faster than using a single index finger. 
              Hold the phone securely with both hands to stabilize your grip.
            </p>
          </div>
          <div className={styles.box}>
            <div className={styles.boxTitle}>2. Rely on Muscle Memory</div>
            <p className={styles.factText}>
              Try not to look directly at the keyboard while typing. Keep your eyes on the text input area. 
              Your brain will naturally learn the spatial layout of your screen.
            </p>
          </div>
          <div className={styles.box}>
            <div className={styles.boxTitle}>3. Optimize Your Keyboard</div>
            <p className={styles.factText}>
              Ensure your keyboard size is comfortable for your hand size. 
              Slightly taller keyboards reduce vertical accuracy errors (typing 'u' instead of 'j').
            </p>
          </div>
          <div className={styles.box}>
            <div className={styles.boxTitle}>4. Don't Backspace Too Much</div>
            <p className={styles.factText}>
              In this raw speed test, stopping to fix every single error can destroy your WPM. 
              Sometimes it's faster to maintain your rhythm rather than achieving 100% accuracy.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
