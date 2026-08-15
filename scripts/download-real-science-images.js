import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetDir = path.resolve(__dirname, '../public/images/science/articles');
fs.mkdirSync(targetDir, { recursive: true });

const ARTICLE_IMAGES = [
  { slug: 'what-is-reaction-time', photoId: 'photo-1576086213369-97a306d36557', caption: 'Laboratory biometric reflex testing and sensorimotor recording.' },
  { slug: 'choice-vs-simple-reaction-time', photoId: 'photo-1551288049-bebda4e38f71', caption: 'Decision latency tracking apparatus in cognitive chronometry.' },
  { slug: 'how-sleep-affects-reaction-time', photoId: 'photo-1541781774459-bb2af2f05b55', caption: 'Clinical polysomnography monitoring sleep architecture and slow-wave cycles.' },
  { slug: 'does-gaming-improve-reaction-time', photoId: 'photo-1542751371-adc38448a05e', caption: 'Professional esports athlete demonstrating millisecond visuomotor reflexes.' },
  { slug: 'does-240hz-improve-scores', photoId: 'photo-1526738549149-8e07eca6c147', caption: 'High-refresh 240Hz/360Hz display setup with optical low-latency peripherals.' },
  { slug: 'why-reaction-time-changes-with-age', photoId: 'photo-1516307365426-bea591f05011', caption: 'Cross-sectional sensorimotor studies evaluating cognitive health across generations.' },
  { slug: 'working-memory-explained', photoId: 'photo-1559757175-5700dde675bc', caption: 'Anatomical model illustrating the prefrontal cortex and hippocampal memory circuits.' },
  { slug: 'why-humans-forget', photoId: 'photo-1456513080510-7bf3a84b82f8', caption: 'Archival cognitive psychology records documenting the Ebbinghaus decay curve.' },
  { slug: 'visual-vs-spatial-memory', photoId: 'photo-1592478411213-6153e4ebc07d', caption: '3D spatial cognition and navigation assessment in neuro-behavioral research.' },
  { slug: 'chunking-explained', photoId: 'photo-1529699211952-734e80c4d42b', caption: 'Grandmaster tournament chess illustrating high-density pattern chunking.' },
  { slug: 'chimp-memory-research', photoId: 'photo-1540573133985-87b6da6d54a9', caption: 'Primate cognitive research evaluating photographic working memory.' },
  { slug: 'how-stress-affects-memory', photoId: 'photo-1506126613408-eca07ce68773', caption: 'Physiological stress regulation and vagal tone recovery under cognitive load.' },
  { slug: 'the-stroop-effect', photoId: 'photo-1541701494587-cb58502866ab', caption: 'Color and word semantic conflict testing executive inhibitory control.' },
  { slug: 'change-blindness', photoId: 'photo-1534447677768-be436bb09401', caption: 'Human visual gaze capturing saccadic eye movements and visual transients.' },
  { slug: 'inattentional-blindness', photoId: 'photo-1546519638-68e109498ffc', caption: 'Dynamic scene attention tracking in Simons & Chabris perceptual load paradigms.' },
  { slug: 'multitasking-myth', photoId: 'photo-1498050108023-c5249f4df085', caption: 'Multi-screen workflow illustrating prefrontal task-switching bottlenecks.' },
  { slug: 'global-vs-local-attention', photoId: 'photo-1451187580459-43490279c0fa', caption: 'Global scene parsing and hemispheric spatial frequency decomposition.' },
  { slug: 'hicks-law', photoId: 'photo-1508739773434-c26b3d09e071', caption: 'Multi-choice cockpit controls demonstrating logarithmic decision entropy.' },
  { slug: 'fitts-law', photoId: 'photo-1527864550417-7fd91fc51a46', caption: 'Precision mouse ergonomics and target acquisition tracking under Fitts\'s Law.' },
  { slug: 'processing-speed-vs-reaction-time', photoId: 'photo-1507413245164-6160d8298b31', caption: 'Laboratory neuroscience equipment measuring axonal white matter conduction.' },
  { slug: 'why-fast-decisions-matter', photoId: 'photo-1486406146926-c627a92ad1ab', caption: 'High-stakes real-time environment demonstrating speed-accuracy threshold tuning.' },
  { slug: 'neuroplasticity', photoId: 'photo-1532094349884-543bc11b234d', caption: 'Neurobiology laboratory research investigating synaptic growth and plasticity.' },
  { slug: 'dopamine-and-learning', photoId: 'photo-1511512578047-dfb367046420', caption: 'Reward prediction error and reinforcement drive in competitive achievement.' },
  { slug: 'circadian-rhythm', photoId: 'photo-1509114397022-ed747cca3f65', caption: 'Natural circadian light cycles synchronizing the suprachiasmatic nucleus.' },
  { slug: 'cognitive-fatigue', photoId: 'photo-1516585427167-9f4af9627e6c', caption: 'Prefrontal executive exhaustion and glutamate recovery during deep cognitive rest.' },
  { slug: 'brain-myths-debunked', photoId: 'photo-1530497610245-94d3c16cda28', caption: 'Clinical MRI neuroimaging demonstrating whole-brain bilateral activation.' }
];

function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadImage(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download: Status ${res.statusCode}`));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve(dest));
      });
    }).on('error', reject);
  });
}

async function run() {
  console.log(`Downloading 26 authentic, topic-specific photographs for each article...`);
  for (const item of ARTICLE_IMAGES) {
    const url = `https://images.unsplash.com/${item.photoId}?auto=format&fit=crop&w=1200&q=80`;
    const dest = path.join(targetDir, `${item.slug}.jpg`);
    try {
      await downloadImage(url, dest);
      console.log(`✅ [${item.slug}] Saved (${(fs.statSync(dest).size / 1024).toFixed(0)} KB)`);
    } catch (err) {
      console.error(`❌ [${item.slug}] Error:`, err.message);
    }
  }
  console.log('\nAll 26 unique photographic images processed!');
}

run();
