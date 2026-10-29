import { Link } from 'react-router-dom';
import styles from './GameInfo.module.css';

export default function StroopTestInfo() {
  return (
    <div className={styles.infoSection}>
      {/* ── Section 1: Discovery & Core Paradigm ── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>What is the Stroop Effect?</h2>
        <dl style={{ marginBottom: '1.5rem', backgroundColor: '#f8fafc', padding: '1.5rem', borderRadius: '12px' }}>
          <dt style={{ fontWeight: 700, color: '#111827', fontSize: '1.125rem' }}>Definition</dt>
          <dd style={{ color: '#4b5563', marginTop: '0.5rem', marginBottom: '1rem', lineHeight: '1.6' }}>
            The <strong>Stroop Effect</strong> is the delay in reaction time between congruent and incongruent stimuli. When the word <strong style={{ color: '#3b82f6' }}>"RED"</strong> is printed in blue ink, naming the physical color of the ink takes significantly longer and triggers more errors than when the word <strong style={{ color: '#ef4444' }}>"RED"</strong> is printed in red ink.
          </dd>
          <dt style={{ fontWeight: 700, color: '#111827', fontSize: '1.125rem' }}>Global Benchmarks</dt>
          <dd style={{ color: '#4b5563', marginTop: '0.5rem', lineHeight: '1.6' }}>
            The average adult responds to congruent trials in approximately <strong>560–600ms</strong>, but slows to <strong>720–760ms</strong> on incongruent trials. This gap represents a normal <strong>Stroop Interference Cost of +150ms to +190ms</strong>.
          </dd>
        </dl>

        <p className={styles.text}>
          First documented in 1935 by American psychologist John Ridley Stroop in his seminal paper <em>"Studies of interference in serial verbal reactions"</em> published in the <em>Journal of Experimental Psychology</em>, the Stroop task is considered the gold-standard neuropsychological assessment for <strong>selective visual attention</strong>, <strong>cognitive flexibility</strong>, and <strong>executive inhibitory control</strong>.
        </p>

        <p className={styles.text}>
          The test works because reading words is an overlearned, automatic behavior for literate humans. You cannot simply look at a word and choose not to read it. When the semantic meaning of the word conflicts with the color of the photons hitting your retina, two rival neural commands race toward your motor cortex simultaneously.
        </p>
      </section>

      {/* ── Section 2: Neuroanatomy of Conflict: ACC & dlPFC ── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Neuroanatomy: The Anterior Cingulate &amp; Prefrontal Cortex</h2>
        <p className={styles.text}>
          Functional neuroimaging (fMRI) reveals that the Stroop test activates a dedicated fronto-striatal neural network responsible for detecting and resolving cognitive conflict:
        </p>

        <div className={styles.box}>
          <h3 className={styles.boxTitle}>Neural Pathway of Stroop Conflict Resolution</h3>
          <div>
            <div className={styles.chainRow}>
              <div className={styles.chainTime}>~200ms</div>
              <div className={styles.chainBox} style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', color: '#1e40af' }}>
                <strong>Ventral Reading Stream (VWFA)</strong> — The Visual Word Form Area in the left fusiform gyrus extracts word phonology and semantics automatically in under 220ms.
              </div>
            </div>
            <div className={styles.chainRow}>
              <div className={styles.chainTime}>~350ms</div>
              <div className={styles.chainBox} style={{ backgroundColor: '#f0fdfa', border: '1px solid #99f6e4', color: '#0f766e' }}>
                <strong>Dorsal Color Stream (V4)</strong> — Extrastriate visual cortex (area V4) parses the physical wavelength of the ink and transmits color identity to the lingual gyrus.
              </div>
            </div>
            <div className={styles.chainRow}>
              <div className={styles.chainTime}>+120ms</div>
              <div className={styles.chainBox} style={{ backgroundColor: '#fff1f2', border: '1px solid #fecdd3', color: '#9f1239' }}>
                <strong>Anterior Cingulate Cortex (ACC)</strong> — Detects the mismatch between the prepotent reading response and the target color output, firing a high-amplitude cognitive conflict signal.
              </div>
            </div>
            <div className={styles.chainRow}>
              <div className={styles.chainTime}>+60ms</div>
              <div className={styles.chainBox} style={{ backgroundColor: '#faf5ff', border: '1px solid #e9d5ff', color: '#6b21a8' }}>
                <strong>Dorsolateral Prefrontal Cortex (dlPFC)</strong> — Exerts top-down inhibitory control, actively dampening the automatic reading impulse and gating the motor cortex for the correct color key.
              </div>
            </div>
          </div>
          <p style={{ fontSize: '0.78rem', color: '#6b7280', marginTop: '1rem', lineHeight: '1.5' }}>
            The <strong>Stroop Interference Cost</strong> directly quantifies the processing efficiency of your Anterior Cingulate Cortex and dlPFC. Individuals with stronger executive control resolve this conflict with minimal latency delay.
          </p>
        </div>

        {/* ── Visual Comparison Chart (SVG) ── */}
        <div style={{ width: '100%', maxWidth: '100%', height: '220px', margin: '1.5rem 0', position: 'relative', overflow: 'hidden' }}>
          <svg viewBox="0 0 800 220" width="100%" height="100%" preserveAspectRatio="none" style={{ maxWidth: '100%', display: 'block' }}>
            <rect x="0" y="0" width="800" height="220" fill="#0f172a" rx="10" />

            {/* Congruent Bar */}
            <rect x="50" y="45" width="420" height="42" rx="8" fill="#10b981" />
            <text x="65" y="72" fill="#ffffff" fontSize="13" fontWeight="bold">CONGRUENT: ~560ms</text>
            <text x="485" y="72" fill="#94a3b8" fontSize="12">Automatic Reading Matches Ink (Zero Conflict)</text>

            {/* Incongruent Bar */}
            <rect x="50" y="115" width="560" height="42" rx="8" fill="#f43f5e" />
            <text x="65" y="142" fill="#ffffff" fontSize="13" fontWeight="bold">INCONGRUENT: ~720ms</text>
            <text x="625" y="142" fill="#fca5a5" fontSize="12" fontWeight="bold">+160ms Stroop Cost</text>

            {/* Interference Annotation */}
            <line x1="470" y1="92" x2="610" y2="92" stroke="#fbbf24" strokeWidth="2" strokeDasharray="4 4" />
            <text x="540" y="87" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">ACC Interference Delay</text>
          </svg>
        </div>
      </section>

      {/* ── Section 3: Why Reading Beats Color Naming ── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Why Is Reading Faster Than Color Naming?</h2>
        <p className={styles.text}>
          Cognitive scientists explain the Stroop Effect through two primary theoretical models:
        </p>

        <div className={styles.box} style={{ background: '#f8fafc' }}>
          <h3 className={styles.boxTitle} style={{ color: '#0369a1' }}>1. The Speed of Processing Hypothesis</h3>
          <p style={{ fontSize: '0.875rem', lineHeight: '1.6', margin: 0, color: '#334155' }}>
            Words are decoded and classified semantically faster than physical visual properties like color hue can be named verbally. Because the reading process reaches the decision stage first, the brain must deliberately pause and suppress the word name before initiating the slower color-naming motor command.
          </p>
        </div>

        <div className={styles.box} style={{ background: '#f8fafc', marginTop: '1rem' }}>
          <h3 className={styles.boxTitle} style={{ color: '#7c3aed' }}>2. Automaticity &amp; Connectionist PDP Models (Cohen et al., 1990)</h3>
          <p style={{ fontSize: '0.875rem', lineHeight: '1.6', margin: 0, color: '#334155' }}>
            Parallel Distributed Processing (PDP) models demonstrate that reading pathways possess far higher connection weights due to lifetime repetition. Color naming is an intentional, resource-demanding controlled process. When both pathways operate simultaneously, the stronger pathway dominates unless top-down executive bias intervenes.
          </p>
        </div>
      </section>

      {/* ── Section 4: Percentile Reference Table ── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Stroop Test Percentile Norms</h2>
        <p className={styles.text}>
          Your performance is evaluated across both raw Incongruent Reaction Time and your net Stroop Interference Cost (the penalty incurred when resolving conflict):
        </p>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Percentile</th>
                <th>Incongruent RT</th>
                <th>Interference Cost</th>
                <th>Accuracy</th>
                <th>Cognitive Classification</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ color: '#7e22ce', fontWeight: 700 }}>Top 1%</td>
                <td style={{ fontWeight: 700 }}>&lt;470 ms</td>
                <td style={{ color: '#16a34a', fontWeight: 600 }}>&lt;+75 ms</td>
                <td style={{ fontWeight: 600 }}>99–100%</td>
                <td><span className={styles.highlightBadge} style={{ backgroundColor: '#f3e8ff', color: '#7e22ce' }}>Exceptional Inhibition</span></td>
              </tr>
              <tr>
                <td style={{ color: '#0284c7', fontWeight: 700 }}>Top 10%</td>
                <td style={{ fontWeight: 700 }}>470–560 ms</td>
                <td style={{ color: '#16a34a', fontWeight: 600 }}>+75–115 ms</td>
                <td style={{ fontWeight: 600 }}>&gt;95%</td>
                <td><span className={styles.highlightBadge} style={{ backgroundColor: '#e0f2fe', color: '#0369a1' }}>Superior Attentional Control</span></td>
              </tr>
              <tr>
                <td style={{ color: '#0d9488', fontWeight: 700 }}>Top 25%</td>
                <td style={{ fontWeight: 700 }}>560–640 ms</td>
                <td style={{ color: '#0284c7', fontWeight: 600 }}>+115–150 ms</td>
                <td style={{ fontWeight: 600 }}>&gt;92%</td>
                <td><span className={styles.highlightBadge} style={{ backgroundColor: '#ccfbf1', color: '#0f766e' }}>Above Average</span></td>
              </tr>
              <tr style={{ backgroundColor: '#eff6ff' }}>
                <td style={{ color: '#1e3a8a', fontWeight: 700 }}>50th (Median)</td>
                <td style={{ fontWeight: 700 }}>640–780 ms (~720 ms)</td>
                <td style={{ color: '#4b5563', fontWeight: 600 }}>+150–190 ms</td>
                <td style={{ fontWeight: 600 }}>~90%</td>
                <td><span className={styles.highlightBadge} style={{ backgroundColor: '#dbeafe', color: '#1e40af' }}>Normal Adult Benchmark</span></td>
              </tr>
              <tr>
                <td style={{ color: '#ea580c', fontWeight: 700 }}>Bottom 25%</td>
                <td style={{ fontWeight: 700 }}>780–880 ms</td>
                <td style={{ color: '#ea580c', fontWeight: 600 }}>+190–240 ms</td>
                <td style={{ fontWeight: 600 }}>80–88%</td>
                <td><span className={styles.highlightBadge} style={{ backgroundColor: '#ffedd5', color: '#ea580c' }}>Elevated Interference / Fatigue</span></td>
              </tr>
              <tr>
                <td style={{ color: '#dc2626', fontWeight: 700 }}>Bottom 10%</td>
                <td style={{ fontWeight: 700 }}>&gt;880 ms</td>
                <td style={{ color: '#dc2626', fontWeight: 600 }}>&gt;+240 ms</td>
                <td style={{ fontWeight: 600 }}>&lt;80%</td>
                <td><span className={styles.highlightBadge} style={{ backgroundColor: '#fee2e2', color: '#dc2626' }}>Significant Attentional Drag</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Section 5: Real-World Applications ── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Real-World Significance &amp; Clinical Applications</h2>
        <p className={styles.text}>
          Because the Stroop task isolates pure inhibitory control from simple reaction speed, it is widely utilized across neuropsychology, aerospace, and competitive sports:
        </p>

        <ul style={{ paddingLeft: '1.25rem', lineHeight: '1.7', color: '#374151', marginBottom: '1.5rem' }}>
          <li>
            <strong>ADHD &amp; Executive Dysfunction:</strong> Individuals with attention deficit hyperactivity disorder frequently exhibit larger interference costs due to altered dopamine signaling in the prefrontal cortex.
          </li>
          <li>
            <strong>Concussion &amp; TBI Assessment:</strong> Mild traumatic brain injury impairs white matter tracts connecting the ACC to the frontal eye fields, dramatically slowing incongruent reaction speeds.
          </li>
          <li>
            <strong>Aviation &amp; High-Speed Driving:</strong> Pilots and race car drivers rely on executive inhibition to ignore distracting peripheral visual noise and focus strictly on vital flight instruments.
          </li>
          <li>
            <strong>Healthy Cognitive Aging:</strong> Resistance to Stroop interference is one of the strongest predictive biomarkers of cognitive reserve and preserved frontal lobe integrity in older adults.
          </li>
        </ul>

        <p className={styles.text}>
          To compare your executive attention against other cognitive benchmarks, try our <Link to="/choice-reaction-time" className={styles.link}>Choice Reaction Time Test (Hick's Law)</Link> or evaluate spatial memory on the <Link to="/visual-memory" className={styles.link}>Visual Memory Test</Link>.
        </p>
      </section>
    </div>
  );
}

