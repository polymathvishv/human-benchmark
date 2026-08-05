import styles from './GameInfo.module.css';

export default function ChimpTestInfo() {
  return (
    <div className={styles.infoSection}>
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>What the Chimp Test measures</h2>
        <p className={styles.text}>
          The Chimp Test directly measures <strong>visuospatial working memory</strong> - Your brain's ability to hold and recall the precise spatial positions of objects you have seen briefly. Unlike digit span (which uses verbal rehearsal), this task relies on the visuospatial sketchpad component of working memory - The same system probed by <span className={styles.link}>visual memory</span> and the ordered-recall <span className={styles.link}>sequence memory</span> test.
        </p>

        <div className={styles.grid3}>
          <div className={styles.factCard} style={{ backgroundColor: '#fffbeb', border: '1px solid #fef3c7' }}>
            <div className={styles.factTitle} style={{ color: '#92400e' }}>Visuospatial memory</div>
            <div className={styles.factText} style={{ color: '#b45309' }}>
              Encoding and retaining the precise grid positions of each number during the flash window.
            </div>
          </div>
          <div className={styles.factCard} style={{ backgroundColor: '#eff6ff', border: '1px solid #dbeafe' }}>
            <div className={styles.factTitle} style={{ color: '#1e3a8a' }}>Sequential processing</div>
            <div className={styles.factText} style={{ color: '#1e40af' }}>
              Maintaining a strict ordered recall (1→N) while spatial locations are no longer visible.
            </div>
          </div>
          <div className={styles.factCard} style={{ backgroundColor: '#f0fdf4', border: '1px solid #dcfce7' }}>
            <div className={styles.factTitle} style={{ color: '#14532d' }}>Processing speed</div>
            <div className={styles.factText} style={{ color: '#166534' }}>
              Rapid encoding of multiple spatial positions within the brief display window.
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Baddeley's Working Memory Model</h2>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th style={{ backgroundColor: '#d97706' }}>Component</th>
                <th style={{ backgroundColor: '#d97706' }}>Function</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: 600, color: '#4b5563' }}>Central executive</td>
                <td style={{ color: '#6b7280' }}>Attention control - Coordinates the other components</td>
              </tr>
              <tr style={{ backgroundColor: '#fffbeb' }}>
                <td style={{ fontWeight: 700, color: '#b45309' }}>Visuospatial sketchpad</td>
                <td><strong style={{ color: '#92400e' }}>Primary component tested here.</strong> <span style={{ color: '#b45309' }}>Holds visual and spatial information</span></td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600, color: '#4b5563' }}>Phonological loop</td>
                <td style={{ color: '#6b7280' }}>Verbal rehearsal - Used in digit span tests, NOT this one</td>
              </tr>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <td style={{ fontWeight: 600, color: '#4b5563' }}>Episodic buffer</td>
                <td style={{ color: '#6b7280' }}>Integrates information across memory systems</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Chimp Test Score Distribution</h2>
        <p className={styles.text}>
          The distribution of maximum numbers recalled before first failure. Most users fail at 4–6. Reaching 8 puts you in the top 5%. Chimpanzees trained by Matsuzawa reliably reach 9+.
        </p>

        <div style={{ width: '100%', maxWidth: '100%', height: '200px', margin: '1.5rem 0', position: 'relative', overflow: 'hidden' }}>
          <svg viewBox="0 0 800 200" width="100%" height="100%" preserveAspectRatio="none" style={{ maxWidth: '100%', display: 'block' }}>
            {/* Grid lines */}
            <line x1="0" y1="180" x2="800" y2="180" stroke="#e5e7eb" strokeWidth="2" />
            <line x1="0" y1="135" x2="800" y2="135" stroke="#f3f4f6" strokeWidth="1" />
            <line x1="0" y1="90" x2="800" y2="90" stroke="#f3f4f6" strokeWidth="1" />
            <line x1="0" y1="45" x2="800" y2="45" stroke="#f3f4f6" strokeWidth="1" />
            
            {/* Bars for distribution */}
            <path d="M 50 180 L 50 170 L 130 170 L 130 180 Z" fill="#fcd34d" />
            <path d="M 150 180 L 150 140 L 230 140 L 230 180 Z" fill="#fbbf24" />
            <path d="M 250 180 L 250 60 L 330 60 L 330 180 Z" fill="#f59e0b" />
            <path d="M 350 180 L 350 20 L 430 20 L 430 180 Z" fill="#d97706" />
            <path d="M 450 180 L 450 50 L 530 50 L 530 180 Z" fill="#b45309" />
            <path d="M 550 180 L 550 110 L 630 110 L 630 180 Z" fill="#92400e" />
            <path d="M 650 180 L 650 150 L 730 150 L 730 180 Z" fill="#78350f" />

            {/* Labels */}
            <text x="90" y="198" fontSize="12" fill="#6b7280" textAnchor="middle">2-3</text>
            <text x="190" y="198" fontSize="12" fill="#6b7280" textAnchor="middle">4</text>
            <text x="290" y="198" fontSize="12" fill="#6b7280" textAnchor="middle">5</text>
            <text x="390" y="198" fontSize="12" fill="#d97706" fontWeight="bold" textAnchor="middle">6</text>
            <text x="490" y="198" fontSize="12" fill="#6b7280" textAnchor="middle">7</text>
            <text x="590" y="198" fontSize="12" fill="#6b7280" textAnchor="middle">8</text>
            <text x="690" y="198" fontSize="12" fill="#6b7280" textAnchor="middle">9+</text>
          </svg>
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th style={{ backgroundColor: '#d97706' }}>Max numbers</th>
                <th style={{ backgroundColor: '#d97706' }}>Percentile</th>
                <th style={{ backgroundColor: '#d97706' }}>Classification</th>
                <th style={{ backgroundColor: '#d97706' }}>% of users</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: 700, color: '#111827', fontFamily: 'monospace', fontSize: '1rem' }}>2–3</td>
                <td style={{ color: '#4b5563' }}>Bottom 5%</td>
                <td><span className={styles.highlightBadge} style={{ backgroundColor: '#fee2e2', color: '#b91c1c' }}>Very low</span></td>
                <td style={{ color: '#6b7280' }}>5%</td>
              </tr>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <td style={{ fontWeight: 700, color: '#111827', fontFamily: 'monospace', fontSize: '1rem' }}>4</td>
                <td style={{ color: '#4b5563' }}>25th</td>
                <td><span className={styles.highlightBadge} style={{ backgroundColor: '#ffedd5', color: '#c2410c' }}>Below average</span></td>
                <td style={{ color: '#6b7280' }}>20%</td>
              </tr>
              <tr style={{ backgroundColor: '#fffbeb' }}>
                <td style={{ fontWeight: 700, color: '#92400e', fontFamily: 'monospace', fontSize: '1rem' }}>5 - Human avg</td>
                <td style={{ fontWeight: 700, color: '#111827' }}>50th</td>
                <td><span className={styles.highlightBadge} style={{ backgroundColor: '#f3f4f6', color: '#374151' }}>Average</span></td>
                <td style={{ color: '#6b7280' }}>28%</td>
              </tr>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <td style={{ fontWeight: 700, color: '#111827', fontFamily: 'monospace', fontSize: '1rem' }}>6</td>
                <td style={{ color: '#4b5563' }}>72nd</td>
                <td><span className={styles.highlightBadge} style={{ backgroundColor: '#dbeafe', color: '#1d4ed8' }}>Above average</span></td>
                <td style={{ color: '#6b7280' }}>22%</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700, color: '#111827', fontFamily: 'monospace', fontSize: '1rem' }}>7</td>
                <td style={{ color: '#4b5563' }}>87th</td>
                <td><span className={styles.highlightBadge} style={{ backgroundColor: '#dcfce7', color: '#15803d' }}>Strong</span></td>
                <td style={{ color: '#6b7280' }}>13%</td>
              </tr>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <td style={{ fontWeight: 700, color: '#111827', fontFamily: 'monospace', fontSize: '1rem' }}>8</td>
                <td style={{ color: '#4b5563' }}>95th</td>
                <td><span className={styles.highlightBadge} style={{ backgroundColor: '#f3e8ff', color: '#7e22ce' }}>Elite</span></td>
                <td style={{ color: '#6b7280' }}>7%</td>
              </tr>
              <tr style={{ backgroundColor: '#fef2f2' }}>
                <td style={{ fontWeight: 700, color: '#7f1d1d', fontFamily: 'monospace', fontSize: '1rem' }}>9+ - Chimp avg</td>
                <td style={{ color: '#4b5563' }}>Top 2%</td>
                <td><span className={styles.highlightBadge} style={{ backgroundColor: '#fecaca', color: '#991b1b' }}>Chimpanzee territory</span></td>
                <td style={{ color: '#6b7280' }}>&lt;2%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
