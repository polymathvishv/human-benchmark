export type ScienceCategory = 'reaction-time' | 'memory' | 'attention' | 'processing-speed' | 'brain-science';

export interface DataPoint {
  label: string;
  value: string;
  subtext?: string;
  highlight?: boolean;
}

export interface VisualizationData {
  type: 'bar-comparison' | 'timeline-decay' | 'formula-box' | 'circadian-clock' | 'latency-breakdown';
  title: string;
  caption: string;
  dataPoints: { label: string; value: number; displayValue: string; color?: string; note?: string }[];
}

export interface ArticleSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  subsections?: {
    title: string;
    description: string;
    isNegative?: boolean;
    bullets?: string[];
  }[];
  callout?: {
    type: 'insight' | 'warning' | 'takeaways' | 'formula';
    title: string;
    content: string;
    items?: string[];
  };
}

export interface ScienceArticle {
  slug: string;
  title: string;
  subtitle: string;
  category: ScienceCategory;
  categoryLabel: string;
  readTime: string;
  publishedDate: string;
  author: string;
  excerpt: string;
  featured?: boolean;
  relatedGame: {
    name: string;
    path: string;
    ctaText: string;
  };
  keyStats: DataPoint[];
  visualization?: VisualizationData;
  sections: ArticleSection[];
  keyTakeaways: string[];
  academicCitations: string[];
  faq: { question: string; answer: string }[];
}

export const SCIENCE_CATEGORIES: { id: ScienceCategory | 'all'; label: string; iconName: string; count: number }[] = [
  { id: 'all', label: 'All Library (26)', iconName: 'BookOpen', count: 26 },
  { id: 'reaction-time', label: 'Reaction Time (6)', iconName: 'Zap', count: 6 },
  { id: 'memory', label: 'Memory Systems (6)', iconName: 'Layers', count: 6 },
  { id: 'attention', label: 'Attention & Focus (5)', iconName: 'Eye', count: 5 },
  { id: 'processing-speed', label: 'Processing Speed (4)', iconName: 'Activity', count: 4 },
  { id: 'brain-science', label: 'Brain Science (5)', iconName: 'Cpu', count: 5 }
];

