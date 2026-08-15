import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetDir = path.resolve(__dirname, '../public/images/science/articles');
fs.mkdirSync(targetDir, { recursive: true });

const SECONDARY_IMAGES = [
  { slug: 'what-is-reaction-time', photoId: 'photo-1530497610245-94d3c16cda28', caption: 'Cortical motor mapping and corticospinal axonal pathways.' },
  { slug: 'choice-vs-simple-reaction-time', photoId: 'photo-1518770660439-4636190af475', caption: 'Electronic chronometry and binary decision response latency tracking.' },
  { slug: 'how-sleep-affects-reaction-time', photoId: 'photo-1511295742362-92c96b124e52', caption: 'Circadian rest cycles and slow-wave neuro-restoration.' },
  { slug: 'does-gaming-improve-reaction-time', photoId: 'photo-1511512578047-dfb367046420', caption: 'High-intensity visuomotor training in professional esports arenas.' },
  { slug: 'does-240hz-improve-scores', photoId: 'photo-1550745165-9bc0b252726f', caption: 'Sub-millisecond frame rendering and high-refresh panel performance.' },
  { slug: 'why-reaction-time-changes-with-age', photoId: 'photo-1573496359142-b8d87734a5a2', caption: 'Neuro-gerontology assessments measuring sensorimotor preservation.' },
  { slug: 'working-memory-explained', photoId: 'photo-1507413245164-6160d8298b31', caption: 'Prefrontal cortex neural firing patterns sustaining working memory.' },
  { slug: 'why-humans-forget', photoId: 'photo-1532012197267-da84d127e765', caption: 'Synaptic consolidation and retroactive interference in memory psychology.' },
  { slug: 'visual-vs-spatial-memory', photoId: 'photo-1518709268805-4e9042af9f23', caption: 'Visuospatial navigation and hippocampal grid cell coordinates.' },
  { slug: 'chunking-explained', photoId: 'photo-1509228468518-180dd4864904', caption: 'Hierarchical schema compression reducing working memory slot demand.' },
  { slug: 'chimp-memory-research', photoId: 'photo-1535083783855-76ae62b2914e', caption: 'Primate cognitive assessment and short-term eidetic memory trials.' },
  { slug: 'how-stress-affects-memory', photoId: 'photo-1518611012118-696072aa579a', caption: 'Neuroendocrine cortisol feedback and autonomic nervous system regulation.' },
  { slug: 'the-stroop-effect', photoId: 'photo-1513364776144-60967b0f800f', caption: 'Semantic visual interference and anterior cingulate conflict resolution.' },
  { slug: 'change-blindness', photoId: 'photo-1473496169904-658ba7c44d8a', caption: 'Visual attention saccades during scene transitions and transient masks.' },
  { slug: 'inattentional-blindness', photoId: 'photo-1518770660439-4636190af475', caption: 'Perceptual load filtering and selective visual tracking under high demand.' },
  { slug: 'multitasking-myth', photoId: 'photo-1483058712412-4245e9b90334', caption: 'Task-switching latency costs across multiple cognitive streams.' },
  { slug: 'global-vs-local-attention', photoId: 'photo-1509198397868-475647b2a1e5', caption: 'Spatial frequency decomposition in hierarchical visual perception.' },
  { slug: 'hicks-law', photoId: 'photo-1517420704952-d9f39e95b43e', caption: 'Information entropy and decision tree branches in human-machine interfaces.' },
  { slug: 'fitts-law', photoId: 'photo-1587829741301-dc798b83add3', caption: 'Ballistic motor trajectories and corrective submovements during pointing.' },
  { slug: 'processing-speed-vs-reaction-time', photoId: 'photo-1516321318423-f06f85e504b3', caption: 'Neural white matter integrity and information transmission rate.' },
  { slug: 'why-fast-decisions-matter', photoId: 'photo-1451187580459-43490279c0fa', caption: 'Speed-accuracy tradeoff dynamics under real-time operational constraints.' },
  { slug: 'neuroplasticity', photoId: 'photo-1579783900882-c0d3dad7b119', caption: 'Synaptogenesis and long-term potentiation in neocortical dendrites.' },
  { slug: 'dopamine-and-learning', photoId: 'photo-1492684223066-81342ee5ff30', caption: 'Mesolimbic dopamine surges reinforcing reward prediction accuracy.' },
  { slug: 'circadian-rhythm', photoId: 'photo-1495616811223-4d98c6e9c869', caption: 'Melatonin secretion curves synchronized to natural diurnal light cycles.' },
  { slug: 'cognitive-fatigue', photoId: 'photo-1507679799987-c73779587ccf', caption: 'Executive prefrontal rest and metabolic waste clearance.' },
  { slug: 'brain-myths-debunked', photoId: 'photo-1559757148-5c350d0d3c56', caption: 'Functional neuroanatomy demonstrating widespread multi-lobar activation.' }
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
  console.log(`Downloading 26 secondary authentic scientific photographs...`);
  for (const item of SECONDARY_IMAGES) {
    const url = `https://images.unsplash.com/${item.photoId}?auto=format&fit=crop&w=1200&q=80`;
    const dest = path.join(targetDir, `${item.slug}-secondary.jpg`);
    try {
      await downloadImage(url, dest);
      console.log(`✅ [${item.slug}-secondary] Saved (${(fs.statSync(dest).size / 1024).toFixed(0)} KB)`);
    } catch (err) {
      console.error(`❌ [${item.slug}-secondary] Error:`, err.message);
    }
  }
  console.log('\nAll 26 secondary photographic images saved!');
}

run();
