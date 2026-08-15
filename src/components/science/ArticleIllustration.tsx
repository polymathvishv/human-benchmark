import { Brain, Activity, Layers, Zap, Eye, Cpu } from 'lucide-react';
import styles from './ArticleIllustration.module.css';

interface Props {
  slug: string;
  title: string;
  category: string;
}

export default function ArticleIllustration({ slug, title, category }: Props) {
  const renderDiagram = () => {
    switch (slug) {
      // ─── 1. REACTION TIME PILLAR ──────────────────────────────────────────
      case 'what-is-reaction-time':
        return (
          <svg viewBox="0 0 740 220" className={styles.diagramSvg} fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="10" width="720" height="200" rx="12" fill="#0f172a" />
            <path d="M 60 110 L 680 110" stroke="#334155" strokeWidth="4" strokeDasharray="6 6" />
            {/* Step 1 */}
            <circle cx="80" cy="110" r="28" fill="#1e293b" stroke="#3b82f6" strokeWidth="3" />
            <text x="80" y="105" fill="#60a5fa" fontSize="11" fontWeight="bold" textAnchor="middle">STEP 1</text>
            <text x="80" y="120" fill="#94a3b8" fontSize="9" textAnchor="middle">~30ms</text>
            <text x="80" y="160" fill="#f8fafc" fontSize="11" fontWeight="600" textAnchor="middle">Retina</text>
            <text x="80" y="176" fill="#64748b" fontSize="9.5" textAnchor="middle">Photons → Cones</text>
            {/* Step 2 */}
            <circle cx="200" cy="110" r="28" fill="#1e293b" stroke="#6366f1" strokeWidth="3" />
            <text x="200" y="105" fill="#818cf8" fontSize="11" fontWeight="bold" textAnchor="middle">STEP 2</text>
            <text x="200" y="120" fill="#94a3b8" fontSize="9" textAnchor="middle">~35ms</text>
            <text x="200" y="160" fill="#f8fafc" fontSize="11" fontWeight="600" textAnchor="middle">Thalamus</text>
            <text x="200" y="176" fill="#64748b" fontSize="9.5" textAnchor="middle">Optic Tract / LGN</text>
            {/* Step 3 */}
            <circle cx="320" cy="110" r="28" fill="#1e293b" stroke="#8b5cf6" strokeWidth="3" />
            <text x="320" y="105" fill="#a78bfa" fontSize="11" fontWeight="bold" textAnchor="middle">STEP 3</text>
            <text x="320" y="120" fill="#94a3b8" fontSize="9" textAnchor="middle">~50ms</text>
            <text x="320" y="160" fill="#f8fafc" fontSize="11" fontWeight="600" textAnchor="middle">V1 Cortex</text>
            <text x="320" y="176" fill="#64748b" fontSize="9.5" textAnchor="middle">Visual Feature Parse</text>
            {/* Step 4 */}
            <circle cx="440" cy="110" r="28" fill="#1e293b" stroke="#ec4899" strokeWidth="3" />
            <text x="440" y="105" fill="#f472b6" fontSize="11" fontWeight="bold" textAnchor="middle">STEP 4</text>
            <text x="440" y="120" fill="#94a3b8" fontSize="9" textAnchor="middle">~65ms</text>
            <text x="440" y="160" fill="#f8fafc" fontSize="11" fontWeight="600" textAnchor="middle">Motor Area</text>
            <text x="440" y="176" fill="#64748b" fontSize="9.5" textAnchor="middle">Decision & Firing</text>
            {/* Step 5 */}
            <circle cx="560" cy="110" r="28" fill="#1e293b" stroke="#f59e0b" strokeWidth="3" />
            <text x="560" y="105" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">STEP 5</text>
            <text x="560" y="120" fill="#94a3b8" fontSize="9" textAnchor="middle">~30ms</text>
            <text x="560" y="160" fill="#f8fafc" fontSize="11" fontWeight="600" textAnchor="middle">Spinal Cord</text>
            <text x="560" y="176" fill="#64748b" fontSize="9.5" textAnchor="middle">Corticospinal Path</text>
            {/* Step 6 */}
            <circle cx="660" cy="110" r="28" fill="#1e293b" stroke="#10b981" strokeWidth="3" />
            <text x="660" y="105" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">STEP 6</text>
            <text x="660" y="120" fill="#94a3b8" fontSize="9" textAnchor="middle">~20ms</text>
            <text x="660" y="160" fill="#f8fafc" fontSize="11" fontWeight="600" textAnchor="middle">Click Output</text>
            <text x="660" y="176" fill="#64748b" fontSize="9.5" textAnchor="middle">Muscle Switch Close</text>
            {/* Total Badge */}
            <rect x="250" y="24" width="240" height="30" rx="15" fill="rgba(37,99,235,0.2)" stroke="#3b82f6" />
            <text x="370" y="44" fill="#60a5fa" fontSize="12" fontWeight="bold" textAnchor="middle">Total Latency: ~230ms (Biological Floor: ~150ms)</text>
          </svg>
        );

      case 'choice-vs-simple-reaction-time':
        return (
          <svg viewBox="0 0 740 220" className={styles.diagramSvg} fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="10" width="720" height="200" rx="12" fill="#0f172a" />
            {/* Simple RT Bar */}
            <rect x="40" y="40" width="220" height="36" rx="8" fill="#3b82f6" />
            <text x="55" y="63" fill="#ffffff" fontSize="12" fontWeight="bold">Simple RT: ~230ms</text>
            <text x="275" y="63" fill="#94a3b8" fontSize="11">Stimulus Detection → Motor Response</text>
            {/* Recognition RT Bar */}
            <rect x="40" y="90" width="310" height="36" rx="8" fill="#8b5cf6" />
            <text x="55" y="113" fill="#ffffff" fontSize="12" fontWeight="bold">Recognition RT: ~310ms (+80ms)</text>
            <text x="365" y="113" fill="#94a3b8" fontSize="11">+ Stimulus Discrimination</text>
            {/* Choice RT Bar */}
            <rect x="40" y="140" width="430" height="36" rx="8" fill="#ec4899" />
            <text x="55" y="163" fill="#ffffff" fontSize="12" fontWeight="bold">Choice RT (4 Options): ~440ms (+210ms)</text>
            <text x="485" y="163" fill="#94a3b8" fontSize="11">+ Response Selection (Hick's Law)</text>
          </svg>
        );

      case 'how-sleep-affects-reaction-time':
        return (
          <svg viewBox="0 0 740 220" className={styles.diagramSvg} fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="10" width="720" height="200" rx="12" fill="#0f172a" />
            {/* Axes */}
            <line x1="60" y1="180" x2="680" y2="180" stroke="#334155" strokeWidth="2" />
            <line x1="60" y1="30" x2="60" y2="180" stroke="#334155" strokeWidth="2" />
            <text x="50" y="40" fill="#94a3b8" fontSize="10" textAnchor="end">350ms</text>
            <text x="50" y="105" fill="#94a3b8" fontSize="10" textAnchor="end">280ms</text>
            <text x="50" y="170" fill="#94a3b8" fontSize="10" textAnchor="end">220ms</text>
            {/* Curve */}
            <path d="M 80 160 Q 240 155 380 120 T 660 45" fill="none" stroke="#ef4444" strokeWidth="4" />
            {/* Markers */}
            <circle cx="80" cy="160" r="6" fill="#22c55e" />
            <text x="80" y="140" fill="#86efac" fontSize="11" fontWeight="bold" textAnchor="middle">8h Sleep (225ms)</text>
            <circle cx="380" cy="120" r="6" fill="#f59e0b" />
            <text x="380" y="100" fill="#fde047" fontSize="11" fontWeight="bold" textAnchor="middle">6h Sleep (275ms)</text>
            <circle cx="660" cy="45" r="6" fill="#ef4444" />
            <text x="660" y="30" fill="#fca5a5" fontSize="11" fontWeight="bold" textAnchor="middle">24h Awake (340ms - Equivalent to 0.08% BAC)</text>
            <text x="370" y="205" fill="#64748b" fontSize="11" textAnchor="middle">Hours of Sleep Deprivation vs Progressive Neural Slowing</text>
          </svg>
        );

      case 'does-gaming-improve-reaction-time':
        return (
          <svg viewBox="0 0 740 220" className={styles.diagramSvg} fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="10" width="720" height="200" rx="12" fill="#0f172a" />
            <rect x="40" y="40" width="310" height="130" rx="10" fill="#1e293b" stroke="#334155" />
            <text x="195" y="68" fill="#94a3b8" fontSize="13" fontWeight="bold" textAnchor="middle">Non-Gamers</text>
            <text x="195" y="105" fill="#f8fafc" fontSize="26" fontWeight="900" textAnchor="middle">245ms</text>
            <text x="195" y="130" fill="#64748b" fontSize="10.5" textAnchor="middle">Standard cortical decision loop</text>
            <text x="195" y="150" fill="#64748b" fontSize="10.5" textAnchor="middle">Unoptimized visual saccades</text>

            <rect x="390" y="40" width="310" height="130" rx="10" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
            <text x="545" y="68" fill="#60a5fa" fontSize="13" fontWeight="bold" textAnchor="middle">Esports Athletes & FPS Gamers</text>
            <text x="545" y="105" fill="#38bdf8" fontSize="26" fontWeight="900" textAnchor="middle">175ms</text>
            <text x="545" y="130" fill="#86efac" fontSize="10.5" textAnchor="middle">Enhanced feedforward motor planning</text>
            <text x="545" y="150" fill="#86efac" fontSize="10.5" textAnchor="middle">Superior peripheral attention capture</text>
          </svg>
        );

      case 'does-240hz-improve-scores':
        return (
          <svg viewBox="0 0 740 220" className={styles.diagramSvg} fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="10" width="720" height="200" rx="12" fill="#0f172a" />
            {/* 60Hz */}
            <rect x="40" y="40" width="140" height="120" rx="8" fill="#1e293b" stroke="#64748b" />
            <text x="110" y="65" fill="#94a3b8" fontSize="12" fontWeight="bold" textAnchor="middle">60 Hz Display</text>
            <text x="110" y="95" fill="#f8fafc" fontSize="18" fontWeight="800" textAnchor="middle">16.6ms</text>
            <text x="110" y="115" fill="#64748b" fontSize="10" textAnchor="middle">Frame interval</text>
            <text x="110" y="140" fill="#ef4444" fontSize="10" fontWeight="bold" textAnchor="middle">+14ms Display Lag</text>
            {/* 144Hz */}
            <rect x="210" y="40" width="140" height="120" rx="8" fill="#1e293b" stroke="#3b82f6" />
            <text x="280" y="65" fill="#60a5fa" fontSize="12" fontWeight="bold" textAnchor="middle">144 Hz Display</text>
            <text x="280" y="95" fill="#f8fafc" fontSize="18" fontWeight="800" textAnchor="middle">6.9ms</text>
            <text x="280" y="115" fill="#64748b" fontSize="10" textAnchor="middle">Frame interval</text>
            <text x="280" y="140" fill="#3b82f6" fontSize="10" fontWeight="bold" textAnchor="middle">-10ms Latency</text>
            {/* 240Hz */}
            <rect x="380" y="40" width="140" height="120" rx="8" fill="#1e293b" stroke="#10b981" />
            <text x="450" y="65" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">240 Hz Display</text>
            <text x="450" y="95" fill="#f8fafc" fontSize="18" fontWeight="800" textAnchor="middle">4.1ms</text>
            <text x="450" y="115" fill="#64748b" fontSize="10" textAnchor="middle">Frame interval</text>
            <text x="450" y="140" fill="#10b981" fontSize="10" fontWeight="bold" textAnchor="middle">-13ms Latency</text>
            {/* 360Hz */}
            <rect x="550" y="40" width="150" height="120" rx="8" fill="#1e293b" stroke="#8b5cf6" />
            <text x="625" y="65" fill="#a78bfa" fontSize="12" fontWeight="bold" textAnchor="middle">360 Hz OLED</text>
            <text x="625" y="95" fill="#f8fafc" fontSize="18" fontWeight="800" textAnchor="middle">2.7ms</text>
            <text x="625" y="115" fill="#64748b" fontSize="10" textAnchor="middle">Frame interval</text>
            <text x="625" y="140" fill="#8b5cf6" fontSize="10" fontWeight="bold" textAnchor="middle">Near-Zero Motion Blur</text>
            <text x="370" y="195" fill="#64748b" fontSize="10.5" textAnchor="middle">Hardware Frame Time vs Visual Reaction Advantage</text>
          </svg>
        );

      case 'why-reaction-time-changes-with-age':
        return (
          <svg viewBox="0 0 740 220" className={styles.diagramSvg} fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="10" width="720" height="200" rx="12" fill="#0f172a" />
            <path d="M 60 170 C 140 160, 180 50, 240 50 C 320 50, 480 120, 680 180" stroke="#3b82f6" strokeWidth="4" fill="none" />
            <circle cx="240" cy="50" r="7" fill="#10b981" />
            <text x="240" y="30" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">Peak Reflex Speed (Age 24: ~218ms)</text>
            <text x="90" y="190" fill="#94a3b8" fontSize="11" textAnchor="middle">Age 15 (240ms)</text>
            <text x="400" y="130" fill="#94a3b8" fontSize="11" textAnchor="middle">Age 45 (268ms)</text>
            <text x="650" y="160" fill="#94a3b8" fontSize="11" textAnchor="middle">Age 70+ (310ms)</text>
            <text x="370" y="200" fill="#64748b" fontSize="10.5" textAnchor="middle">Trajectory of Axonal Myelination and Sensorimotor Speed Across the Lifespan</text>
          </svg>
        );

      // ─── 2. MEMORY SYSTEMS PILLAR ──────────────────────────────────────────
      case 'working-memory-explained':
        return (
          <svg viewBox="0 0 740 220" className={styles.diagramSvg} fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="10" width="720" height="200" rx="12" fill="#0f172a" />
            {/* Central Executive */}
            <rect x="250" y="25" width="240" height="48" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
            <text x="370" y="48" fill="#60a5fa" fontSize="12" fontWeight="bold" textAnchor="middle">CENTRAL EXECUTIVE</text>
            <text x="370" y="63" fill="#94a3b8" fontSize="9.5" textAnchor="middle">Dorsolateral Prefrontal Cortex (DLPFC)</text>
            {/* Arrows */}
            <path d="M 310 73 L 150 115" stroke="#475569" strokeWidth="2" markerEnd="url(#arrow)" />
            <path d="M 370 73 L 370 115" stroke="#475569" strokeWidth="2" />
            <path d="M 430 73 L 590 115" stroke="#475569" strokeWidth="2" />
            {/* Subsystems */}
            <rect x="50" y="115" width="200" height="70" rx="8" fill="#1e293b" stroke="#8b5cf6" />
            <text x="150" y="140" fill="#a78bfa" fontSize="11" fontWeight="bold" textAnchor="middle">Phonological Loop</text>
            <text x="150" y="158" fill="#94a3b8" fontSize="9" textAnchor="middle">Acoustic & Verbal rehearsal</text>
            <text x="150" y="172" fill="#64748b" fontSize="8.5" textAnchor="middle">Broca's area & Wernicke's</text>

            <rect x="270" y="115" width="200" height="70" rx="8" fill="#1e293b" stroke="#ec4899" />
            <text x="370" y="140" fill="#f472b6" fontSize="11" fontWeight="bold" textAnchor="middle">Episodic Buffer</text>
            <text x="370" y="158" fill="#94a3b8" fontSize="9" textAnchor="middle">Multimodal chronological binding</text>
            <text x="370" y="172" fill="#64748b" fontSize="8.5" textAnchor="middle">Hippocampal interface</text>

            <rect x="490" y="115" width="200" height="70" rx="8" fill="#1e293b" stroke="#10b981" />
            <text x="590" y="140" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">Visuospatial Sketchpad</text>
            <text x="590" y="158" fill="#94a3b8" fontSize="9" textAnchor="middle">Visual sets, grids & spatial paths</text>
            <text x="590" y="172" fill="#64748b" fontSize="8.5" textAnchor="middle">Occipital-Parietal cortex</text>
          </svg>
        );

      case 'why-humans-forget':
        return (
          <svg viewBox="0 0 740 220" className={styles.diagramSvg} fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="10" width="720" height="200" rx="12" fill="#0f172a" />
            <line x1="60" y1="180" x2="680" y2="180" stroke="#334155" strokeWidth="2" />
            <line x1="60" y1="30" x2="60" y2="180" stroke="#334155" strokeWidth="2" />
            <text x="50" y="40" fill="#94a3b8" fontSize="10" textAnchor="end">100%</text>
            <text x="50" y="105" fill="#94a3b8" fontSize="10" textAnchor="end">50%</text>
            <text x="50" y="170" fill="#94a3b8" fontSize="10" textAnchor="end">0%</text>
            {/* Curve */}
            <path d="M 60 40 Q 110 120 180 140 T 660 165" fill="none" stroke="#ef4444" strokeWidth="4" />
            {/* Data points */}
            <circle cx="60" cy="40" r="5" fill="#22c55e" />
            <text x="90" y="35" fill="#86efac" fontSize="10" fontWeight="bold">Immediate: 100%</text>
            <circle cx="110" cy="120" r="5" fill="#f59e0b" />
            <text x="140" y="115" fill="#fde047" fontSize="10" fontWeight="bold">20 Mins: ~58%</text>
            <circle cx="180" cy="140" r="5" fill="#ec4899" />
            <text x="210" y="135" fill="#f472b6" fontSize="10" fontWeight="bold">1 Day: ~33%</text>
            <circle cx="660" cy="165" r="5" fill="#ef4444" />
            <text x="640" y="155" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="end">31 Days: ~21%</text>
            <text x="370" y="205" fill="#64748b" fontSize="11" textAnchor="middle">Hermann Ebbinghaus Exponential Forgetting Curve (R = e^(-t/S))</text>
          </svg>
        );

      case 'visual-vs-spatial-memory':
        return (
          <svg viewBox="0 0 740 220" className={styles.diagramSvg} fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="10" width="720" height="200" rx="12" fill="#0f172a" />
            {/* Occipital origin */}
            <rect x="40" y="80" width="130" height="60" rx="8" fill="#1e293b" stroke="#3b82f6" />
            <text x="105" y="105" fill="#60a5fa" fontSize="11" fontWeight="bold" textAnchor="middle">Primary V1</text>
            <text x="105" y="122" fill="#94a3b8" fontSize="9" textAnchor="middle">Occipital Lobe</text>
            {/* Dorsal Stream */}
            <path d="M 170 95 C 260 60, 360 40, 480 40" stroke="#10b981" strokeWidth="3" fill="none" />
            <rect x="480" y="20" width="220" height="65" rx="8" fill="#1e293b" stroke="#10b981" />
            <text x="590" y="42" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">Dorsal "WHERE / HOW" Stream</text>
            <text x="590" y="60" fill="#94a3b8" fontSize="9" textAnchor="middle">Parietal Lobe (Spatial Coordinates & Aim)</text>
            <text x="590" y="74" fill="#64748b" fontSize="8.5" textAnchor="middle">Chimp Test & Sequence Memory</text>
            {/* Ventral Stream */}
            <path d="M 170 125 C 260 160, 360 175, 480 175" stroke="#ec4899" strokeWidth="3" fill="none" />
            <rect x="480" y="135" width="220" height="65" rx="8" fill="#1e293b" stroke="#ec4899" />
            <text x="590" y="157" fill="#f472b6" fontSize="11" fontWeight="bold" textAnchor="middle">Ventral "WHAT" Stream</text>
            <text x="590" y="175" fill="#94a3b8" fontSize="9" textAnchor="middle">Inferior Temporal Lobe (Shapes & Colors)</text>
            <text x="590" y="189" fill="#64748b" fontSize="8.5" textAnchor="middle">Visual Set Memory & Verbal Recall</text>
          </svg>
        );

      case 'chunking-explained':
        return (
          <svg viewBox="0 0 740 220" className={styles.diagramSvg} fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="10" width="720" height="200" rx="12" fill="#0f172a" />
            {/* Raw sequence */}
            <text x="40" y="50" fill="#ef4444" fontSize="12" fontWeight="bold">Raw Unchunked (10 Individual Overloaded Slots - Exceeds Miller's Limit):</text>
            <g transform="translate(40, 65)">
              {['1', '9', '4', '5', '2', '0', '2', '6', '8', '8'].map((char, i) => (
                <g key={i} transform={`translate(${i * 66}, 0)`}>
                  <rect width="56" height="38" rx="6" fill="#1e293b" stroke="#475569" />
                  <text x="28" y="24" fill="#f8fafc" fontSize="14" fontWeight="bold" textAnchor="middle">{char}</text>
                </g>
              ))}
            </g>
            {/* Chunked sequence */}
            <text x="40" y="140" fill="#10b981" fontSize="12" fontWeight="bold">Chunked Structure (3 Meaningful Schemas - 3 Slots in Working Memory):</text>
            <g transform="translate(40, 155)">
              <rect x="0" width="180" height="42" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
              <text x="90" y="27" fill="#34d399" fontSize="14" fontWeight="bold" textAnchor="middle">1945 (End WWII)</text>
              <rect x="220" width="180" height="42" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
              <text x="310" y="27" fill="#60a5fa" fontSize="14" fontWeight="bold" textAnchor="middle">2026 (Current Year)</text>
              <rect x="440" width="180" height="42" rx="8" fill="#1e293b" stroke="#8b5cf6" strokeWidth="2" />
              <text x="530" y="27" fill="#a78bfa" fontSize="14" fontWeight="bold" textAnchor="middle">88 (Lucky Number)</text>
            </g>
          </svg>
        );

      case 'chimp-memory-research':
        return (
          <svg viewBox="0 0 740 220" className={styles.diagramSvg} fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="10" width="720" height="200" rx="12" fill="#0f172a" />
            <rect x="40" y="35" width="310" height="145" rx="10" fill="#1e293b" stroke="#ec4899" strokeWidth="2" />
            <text x="195" y="65" fill="#f472b6" fontSize="13" fontWeight="bold" textAnchor="middle">Young Chimpanzee (Ayumu)</text>
            <text x="195" y="100" fill="#f8fafc" fontSize="24" fontWeight="900" textAnchor="middle">65ms Flash Exposure</text>
            <text x="195" y="125" fill="#86efac" fontSize="12" fontWeight="bold" textAnchor="middle">80%+ Accuracy (9 Numerals)</text>
            <text x="195" y="150" fill="#94a3b8" fontSize="10" textAnchor="middle">Eidetic spatial working memory preserved</text>

            <rect x="390" y="35" width="310" height="145" rx="10" fill="#1e293b" stroke="#64748b" />
            <text x="545" y="65" fill="#94a3b8" fontSize="13" fontWeight="bold" textAnchor="middle">Adult Human Benchmark</text>
            <text x="545" y="100" fill="#f8fafc" fontSize="24" fontWeight="900" textAnchor="middle">65ms Flash Exposure</text>
            <text x="545" y="125" fill="#fca5a5" fontSize="12" fontWeight="bold" textAnchor="middle">&lt;35% Accuracy (Fails past 5)</text>
            <text x="545" y="150" fill="#94a3b8" fontSize="10" textAnchor="middle">Evolutionary trade-off: Language over Eidetic span</text>
          </svg>
        );

      case 'how-stress-affects-memory':
        return (
          <svg viewBox="0 0 740 220" className={styles.diagramSvg} fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="10" width="720" height="200" rx="12" fill="#0f172a" />
            <rect x="40" y="45" width="180" height="120" rx="8" fill="#1e293b" stroke="#ef4444" strokeWidth="2" />
            <text x="130" y="75" fill="#fca5a5" fontSize="12" fontWeight="bold" textAnchor="middle">Amygdala Activation</text>
            <text x="130" y="105" fill="#f8fafc" fontSize="10" textAnchor="middle">Threat perception triggers</text>
            <text x="130" y="125" fill="#ef4444" fontSize="11" fontWeight="bold" textAnchor="middle">HPA Axis → Cortisol</text>
            <text x="130" y="145" fill="#64748b" fontSize="9" textAnchor="middle">Sympathetic surge</text>

            <path d="M 230 105 L 290 105" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrow)" />

            <rect x="300" y="45" width="180" height="120" rx="8" fill="#1e293b" stroke="#f59e0b" />
            <text x="390" y="75" fill="#fde047" fontSize="12" fontWeight="bold" textAnchor="middle">Glucocorticoid Flood</text>
            <text x="390" y="105" fill="#f8fafc" fontSize="10" textAnchor="middle">Saturates Mineralocorticoid</text>
            <text x="390" y="125" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">High GR Receptor Bind</text>
            <text x="390" y="145" fill="#64748b" fontSize="9" textAnchor="middle">Synaptic overload</text>

            <path d="M 490 105 L 550 105" stroke="#ef4444" strokeWidth="3" />

            <rect x="560" y="45" width="140" height="120" rx="8" fill="#1e293b" stroke="#ef4444" />
            <text x="630" y="75" fill="#fca5a5" fontSize="12" fontWeight="bold" textAnchor="middle">Hippocampus</text>
            <text x="630" y="105" fill="#ef4444" fontSize="14" fontWeight="900" textAnchor="middle">BLOCKED</text>
            <text x="630" y="130" fill="#94a3b8" fontSize="9" textAnchor="middle">LTP Inhibited</text>
            <text x="630" y="148" fill="#64748b" fontSize="8.5" textAnchor="middle">Working Memory Drop</text>
          </svg>
        );

      // ─── 3. ATTENTION & FOCUS PILLAR ───────────────────────────────────────
      case 'the-stroop-effect':
        return (
          <svg viewBox="0 0 740 220" className={styles.diagramSvg} fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="10" width="720" height="200" rx="12" fill="#0f172a" />
            {/* Congruent */}
            <rect x="40" y="40" width="310" height="135" rx="10" fill="#1e293b" stroke="#10b981" />
            <text x="195" y="65" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">CONGRUENT TRIAL (~450ms)</text>
            <text x="195" y="110" fill="#22c55e" fontSize="28" fontWeight="900" textAnchor="middle">GREEN</text>
            <text x="195" y="140" fill="#94a3b8" fontSize="10.5" textAnchor="middle">Font Color = Word Meaning</text>
            <text x="195" y="158" fill="#86efac" fontSize="10" textAnchor="middle">Zero Anterior Cingulate Conflict</text>
            {/* Incongruent */}
            <rect x="390" y="40" width="310" height="135" rx="10" fill="#1e293b" stroke="#ef4444" strokeWidth="2" />
            <text x="545" y="65" fill="#fca5a5" fontSize="12" fontWeight="bold" textAnchor="middle">INCONGRUENT TRIAL (~650ms, +200ms)</text>
            <text x="545" y="110" fill="#ef4444" fontSize="28" fontWeight="900" textAnchor="middle">BLUE</text>
            <text x="545" y="140" fill="#fca5a5" fontSize="10.5" textAnchor="middle">Font is RED, Word reads "BLUE"</text>
            <text x="545" y="158" fill="#ef4444" fontSize="10" fontWeight="bold" textAnchor="middle">Anterior Cingulate Cortex Conflict Delay</text>
          </svg>
        );

      case 'hicks-law':
        return (
          <svg viewBox="0 0 740 220" className={styles.diagramSvg} fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="10" width="720" height="200" rx="12" fill="#0f172a" />
            <line x1="60" y1="180" x2="680" y2="180" stroke="#334155" strokeWidth="2" />
            <line x1="60" y1="30" x2="60" y2="180" stroke="#334155" strokeWidth="2" />
            <text x="50" y="40" fill="#94a3b8" fontSize="10" textAnchor="end">700ms</text>
            <text x="50" y="110" fill="#94a3b8" fontSize="10" textAnchor="end">450ms</text>
            <text x="50" y="170" fill="#94a3b8" fontSize="10" textAnchor="end">200ms</text>
            <path d="M 60 170 Q 150 100, 300 70 T 680 40" fill="none" stroke="#3b82f6" strokeWidth="4" />
            <circle cx="60" cy="170" r="5" fill="#10b981" />
            <text x="85" y="165" fill="#34d399" fontSize="10" fontWeight="bold">1 Option: 220ms</text>
            <circle cx="160" cy="105" r="5" fill="#3b82f6" />
            <text x="180" y="100" fill="#60a5fa" fontSize="10" fontWeight="bold">2 Options: 330ms (+110ms)</text>
            <circle cx="300" cy="70" r="5" fill="#8b5cf6" />
            <text x="320" y="65" fill="#a78bfa" fontSize="10" fontWeight="bold">4 Options: 440ms (+110ms)</text>
            <circle cx="500" cy="50" r="5" fill="#ec4899" />
            <text x="520" y="45" fill="#f472b6" fontSize="10" fontWeight="bold">8 Options: 550ms (+110ms)</text>
            <text x="370" y="205" fill="#64748b" fontSize="11" textAnchor="middle">Logarithmic Scaling Law: RT = a + b * log2(n + 1)</text>
          </svg>
        );

      case 'fitts-law':
        return (
          <svg viewBox="0 0 740 220" className={styles.diagramSvg} fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="10" width="720" height="200" rx="12" fill="#0f172a" />
            {/* Start cursor */}
            <circle cx="80" cy="110" r="14" fill="#3b82f6" />
            <text x="80" y="115" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">C</text>
            <text x="80" y="145" fill="#94a3b8" fontSize="10" textAnchor="middle">Cursor Start</text>
            {/* Big close target */}
            <line x1="100" y1="110" x2="260" y2="110" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />
            <circle cx="280" cy="110" r="30" fill="#1e293b" stroke="#10b981" strokeWidth="3" />
            <text x="280" y="114" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">Easy Target</text>
            <text x="280" y="160" fill="#86efac" fontSize="9.5" textAnchor="middle">Low ID: 210ms</text>
            {/* Small far target */}
            <line x1="320" y1="110" x2="620" y2="110" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />
            <circle cx="640" cy="110" r="12" fill="#1e293b" stroke="#ef4444" strokeWidth="3" />
            <text x="640" y="140" fill="#fca5a5" fontSize="11" fontWeight="bold" textAnchor="middle">Hard Target</text>
            <text x="640" y="155" fill="#fca5a5" fontSize="9.5" textAnchor="middle">High ID: 520ms</text>
            <text x="370" y="35" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">Movement Time = a + b * log2(2D / W)</text>
            <text x="370" y="200" fill="#64748b" fontSize="10.5" textAnchor="middle">Index of Difficulty (ID): Greater Distance (D) + Smaller Width (W) = Slower Click</text>
          </svg>
        );

      case 'neuroplasticity':
        return (
          <svg viewBox="0 0 740 220" className={styles.diagramSvg} fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="10" width="720" height="200" rx="12" fill="#0f172a" />
            <rect x="40" y="40" width="310" height="135" rx="10" fill="#1e293b" stroke="#64748b" />
            <text x="195" y="68" fill="#94a3b8" fontSize="12" fontWeight="bold" textAnchor="middle">Untrained Synapse (Pre-Training)</text>
            <circle cx="130" cy="115" r="16" fill="#334155" />
            <line x1="150" y1="115" x2="240" y2="115" stroke="#475569" strokeWidth="2" strokeDasharray="4 4" />
            <circle cx="260" cy="115" r="16" fill="#334155" />
            <text x="195" y="150" fill="#94a3b8" fontSize="10" textAnchor="middle">Sparse AMPA receptors • High signal loss</text>

            <rect x="390" y="40" width="310" height="135" rx="10" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
            <text x="545" y="68" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">Long-Term Potentiation (LTP Post-Training)</text>
            <circle cx="480" cy="115" r="18" fill="#059669" />
            <line x1="500" y1="115" x2="590" y2="115" stroke="#10b981" strokeWidth="6" />
            <circle cx="610" cy="115" r="18" fill="#059669" />
            <text x="545" y="150" fill="#86efac" fontSize="10" fontWeight="bold" textAnchor="middle">Dense AMPA receptors • Myelin insulation • 25% faster</text>
          </svg>
        );

      case 'circadian-rhythm':
        return (
          <svg viewBox="0 0 740 220" className={styles.diagramSvg} fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="10" width="720" height="200" rx="12" fill="#0f172a" />
            <line x1="60" y1="180" x2="680" y2="180" stroke="#334155" strokeWidth="2" />
            <path d="M 60 170 Q 180 50 260 70 T 440 140 Q 560 60 680 170" fill="none" stroke="#f59e0b" strokeWidth="4" />
            <circle cx="240" cy="65" r="6" fill="#10b981" />
            <text x="240" y="45" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">Peak 1: 10:00 AM (Working Memory)</text>
            <circle cx="420" cy="140" r="6" fill="#ef4444" />
            <text x="420" y="160" fill="#fca5a5" fontSize="10" textAnchor="middle">Post-Lunch Dip (2:00 PM)</text>
            <circle cx="580" cy="65" r="6" fill="#3b82f6" />
            <text x="580" y="45" fill="#60a5fa" fontSize="11" fontWeight="bold" textAnchor="middle">Peak 2: 6:00 PM (Motor & Reaction Speed)</text>
            <text x="370" y="205" fill="#64748b" fontSize="10.5" textAnchor="middle">Suprachiasmatic Nucleus (SCN) Temperature & Reaction Speed Bimodal Rhythm</text>
          </svg>
        );

      // Default diagram for remaining articles
      default:
        return (
          <svg viewBox="0 0 740 200" className={styles.diagramSvg} fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="10" width="720" height="180" rx="12" fill="#0f172a" />
            <circle cx="100" cy="100" r="40" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
            <text x="100" y="105" fill="#60a5fa" fontSize="12" fontWeight="bold" textAnchor="middle">Stimulus</text>

            <path d="M 150 100 L 260 100" stroke="#3b82f6" strokeWidth="3" strokeDasharray="4 4" />

            <circle cx="310" cy="100" r="40" fill="#1e293b" stroke="#8b5cf6" strokeWidth="2" />
            <text x="310" y="105" fill="#a78bfa" fontSize="12" fontWeight="bold" textAnchor="middle">Processing</text>

            <path d="M 360 100 L 470 100" stroke="#8b5cf6" strokeWidth="3" strokeDasharray="4 4" />

            <circle cx="520" cy="100" r="40" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
            <text x="520" y="105" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">Benchmark</text>

            <path d="M 570 100 L 630 100" stroke="#10b981" strokeWidth="3" />

            <circle cx="650" cy="100" r="16" fill="#10b981" />
            <text x="650" y="105" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">✓</text>
            <text x="370" y="170" fill="#94a3b8" fontSize="11" textAnchor="middle">{title}</text>
          </svg>
        );
    }
  };

  const getBadgeIcon = () => {
    switch (category) {
      case 'reaction-time': return <Zap size={14} />;
      case 'memory': return <Layers size={14} />;
      case 'attention': return <Eye size={14} />;
      case 'processing-speed': return <Activity size={14} />;
      case 'brain-science': return <Cpu size={14} />;
      default: return <Brain size={14} />;
    }
  };

  return (
    <div className={styles.diagramCard}>
      <div className={styles.diagramHeader}>
        <div className={styles.diagramTitleGroup}>
          {getBadgeIcon()}
          <h3 className={styles.diagramTitle}>Scientific Architecture & Empirical Model</h3>
        </div>
        <span className={styles.diagramBadge}>Vector Data Model</span>
      </div>

      <div className={styles.diagramSvgWrapper}>
        {renderDiagram()}
      </div>

      <p className={styles.diagramCaption}>
        Figure 1.0: Quantitative conceptual neuro-model illustrating the physiological and mathematical dynamics of {title}.
      </p>
    </div>
  );
}
