import styles from './GameInfo.module.css';

export default function VisualMemoryInfo() {
  return (
    <div className={styles.infoSection}>
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>What Visual Memory Measures</h2>
        <p className={styles.text}>
          Visual memory is the capacity to encode, store, and retrieve information about spatial patterns - Where objects were, how they were arranged, and what the layout looked like. This test specifically targets your <strong>visuospatial sketchpad</strong>, one of the core subsystems of working memory first described by Baddeley & Hitch (1974).
        </p>
        <p className={styles.text}>
          Unlike verbal memory (which stores words and sounds in a phonological loop), visual memory relies on a dedicated neural circuit anchored in the <strong>right parietal cortex</strong> and the <strong>hippocampus</strong>. The parietal lobe encodes spatial relationships ("which grid squares"), while the hippocampus consolidates these patterns for retrieval.
        </p>
        <p className={styles.text}>
          The test is closely analogous to the Corsi Block-Tapping Test, a standard clinical instrument developed by Milner and Corsi in the 1970s. The key difference: instead of a fixed spatial sequence (which squares light up in what order), this test requires you to recall <em>which</em> squares were lit without regard to order - Measuring pure spatial set recall rather than sequential procedural memory.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Baddeley's Working Memory Model - Visual Pathway</h2>
        <div className={styles.grid3}>
          <div className={styles.factCard} style={{ backgroundColor: '#f3e8ff', border: '1px solid #e9d5ff' }}>
            <div className={styles.factTitle} style={{ color: '#7e22ce' }}>Central Executive</div>
            <div className={styles.factText} style={{ color: '#6b21a8' }}>
              Directs attention to relevant squares, filters distractors during recall.
            </div>
          </div>
          <div className={styles.factCard} style={{ backgroundColor: '#fdf4ff', border: '1px solid #fbcfe8' }}>
            <div className={styles.factTitle} style={{ color: '#be185d' }}>Visuospatial Sketchpad</div>
            <div className={styles.factText} style={{ color: '#9d174d' }}>
              <strong>Holds the grid pattern for ~1–2 seconds - This is what this test directly measures.</strong>
            </div>
          </div>
          <div className={styles.factCard} style={{ backgroundColor: '#f3e8ff', border: '1px solid #e9d5ff' }}>
            <div className={styles.factTitle} style={{ color: '#7e22ce' }}>Episodic Buffer</div>
            <div className={styles.factText} style={{ color: '#6b21a8' }}>
              Links the visual pattern with long-term spatial knowledge for higher levels.
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
            
            {/* Bars for distribution (centered around 8-9) */}
            <path d="M 50 180 L 50 178 L 90 178 L 90 180 Z" fill="#e9d5ff" />
            <path d="M 100 180 L 100 170 L 140 170 L 140 180 Z" fill="#d8b4fe" />
            <path d="M 150 180 L 150 150 L 190 150 L 190 180 Z" fill="#c084fc" />
            <path d="M 200 180 L 200 110 L 240 110 L 240 180 Z" fill="#a855f7" />
            <path d="M 250 180 L 250 60 L 290 60 L 290 180 Z" fill="#9333ea" />
            <path d="M 300 180 L 300 20 L 340 20 L 340 180 Z" fill="#7e22ce" />
            <path d="M 350 180 L 350 30 L 390 30 L 390 180 Z" fill="#9333ea" />
            <path d="M 400 180 L 400 65 L 440 65 L 440 180 Z" fill="#a855f7" />
            <path d="M 450 180 L 450 100 L 490 100 L 490 180 Z" fill="#c084fc" />
            <path d="M 500 180 L 500 130 L 540 130 L 540 180 Z" fill="#d8b4fe" />
            <path d="M 550 180 L 550 150 L 590 150 L 590 180 Z" fill="#e9d5ff" />
            <path d="M 600 180 L 600 165 L 640 165 L 640 180 Z" fill="#f3e8ff" />
            <path d="M 650 180 L 650 170 L 690 170 L 690 180 Z" fill="#f3e8ff" />
            <path d="M 700 180 L 700 175 L 740 175 L 740 180 Z" fill="#faf5ff" />

            {/* Labels */}
            <text x="70" y="198" fontSize="12" fill="#6b7280" textAnchor="middle">2</text>
            <text x="220" y="198" fontSize="12" fill="#6b7280" textAnchor="middle">5</text>
            <text x="320" y="198" fontSize="12" fill="#7e22ce" fontWeight="bold" textAnchor="middle">7</text>
            <text x="470" y="198" fontSize="12" fill="#6b7280" textAnchor="middle">10</text>
            <text x="670" y="198" fontSize="12" fill="#6b7280" textAnchor="middle">14+</text>
          </svg>
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th style={{ backgroundColor: '#7e22ce' }}>Level Reached</th>
                <th style={{ backgroundColor: '#7e22ce' }}>Percentile</th>
                <th style={{ backgroundColor: '#7e22ce' }}>Classification</th>
                <th style={{ backgroundColor: '#7e22ce' }}>Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: 700, color: '#111827', fontFamily: 'monospace', fontSize: '1rem' }}>15+</td>
                <td style={{ color: '#4b5563' }}>Top 2%</td>
                <td><span className={styles.highlightBadge} style={{ backgroundColor: '#f3e8ff', color: '#7e22ce' }}>Exceptional</span></td>
                <td style={{ color: '#6b7280', fontSize: '0.875rem' }}>Uses chunking or mnemonic strategies</td>
              </tr>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <td style={{ fontWeight: 700, color: '#111827', fontFamily: 'monospace', fontSize: '1rem' }}>12–14</td>
                <td style={{ color: '#4b5563' }}>Top 10%</td>
                <td><span className={styles.highlightBadge} style={{ backgroundColor: '#dcfce7', color: '#15803d' }}>Excellent</span></td>
                <td style={{ color: '#6b7280', fontSize: '0.875rem' }}>Strong visuospatial capacity</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700, color: '#111827', fontFamily: 'monospace', fontSize: '1rem' }}>9–11</td>
                <td style={{ color: '#4b5563' }}>Top 25%</td>
                <td><span className={styles.highlightBadge} style={{ backgroundColor: '#dbeafe', color: '#1d4ed8' }}>Above average</span></td>
                <td style={{ color: '#6b7280', fontSize: '0.875rem' }}>Above visuospatial span limit</td>
              </tr>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <td style={{ fontWeight: 700, color: '#111827', fontFamily: 'monospace', fontSize: '1rem' }}>7–8</td>
                <td style={{ color: '#4b5563' }}>25th–65th</td>
                <td><span className={styles.highlightBadge} style={{ backgroundColor: '#fef9c3', color: '#a16207' }}>Average</span></td>
                <td style={{ color: '#6b7280', fontSize: '0.875rem' }}>Within expected span range</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700, color: '#111827', fontFamily: 'monospace', fontSize: '1rem' }}>5–6</td>
                <td style={{ color: '#4b5563' }}>65th–82nd</td>
                <td><span className={styles.highlightBadge} style={{ backgroundColor: '#ffedd5', color: '#c2410c' }}>Below average</span></td>
                <td style={{ color: '#6b7280', fontSize: '0.875rem' }}>May reflect fatigue or unfamiliarity</td>
              </tr>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <td style={{ fontWeight: 700, color: '#111827', fontFamily: 'monospace', fontSize: '1rem' }}>3–4</td>
                <td style={{ color: '#4b5563' }}>Bottom 20%</td>
                <td><span className={styles.highlightBadge} style={{ backgroundColor: '#fee2e2', color: '#b91c1c' }}>Low</span></td>
                <td style={{ color: '#6b7280', fontSize: '0.875rem' }}>Typical on first attempt; improves quickly</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700, color: '#111827', fontFamily: 'monospace', fontSize: '1rem' }}>1–2</td>
                <td style={{ color: '#4b5563' }}>Bottom 5%</td>
                <td><span className={styles.highlightBadge} style={{ backgroundColor: '#f3f4f6', color: '#4b5563' }}>Very low</span></td>
                <td style={{ color: '#6b7280', fontSize: '0.875rem' }}>Often indicates distraction or mobile device</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Visual vs. Verbal Memory: Different Systems</h2>
        <p className={styles.text}>
          A common misconception is that memory is a single capacity. In fact, visual and verbal memory are double-dissociable systems - Brain damage can impair one while leaving the other intact. Understanding the difference helps interpret your own cognitive profile.
        </p>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th style={{ backgroundColor: '#7e22ce' }}>Dimension</th>
                <th style={{ backgroundColor: '#7e22ce' }}>Visual Memory</th>
                <th style={{ backgroundColor: '#7e22ce' }}>Verbal Memory</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: 600, color: '#4b5563' }}>Baddeley subsystem</td>
                <td style={{ color: '#6b7280' }}>Visuospatial sketchpad</td>
                <td style={{ color: '#6b7280' }}>Phonological loop</td>
              </tr>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <td style={{ fontWeight: 600, color: '#4b5563' }}>Primary brain area</td>
                <td style={{ color: '#6b7280' }}>Right parietal cortex</td>
                <td style={{ color: '#6b7280' }}>Left perisylvian cortex</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600, color: '#4b5563' }}>Typical capacity</td>
                <td style={{ color: '#6b7280' }}>3–4 objects or 9–12 squares</td>
                <td style={{ color: '#6b7280' }}>7 ± 2 chunks (Miller's Law)</td>
              </tr>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <td style={{ fontWeight: 600, color: '#4b5563' }}>Decay time</td>
                <td style={{ color: '#6b7280' }}>~1–2 seconds without rehearsal</td>
                <td style={{ color: '#6b7280' }}>~2 seconds without subvocal rehearsal</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600, color: '#4b5563' }}>Interference source</td>
                <td style={{ color: '#6b7280' }}>Other visual/spatial stimuli</td>
                <td style={{ color: '#6b7280' }}>Irrelevant speech, numbers</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Visual Memory Across the Lifespan</h2>
        <p className={styles.text}>
          Visuospatial memory capacity peaks in the mid-20s and declines more gradually than processing speed - But more steeply than semantic (knowledge-based) memory. Older adults often compensate by adopting labeling strategies: mentally naming the positions rather than holding the raw visual pattern.
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
            <path d="M 50 35 L 150 40 L 250 65 L 350 85 L 450 110 L 550 125 L 650 145 L 750 155" fill="none" stroke="#7e22ce" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            
            {/* Data points */}
            <circle cx="50" cy="35" r="5" fill="#7e22ce" />
            <circle cx="150" cy="40" r="6" fill="#7e22ce" stroke="white" strokeWidth="2" />
            <circle cx="250" cy="65" r="5" fill="#7e22ce" />
            <circle cx="350" cy="85" r="5" fill="#7e22ce" />
            <circle cx="450" cy="110" r="5" fill="#7e22ce" />
            <circle cx="550" cy="125" r="5" fill="#7e22ce" />
            <circle cx="650" cy="145" r="5" fill="#7e22ce" />
            <circle cx="750" cy="155" r="5" fill="#7e22ce" />

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
            <div className={styles.statValue} style={{ color: '#7e22ce' }}>Level 10</div>
            <div className={styles.statLabel}>Age 18–29</div>
          </div>
          <div className={styles.statCard} style={{ backgroundColor: '#f3e8ff', border: '1px solid #e9d5ff' }}>
            <div className={styles.statValue} style={{ color: '#7e22ce' }}>Level 9</div>
            <div className={styles.statLabel}>Age 30–44</div>
          </div>
          <div className={styles.statCard} style={{ backgroundColor: '#f3f4f6', border: '1px solid #e5e7eb' }}>
            <div className={styles.statValue} style={{ color: '#4b5563' }}>Level 8</div>
            <div className={styles.statLabel}>Age 45–59</div>
          </div>
          <div className={styles.statCard} style={{ backgroundColor: '#fff7ed', border: '1px solid #ffedd5' }}>
            <div className={styles.statValue} style={{ color: '#c2410c' }}>Level 6</div>
            <div className={styles.statLabel}>Age 60–74</div>
          </div>
        </div>
      </section>
    </div>
  );
}