export const SCIENCE_ARTICLES: ScienceArticle[] = [
  // ─────────────────────────────────────────────────────────────
  // 1. REACTION TIME PILLAR
  // ─────────────────────────────────────────────────────────────
  {
    slug: 'what-is-reaction-time',
    title: 'What is Reaction Time? The Biological Blueprint of Reflexes',
    subtitle: 'From retinal phototransduction to muscle sarcomere contraction: the biophysical floor of human reaction speed.',
    category: 'reaction-time',
    categoryLabel: 'Reaction Time',
    readTime: '6 min read',
    publishedDate: '2026-08-08',
    author: 'Human Benchmark Science Lab',
    featured: true,
    excerpt: 'Human reaction time is not an instantaneous flash—it is a sequence of biological handoffs across synapses, thalamic relays, and motor tracts taking 215–260ms.',
    relatedGame: { name: 'Reaction Time Test', path: '/reaction-time', ctaText: 'Test Your Reaction Time' },
    keyStats: [
      { label: 'Average Visual RT', value: '215–260ms', subtext: 'Global healthy adult norm' },
      { label: 'Auditory Reflex RT', value: '160–190ms', subtext: 'Shorter cochlear pathway' },
      { label: 'Biophysical Floor', value: '~150ms', subtext: 'Minimum possible for humans' }
    ],
    visualization: {
      type: 'latency-breakdown',
      title: 'Anatomy of a 230ms Visual Reaction Time',
      caption: 'The physical time required for electrical impulses to travel through the human nervous system.',
      dataPoints: [
        { label: 'Retinal Transduction', value: 30, displayValue: '30ms', color: '#3b82f6', note: 'Photons hit rhodopsin in cone/rod cells' },
        { label: 'Optic Nerve → LGN Thalamus', value: 35, displayValue: '35ms', color: '#6366f1', note: 'Action potential travels along optic tract' },
        { label: 'V1 Visual Cortex Processing', value: 50, displayValue: '50ms', color: '#8b5cf6', note: 'Primary visual cortex parses color/flash' },
        { label: 'Premotor & Motor Cortex Decision', value: 65, displayValue: '65ms', color: '#ec4899', note: 'Supplementary motor area initiates volley' },
        { label: 'Corticospinal Tract Conduction', value: 30, displayValue: '30ms', color: '#f59e0b', note: 'Signal travels down cervical spine to hand' },
        { label: 'Finger Muscle Contraction', value: 20, displayValue: '20ms', color: '#10b981', note: 'Flexor digitorum muscle physically presses' }
      ]
    },
    sections: [
      {
        heading: 'The Illusion of Instantaneous Perception',
        paragraphs: [
          'When a light suddenly turns green on your screen, your experience feels instantaneous. In reality, your consciousness is living approximately a quarter of a second in the past. Everything you perceive has undergone extensive sensory compression and neural translation before reaching conscious awareness.',
          'Simple reaction time (SRT) measures the latency between the presentation of an expected sensory stimulus and the physical execution of a predefined motor response. In healthy young adults, visual reaction time averages 215ms to 260ms, while auditory reaction time is consistently 30–50ms faster.'
        ]
      },
      {
        heading: 'The 6 Biological Steps of Visual Reaction',
        paragraphs: [
          'Every millisecond of reaction time is physically accounted for by distinct neuroanatomical stages:',
          '1. Retinal Phototransduction (20–40ms): Photons enter the cornea and strike photoreceptors (rods and cones). Rhodopsin molecules undergo conformational isomerisation, hyperpolarizing the cell and initiating an action potential.',
          '2. Thalamic Relay via the LGN (30–45ms): Retinal ganglion axons route signals through the optic chiasm to the Lateral Geniculate Nucleus (LGN) in the dorsal thalamus, filtering noise and regulating signal gain.',
          '3. Striate Cortex Visual Parsing (40–60ms): Signal arrives at Area V1 (Brodmann Area 17) via optic radiations. The visual cortex identifies luminance changes and color transitions.',
          '4. Executive Motor Planning in SMA & M1 (50–70ms): The signal propagates to the Supplementary Motor Area (SMA) and Primary Motor Cortex (M1), where the pre-compiled motor command is released.',
          '5. Efferent Corticospinal Volley (25–35ms): Giant pyramidal Betz cells fire down the corticospinal tract, traversing the internal capsule and cervical spinal cord at velocities up to 60–100 meters per second.',
          '6. Electromechanical Muscle Contraction (15–25ms): Neuromuscular junctions release acetylcholine across synaptic clefts, causing calcium influx in the flexor digitorum sarcomeres to actuate the mouse click.'
        ]
      },
      {
        heading: 'Why Auditory Reaction Time is Faster Than Visual',
        paragraphs: [
          'Sound waves reach the primary auditory cortex through mechanical stereocilia transduction in the cochlea, which takes only 1–3 milliseconds. In contrast, chemical phototransduction in retinal cones requires 20–40ms of biochemical cascade time. As a result, humans consistently react to loud starter guns and acoustic clicks 30–50ms faster than visual flashes.'
        ]
      }
    ],
    keyTakeaways: [
      'Visual reaction time is biologically constrained between 150ms and 280ms due to physical nerve conduction velocities.',
      'Auditory reaction times are 30–50ms faster than visual reaction times because mechanical ear hair cell transduction is faster than retinal photochemistry.',
      'Sub-100ms recorded scores in online tests represent predictive anticipation or hardware false positives, not true human neural transmission.'
    ],
    academicCitations: [
      'Luce, R. D. (1986). Response Times: Their Role in Inferring Elementary Mental Organization. Oxford University Press.',
      'Woods, D. L., et al. (2015). Factors influencing simple visual reaction time. Frontiers in Human Neuroscience, 9, 131.',
      'Niemi, P., & Näätänen, R. (1981). Foreperiod and simple reaction time. Psychological Bulletin, 89(1), 133-162.'
    ],
    faq: [
      { question: 'What is a good reaction time score?', answer: 'For online visual tests, 200–240ms is considered above average, 180–200ms is in the top 5% (common among esports players), and 150–170ms represents the absolute human biophysical boundary.' },
      { question: 'Can you train simple reaction time?', answer: 'While you cannot alter nerve conduction velocity, training improves motor readiness, reduces attentional drift, and optimizes display hardware to shave off 15–30ms of operational latency.' }
    ]
  },

  {
    slug: 'choice-vs-simple-reaction-time',
    title: 'Choice vs. Simple Reaction Time: How Decisions Slow the Brain',
    subtitle: 'From Donders’ subtraction method to Hick-Hyman Law: the computational cost of choosing.',
    category: 'reaction-time',
    categoryLabel: 'Reaction Time',
    readTime: '5 min read',
    publishedDate: '2026-08-08',
    author: 'Human Benchmark Science Lab',
    excerpt: 'Simple reaction takes ~230ms, but adding just one additional choice increases latency by 100ms+. Explore the cognitive overhead of decision-making.',
    relatedGame: { name: 'Reaction Time Test', path: '/reaction-time', ctaText: 'Test Simple Reaction' },
    keyStats: [
      { label: 'Simple RT', value: '~220ms', subtext: '1 Stimulus, 1 Response' },
      { label: '2-Choice RT', value: '~330ms', subtext: '2 Stimuli, 2 Responses (+50%)' },
      { label: '8-Choice RT', value: '~480ms', subtext: 'Scaled by Hick-Hyman Law' }
    ],
    visualization: {
      type: 'bar-comparison',
      title: 'Reaction Time Scaling Across Choice Complexity',
      caption: 'Mean reaction time (ms) as a function of the number of stimulus-response alternatives.',
      dataPoints: [
        { label: '1 Alternative (Simple RT)', value: 220, displayValue: '220ms', color: '#10b981' },
        { label: '2 Alternatives (2-Choice)', value: 330, displayValue: '330ms', color: '#3b82f6' },
        { label: '4 Alternatives (4-Choice)', value: 410, displayValue: '410ms', color: '#f59e0b' },
        { label: '8 Alternatives (8-Choice)', value: 485, displayValue: '485ms', color: '#ec4899' }
      ]
    },
    sections: [
      {
        heading: "Donders' Pioneering 1868 Subtraction Method",
        paragraphs: [
          'In 1868, Dutch ophthalmologist Franciscus Donders devised the first mathematical framework for measuring the speed of human thought. He categorized human reaction time into three distinct paradigms:',
          '• A-Reaction (Simple RT): One stimulus, one predetermined response (e.g. click when screen turns green). Measures pure sensorimotor conduction speed (~220ms).',
          '• B-Reaction (Choice RT): Multiple stimuli mapped to multiple distinct responses (e.g. press Left for red, Right for blue). Requires both stimulus discrimination and response selection (~330ms).',
          '• C-Reaction (Go/No-Go): Multiple stimuli, but only one requires a response (e.g. click on green, do nothing on red). Measures pure stimulus discrimination without response selection overhead (~290ms).'
        ]
      },
      {
        heading: "The Cognitive Architecture of Choice",
        paragraphs: [
          'By subtracting Simple RT (A) from Go/No-Go RT (C), Donders proved that the brain requires approximately 50–70ms purely to identify a stimulus. Subtracting Go/No-Go (C) from Choice RT (B) revealed that selecting which muscle group to actuate adds another 40–60ms of neural processing in the anterior cingulate and prefrontal cortices.'
        ]
      }
    ],
    keyTakeaways: [
      'Simple RT measures pure hardware transmission; Choice RT includes mental identification and response selection overhead.',
      'Choice RT increases logarithmically with the number of available options, following Hick’s Law.',
      'Automating decisions through deliberate practice shifts tasks from deliberate choice back toward simple reflex loops.'
    ],
    academicCitations: [
      "Donders, F. C. (1969). On the speed of mental processes. Acta Psychologica, 30, 412-431.",
      "Hick, W. E. (1952). On the rate of gain of information. Quarterly Journal of Experimental Psychology, 4(1), 11-26."
    ],
    faq: [
      { question: 'Why does Go/No-Go take longer than Simple RT?', answer: 'In Go/No-Go, the prefrontal cortex must actively verify the visual identity before inhibiting or executing the motor trigger, adding ~50ms of executive scrutiny.' }
    ]
  },

  {
    slug: 'how-sleep-affects-reaction-time',
    title: 'How Sleep Deprivation Degrades Reaction Time',
    subtitle: 'Why 24 hours without sleep impairs reflexes identically to a 0.10% blood alcohol level.',
    category: 'reaction-time',
    categoryLabel: 'Reaction Time',
    readTime: '6 min read',
    publishedDate: '2026-08-08',
    author: 'Human Benchmark Science Lab',
    featured: true,
    excerpt: 'Sleep deprivation causes attentional micro-lapses, adenosine saturation in the basal forebrain, and degrades reaction times by 30–80ms.',
    relatedGame: { name: 'Reaction Time Test', path: '/reaction-time', ctaText: 'Test Your Current Reflexes' },
    keyStats: [
      { label: '24h Wakefulness', value: '≡ 0.10% BAC', subtext: 'Exceeds legal intoxication limit' },
      { label: 'Attentional Micro-lapses', value: '400% Increase', subtext: 'Brief 0.5–2s cortical freezes' },
      { label: 'Reaction Degradation', value: '+30 to +80ms', subtext: 'Direct impairment in reflexes' }
    ],
    visualization: {
      type: 'bar-comparison',
      title: 'Reaction Time & Error Rates vs. Hours of Wakefulness',
      caption: 'Average reaction time (ms) based on continuous hours of sleep deprivation (Dawson & Reid study).',
      dataPoints: [
        { label: '8 Hours (Fully Rested)', value: 225, displayValue: '225ms', color: '#10b981' },
        { label: '16 Hours (End of Day)', value: 242, displayValue: '242ms', color: '#3b82f6' },
        { label: '20 Hours (Moderate Deprivation)', value: 275, displayValue: '275ms', color: '#f59e0b' },
        { label: '24 Hours (Full All-Nighter)', value: 315, displayValue: '315ms', color: '#ef4444', note: 'Equivalent to 0.10% BAC' }
      ]
    },
    sections: [
      {
        heading: 'The Neurobiology of the Sleepy Brain',
        paragraphs: [
          'During every waking hour, neural metabolism burns adenosine triphosphate (ATP), accumulating adenosine in the basal forebrain and ventrolateral preoptic nucleus (VLPO). As adenosine binds to A1 and A2A receptors, it dampens cholinergic and dopaminergic firing in the prefrontal cortex.',
          'When sleep is deprived, the brain does not simply slow down uniformly—it experiences stochastic "micro-lapses" or local neuronal sleep (Vyazovskiy et al., 2011), where individual cortical columns go offline for 500ms to 2000ms while the subject is awake.'
        ]
      },
      {
        heading: 'The Famous Dawson & Reid Study (Nature 1997)',
        paragraphs: [
          'In a seminal study published in Nature, researchers Dawson and Reid demonstrated that remaining awake for 17 continuous hours produced cognitive motor impairments equivalent to a blood alcohol concentration (BAC) of 0.05%. After 24 hours of wakefulness, impairment reached the equivalent of 0.10% BAC—well above the legal driving limit in almost all jurisdictions.'
        ]
      }
    ],
    keyTakeaways: [
      'Adenosine accumulation directly impairs prefrontal motor gating and causes involuntary micro-lapses.',
      '24 hours of continuous wakefulness slows average reaction time by ~70–90ms and multiplies catastrophic lapse errors by 400%.',
      'Caffeine temporarily blocks adenosine receptors but cannot restore synaptic plasticity or prevent local neuronal sleep.'
    ],
    academicCitations: [
      'Dawson, D., & Reid, K. (1997). Fatigue, alcohol and performance impairment. Nature, 388(6639), 235-235.',
      'Van Dongen, H. P., et al. (2003). The cumulative cost of additional wakefulness. Sleep, 26(2), 117-126.',
      'Vyazovskiy, V. V., et al. (2011). Local sleep in awake rats. Nature, 472(7344), 443-447.'
    ],
    faq: [
      { question: 'Does a 20-minute power nap help reaction time?', answer: 'Yes. A 20–30 minute nap clears light adenosine buildup and improves alertness, restoring 20–30ms of lost reaction speed.' }
    ]
  },

  {
    slug: 'does-gaming-improve-reaction-time',
    title: 'Does Video Gaming Actually Improve Reaction Time?',
    subtitle: 'What cognitive neuroscience reveals about Action Video Game Players (AVGPs).',
    category: 'reaction-time',
    categoryLabel: 'Reaction Time',
    readTime: '5 min read',
    publishedDate: '2026-08-08',
    author: 'Human Benchmark Science Lab',
    excerpt: 'Action gamers consistently score 15–30ms faster than non-gamers on reaction tests. Discover the neural enhancements behind visual probability accumulation.',
    relatedGame: { name: 'Aim Trainer', path: '/aim-trainer', ctaText: 'Test Your Visuomotor Aim' },
    keyStats: [
      { label: 'Action Gamers RT', value: '185–215ms', subtext: 'Top 5–10% global percentile' },
      { label: 'Non-Gamers RT', value: '230–260ms', subtext: 'Standard population average' },
      { label: 'Perceptual Template', value: '+25% Faster', subtext: 'Bayesian sensory accumulation' }
    ],
    visualization: {
      type: 'bar-comparison',
      title: 'Action Gamers vs. Non-Gamers Benchmark Comparison',
      caption: 'Empirical comparison across multiple cognitive benchmark metrics (Bavelier & Green studies).',
      dataPoints: [
        { label: 'Simple Reaction Time (Non-Gamer)', value: 245, displayValue: '245ms', color: '#94a3b8' },
        { label: 'Simple Reaction Time (Action Gamer)', value: 205, displayValue: '205ms', color: '#3b82f6', note: '40ms advantage' },
        { label: 'Visual Working Memory Capacity', value: 3.2, displayValue: '3.2 items', color: '#94a3b8' },
        { label: 'Visual Working Memory (Gamer)', value: 4.6, displayValue: '4.6 items', color: '#10b981', note: '43% higher capacity' }
      ]
    },
    sections: [
      {
        heading: 'The Green & Bavelier Discoveries',
        paragraphs: [
          'Over two decades of research led by Dr. Daphne Bavelier (University of Rochester / Geneva) has shown that playing fast-paced action video games (like first-person shooters) physically alters visual attention mechanisms.',
          'Action Video Game Players (AVGPs) exhibit enhanced contrast sensitivity, wider spatial visual attention spans, and significantly faster reaction times without sacrificing accuracy. They accumulate sensory evidence faster, reaching decision thresholds with fewer redundant sensory samples.'
        ]
      }
    ],
    keyTakeaways: [
      'Action video games enhance probabilistic Bayesian sensory inference, allowing the brain to commit to a motor decision with less elapsed sensory sampling.',
      'The advantage transfers reliably to novel visual tasks, aim tracking, and multi-object tracking.'
    ],
    academicCitations: [
      'Green, C. S., & Bavelier, D. (2003). Action video game modifies visual selective attention. Nature, 423(6939), 534-537.',
      'Bavelier, D., et al. (2012). Brain plasticity through the life span: learning to learn and action video games. Annual Review of Neuroscience, 35, 391-416.'
    ],
    faq: [
      { question: 'Do all video games improve reaction time?', answer: 'No. The effect is heavily driven by fast-paced action games requiring rapid target discrimination under time pressure (e.g. FPS, rhythm games, MOBAs).' }
    ]
  },

  {
    slug: 'does-240hz-improve-scores',
    title: 'Does a 240Hz Monitor Actually Improve Your Benchmark Score?',
    subtitle: 'The physics of display refresh latency, frame intervals, and input lag.',
    category: 'reaction-time',
    categoryLabel: 'Reaction Time',
    readTime: '5 min read',
    publishedDate: '2026-08-08',
    author: 'Human Benchmark Science Lab',
    featured: true,
    excerpt: 'Upgrading from 60Hz to 240Hz reduces display frame lag from 16.7ms to 4.2ms, giving users a direct 12–18ms measured boost on Human Benchmark.',
    relatedGame: { name: 'Reaction Time Test', path: '/reaction-time', ctaText: 'Test Your Hardware Latency' },
    keyStats: [
      { label: '60Hz Frame Time', value: '16.67ms', subtext: 'Worst-case display lag ~16.7ms' },
      { label: '144Hz Frame Time', value: '6.94ms', subtext: '9.7ms latency reduction' },
      { label: '240Hz Frame Time', value: '4.17ms', subtext: '12.5ms latency reduction' },
      { label: '360Hz Frame Time', value: '2.78ms', subtext: 'Diminishing returns zone' }
    ],
    visualization: {
      type: 'bar-comparison',
      title: 'Display Frame Draw Latency by Refresh Rate',
      caption: 'Time in milliseconds between consecutive screen frame scans (lower is faster).',
      dataPoints: [
        { label: '60 Hz Standard Monitor', value: 16.67, displayValue: '16.67ms', color: '#ef4444', note: 'Standard office screen' },
        { label: '120 Hz Mobile Display', value: 8.33, displayValue: '8.33ms', color: '#f59e0b', note: 'ProMotion / OLED phones' },
        { label: '144 Hz Gaming Monitor', value: 6.94, displayValue: '6.94ms', color: '#3b82f6', note: 'Standard esports baseline' },
        { label: '240 Hz High-End Esports', value: 4.17, displayValue: '4.17ms', color: '#10b981', note: '12.5ms faster frame draw' },
        { label: '360 Hz Ultra-Fast', value: 2.78, displayValue: '2.78ms', color: '#8b5cf6', note: 'Elite competitive tier' }
      ]
    },
    sections: [
      {
        heading: 'The Physics of Frame Times',
        paragraphs: [
          'When the Human Benchmark test transitions from Red to Green, your browser executes a state change and awaits the next vertical refresh interval (V-Sync) to draw pixels on screen.',
          'At 60Hz, a new frame is drawn once every 16.67ms. If the green trigger occurs immediately after a scanout begins, your eye cannot see the green screen until 16.67ms later. At 240Hz, frames refresh every 4.17ms, meaning you perceive the visual state change up to 12.5ms earlier.'
        ]
      },
      {
        heading: 'End-to-End Latency: The Complete Hardware Chain',
        paragraphs: [
          'Hardware latency includes display pixel response time (GtG 1–4ms), OS DWM compositing (2–8ms), browser event dispatch (1–3ms), and mouse polling rate (1000Hz = 1ms vs 125Hz = 8ms). Moving from a standard 60Hz setup with a Bluetooth mouse to a 240Hz wired gaming setup easily trims 25–40ms of non-biological latency off your recorded score.'
        ]
      }
    ],
    keyTakeaways: [
      '240Hz monitors reduce display presentation delay by ~12.5ms compared to 60Hz displays.',
      'High polling rate mice (1000Hz+) reduce input queue lag by an additional 7ms over basic 125Hz mice.',
      'A 190ms player on 60Hz is physically reacting at the same biological speed as a 175ms player on 240Hz.'
    ],
    academicCitations: [
      'MacKenzie, I. S., & Ware, C. (1993). Lag as a determinant of human performance in interactive systems. ACM CHI Proceedings, 488-495.',
      'Claypool, M., & Claypool, K. (2010). Latency and player actions in online games. Communications of the ACM, 49(11), 40-45.'
    ],
    faq: [
      { question: 'Is 360Hz or 500Hz worth it over 240Hz for reaction time?', answer: 'The step from 60Hz to 144Hz saves 9.7ms, and 144Hz to 240Hz saves 2.8ms. Going from 240Hz to 360Hz saves only 1.4ms, which is imperceptible to most humans.' }
    ]
  },

  {
    slug: 'why-reaction-time-changes-with-age',
    title: 'Why Your Reaction Time Changes With Age',
    subtitle: 'The neuroscience of myelin degradation, dopamine receptor decline, and cognitive preservation.',
    category: 'reaction-time',
    categoryLabel: 'Reaction Time',
    readTime: '6 min read',
    publishedDate: '2026-08-08',
    author: 'Human Benchmark Science Lab',
    excerpt: 'Simple reaction times slow by 2–6ms per decade after age 24. Learn why white matter integrity and basal ganglia dopamine receptors drive this shift.',
    relatedGame: { name: 'Reaction Time Test', path: '/reaction-time', ctaText: 'Benchmark Your Age Group' },
    keyStats: [
      { label: 'Peak Reaction Age', value: '18–24 Years', subtext: 'Optimal myelination & dopamine' },
      { label: 'Decade Slowdown', value: '2–6ms / decade', subtext: 'Gradual linear decline' },
      { label: 'Aerobic Exercise Offset', value: '10–20ms preservation', subtext: 'Maintains brain white matter' }
    ],
    visualization: {
      type: 'bar-comparison',
      title: 'Mean Visual Reaction Time Across Age Cohorts',
      caption: 'Global population percentile averages across age groups (Der & Deary longitudinal studies).',
      dataPoints: [
        { label: 'Age 18–24 (Peak)', value: 218, displayValue: '218ms', color: '#10b981', note: 'Fastest average' },
        { label: 'Age 25–34', value: 228, displayValue: '228ms', color: '#3b82f6' },
        { label: 'Age 35–49', value: 245, displayValue: '245ms', color: '#f59e0b' },
        { label: 'Age 50–64', value: 268, displayValue: '268ms', color: '#ec4899' },
        { label: 'Age 65+', value: 295, displayValue: '295ms', color: '#94a3b8' }
      ]
    },
    sections: [
      {
        heading: 'The Turning Point: Age 24',
        paragraphs: [
          'Large-scale cognitive studies (such as Thompson et al., 2014) analyzing millions of motor decisions found that cognitive processing speed peaks around age 24. After this point, simple reaction time begins a gradual, highly predictable decline of roughly 2 to 6 milliseconds per decade.',
          'Three primary biological mechanisms explain this deceleration:',
          '1. White Matter & Myelin Degeneration: The insulating myelin sheath that coats central nervous system axons begins micro-structural thinning, slowing nerve signal transmission velocity.',
          '2. Striatal Dopamine D2 Receptor Loss: Dopamine receptors in the basal ganglia decline by approximately 6–8% per decade, raising the signal-to-noise threshold required to trigger a voluntary motor burst.',
          '3. Sarcomere Calcium Reuptake: In skeletal muscle fibers, the rate of calcium ion release and reuptake slows down, slightly delaying mechanical muscle twitch tension.'
        ]
      }
    ],
    keyTakeaways: [
      'Simple reaction time peaks in early adulthood (18–24) and slows gradually by 2–6ms per decade.',
      'Cardiovascular fitness, regular resistance training, and cognitive challenges significantly slow age-related neural deceleration.'
    ],
    academicCitations: [
      'Der, G., & Deary, I. J. (2006). Age and sex differences in reaction time in British adults. Psychology and Aging, 21(1), 62-73.',
      'Thompson, J. J., et al. (2014). Over the hill at 24: Persistent age-related cognitive-motor decline. PLOS ONE, 9(4), e94238.'
    ],
    faq: [
      { question: 'Can older adults beat younger players?', answer: 'Yes. In complex tasks (like chess or strategy gaming), experience, predictive anticipation, and chunking heuristics easily overcome a 20–30ms simple reflex gap.' }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // 2. MEMORY PILLAR
  // ─────────────────────────────────────────────────────────────
  {
    slug: 'working-memory-explained',
    title: 'Working Memory Explained: The Mental Workbench',
    subtitle: 'The Baddeley & Hitch tripartite architecture and the limits of conscious cognitive storage.',
    category: 'memory',
    categoryLabel: 'Memory Systems',
    readTime: '6 min read',
    publishedDate: '2026-08-08',
    author: 'Human Benchmark Science Lab',
    featured: true,
    excerpt: 'Working memory is not passive storage—it is the active, high-power mental workspace where decisions and arithmetic take place.',
    relatedGame: { name: 'Number Memory', path: '/number-memory', ctaText: 'Test Your Working Memory' },
    keyStats: [
      { label: 'Uncompressed Span', value: '4 ± 1 chunks', subtext: "Cowan's core capacity" },
      { label: 'Decay Without Rehearsal', value: '1.5–2.0 sec', subtext: 'Phonological buffer limit' },
      { label: 'Correlation with IQ (Gf)', value: 'r ≈ 0.65–0.80', subtext: 'Direct link to fluid reasoning' }
    ],
    visualization: {
      type: 'formula-box',
      title: "Baddeley's Multi-Component Working Memory Model",
      caption: 'The four interactive subsystems governing active human working memory.',
      dataPoints: [
        { label: 'Central Executive', value: 100, displayValue: 'Attentional Controller', color: '#3b82f6', note: 'DLPFC supervisory attention' },
        { label: 'Phonological Loop', value: 100, displayValue: 'Auditory Subvocal Store', color: '#10b981', note: "Broca's & Wernicke's loop" },
        { label: 'Visuospatial Sketchpad', value: 100, displayValue: 'Visual Cache & Inner Scribe', color: '#f59e0b', note: 'Parieto-occipital matrix' },
        { label: 'Episodic Buffer', value: 100, displayValue: 'Multimodal Integration', color: '#ec4899', note: 'Hippocampal binding interface' }
      ]
    },
    sections: [
      {
        heading: 'Short-Term Memory vs. Working Memory',
        paragraphs: [
          'While classical short-term memory refers simply to holding passive data in mind (like remembering a 4-digit code for 5 seconds), Working Memory (WM) refers to holding information while actively manipulating, calculating, or reasoning with it.',
          'Formulated by Alan Baddeley and Graham Hitch in 1974, working memory consists of four coordinated components:',
          '1. The Central Executive: The supervisory attentional controller seated in the Dorsolateral Prefrontal Cortex (DLPFC). It directs focus, suppresses distractors, and switches between tasks.',
          '2. The Phonological Loop: A temporary acoustic store paired with an articulatory subvocal rehearsal mechanism (your inner voice). Information fades within 1.5–2 seconds unless actively recited.',
          '3. The Visuospatial Sketchpad: A mental blackboard that stores shapes, coordinates, and geometric structures in the right hemisphere parieto-frontal network.',
          '4. The Episodic Buffer: A multimodal workspace that binds phonological, visual, and long-term memory traces into coherent temporary episodes.'
        ]
      }
    ],
    keyTakeaways: [
      'Working memory is the strongest cognitive predictor of fluid intelligence, reading comprehension, and problem-solving.',
      'Without active subvocal rehearsal or visual refresh, items in working memory decay within 2 seconds.'
    ],
    academicCitations: [
      'Baddeley, A. D., & Hitch, G. (1974). Working memory. Psychology of Learning and Motivation, 8, 47-89.',
      'Cowan, N. (2001). The magical number 4 in short-term memory. Behavioral and Brain Sciences, 24(1), 87-114.'
    ],
    faq: [
      { question: 'Why does stress break working memory?', answer: 'High cortisol and noradrenaline downregulate prefrontal cortex synaptic firing, reducing active working memory slots.' }
    ]
  },

  {
    slug: 'why-humans-forget',
    title: 'Why Humans Forget: The Mathematics of Memory Decay',
    subtitle: 'The Ebbinghaus Forgetting Curve, synaptic pruning, and interference theory.',
    category: 'memory',
    categoryLabel: 'Memory Systems',
    readTime: '6 min read',
    publishedDate: '2026-08-08',
    author: 'Human Benchmark Science Lab',
    featured: true,
    excerpt: 'Within 1 hour of learning, humans forget more than 50% of newly encoded information. Explore the logarithmic curve of memory decay.',
    relatedGame: { name: 'Verbal Memory', path: '/verbal-memory', ctaText: 'Test Your Verbal Retention' },
    keyStats: [
      { label: 'Decay after 20 Mins', value: '42% Lost', subtext: 'Rapid initial drop' },
      { label: 'Decay after 24 Hours', value: '66% Lost', subtext: 'Without spaced repetition' },
      { label: 'Spaced Retrieval Gain', value: '+400% Retention', subtext: 'Long-term consolidation' }
    ],
    visualization: {
      type: 'timeline-decay',
      title: 'The Ebbinghaus Forgetting Curve (Retention Over Time)',
      caption: 'Percentage of newly acquired information retained in memory without active review (R = e^(-t/S)).',
      dataPoints: [
        { label: 'Immediate Recall', value: 100, displayValue: '100%', color: '#10b981' },
        { label: '20 Minutes', value: 58, displayValue: '58%', color: '#3b82f6' },
        { label: '1 Hour', value: 44, displayValue: '44%', color: '#f59e0b' },
        { label: '24 Hours', value: 34, displayValue: '34%', color: '#ec4899' },
        { label: '6 Days', value: 25, displayValue: '25%', color: '#ef4444' },
        { label: '30 Days', value: 21, displayValue: '21%', color: '#64748b' }
      ]
    },
    sections: [
      {
        heading: 'Hermann Ebbinghaus and the 1885 Forgetting Curve',
        paragraphs: [
          'In 1885, German psychologist Hermann Ebbinghaus conducted rigorous empirical self-experiments testing recall of 2,300 nonsense syllables (such as WID, ZOF, KEP). He discovered that memory retention decreases exponentially over time according to the formula:',
          'R = e^(-t / S)',
          'Where R is memory retention, S is the relative strength of the memory trace, and t is time. Humans lose approximately 56% of unreviewed information within 1 hour and over 70% within 48 hours.'
        ]
      },
      {
        heading: 'Interference: Proactive vs. Retroactive',
        paragraphs: [
          'Forgetting is rarely passive fading—it is largely driven by neural interference:',
          '• Proactive Interference: Old memories hinder your ability to recall new information (e.g. accidentally typing your old password).',
          '• Retroactive Interference: Newly learned material overwrites and disrupts older memory traces (e.g. after learning new phone numbers, you forget your childhood home number).'
        ]
      }
    ],
    keyTakeaways: [
      'Memory decay follows an exponential drop-off: over half of all learned information is lost within the first hour.',
      'Spaced repetition schedules combat forgetting by resetting the decay curve at wider and wider intervals.'
    ],
    academicCitations: [
      'Ebbinghaus, H. (1885). Memory: A Contribution to Experimental Psychology. Teachers College, Columbia University.',
      'Wixted, J. T. (2004). The psychology and neuroscience of forgetting. Annual Review of Psychology, 55, 235-269.'
    ],
    faq: [
      { question: 'Why does sleep protect memories from forgetting?', answer: 'During slow-wave sleep, the hippocampus replays waking memory traces to neocortical storage, transforming fragile representations into stable long-term memories.' }
    ]
  },

  {
    slug: 'visual-vs-spatial-memory',
    title: 'Visual vs. Spatial Memory: The Dual Processing Streams',
    subtitle: 'The Ventral "What" Stream vs. The Dorsal "Where" Stream in working memory.',
    category: 'memory',
    categoryLabel: 'Memory Systems',
    readTime: '5 min read',
    publishedDate: '2026-08-08',
    author: 'Human Benchmark Science Lab',
    excerpt: 'Your brain separates visual details (colors, textures) from spatial coordinates (grids, vectors). Discover how the two streams operate.',
    relatedGame: { name: 'Visual Memory Test', path: '/visual-memory', ctaText: 'Test Visual Matrix Memory' },
    keyStats: [
      { label: 'Visual Cache', value: 'Ventral Stream', subtext: 'Shapes, colors, objects' },
      { label: 'Inner Scribe', value: 'Dorsal Stream', subtext: 'Spatial vectors & sequences' },
      { label: 'Independent Capacities', value: '3–4 Objects each', subtext: 'Double dissociation' }
    ],
    visualization: {
      type: 'bar-comparison',
      title: 'Dual Stream Cortical Activation',
      caption: 'Neuroanatomical pathways and functional specializations in visuospatial memory.',
      dataPoints: [
        { label: 'Ventral Stream (Visual What)', value: 85, displayValue: 'Occipitotemporal', color: '#3b82f6', note: 'Parses tile color, patterns, geometry' },
        { label: 'Dorsal Stream (Spatial Where)', value: 92, displayValue: 'Occipitoparietal', color: '#10b981', note: 'Parses grid position, coordinates, sequences' }
      ]
    },
    sections: [
      {
        heading: 'The Two-Stream Hypothesis (Ungerleider & Mishkin)',
        paragraphs: [
          'The human visual system bifurcates immediately after Primary Visual Cortex V1 into two specialized anatomical pathways:',
          '1. The Ventral Stream ("What" Pathway): Routes along the inferior temporal lobe to encode fine visual details, color, facial identity, and object patterns (the Visual Cache in Logie’s model).',
          '2. The Dorsal Stream ("Where/How" Pathway): Routes along the posterior parietal cortex to encode spatial coordinates, 3D position, spatial motion, and motor reach targets (the Inner Scribe).'
        ]
      }
    ],
    keyTakeaways: [
      'Visual memory (what) and spatial memory (where) are biologically distinct and can function independently.',
      'Top visual memory performers engage both streams simultaneously by binding spatial coordinates into unified geometric chunks.'
    ],
    academicCitations: [
      'Ungerleider, L. G., & Mishkin, M. (1982). Two cortical visual systems. Analysis of Visual Behavior, 549-586.',
      'Logie, R. H. (1995). Visuo-spatial working memory. Psychology Press.'
    ],
    faq: [
      { question: 'Which game tests spatial vs visual memory?', answer: 'The Visual Memory Test measures static ventral/dorsal pattern capacity, while Sequence Memory tests pure dorsal spatiotemporal trajectory sequencing.' }
    ]
  },

  {
    slug: 'chunking-explained',
    title: "Chunking Explained: Bypassing Miller's 7±2 Limit",
    subtitle: 'How mnemonic compression and hierarchical grouping multiply working memory bandwidth.',
    category: 'memory',
    categoryLabel: 'Memory Systems',
    readTime: '5 min read',
    publishedDate: '2026-08-08',
    author: 'Human Benchmark Science Lab',
    excerpt: 'Working memory can only hold 4–7 raw items. Learn how chess grandmasters and memory athletes use chunking to remember dozens of data points.',
    relatedGame: { name: 'Number Memory', path: '/number-memory', ctaText: 'Practice Number Chunking' },
    keyStats: [
      { label: "Miller's Span Limit", value: '7 ± 2 items', subtext: 'Raw uncompressed ceiling' },
      { label: 'Cowan Core Slots', value: '4 slots', subtext: 'Without mnemonic grouping' },
      { label: 'Chunk Compression', value: '3x–5x Bandwidth', subtext: 'Grouping into semantic units' }
    ],
    visualization: {
      type: 'formula-box',
      title: 'Chunking Compression in Action',
      caption: 'Transforming 12 unmanageable digits into 3 meaningful semantic memory chunks.',
      dataPoints: [
        { label: 'Uncompressed (12 Items)', value: 12, displayValue: '1-7-7-6-1-9-6-9-2-0-2-4', color: '#ef4444', note: 'Exceeds working memory ceiling' },
        { label: 'Compressed (3 Chunks)', value: 3, displayValue: '[1776] - [1969] - [2024]', color: '#10b981', note: 'Fits easily in 3 working memory slots' }
      ]
    },
    sections: [
      {
        heading: 'George Miller’s 1956 Discovery',
        paragraphs: [
          'In his landmark 1956 paper, cognitive psychologist George A. Miller established that human short-term memory capacity is fundamentally bottlenecked at 7 ± 2 discrete units. However, Miller made a critical distinction: the bottleneck is not measured in bits of information, but in "chunks"—meaningful packages of data.',
          'By binding individual digits or letters into semantic clusters (like historical years: 1776, 1969, 2024, or phone area codes), you compress 12 items into 3 working memory slots, effectively tripling your conscious storage capacity.'
        ]
      }
    ],
    keyTakeaways: [
      'Chunking compresses multiple raw stimuli into a single conceptual package.',
      'Expertise in any domain (chess, programming, music) is essentially a vast mental library of pre-compiled domain-specific chunks.'
    ],
    academicCitations: [
      'Miller, G. A. (1956). The magical number seven, plus or minus two. Psychological Review, 63(2), 81-97.',
      'Chase, W. G., & Simon, H. A. (1973). Perception in chess. Cognitive Psychology, 4(1), 55-81.'
    ],
    faq: [
      { question: 'How can I score higher in Number Memory?', answer: 'Group flashing digits into groups of 3 or 4 numbers (like dates or phone numbers) and recite them as single compound words.' }
    ]
  },

  {
    slug: 'chimp-memory-research',
    title: 'Chimp Memory Research: The Ayumu Photographic Memory Study',
    subtitle: 'How young chimpanzees shatter human working memory records and the Cognitive Trade-off Hypothesis.',
    category: 'memory',
    categoryLabel: 'Memory Systems',
    readTime: '6 min read',
    publishedDate: '2026-08-08',
    author: 'Human Benchmark Science Lab',
    featured: true,
    excerpt: 'Chimpanzee Ayumu memorized 9 numbers in 210ms at 80% accuracy. Discover why humans traded photographic memory for complex language.',
    relatedGame: { name: 'Chimp Test', path: '/chimp-test', ctaText: 'Challenge the Chimp Test' },
    keyStats: [
      { label: 'Ayumu Stimulus Duration', value: '210 milliseconds', subtext: 'Duration of a human eye blink' },
      { label: 'Ayumu Accuracy', value: '80%+ on 9 numerals', subtext: 'Unmatched by untrained humans' },
      { label: 'Evolutionary Trade-off', value: 'Language vs. Eidetic Buffer', subtext: 'Neocortical reallocation' }
    ],
    visualization: {
      type: 'bar-comparison',
      title: 'Human vs. Chimpanzee Recall Accuracy at 210ms Exposure',
      caption: 'Accuracy percentage on 9-numeral spatial flash test (Inoue & Matsuzawa, Kyoto University).',
      dataPoints: [
        { label: 'Ayumu (Young Chimpanzee)', value: 80, displayValue: '80% Accuracy', color: '#10b981', note: 'Identical accuracy across all flash speeds' },
        { label: 'Adult Human Average', value: 22, displayValue: '22% Accuracy', color: '#ef4444', note: 'Severe degradation below 500ms' },
        { label: 'Trained Memory Athlete', value: 65, displayValue: '65% Accuracy', color: '#3b82f6', note: 'Requires spatial intuition' }
      ]
    },
    sections: [
      {
        heading: 'The 2007 Kyoto University Breakthrough',
        paragraphs: [
          'In 2007, researchers Sana Inoue and Tetsuro Matsuzawa at Kyoto University’s Primate Research Institute revealed a startling discovery: young chimpanzees possess an immediate visual working memory (eidetic iconic memory) far superior to adult humans.',
          'A young chimpanzee named Ayumu was presented with 9 numbers scattered across a touch screen. The numbers were displayed for as little as 210 milliseconds (the duration of a single human blink) before being masked with white squares. Ayumu touched all 9 squares in exact ascending numerical order with over 80% accuracy.'
        ]
      },
      {
        heading: 'The Cognitive Trade-off Hypothesis',
        paragraphs: [
          'Why did humans lose this extraordinary photographic capacity? Matsuzawa proposed the Cognitive Trade-off Hypothesis: early human ancestors sacrificed high-bandwidth short-term visual buffer capacity to reallocate cortical territory in the left hemisphere for syntax, symbolic language, grammatical abstraction, and collaborative social cognition.'
        ]
      }
    ],
    keyTakeaways: [
      'Young chimpanzees can snapshot and reproduce complex spatial configurations in a fraction of a second.',
      'Human brains automatically attempt to verbally recode numbers, which introduces computational lag.',
      'Humans evolved symbolic language and syntactic reasoning at the expense of raw eidetic visual buffer capacity.'
    ],
    academicCitations: [
      'Inoue, S., & Matsuzawa, T. (2007). Working memory of chimpanzees. Current Biology, 17(23), R1004-R1005.',
      'Matsuzawa, T. (2009). Symbolic representation of number in chimpanzees. Current Opinion in Neurobiology, 19(1), 92-98.'
    ],
    faq: [
      { question: 'Can humans beat the chimp test?', answer: 'Yes! By suppressing verbal inner speech and using peripheral Gestalt spatial intuition, practiced humans can reach level 15–20+.' }
    ]
  },

  {
    slug: 'how-stress-affects-memory',
    title: 'How Stress and Cortisol Sabotage Working Memory',
    subtitle: 'The neurotoxic impact of glucocorticoids on the hippocampus and prefrontal cortex.',
    category: 'memory',
    categoryLabel: 'Memory Systems',
    readTime: '5 min read',
    publishedDate: '2026-08-08',
    author: 'Human Benchmark Science Lab',
    excerpt: 'Under acute anxiety, stress hormones flood the brain, impairing the prefrontal cortex and shrinking active memory capacity.',
    relatedGame: { name: 'Verbal Memory', path: '/verbal-memory', ctaText: 'Test Memory Under Pressure' },
    keyStats: [
      { label: 'Cortisol Surge Impact', value: '-30% Working Memory', subtext: 'During acute panic/stress' },
      { label: 'Target Brain Structure', value: 'CA1 Hippocampus', subtext: 'High glucocorticoid receptor density' },
      { label: 'Amygdala Hijack', value: 'Prioritizes Fight/Flight', subtext: 'Shuts down logical working memory' }
    ],
    visualization: {
      type: 'bar-comparison',
      title: 'Working Memory Capacity Under Stress Conditions',
      caption: 'Effective working memory digit span under baseline vs. acute stress (Arnsten et al. neurobiology studies).',
      dataPoints: [
        { label: 'Calm Baseline', value: 7.2, displayValue: '7.2 Items', color: '#10b981' },
        { label: 'Mild Arousal (Optimal)', value: 7.8, displayValue: '7.8 Items', color: '#3b82f6', note: 'Yerkes-Dodson peak' },
        { label: 'High Acute Stress / Panic', value: 4.8, displayValue: '4.8 Items', color: '#ef4444', note: '33% capacity loss' }
      ]
    },
    sections: [
      {
        heading: 'The Yerkes-Dodson Law and Cortical Shutdown',
        paragraphs: [
          'Under moderate physiological arousal, noradrenaline sharpens attentional focus (the top of the Yerkes-Dodson inverted-U curve). However, when stress escalates to acute anxiety, the adrenal cortex floods the bloodstream with cortisol.',
          'Excessive noradrenaline and dopamine stimulate alpha-1 and beta-1 adrenergic receptors, temporarily uncoupling spine synapses in the prefrontal cortex. This "amygdala hijack" shifts control to primitive subcortical reflex circuits, impairing conscious working memory retrieval.'
        ]
      }
    ],
    keyTakeaways: [
      'Acute stress temporarily disconnects prefrontal neural networks, cutting working memory capacity by a third.',
      'Chronic stress causes dendritic retraction and neurotoxicity in hippocampal CA1 neurons.',
      'Physiological sighing (two quick inhales, long exhale) rapidly activates the parasympathetic nervous system to restore prefrontal control.'
    ],
    academicCitations: [
      'Arnsten, A. F. (2009). Stress signalling pathways that impair prefrontal cortex structure and function. Nature Reviews Neuroscience, 10(6), 410-422.',
      'Sapolsky, R. M. (2000). Glucocorticoids and hippocampal atrophy in neuropsychiatric disorders. Archives of General Psychiatry, 57(10), 925-935.'
    ],
    faq: [
      { question: 'Why do I blank on tests when stressed?', answer: 'High cortisol and noradrenaline downregulate prefrontal synaptic transmission, blocking access to newly formed memory traces.' }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // 3. ATTENTION PILLAR
  // ─────────────────────────────────────────────────────────────
  {
    slug: 'the-stroop-effect',
    title: 'The Stroop Effect: When Automatic Reading Hijacks Attention',
    subtitle: 'How conflict between automated reading and color naming exposes executive cognitive control.',
    category: 'attention',
    categoryLabel: 'Attention & Focus',
    readTime: '5 min read',
    publishedDate: '2026-08-08',
    author: 'Human Benchmark Science Lab',
    featured: true,
    excerpt: 'Say the color of the ink, not the word: reading the word "RED" written in blue ink causes a 100ms+ cognitive conflict.',
    relatedGame: { name: 'Verbal Memory', path: '/verbal-memory', ctaText: 'Test Verbal Inhibitory Control' },
    keyStats: [
      { label: 'Congruent Latency', value: '~450ms', subtext: 'Word and color match (RED in red)' },
      { label: 'Incongruent Latency', value: '~600ms', subtext: 'Word and color conflict (RED in blue)' },
      { label: 'Stroop Interference', value: '+150ms delay', subtext: 'Executive resolution overhead' }
    ],
    visualization: {
      type: 'bar-comparison',
      title: 'Stroop Task Reaction Latency by Congruency',
      caption: 'Response latency (ms) for congruent, neutral, and incongruent color-word trials (MacLeod 1991).',
      dataPoints: [
        { label: 'Congruent (Word: GREEN / Ink: Green)', value: 440, displayValue: '440ms', color: '#10b981', note: 'Facilitation effect' },
        { label: 'Neutral (Word: XXXX / Ink: Green)', value: 510, displayValue: '510ms', color: '#3b82f6', note: 'Baseline color naming' },
        { label: 'Incongruent (Word: RED / Ink: Green)', value: 630, displayValue: '630ms', color: '#ef4444', note: '+190ms conflict interference' }
      ]
    },
    sections: [
      {
        heading: 'John Ridley Stroop’s 1935 Classic Experiment',
        paragraphs: [
          'In 1935, psychologist John Ridley Stroop published one of the most famous experiments in psychology. When participants are asked to name the ink color of congruent words (e.g. the word "BLUE" printed in blue ink), they respond in ~450ms. But when presented with incongruent words (e.g. the word "RED" printed in blue ink), response time slows by 100–200ms with a spike in error rates.',
          'The biological reason is automaticity: reading is so heavily practiced in literate humans that word recognition in the left fusiform gyrus is completely automatic and fires faster than color processing. The Anterior Cingulate Cortex (ACC) and Dorsolateral Prefrontal Cortex (DLPFC) must actively intervene to suppress the prepotent reading response.'
        ]
      }
    ],
    keyTakeaways: [
      'The Stroop effect demonstrates the power of automatic procedural cognitive habits over intentional top-down control.',
      'Inhibiting the automatic impulse to read requires active conflict monitoring in the Anterior Cingulate Cortex.'
    ],
    academicCitations: [
      'Stroop, J. R. (1935). Studies of interference in serial verbal reactions. Journal of Experimental Psychology, 18(6), 643-662.',
      'MacLeod, C. M. (1991). Half a century of research on the Stroop effect: an integrative review. Psychological Bulletin, 109(2), 163-203.'
    ],
    faq: [
      { question: 'Why don’t young children show the Stroop effect?', answer: 'Children who have not yet learned to read automatically do not experience reading interference; they name ink colors without cognitive delay.' }
    ]
  },

  {
    slug: 'change-blindness',
    title: 'Change Blindness: The Illusion of Complete Visual Awareness',
    subtitle: 'Why the brain fails to notice massive alterations in visual scenes during eye blinks and saccades.',
    category: 'attention',
    categoryLabel: 'Attention & Focus',
    readTime: '5 min read',
    publishedDate: '2026-08-08',
    author: 'Human Benchmark Science Lab',
    excerpt: 'You believe you see everything in your visual field, but large scene changes go completely unnoticed if masked by brief disruptions.',
    relatedGame: { name: 'Visual Memory Test', path: '/visual-memory', ctaText: 'Test Visual Scene Memory' },
    keyStats: [
      { label: 'Saccadic Suppression', value: '20–50ms / saccade', subtext: 'Blind during eye movements' },
      { label: 'Detection Failure Rate', value: 'Up to 70%', subtext: 'For non-focal scene alterations' },
      { label: 'Visual Memory Illusion', value: 'Richness is reconstructed', subtext: 'Only 3–4 items held in focus' }
    ],
    visualization: {
      type: 'bar-comparison',
      title: 'Change Detection Accuracy: Focal vs. Non-Focal Objects',
      caption: 'Percentage of participants successfully noticing scene changes during flicker paradigm experiments.',
      dataPoints: [
        { label: 'Center of Attention (Focal Object)', value: 88, displayValue: '88% Detected', color: '#10b981' },
        { label: 'Background Object (Non-Focal)', value: 24, displayValue: '24% Detected', color: '#ef4444', note: '76% Missed completely' },
        { label: 'Flicker Masked Transition', value: 31, displayValue: '31% Detected', color: '#f59e0b' }
      ]
    },
    sections: [
      {
        heading: 'The Rensink Flicker Paradigm',
        paragraphs: [
          'Ronald Rensink and colleagues (1997) created the "flicker paradigm", where an original image and a modified image (such as an entire airplane engine disappearing) alternate repeatedly, separated by a 100ms blank gray screen.',
          'Without the gray flash, motion transients immediately draw your eyes to the change. But when the brief flicker masks the transient, viewers often stare at the image for 30–60 seconds without ever seeing the massive alteration.',
          'This proves that our subjective experience of a rich, high-resolution continuous visual world is an internal cognitive construction. We only store detailed representations of the 3 to 4 items we actively attend to.'
        ]
      }
    ],
    keyTakeaways: [
      'We do not store high-resolution photographic representations of entire scenes in working memory.',
      'Without motion cues, changes to unattended objects are virtually invisible to conscious perception.'
    ],
    academicCitations: [
      'Rensink, R. A., et al. (1997). To see or not to see: The need for attention to perceive changes in scenes. Psychological Science, 8(5), 368-373.',
      'Simons, D. J., & Levin, D. T. (1997). Change blindness. Trends in Cognitive Sciences, 1(7), 261-267.'
    ],
    faq: [
      { question: 'Why do magic tricks work so effectively?', answer: 'Magicians use change blindness and misdirection to introduce changes during moments when your attentional spotlight is focused elsewhere.' }
    ]
  },

  {
    slug: 'inattentional-blindness',
    title: 'Inattentional Blindness: The Invisible Gorilla Experiment',
    subtitle: 'When intense focus on one task makes you completely blind to obvious unexpected events.',
    category: 'attention',
    categoryLabel: 'Attention & Focus',
    readTime: '5 min read',
    publishedDate: '2026-08-08',
    author: 'Human Benchmark Science Lab',
    excerpt: 'In the classic Harvard study, 50% of people watching a basketball passing video failed to notice a person in a gorilla suit walking through the game.',
    relatedGame: { name: 'Aim Trainer', path: '/aim-trainer', ctaText: 'Test Focused Selective Attention' },
    keyStats: [
      { label: 'Gorilla Miss Rate', value: '50% of Viewers', subtext: 'Looked directly at the gorilla' },
      { label: 'Perceptual Load Effect', value: 'Lavie Theory', subtext: 'High task demand filters background' },
      { label: 'Real-World Implication', value: 'Distracted Driving', subtext: 'Looking without seeing hazards' }
    ],
    visualization: {
      type: 'bar-comparison',
      title: 'Inattentional Blindness Rate by Task Difficulty',
      caption: 'Percentage of participants failing to notice unexpected stimulus under varying perceptual loads (Simons & Chabris 1999).',
      dataPoints: [
        { label: 'Easy Task (Count total passes)', value: 35, displayValue: '35% Missed', color: '#f59e0b' },
        { label: 'Hard Task (Count bounce vs aerial passes)', value: 50, displayValue: '50% Missed', color: '#ef4444', note: 'Half the audience blind' },
        { label: 'Transparent Overlay Mode', value: 67, displayValue: '67% Missed', color: '#991b1b' }
      ]
    },
    sections: [
      {
        heading: 'The Simons & Chabris (1999) Discovery',
        paragraphs: [
          'In 1999 at Harvard University, Christopher Simons and Daniel Chabris asked participants to watch a short video of students passing basketballs and count the number of passes made by players wearing white shirts.',
          'Midway through the video, a woman dressed in a full gorilla suit walked into the center of the court, faced the camera, thumped her chest for 9 seconds, and walked off. Eye-tracking demonstrated that participants often looked directly at the gorilla for over a second—yet 50% reported seeing nothing unusual.'
        ]
      }
    ],
    keyTakeaways: [
      'Visual attention acts as a strict bottleneck: when perceptual capacity is fully committed, unattended objects do not reach conscious awareness.',
      'Looking directly at an object does not guarantee conscious seeing (the "looked-but-failed-to-see" phenomenon in driving accidents).'
    ],
    academicCitations: [
      'Simons, D. J., & Chabris, C. F. (1999). Gorillas in our midst: Sustained inattentional blindness for dynamic events. Perception, 28(9), 1059-1074.',
      'Lavie, N. (2005). Distracted and confused?: Selective attention under load. Trends in Cognitive Sciences, 9(2), 75-82.'
    ],
    faq: [
      { question: 'Why does talking on a hands-free phone cause driving accidents?', answer: 'Cognitive engagement in conversation absorbs working memory and attention bandwidth, triggering inattentional blindness to road hazards.' }
    ]
  },

  {
    slug: 'multitasking-myth',
    title: 'The Multitasking Myth: The Cost of Rapid Task-Switching',
    subtitle: 'Why the human brain cannot parallel-process complex cognitive tasks, and the 40% productivity tax.',
    category: 'attention',
    categoryLabel: 'Attention & Focus',
    readTime: '6 min read',
    publishedDate: '2026-08-08',
    author: 'Human Benchmark Science Lab',
    featured: true,
    excerpt: 'The brain does not multitask—it rapidly switches attention with a 20–40% penalty in speed, accuracy, and working memory retention.',
    relatedGame: { name: 'Typing Test', path: '/typing', ctaText: 'Test Monotask Motor Flow' },
    keyStats: [
      { label: 'Task-Switching Cost', value: '+20% to +40% Time', subtext: 'Slows total completion' },
      { label: 'Error Rate Surge', value: '+50% Mistakes', subtext: 'Due to residual cognitive load' },
      { label: 'True Multitaskers', value: '<2.5% of Population', subtext: 'Rare "supertaskers"' }
    ],
    visualization: {
      type: 'bar-comparison',
      title: 'Time to Complete Dual Tasks: Sequential vs. Multitasking',
      caption: 'Experimental completion time (minutes) and error rates for complex analytical tasks (Rubinstein et al.).',
      dataPoints: [
        { label: 'Sequential Execution (Monotasking)', value: 10, displayValue: '10.0 mins', color: '#10b981', note: 'Baseline 100% efficiency' },
        { label: 'Rapid Task-Switching (Multitasking)', value: 14.8, displayValue: '14.8 mins', color: '#ef4444', note: '+48% longer duration' },
        { label: 'Error Count (Monotasking)', value: 2, displayValue: '2 Errors', color: '#10b981' },
        { label: 'Error Count (Multitasking)', value: 7, displayValue: '7 Errors', color: '#ef4444', note: '350% more mistakes' }
      ]
    },
    sections: [
      {
        heading: 'Serial Processing in a Prefrontal Bottleneck',
        paragraphs: [
          'While the brain easily executes automated autonomic routines concurrently (like walking while chewing gum), tasks requiring conscious executive attention must pass through a strict single-channel bottleneck in the prefrontal cortex.',
          'When you believe you are "multitasking" (e.g. writing an email while on a phone call), your brain is actually engaging in rapid serial task-switching. Every switch requires your brain to execute two phases:',
          '1. Goal Shifting ("I want to do task B instead of task A").',
          '2. Rule Activation ("I must deactivate rules for task A and load parameters for task B").',
          'This switching penalty adds up to hundreds of milliseconds per transition and leaves behind "attention residue" (Leroy 2009), degrading working memory retention.'
        ]
      }
    ],
    keyTakeaways: [
      'The prefrontal cortex can only direct conscious focused processing to one complex cognitive task at a time.',
      'Task switching carries a 20–40% time penalty and dramatically elevates error rates due to cognitive attention residue.'
    ],
    academicCitations: [
      'Rubinstein, J. S., et al. (2001). Executive control of cognitive processes in task switching. Journal of Experimental Psychology, 27(4), 763-797.',
      'Leroy, S. (2009). Why is it so hard to do my work? The challenge of attention residue. Organizational Behavior and Human Decision Processes, 109(2), 168-181.'
    ],
    faq: [
      { question: 'Who are "supertaskers"?', answer: 'Psychologist David Sanbonmatsu discovered that roughly 2.5% of the population possess unique prefrontal architectures capable of dual-tasking without performance loss.' }
    ]
  },

  {
    slug: 'global-vs-local-attention',
    title: 'Global vs. Local Attention: Why Some People Process Scenes Faster',
    subtitle: 'The Navon Figure paradigm and the 38ms cross-cultural reaction speed difference.',
    category: 'attention',
    categoryLabel: 'Attention & Focus',
    readTime: '6 min read',
    publishedDate: '2026-08-08',
    author: 'Human Benchmark Science Lab',
    featured: true,
    excerpt: 'Some people see the forest first; others see the trees. Discover the ANU research showing a 38ms global precedence difference on the Navon Figure Test.',
    relatedGame: { name: 'Reaction Time Test', path: '/reaction-time', ctaText: 'Test Your Visual Reflex Speed' },
    keyStats: [
      { label: 'Global Advantage Delta', value: '+38 milliseconds', subtext: 'In East Asian participant cohorts' },
      { label: 'Stimulus Flash Window', value: '150 milliseconds', subtext: 'Sub-saccadic presentation' },
      { label: 'Overall IQ & Accuracy', value: 'Identical (0% difference)', subtext: 'Pure attentional distribution' }
    ],
    visualization: {
      type: 'bar-comparison',
      title: 'Global Advantage by Population Cohort (Navon Figure Test)',
      caption: 'Millisecond difference between local target reaction time and global target reaction time (McKone et al., ANU).',
      dataPoints: [
        { label: 'Caucasian Australian', value: 18, displayValue: '+18ms Global', color: '#94a3b8', note: 'Standard global baseline' },
        { label: 'Asian Australian (Born in AU)', value: 36, displayValue: '+36ms Global', color: '#3b82f6', note: 'Intermediate hybrid pattern' },
        { label: 'East Asian (Recent Immigrant)', value: 56, displayValue: '+56ms Global', color: '#10b981', note: '+38ms greater global bias' }
      ]
    },
    sections: [
      {
        heading: "The Navon Figure Test and Forest vs. Trees Perception",
        paragraphs: [
          'In 1977, David Navon created hierarchical visual stimuli: large letters (e.g. an "E") constructed entirely of smaller letters (e.g. tiny "V"s). When humans view these figures, most show a "global precedence effect"—recognizing the large letter faster than the smaller sub-elements.',
          'A landmark study by researchers at the Australian National University tested three cohorts: Caucasian Australians, East Asian international students, and Asian Australians born and raised in Australia. Across 150ms stimulus flashes, East Asian participants displayed a 38ms greater global precedence advantage.',
          'Crucially, overall intelligence, accuracy, and reaction times were identical across all groups. The difference reflected purely how visual attention was naturally deployed across the scene.'
        ]
      }
    ],
    keyTakeaways: [
      'Human visual systems naturally alternate between global (scene structure) and local (fine detail) processing modes.',
      'Cultural and environmental factors influence the baseline bias toward global vs local visual prioritization.',
      'Differences in attentional distribution do not reflect differences in intelligence or cognitive capability.'
    ],
    academicCitations: [
      'Navon, D. (1977). Forest before trees: The precedence of global features in visual perception. Cognitive Psychology, 9(3), 353-383.',
      'McKone, E., et al. (2010). A robust global visual processing advantage in East Asian participants. Journal of Vision, 10(7), 896.'
    ],
    faq: [
      { question: 'Does global attention help in driving or sports?', answer: 'Yes. A strong global processing bias allows drivers and athletes to detect sudden peripheral obstacles and general scene dynamics faster.' }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // 4. PROCESSING SPEED PILLAR
  // ─────────────────────────────────────────────────────────────
  {
    slug: 'hicks-law',
    title: "Hick's Law: The Mathematical Law of Decision Speed",
    subtitle: 'Why doubling choices adds a constant unit of time: logarithmic decision scaling in human cognition.',
    category: 'processing-speed',
    categoryLabel: 'Processing Speed',
    readTime: '5 min read',
    publishedDate: '2026-08-08',
    author: 'Human Benchmark Science Lab',
    featured: true,
    excerpt: "Hick's Law mathematically proves that reaction time increases logarithmically with the number of choices: RT = a + b · log2(n + 1).",
    relatedGame: { name: 'Reaction Time Test', path: '/reaction-time', ctaText: 'Test Decision Reaction Time' },
    keyStats: [
      { label: "Hick's Formula", value: 'RT = a + b·log₂(n+1)', subtext: 'Information-theoretic equation' },
      { label: 'Information Gain Rate', value: '~150ms per bit', subtext: 'Entropy processing speed' },
      { label: 'UI Design Application', value: 'Minimize options', subtext: 'Reduces user decision paralysis' }
    ],
    visualization: {
      type: 'formula-box',
      title: "Hick-Hyman Law Curve: Decision Time vs. Number of Choices",
      caption: 'Logarithmic growth of reaction time as choices expand from 1 to 16 alternatives.',
      dataPoints: [
        { label: '1 Option (0 bits)', value: 220, displayValue: '220ms', color: '#10b981' },
        { label: '2 Options (1 bit)', value: 330, displayValue: '330ms (+110ms)', color: '#3b82f6' },
        { label: '4 Options (2 bits)', value: 440, displayValue: '440ms (+110ms)', color: '#f59e0b' },
        { label: '8 Options (3 bits)', value: 550, displayValue: '550ms (+110ms)', color: '#ec4899' },
        { label: '16 Options (4 bits)', value: 660, displayValue: '660ms (+110ms)', color: '#ef4444' }
      ]
    },
    sections: [
      {
        heading: 'The Information Theory Foundation',
        paragraphs: [
          'In 1952, British psychologist William Edmund Hick integrated Claude Shannon’s mathematical information theory with cognitive psychology. Hick discovered that human reaction time does not scale linearly with the number of alternatives (n)—it scales logarithmically based on the amount of transmitted entropy (bits):',
          'RT = a + b * log2(n + 1)',
          'Where (a) is baseline sensorimotor reaction time and (b) is the cognitive processing rate per bit of information (typically ~100–150ms per bit). Every time you double the number of equally probable choices, you add one bit of information, adding a constant ~110ms to decision time.'
        ]
      }
    ],
    keyTakeaways: [
      'Decision time increases logarithmically, not linearly, with the number of available options.',
      'Simplifying menus and choices into hierarchical clusters dramatically reduces decision paralysis and latency.'
    ],
    academicCitations: [
      'Hick, W. E. (1952). On the rate of gain of information. Quarterly Journal of Experimental Psychology, 4(1), 11-26.',
      'Hyman, R. (1953). Stimulus information as a determinant of reaction time. Journal of Experimental Psychology, 45(3), 188-196.'
    ],
    faq: [
      { question: 'How does Hick’s Law apply to esports?', answer: 'In fast games, players use predefined tactical setups to eliminate decision options, transforming 8-choice decisions into instant single-choice reflexes.' }
    ]
  },

  {
    slug: 'fitts-law',
    title: "Fitts's Law: The Golden Formula of Human Movement and Aim",
    subtitle: 'How target distance and size govern speed-accuracy tradeoffs in motor control.',
    category: 'processing-speed',
    categoryLabel: 'Processing Speed',
    readTime: '6 min read',
    publishedDate: '2026-08-08',
    author: 'Human Benchmark Science Lab',
    featured: true,
    excerpt: "Fitts's Law dictates that the time to hit a target depends on the ratio between distance and target width: MT = a + b · log2(2D / W).",
    relatedGame: { name: 'Aim Trainer', path: '/aim-trainer', ctaText: 'Test Your Fitts Aim Speed' },
    keyStats: [
      { label: "Fitts's Formula", value: 'MT = a + b·log₂(2D/W)', subtext: 'Index of Difficulty equation' },
      { label: 'Index of Difficulty', value: 'ID = log₂(2D/W)', subtext: 'Measured in bits' },
      { label: 'Ballistic vs Feedback', value: '2-Phase Motor Control', subtext: 'Gross sweep + fine correction' }
    ],
    visualization: {
      type: 'formula-box',
      title: 'Index of Difficulty vs. Movement Time',
      caption: 'Movement time (ms) required to click a target as a function of target distance (D) and width (W).',
      dataPoints: [
        { label: 'ID = 2 bits (Close & Large)', value: 280, displayValue: '280ms', color: '#10b981' },
        { label: 'ID = 4 bits (Medium Distance)', value: 460, displayValue: '460ms', color: '#3b82f6' },
        { label: 'ID = 6 bits (Far & Small Target)', value: 680, displayValue: '680ms', color: '#f59e0b' },
        { label: 'ID = 8 bits (Tiny Pixel Precision)', value: 920, displayValue: '920ms', color: '#ef4444' }
      ]
    },
    sections: [
      {
        heading: 'Paul Fitts’ 1954 Breakthrough in Ergonomics',
        paragraphs: [
          'In 1954, Paul Fitts modeled human pointing mechanics using information theory. He discovered that movement time (MT) is a strict linear function of the Index of Difficulty (ID):',
          'MT = a + b * log2(2D / W)',
          'Where D is the distance to the center of the target, and W is the target width along the axis of motion.',
          'Target acquisition consists of two distinct motor phases: (1) An initial open-loop ballistic phase driven by the motor cortex that covers ~80–90% of the distance, followed by (2) A closed-loop visual feedback phase where the cerebellum processes positional error to execute micro-corrections.'
        ]
      }
    ],
    keyTakeaways: [
      'Movement time is determined by the ratio of distance to target size, not absolute distance alone.',
      'Expert aimers minimize the secondary correction phase, executing smooth single-phase ballistic movements.'
    ],
    academicCitations: [
      'Fitts, P. M. (1954). The information capacity of the human motor system. Journal of Experimental Psychology, 47(6), 381-391.',
      'MacKenzie, I. S. (1992). Fitts\' law as a research and design tool. Human-Computer Interaction, 7(1), 91-139.'
    ],
    faq: [
      { question: 'Why are screen corners considered "infinite size" in UI design?', answer: 'In desktop interfaces, you cannot overshoot the screen corner regardless of mouse speed, effectively making its width (W) infinite and ID = 0.' }
    ]
  },

  {
    slug: 'processing-speed-vs-reaction-time',
    title: 'Processing Speed vs. Reaction Time: What’s the Difference?',
    subtitle: 'Deconstructing simple reflex latency from high-order cognitive inspection and mental agility.',
    category: 'processing-speed',
    categoryLabel: 'Processing Speed',
    readTime: '5 min read',
    publishedDate: '2026-08-08',
    author: 'Human Benchmark Science Lab',
    excerpt: 'Reaction time is nerve conduction speed; processing speed is how fast your brain parses, transforms, and acts upon complex information.',
    relatedGame: { name: 'Typing Test', path: '/typing', ctaText: 'Test Cognitive Processing Speed' },
    keyStats: [
      { label: 'Simple Reflex RT', value: 'Subcortical & M1', subtext: 'Pure peripheral latency' },
      { label: 'Inspection Time (IT)', value: 'Parieto-Frontal', subtext: 'Pattern discrimination rate' },
      { label: 'Processing Speed Index', value: 'WAIS Core Pillar', subtext: 'Correlates with fluid IQ' }
    ],
    visualization: {
      type: 'bar-comparison',
      title: 'Cognitive Depth Hierarchy: From Reflex to Analysis',
      caption: 'Average neural latency (ms) across increasing layers of cognitive complexity.',
      dataPoints: [
        { label: 'Simple Reflex Click (Light Flash)', value: 220, displayValue: '220ms', color: '#10b981' },
        { label: 'Inspection Time (Line Length Choice)', value: 340, displayValue: '340ms', color: '#3b82f6' },
        { label: 'Lexical Word Decision (Real vs Fake)', value: 520, displayValue: '520ms', color: '#f59e0b' },
        { label: 'Complex Mental Arithmetic (24 × 7)', value: 1850, displayValue: '1850ms', color: '#ec4899' }
      ]
    },
    sections: [
      {
        heading: 'Hardware Speed vs. Software Processing',
        paragraphs: [
          'Many people use "reaction time" and "processing speed" interchangeably, but in neuropsychology they represent distinct constructs:',
          '• Reaction Time (RT) measures raw peripheral nerve conduction latency and simple motor thresholding (the physical "hardware bus speed").',
          '• Cognitive Processing Speed (CPS) measures the rate at which executive prefrontal networks inspect, categorize, and transform complex symbolic inputs (the "software algorithm throughput").'
        ]
      }
    ],
    keyTakeaways: [
      'Simple reaction time is physical nerve conduction; cognitive processing speed is mental transformation rate.',
      'Processing speed is a central subtest in standard intelligence batteries (WAIS Processing Speed Index).'
    ],
    academicCitations: [
      'Deary, I. J., et al. (2001). Intelligence and inspection time: Achievements, prospects, and problems. American Psychologist, 56(2), 127-135.',
      'Salthouse, T. A. (1996). The processing-speed theory of adult age differences in cognition. Psychological Review, 103(3), 403-428.'
    ],
    faq: [
      { question: 'Can someone have slow reaction time but fast processing speed?', answer: 'Yes! A person with high processing speed may excel in rapid mental math or coding while having an average simple physical reflex time.' }
    ]
  },

  {
    slug: 'why-fast-decisions-matter',
    title: 'Why Fast Decisions Matter: The Speed-Accuracy Tradeoff',
    subtitle: 'Drift Diffusion Models (DDM) and decision thresholds in high-stakes environments.',
    category: 'processing-speed',
    categoryLabel: 'Processing Speed',
    readTime: '5 min read',
    publishedDate: '2026-08-08',
    author: 'Human Benchmark Science Lab',
    excerpt: 'The brain continuously balances speed against accuracy. Learn how mathematical Drift Diffusion Models explain every choice you make.',
    relatedGame: { name: 'Typing Test', path: '/typing', ctaText: 'Balance Speed & Accuracy' },
    keyStats: [
      { label: 'Speed-Accuracy Curve', value: 'Logarithmic tradeoff', subtext: 'Faster decisions = more noise' },
      { label: 'Drift Rate (v)', value: 'Information velocity', subtext: 'Rate of sensory evidence accumulation' },
      { label: 'Boundary Separation (a)', value: 'Caution threshold', subtext: 'Conservative vs risky gating' }
    ],
    visualization: {
      type: 'formula-box',
      title: 'Drift Diffusion Model (DDM) of Decision Making',
      caption: 'Sensory evidence accumulation towards upper (correct) or lower (error) decision boundaries.',
      dataPoints: [
        { label: 'Cautious Decision (High Boundary a)', value: 480, displayValue: '480ms / 99% Acc', color: '#10b981', note: 'High accuracy, slower' },
        { label: 'Balanced Decision (Medium Boundary)', value: 340, displayValue: '340ms / 94% Acc', color: '#3b82f6', note: 'Optimal throughput' },
        { label: 'Rushed Decision (Low Boundary a)', value: 210, displayValue: '210ms / 72% Acc', color: '#ef4444', note: 'Fast, high error rate' }
      ]
    },
    sections: [
      {
        heading: 'The Drift Diffusion Model (Ratcliff 1978)',
        paragraphs: [
          'Whenever you make a two-choice decision (e.g. typing a letter, braking for a pedestrian, or firing in a game), your brain does not decide in a single step. Instead, noisy sensory evidence continuously accumulates over time until it crosses an upper or lower decision boundary (the Drift Diffusion Model).',
          'Setting a high boundary separation guarantees accuracy but costs 150–300ms. Setting a low boundary makes you fast, but background neural noise causes premature errors.'
        ]
      }
    ],
    keyTakeaways: [
      'Every human decision represents a dynamic calibration between evidence accumulation rate and boundary caution thresholds.',
      'Elite performers do not just react faster; they extract cleaner sensory signals with higher drift rates.'
    ],
    academicCitations: [
      'Ratcliff, R., & McKoon, G. (2008). The diffusion decision model: Theory and data for two-choice decision tasks. Neural Computation, 20(4), 873-922.',
      'Bogacz, R., et al. (2010). The physics of optimal decision making. Psychological Review, 113(4), 700-765.'
    ],
    faq: [
      { question: 'How do elite typists balance speed and accuracy?', answer: 'They maintain a tight boundary threshold (97–99% accuracy) because correcting an error costs ~400ms, negating high raw typing speed.' }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // 5. BRAIN SCIENCE PILLAR
  // ─────────────────────────────────────────────────────────────
  {
    slug: 'neuroplasticity',
    title: 'Neuroplasticity: How the Brain Rewires Itself Through Training',
    subtitle: 'Long-Term Potentiation (LTP), dendritic spine remodeling, and deliberate practice.',
    category: 'brain-science',
    categoryLabel: 'Brain Science',
    readTime: '6 min read',
    publishedDate: '2026-08-08',
    author: 'Human Benchmark Science Lab',
    featured: true,
    excerpt: "Neurons that fire together wire together. Discover the biophysical mechanisms that allow deliberate practice to physically restructure the brain.",
    relatedGame: { name: 'Sequence Memory', path: '/sequence-memory', ctaText: 'Train Brain Plasticity' },
    keyStats: [
      { label: "Hebb's Postulate", value: 'Fire together, wire together', subtext: 'Synaptic reinforcement' },
      { label: 'Long-Term Potentiation', value: 'NMDA receptor activation', subtext: 'Increases synaptic conductivity' },
      { label: 'Myelination Boost', value: '+50% Signal Speed', subtext: 'Oligodendrocyte wrapping' }
    ],
    visualization: {
      type: 'bar-comparison',
      title: 'Synaptic Density and Gray Matter Volume Through Practice',
      caption: 'Relative structural brain changes after 8 weeks of deliberate cognitive training (Draganski London Taxi study).',
      dataPoints: [
        { label: 'Untrained Baseline', value: 100, displayValue: '100% Volume', color: '#94a3b8' },
        { label: '4 Weeks Deliberate Practice', value: 114, displayValue: '+14% Synaptic Spines', color: '#3b82f6' },
        { label: '8 Weeks Intensive Training', value: 128, displayValue: '+28% Gray Matter', color: '#10b981', note: 'Significant cortical expansion' }
      ]
    },
    sections: [
      {
        heading: 'Hebbian Learning and Long-Term Potentiation (LTP)',
        paragraphs: [
          'Until the late 20th century, scientists believed the adult human brain was structurally fixed. Today, neuroplasticity is a proven biological reality. When synapses are repeatedly stimulated during deliberate cognitive training, glutamate activates postsynaptic NMDA receptors, triggering calcium influx and inserting new AMPA receptors into the membrane (Long-Term Potentiation).',
          'Over weeks of consistent practice, oligodendrocytes wrap additional layers of myelin around active axons, accelerating neural communication speeds and turning effortful conscious tasks into automatic subcortical routines.'
        ]
      }
    ],
    keyTakeaways: [
      'The adult brain continually modifies its physical synaptic architecture in response to cognitive challenges.',
      'Deliberate practice triggers Long-Term Potentiation (LTP) and thickens myelin insulation around active neural pathways.'
    ],
    academicCitations: [
      'Draganski, B., et al. (2004). Neuroplasticity: Changes in grey matter induced by training. Nature, 427(6972), 311-312.',
      'Bliss, T. V., & Collingridge, G. L. (1993). A synaptic model of memory: Long-term potentiation in the hippocampus. Nature, 361(6407), 31-39.'
    ],
    faq: [
      { question: 'How long does it take for brain rewiring to occur?', answer: 'Initial synaptic strengthening happens within minutes (LTP); measurable macroscopic gray matter density increases become visible on MRI within 4–8 weeks of daily practice.' }
    ]
  },

  {
    slug: 'dopamine-and-learning',
    title: 'Dopamine and Learning: The Reward Prediction Engine',
    subtitle: 'How the mesolimbic dopamine pathway transforms unexpected success into permanent skill mastery.',
    category: 'brain-science',
    categoryLabel: 'Brain Science',
    readTime: '5 min read',
    publishedDate: '2026-08-08',
    author: 'Human Benchmark Science Lab',
    excerpt: 'Dopamine is not the chemical of pleasure—it is the molecule of anticipation, drive, and Reward Prediction Error (RPE).',
    relatedGame: { name: 'Aim Trainer', path: '/aim-trainer', ctaText: 'Trigger Dopamine Flow' },
    keyStats: [
      { label: 'Reward Prediction Error', value: 'RPE = Actual - Expected', subtext: "Wolfram Schultz's model" },
      { label: 'Synaptic Gating', value: 'D1 receptor plasticity', subtext: 'Strengthens winning neural circuits' },
      { label: 'Flow State Driver', value: 'Optimal 85% Rule', subtext: '15% error rate maximizes dopamine' }
    ],
    visualization: {
      type: 'formula-box',
      title: 'Reward Prediction Error (RPE) Firing Rates',
      caption: 'Dopamine neuron firing patterns in response to predicted vs unexpected cognitive rewards.',
      dataPoints: [
        { label: 'Outcome Worse Than Expected (Negative RPE)', value: 20, displayValue: 'Dopamine Dip (Depression)', color: '#ef4444' },
        { label: 'Outcome Matches Expectation (Zero RPE)', value: 100, displayValue: 'Baseline Tonic Firing', color: '#94a3b8' },
        { label: 'Outcome Better Than Expected (Positive RPE)', value: 260, displayValue: '+160% Phasic Burst', color: '#10b981', note: 'Drives rapid memory consolidation' }
      ]
    },
    sections: [
      {
        heading: 'Wolfram Schultz’s Reward Prediction Error Model',
        paragraphs: [
          'In landmark neurophysiology experiments, Wolfram Schultz discovered that midbrain dopamine neurons (in the Ventral Tegmental Area and Substantia Nigra) do not fire in response to receiving a reward—they fire when a reward exceeds expectations (Reward Prediction Error, or RPE).',
          'When you beat your high score or successfully master a difficult sequence, a phasic burst of dopamine floods the striatum and prefrontal cortex. This acts as a chemical "tag", immediately consolidating the motor patterns and synaptic connections that caused the success.'
        ]
      }
    ],
    keyTakeaways: [
      'Dopamine encodes surprise and reward prediction errors, acting as the brain’s learning amplifier.',
      'Training at an ~85% success rate (the "85% Rule") optimizes dopamine-driven neuroplasticity.'
    ],
    academicCitations: [
      'Schultz, W. (1998). Predictive reward signal of dopamine neurons. Journal of Neurophysiology, 80(1), 1-27.',
      'Wilson, R. C., et al. (2019). The Eighty Five Percent Rule for optimal learning. Nature Communications, 10(1), 4646.'
    ],
    faq: [
      { question: 'Why are games with leaderboards so addictive?', answer: 'Leaderboards and unpredictable personal bests generate frequent positive Reward Prediction Errors, keeping dopamine tonic levels elevated.' }
    ]
  },

  {
    slug: 'circadian-rhythm',
    title: 'Circadian Rhythm: The Best Time of Day for Brain Performance',
    subtitle: 'Why working memory peaks in the morning while physical reaction speed peaks in the late afternoon.',
    category: 'brain-science',
    categoryLabel: 'Brain Science',
    readTime: '6 min read',
    publishedDate: '2026-08-08',
    author: 'Human Benchmark Science Lab',
    featured: true,
    excerpt: 'Your brain has distinct cognitive peaks: analytical working memory peaks at 10 AM, while physical reaction time is fastest at 5 PM.',
    relatedGame: { name: 'Reaction Time Test', path: '/reaction-time', ctaText: 'Test Your Peak Time Reflexes' },
    keyStats: [
      { label: 'Working Memory Peak', value: '9:00 AM – 11:30 AM', subtext: 'Highest executive prefrontal focus' },
      { label: 'Reaction Speed Peak', value: '4:00 PM – 7:00 PM', subtext: 'Highest core body temperature' },
      { label: 'Post-Lunch Dip', value: '1:00 PM – 3:00 PM', subtext: 'Circadian homeostatic dip' }
    ],
    visualization: {
      type: 'circadian-clock',
      title: 'Cognitive Performance Across the 24-Hour Circadian Cycle',
      caption: 'Relative efficiency of working memory vs. physical reaction speed throughout the day.',
      dataPoints: [
        { label: '8:00 AM (Waking/Cortisol Peak)', value: 75, displayValue: 'Cortisol Awakening', color: '#f59e0b' },
        { label: '10:00 AM (Working Memory Peak)', value: 98, displayValue: 'Optimal Working Memory', color: '#10b981', note: 'Best for math, coding, study' },
        { label: '2:00 PM (Post-Lunch Dip)', value: 65, displayValue: 'Circadian Dip', color: '#ef4444', note: 'Attentional lull' },
        { label: '5:30 PM (Reaction Speed Peak)', value: 100, displayValue: 'Fastest Reaction Time', color: '#3b82f6', note: 'Body temperature peak' },
        { label: '11:00 PM (Melatonin Surge)', value: 50, displayValue: 'Melatonin / Sleep Gate', color: '#6366f1' }
      ]
    },
    sections: [
      {
        heading: 'The Dual Cognitive Clock: Temperature vs. Executive Control',
        paragraphs: [
          'The suprachiasmatic nucleus (SCN) in the hypothalamus orchestrates a 24-hour master clock governing hormone secretion, core body temperature, and neurotransmitter availability.',
          'Cognitive functions do not all peak at the same hour:',
          '• Morning Working Memory Peak (9 AM–11 AM): Morning cortisol elevation paired with high alertness maximizes prefrontal cortex executive control, making morning the optimal window for Number Memory, Verbal Memory, and analytical problem-solving.',
          '• Late Afternoon Reaction Peak (4 PM–7 PM): Core body temperature peaks in the late afternoon, increasing nerve conduction velocity by ~2% and accelerating muscle contractile speed. This makes 4 PM–7 PM the optimal window for raw Reaction Time and Aim Trainer performance.'
        ]
      }
    ],
    keyTakeaways: [
      'Working memory and logical reasoning peak in the mid-morning (9 AM–11 AM).',
      'Simple reflex speed and motor precision peak in the late afternoon (4 PM–7 PM) when body temperature is highest.',
      'The 1 PM–3 PM post-lunch dip is a biological circadian rhythm dip, not just food coma.'
    ],
    academicCitations: [
      'Schmidt, C., et al. (2007). A time to think: Circadian rhythms in human cognition. Cognitive Neuropsychology, 24(7), 755-789.',
      'Carrier, J., & Monk, T. H. (2000). Circadian rhythms of performance: New trends. Chronobiology International, 17(6), 719-732.'
    ],
    faq: [
      { question: 'Do night owls (late chronotypes) have different peak hours?', answer: 'Yes. Late chronotypes experience both the working memory and reaction peaks shifted 3 to 5 hours later into the evening.' }
    ]
  },

  {
    slug: 'cognitive-fatigue',
    title: 'Cognitive Fatigue & Ego Depletion: The Biological Toll of Mental Effort',
    subtitle: 'Why hours of intense mental work physically drains prefrontal glutamate and causes decision fatigue.',
    category: 'brain-science',
    categoryLabel: 'Brain Science',
    readTime: '6 min read',
    publishedDate: '2026-08-08',
    author: 'Human Benchmark Science Lab',
    excerpt: 'Mental exhaustion is not in your head—sustained cognitive work accumulates toxic glutamate in the prefrontal cortex.',
    relatedGame: { name: 'Typing Test', path: '/typing', ctaText: 'Test Stamina & Consistency' },
    keyStats: [
      { label: 'Glutamate Accumulation', value: '+12% in DLPFC', subtext: 'After 6+ hours intense work' },
      { label: 'Decision Shift', value: 'Towards Low-Effort Bias', subtext: 'Prioritizes short-term rewards' },
      { label: 'Pupil Dilation Marker', value: 'Diminished Locus Coeruleus', subtext: 'Declining tonic arousal' }
    ],
    visualization: {
      type: 'bar-comparison',
      title: 'Cognitive Error Rates Over Consecutive Hours of Work',
      caption: 'Mistake frequency and reaction time drift during continuous mental effort (Wieczoek et al. 2022).',
      dataPoints: [
        { label: 'Hour 1 (Fresh)', value: 100, displayValue: '100% Baseline', color: '#10b981' },
        { label: 'Hour 3 (Mild Fatigue)', value: 118, displayValue: '+18% Mistakes', color: '#3b82f6' },
        { label: 'Hour 6 (Severe Fatigue)', value: 165, displayValue: '+65% Mistakes', color: '#f59e0b' },
        { label: 'Hour 8+ (Glutamate Saturated)', value: 210, displayValue: '+110% Mistakes', color: '#ef4444', note: 'Severe decision impairment' }
      ]
    },
    sections: [
      {
        heading: 'The 2022 Paris Brain Institute Glutamate Discovery',
        paragraphs: [
          'For decades, scientists debated whether "mental exhaustion" was a psychological illusion or a physical metabolic state. In 2022, researchers at the Paris Brain Institute (Wiehler et al., Current Biology) provided the definitive biochemical answer using magnetic resonance spectroscopy (MRS).',
          'Sustained high-demand cognitive effort causes glutamate (the brain\'s primary excitatory neurotransmitter) to accumulate in the lateral prefrontal cortex. High concentrations of extracellular glutamate make further neural activation metabolically expensive and toxic, triggering an involuntary biological drive to stop effort and choose low-cost passive rewards.'
        ]
      }
    ],
    keyTakeaways: [
      'Mental fatigue is caused by physical glutamate accumulation in the prefrontal cortex.',
      'Taking 5-minute passive rest breaks every 50 minutes allows glial cells to re-uptake glutamate and restore executive clarity.'
    ],
    academicCitations: [
      'Wiehler, A., et al. (2022). A neuro-metabolic account of why hard thinking makes us tired. Current Biology, 32(16), 3564-3575.',
      'Baumeister, R. F., et al. (1998). Ego depletion: Is the active self a limited resource? Journal of Personality and Social Psychology, 74(5), 1252-1265.'
    ],
    faq: [
      { question: 'Does sugar or coffee clear cognitive fatigue?', answer: 'Glucose provides brief cellular energy, but sleep and passive rest are the only biological processes that clear toxic extracellular prefrontal glutamate.' }
    ]
  },

  {
    slug: 'brain-myths-debunked',
    title: '5 Brain Myths Debunked by Modern Cognitive Science',
    subtitle: 'Deconstructing the 10% brain myth, left vs right brain personality, and brain training general transfer.',
    category: 'brain-science',
    categoryLabel: 'Brain Science',
    readTime: '6 min read',
    publishedDate: '2026-08-08',
    author: 'Human Benchmark Science Lab',
    featured: true,
    excerpt: 'Do you only use 10% of your brain? Are you left-brained or right-brained? We examine the evidence to debunk the most persistent neuro-myths.',
    relatedGame: { name: 'Reaction Time Test', path: '/reaction-time', ctaText: 'Test Real Brain Metrics' },
    keyStats: [
      { label: '10% Brain Myth', value: '100% Factually False', subtext: 'fMRI shows full brain activation' },
      { label: 'Left/Right Personality', value: 'Debunked Neuromyth', subtext: 'Both hemispheres work together' },
      { label: 'Brain Training Transfer', value: 'Task-Specific Learning', subtext: 'Far transfer is limited' }
    ],
    visualization: {
      type: 'bar-comparison',
      title: 'Scientific Evidence vs Popular Myth Belief',
      caption: 'Percentage of the general public believing common neuromyths vs peer-reviewed neuroscientific consensus.',
      dataPoints: [
        { label: '"We only use 10% of our brain"', value: 65, displayValue: '65% Believe (0% Truth)', color: '#ef4444', note: 'Evolutionary impossible waste' },
        { label: '"People are Left or Right Brained"', value: 71, displayValue: '71% Believe (0% Truth)', color: '#f59e0b', note: 'Disproven by large fMRI trials' },
        { label: '"Brain Games Increase General IQ"', value: 58, displayValue: '58% Believe (12% Truth)', color: '#3b82f6', note: 'Improves test skills, not raw Gf' }
      ]
    },
    sections: [
      {
        heading: 'Myth 1: "We Only Use 10% of Our Brain"',
        paragraphs: [
          'Perhaps the most widespread neuromyth in pop culture. The human brain accounts for only 2% of total body mass but consumes over 20% of the body’s daily glucose and oxygen. From an evolutionary perspective, natural selection would never maintain a high-metabolic organ that operates at 10% capacity.',
          'Modern functional Magnetic Resonance Imaging (fMRI) and PET scans demonstrate that even during simple daily tasks or deep sleep, virtually 100% of the brain exhibits constant electrical and metabolic activity.'
        ]
      },
      {
        heading: 'Myth 2: "Left-Brained (Logical) vs. Right-Brained (Creative) People"',
        paragraphs: [
          'While certain functional specializations exist (like left-hemisphere dominance for language grammar and right-hemisphere processing for spatial global perception), massive neuroimaging studies (Nielsen et al., 2013, examining over 1,000 individuals) found zero evidence that some people have stronger left or right hemisphere networks.',
          'All complex creative and analytical thinking requires dense, real-time cross-hemispheric communication via the 200 million axonal fibers of the corpus callosum.'
        ]
      },
      {
        heading: 'Myth 3: "Brain Training Games Boost Your General IQ Score"',
        paragraphs: [
          'Extensive meta-analyses (such as Simons et al., 2016) show that while cognitive games produce robust "near transfer" (you become significantly better at the specific game, its chunking rules, and its motor rhythms), "far transfer" to generalized fluid intelligence (Gf) or academic grades is modest. Training improves your task efficiency and mental agility, but cannot magically rewrite baseline biological IQ.'
        ]
      }
    ],
    keyTakeaways: [
      'Humans use 100% of their brain throughout the day, not 10%.',
      'Creativity and logic require integrated communication across both cerebral hemispheres.',
      'Cognitive games build strong task-specific skills and mental sharpness rather than broad permanent IQ boosts.'
    ],
    academicCitations: [
      'Nielsen, J. A., et al. (2013). An evaluation of the left-brain vs. right-brain hypothesis with resting state functional connectivity. PLOS ONE, 8(8), e71275.',
      'Simons, D. J., et al. (2016). Do "brain-training" programs work? Psychological Science in the Public Interest, 17(3), 103-186.',
      'Herculano-Houzel, S. (2002). Do you know your brain? A survey on public neuroscience knowledge. Arquivos de Neuro-Psiquiatria, 60(2A), 253-259.'
    ],
    faq: [
      { question: 'Why does Human Benchmark measure cognitive metrics?', answer: 'Our tests measure accurate, standardized psychometric performance—providing objective benchmarks of reaction speed, memory span, and motor control rather than making pseudo-scientific IQ claims.' }
    ]
  }
];
