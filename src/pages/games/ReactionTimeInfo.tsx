import styles from './GameInfo.module.css';

export default function ReactionTimeInfo() {
  return (
    <div className={styles.infoSection}>
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>What is Reaction Time?</h2>
        <dl style={{ marginBottom: '1.5rem', backgroundColor: '#f8fafc', padding: '1.5rem', borderRadius: '12px' }}>
          <dt style={{ fontWeight: 700, color: '#111827', fontSize: '1.125rem' }}>Definition</dt>
          <dd style={{ color: '#4b5563', marginTop: '0.5rem', marginBottom: '1rem' }}>
            Simple visual reaction time (SRT) is the elapsed time between a visual stimulus appearing on screen and your motor response completing (e.g., clicking a mouse).
          </dd>
          <dt style={{ fontWeight: 700, color: '#111827', fontSize: '1.125rem' }}>Global Average</dt>
          <dd style={{ color: '#4b5563', marginTop: '0.5rem' }}>
            The global average reaction time is approximately 250 to 280 milliseconds (ms) in laboratory conditions, or roughly 284ms on web-based platforms due to hardware latency.
          </dd>
        </dl>
        
        <p className={styles.text}>
          It is the most fundamental benchmark of neural processing speed - Capturing the entire perceptual-motor chain from a photon hitting your retina to your finger registering a click. Franciscus Donders first measured it systematically in 1868.
        </p>
        <p className={styles.text}>
          SRT is distinct from more complex variants. <strong>Choice reaction time</strong> adds a stimulus-identification decision that costs ~100–150ms. <strong>Audio reaction time</strong> uses sound instead of light and is typically 30–50ms faster. This test isolates the pure detection-to-response interval.
        </p>

        <div className={styles.box}>
          <h3 className={styles.boxTitle}>The neural reaction chain</h3>
          <div>
            <div className={styles.chainRow}>
              <div className={styles.chainTime}>~8ms</div>
              <div className={styles.chainBox} style={{ backgroundColor: '#f0f9ff', border: '1px solid #e0f2fe', color: '#0c4a6e' }}>
                Retinal phototransduction - Rods and cones convert photons to electrical signals
              </div>
            </div>
            <div className={styles.chainRow}>
              <div className={styles.chainTime}>~20ms</div>
              <div className={styles.chainBox} style={{ backgroundColor: '#dbeafe', border: '1px solid #bfdbfe', color: '#1e3a8a' }}>
                Optic nerve transmission to lateral geniculate nucleus (LGN)
              </div>
            </div>
            <div className={styles.chainRow}>
              <div className={styles.chainTime}>~50ms</div>
              <div className={styles.chainBox} style={{ backgroundColor: '#e0e7ff', border: '1px solid #c7d2fe', color: '#312e81' }}>
                Primary visual cortex (V1) detects the color change
              </div>
            </div>
            <div className={styles.chainRow}>
              <div className={styles.chainTime}>~80ms</div>
              <div className={styles.chainBox} style={{ backgroundColor: '#f3e8ff', border: '1px solid #e9d5ff', color: '#581c87' }}>
                Signal reaches motor cortex via premotor and supplementary motor areas
              </div>
            </div>
            <div className={styles.chainRow}>
              <div className={styles.chainTime}>~120ms</div>
              <div className={styles.chainBox} style={{ backgroundColor: '#ffedd5', border: '1px solid #fed7aa', color: '#7c2d12' }}>
                Motor command travels down corticospinal tract to finger muscles
              </div>
            </div>
            <div className={styles.chainRow}>
              <div className={styles.chainTime}>~150ms+</div>
              <div className={styles.chainBox} style={{ backgroundColor: '#2563eb', color: 'white' }}>
                Finger depresses mouse button - Click registers
              </div>
            </div>
          </div>
          <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '1rem', lineHeight: '1.5' }}>
            The theoretical minimum for genuine human reaction (not anticipation) is approximately 100–120ms - The combined minimum neural conduction time. Scores below 100ms are anticipation clicks. The remaining gap between the 120ms floor and your actual score represents variance in attentional readiness, arousal state, and motor preparation speed.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Reaction Time Score Distribution</h2>
        <p className={styles.text}>
          The distribution is right-skewed: most scores cluster between 220–320ms, with a sharp lower tail (genuine fast responders) and a long upper tail (fatigue, mobile devices, and hardware lag). Trimmed means that exclude the slowest tail typically land in the 260s; the raw ~284ms web average is inflated by that upper tail.
        </p>

        <div style={{ width: '100%', height: '200px', margin: '2rem 0', position: 'relative' }}>
          <svg viewBox="0 0 800 200" width="100%" height="100%" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
            {/* Grid lines */}
            <line x1="0" y1="180" x2="800" y2="180" stroke="#e5e7eb" strokeWidth="2" />
            <line x1="0" y1="135" x2="800" y2="135" stroke="#f3f4f6" strokeWidth="1" />
            <line x1="0" y1="90" x2="800" y2="90" stroke="#f3f4f6" strokeWidth="1" />
            <line x1="0" y1="45" x2="800" y2="45" stroke="#f3f4f6" strokeWidth="1" />
            
            {/* Bars for distribution (right-skewed) */}
            <path d="M 50 180 L 50 178 L 90 178 L 90 180 Z" fill="#93c5fd" />
            <path d="M 100 180 L 100 160 L 140 160 L 140 180 Z" fill="#60a5fa" />
            <path d="M 150 180 L 150 110 L 190 110 L 190 180 Z" fill="#3b82f6" />
            <path d="M 200 180 L 200 40 L 240 40 L 240 180 Z" fill="#2563eb" />
            <path d="M 250 180 L 250 20 L 290 20 L 290 180 Z" fill="#1d4ed8" />
            <path d="M 300 180 L 300 35 L 340 35 L 340 180 Z" fill="#3b82f6" />
            <path d="M 350 180 L 350 70 L 390 70 L 390 180 Z" fill="#60a5fa" />
            <path d="M 400 180 L 400 100 L 440 100 L 440 180 Z" fill="#93c5fd" />
            <path d="M 450 180 L 450 130 L 490 130 L 490 180 Z" fill="#bfdbfe" />
            <path d="M 500 180 L 500 150 L 540 150 L 540 180 Z" fill="#dbeafe" />
            <path d="M 550 180 L 550 165 L 590 165 L 590 180 Z" fill="#eff6ff" />
            <path d="M 600 180 L 600 172 L 640 172 L 640 180 Z" fill="#eff6ff" />
            <path d="M 650 180 L 650 176 L 690 176 L 690 180 Z" fill="#f8fafc" />
            <path d="M 700 180 L 700 178 L 740 178 L 740 180 Z" fill="#f8fafc" />

            {/* Labels */}
            <text x="70" y="198" fontSize="12" fill="#6b7280" textAnchor="middle">150ms</text>
            <text x="270" y="198" fontSize="12" fill="#1d4ed8" fontWeight="bold" textAnchor="middle">250ms</text>
            <text x="470" y="198" fontSize="12" fill="#6b7280" textAnchor="middle">350ms</text>
            <text x="670" y="198" fontSize="12" fill="#6b7280" textAnchor="middle">450ms</text>
          </svg>
        </div>

        <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.75rem' }}>Score percentile reference</h3>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Percentile</th>
                <th>Reaction time</th>
                <th>Classification</th>
                <th>Typical profile</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ color: '#7e22ce', fontWeight: 700 }}>Top 1%</td>
                <td style={{ fontWeight: 600 }}>&lt;160ms</td>
                <td><span className={styles.highlightBadge} style={{ backgroundColor: '#f3e8ff', color: '#7e22ce' }}>Exceptional</span></td>
                <td style={{ color: '#6b7280', fontSize: '0.75rem' }}>Professional esports, trained athletes</td>
              </tr>
              <tr>
                <td style={{ color: '#1d4ed8', fontWeight: 700 }}>Top 10%</td>
                <td style={{ fontWeight: 600 }}>160–210ms</td>
                <td><span className={styles.highlightBadge} style={{ backgroundColor: '#dbeafe', color: '#1d4ed8' }}>Excellent</span></td>
                <td style={{ color: '#6b7280', fontSize: '0.75rem' }}>Competitive gamers, young adults well-rested</td>
              </tr>
              <tr>
                <td style={{ color: '#1e40af', fontWeight: 700 }}>Top 25%</td>
                <td style={{ fontWeight: 600 }}>210–250ms</td>
                <td><span className={styles.highlightBadge} style={{ backgroundColor: '#e0e7ff', color: '#1e40af' }}>Above average</span></td>
                <td style={{ color: '#6b7280', fontSize: '0.75rem' }}>Active adults on a good device</td>
              </tr>
              <tr style={{ backgroundColor: '#eff6ff' }}>
                <td style={{ color: '#374151', fontWeight: 700 }}>50th (median)</td>
                <td style={{ fontWeight: 700 }}>250–300ms</td>
                <td><span className={styles.highlightBadge} style={{ backgroundColor: '#e5e7eb', color: '#374151' }}>Average</span></td>
                <td style={{ color: '#6b7280', fontSize: '0.75rem' }}>Normal healthy adult range</td>
              </tr>
              <tr>
                <td style={{ color: '#ea580c', fontWeight: 700 }}>Bottom 25%</td>
                <td style={{ fontWeight: 600 }}>300–360ms</td>
                <td><span className={styles.highlightBadge} style={{ backgroundColor: '#ffedd5', color: '#ea580c' }}>Below average</span></td>
                <td style={{ color: '#6b7280', fontSize: '0.75rem' }}>Fatigue, mobile device, or older age</td>
              </tr>
              <tr>
                <td style={{ color: '#dc2626', fontWeight: 700 }}>Bottom 10%</td>
                <td style={{ fontWeight: 600 }}>&gt;360ms</td>
                <td><span className={styles.highlightBadge} style={{ backgroundColor: '#fee2e2', color: '#dc2626' }}>Slow</span></td>
                <td style={{ color: '#6b7280', fontSize: '0.75rem' }}>High hardware latency likely a factor</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: '0.75rem', color: '#9ca3af', lineHeight: '1.5' }}>
          Benchmarks based on published norms and large public datasets, trimmed to exclude likely anticipation clicks (&lt;100ms) and extreme hardware lag (&gt;800ms).
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Visual vs audio vs tactile reaction time</h2>
        <p className={styles.text}>
          Reaction time is not a single number - It varies by sensory modality. The auditory pathway to the motor cortex is shorter and has fewer synaptic relays than the visual pathway, making <span className={styles.link}>audio reaction time</span> consistently faster. Tactile (touch) RT is faster still but rarely tested outside laboratory settings.
        </p>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Modality</th>
                <th>Average RT</th>
                <th>Why faster/slower</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: 600, color: '#111827' }}>Tactile (touch)</td>
                <td style={{ fontWeight: 700, color: '#1d4ed8' }}>~155ms</td>
                <td style={{ color: '#4b5563', fontSize: '0.75rem' }}>Shortest pathway - Skin receptors directly activate spinal reflexes</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600, color: '#111827' }}>Auditory (sound)</td>
                <td style={{ fontWeight: 700, color: '#1d4ed8' }}>~170–200ms</td>
                <td style={{ color: '#4b5563', fontSize: '0.75rem' }}>Cochlea → auditory cortex has ~4 synaptic relays vs ~6 for vision</td>
              </tr>
              <tr style={{ backgroundColor: '#eff6ff' }}>
                <td style={{ fontWeight: 600, color: '#111827' }}>Visual (this test)</td>
                <td style={{ fontWeight: 700, color: '#111827' }}>~250–280ms</td>
                <td style={{ color: '#4b5563', fontSize: '0.75rem' }}>Retina → V1 → motor cortex adds phototransduction delay (~20ms)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Factors that affect your score</h2>
        <p className={styles.text}>
          Reaction time fluctuates by 15–40ms across sessions in the same individual due to transient state factors - Arousal, hydration, fatigue, and caffeine. Understanding these lets you control for them when comparing across sessions, and explains why a "bad day" score is often 30–50ms slower than your true resting baseline.
        </p>

        <div className={styles.grid2}>
          <div className={styles.factCard} style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe' }}>
            <div className={styles.factTitle} style={{ color: '#1e3a8a' }}>Sleep is the biggest lever</div>
            <div className={styles.factText} style={{ color: '#1e40af' }}>
              A single night of poor sleep (5–6hrs) slows RT by 30–50ms on average. Total sleep deprivation for 17–19 hours produces impairment equivalent to 0.05% blood alcohol - Legal intoxication in many countries.
            </div>
          </div>
          <div className={styles.factCard} style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0' }}>
            <div className={styles.factTitle} style={{ color: '#14532d' }}>Practice narrows the gap</div>
            <div className={styles.factText} style={{ color: '#166534' }}>
              RT improves with practice not because neural conduction velocity changes - It doesn't - But because attentional readiness increases, cutting the pre-processing latency before the motor command fires.
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Reaction time by age</h2>
        <p className={styles.text}>
          Simple visual RT peaks in the early-to-mid 20s at approximately 218ms and slows by roughly 2–5ms per decade thereafter. This decline reflects reduced myelination efficiency and slower central processing. By age 65+, the average rises to ~310ms. Trained individuals maintain faster RT into their 40s and 50s compared to sedentary peers, but the underlying biological trend is not reversed.
        </p>

        <div style={{ width: '100%', height: '220px', margin: '2rem 0', position: 'relative', backgroundColor: '#f8fafc', borderRadius: '12px', padding: '1rem' }}>
          <svg viewBox="0 0 800 200" width="100%" height="100%" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
            {/* Grid lines */}
            <line x1="50" y1="160" x2="750" y2="160" stroke="#e5e7eb" strokeWidth="2" />
            <line x1="50" y1="110" x2="750" y2="110" stroke="#f3f4f6" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="50" y1="60" x2="750" y2="60" stroke="#f3f4f6" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="50" y1="10" x2="750" y2="10" stroke="#f3f4f6" strokeWidth="1" strokeDasharray="4 4" />
            
            {/* Y axis labels */}
            <text x="40" y="165" fontSize="12" fill="#9ca3af" textAnchor="end">200</text>
            <text x="40" y="115" fontSize="12" fill="#9ca3af" textAnchor="end">250</text>
            <text x="40" y="65" fontSize="12" fill="#9ca3af" textAnchor="end">300</text>
            <text x="40" y="15" fontSize="12" fill="#9ca3af" textAnchor="end">350</text>

            {/* Line Chart */}
            <path d="M 50 142 L 150 148 L 250 120 L 350 90 L 450 75 L 550 50 L 650 30 L 750 10" fill="none" stroke="#2563eb" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            
            {/* Data points */}
            <circle cx="50" cy="142" r="5" fill="#2563eb" />
            <circle cx="150" cy="148" r="6" fill="#1d4ed8" stroke="white" strokeWidth="2" />
            <circle cx="250" cy="120" r="5" fill="#2563eb" />
            <circle cx="350" cy="90" r="5" fill="#2563eb" />
            <circle cx="450" cy="75" r="5" fill="#2563eb" />
            <circle cx="550" cy="50" r="5" fill="#2563eb" />
            <circle cx="650" cy="30" r="5" fill="#2563eb" />
            <circle cx="750" cy="10" r="5" fill="#2563eb" />

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
            <div className={styles.statValue} style={{ color: '#1d4ed8' }}>240ms</div>
            <div className={styles.statLabel}>Age 15–19</div>
          </div>
          <div className={styles.statCard} style={{ backgroundColor: '#dbeafe', border: '1px solid #93c5fd' }}>
            <div className={styles.statValue} style={{ color: '#1e40af' }}>218ms</div>
            <div className={styles.statLabel}>Age 20–24 (peak)</div>
          </div>
          <div className={styles.statCard} style={{ backgroundColor: '#fefce8', border: '1px solid #fef08a' }}>
            <div className={styles.statValue} style={{ color: '#a16207' }}>268ms</div>
            <div className={styles.statLabel}>Age 45–54</div>
          </div>
          <div className={styles.statCard} style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca' }}>
            <div className={styles.statValue} style={{ color: '#b91c1c' }}>310ms</div>
            <div className={styles.statLabel}>Age 65+</div>
          </div>
        </div>
      </section>

      {/* LLM Optimized FAQ Section */}
      <section className={styles.section} itemScope itemType="https://schema.org/FAQPage">
        <h2 className={styles.sectionTitle}>Frequently Asked Questions (FAQ)</h2>
        
        <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question" style={{ marginBottom: '1.5rem' }}>
          <h3 itemProp="name" style={{ fontSize: '1.125rem', fontWeight: 600, color: '#111827', marginBottom: '0.5rem' }}>
            What is a good reaction time?
          </h3>
          <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <p itemProp="text" className={styles.text}>
              A good reaction time is anything below 250ms. A score between 250ms and 300ms is considered average for an adult. Anything below 200ms is excellent and typical of competitive gamers or professional athletes.
            </p>
          </div>
        </div>

        <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question" style={{ marginBottom: '1.5rem' }}>
          <h3 itemProp="name" style={{ fontSize: '1.125rem', fontWeight: 600, color: '#111827', marginBottom: '0.5rem' }}>
            Why is my reaction time so slow?
          </h3>
          <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <p itemProp="text" className={styles.text}>
              Slow reaction times are often caused by hardware latency (using a wireless mouse, playing on a 60Hz monitor, or using a mobile phone). Biological factors like lack of sleep, dehydration, fatigue, or increasing age also significantly slow down your reaction speed.
            </p>
          </div>
        </div>

        <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question" style={{ marginBottom: '1.5rem' }}>
          <h3 itemProp="name" style={{ fontSize: '1.125rem', fontWeight: 600, color: '#111827', marginBottom: '0.5rem' }}>
            Can you improve your reaction time?
          </h3>
          <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <p itemProp="text" className={styles.text}>
              Yes, you can improve your reaction time through practice, getting adequate sleep, staying hydrated, and doing aerobic exercise. Upgrading your hardware (e.g., using a 144Hz+ monitor and a wired gaming mouse) will also instantly improve your measured score.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
