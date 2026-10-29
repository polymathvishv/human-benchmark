import { Link } from 'react-router-dom';
import styles from './GameInfo.module.css';

export default function ChoiceReactionTimeInfo() {
  return (
    <div className={styles.infoSection}>
      {/* ── Section 1: What is Choice Reaction Time & Hick's Law ── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>What is Choice Reaction Time (Hick's Law)?</h2>
        <dl style={{ marginBottom: '1.5rem', backgroundColor: '#f8fafc', padding: '1.5rem', borderRadius: '12px' }}>
          <dt style={{ fontWeight: 700, color: '#111827', fontSize: '1.125rem' }}>Definition</dt>
          <dd style={{ color: '#4b5563', marginTop: '0.5rem', marginBottom: '1rem', lineHeight: '1.6' }}>
            Choice reaction time (CRT) is the elapsed interval between the appearance of one of multiple possible stimuli and the execution of the unique motor response paired to that specific stimulus. Unlike simple reaction time—which merely detects that <em>something</em> occurred—choice reaction time forces the brain to determine <em>what</em> occurred and select the correct corresponding action.
          </dd>
          <dt style={{ fontWeight: 700, color: '#111827', fontSize: '1.125rem' }}>Global 4-Choice Average</dt>
          <dd style={{ color: '#4b5563', marginTop: '0.5rem', lineHeight: '1.6' }}>
            The global median 4-choice visual reaction time is approximately <strong>370 milliseconds</strong> on web-based benchmarks, representing a +70ms to +120ms cognitive processing tax over baseline <Link to="/reaction-time" className={styles.link}>Simple Visual Reaction Time</Link> (~273–284ms).
          </dd>
        </dl>

        <p className={styles.text}>
          In 1952, British psychologist William Edmund Hick discovered that reaction time does not increase in a 1:1 linear progression with the number of alternatives. Instead, reaction time scales with the <strong>base-2 logarithm</strong> of the number of options—a mathematical principle formulated alongside Ray Hyman (1953) and known worldwide as <strong>Hick's Law</strong> (or the <em>Hick-Hyman Law</em>).
        </p>

        <p className={styles.text}>
          Hick proved that the human brain functions as an information-processing channel with a measurable throughput rate, quantifying cognitive decision cost using Claude Shannon's concept of <strong>Information Entropy</strong> measured in <em>bits</em>.
        </p>
      </section>

      {/* ── Section 2: Mathematical Foundation of Hick-Hyman Law ── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>The Mathematical Formula & Information Entropy</h2>
        <p className={styles.text}>
          The formal mathematical equation for Hick's Law is expressed as:
        </p>

        <div className={styles.box} style={{ background: '#f0fdf4', borderColor: '#bbf7d0', textAlign: 'center', padding: '1.5rem' }}>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#166534', fontFamily: 'serif', letterSpacing: '0.04em' }}>
            RT = a + b · log₂(n + 1)
          </div>
          <p style={{ fontSize: '0.875rem', color: '#15803d', marginTop: '0.75rem', lineHeight: '1.6', maxWidth: '650px', margin: '0.75rem auto 0' }}>
            Where <strong>RT</strong> is total response latency, <strong>a</strong> is simple sensory-motor transmission time, <strong>b</strong> is cortical decision rate per bit, and <strong>n</strong> is the count of equiprobable choices.
          </p>
        </div>

        <div className={styles.tableContainer} style={{ marginTop: '1.25rem' }}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Choices (n)</th>
                <th>Entropy: log₂(n + 1)</th>
                <th>Shannon Bits</th>
                <th>Expected RT</th>
                <th>Decision Overhead</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: 700, color: '#111827' }}>1 Option (Simple RT)</td>
                <td>log₂(2) = 1.00</td>
                <td>0.00 bits (0 uncertainty)</td>
                <td style={{ fontWeight: 700, color: '#059669' }}>~273 ms</td>
                <td><span className={styles.highlightBadge} style={{ backgroundColor: '#dcfce7', color: '#15803d' }}>+0 ms (Baseline)</span></td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700, color: '#111827' }}>2 Options</td>
                <td>log₂(3) = 1.58</td>
                <td>1.00 bit</td>
                <td style={{ fontWeight: 600 }}>~330 ms</td>
                <td><span className={styles.highlightBadge} style={{ backgroundColor: '#e0f2fe', color: '#0369a1' }}>+57 ms</span></td>
              </tr>
              <tr style={{ backgroundColor: '#f0fdfa' }}>
                <td style={{ fontWeight: 700, color: '#0d9488' }}>4 Options (This Benchmark)</td>
                <td style={{ fontWeight: 600 }}>log₂(5) = 2.32</td>
                <td style={{ fontWeight: 600 }}>2.00 bits</td>
                <td style={{ fontWeight: 700, color: '#0d9488' }}>~370 ms</td>
                <td><span className={styles.highlightBadge} style={{ backgroundColor: '#ccfbf1', color: '#0f766e' }}>+97 ms Decision Overhead</span></td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700, color: '#111827' }}>8 Options</td>
                <td>log₂(9) = 3.17</td>
                <td>3.00 bits</td>
                <td style={{ fontWeight: 600 }}>~430 ms</td>
                <td><span className={styles.highlightBadge} style={{ backgroundColor: '#ede9fe', color: '#6d28d9' }}>+157 ms</span></td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700, color: '#111827' }}>16 Options</td>
                <td>log₂(17) = 4.09</td>
                <td>4.00 bits</td>
                <td style={{ fontWeight: 600 }}>~490 ms</td>
                <td><span className={styles.highlightBadge} style={{ backgroundColor: '#fee2e2', color: '#b91c1c' }}>+217 ms</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Logarithmic Scaling Visualization (SVG) ── */}
        <div style={{ width: '100%', maxWidth: '100%', height: '220px', margin: '1.5rem 0', position: 'relative', overflow: 'hidden' }}>
          <svg viewBox="0 0 800 220" width="100%" height="100%" preserveAspectRatio="none" style={{ maxWidth: '100%', display: 'block' }}>
            <rect x="0" y="0" width="800" height="220" fill="#0f172a" rx="10" />
            
            {/* Grid Lines */}
            <line x1="80" y1="180" x2="760" y2="180" stroke="#334155" strokeWidth="1.5" />
            <line x1="80" y1="130" x2="760" y2="130" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="80" y1="80" x2="760" y2="80" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="80" y1="30" x2="760" y2="30" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" />

            {/* Y Axis Labels */}
            <text x="70" y="184" fill="#64748b" fontSize="11" textAnchor="end">200ms</text>
            <text x="70" y="134" fill="#64748b" fontSize="11" textAnchor="end">300ms</text>
            <text x="70" y="84" fill="#64748b" fontSize="11" textAnchor="end">400ms</text>
            <text x="70" y="34" fill="#64748b" fontSize="11" textAnchor="end">500ms</text>

            {/* Linear Growth Comparison (Ghost Line) */}
            <path d="M 120 150 L 280 120 L 480 80 L 720 20" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="5 5" opacity="0.6" />
            <text x="710" y="35" fill="#f87171" fontSize="10" textAnchor="end">Hypothetical Linear Scaling</text>

            {/* Hick's Law Logarithmic Curve */}
            <path d="M 120 150 Q 280 115 480 95 T 720 75" fill="none" stroke="#10b981" strokeWidth="3.5" />
            
            {/* Data Points */}
            {/* 1 Choice */}
            <circle cx="120" cy="150" r="6" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
            <text x="120" y="172" fill="#94a3b8" fontSize="11" textAnchor="middle">1 Choice</text>
            <text x="120" y="138" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">273ms</text>

            {/* 2 Choices */}
            <circle cx="280" cy="118" r="6" fill="#06b6d4" stroke="#ffffff" strokeWidth="2" />
            <text x="280" y="172" fill="#94a3b8" fontSize="11" textAnchor="middle">2 Choices</text>
            <text x="280" y="106" fill="#06b6d4" fontSize="11" fontWeight="bold" textAnchor="middle">330ms</text>

            {/* 4 Choices (Active) */}
            <circle cx="480" cy="95" r="8" fill="#f59e0b" stroke="#ffffff" strokeWidth="2.5" />
            <text x="480" y="172" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">4 Choices (Test)</text>
            <text x="480" y="80" fill="#f59e0b" fontSize="12" fontWeight="bold" textAnchor="middle">370ms</text>

            {/* 8 Choices */}
            <circle cx="720" cy="75" r="6" fill="#8b5cf6" stroke="#ffffff" strokeWidth="2" />
            <text x="720" y="172" fill="#94a3b8" fontSize="11" textAnchor="middle">8 Choices</text>
            <text x="720" y="63" fill="#8b5cf6" fontSize="11" fontWeight="bold" textAnchor="middle">430ms</text>
          </svg>
        </div>
      </section>

      {/* ── Section 3: The 3 Mental Stages (Donders' Subtraction Method) ── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>The 3 Mental Stages: Donders' Subtraction Method</h2>
        <p className={styles.text}>
          In 1868, Dutch ophthalmologist Franciscus Cornelis Donders devised the <strong>subtraction method</strong> to dissect human cognition into separate chronological processing stages. While simple reflexes only test raw transmission, choice tasks reveal the hidden workload of your executive cortex:
        </p>

        <div className={styles.box}>
          <h3 className={styles.boxTitle}>Neural Processing Pipeline (Donders Stage Decomposition)</h3>
          <div>
            <div className={styles.chainRow}>
              <div className={styles.chainTime}>~160ms</div>
              <div className={styles.chainBox} style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', color: '#1e40af' }}>
                <strong>Stage 1: Stimulus Detection</strong> — Retinal phototransduction, optic radiation, and signal arrival in primary visual cortex (V1). Common to all reaction tasks.
              </div>
            </div>
            <div className={styles.chainRow}>
              <div className={styles.chainTime}>+80ms</div>
              <div className={styles.chainBox} style={{ backgroundColor: '#f0fdfa', border: '1px solid #99f6e4', color: '#0f766e' }}>
                <strong>Stage 2: Stimulus Discrimination</strong> — Visual dorsal/ventral streams distinguish spatial position (left vs. right pods) in the posterior parietal cortex.
              </div>
            </div>
            <div className={styles.chainRow}>
              <div className={styles.chainTime}>+90ms</div>
              <div className={styles.chainBox} style={{ backgroundColor: '#faf5ff', border: '1px solid #e9d5ff', color: '#6b21a8' }}>
                <strong>Stage 3: Response Selection (Hick's Stage)</strong> — Dorsolateral prefrontal cortex & basal ganglia resolve choice conflict and select the matching motor program (D, F, J, or K).
              </div>
            </div>
            <div className={styles.chainRow}>
              <div className={styles.chainTime}>~40ms</div>
              <div className={styles.chainBox} style={{ backgroundColor: '#0284c7', color: 'white' }}>
                <strong>Motor Execution</strong> — Corticospinal tract conducts impulses from M1 down to the lumbrical muscles of the hand; key depression registers.
              </div>
            </div>
          </div>
          <p style={{ fontSize: '0.78rem', color: '#6b7280', marginTop: '1rem', lineHeight: '1.5' }}>
            By subtracting your Simple Reaction Time from your 4-Choice Reaction Time, you isolate the exact latency consumed by <strong>Stimulus Discrimination</strong> and <strong>Response Selection</strong>—the cognitive decision overhead.
          </p>
        </div>
      </section>

      {/* ── Section 4: Percentile Reference Table ── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Global 4-Choice RT Percentile Distribution</h2>
        <p className={styles.text}>
          Because choice reaction time demands multi-stage neural processing, variance is wider than in simple reflex tests. Below is the calibrated global distribution for 4 equiprobable alternatives:
        </p>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Percentile</th>
                <th>Choice RT (4 Options)</th>
                <th>Decision Overhead</th>
                <th>Classification</th>
                <th>Typical Profile</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ color: '#7e22ce', fontWeight: 700 }}>Top 1%</td>
                <td style={{ fontWeight: 700 }}>&lt;245 ms</td>
                <td style={{ color: '#16a34a', fontWeight: 600 }}>+30–50 ms</td>
                <td><span className={styles.highlightBadge} style={{ backgroundColor: '#f3e8ff', color: '#7e22ce' }}>Exceptional</span></td>
                <td style={{ color: '#6b7280', fontSize: '0.75rem' }}>Tier-1 professional esports athletes, supersonic jet pilots</td>
              </tr>
              <tr>
                <td style={{ color: '#0284c7', fontWeight: 700 }}>Top 10%</td>
                <td style={{ fontWeight: 700 }}>245–290 ms</td>
                <td style={{ color: '#16a34a', fontWeight: 600 }}>+50–80 ms</td>
                <td><span className={styles.highlightBadge} style={{ backgroundColor: '#e0f2fe', color: '#0369a1' }}>Superior</span></td>
                <td style={{ color: '#6b7280', fontSize: '0.75rem' }}>High-rank competitive gamers, peak young adults (ages 18–24)</td>
              </tr>
              <tr>
                <td style={{ color: '#0d9488', fontWeight: 700 }}>Top 25%</td>
                <td style={{ fontWeight: 700 }}>290–335 ms</td>
                <td style={{ color: '#0284c7', fontWeight: 600 }}>+80–105 ms</td>
                <td><span className={styles.highlightBadge} style={{ backgroundColor: '#ccfbf1', color: '#0f766e' }}>Above Average</span></td>
                <td style={{ color: '#6b7280', fontSize: '0.75rem' }}>Fast typists, regular PC gamers, well-rested active adults</td>
              </tr>
              <tr style={{ backgroundColor: '#eff6ff' }}>
                <td style={{ color: '#1e3a8a', fontWeight: 700 }}>50th (Median)</td>
                <td style={{ fontWeight: 700 }}>350–390 ms (~370 ms)</td>
                <td style={{ color: '#4b5563', fontWeight: 600 }}>+100–130 ms</td>
                <td><span className={styles.highlightBadge} style={{ backgroundColor: '#dbeafe', color: '#1e40af' }}>Average</span></td>
                <td style={{ color: '#6b7280', fontSize: '0.75rem' }}>Standard human benchmark population median</td>
              </tr>
              <tr>
                <td style={{ color: '#ea580c', fontWeight: 700 }}>Bottom 25%</td>
                <td style={{ fontWeight: 700 }}>400–460 ms</td>
                <td style={{ color: '#ea580c', fontWeight: 600 }}>+140–180 ms</td>
                <td><span className={styles.highlightBadge} style={{ backgroundColor: '#ffedd5', color: '#ea580c' }}>Below Average</span></td>
                <td style={{ color: '#6b7280', fontSize: '0.75rem' }}>Mild fatigue, touchscreen mobile input, or older age cohorts</td>
              </tr>
              <tr>
                <td style={{ color: '#dc2626', fontWeight: 700 }}>Bottom 10%</td>
                <td style={{ fontWeight: 700 }}>&gt;470 ms</td>
                <td style={{ color: '#dc2626', fontWeight: 600 }}>&gt;+180 ms</td>
                <td><span className={styles.highlightBadge} style={{ backgroundColor: '#fee2e2', color: '#dc2626' }}>Slow</span></td>
                <td style={{ color: '#6b7280', fontSize: '0.75rem' }}>Severe fatigue, multi-tasking distractions, or display lag</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Section 5: Age Trajectory & Esports Optimization ── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Age Trajectory, S-R Compatibility & Esports Training</h2>
        
        <p className={styles.text}>
          Research demonstrates that <strong>choice reaction time deteriorates faster with age than simple reaction time</strong>. While pure sensory reflexes slow by ~2–4ms per decade after age 24, choice reaction time slows by <strong>6–10ms per decade</strong>. This divergence occurs because aging primarily degrades axonal myelination and dopamine receptor density in the prefrontal cortex—the exact structures tasked with resolving choice entropy.
        </p>

        <p className={styles.text}>
          However, two crucial cognitive mechanisms allow humans to counteract Hick's Law:
        </p>

        <div className={styles.box} style={{ background: '#f8fafc' }}>
          <h3 className={styles.boxTitle} style={{ color: '#0369a1' }}>1. Stimulus-Response (S-R) Compatibility (Fitts &amp; Seeger, 1953)</h3>
          <p style={{ fontSize: '0.875rem', lineHeight: '1.6', margin: 0, color: '#334155' }}>
            When the spatial arrangement of targets directly matches the physical layout of your fingers (e.g. D-F-J-K mapping directly to left/right hands), S-R compatibility is maximized. The brain avoids mental coordinate transformation, cutting decision overhead by up to <strong>40%</strong> compared to unmapped or randomized key bindings.
          </p>
        </div>

        <div className={styles.box} style={{ background: '#f8fafc', marginTop: '1rem' }}>
          <h3 className={styles.boxTitle} style={{ color: '#7c3aed' }}>2. Motor Automaticity &amp; The Pro Gamer "Hick Bypass"</h3>
          <p style={{ fontSize: '0.875rem', lineHeight: '1.6', margin: 0, color: '#334155' }}>
            In elite esports professionals (e.g., Counter-Strike, StarCraft II, League of Legends), thousands of deliberate practice hours automate stimulus-response associations in the cerebellum and putamen. This shifts response selection away from deliberative prefrontal control into direct subcortical reflex arcs—effectively flattening Hick's slope (<em>b ≈ 0</em>) and allowing 4-choice responses that approach simple reaction speeds.
          </p>
        </div>
      </section>
    </div>
  );
}

