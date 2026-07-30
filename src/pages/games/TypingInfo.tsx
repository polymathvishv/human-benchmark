import styles from './GameInfo.module.css';

export default function TypingInfo() {
  return (
    <div className={styles.infoSection}>
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>What Is a Good Typing Speed?</h2>
        <p className={styles.text}>
          WPM is calculated by counting the number of correctly typed words per 60 seconds (one "word" = 5 keystrokes, including spaces). The global average has risen significantly over the past 20 years as smartphones and laptops became ubiquitous - But so has the variance, with casual typists rarely exceeding 45 WPM while programmers and writers frequently exceed 90. Typing speed pairs naturally with processing speed and reaction time as complementary measures of how quickly you can translate thought into output.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>WPM Percentile Reference</h2>
        
        <div style={{ width: '100%', height: '200px', margin: '2rem 0', position: 'relative' }}>
          <svg viewBox="0 0 800 200" width="100%" height="100%" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
            {/* Grid lines */}
            <line x1="0" y1="180" x2="800" y2="180" stroke="#e5e7eb" strokeWidth="2" />
            <line x1="0" y1="135" x2="800" y2="135" stroke="#f3f4f6" strokeWidth="1" />
            <line x1="0" y1="90" x2="800" y2="90" stroke="#f3f4f6" strokeWidth="1" />
            <line x1="0" y1="45" x2="800" y2="45" stroke="#f3f4f6" strokeWidth="1" />
            
            {/* Bars for distribution (centered around 50-60) */}
            <path d="M 50 180 L 50 170 L 90 170 L 90 180 Z" fill="#cbd5e1" />
            <path d="M 100 180 L 100 130 L 140 130 L 140 180 Z" fill="#94a3b8" />
            <path d="M 150 180 L 150 70 L 190 70 L 190 180 Z" fill="#64748b" />
            <path d="M 200 180 L 200 30 L 240 30 L 240 180 Z" fill="#475569" />
            <path d="M 250 180 L 250 40 L 290 40 L 290 180 Z" fill="#334155" />
            <path d="M 300 180 L 300 80 L 340 80 L 340 180 Z" fill="#475569" />
            <path d="M 350 180 L 350 120 L 390 120 L 390 180 Z" fill="#64748b" />
            <path d="M 400 180 L 400 150 L 440 150 L 440 180 Z" fill="#94a3b8" />
            <path d="M 450 180 L 450 165 L 490 165 L 490 180 Z" fill="#cbd5e1" />
            <path d="M 500 180 L 500 172 L 540 172 L 540 180 Z" fill="#e2e8f0" />
            <path d="M 550 180 L 550 175 L 590 175 L 590 180 Z" fill="#f1f5f9" />
            <path d="M 600 180 L 600 178 L 640 178 L 640 180 Z" fill="#f1f5f9" />
            <path d="M 650 180 L 650 179 L 690 179 L 690 180 Z" fill="#f8fafc" />
            <path d="M 700 180 L 700 179 L 740 179 L 740 180 Z" fill="#f8fafc" />

            {/* Labels */}
            <text x="70" y="198" fontSize="12" fill="#6b7280" textAnchor="middle">20</text>
            <text x="220" y="198" fontSize="12" fill="#334155" fontWeight="bold" textAnchor="middle">50</text>
            <text x="370" y="198" fontSize="12" fill="#6b7280" textAnchor="middle">80</text>
            <text x="520" y="198" fontSize="12" fill="#6b7280" textAnchor="middle">110</text>
            <text x="670" y="198" fontSize="12" fill="#6b7280" textAnchor="middle">140+</text>
          </svg>
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th style={{ backgroundColor: '#334155' }}>WPM Range</th>
                <th style={{ backgroundColor: '#334155' }}>Percentile</th>
                <th style={{ backgroundColor: '#334155' }}>Classification</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: 700, color: '#111827', fontFamily: 'monospace', fontSize: '1rem' }}>&lt;30 WPM</td>
                <td style={{ color: '#4b5563' }}>Bottom 15%</td>
                <td><span className={styles.highlightBadge} style={{ backgroundColor: '#fee2e2', color: '#b91c1c' }}>Beginner</span></td>
              </tr>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <td style={{ fontWeight: 700, color: '#111827', fontFamily: 'monospace', fontSize: '1rem' }}>30–50 WPM</td>
                <td style={{ color: '#4b5563' }}>15th–45th</td>
                <td><span className={styles.highlightBadge} style={{ backgroundColor: '#ffedd5', color: '#c2410c' }}>Below average</span></td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700, color: '#111827', fontFamily: 'monospace', fontSize: '1rem' }}>51–65 WPM</td>
                <td style={{ color: '#4b5563' }}>45th–65th</td>
                <td><span className={styles.highlightBadge} style={{ backgroundColor: '#fef9c3', color: '#a16207' }}>Average</span></td>
              </tr>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <td style={{ fontWeight: 700, color: '#111827', fontFamily: 'monospace', fontSize: '1rem' }}>66–80 WPM</td>
                <td style={{ color: '#4b5563' }}>65th–80th</td>
                <td><span className={styles.highlightBadge} style={{ backgroundColor: '#dcfce7', color: '#15803d' }}>Above average</span></td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700, color: '#111827', fontFamily: 'monospace', fontSize: '1rem' }}>81–100 WPM</td>
                <td style={{ color: '#4b5563' }}>80th–93rd</td>
                <td><span className={styles.highlightBadge} style={{ backgroundColor: '#dbeafe', color: '#1d4ed8' }}>Fast typist</span></td>
              </tr>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <td style={{ fontWeight: 700, color: '#111827', fontFamily: 'monospace', fontSize: '1rem' }}>100–120 WPM</td>
                <td style={{ color: '#4b5563' }}>93rd–99th</td>
                <td><span className={styles.highlightBadge} style={{ backgroundColor: '#f1f5f9', color: '#334155' }}>Professional level</span></td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700, color: '#111827', fontFamily: 'monospace', fontSize: '1rem' }}>120+ WPM</td>
                <td style={{ color: '#4b5563' }}>Top 1%</td>
                <td><span className={styles.highlightBadge} style={{ backgroundColor: '#334155', color: '#ffffff' }}>Elite</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Occupational Benchmarks</h2>
        <p className={styles.text}>
          Different professions have different typing requirements. Many jobs now specify minimum WPM in job postings - Here's what various roles typically require or produce in practice.
        </p>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th style={{ backgroundColor: '#334155' }}>Role</th>
                <th style={{ backgroundColor: '#334155' }}>Minimum Required</th>
                <th style={{ backgroundColor: '#334155' }}>Typical Average</th>
                <th style={{ backgroundColor: '#334155' }}>Top Performers</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: 600, color: '#111827' }}>General office worker</td>
                <td style={{ color: '#4b5563' }}>35 WPM</td>
                <td style={{ fontWeight: 700, color: '#111827', fontFamily: 'monospace' }}>52 WPM</td>
                <td style={{ color: '#4b5563' }}>70+ WPM</td>
              </tr>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <td style={{ fontWeight: 600, color: '#111827' }}>Administrative assistant</td>
                <td style={{ color: '#4b5563' }}>50–60 WPM</td>
                <td style={{ fontWeight: 700, color: '#111827', fontFamily: 'monospace' }}>65 WPM</td>
                <td style={{ color: '#4b5563' }}>90+ WPM</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600, color: '#111827' }}>Software developer</td>
                <td style={{ color: '#4b5563' }}>No formal requirement</td>
                <td style={{ fontWeight: 700, color: '#111827', fontFamily: 'monospace' }}>70 WPM</td>
                <td style={{ color: '#4b5563' }}>100+ WPM</td>
              </tr>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <td style={{ fontWeight: 600, color: '#111827' }}>Journalist / writer</td>
                <td style={{ color: '#4b5563' }}>65 WPM</td>
                <td style={{ fontWeight: 700, color: '#111827', fontFamily: 'monospace' }}>78 WPM</td>
                <td style={{ color: '#4b5563' }}>110+ WPM</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600, color: '#111827' }}>Data entry specialist</td>
                <td style={{ color: '#4b5563' }}>60–80 WPM</td>
                <td style={{ fontWeight: 700, color: '#111827', fontFamily: 'monospace' }}>75 WPM</td>
                <td style={{ color: '#4b5563' }}>100+ WPM</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Factors That Affect Typing Speed</h2>
        
        <div className={styles.grid3}>
          <div className={styles.factCard} style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe' }}>
            <div className={styles.factTitle} style={{ color: '#1e40af' }}>Touch typing</div>
            <div className={styles.factText} style={{ color: '#1e3a8a' }}>
              Adds +25–40 WPM compared to hunt-and-peck. <strong>Highly trainable</strong> over weeks of practice.
            </div>
          </div>
          <div className={styles.factCard} style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0' }}>
            <div className={styles.factTitle} style={{ color: '#166534' }}>Keyboard hardware</div>
            <div className={styles.factText} style={{ color: '#14532d' }}>
              Mechanical switches can add +5–10 WPM for some typists due to tactile feedback.
            </div>
          </div>
          <div className={styles.factCard} style={{ backgroundColor: '#fffbeb', border: '1px solid #fef3c7' }}>
            <div className={styles.factTitle} style={{ color: '#92400e' }}>Word familiarity</div>
            <div className={styles.factText} style={{ color: '#b45309' }}>
              Typing common words is 10–15% faster due to motor chunking of frequent letter sequences.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
