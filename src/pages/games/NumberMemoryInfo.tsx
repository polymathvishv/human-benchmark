import styles from './GameInfo.module.css';

export default function NumberMemoryInfo() {
  return (
    <div className={styles.infoSection}>
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>How the Number Memory Game Works</h2>
        <p className={styles.text}>
          You start with a single digit. Every correct answer adds one more, and the display time scales with length - Roughly 0.4 seconds per extra digit - So a 10-digit number gives you about five seconds to encode it. One wrong answer ends the run, and your score is the last level you cleared. Levels 1–5 feel trivial; level 7 is where most runs die; double digits is rare territory.
        </p>
        <p className={styles.text}>
          The global average run ends at <strong>level 7</strong>, and reaching 9 digits puts you in the top 10% of players. That 7-digit wall is no accident: in 1956 George Miller famously showed that immediate verbal memory holds about seven items, give or take two.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Baddeley's Working Memory Model</h2>
        <p className={styles.text}>
          The modern scientific understanding of working memory comes from Baddeley and Hitch's multi-component model. The number memory test primarily loads the phonological loop - But skilled performers also recruit the episodic buffer and central executive.
        </p>

        <div className={styles.grid3}>
          <div className={styles.factCard} style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe' }}>
            <div className={styles.factTitle} style={{ color: '#1e40af' }}>Phonological Loop</div>
            <div className={styles.factText} style={{ color: '#1e3a8a' }}>
              Stores verbal/acoustic info via rehearsal. <strong>Primary system for number memory.</strong>
            </div>
          </div>
          <div className={styles.factCard} style={{ backgroundColor: '#e0e7ff', border: '1px solid #c7d2fe' }}>
            <div className={styles.factTitle} style={{ color: '#3730a3' }}>Episodic Buffer</div>
            <div className={styles.factText} style={{ color: '#312e81' }}>
              Integrates info across systems with long-term memory. Used in chunking.
            </div>
          </div>
          <div className={styles.factCard} style={{ backgroundColor: '#f3e8ff', border: '1px solid #e9d5ff' }}>
            <div className={styles.factTitle} style={{ color: '#6b21a8' }}>Visuospatial Sketchpad</div>
            <div className={styles.factText} style={{ color: '#581c87' }}>
              Spatial/visual memory. Can supplement number recall.
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Score Percentile Reference</h2>
        
        <div style={{ width: '100%', height: '200px', margin: '2rem 0', position: 'relative' }}>
          <svg viewBox="0 0 800 200" width="100%" height="100%" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
            {/* Grid lines */}
            <line x1="0" y1="180" x2="800" y2="180" stroke="#e5e7eb" strokeWidth="2" />
            <line x1="0" y1="135" x2="800" y2="135" stroke="#f3f4f6" strokeWidth="1" />
            <line x1="0" y1="90" x2="800" y2="90" stroke="#f3f4f6" strokeWidth="1" />
            <line x1="0" y1="45" x2="800" y2="45" stroke="#f3f4f6" strokeWidth="1" />
            
            {/* Bars for distribution (centered around 7) */}
            <path d="M 50 180 L 50 178 L 90 178 L 90 180 Z" fill="#bfdbfe" />
            <path d="M 100 180 L 100 175 L 140 175 L 140 180 Z" fill="#93c5fd" />
            <path d="M 150 180 L 150 160 L 190 160 L 190 180 Z" fill="#60a5fa" />
            <path d="M 200 180 L 200 140 L 240 140 L 240 180 Z" fill="#3b82f6" />
            <path d="M 250 180 L 250 100 L 290 100 L 290 180 Z" fill="#2563eb" />
            <path d="M 300 180 L 300 60 L 340 60 L 340 180 Z" fill="#1d4ed8" />
            <path d="M 350 180 L 350 20 L 390 20 L 390 180 Z" fill="#1e40af" />
            <path d="M 400 180 L 400 50 L 440 50 L 440 180 Z" fill="#1d4ed8" />
            <path d="M 450 180 L 450 110 L 490 110 L 490 180 Z" fill="#2563eb" />
            <path d="M 500 180 L 500 145 L 540 145 L 540 180 Z" fill="#3b82f6" />
            <path d="M 550 180 L 550 165 L 590 165 L 590 180 Z" fill="#60a5fa" />
            <path d="M 600 180 L 600 170 L 640 170 L 640 180 Z" fill="#93c5fd" />
            <path d="M 650 180 L 650 175 L 690 175 L 690 180 Z" fill="#bfdbfe" />
            <path d="M 700 180 L 700 178 L 740 178 L 740 180 Z" fill="#dbeafe" />

            {/* Labels */}
            <text x="70" y="198" fontSize="12" fill="#6b7280" textAnchor="middle">1</text>
            <text x="370" y="198" fontSize="12" fill="#1e40af" fontWeight="bold" textAnchor="middle">7</text>
            <text x="470" y="198" fontSize="12" fill="#6b7280" textAnchor="middle">9</text>
            <text x="570" y="198" fontSize="12" fill="#6b7280" textAnchor="middle">11</text>
            <text x="720" y="198" fontSize="12" fill="#6b7280" textAnchor="middle">14+</text>
          </svg>
        </div>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th style={{ backgroundColor: '#1d4ed8' }}>Digits Recalled</th>
                <th style={{ backgroundColor: '#1d4ed8' }}>Percentile</th>
                <th style={{ backgroundColor: '#1d4ed8' }}>Classification</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: 700, color: '#111827', fontFamily: 'monospace', fontSize: '1rem' }}>4</td>
                <td style={{ color: '#4b5563' }}>Bottom 5%</td>
                <td><span className={styles.highlightBadge} style={{ backgroundColor: '#fee2e2', color: '#b91c1c' }}>Below clinical range</span></td>
              </tr>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <td style={{ fontWeight: 700, color: '#111827', fontFamily: 'monospace', fontSize: '1rem' }}>5</td>
                <td style={{ color: '#4b5563' }}>5th–20th</td>
                <td><span className={styles.highlightBadge} style={{ backgroundColor: '#ffedd5', color: '#c2410c' }}>Below average</span></td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700, color: '#111827', fontFamily: 'monospace', fontSize: '1rem' }}>6</td>
                <td style={{ color: '#4b5563' }}>20th–45th</td>
                <td><span className={styles.highlightBadge} style={{ backgroundColor: '#fef9c3', color: '#a16207' }}>Low average</span></td>
              </tr>
              <tr style={{ backgroundColor: '#eff6ff' }}>
                <td style={{ fontWeight: 700, color: '#111827', fontFamily: 'monospace', fontSize: '1rem' }}>7</td>
                <td style={{ color: '#1d4ed8' }}>45th–65th</td>
                <td><span className={styles.highlightBadge} style={{ backgroundColor: '#dbeafe', color: '#1d4ed8' }}>Average</span></td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700, color: '#111827', fontFamily: 'monospace', fontSize: '1rem' }}>8</td>
                <td style={{ color: '#4b5563' }}>65th–82nd</td>
                <td><span className={styles.highlightBadge} style={{ backgroundColor: '#dcfce7', color: '#15803d' }}>Above average</span></td>
              </tr>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <td style={{ fontWeight: 700, color: '#111827', fontFamily: 'monospace', fontSize: '1rem' }}>9</td>
                <td style={{ color: '#4b5563' }}>82nd–93rd</td>
                <td><span className={styles.highlightBadge} style={{ backgroundColor: '#dcfce7', color: '#15803d' }}>Excellent</span></td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700, color: '#111827', fontFamily: 'monospace', fontSize: '1rem' }}>10+</td>
                <td style={{ color: '#4b5563' }}>Top 7%</td>
                <td><span className={styles.highlightBadge} style={{ backgroundColor: '#dbeafe', color: '#1d4ed8' }}>Exceptional</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>The Power of Chunking</h2>
        <p className={styles.text}>
          Most people who score above 9 digits are not storing more units of information - They're storing <em>fewer but larger units</em>. Chunking transforms individual digits into meaningful groups:
        </p>
        <div className={styles.box} style={{ backgroundColor: '#eff6ff', borderColor: '#bfdbfe' }}>
          <div style={{ fontFamily: 'monospace', color: '#1e3a8a', fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.5rem', textAlign: 'center' }}>4 · 1 · 5 · 8 · 6 · 7 · 5 · 3 · 0 · 9</div>
          <div style={{ color: '#1d4ed8', fontSize: '0.875rem', textAlign: 'center', marginBottom: '0.5rem' }}>→ "415" (area code) + "867" (partial) + "5309" (song reference) = 3 chunks</div>
          <div style={{ color: '#2563eb', fontSize: '0.75rem', textAlign: 'center' }}>A 10-digit number becomes just 3 memory items - Well within working memory capacity</div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Working Memory Across the Lifespan</h2>
        <p className={styles.text}>
          Number recall is one of the most age-stable cognitive measures available, making it a useful benchmark for tracking cognitive health over time. Unlike processing speed, which begins declining in the mid-20s, verbal number recall remains relatively stable into the 50s before showing a modest decline. The decline that does occur reflects slower phonological rehearsal speed rather than reduced loop capacity per se.
        </p>

        <div style={{ width: '100%', height: '220px', margin: '2rem 0', position: 'relative', backgroundColor: '#f8fafc', borderRadius: '12px', padding: '1rem' }}>
          <svg viewBox="0 0 800 200" width="100%" height="100%" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
            {/* Grid lines */}
            <line x1="50" y1="160" x2="750" y2="160" stroke="#e5e7eb" strokeWidth="2" />
            <line x1="50" y1="110" x2="750" y2="110" stroke="#f3f4f6" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="50" y1="60" x2="750" y2="60" stroke="#f3f4f6" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="50" y1="10" x2="750" y2="10" stroke="#f3f4f6" strokeWidth="1" strokeDasharray="4 4" />
            
            {/* Y axis labels */}
            <text x="40" y="165" fontSize="12" fill="#9ca3af" textAnchor="end">6.0</text>
            <text x="40" y="115" fontSize="12" fill="#9ca3af" textAnchor="end">6.5</text>
            <text x="40" y="65" fontSize="12" fill="#9ca3af" textAnchor="end">7.0</text>
            <text x="40" y="15" fontSize="12" fill="#9ca3af" textAnchor="end">7.5</text>

            {/* Line Chart */}
            <path d="M 50 30 L 150 25 L 250 40 L 350 50 L 450 65 L 550 90 L 650 120 L 750 145" fill="none" stroke="#1d4ed8" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            
            {/* Data points */}
            <circle cx="50" cy="30" r="5" fill="#1d4ed8" />
            <circle cx="150" cy="25" r="6" fill="#1d4ed8" stroke="white" strokeWidth="2" />
            <circle cx="250" cy="40" r="5" fill="#1d4ed8" />
            <circle cx="350" cy="50" r="5" fill="#1d4ed8" />
            <circle cx="450" cy="65" r="5" fill="#1d4ed8" />
            <circle cx="550" cy="90" r="5" fill="#1d4ed8" />
            <circle cx="650" cy="120" r="5" fill="#1d4ed8" />
            <circle cx="750" cy="145" r="5" fill="#1d4ed8" />

            {/* X axis labels */}
            <text x="50" y="180" fontSize="12" fill="#6b7280" textAnchor="middle">18-24</text>
            <text x="150" y="180" fontSize="12" fill="#1d4ed8" fontWeight="bold" textAnchor="middle">25-34</text>
            <text x="250" y="180" fontSize="12" fill="#6b7280" textAnchor="middle">35-44</text>
            <text x="350" y="180" fontSize="12" fill="#6b7280" textAnchor="middle">45-54</text>
            <text x="450" y="180" fontSize="12" fill="#6b7280" textAnchor="middle">55-64</text>
            <text x="550" y="180" fontSize="12" fill="#6b7280" textAnchor="middle">65-74</text>
            <text x="650" y="180" fontSize="12" fill="#6b7280" textAnchor="middle">75-84</text>
            <text x="750" y="180" fontSize="12" fill="#6b7280" textAnchor="middle">85+</text>
          </svg>
        </div>

        <div className={styles.grid4}>
          <div className={styles.statCard} style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe' }}>
            <div className={styles.statValue} style={{ color: '#1d4ed8' }}>7.4 digits</div>
            <div className={styles.statLabel}>Age 18–29</div>
          </div>
          <div className={styles.statCard} style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe' }}>
            <div className={styles.statValue} style={{ color: '#1d4ed8' }}>7.2 digits</div>
            <div className={styles.statLabel}>Age 30–44</div>
          </div>
          <div className={styles.statCard} style={{ backgroundColor: '#f3f4f6', border: '1px solid #e5e7eb' }}>
            <div className={styles.statValue} style={{ color: '#4b5563' }}>6.9 digits</div>
            <div className={styles.statLabel}>Age 45–59</div>
          </div>
          <div className={styles.statCard} style={{ backgroundColor: '#fff7ed', border: '1px solid #ffedd5' }}>
            <div className={styles.statValue} style={{ color: '#c2410c' }}>6.4 digits</div>
            <div className={styles.statLabel}>Age 60–74</div>
          </div>
        </div>
      </section>
    </div>
  );
}
