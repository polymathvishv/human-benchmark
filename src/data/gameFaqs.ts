/**
 * gameFaqs.ts
 *
 * Centralized FAQ data for every game page.
 * Each game gets 5-6 SEO-targeted Q&As that serve two purposes:
 *   1. Rendered as a visible collapsible FAQ section (rich content for users)
 *   2. Injected into a FAQPage JSON-LD schema block (rich snippets for Google)
 *
 * Guidelines for future additions:
 *   - Front-load the answer with the direct factual response (Google
 *     truncates FAQ snippets to ~300 characters).
 *   - Include the game name naturally in both Q and A for keyword relevance.
 *   - Each answer should be 2-4 sentences for optimal snippet length.
 */

export interface GameFaq {
  question: string;
  answer: string;
}

export const GAME_FAQS: Record<string, GameFaq[]> = {
  'reaction-time': [
    {
      question: 'What is the average human reaction time?',
      answer: 'The average human visual reaction time is approximately 250–280 milliseconds in laboratory settings, and around 284 ms on web-based platforms due to additional hardware and display latency. Competitive gamers and athletes often score below 200 ms.'
    },
    {
      question: 'What is a good reaction time score?',
      answer: 'A score under 200 ms is considered excellent and places you in the top 10% globally. Scores between 200–250 ms are above average, 250–300 ms is average, and anything above 300 ms is below average.'
    },
    {
      question: 'Does age affect reaction time?',
      answer: 'Yes. Reaction time peaks in your early-to-mid 20s at around 218 ms and then gradually slows by approximately 2–5 ms per decade. However, regular practice and good sleep habits can help maintain fast reaction times well into later life.'
    },
    {
      question: 'Can you improve your reaction time with practice?',
      answer: 'Yes. Studies show that consistent practice can reduce reaction time by 10–20%. Adequate sleep (7–9 hours), regular exercise, reduced caffeine fluctuations, and action video game training have all been shown to improve response speed.'
    },
    {
      question: 'What is the fastest human reaction time ever recorded?',
      answer: 'The theoretical lower bound for human visual reaction time is approximately 120 ms, limited by nerve conduction speed. In athletics, the IAAF considers any reaction below 100 ms a false start. Web-based tests typically show minimum scores around 150 ms.'
    },
    {
      question: 'Is this reaction time test accurate?',
      answer: 'This test measures relative reaction time with high reliability. While absolute times may include ~30–60 ms of hardware latency from your display and input device, the test consistently ranks users correctly relative to each other. We subtract 60 ms for display lag in our calculations.'
    }
  ],

  'sequence-memory': [
    {
      question: 'What is a good sequence memory score?',
      answer: 'The average score is Level 7–9, consistent with Miller\'s Law (7 ± 2 chunks of working memory). Reaching Level 12 or higher places you in the top 10%. Scores above Level 15 are exceptional.'
    },
    {
      question: 'How does the sequence memory test work?',
      answer: 'Tiles flash in a pattern on a 3×3 grid. You must reproduce the exact sequence by clicking the tiles in the same order. Each correct round adds one more step to the sequence. The test ends when you make a mistake.'
    },
    {
      question: 'What cognitive ability does the sequence memory test measure?',
      answer: 'This test measures visuospatial working memory — your brain\'s ability to temporarily store and manipulate ordered spatial information. It is a digital adaptation of the Corsi Block-Tapping Task, a standard clinical neuropsychological assessment.'
    },
    {
      question: 'Can you improve your sequence memory?',
      answer: 'Yes. Working memory capacity can be expanded through deliberate practice. Techniques like chunking (grouping tiles into patterns), visualization strategies, and consistent daily practice sessions have been shown to improve scores over time.'
    },
    {
      question: 'What is Miller\'s Law and how does it relate to this test?',
      answer: 'Miller\'s Law (George Miller, 1956) states that the average person can hold 7 ± 2 items in working memory at once. This test directly measures that capacity — most people plateau around Level 7–9 without using chunking strategies.'
    }
  ],

  'aim-trainer': [
    {
      question: 'What is a good aim trainer score?',
      answer: 'The global average is approximately 400 ms per target. Scoring under 250 ms per target places you in the top 10%. Professional esports players and FPS gamers typically score between 200–300 ms per target.'
    },
    {
      question: 'Does aim training actually improve gaming performance?',
      answer: 'Yes. Research and player testimonials consistently show that regular aim training improves mouse accuracy, target acquisition speed, and hand-eye coordination. Many professional esports teams incorporate aim training into daily practice routines.'
    },
    {
      question: 'How does the aim trainer test work?',
      answer: 'You must click 30 randomly placed targets as quickly as possible. Your score is the average time in milliseconds between each target click. The targets appear one at a time in random positions across the play area.'
    },
    {
      question: 'What is Fitts\'s Law and how does it affect aim training?',
      answer: 'Fitts\'s Law states that the time to hit a target is a function of its size and distance — smaller and more distant targets take longer to click accurately. This test follows Fitts\'s Law, making each target equally challenging.'
    },
    {
      question: 'Does mouse DPI or sensitivity affect aim trainer scores?',
      answer: 'Yes. Mouse DPI, polling rate, and sensitivity settings all affect scores. Most competitive gamers use 400–800 DPI with lower in-game sensitivity for precision. However, the best DPI is whatever feels most natural and allows consistent accuracy.'
    }
  ],

  'number-memory': [
    {
      question: 'What is the average number memory (digit span)?',
      answer: 'The average adult digit span is 7 digits (±2), as described by George Miller in 1956. This means most people can reliably remember 5–9 digits after a single viewing. Top performers can exceed 12+ digits using memory techniques.'
    },
    {
      question: 'How does the number memory test work?',
      answer: 'A number is displayed for a brief period, then hidden. You must type the number from memory. Each correct round adds one more digit and gives slightly more viewing time. The test ends when you enter the wrong number.'
    },
    {
      question: 'What does number memory measure in the brain?',
      answer: 'This test measures verbal working memory, specifically the phonological loop component of Baddeley\'s Working Memory Model. It assesses how many sequential digits your brain can encode, hold, and recall from short-term memory.'
    },
    {
      question: 'How can I improve my digit span?',
      answer: 'Use chunking (e.g., grouping 149265 into 149-265), create associations (link digits to meaningful numbers like dates or addresses), or use the Method of Loci. Practice with increasing digit lengths daily for best results.'
    },
    {
      question: 'Is digit span related to intelligence?',
      answer: 'Digit span moderately correlates with fluid intelligence and is included in standardized IQ tests like the WAIS (Wechsler Adult Intelligence Scale). However, working memory capacity is just one component of overall intelligence.'
    }
  ],

  'verbal-memory': [
    {
      question: 'What is a good verbal memory score?',
      answer: 'The average score is approximately 30–50 words correctly classified before making enough errors. Scores above 100 words place you in the top 5%. Expert memorizers can exceed 200+ words using mnemonic strategies.'
    },
    {
      question: 'How does the verbal memory test work?',
      answer: 'Words appear one at a time. You must classify each word as NEW (first time seeing it) or SEEN (you\'ve encountered it before in this session). You start with 3 lives and lose one each time you misclassify a word.'
    },
    {
      question: 'What type of memory does the verbal memory test assess?',
      answer: 'This test measures recognition memory — your ability to distinguish previously encountered items from novel ones. It relies on the episodic memory system and the hippocampus, testing both encoding and retrieval of verbal information.'
    },
    {
      question: 'Why does the test get harder as it goes on?',
      answer: 'As the word list grows, proactive interference builds up — previously seen words become harder to distinguish from new ones because similar-sounding or semantically related words create confusion. This is a well-documented phenomenon in memory research.'
    },
    {
      question: 'Can verbal memory be improved?',
      answer: 'Yes. Strategies include paying close attention to the first presentation of each word, creating vivid mental images for each word, using emotional associations, and practicing regularly. Adequate sleep is critical for memory consolidation.'
    }
  ],

  'chimp-test': [
    {
      question: 'Can chimpanzees really outperform humans on this test?',
      answer: 'Yes. Research by Inoue & Matsuzawa (2007, published in Current Biology) at Kyoto University demonstrated that young chimpanzees (especially a chimp named Ayumu) consistently outperformed adult humans on rapid spatial number recall tasks, achieving Level 9+ accuracy.'
    },
    {
      question: 'What is a good chimp test score?',
      answer: 'The average human score is around Level 5–6. Reaching Level 8 or above places you in the top 5% of human performance. Level 9+ is where trained chimpanzees consistently perform, making it an exceptional score for a human.'
    },
    {
      question: 'How does the chimp test work?',
      answer: 'Numbers (starting from 4) appear briefly on screen, then are hidden behind white squares. You must click the squares in ascending numerical order (1, 2, 3...) from memory. Each correct level adds one more number. You have 3 lives.'
    },
    {
      question: 'Why are chimps better at this memory task than humans?',
      answer: 'Scientists believe chimps possess superior "eidetic" (photographic) short-term memory that humans may have traded away during evolution in favor of language processing and abstract reasoning capabilities. The chimp\'s visuospatial memory is simply more acute.'
    },
    {
      question: 'What part of the brain does the chimp test exercise?',
      answer: 'The chimp test primarily exercises the visuospatial sketchpad component of working memory, involving the posterior parietal cortex and prefrontal cortex. It tests spatial encoding, positional memory, and sequential recall simultaneously.'
    }
  ],

  'visual-memory': [
    {
      question: 'What is a good visual memory score?',
      answer: 'The global average is Level 7–8. Reaching Level 12 or higher places you in the top 10%. Scores above Level 15 are exceptional and indicate very strong visuospatial working memory capacity.'
    },
    {
      question: 'How does the visual memory test work?',
      answer: 'A grid of squares is shown, with some squares briefly highlighted. After they disappear, you must click the squares that were highlighted. Each correct level adds more squares to remember. You have 3 lives — losing all 3 ends the game.'
    },
    {
      question: 'What is the difference between visual memory and sequence memory?',
      answer: 'Visual memory tests spatial set recall — remembering WHICH squares lit up, regardless of order. Sequence memory tests ordered spatial recall — remembering the exact ORDER in which squares lit up. They use different working memory subsystems.'
    },
    {
      question: 'How can I improve my visual memory?',
      answer: 'Practice regularly, use pattern recognition (look for shapes or clusters rather than individual squares), try the "chunking" technique (group adjacent squares into larger shapes), and ensure adequate sleep for memory consolidation.'
    },
    {
      question: 'Is the visual memory test scientifically validated?',
      answer: 'This test is analogous to the Corsi Block-Tapping Test developed by Milner and Corsi in the 1970s, which is a standard clinical neuropsychological tool used to assess visuospatial memory capacity in both research and clinical settings.'
    }
  ],

  'typing': [
    {
      question: 'What is the average typing speed?',
      answer: 'The average adult types between 40–60 Words Per Minute (WPM). Touch typists average 60–80 WPM, professional typists exceed 80–100 WPM, and speed typists can reach 120+ WPM. The world record exceeds 212 WPM.'
    },
    {
      question: 'How is WPM (Words Per Minute) calculated?',
      answer: 'WPM is calculated by dividing the total number of characters typed (including spaces) by 5 (the standard "word" length) and then dividing by the time elapsed in minutes. Errors typically reduce the raw WPM to produce a net/adjusted WPM score.'
    },
    {
      question: 'How can I improve my typing speed?',
      answer: 'Learn proper touch typing (home row position), practice daily for 15–30 minutes, focus on accuracy before speed, use all 10 fingers, minimize looking at the keyboard, and gradually increase difficulty with more complex passages.'
    },
    {
      question: 'What is a good typing speed for a job?',
      answer: 'Most office jobs require 40–50 WPM minimum. Data entry positions typically require 60–80 WPM. Court reporters and transcriptionists need 80–100+ WPM. For general professional use, 50–70 WPM is considered competent.'
    },
    {
      question: 'Does typing speed correlate with intelligence?',
      answer: 'Typing speed is primarily a motor skill and does not directly measure intelligence. However, it does reflect psychomotor processing speed and fine motor coordination. Fast typists tend to have stronger procedural memory and motor learning capabilities.'
    }
  ],

  'mobile-typing': [
    {
      question: 'What is the average mobile typing speed?',
      answer: 'The average smartphone typing speed is approximately 36–40 WPM, about 30–40% slower than desktop typing. Experienced swipe-keyboard users can exceed 50 WPM. Young adults (teens to mid-20s) tend to type faster on mobile than older adults.'
    },
    {
      question: 'Is mobile typing slower than desktop typing?',
      answer: 'Yes, on average mobile typing is 30–40% slower than desktop typing. This is due to smaller key targets, thumb-only input, lack of tactile feedback, and higher reliance on autocorrect. However, the gap has narrowed significantly with modern touchscreen keyboards.'
    },
    {
      question: 'How can I type faster on my phone?',
      answer: 'Try swipe/glide typing for common words, enable autocorrect and predictive text, practice thumb positioning, use both thumbs for wider phones, and consider keyboards with haptic feedback. Regular practice sessions help build muscle memory.'
    },
    {
      question: 'Does autocorrect affect my mobile typing score?',
      answer: 'Autocorrect is part of the real-world mobile typing experience, so it is not disabled in this test. Your score reflects your actual functional typing speed, including the corrections and predictions your keyboard provides.'
    },
    {
      question: 'What is a good mobile typing speed?',
      answer: 'Anything above 40 WPM on mobile is above average. Speeds of 50+ WPM are considered fast for touchscreen typing. The fastest mobile typists can exceed 70+ WPM using swipe-based input methods or dual-thumb techniques.'
    }
  ],

  'audio-reaction-time': [
    {
      question: 'What is the average audio reaction time?',
      answer: 'The global web average auditory reaction time is approximately 185 milliseconds, compared to around 140–160 ms in clinical laboratory settings. Auditory reaction time is consistently 30–50 ms faster than visual reaction time (~284 ms).'
    },
    {
      question: 'Why is auditory reaction time faster than visual reaction time?',
      answer: 'Auditory impulses bypass the 20–40 ms retinal phototransduction bottleneck. Mechanically-gated hair cells in the cochlea depolarize in ~1 ms, and the auditory pathway involves only ~4 synaptic relays to the auditory cortex (A1) versus ~6 relays for the visual pathway.'
    },
    {
      question: 'Does using Bluetooth headphones affect my audio reaction test score?',
      answer: 'Yes, significantly. Standard Bluetooth audio codecs (AAC, SBC, and aptX) add 100–250 ms of wireless buffer latency. For accurate reaction time benchmarks, always use wired headphones, wired IEMs, or built-in device speakers.'
    },
    {
      question: 'What is a good audio reaction time score?',
      answer: 'A score under 160 ms places you in the top 10% globally, while scores under 135 ms represent the elite top 1%. Scores between 170–210 ms are average, and reaction times above 240 ms are below average.'
    },
    {
      question: 'What is the fastest possible human reaction time to sound?',
      answer: 'The physiological lower bound for genuine human auditory simple reaction time is approximately 80–100 ms. Any response under 80 ms is classified as an anticipation click (false start) rather than a genuine neural reaction.'
    },
    {
      question: 'How do age and fatigue influence auditory reflexes?',
      answer: 'Auditory reflexes peak between ages 18–24 and gradually slow by 2–4 ms per decade. Acute fatigue, poor sleep, and dehydration can impair auditory reaction speed by 15–30%, while proper rest and alertness sharpen response times.'
    }
  ],

  'choice-reaction-time': [
    {
      question: 'What is choice reaction time and how does it differ from simple reaction time?',
      answer: 'Choice reaction time (CRT) is the latency between detecting one of several stimuli and executing the corresponding specific motor response, such as pressing key D, F, J, or K. Unlike simple reaction time (~250–280 ms), which only requires stimulus detection, choice reaction time requires two additional cognitive stages: stimulus discrimination and response selection, increasing total latency to roughly 350–400 ms.'
    },
    {
      question: "What is Hick's Law (Hick-Hyman Law)?",
      answer: "Hick's Law states that decision time increases logarithmically as the number of choices increases, modeled by the formula RT = a + b * log2(n + 1). In this equation, 'a' represents baseline simple reaction time, 'b' is the cognitive processing speed constant (~120–180 ms per bit of information), and 'n' is the number of alternatives."
    },
    {
      question: 'What is a good score on the 4-choice reaction time test?',
      answer: 'For a 4-choice reaction time test, the global average is approximately 370 ms with 90%+ accuracy. Scores under 290 ms place you in the top 10% globally, while elite esports players and fighter pilots can achieve choice reaction times below 245 ms (top 1%).'
    },
    {
      question: "What is the 'decision overhead' in Hick's Law?",
      answer: "Decision overhead is the extra time your central nervous system takes to process choices compared to a simple reflex (Choice RT minus Simple RT). In a 4-choice visual task (2 bits of entropy), typical healthy adults experience a decision overhead of +80 ms to +140 ms over their baseline simple reaction time."
    },
    {
      question: 'Why are anticipations under 120ms rejected?',
      answer: 'Responses faster than 120 ms are rejected as anticipations because human neurophysiology cannot detect a visual stimulus, discriminate between four distinct positions, select a motor program, and contract finger muscles in under 120 ms. Physiological transmission from retina to primary visual cortex alone consumes 40–60 ms, making sub-120 ms choices physically impossible without premature guessing.'
    },
    {
      question: 'Can you improve choice reaction time through practice?',
      answer: 'Yes. With deliberate practice, the brain creates automated stimulus-response mappings in the premotor cortex and basal ganglia, significantly reducing the Hick\'s slope parameter "b". Elite typists, pianists, and competitive gamers demonstrate near-zero decision slope, reacting to multiple distinct stimuli almost as quickly as a simple reflex.'
    }
  ],

  'stroop-test': [
    {
      question: 'What is the Stroop Effect and how does the Stroop Test work?',
      answer: 'The Stroop Effect is a psychological phenomenon demonstrating that naming the font color of a word is significantly slower and more error-prone when the ink color conflicts with the printed word (e.g., the word "RED" printed in blue ink). In this test, 24 trials test your executive inhibition by measuring how fast you identify the physical font color while actively suppressing the automatic reflex to read the word.'
    },
    {
      question: 'What brain regions are responsible for resolving the Stroop Effect?',
      answer: 'The Stroop task primarily recruits the Anterior Cingulate Cortex (ACC) and the Dorsolateral Prefrontal Cortex (dlPFC). The ACC functions as an executive conflict monitoring hub that detects interference between automatic word reading and color recognition, while the dlPFC applies top-down inhibitory control to suppress the reading response.'
    },
    {
      question: 'What is a normal Stroop Interference Cost?',
      answer: 'The average Stroop interference cost (the latency difference between incongruent and congruent trials) is approximately 150–190 milliseconds in healthy adults. Top 10% performers experience an interference cost below 115 ms, demonstrating superior cognitive inhibition, attentional gating, and prefrontal control.'
    },
    {
      question: 'What is a good score on the Stroop Effect Test?',
      answer: 'A composite score (incongruent reaction time plus a +50ms penalty per incorrect answer) under 560 ms places you in the top 10% globally, while scores under 470 ms represent the elite top 1%. The global web median for incongruent trials is approximately 720 ms with 90%+ accuracy.'
    },
    {
      question: 'Why is word reading faster and more automatic than color naming?',
      answer: 'Reading is an overlearned cultural skill practiced millions of times since early childhood. It processes automatically in the visual word form area (VWFA) within 200–250 ms without conscious effort, whereas color naming requires voluntary, controlled processing taking 350–450 ms. Because word reading reaches response selection first, your brain must actively expend cognitive effort to inhibit it.'
    },
    {
      question: 'Can you train your brain to overcome the Stroop Effect?',
      answer: 'Yes. Deliberate practice on executive inhibition tasks strengthens functional connectivity between the anterior cingulate cortex and prefrontal networks. Video games requiring selective attention, mindfulness meditation, and adequate sleep have also been shown to reduce Stroop interference latency by 15–25%.'
    }
  ],

  'corsi-block-test': [
    {
      question: 'What is the Corsi Block-Tapping Test and what does it measure?',
      answer: 'The Corsi Block-Tapping Test is a standardized neuropsychological assessment developed in 1972 by Philip Corsi to measure visuospatial working memory span. Nine irregularly arranged blocks light up in random sequences; test-takers must reproduce the sequence in forward or reverse order. Unlike digit span tests, it isolates pure spatial memory without allowing verbal counting or phonological rehearsal.'
    },
    {
      question: 'What is a normal Corsi block span score?',
      answer: 'The average adult achieves a Forward Corsi Span of 5 to 6 blocks (mean ~5.6) and a Backward Corsi Span of 4 to 5 blocks (mean ~4.8). Scores of 7 or higher place you in the top 15% globally, while a span of 8+ places you in the top 5% of visuospatial working memory capacity.'
    },
    {
      question: 'What is the difference between Forward and Backward Corsi Span?',
      answer: 'Forward Corsi Span measures passive spatial storage capacity in the parietal and occipital cortices (the Visuospatial Sketchpad). Backward Corsi Span requires repeating the sequence in reverse order, which demands active executive manipulation, mental spatial rotation, and top-down control orchestrated by the Dorsolateral Prefrontal Cortex (dlPFC).'
    },
    {
      question: 'Why does the Corsi Test use an asymmetric layout instead of a 3x3 grid?',
      answer: 'An irregular, asymmetric layout prevents test-takers from using verbal recoding shortcuts such as numbering positions 1 through 9 or using geometric labels (e.g., "top-left, middle, bottom-right"). By eliminating verbal mnemonics, the asymmetric Corsi board ensures that 100% of cognitive load falls on spatial coordinate processing in the dorsal visual stream.'
    },
    {
      question: 'How is the Corsi Block Test used in clinical medicine and neurology?',
      answer: 'Neuropsychologists use the Corsi test to evaluate memory impairment following traumatic brain injury (TBI), concussions, temporal lobe epilepsy resections, stroke, and early Alzheimer\'s disease or Mild Cognitive Impairment (MCI). A Corsi span of 3 or below often indicates a clinical deficit requiring diagnostic follow-up.'
    },
    {
      question: 'Can you improve your Corsi block memory span with practice?',
      answer: 'Yes. Targeted visuospatial memory training, action video games requiring radar and mini-map awareness, chess, and spatial navigation exercises have all been shown to increase functional connectivity in frontoparietal memory networks, expanding working memory span by 1 to 2 items over time.'
    }
  ],

  'dual-n-back': [
    {
      question: 'What is the Dual N-Back test and how does it work?',
      answer: 'The Dual N-Back test is an advanced cognitive training task where you simultaneously track two independent streams of information: a visual square on a 3x3 grid and an auditory spoken letter. For every trial, you must press [A] if the position matches the position from N steps ago, and press [L] if the spoken letter matches the letter heard N steps ago.'
    },
    {
      question: 'Can Dual N-Back training really increase fluid intelligence (IQ)?',
      answer: 'Yes. A landmark study published by Susanne Jaeggi et al. (PNAS, 2008) demonstrated that daily adaptive Dual N-Back practice produced statistically significant improvements in fluid intelligence (Gf), as measured by Raven\'s Advanced Progressive Matrices. The gains were dose-dependent, meaning individuals who trained more days achieved greater cognitive improvements.'
    },
    {
      question: 'What is a good score on the Dual N-Back test?',
      answer: 'For Dual 2-Back, healthy adults average roughly 65% to 75% accuracy (265 to 275 composite points). Achieving 80%+ on Dual 2-Back qualifies you to advance to Dual 3-Back, which places you in the top 15% globally. Scores above 75% on Dual 3-Back (375+ points) represent elite executive function in the top 2% of the population.'
    },
    {
      question: 'Why does Dual N-Back use both visual and auditory modalities?',
      answer: 'Dual N-Back forces the brain to coordinate both Alan Baddeley\'s Visuospatial Sketchpad (dorsal visual pathway) and the Phonological Loop (acoustic auditory cortex) at the exact same time. This multi-modal stress taxes the Central Executive in the prefrontal cortex far more intensely than any single-stream memory test.'
    },
    {
      question: 'How does the scoring formula work in this test?',
      answer: 'Your score is calculated using Signal Detection Theory: Accuracy % = (Hits / (Hits + Misses + False Alarms)) * 100. Each round intentionally contains exactly 6 Position Matches and 6 Audio Matches (with 2 dual matches). Your leaderboard composite score combines your N-level with your accuracy percentage (e.g., 2-Back at 85% yields 285 points).'
    },
    {
      question: 'How often should I practice Dual N-Back to see results?',
      answer: 'Cognitive neuroscience research recommends practicing Dual N-Back for 20 to 25 minutes per day, 4 to 5 days per week, over a period of 4 to 6 weeks. Consistent practice stimulates activity-dependent synaptic plasticity, strengthens frontoparietal myelination, and expands working memory capacity.'
    }
  ]
};
