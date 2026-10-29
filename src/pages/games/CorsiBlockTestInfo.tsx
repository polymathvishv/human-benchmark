import { Link } from 'react-router-dom';
import styles from './GameInfo.module.css';

export default function CorsiBlockTestInfo() {
  return (
    <div className={styles.infoSection}>
      {/* ── Section 1: History & Core Paradigm ── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>What is the Corsi Block-Tapping Test?</h2>
        <dl style={{ marginBottom: '1.5rem', backgroundColor: '#f8fafc', padding: '1.5rem', borderRadius: '12px' }}>
          <dt style={{ fontWeight: 700, color: '#111827', fontSize: '1.125rem' }}>Definition</dt>
          <dd style={{ color: '#4b5563', marginTop: '0.5rem', marginBottom: '1rem', lineHeight: '1.6' }}>
            The <strong>Corsi Block-Tapping Test</strong> (often called the Corsi Span task) is the international gold standard in neuropsychology for evaluating <strong>visuospatial short-term memory</strong> and <strong>executive working memory manipulation</strong>. Nine identical blocks are arranged in an irregular, non-symmetrical pattern on a testing board; the examiner (or computer) taps a sequence of blocks, which the participant must reproduce immediately.
          </dd>
          <dt style={{ fontWeight: 700, color: '#111827', fontSize: '1.125rem' }}>Normative Benchmarks</dt>
          <dd style={{ color: '#4b5563', marginTop: '0.5rem', lineHeight: '1.6' }}>
            Healthy adults achieve an average <strong>Forward Span of 5 to 6 blocks</strong> (~5.6 items) and a <strong>Backward Span of 4 to 5 blocks</strong> (~4.8 items). Reaching a span of 7 or higher places you in the top 15% globally, while an executive reverse span of 7+ represents the elite 95th percentile.
          </dd>
        </dl>

        <p className={styles.text}>
          Developed in 1972 by Canadian neuropsychologist <strong>Philip Corsi</strong> as part of his doctoral dissertation at McGill University under the legendary <strong>Brenda Milner</strong>, the test was originally crafted to evaluate temporal and frontal lobe lesion patients at the Montreal Neurological Institute.
        </p>

        <p className={styles.text}>
          While the classical <em>Digit Span Test</em> (repeating strings of numbers) effectively measures verbal working memory, Corsi realized clinical science lacked an equivalent test for non-verbal spatial sequences. The Corsi Block Test solved this problem by providing a pure metric of spatial memory capacity completely independent of language ability or cultural background.
        </p>
      </section>

      {/* ── Section 2: Visuospatial Sketchpad vs. Phonological Loop ── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Neuroscience: The Baddeley Visuospatial Sketchpad</h2>
        <p className={styles.text}>
          In Alan Baddeley's tripartite model of working memory, the mind maintains two distinct slave systems coordinated by a central executive: the <strong>Phonological Loop</strong> (subvocal verbal rehearsal) and the <strong>Visuospatial Sketchpad</strong> (temporary mental holding of spatial coordinates, shapes, and motion).
        </p>

        <div className={styles.box}>
          <h3 className={styles.boxTitle}>Neural Dissociation: Dorsal Stream vs. Executive Inversion</h3>
          <div>
            <div className={styles.chainRow}>
              <div className={styles.chainTime}>Step 1</div>
              <div className={styles.chainBox} style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', color: '#1e40af' }}>
                <strong>Dorsal "Where" Visual Stream (V1 → Posterior Parietal Cortex)</strong> — When each block flashes, retinotopic spatial coordinates are parsed by the superior parietal lobule and intraparietal sulcus, binding the target's physical location.
              </div>
            </div>
            <div className={styles.chainRow}>
              <div className={styles.chainTime}>Step 2</div>
              <div className={styles.chainBox} style={{ backgroundColor: '#f0fdfa', border: '1px solid #99f6e4', color: '#0f766e' }}>
                <strong>Spatial Rehearsal Buffer (Frontoparietal Network)</strong> — To maintain the sequence over the inter-stimulus interval, covert spatial attention scans between the memorized coordinates, refreshing synaptic activation in the premotor cortex (FEF).
              </div>
            </div>
            <div className={styles.chainRow}>
              <div className={styles.chainTime}>Step 3 (Rev)</div>
              <div className={styles.chainBox} style={{ backgroundColor: '#faf5ff', border: '1px solid #e9d5ff', color: '#6b21a8' }}>
                <strong>Central Executive Manipulation (dlPFC)</strong> — In Backward Span mode, the dorsolateral prefrontal cortex must actively invert the temporal order of spatial traces while shielding the memory buffer from decay.
              </div>
            </div>
          </div>
          <p style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '1rem', lineHeight: '1.5' }}>
            Unlike digit span tests, functional imaging confirms that the Corsi block task shows zero activation in Broca's or Wernicke's language areas when presented with asymmetric layouts.
          </p>
        </div>
      </section>

      {/* ── Section 3: Why Asymmetry Matters ── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Why Corsi Uses an Asymmetric Layout (vs. 3×3 Grids)</h2>
        <p className={styles.text}>
          Many modern memory games use a uniform 3×3 matrix (like our <Link to="/sequence-memory" style={{ color: '#0284c7', fontWeight: 600 }}>Sequence Memory Test</Link>). While engaging, symmetric grids allow test-takers to employ <em>verbal recoding heuristics</em>. In a 3×3 grid, your brain naturally numbers the tiles 1 through 9 or uses linguistic labels ("top-left, center, bottom-right"). This activates the phonological loop, meaning the test inadvertently measures verbal memory rather than pure visuospatial capacity.
        </p>

        <div className={styles.grid2}>
          <div className={styles.card} style={{ backgroundColor: '#fff', border: '1.5px solid #e2e8f0', padding: '1.25rem', borderRadius: '12px' }}>
            <h4 style={{ margin: '0 0 0.5rem', color: '#64748b', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Symmetric 3×3 Matrix</h4>
            <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#475569', fontSize: '0.85rem', lineHeight: '1.6' }}>
              <li>Predictable Euclidean rows and columns</li>
              <li>Prone to verbal numbering shortcuts ("1-5-9 diagonal")</li>
              <li>Allows geometric chunking (shapes, triangles)</li>
              <li>Tests mixed verbal-visual encoding</li>
            </ul>
          </div>
          <div className={styles.card} style={{ backgroundColor: '#f0f9ff', border: '1.5px solid #bae6fd', padding: '1.25rem', borderRadius: '12px' }}>
            <h4 style={{ margin: '0 0 0.5rem', color: '#0284c7', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Standardized Corsi Board (Asymmetric)</h4>
            <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#0f172a', fontSize: '0.85rem', lineHeight: '1.6' }}>
              <li>Irregular coordinate scattering with variable distances</li>
              <li>Defeats verbal labeling and linguistic inner voice</li>
              <li>Prevents linear row/column chunking</li>
              <li><strong>Isolates 100% pure visuospatial working memory</strong></li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── Section 4: Forward vs. Backward Span ── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Forward vs. Backward Corsi Span: Storage vs. Executive Control</h2>
        <p className={styles.text}>
          Clinicians administer both Forward and Backward variations of the Corsi task because they probe two fundamentally distinct levels of cognitive processing:
        </p>

        <div className={styles.grid2}>
          <div className={styles.card} style={{ backgroundColor: '#f8fafc', border: '1px solid #cbd5e1', padding: '1.25rem', borderRadius: '12px' }}>
            <h4 style={{ margin: '0 0 0.5rem', color: '#0369a1', fontSize: '1rem', fontWeight: 700 }}>Forward Span (Passive Storage)</h4>
            <p style={{ margin: '0 0 0.75rem', fontSize: '0.875rem', color: '#475569', lineHeight: '1.6' }}>
              Participants reproduce the sequence in the exact order presented. This evaluates the raw <strong>storage capacity</strong> of the posterior parietal cortex and occipitotemporal pathways. Average span is <strong>5.6 blocks</strong>.
            </p>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0284c7', background: '#e0f2fe', padding: '0.2rem 0.5rem', borderRadius: '6px' }}>
              Parietal Storage Load
            </span>
          </div>

          <div className={styles.card} style={{ backgroundColor: '#faf5ff', border: '1px solid #d8b4fe', padding: '1.25rem', borderRadius: '12px' }}>
            <h4 style={{ margin: '0 0 0.5rem', color: '#7e22ce', fontSize: '1rem', fontWeight: 700 }}>Backward Span (Active Manipulation)</h4>
            <p style={{ margin: '0 0 0.75rem', fontSize: '0.875rem', color: '#581c87', lineHeight: '1.6' }}>
              Participants must reproduce the sequence in exact reverse order (last block tapped first). This taxes <strong>central executive manipulation</strong> in the dorsolateral prefrontal cortex (dlPFC). Average span is <strong>4.8 blocks</strong>.
            </p>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#7e22ce', background: '#f3e8ff', padding: '0.2rem 0.5rem', borderRadius: '6px' }}>
              Prefrontal Executive Load
            </span>
          </div>
        </div>
      </section>

      {/* ── Section 5: Normative Reference Table ── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Global Corsi Span Percentile Table</h2>
        <p className={styles.text}>
          Based on clinical meta-analyses (Kessels et al., 2000; Wechsler Memory Scale norms) across healthy adult populations:
        </p>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Corsi Span Score</th>
                <th>Forward Percentile</th>
                <th>Backward Percentile</th>
                <th>Clinical Classification</th>
                <th>Working Memory Band</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Span 8–9+</strong></td>
                <td>Top 1% – 3%</td>
                <td>Top 0.5% – 1%</td>
                <td><span className={styles.highlightBadge} style={{ background: '#dcfce7', color: '#15803d' }}>Exceptional</span></td>
                <td>Master / Chess Grandmaster level</td>
              </tr>
              <tr>
                <td><strong>Span 7</strong></td>
                <td>Top 14% (86th %ile)</td>
                <td>Top 4% (96th %ile)</td>
                <td><span className={styles.highlightBadge} style={{ background: '#e0f2fe', color: '#0369a1' }}>Superior</span></td>
                <td>High executive working memory</td>
              </tr>
              <tr>
                <td><strong>Span 6</strong></td>
                <td>62nd Percentile</td>
                <td>Top 16% (84th %ile)</td>
                <td><span className={styles.highlightBadge} style={{ background: '#f0fdf4', color: '#166534' }}>Above Average</span></td>
                <td>Strong visuospatial tracking</td>
              </tr>
              <tr>
                <td><strong>Span 5</strong></td>
                <td>32nd – 50th Percentile</td>
                <td>57th Percentile</td>
                <td><span className={styles.highlightBadge} style={{ background: '#fef3c7', color: '#92400e' }}>Average Norm</span></td>
                <td>Standard healthy adult capacity</td>
              </tr>
              <tr>
                <td><strong>Span 4</strong></td>
                <td>11th Percentile</td>
                <td>25th Percentile</td>
                <td><span className={styles.highlightBadge} style={{ background: '#fee2e2', color: '#991b1b' }}>Low Average</span></td>
                <td>Vulnerable to distraction / fatigue</td>
              </tr>
              <tr>
                <td><strong>Span ≤ 3</strong></td>
                <td>Bottom 2%</td>
                <td>Bottom 7%</td>
                <td><span className={styles.highlightBadge} style={{ background: '#fecdd3', color: '#881337' }}>Clinical Deficit</span></td>
                <td>Screening threshold for MCI or TBI</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Section 6: Real-World Applications & Scientific Library Links ── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Real-World Significance &amp; Scientific Resources</h2>
        <p className={styles.text}>
          Visuospatial working memory span is directly correlated with real-world spatial orientation tasks:
        </p>

        <div className={styles.grid3}>
          <div className={styles.card} style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', padding: '1rem', borderRadius: '12px' }}>
            <strong style={{ display: 'block', color: '#0f172a', marginBottom: '0.4rem' }}>Aviation &amp; Air Traffic Control</strong>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b', lineHeight: '1.5' }}>
              Pilots and controllers must track dynamic 3D vectors of multiple aircraft simultaneously without losing spatial orientation.
            </p>
          </div>
          <div className={styles.card} style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', padding: '1rem', borderRadius: '12px' }}>
            <strong style={{ display: 'block', color: '#0f172a', marginBottom: '0.4rem' }}>Esports &amp; Mini-Map Tracking</strong>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b', lineHeight: '1.5' }}>
              Competitive MOBA and FPS players monitor peripheral radar blips, team coordinates, and objective spawn rotations in real time.
            </p>
          </div>
          <div className={styles.card} style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', padding: '1rem', borderRadius: '12px' }}>
            <strong style={{ display: 'block', color: '#0f172a', marginBottom: '0.4rem' }}>Concussion &amp; TBI Screening</strong>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b', lineHeight: '1.5' }}>
              Traumatic brain injuries disproportionately degrade parietal-frontal tracts; Corsi span provides rapid, objective baseline tracking.
            </p>
          </div>
        </div>

        <div style={{ marginTop: '1.5rem', padding: '1.25rem', backgroundColor: '#f0f9ff', borderRadius: '12px', border: '1px solid #bae6fd' }}>
          <h4 style={{ margin: '0 0 0.5rem', color: '#0369a1', fontSize: '1rem' }}>Explore the Science Behind This Test</h4>
          <p style={{ margin: '0 0 0.75rem', fontSize: '0.875rem', color: '#0f172a', lineHeight: '1.6' }}>
            Deepen your understanding of cognitive memory architectures in our Science Library:
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/science/working-memory-explained" style={{ color: '#0284c7', fontWeight: 700, fontSize: '0.875rem', textDecoration: 'underline' }}>
              Working Memory Explained: The Cognitive Engine →
            </Link>
            <Link to="/science/visual-vs-spatial-memory" style={{ color: '#0284c7', fontWeight: 700, fontSize: '0.875rem', textDecoration: 'underline' }}>
              Visual vs. Spatial Memory: The Dual Processing Streams →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

