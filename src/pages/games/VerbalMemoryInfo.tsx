import styles from './GameInfo.module.css';

export default function VerbalMemoryInfo() {
  return (
    <div className={styles.infoSection}>
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>What Verbal Memory Measures</h2>
        <p className={styles.text}>
          Verbal memory is the ability to encode, retain, and retrieve words and language-based information. This test specifically measures <strong>recognition memory</strong> - Deciding whether a word was previously encountered - Which is distinct from <strong>recall</strong> (reproducing words without cues). Recognition is generally easier and more resistant to aging, making it a sensitive early indicator of memory decline.
        </p>
        <p className={styles.text}>
          The test taps into <strong>episodic memory</strong>, the memory system that records personally experienced events and encountered information. Episodic memory is mediated primarily by the hippocampus and surrounding medial temporal lobe structures. The three-strike failure condition introduces an element of <strong>false alarm detection</strong> - Being overconfident about "Seen" judgments leads to mistakes.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Signal Detection Theory: Reading Your Score</h2>
        <p className={styles.text}>
          Every response you make falls into one of four categories. Understanding them reveals the quality of your underlying memory - Not just how cautious or bold you were.
        </p>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th style={{ backgroundColor: '#7c3aed' }}>Response</th>
                <th style={{ backgroundColor: '#7c3aed' }}>Word Was</th>
                <th style={{ backgroundColor: '#7c3aed' }}>Outcome</th>
                <th style={{ backgroundColor: '#7c3aed' }}>What It Means</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: 600, color: '#15803d' }}>Seen → Correct</td>
                <td style={{ color: '#4b5563' }}>Old (seen before)</td>
                <td style={{ fontWeight: 700, color: '#16a34a' }}>Hit</td>
                <td style={{ color: '#4b5563', fontSize: '0.875rem' }}>Strong memory trace - You remembered it</td>
              </tr>
              <tr style={{ backgroundColor: '#fef2f2' }}>
                <td style={{ fontWeight: 600, color: '#b91c1c' }}>New → Wrong</td>
                <td style={{ color: '#4b5563' }}>Old (seen before)</td>
                <td style={{ fontWeight: 700, color: '#dc2626' }}>Miss</td>
                <td style={{ color: '#4b5563', fontSize: '0.875rem' }}>Encoding or retrieval failed</td>
              </tr>
              <tr style={{ backgroundColor: '#fff7ed' }}>
                <td style={{ fontWeight: 600, color: '#c2410c' }}>Seen → Wrong</td>
                <td style={{ color: '#4b5563' }}>New (first time)</td>
                <td style={{ fontWeight: 700, color: '#ea580c' }}>False alarm</td>
                <td style={{ color: '#4b5563', fontSize: '0.875rem' }}>Overconfidence or proactive interference</td>
              </tr>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <td style={{ fontWeight: 600, color: '#4b5563' }}>New → Correct</td>
                <td style={{ color: '#4b5563' }}>New (first time)</td>
                <td style={{ fontWeight: 700, color: '#6b7280' }}>Correct rejection</td>
                <td style={{ color: '#4b5563', fontSize: '0.875rem' }}>Good inhibition, no false memory</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className={styles.box} style={{ backgroundColor: '#faf5ff', borderColor: '#e9d5ff', borderLeftWidth: '4px', borderLeftColor: '#a855f7' }}>
          <p className={styles.text} style={{ fontSize: '0.875rem', color: '#581c87', margin: 0 }}>
            <strong>Key insight:</strong> The best verbal memory performers aren't just good at recognizing old words - They're also excellent at correctly rejecting new ones. A high score with many false alarms indicates a liberal response bias, not strong memory.
          </p>
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
            
            {/* Bars for distribution (centered around 40) */}
            <path d="M 50 180 L 50 178 L 90 178 L 90 180 Z" fill="#e9d5ff" />
            <path d="M 100 180 L 100 175 L 140 175 L 140 180 Z" fill="#d8b4fe" />
            <path d="M 150 180 L 150 160 L 190 160 L 190 180 Z" fill="#c084fc" />
            <path d="M 200 180 L 200 120 L 240 120 L 240 180 Z" fill="#a855f7" />
            <path d="M 250 180 L 250 80 L 290 80 L 290 180 Z" fill="#9333ea" />
            <path d="M 300 180 L 300 40 L 340 40 L 340 180 Z" fill="#7e22ce" />
            <path d="M 350 180 L 350 15 L 390 15 L 390 180 Z" fill="#6b21a8" />
            <path d="M 400 180 L 400 35 L 440 35 L 440 180 Z" fill="#7e22ce" />
            <path d="M 450 180 L 450 70 L 490 70 L 490 180 Z" fill="#9333ea" />
            <path d="M 500 180 L 500 110 L 540 110 L 540 180 Z" fill="#a855f7" />
            <path d="M 550 180 L 550 140 L 590 140 L 590 180 Z" fill="#c084fc" />
            <path d="M 600 180 L 600 160 L 640 160 L 640 180 Z" fill="#d8b4fe" />
            <path d="M 650 180 L 650 170 L 690 170 L 690 180 Z" fill="#e9d5ff" />
            <path d="M 700 180 L 700 175 L 740 175 L 740 180 Z" fill="#f3e8ff" />

            {/* Labels */}
            <text x="70" y="198" fontSize="12" fill="#6b7280" textAnchor="middle">10</text>
            <text x="370" y="198" fontSize="12" fill="#6b21a8" fontWeight="bold" textAnchor="middle">40</text>
            <text x="570" y="198" fontSize="12" fill="#6b7280" textAnchor="middle">80</text>
            <text x="720" y="198" fontSize="12" fill="#6b7280" textAnchor="middle">120+</text>
          </svg>
        </div>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th style={{ backgroundColor: '#7c3aed' }}>Score</th>
                <th style={{ backgroundColor: '#7c3aed' }}>Percentile</th>
                <th style={{ backgroundColor: '#7c3aed' }}>Classification</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: 700, color: '#111827', fontFamily: 'monospace', fontSize: '1rem' }}>1–15</td>
                <td style={{ color: '#4b5563' }}>Bottom 15%</td>
                <td><span className={styles.highlightBadge} style={{ backgroundColor: '#fee2e2', color: '#b91c1c' }}>Well below average</span></td>
              </tr>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <td style={{ fontWeight: 700, color: '#111827', fontFamily: 'monospace', fontSize: '1rem' }}>16–28</td>
                <td style={{ color: '#4b5563' }}>15th–40th</td>
                <td><span className={styles.highlightBadge} style={{ backgroundColor: '#ffedd5', color: '#c2410c' }}>Below average</span></td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700, color: '#111827', fontFamily: 'monospace', fontSize: '1rem' }}>29–50</td>
                <td style={{ color: '#4b5563' }}>40th–70th</td>
                <td><span className={styles.highlightBadge} style={{ backgroundColor: '#fef9c3', color: '#a16207' }}>Average</span></td>
              </tr>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <td style={{ fontWeight: 700, color: '#111827', fontFamily: 'monospace', fontSize: '1rem' }}>51–80</td>
                <td style={{ color: '#4b5563' }}>70th–90th</td>
                <td><span className={styles.highlightBadge} style={{ backgroundColor: '#dcfce7', color: '#15803d' }}>Above average</span></td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700, color: '#111827', fontFamily: 'monospace', fontSize: '1rem' }}>81–100</td>
                <td style={{ color: '#4b5563' }}>90th–97th</td>
                <td><span className={styles.highlightBadge} style={{ backgroundColor: '#dbeafe', color: '#1d4ed8' }}>Excellent</span></td>
              </tr>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <td style={{ fontWeight: 700, color: '#111827', fontFamily: 'monospace', fontSize: '1rem' }}>100+</td>
                <td style={{ color: '#4b5563' }}>Top 3%</td>
                <td><span className={styles.highlightBadge} style={{ backgroundColor: '#f3e8ff', color: '#7e22ce' }}>Exceptional</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Verbal Memory Across the Lifespan</h2>
        <p className={styles.text}>
          Recognition memory for words is more resistant to aging than processing speed or visuospatial memory, but it does decline. The hippocampal-dependent encoding system that supports verbal recognition shows gradual volume loss starting in the 40s, accelerating after 60.
        </p>

        <div style={{ width: '100%', height: '220px', margin: '2rem 0', position: 'relative', backgroundColor: '#f8fafc', borderRadius: '12px', padding: '1rem' }}>
          <svg viewBox="0 0 800 200" width="100%" height="100%" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
            {/* Grid lines */}
            <line x1="50" y1="160" x2="750" y2="160" stroke="#e5e7eb" strokeWidth="2" />
            <line x1="50" y1="110" x2="750" y2="110" stroke="#f3f4f6" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="50" y1="60" x2="750" y2="60" stroke="#f3f4f6" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="50" y1="10" x2="750" y2="10" stroke="#f3f4f6" strokeWidth="1" strokeDasharray="4 4" />
            
            {/* Y axis labels */}
            <text x="40" y="165" fontSize="12" fill="#9ca3af" textAnchor="end">30</text>
            <text x="40" y="115" fontSize="12" fill="#9ca3af" textAnchor="end">40</text>
            <text x="40" y="65" fontSize="12" fill="#9ca3af" textAnchor="end">50</text>
            <text x="40" y="15" fontSize="12" fill="#9ca3af" textAnchor="end">60</text>

            {/* Line Chart */}
            <path d="M 50 20 L 150 25 L 250 40 L 350 55 L 450 70 L 550 95 L 650 120 L 750 150" fill="none" stroke="#7e22ce" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            
            {/* Data points */}
            <circle cx="50" cy="20" r="5" fill="#7e22ce" />
            <circle cx="150" cy="25" r="6" fill="#7e22ce" stroke="white" strokeWidth="2" />
            <circle cx="250" cy="40" r="5" fill="#7e22ce" />
            <circle cx="350" cy="55" r="5" fill="#7e22ce" />
            <circle cx="450" cy="70" r="5" fill="#7e22ce" />
            <circle cx="550" cy="95" r="5" fill="#7e22ce" />
            <circle cx="650" cy="120" r="5" fill="#7e22ce" />
            <circle cx="750" cy="150" r="5" fill="#7e22ce" />

            {/* X axis labels */}
            <text x="50" y="180" fontSize="12" fill="#6b7280" textAnchor="middle">18-24</text>
            <text x="150" y="180" fontSize="12" fill="#7e22ce" fontWeight="bold" textAnchor="middle">25-34</text>
            <text x="250" y="180" fontSize="12" fill="#6b7280" textAnchor="middle">35-44</text>
            <text x="350" y="180" fontSize="12" fill="#6b7280" textAnchor="middle">45-54</text>
            <text x="450" y="180" fontSize="12" fill="#6b7280" textAnchor="middle">55-64</text>
            <text x="550" y="180" fontSize="12" fill="#6b7280" textAnchor="middle">65-74</text>
            <text x="650" y="180" fontSize="12" fill="#6b7280" textAnchor="middle">75-84</text>
            <text x="750" y="180" fontSize="12" fill="#6b7280" textAnchor="middle">85+</text>
          </svg>
        </div>

        <div className={styles.grid4}>
          <div className={styles.statCard} style={{ backgroundColor: '#f3e8ff', border: '1px solid #e9d5ff' }}>
            <div className={styles.statValue} style={{ color: '#7e22ce' }}>58 words</div>
            <div className={styles.statLabel}>Age 18–29</div>
          </div>
          <div className={styles.statCard} style={{ backgroundColor: '#f3e8ff', border: '1px solid #e9d5ff' }}>
            <div className={styles.statValue} style={{ color: '#7e22ce' }}>54 words</div>
            <div className={styles.statLabel}>Age 30–44</div>
          </div>
          <div className={styles.statCard} style={{ backgroundColor: '#f3f4f6', border: '1px solid #e5e7eb' }}>
            <div className={styles.statValue} style={{ color: '#4b5563' }}>46 words</div>
            <div className={styles.statLabel}>Age 45–59</div>
          </div>
          <div className={styles.statCard} style={{ backgroundColor: '#fff7ed', border: '1px solid #ffedd5' }}>
            <div className={styles.statValue} style={{ color: '#c2410c' }}>38 words</div>
            <div className={styles.statLabel}>Age 60–74</div>
          </div>
        </div>
      </section>
    </div>
  );
}
