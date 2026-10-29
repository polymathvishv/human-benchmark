import { Link } from 'react-router-dom';
import styles from './GameInfo.module.css';

export default function DualNBackInfo() {
  return (
    <div className={styles.infoSection}>
      {/* ── Section 1: Definition & Overview ── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>What is the Dual N-Back Test?</h2>
        <dl style={{ marginBottom: '1.5rem', backgroundColor: '#f8fafc', padding: '1.5rem', borderRadius: '12px' }}>
          <dt style={{ fontWeight: 700, color: '#111827', fontSize: '1.125rem' }}>Definition</dt>
          <dd style={{ color: '#4b5563', marginTop: '0.5rem', marginBottom: '1rem', lineHeight: '1.6' }}>
            The <strong>Dual N-Back Task</strong> is a continuous, multi-modal cognitive assessment where participants simultaneously track two independent streams of information: a <strong>visual spatial position</strong> on a 3×3 grid and an <strong>auditory spoken letter</strong>. For each trial, the participant must decide whether the current stimulus matches the one presented exactly <strong>N steps back</strong>.
          </dd>
          <dt style={{ fontWeight: 700, color: '#111827', fontSize: '1.125rem' }}>Global Benchmarks</dt>
          <dd style={{ color: '#4b5563', marginTop: '0.5rem', lineHeight: '1.6' }}>
            Healthy adults achieve an average accuracy of <strong>65% to 75% on Dual 2-Back</strong> (~270 composite points). Achieving 85%+ on Dual 2-Back places you in the top 15% globally, while sustaining above 75% on Dual 3-Back represents elite executive working memory capacity (top 2%).
          </dd>
        </dl>

        <p className={styles.text}>
          Originally conceptualized by Wayne Kirchner in 1958 as a single-stream memory test, the task was evolved into the modern dual-modality paradigm to stress both the <strong>Visuospatial Sketchpad</strong> and the <strong>Phonological Loop</strong> simultaneously under the supervision of the <strong>Central Executive</strong>.
        </p>

        <p className={styles.text}>
          Unlike simple span tests where you memorize an entire sequence and recall it at the end (such as <Link to="/sequence-memory" style={{ color: '#6366f1', fontWeight: 600 }}>Sequence Memory</Link> or <Link to="/corsi-block-test" style={{ color: '#6366f1', fontWeight: 600 }}>Corsi Block Test</Link>), Dual N-Back requires <strong>continuous updating</strong>: with every passing second, the oldest item in your mental buffer must be purged while a new coordinate and sound are encoded in real time.
        </p>
      </section>

      {/* ── Section 2: How 2-Back Works Step-by-Step ── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>How Dual 2-Back Works: Step-by-Step Example</h2>
        <p className={styles.text}>
          Dual N-Back is famously challenging for newcomers because you are comparing what you see and hear right now against memories from two steps ago. Here is a walkthrough of 5 consecutive trials in a Dual 2-Back round:
        </p>

        <div className={styles.box}>
          <h3 className={styles.boxTitle}>Walkthrough: Tracking 2 Steps Back</h3>
          <div>
            <div className={styles.chainRow}>
              <div className={styles.chainTime}>Trial 1</div>
              <div className={styles.chainBox} style={{ backgroundColor: '#f1f5f9', border: '1px solid #cbd5e1', color: '#334155' }}>
                <strong>Top-Left Square + Letter "C"</strong> — Warmup trial. Encode both stimuli into memory. No comparison possible yet.
              </div>
            </div>
            <div className={styles.chainRow}>
              <div className={styles.chainTime}>Trial 2</div>
              <div className={styles.chainBox} style={{ backgroundColor: '#f1f5f9', border: '1px solid #cbd5e1', color: '#334155' }}>
                <strong>Bottom-Right Square + Letter "H"</strong> — Warmup trial. Hold both Trial 1 and Trial 2 in memory.
              </div>
            </div>
            <div className={styles.chainRow}>
              <div className={styles.chainTime}>Trial 3</div>
              <div className={styles.chainBox} style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', color: '#1e40af' }}>
                <strong>Top-Left Square + Letter "Q"</strong> — Compare to Trial 1:
                <br />
                • Position: Matches Trial 1 (Top-Left) → <strong style={{ color: '#1d4ed8' }}>PRESS [A] (Position Match)</strong>
                <br />
                • Letter: "Q" does NOT match "C" → <em>Do NOT press [L]</em>
              </div>
            </div>
            <div className={styles.chainRow}>
              <div className={styles.chainTime}>Trial 4</div>
              <div className={styles.chainBox} style={{ backgroundColor: '#faf5ff', border: '1px solid #e9d5ff', color: '#6b21a8' }}>
                <strong>Mid-Left Square + Letter "H"</strong> — Compare to Trial 2:
                <br />
                • Position: Mid-Left does NOT match Bottom-Right → <em>Do NOT press [A]</em>
                <br />
                • Letter: Matches Trial 2 ("H") → <strong style={{ color: '#7e22ce' }}>PRESS [L] (Audio Match)</strong>
              </div>
            </div>
            <div className={styles.chainRow}>
              <div className={styles.chainTime}>Trial 5</div>
              <div className={styles.chainBox} style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', color: '#15803d' }}>
                <strong>Top-Left Square + Letter "Q"</strong> — Compare to Trial 3:
                <br />
                • Position: Matches Trial 3 (Top-Left) → <strong style={{ color: '#15803d' }}>PRESS [A]</strong>
                <br />
                • Letter: Matches Trial 3 ("Q") → <strong style={{ color: '#15803d' }}>PRESS [L] (Dual Match!)</strong>
              </div>
            </div>
          </div>
          <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '1rem', lineHeight: '1.5' }}>
            Notice how Trial 5 was a <strong>Dual Match</strong>: both position and auditory channels matched what occurred two steps ago.
          </p>
        </div>
      </section>

      {/* ── Section 3: The Jaeggi et al. (2008) Breakthrough ── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>The Landmark Science: Jaeggi et al. (2008) &amp; Fluid Intelligence</h2>
        <p className={styles.text}>
          For over a century, psychology dogma maintained that <strong>fluid intelligence ($G_f$)</strong>—the innate capacity to reason, solve novel abstract problems, and identify logic patterns independent of acquired knowledge—was genetically fixed and immutable in adulthood.
        </p>

        <p className={styles.text}>
          In 2008, neuroscientists <strong>Susanne Jaeggi, Martin Buschkuehl, John Jonides, and Walter Perrig</strong> published a groundbreaking study in the <em>Proceedings of the National Academy of Sciences (PNAS)</em> titled <em>"Improving fluid intelligence with training on working memory."</em>
        </p>

        <div className={styles.box}>
          <h3 className={styles.boxTitle}>Key Findings from Jaeggi et al. (PNAS 2008)</h3>
          <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#334155', fontSize: '0.875rem', lineHeight: '1.7' }}>
            <li>
              <strong>Direct Far-Transfer:</strong> Participants who trained on adaptive Dual N-Back for 25 minutes daily showed statistically significant gains on standard Raven's Advanced Progressive Matrices and the Bochumer Matrizen-Test.
            </li>
            <li>
              <strong>Dose-Dependent Gains:</strong> Cognitive gains were directly proportional to the amount of training: groups completing 19 days of training experienced double the IQ improvement of groups training for only 8 days.
            </li>
            <li>
              <strong>Cross-Modal Shared Architecture:</strong> Dual N-Back transfers to general problem-solving because both tasks rely on the exact same frontoparietal attentional bottleneck—the neural circuits that maintain relevant information while inhibiting interference.
            </li>
          </ul>
        </div>
      </section>

      {/* ── Section 4: Neuroanatomy: The Frontoparietal Control Network ── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Neuroanatomy: How Dual N-Back Rewires the Brain</h2>
        <p className={styles.text}>
          Functional fMRI neuroimaging reveals that Dual N-Back demands more concurrent cerebral blood flow than almost any other psychological task because it recruits two separate sensory loops simultaneously:
        </p>

        <div className={styles.grid2}>
          <div className={styles.card} style={{ backgroundColor: '#eff6ff', border: '1.5px solid #bfdbfe', padding: '1.25rem', borderRadius: '12px' }}>
            <h4 style={{ margin: '0 0 0.5rem', color: '#1d4ed8', fontSize: '1rem', fontWeight: 700 }}>Visual Modality (Where Stream)</h4>
            <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#1e3a8a', fontSize: '0.85rem', lineHeight: '1.6' }}>
              <li><strong>Superior Parietal Lobule:</strong> Retains spatial coordinates in an internal retinotopic map.</li>
              <li><strong>Frontal Eye Fields (FEF):</strong> Anticipates coordinate vectors without requiring saccadic eye movements.</li>
              <li><strong>Right Dorsolateral Prefrontal Cortex:</strong> Updates the 2-step spatial FIFO buffer.</li>
            </ul>
          </div>

          <div className={styles.card} style={{ backgroundColor: '#faf5ff', border: '1.5px solid #e9d5ff', padding: '1.25rem', borderRadius: '12px' }}>
            <h4 style={{ margin: '0 0 0.5rem', color: '#7e22ce', fontSize: '1rem', fontWeight: 700 }}>Auditory Modality (Phonological Loop)</h4>
            <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#581c87', fontSize: '0.85rem', lineHeight: '1.6' }}>
              <li><strong>Heschl’s Gyrus (A1):</strong> Processes acoustic phonemes of letters.</li>
              <li><strong>Broca’s Area (Brodmann 44/45):</strong> Subvocal articulatory rehearsal keeps phonemes from decaying.</li>
              <li><strong>Left Prefrontal Cortex:</strong> Continuously reconciles auditory matches against older phonemic tokens.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── Section 5: Normative Reference Table ── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Global Dual N-Back Normative Percentile Table</h2>
        <p className={styles.text}>
          Empirical scoring breakdown based on Signal Detection accuracy ($Hits / (Hits + Misses + False Alarms)$) and composite leaderboard points ($N \times 100 + Accuracy\%$):
        </p>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>N-Level &amp; Accuracy</th>
                <th>Leaderboard Points</th>
                <th>Global Percentile</th>
                <th>Executive Classification</th>
                <th>Cognitive Capacity</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>3-Back @ 80%+</strong></td>
                <td>380+ pts</td>
                <td>Top 1%</td>
                <td><span className={styles.highlightBadge} style={{ background: '#dcfce7', color: '#15803d' }}>Exceptional</span></td>
                <td>Elite working memory &amp; fluid reasoning</td>
              </tr>
              <tr>
                <td><strong>3-Back @ 60%–75%</strong></td>
                <td>360–375 pts</td>
                <td>Top 5%</td>
                <td><span className={styles.highlightBadge} style={{ background: '#e0f2fe', color: '#0369a1' }}>Superior</span></td>
                <td>Advanced frontoparietal gating</td>
              </tr>
              <tr>
                <td><strong>2-Back @ 85%+</strong></td>
                <td>285–300 pts</td>
                <td>Top 15%</td>
                <td><span className={styles.highlightBadge} style={{ background: '#f0fdf4', color: '#166534' }}>High Average</span></td>
                <td>Qualifies for 3-Back progression</td>
              </tr>
              <tr>
                <td><strong>2-Back @ 70%–80%</strong></td>
                <td>270–280 pts</td>
                <td>50th – 65th Percentile</td>
                <td><span className={styles.highlightBadge} style={{ background: '#fef3c7', color: '#92400e' }}>Standard Benchmark</span></td>
                <td>Healthy adult baseline</td>
              </tr>
              <tr>
                <td><strong>2-Back &lt; 60%</strong></td>
                <td>&lt; 260 pts</td>
                <td>Bottom 25%</td>
                <td><span className={styles.highlightBadge} style={{ background: '#fee2e2', color: '#991b1b' }}>Developing</span></td>
                <td>Recommend practicing on 1-Back first</td>
              </tr>
              <tr>
                <td><strong>1-Back @ 85%+</strong></td>
                <td>185–200 pts</td>
                <td>Introductory</td>
                <td><span className={styles.highlightBadge} style={{ background: '#f1f5f9', color: '#475569' }}>Foundation</span></td>
                <td>Ideal for learning dual sensory coordination</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Section 6: Scientific Library Cross-Links ── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Deepen Your Understanding in the Science Library</h2>
        <div style={{ padding: '1.25rem', backgroundColor: '#faf5ff', borderRadius: '12px', border: '1px solid #e9d5ff' }}>
          <h4 style={{ margin: '0 0 0.5rem', color: '#6b21a8', fontSize: '1rem' }}>Recommended Scientific Articles</h4>
          <p style={{ margin: '0 0 0.75rem', fontSize: '0.875rem', color: '#334155', lineHeight: '1.6' }}>
            Explore how the human brain adapts to deliberate working memory training:
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/science/neuroplasticity" style={{ color: '#7e22ce', fontWeight: 700, fontSize: '0.875rem', textDecoration: 'underline' }}>
              Neuroplasticity: The Cellular Mechanisms of Adaptation →
            </Link>
            <Link to="/science/working-memory-explained" style={{ color: '#7e22ce', fontWeight: 700, fontSize: '0.875rem', textDecoration: 'underline' }}>
              Working Memory Explained: The Cognitive Engine →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

