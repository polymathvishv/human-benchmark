import { Link } from 'react-router-dom';
import styles from './GameInfo.module.css';

export default function AudioReactionTimeInfo() {
  return (
    <div className={styles.infoSection}>
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>What is Audio Reaction Time?</h2>
        <dl style={{ marginBottom: '1.5rem', backgroundColor: '#f8fafc', padding: '1.5rem', borderRadius: '12px' }}>
          <dt style={{ fontWeight: 700, color: '#111827', fontSize: '1.125rem' }}>Definition</dt>
          <dd style={{ color: '#4b5563', marginTop: '0.5rem', marginBottom: '1rem' }}>
            Audio (auditory) reaction time is the elapsed time between a sound stimulus being produced and your motor response completing (e.g., clicking a mouse or pressing a key). It is one of the fastest simple reaction time modalities in humans.
          </dd>
          <dt style={{ fontWeight: 700, color: '#111827', fontSize: '1.125rem' }}>Global Average</dt>
          <dd style={{ color: '#4b5563', marginTop: '0.5rem' }}>
            The global average auditory reaction time is approximately 170–200 milliseconds (ms) in laboratory settings, with a web-based median of roughly 185ms. This is consistently 30–50ms faster than visual reaction time (~284ms).
          </dd>
        </dl>
        
        <p className={styles.text}>
          Unlike the <Link to="/reaction-time" className={styles.link}>visual reaction time test</Link> which requires detecting a color change, this test uses a pure 880Hz (A5) sine tone generated directly by the Web Audio API — eliminating network and file-decoding latency entirely. The tone reaches your speakers or headphones within microseconds of the scheduled playback time.
        </p>
        <p className={styles.text}>
          Auditory simple reaction time (ART) is faster than visual SRT for a fundamental neuroanatomical reason: the auditory pathway from cochlea to primary auditory cortex (A1) involves fewer synaptic relays (~4) and shorter axonal distances than the visual pathway from retina to primary visual cortex (V1) (~6 relays), and critically bypasses the slow 20–40ms retinal phototransduction step entirely.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>The Auditory Neural Chain</h2>
        <p className={styles.text}>
          When the 880Hz tone fires, here is the chain of neural events that occurs before your finger completes the click. Each stage adds latency, but the total is significantly shorter than the visual pathway.
        </p>

        <div className={styles.box}>
          <h3 className={styles.boxTitle}>Auditory reaction chain (cochlea → click)</h3>
          <div>
            <div className={styles.chainRow}>
              <div className={styles.chainTime}>~1ms</div>
              <div className={styles.chainBox} style={{ backgroundColor: '#faf5ff', border: '1px solid #e9d5ff', color: '#581c87' }}>
                Cochlear hair cell transduction — Sound waves deflect stereocilia on inner hair cells, opening mechanically-gated ion channels
              </div>
            </div>
            <div className={styles.chainRow}>
              <div className={styles.chainTime}>~5ms</div>
              <div className={styles.chainBox} style={{ backgroundColor: '#f3e8ff', border: '1px solid #d8b4fe', color: '#6b21a8' }}>
                Auditory nerve (CN VIII) transmits to cochlear nucleus in the brainstem
              </div>
            </div>
            <div className={styles.chainRow}>
              <div className={styles.chainTime}>~15ms</div>
              <div className={styles.chainBox} style={{ backgroundColor: '#ede9fe', border: '1px solid #c4b5fd', color: '#5b21b6' }}>
                Brainstem processing — Superior olivary complex and inferior colliculus perform frequency analysis and temporal gating
              </div>
            </div>
            <div className={styles.chainRow}>
              <div className={styles.chainTime}>~30ms</div>
              <div className={styles.chainBox} style={{ backgroundColor: '#e0e7ff', border: '1px solid #a5b4fc', color: '#3730a3' }}>
                Primary auditory cortex (A1) in the temporal lobe detects the tone onset and initiates stimulus recognition
              </div>
            </div>
            <div className={styles.chainRow}>
              <div className={styles.chainTime}>~70ms</div>
              <div className={styles.chainBox} style={{ backgroundColor: '#dbeafe', border: '1px solid #93c5fd', color: '#1e3a8a' }}>
                Motor cortex (M1) receives the "go" signal via premotor and supplementary motor areas
              </div>
            </div>
            <div className={styles.chainRow}>
              <div className={styles.chainTime}>~100ms+</div>
              <div className={styles.chainBox} style={{ backgroundColor: '#7c3aed', color: 'white' }}>
                Motor command descends the corticospinal tract → finger depresses mouse button → click registers
              </div>
            </div>
          </div>
          <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '1rem', lineHeight: '1.5' }}>
            The theoretical minimum for genuine human auditory reaction (not anticipation) is approximately 80–100ms. The key advantage over vision: auditory transduction takes ~1ms (hair cell mechanotransduction) versus ~20–40ms for retinal phototransduction (rhodopsin photocycle). This single step accounts for most of the 30–50ms speed advantage of auditory over visual RT.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Auditory vs Visual Reaction Time</h2>
        <p className={styles.text}>
          The speed difference between auditory and visual reaction time is well-documented across decades of psychophysics research. The auditory pathway is simply more direct — it evolved as an early-warning system for threats behind you and in darkness, where milliseconds mattered for survival.
        </p>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Modality</th>
                <th>Average RT</th>
                <th>Neural pathway length</th>
                <th>Why faster/slower</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ backgroundColor: '#faf5ff' }}>
                <td style={{ fontWeight: 600, color: '#111827' }}>Auditory (this test)</td>
                <td style={{ fontWeight: 700, color: '#7c3aed' }}>~185ms</td>
                <td style={{ color: '#4b5563', fontSize: '0.8rem' }}>~4 synaptic relays</td>
                <td style={{ color: '#4b5563', fontSize: '0.75rem' }}>Hair cell mechanotransduction is near-instantaneous (~1ms); fewer relays to cortex</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600, color: '#111827' }}>Visual</td>
                <td style={{ fontWeight: 700, color: '#1d4ed8' }}>~284ms</td>
                <td style={{ color: '#4b5563', fontSize: '0.8rem' }}>~6 synaptic relays</td>
                <td style={{ color: '#4b5563', fontSize: '0.75rem' }}>Retinal phototransduction adds 20–40ms; signal routes through LGN before reaching V1</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600, color: '#111827' }}>Tactile (touch)</td>
                <td style={{ fontWeight: 700, color: '#059669' }}>~155ms</td>
                <td style={{ color: '#4b5563', fontSize: '0.8rem' }}>~3 synaptic relays</td>
                <td style={{ color: '#4b5563', fontSize: '0.75rem' }}>Shortest pathway — skin mechanoreceptors can trigger spinal reflexes directly</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Audio Reaction Time Score Distribution</h2>
        <p className={styles.text}>
          The distribution of audio reaction times is narrower than visual, with a tighter cluster around 160–210ms. The lower bound is set by minimum neural conduction time (~80ms), and scores above 250ms typically indicate Bluetooth audio latency, fatigue, or mobile device overhead.
        </p>

        <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.75rem' }}>Score percentile reference</h3>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Percentile</th>
                <th>Audio reaction time</th>
                <th>Classification</th>
                <th>Typical profile</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ color: '#7e22ce', fontWeight: 700 }}>Top 1%</td>
                <td style={{ fontWeight: 600 }}>&lt;135ms</td>
                <td><span className={styles.highlightBadge} style={{ backgroundColor: '#f3e8ff', color: '#7e22ce' }}>Exceptional</span></td>
                <td style={{ color: '#6b7280', fontSize: '0.75rem' }}>Elite gamers, trained musicians, audiophiles with wired monitors</td>
              </tr>
              <tr>
                <td style={{ color: '#6d28d9', fontWeight: 700 }}>Top 10%</td>
                <td style={{ fontWeight: 600 }}>135–160ms</td>
                <td><span className={styles.highlightBadge} style={{ backgroundColor: '#ede9fe', color: '#6d28d9' }}>Excellent</span></td>
                <td style={{ color: '#6b7280', fontSize: '0.75rem' }}>Competitive gamers, wired headphones/speakers, well-rested young adults</td>
              </tr>
              <tr>
                <td style={{ color: '#4338ca', fontWeight: 700 }}>Top 25%</td>
                <td style={{ fontWeight: 600 }}>160–180ms</td>
                <td><span className={styles.highlightBadge} style={{ backgroundColor: '#e0e7ff', color: '#4338ca' }}>Above average</span></td>
                <td style={{ color: '#6b7280', fontSize: '0.75rem' }}>Active adults, wired audio, good reaction readiness</td>
              </tr>
              <tr style={{ backgroundColor: '#faf5ff' }}>
                <td style={{ color: '#374151', fontWeight: 700 }}>50th (median)</td>
                <td style={{ fontWeight: 700 }}>180–210ms</td>
                <td><span className={styles.highlightBadge} style={{ backgroundColor: '#e5e7eb', color: '#374151' }}>Average</span></td>
                <td style={{ color: '#6b7280', fontSize: '0.75rem' }}>Normal healthy adult range</td>
              </tr>
              <tr>
                <td style={{ color: '#ea580c', fontWeight: 700 }}>Bottom 25%</td>
                <td style={{ fontWeight: 600 }}>210–250ms</td>
                <td><span className={styles.highlightBadge} style={{ backgroundColor: '#ffedd5', color: '#ea580c' }}>Below average</span></td>
                <td style={{ color: '#6b7280', fontSize: '0.75rem' }}>Bluetooth audio, fatigue, mobile device, or older age</td>
              </tr>
              <tr>
                <td style={{ color: '#dc2626', fontWeight: 700 }}>Bottom 10%</td>
                <td style={{ fontWeight: 600 }}>&gt;250ms</td>
                <td><span className={styles.highlightBadge} style={{ backgroundColor: '#fee2e2', color: '#dc2626' }}>Slow</span></td>
                <td style={{ color: '#6b7280', fontSize: '0.75rem' }}>High Bluetooth latency or hardware bottleneck very likely</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: '0.75rem', color: '#9ca3af', lineHeight: '1.5' }}>
          Benchmarks based on published psychoacoustic norms and large web-based datasets. Scores below 80ms are flagged as anticipation clicks and excluded.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Hardware Note: Bluetooth vs Wired Audio</h2>
        <p className={styles.text}>
          Your audio hardware has a significant impact on your measured score. Bluetooth headphones introduce a variable 80–300ms encoding/transmission delay depending on the codec used. This latency is <strong>added to your true reaction time</strong>, making your score appear slower than it actually is.
        </p>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Audio output</th>
                <th>Typical added latency</th>
                <th>Impact on score</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ backgroundColor: '#f0fdf4' }}>
                <td style={{ fontWeight: 600, color: '#111827' }}>Wired IEMs / headphones</td>
                <td style={{ fontWeight: 700, color: '#059669' }}>~0–5ms</td>
                <td style={{ color: '#4b5563', fontSize: '0.8rem' }}>Negligible — your score reflects true neural RT</td>
              </tr>
              <tr style={{ backgroundColor: '#f0fdf4' }}>
                <td style={{ fontWeight: 600, color: '#111827' }}>Wired desktop speakers</td>
                <td style={{ fontWeight: 700, color: '#059669' }}>~5–15ms</td>
                <td style={{ color: '#4b5563', fontSize: '0.8rem' }}>Minimal — DAC processing adds slight overhead</td>
              </tr>
              <tr style={{ backgroundColor: '#fefce8' }}>
                <td style={{ fontWeight: 600, color: '#111827' }}>Bluetooth (aptX / aptX LL)</td>
                <td style={{ fontWeight: 700, color: '#a16207' }}>~40–80ms</td>
                <td style={{ color: '#4b5563', fontSize: '0.8rem' }}>Noticeable — score inflated by ~50ms</td>
              </tr>
              <tr style={{ backgroundColor: '#fef2f2' }}>
                <td style={{ fontWeight: 600, color: '#111827' }}>Bluetooth (AAC / SBC)</td>
                <td style={{ fontWeight: 700, color: '#dc2626' }}>~100–200ms</td>
                <td style={{ color: '#4b5563', fontSize: '0.8rem' }}>Severe — effectively doubles your measured score</td>
              </tr>
              <tr style={{ backgroundColor: '#fef2f2' }}>
                <td style={{ fontWeight: 600, color: '#111827' }}>Cheap Bluetooth earbuds</td>
                <td style={{ fontWeight: 700, color: '#dc2626' }}>~150–300ms</td>
                <td style={{ color: '#4b5563', fontSize: '0.8rem' }}>Unreliable — scores are not meaningful at this latency</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={styles.grid2}>
          <div className={styles.factCard} style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0' }}>
            <div className={styles.factTitle} style={{ color: '#14532d' }}>✓ Best practice</div>
            <div className={styles.factText} style={{ color: '#166534' }}>
              Use wired headphones or IEMs (in-ear monitors) for accurate results. Any 3.5mm or USB-C wired audio delivers negligible latency. Laptop speakers are also fine.
            </div>
          </div>
          <div className={styles.factCard} style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca' }}>
            <div className={styles.factTitle} style={{ color: '#7f1d1d' }}>✗ Avoid for testing</div>
            <div className={styles.factText} style={{ color: '#991b1b' }}>
              Bluetooth headphones using AAC or SBC codecs add 100–200ms of invisible latency. Your brain may react in 150ms, but the tone arrived 150ms late, making your score appear 300ms.
            </div>
          </div>
        </div>
      </section>

      {/* ── LLM Optimized FAQ Section ── */}
      <section className={styles.section} itemScope itemType="https://schema.org/FAQPage">
        <h2 className={styles.sectionTitle}>Frequently Asked Questions (FAQ)</h2>
        
        <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question" style={{ marginBottom: '1.5rem' }}>
          <h3 itemProp="name" style={{ fontSize: '1.125rem', fontWeight: 600, color: '#111827', marginBottom: '0.5rem' }}>
            Why is audio reaction time faster than visual reaction time?
          </h3>
          <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <p itemProp="text" className={styles.text}>
              Audio reaction time is faster because the auditory neural pathway has fewer synaptic relays (~4 vs ~6 for vision) and, crucially, bypasses the slow retinal phototransduction step that takes 20–40ms. Cochlear hair cell mechanotransduction completes in approximately 1ms, giving auditory signals a ~30–50ms head start reaching the motor cortex.
            </p>
          </div>
        </div>

        <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question" style={{ marginBottom: '1.5rem' }}>
          <h3 itemProp="name" style={{ fontSize: '1.125rem', fontWeight: 600, color: '#111827', marginBottom: '0.5rem' }}>
            What is a good audio reaction time score?
          </h3>
          <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <p itemProp="text" className={styles.text}>
              A good audio reaction time is anything under 180ms. Scores between 135–160ms are excellent and place you in the top 10% globally. The average (median) audio reaction time is approximately 185ms. Anything under 135ms is exceptional and indicates elite-level auditory processing speed.
            </p>
          </div>
        </div>

        <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question" style={{ marginBottom: '1.5rem' }}>
          <h3 itemProp="name" style={{ fontSize: '1.125rem', fontWeight: 600, color: '#111827', marginBottom: '0.5rem' }}>
            Do Bluetooth headphones affect my audio reaction time score?
          </h3>
          <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <p itemProp="text" className={styles.text}>
              Yes, significantly. Bluetooth headphones using AAC or SBC codecs add 100–200ms of encoding and transmission latency before the tone reaches your ears. This delay is invisible to you but inflates your measured score. For accurate results, always use wired headphones, IEMs, or your device's built-in speakers.
            </p>
          </div>
        </div>

        <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question" style={{ marginBottom: '1.5rem' }}>
          <h3 itemProp="name" style={{ fontSize: '1.125rem', fontWeight: 600, color: '#111827', marginBottom: '0.5rem' }}>
            Why does this test use a beep instead of playing an audio file?
          </h3>
          <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <p itemProp="text" className={styles.text}>
              This test generates the 880Hz tone directly using the Web Audio API's OscillatorNode, which produces sound within microseconds of scheduling. Traditional HTML5 audio files introduce variable network fetch latency (10–500ms+) and audio decode latency (5–50ms), which would corrupt the reaction time measurement. The Web Audio API guarantees sample-accurate timing.
            </p>
          </div>
        </div>

        <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question" style={{ marginBottom: '1.5rem' }}>
          <h3 itemProp="name" style={{ fontSize: '1.125rem', fontWeight: 600, color: '#111827', marginBottom: '0.5rem' }}>
            Can I train my auditory reaction time?
          </h3>
          <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <p itemProp="text" className={styles.text}>
              Yes. While your neural conduction velocity is genetically fixed, you can train your attentional readiness — the cognitive component that determines how quickly you initiate the motor response after detecting the stimulus. Regular practice, adequate sleep (7–9 hours), hydration, and moderate caffeine all improve auditory reaction time by 10–20%.
            </p>
          </div>
        </div>

        <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question" style={{ marginBottom: '1.5rem' }}>
          <h3 itemProp="name" style={{ fontSize: '1.125rem', fontWeight: 600, color: '#111827', marginBottom: '0.5rem' }}>
            Should I close my eyes during the audio reaction time test?
          </h3>
          <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <p itemProp="text" className={styles.text}>
              Closing your eyes can help isolate the auditory channel and may improve your score by 5–10ms by reducing visual distractions. However, this test's dark background is specifically designed to eliminate visual cues — the screen does not change color until after you click, so the test is purely auditory whether your eyes are open or closed.
            </p>
          </div>
        </div>
      </section>

      {/* ── Author Attribution (E-E-A-T) ── */}
      <div className={styles.authorAttribution}>
        <span>Researched & written by <a href="/about" className={styles.authorLink}>Vishv Kamani</a>, Founder of Human Benchmark.</span>
      </div>
    </div>
  );
}
