import styles from './GameInfo.module.css';

export default function SequenceMemoryInfo() {
  return (
    <div className={styles.infoSection}>
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>What Sequence Memory Measures</h2>
        <p className={styles.text}>
          Sequence memory tests your ability to encode and reproduce a growing series of spatial locations in order - A task that relies primarily on the <strong>visuospatial sketchpad</strong>, one of the two subsidiary systems in Baddeley's working memory model. Unlike <span className={styles.link}>verbal digit span</span>, which recruits the phonological loop, sequence memory requires you to mentally map positions in space and replay them without the benefit of subvocal rehearsal.
        </p>
        <p className={styles.text}>
          The task closely parallels the <span className={styles.link}>Corsi Block Test</span>, a widely used neuropsychological instrument developed by Philip Corsi in 1972. In the clinical version, an examiner taps blocks on a board in sequence while the patient must reproduce the pattern. It's used to diagnose spatial working memory deficits in conditions ranging from Alzheimer's disease to hippocampal lesions.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Corsi Block Test vs. Digit Span</h2>
        <p className={styles.text}>
          Although both measure working memory capacity, they tap fundamentally different neural circuits. Most people perform slightly <em>worse</em> on spatial span than <span className={styles.link}>verbal span</span> - A gap called the <strong>Corsi-digit asymmetry</strong>. For a static-pattern variant of this spatial challenge, try <span className={styles.link}>Visual Memory</span>.
        </p>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th style={{ backgroundColor: '#4338ca' }}>Property</th>
                <th style={{ backgroundColor: '#4338ca' }}>Corsi Block / Sequence Memory</th>
                <th style={{ backgroundColor: '#4338ca' }}>Digit Span / Number Memory</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: 600, color: '#374151' }}>Memory system</td>
                <td style={{ color: '#4b5563' }}>Visuospatial sketchpad</td>
                <td style={{ color: '#4b5563' }}>Phonological loop</td>
              </tr>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <td style={{ fontWeight: 600, color: '#374151' }}>Brain regions</td>
                <td style={{ color: '#4b5563' }}>Right parietal, hippocampus</td>
                <td style={{ color: '#4b5563' }}>Left temporal, Broca's area</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600, color: '#374151' }}>Adult average span</td>
                <td style={{ color: '#4b5563' }}>~5.0 units</td>
                <td style={{ color: '#4b5563' }}>~7.0 digits</td>
              </tr>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <td style={{ fontWeight: 600, color: '#374151' }}>Rehearsal strategy</td>
                <td style={{ color: '#4b5563' }}>Spatial path visualization</td>
                <td style={{ color: '#4b5563' }}>Subvocal repetition</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600, color: '#374151' }}>Age of peak performance</td>
                <td style={{ color: '#4b5563' }}>Early 20s</td>
                <td style={{ color: '#4b5563' }}>Mid-20s</td>
              </tr>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <td style={{ fontWeight: 600, color: '#374151' }}>Training sensitivity</td>
                <td style={{ color: '#4b5563' }}>Moderate</td>
                <td style={{ color: '#4b5563' }}>High (chunking helps)</td>
              </tr>
            </tbody>
          </table>
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
            
            {/* Bars for distribution (centered around 8-9) */}
            <path d="M 50 180 L 50 178 L 90 178 L 90 180 Z" fill="#c7d2fe" />
            <path d="M 100 180 L 100 170 L 140 170 L 140 180 Z" fill="#a5b4fc" />
            <path d="M 150 180 L 150 150 L 190 150 L 190 180 Z" fill="#818cf8" />
            <path d="M 200 180 L 200 110 L 240 110 L 240 180 Z" fill="#6366f1" />
            <path d="M 250 180 L 250 50 L 290 50 L 290 180 Z" fill="#4f46e5" />
            <path d="M 300 180 L 300 20 L 340 20 L 340 180 Z" fill="#4338ca" />
            <path d="M 350 180 L 350 40 L 390 40 L 390 180 Z" fill="#4f46e5" />
            <path d="M 400 180 L 400 80 L 440 80 L 440 180 Z" fill="#6366f1" />
            <path d="M 450 180 L 450 120 L 490 120 L 490 180 Z" fill="#818cf8" />
            <path d="M 500 180 L 500 150 L 540 150 L 540 180 Z" fill="#a5b4fc" />
            <path d="M 550 180 L 550 165 L 590 165 L 590 180 Z" fill="#c7d2fe" />
            <path d="M 600 180 L 600 172 L 640 172 L 640 180 Z" fill="#e0e7ff" />
            <path d="M 650 180 L 650 176 L 690 176 L 690 180 Z" fill="#e0e7ff" />
            <path d="M 700 180 L 700 178 L 740 178 L 740 180 Z" fill="#e0e7ff" />

            {/* Labels */}
            <text x="70" y="198" fontSize="12" fill="#6b7280" textAnchor="middle">4</text>
            <text x="220" y="198" fontSize="12" fill="#6b7280" textAnchor="middle">7</text>
            <text x="320" y="198" fontSize="12" fill="#4338ca" fontWeight="bold" textAnchor="middle">9</text>
            <text x="470" y="198" fontSize="12" fill="#6b7280" textAnchor="middle">12</text>
            <text x="670" y="198" fontSize="12" fill="#6b7280" textAnchor="middle">16+</text>
          </svg>
        </div>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th style={{ backgroundColor: '#4338ca' }}>Levels Completed</th>
                <th style={{ backgroundColor: '#4338ca' }}>Percentile</th>
                <th style={{ backgroundColor: '#4338ca' }}>Classification</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: 700, color: '#111827', fontFamily: 'monospace', fontSize: '1rem' }}>1–4</td>
                <td style={{ color: '#4b5563' }}>Bottom 10%</td>
                <td><span className={styles.highlightBadge} style={{ backgroundColor: '#fee2e2', color: '#b91c1c' }}>Well below average</span></td>
              </tr>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <td style={{ fontWeight: 700, color: '#111827', fontFamily: 'monospace', fontSize: '1rem' }}>5–7</td>
                <td style={{ color: '#4b5563' }}>10th–40th</td>
                <td><span className={styles.highlightBadge} style={{ backgroundColor: '#ffedd5', color: '#c2410c' }}>Below average</span></td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700, color: '#111827', fontFamily: 'monospace', fontSize: '1rem' }}>8–10</td>
                <td style={{ color: '#4b5563' }}>40th–75th</td>
                <td><span className={styles.highlightBadge} style={{ backgroundColor: '#fef9c3', color: '#a16207' }}>Average</span></td>
              </tr>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <td style={{ fontWeight: 700, color: '#111827', fontFamily: 'monospace', fontSize: '1rem' }}>11–13</td>
                <td style={{ color: '#4b5563' }}>75th–95th</td>
                <td><span className={styles.highlightBadge} style={{ backgroundColor: '#dcfce7', color: '#15803d' }}>Above average</span></td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700, color: '#111827', fontFamily: 'monospace', fontSize: '1rem' }}>14+</td>
                <td style={{ color: '#4b5563' }}>Top 5%</td>
                <td><span className={styles.highlightBadge} style={{ backgroundColor: '#e0e7ff', color: '#4338ca' }}>Exceptional</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>How Sequence Memory Changes With Age</h2>
        <p className={styles.text}>
          Visuospatial working memory capacity peaks in the early 20s and declines gradually - Earlier and more steeply than verbal memory, which relies on overlearned language systems that remain robust longer.
        </p>
        
        <div style={{ width: '100%', height: '220px', margin: '2rem 0', position: 'relative', backgroundColor: '#f8fafc', borderRadius: '12px', padding: '1rem' }}>
          <svg viewBox="0 0 800 200" width="100%" height="100%" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
            {/* Grid lines */}
            <line x1="50" y1="160" x2="750" y2="160" stroke="#e5e7eb" strokeWidth="2" />
            <line x1="50" y1="110" x2="750" y2="110" stroke="#f3f4f6" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="50" y1="60" x2="750" y2="60" stroke="#f3f4f6" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="50" y1="10" x2="750" y2="10" stroke="#f3f4f6" strokeWidth="1" strokeDasharray="4 4" />
            
            {/* Y axis labels */}
            <text x="40" y="165" fontSize="12" fill="#9ca3af" textAnchor="end">5.0</text>
            <text x="40" y="115" fontSize="12" fill="#9ca3af" textAnchor="end">7.0</text>
            <text x="40" y="65" fontSize="12" fill="#9ca3af" textAnchor="end">9.0</text>
            <text x="40" y="15" fontSize="12" fill="#9ca3af" textAnchor="end">11.0</text>

            {/* Line Chart */}
            <path d="M 50 80 L 150 40 L 250 60 L 350 90 L 450 110 L 550 130 L 650 145 L 750 155" fill="none" stroke="#4338ca" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            
            {/* Data points */}
            <circle cx="50" cy="80" r="5" fill="#4338ca" />
            <circle cx="150" cy="40" r="6" fill="#4338ca" stroke="white" strokeWidth="2" />
            <circle cx="250" cy="60" r="5" fill="#4338ca" />
            <circle cx="350" cy="90" r="5" fill="#4338ca" />
            <circle cx="450" cy="110" r="5" fill="#4338ca" />
            <circle cx="550" cy="130" r="5" fill="#4338ca" />
            <circle cx="650" cy="145" r="5" fill="#4338ca" />
            <circle cx="750" cy="155" r="5" fill="#4338ca" />

            {/* X axis labels */}
            <text x="50" y="180" fontSize="12" fill="#6b7280" textAnchor="middle">18-24</text>
            <text x="150" y="180" fontSize="12" fill="#4338ca" fontWeight="bold" textAnchor="middle">25-34</text>
            <text x="250" y="180" fontSize="12" fill="#6b7280" textAnchor="middle">35-44</text>
            <text x="350" y="180" fontSize="12" fill="#6b7280" textAnchor="middle">45-54</text>
            <text x="450" y="180" fontSize="12" fill="#6b7280" textAnchor="middle">55-64</text>
            <text x="550" y="180" fontSize="12" fill="#6b7280" textAnchor="middle">65-74</text>
            <text x="650" y="180" fontSize="12" fill="#6b7280" textAnchor="middle">75-84</text>
            <text x="750" y="180" fontSize="12" fill="#6b7280" textAnchor="middle">85+</text>
          </svg>
        </div>
      </section>
    </div>
  );
}
