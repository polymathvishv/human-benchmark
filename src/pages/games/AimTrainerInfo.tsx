import styles from './GameInfo.module.css';

export default function AimTrainerInfo() {
  return (
    <div className={styles.infoSection}>
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>What the Aim Trainer Measures</h2>
        <p className={styles.text}>
          The Aim Trainer measures <strong>visuomotor target acquisition time</strong> - The complete chain from visual detection of a new target to successful motor execution (clicking). This composite score combines three sub-processes:
        </p>

        <div className={styles.grid2}>
          <div className={styles.factCard} style={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb' }}>
            <div className={styles.factTitle} style={{ color: '#9ca3af', textTransform: 'uppercase', fontSize: '0.75rem' }}>Visual Search</div>
            <div className={styles.statValue} style={{ color: '#2563eb', marginBottom: '0.5rem' }}>~20–80ms</div>
            <div className={styles.factText} style={{ color: '#4b5563' }}>
              Detecting the target's position in the field. Faster with high-contrast targets and peripheral attention training.
            </div>
          </div>
          <div className={styles.factCard} style={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb' }}>
            <div className={styles.factTitle} style={{ color: '#9ca3af', textTransform: 'uppercase', fontSize: '0.75rem' }}>Motor Planning</div>
            <div className={styles.statValue} style={{ color: '#2563eb', marginBottom: '0.5rem' }}>~50–120ms</div>
            <div className={styles.factText} style={{ color: '#4b5563' }}>
              Computing the trajectory from current cursor position to target center. Affected by target size and distance (Fitts' Law).
            </div>
          </div>
          <div className={styles.factCard} style={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb' }}>
            <div className={styles.factTitle} style={{ color: '#9ca3af', textTransform: 'uppercase', fontSize: '0.75rem' }}>Motor Execution</div>
            <div className={styles.statValue} style={{ color: '#2563eb', marginBottom: '0.5rem' }}>~80–200ms</div>
            <div className={styles.factText} style={{ color: '#4b5563' }}>
              Moving the cursor accurately to the target and registering a click. Affected by mouse hardware, surface, and fine motor skill.
            </div>
          </div>
        </div>

        <div className={styles.box} style={{ backgroundColor: '#eff6ff', borderColor: '#bfdbfe' }}>
          <h3 className={styles.boxTitle} style={{ color: '#1e3a8a', textTransform: 'none' }}>Fitts' Law (1954)</h3>
          <p className={styles.text} style={{ fontSize: '0.875rem', color: '#1e40af' }}>
            The fundamental model governing target acquisition states that movement time is a function of target distance and target size:
          </p>
          <div style={{ backgroundColor: 'white', border: '1px solid #bfdbfe', borderRadius: '8px', padding: '1rem', fontFamily: 'monospace', textAlign: 'center', color: '#1e3a8a', marginBottom: '1rem' }}>
            MT = a + b · log₂(2D / W)
          </div>
          <p style={{ fontSize: '0.75rem', color: '#1d4ed8' }}>
            Where MT = movement time, D = distance to target, W = target width, and a/b are empirically determined constants. Human Benchmark uses a fixed target size and random placement, so your score reflects both target acquisition speed and cursor control precision.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>How You Compare Globally</h2>
        <p className={styles.text}>
          Benchmark thresholds below are hardware-agnostic - Results include all device types. Because aim builds on raw reflex speed, comparing your result to your <span className={styles.link}>simple reaction time</span> shows how much of your score is targeting versus pure reflex.
        </p>

        <div style={{ width: '100%', maxWidth: '100%', height: '200px', margin: '1.5rem 0', position: 'relative', overflow: 'hidden' }}>
          <svg viewBox="0 0 800 200" width="100%" height="100%" preserveAspectRatio="none" style={{ maxWidth: '100%', display: 'block' }}>
            {/* Grid lines */}
            <line x1="0" y1="180" x2="800" y2="180" stroke="#e5e7eb" strokeWidth="2" />
            <line x1="0" y1="135" x2="800" y2="135" stroke="#f3f4f6" strokeWidth="1" />
            <line x1="0" y1="90" x2="800" y2="90" stroke="#f3f4f6" strokeWidth="1" />
            <line x1="0" y1="45" x2="800" y2="45" stroke="#f3f4f6" strokeWidth="1" />
            
            {/* Bars for distribution (centered around 380-400ms) */}
            <path d="M 50 180 L 50 175 L 90 175 L 90 180 Z" fill="#bbf7d0" />
            <path d="M 100 180 L 100 160 L 140 160 L 140 180 Z" fill="#86efac" />
            <path d="M 150 180 L 150 130 L 190 130 L 190 180 Z" fill="#4ade80" />
            <path d="M 200 180 L 200 90 L 240 90 L 240 180 Z" fill="#22c55e" />
            <path d="M 250 180 L 250 50 L 290 50 L 290 180 Z" fill="#16a34a" />
            <path d="M 300 180 L 300 30 L 340 30 L 340 180 Z" fill="#15803d" />
            <path d="M 350 180 L 350 55 L 390 55 L 390 180 Z" fill="#16a34a" />
            <path d="M 400 180 L 400 95 L 440 95 L 440 180 Z" fill="#22c55e" />
            <path d="M 450 180 L 450 120 L 490 120 L 490 180 Z" fill="#4ade80" />
            <path d="M 500 180 L 500 145 L 540 145 L 540 180 Z" fill="#86efac" />
            <path d="M 550 180 L 550 160 L 590 160 L 590 180 Z" fill="#bbf7d0" />
            <path d="M 600 180 L 600 165 L 640 165 L 640 180 Z" fill="#dcfce7" />
            <path d="M 650 180 L 650 170 L 690 170 L 690 180 Z" fill="#dcfce7" />
            <path d="M 700 180 L 700 175 L 740 175 L 740 180 Z" fill="#f0fdf4" />

            {/* Labels */}
            <text x="70" y="198" fontSize="12" fill="#6b7280" textAnchor="middle">150ms</text>
            <text x="320" y="198" fontSize="12" fill="#15803d" fontWeight="bold" textAnchor="middle">400ms</text>
            <text x="520" y="198" fontSize="12" fill="#6b7280" textAnchor="middle">600ms</text>
            <text x="720" y="198" fontSize="12" fill="#6b7280" textAnchor="middle">800ms+</text>
          </svg>
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th style={{ backgroundColor: '#f9fafb', color: '#6b7280', textTransform: 'uppercase', fontSize: '0.75rem' }}>Rank</th>
                <th style={{ backgroundColor: '#f9fafb', color: '#6b7280', textTransform: 'uppercase', fontSize: '0.75rem' }}>Avg ms / target</th>
                <th style={{ backgroundColor: '#f9fafb', color: '#6b7280', textTransform: 'uppercase', fontSize: '0.75rem' }}>Who scores here</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: 600, color: '#111827' }}>Top 1%</td>
                <td style={{ fontWeight: 700, color: '#111827', fontFamily: 'monospace', fontSize: '1rem' }}>&lt;200ms</td>
                <td style={{ color: '#4b5563', fontSize: '0.75rem' }}>Pro-level esports players, trained aimers</td>
              </tr>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <td style={{ fontWeight: 600, color: '#111827' }}>Top 5%</td>
                <td style={{ fontWeight: 700, color: '#111827', fontFamily: 'monospace', fontSize: '1rem' }}>200–250ms</td>
                <td style={{ color: '#4b5563', fontSize: '0.75rem' }}>Competitive FPS players, daily practice</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600, color: '#111827' }}>Top 10%</td>
                <td style={{ fontWeight: 700, color: '#111827', fontFamily: 'monospace', fontSize: '1rem' }}>250–280ms</td>
                <td style={{ color: '#4b5563', fontSize: '0.75rem' }}>Regular gamers with good hardware</td>
              </tr>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <td style={{ fontWeight: 600, color: '#111827' }}>Top 25%</td>
                <td style={{ fontWeight: 700, color: '#111827', fontFamily: 'monospace', fontSize: '1rem' }}>280–340ms</td>
                <td style={{ color: '#4b5563', fontSize: '0.75rem' }}>Casual gamers, frequent PC users</td>
              </tr>
              <tr style={{ backgroundColor: '#eff6ff' }}>
                <td style={{ fontWeight: 600, color: '#1d4ed8' }}>Median</td>
                <td style={{ fontWeight: 700, color: '#111827', fontFamily: 'monospace', fontSize: '1rem' }}>380ms</td>
                <td style={{ color: '#4b5563', fontSize: '0.75rem' }}>Global average across all users and devices</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600, color: '#111827' }}>Bottom 25%</td>
                <td style={{ fontWeight: 700, color: '#111827', fontFamily: 'monospace', fontSize: '1rem' }}>480–600ms</td>
                <td style={{ color: '#4b5563', fontSize: '0.75rem' }}>Infrequent PC use, touchscreen, older users</td>
              </tr>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <td style={{ fontWeight: 600, color: '#111827' }}>Bottom 10%</td>
                <td style={{ fontWeight: 700, color: '#111827', fontFamily: 'monospace', fontSize: '1rem' }}>&gt;600ms</td>
                <td style={{ color: '#4b5563', fontSize: '0.75rem' }}>Touchscreen, unfamiliar input, slow hardware</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
